import { useNavigate } from "react-router-dom";
import { apiRegisterForCustomer } from "../../config/api";
import { toast } from "react-toastify";
import CustomToast from "../../components/common/toast.message";
import { SubmitHandler, useForm } from "react-hook-form";

interface RegisterFormInputs {
  name: string;
  email: string;
  password: string;
  phone: string;
  address: string;
}

const RegisterPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<RegisterFormInputs>();
  const navigate = useNavigate();

  const handleRegister: SubmitHandler<RegisterFormInputs> = async (values) => {
    
    const response = await apiRegisterForCustomer(values.name, values.email, values.password, values.phone, values.address);
    if (response.data?.data?.id) {
      toast.success(
        <CustomToast
          message="Đăng ký thành công!"
          className="text-green-600"
        />
      );
      navigate("/login");
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
    <div className="max-w-4xl mx-auto p-6 mt-6">
      <div className="text-center mb-12">
        <h2 className="text-2xl font-semibold text-gray-800">
          Sign up your account
        </h2>
        <p className="text-gray-600 mt-2">
          Please fill in the information to create a new account.
        </p>
      </div>

      <form
        onSubmit={handleSubmit(handleRegister)}
      >
        <div className="grid sm:grid-cols-2 gap-6">
          {/* Name */}
          <div>
            <label
              className="block text-sm font-medium text-gray-700 mb-2"
              htmlFor="name"
            >
              Full Name
            </label>
            <input
              id="name"
              type="text"
              {...register("name", { required: true })}
              aria-invalid={errors.name ? "true" : "false"}
              className="block w-full px-4 py-3 text-sm text-gray-800 bg-gray-100 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.name?.type === "required" && (
                <p role="alert">Name is required</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label
              className="block text-sm font-medium text-gray-700 mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              {...register("email", { required: true })}
              aria-invalid={errors.email ? "true" : "false"}
              className="block w-full px-4 py-3 text-sm text-gray-800 bg-gray-100 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.email?.type === "required" && (
                <p role="alert">Email is required</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label
              className="block text-sm font-medium text-gray-700 mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              {...register("password", { required: true })}
              aria-invalid={errors.password ? "true" : "false"}
              className="block w-full px-4 py-3 text-sm text-gray-800 bg-gray-100 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.password?.type === "required" && (
                <p role="alert">Password is required</p>
            )}
          </div>

          {/* Phone */}
          <div>
            <label
              className="block text-sm font-medium text-gray-700 mb-2"
              htmlFor="phone"
            >
              Mobile No.
            </label>
            <input
              id="phone"
              type="tel"
              {...register("phone", { required: true })}
              aria-invalid={errors.phone ? "true" : "false"}
              className="block w-full px-4 py-3 text-sm text-gray-800 bg-gray-100 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.phone?.type === "required" && (
                <p role="alert">Phone is required</p>
            )}
          </div>

          {/* Address */}
          <div className="sm:col-span-2">
            <label
              className="block text-sm font-medium text-gray-700 mb-2"
              htmlFor="address"
            >
              Address
            </label>
            <input
              id="address"
              type="text"
              {...register("address", { required: true })}
              aria-invalid={errors.address ? "true" : "false"}
              className="block w-full px-4 py-3 text-sm text-gray-800 bg-gray-100 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.address?.type === "required" && (
                <p role="alert">Address is required</p>
            )}
          </div>
        </div>

        <div className="mt-8">
          <button
            type="submit"
            className="w-full py-3 px-6 text-sm font-medium tracking-wider text-white bg-blue-600 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Sign up
          </button>
        </div>
      </form>
    </div>
  );
};

export default RegisterPage;
