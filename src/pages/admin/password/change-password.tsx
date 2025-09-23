import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as yup from "yup";
import { apiChangePasswordForUser } from "../../../config/api";
import CustomToast from "../../../components/common/toast.message";

const ChangePasswordPageForUser = () => {
    const changePasswordSchema = yup
        .object({
            oldPassword: yup
                .string()
                .required("Mật khẩu không được để trống")
                .matches(
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])(?=.{12,})/,
                    "Mật khẩu phải chứa ít nhất 12 kí tự: bao gồm chữ hoa, chữ thường, số và kí tự đặc biệt"
                ),
            newPassword: yup
                .string()
                .required("Mật khẩu không được để trống")
                .matches(
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])(?=.{12,})/,
                    "Mật khẩu phải chứa ít nhất 12 kí tự: bao gồm chữ hoa, chữ thường, số và kí tự đặc biệt"
                ),
            reNewPassword: yup
                .string()
                .required("Vui lòng nhập lại mật khẩu")
                .oneOf([yup.ref("newPassword")], "Mật khẩu nhập lại không khớp"),
        })
        .required();

    type FormValues = yup.InferType<typeof changePasswordSchema>;

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<FormValues>({ resolver: yupResolver(changePasswordSchema) as any });

    const navigate = useNavigate();
    const [isVisiblePassword, setIsVisiblePassword] = useState(false);
    const [isVisiblePassword2, setIsVisiblePassword2] = useState(false);
    const [isVisiblePassword3, setIsVisiblePassword3] = useState(false);

    const handleChangePassword: SubmitHandler<FormValues> = async (values) => {
        const response = await apiChangePasswordForUser(
            values as { oldPassword: string, newPassword: string, reNewPassword: string }
        );
        if (response.data) {
            toast.success(
                <CustomToast
                    message="Đổi mật khẩu thành công!"
                    className="text-green-600"
                />
            );
            navigate("/admin/dashboard");
        } else {
            toast.error(
                <CustomToast
                    message={response.statusText ?? "Đã xảy ra lỗi!"}
                    className="text-red-600"
                />
            );
        }
    };

    const handleShowPassword = () => {
        setIsVisiblePassword(!isVisiblePassword);
    };

    const handleShowPassword2 = () => {
        setIsVisiblePassword2(!isVisiblePassword2);
    };

    const handleShowPassword3 = () => {
        setIsVisiblePassword3(!isVisiblePassword3);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-red-400">
            <div className="absolute pointer-events-none inset-0 overflow-hidden">
                <div className="absolute top-20 left-20 w-32 h-32 bg-blue-400/30 rounded-full animate-[float_6s_ease-in-out_infinite] shadow-[0_0_50px_rgba(220,38,38,0.4)]"></div>
                <div className="absolute top-40 right-32 w-24 h-24 bg-blue-300/25 rounded-lg rotate-45 animate-[float_8s_ease-in-out_infinite_reverse] shadow-[0_0_40px_rgba(220,38,38,0.4)]"></div>
                <div className="absolute bottom-32 left-40 w-20 h-20 bg-blue-500/30 rounded-full animate-[float_7s_ease-in-out_infinite] shadow-[0_0_35px_rgba(220,38,38,0.4)]"></div>
                <div className="absolute bottom-20 right-20 w-28 h-28 bg-blue-400/20 rounded-lg rotate-12 animate-[float_9s_ease-in-out_infinite_reverse] shadow-[0_0_45px_rgba(220,38,38,0.3)]"></div>

                {/* Grid pattern */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(239,68,68,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(239,68,68,0.1)_1px,transparent_1px)] bg-[size:100px_100px] opacity-10"></div>

                {/* Radial pattern */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[length:50px_50px] opacity-10"></div>

                {/* Gradient overlays  */}
                <div className="absolute top-0 left-0 w-96 h-96 
      bg-[radial-gradient(circle_at_center,_rgba(248,113,113,0.2),_rgba(239,68,68,0.15),_rgb(239,68,68))] 
      rounded-full blur-3xl"></div>

                <div className="absolute bottom-0 right-0 w-96 h-96 
      bg-[radial-gradient(circle_at_center,_rgba(220,38,38,0.2),_rgba(185,28,28,0.15),_rgb(239,68,68))] 
      rounded-full blur-3xl"></div>
            </div>
            <div className="max-w-xl w-full bg-white border border-gray-200 rounded-xl shadow-2xs">
                <div className="p-4 sm:p-7">
                    <div className="text-center">
                        <h1 className="block text-2xl font-bold text-gray-800">
                            Đổi mật khẩu
                        </h1>
                    </div>
                    <div className="mt-5">
                        {/* Form */}
                        <form
                            onSubmit={handleSubmit(handleChangePassword)}
                        >
                            <div className="grid gap-y-4">
                                {/* Form oldPassword */}
                                <div>
                                    <div className="flex flex-wrap justify-between items-center gap-2">
                                        <label htmlFor="oldPassword" className="block text-base mb-2">
                                            Mật khẩu cũ
                                        </label>
                                    </div>
                                    <div className="relative">
                                        <input
                                            type={isVisiblePassword ? "text" : "password"}
                                            id="oldPassword"
                                            {...register("oldPassword")}
                                            className="peer py-2.5 sm:py-3 pe-0 ps-8 block w-full bg-transparent border-t-transparent border-b-2 border-x-transparent border-b-gray-200 sm:text-base focus:border-t-transparent focus:border-x-transparent focus:border-b-red-500 focus:ring-0 focus:outline-none disabled:opacity-50 disabled:pointer-events-none"
                                            placeholder="Nhập mật khẩu"
                                        />
                                        <div className="absolute inset-y-0 start-0 flex items-center pointer-events-none ps-2 peer-disabled:opacity-50 peer-disabled:pointer-events-none">
                                            <svg
                                                className="shrink-0 size-4 text-gray-500"
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="24"
                                                height="24"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            >
                                                <path d="M2 18v3c0 .6.4 1 1 1h4v-3h3v-3h2l1.4-1.4a6.5 6.5 0 1 0-4-4Z"></path>
                                                <circle cx="16.5" cy="7.5" r=".5"></circle>
                                            </svg>
                                        </div>

                                        <div className="absolute inset-y-0 end-0 flex items-center pe-2 peer-disabled:opacity-50">
                                            <button
                                                onClick={handleShowPassword}
                                                className="cursor-pointer"
                                                type="button"
                                                tabIndex={-1}
                                            >
                                                {isVisiblePassword ? (
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        strokeWidth="2"
                                                        stroke="currentColor"
                                                        className="size-4 shrink-0 text-gray-500"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                                                        />
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                                                        />
                                                    </svg>
                                                ) : (
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        strokeWidth="2"
                                                        stroke="currentColor"
                                                        className="size-4 shrink-0 text-gray-500"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
                                                        />
                                                    </svg>
                                                )}
                                            </button>
                                        </div>
                                    </div>
                                    <div>
                                        {errors.oldPassword && (
                                            <p className="text-xs text-red-600 mt-1">{errors.oldPassword.message}</p>
                                        )}</div>
                                </div>
                                {/* End Form oldPassword */}
                                {/* Form newPassword */}
                                <div>
                                    <div className="flex flex-wrap justify-between items-center gap-2">
                                        <label htmlFor="newPassword" className="block text-base mb-2">
                                            Mật khẩu mới
                                        </label>
                                    </div>
                                    <div className="relative">
                                        <input
                                            type={isVisiblePassword2 ? "text" : "password"}
                                            id="newPassword"
                                            {...register("newPassword")}
                                            className="peer py-2.5 sm:py-3 pe-0 ps-8 block w-full bg-transparent border-t-transparent border-b-2 border-x-transparent border-b-gray-200 sm:text-base focus:border-t-transparent focus:border-x-transparent focus:border-b-red-500 focus:ring-0 focus:outline-none disabled:opacity-50 disabled:pointer-events-none"
                                            placeholder="Nhập mật khẩu"
                                        />
                                        <div className="absolute inset-y-0 start-0 flex items-center pointer-events-none ps-2 peer-disabled:opacity-50 peer-disabled:pointer-events-none">
                                            <svg
                                                className="shrink-0 size-4 text-gray-500"
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="24"
                                                height="24"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            >
                                                <path d="M2 18v3c0 .6.4 1 1 1h4v-3h3v-3h2l1.4-1.4a6.5 6.5 0 1 0-4-4Z"></path>
                                                <circle cx="16.5" cy="7.5" r=".5"></circle>
                                            </svg>
                                        </div>

                                        <div className="absolute inset-y-0 end-0 flex items-center pe-2 peer-disabled:opacity-50">
                                            <button
                                                onClick={handleShowPassword2}
                                                className="cursor-pointer"
                                                type="button"
                                                tabIndex={-1}
                                            >
                                                {isVisiblePassword2 ? (
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        strokeWidth="2"
                                                        stroke="currentColor"
                                                        className="size-4 shrink-0 text-gray-500"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                                                        />
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                                                        />
                                                    </svg>
                                                ) : (
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        strokeWidth="2"
                                                        stroke="currentColor"
                                                        className="size-4 shrink-0 text-gray-500"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
                                                        />
                                                    </svg>
                                                )}
                                            </button>
                                        </div>
                                    </div>
                                    <div>
                                        {errors.newPassword && (
                                            <p className="text-xs text-red-600 mt-1">{errors.newPassword.message}</p>
                                        )}</div>
                                </div>
                                {/* End Form newPassword */}
                                {/* Form reNewPassword */}
                                <div>
                                    <label htmlFor="reNewPassword" className="block text-base mb-2">
                                        Nhập lại mật khẩu mới
                                    </label>
                                    <div className="relative">
                                        <input
                                            type={isVisiblePassword3 ? "text" : "password"}
                                            id="reNewPassword"
                                            {...register("reNewPassword")}
                                            className="peer py-2.5 sm:py-3 pe-0 ps-8 block w-full bg-transparent border-t-transparent border-b-2 border-x-transparent border-b-gray-200 sm:text-base focus:border-t-transparent focus:border-x-transparent focus:border-b-red-500 focus:ring-0 focus:outline-none disabled:opacity-50 disabled:pointer-events-none"
                                            placeholder="Nhập lại mật khẩu"
                                        />
                                        <div className="absolute inset-y-0 start-0 flex items-center pointer-events-none ps-2">
                                            <svg
                                                className="shrink-0 size-4 text-gray-500"
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 15.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M3.4 10c1.5-5 7-7 8.6-7s7.1 2 8.6 7c-1.5 5-7 7-8.6 7S4.9 15 3.4 10Z" />
                                            </svg>
                                        </div>
                                        <div className="absolute inset-y-0 end-0 flex items-center pe-2 peer-disabled:opacity-50">
                                            <button
                                                onClick={handleShowPassword3}
                                                className="cursor-pointer"
                                                type="button"
                                                tabIndex={-1}
                                            >
                                                {isVisiblePassword3 ? (
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        strokeWidth="2"
                                                        stroke="currentColor"
                                                        className="size-4 shrink-0 text-gray-500"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                                                        />
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                                                        />
                                                    </svg>
                                                ) : (
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        strokeWidth="2"
                                                        stroke="currentColor"
                                                        className="size-4 shrink-0 text-gray-500"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
                                                        />
                                                    </svg>
                                                )}
                                            </button>
                                        </div>
                                    </div>
                                    {errors.reNewPassword && (
                                        <p className="text-xs text-red-600 mt-1">{errors.reNewPassword.message}</p>
                                    )}
                                </div>
                                {/* End Form reNewPassword */}



                                <button
                                    type="submit"
                                    className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-base font-medium rounded-lg border border-transparent bg-red-500 text-white hover:bg-red-600 focus:outline-hidden focus:bg-red-600 disabled:opacity-50 disabled:pointer-events-none"
                                >
                                    Đổi mật khẩu
                                </button>
                            </div>
                        </form>
                        {/* End Form */}
                    </div>
                </div>
            </div>
        </div>
    );
};
export default ChangePasswordPageForUser;
