"use client";
import { useAuth } from "@/hooks/useAuth";
import { loginData } from "@/services/UserService";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Toaster, toast } from "react-hot-toast";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errorMsg, setErrorMsg] = useState({
    email: "",
    password: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const { setAuthenticated } = useAuth();

  const hasError = (errorObj) => {
    return Object.values(errorObj).some((item) => !!item);
  };

  const router = useRouter();

  useEffect(() => {
    if (!isSubmitted) {
      return;
    }
    let errorObj = structuredClone(errorMsg);
    Object.entries(formData).map((field) => {
      let fieldName = field[0];
      let fieldVal = field[1];
      switch (fieldName) {
        case "email":
          if (fieldVal.length === 0) {
            errorObj[fieldName] = "Username/Email is required";
          } else {
            errorObj[fieldName] = "";
          }
          break;
        case "password":
          if (fieldVal.length === 0) {
            errorObj[fieldName] = "Password is required";
          } else {
            errorObj[fieldName] = "";
          }
          break;
      }
    });
    setErrorMsg(errorObj);
    let chkErr = hasError(errorObj);
    console.log("Check error", errorObj, chkErr);
    /* No errors found, save data */
    if (!chkErr) {
      userLogin();
    } else {
      toast.error("Error found");
    }
  }, [isSubmitted]);

  const userLogin = async () => {
    setIsLoading(true);
    const response = await loginData(formData);
    if (response?.status === 1) {
      setFormData({
        email: "",
        password: "",
      });
      toast.success("Login successful");
      setAuthenticated(true);
      router.push("/user/profile");
    } else {
      let err = response.error ?? "Error saving data";
      toast.error(err);
    }
    setIsLoading(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted((prevState) => prevState + 1);
  };

  const formHasErrors = hasError(errorMsg);

  console.log("Submitted", isSubmitted, errorMsg);

  return (
    <div className="flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <Toaster />
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="text-center text-2xl font-bold text-white-600">
            Sign in to your account
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit} noValidate>
          <div className="rounded-md shadow-sm">
            <div className="mb-3">
              <label htmlFor="email" className="sr-only">
                Username/Email
              </label>
              <input
                id="email"
                name="email"
                type="text"
                className="appearance-none rounded relative block w-full px-3 py-2 border text-gray-700 placeholder-gray-400 focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Email/Username"
                onChange={handleChange}
                disabled={isLoading}
                value={formData.email}
              />
              {errorMsg?.email && (
                <p className="mt-2  text-pink-600 text-sm">{errorMsg?.email}</p>
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                className="appearance-none rounded relative block w-full px-3 py-2 border text-gray-700 placeholder-gray-400 focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Password"
                onChange={handleChange}
                disabled={isLoading}
                value={formData.password}
              />
              {errorMsg?.password && (
                <p className="mt-2  text-pink-600 text-sm">
                  {errorMsg?.password}
                </p>
              )}
            </div>
          </div>
          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-300"
            >
              {isLoading ? (
                <svg
                  aria-hidden="true"
                  role="status"
                  className="inline w-4 h-4 mr-3 text-gray-200 animate-spin dark:text-gray-600"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="#1C64F2"
                  />
                </svg>
              ) : (
                "Login"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
