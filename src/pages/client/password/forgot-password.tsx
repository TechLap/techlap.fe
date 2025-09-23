import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import * as yup from "yup";
import { forbiddenWords, sanitizeInput } from "../../../components/common/forbiddenWord";
import CustomToast from "../../../components/common/toast.message";
import { apiForgotPasswordForCustomer } from "../../../config/api";


const ForgotPasswordPageForCustomer = () => {
    const forgotPasswordSchema = yup
        .object({
            email: yup
                .string()
                .transform((value) => sanitizeInput(value))
                .email("Email không hợp lệ")
                .required("Email không được để trống")
                .test(
                    "forbidden-words",
                    "Tên đăng nhập chứa từ khóa không hợp lệ",
                    (value) => {
                        if (!value) return false;
                        const lowerValue = value.toLowerCase();
                        return !forbiddenWords.some((word) => lowerValue.includes(word));
                    }
                ),
        })
        .required();

    type FormValues = yup.InferType<typeof forgotPasswordSchema>;

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<FormValues>({ resolver: yupResolver(forgotPasswordSchema) as any });

    const handleForgotPassword: SubmitHandler<FormValues> = async (values) => {
        const response = await apiForgotPasswordForCustomer(
            values.email
        );
        if (response.data) {
            toast.success(
                <CustomToast
                    message="Token đã được gửi qua Email!"
                    className="text-green-600"
                />
            );
        } else {
            toast.error(
                <CustomToast
                    message={response.statusText ?? "Đã xảy ra lỗi!"}
                    className="text-red-600"
                />
            );
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-600 to-purple-700">
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
                            Quên mật khẩu
                        </h1>
                    </div>
                    <div className="mt-5">
                        {/* Form */}
                        <form
                            onSubmit={handleSubmit(handleForgotPassword)}
                        >
                            <div className="grid gap-y-4">
                                {/* Form oldPassword */}
                                <div>
                                    <div className="flex flex-wrap justify-between items-center gap-2">
                                        <label htmlFor="email" className="block text-base mb-2">
                                            Email
                                        </label>
                                    </div>
                                    <div className="relative">
                                        <input
                                            type="email"
                                            id="email"
                                            {...register("email")}
                                            className="peer py-2.5 sm:py-3 pe-0 ps-8 block w-full bg-transparent border-t-transparent border-b-2 border-x-transparent border-b-gray-200 sm:text-base focus:border-t-transparent focus:border-x-transparent focus:border-b-blue-500 focus:ring-0 focus:outline-none disabled:opacity-50 disabled:pointer-events-none"
                                            placeholder="Nhập email đã đăng ký"
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
                                                <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                                                <circle cx="12" cy="7" r="4"></circle>
                                            </svg>
                                        </div>


                                    </div>
                                    <div>
                                        {errors.email && (
                                            <p className="text-xs text-red-600 mt-1">{errors.email.message}</p>
                                        )}</div>
                                </div>
                                <button
                                    type="submit"
                                    className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-base font-medium rounded-lg border border-transparent bg-blue-500 text-white hover:bg-blue-600 focus:outline-hidden focus:bg-blue-600 disabled:opacity-50 disabled:pointer-events-none"
                                >
                                    Nhận Token qua Email
                                </button>
                                <p className="text-center text-sm text-gray-600">
                                    <Link
                                        to="/login"
                                        className="font-medium text-blue-500 hover:underline"
                                    >
                                        Quay lại đăng nhập
                                    </Link>
                                </p>
                            </div>
                        </form>
                        {/* End Form */}
                    </div>
                </div>
            </div>
        </div>
    );
};
export default ForgotPasswordPageForCustomer;