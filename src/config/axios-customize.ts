import axiosClient from "axios";
import { Mutex } from "async-mutex";
import { Slide, toast } from "react-toastify";
import { setRefreshTokenAction } from "../redux/slice/account.slice";
import { IBackendResponse } from '../types/backend';
import { useStore } from "react-redux";


interface AccessTokenResponse {
    access_token: string;
}

const instance = axiosClient.create({
    baseURL: process.env.REACT_APP_TANXUAN_BACKEND_URL as string,
    withCredentials: true,
});


const mutex = new Mutex();
const NO_RETRY_HEADER = 'x-no-retry';

const handleRefreshToken = async (): Promise<string | null> => {
    return await mutex.runExclusive(async () => {
        const response = await instance.get<IBackendResponse<AccessTokenResponse>>('/refresh');
        if (response?.data?.data) {
            return response?.data?.data?.access_token
        } else return null;
    });
}

instance.interceptors.request.use(function (config) {
    if (typeof window !== 'undefined' && window?.localStorage.getItem('access_token')) {
        config.headers.Authorization = 'Bearer ' + window.localStorage.getItem('access_token');
    }
    if (!config.headers.Accept && config.headers["Content-Type"]) {
        config.headers.Accept = "application/json";
        config.headers["Content-Type"] = "application/json; charset=utf-8";
    }
    return config;
}, error => {
    return Promise.reject(error);
});

instance.interceptors.response.use((response) => response,
    async (error) => {
        if (error.config && error.response && +error.response.status === 401 && error.config.url !== '/login' && !error.config.headers[NO_RETRY_HEADER]) {
            const access_token = await handleRefreshToken();
            error.config.headers[NO_RETRY_HEADER] = 'true';
            if (access_token) {
                error.config.headers['Authorization'] = `Bearer ${access_token}`;
                localStorage.setItem('access_token', access_token);
                return instance.request(error.config);
            }
        }
        // chưa hoàn thiện
        if (error.config && error.response && +error.response.status === 400 && error.config.url === '/refresh') {
            const message = error?.response?.data?.error ?? "Đã xảy ra lỗi! Vui lòng đăng nhập lại.";
            // No call store directly to avoid circular dependency
            const store = useStore();
            store.dispatch(setRefreshTokenAction({ status: true, message: message }));
        }
        if (+error.response.status === 403) {
            toast.error(`${error?.response?.data?.message ?? "Bạn không có quyền truy cập!"}`, {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                pauseOnHover: false,
                draggable: true,
                transition: Slide
            });
        }
        return error?.response?.data ?? Promise.reject(error);
    });

export default instance;



