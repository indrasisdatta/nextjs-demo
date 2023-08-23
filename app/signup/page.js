"use client";
import { signupData } from "@/services/UserService";
import { validateEmail } from "@/utils/helpers";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Toaster, toast } from "react-hot-toast";

const Signup = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errorMsg, setErrorMsg] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

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
        case "username":
          if (fieldVal.length === 0) {
            errorObj[fieldName] = "Username is required";
          } else {
            errorObj[fieldName] = "";
          }
          break;
        case "email":
          if (fieldVal.length === 0) {
            errorObj[fieldName] = "Email is required";
          } else if (!validateEmail(fieldVal)) {
            errorObj[fieldName] = "Email is invalid";
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
        case "confirmPassword":
          if (fieldVal.length === 0) {
            errorObj[fieldName] = "Confirm Password is required";
          } else if (formData.password !== fieldVal) {
            errorObj[fieldName] =
              "Password and Confirm Password fields should match";
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
      signupSave();
    } else {
      toast.error("Error found");
    }
  }, [isSubmitted]);

  const signupSave = async () => {
    setIsLoading(true);
    const response = await signupData(formData);
    if (response?.status === 1) {
      setFormData({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
      toast.success("Sign up successful");
      setTimeout(() => {
        router.push("/login");
      }, 1200);
    } else {
      let err = "Error saving data";
      if (response.hasOwnProperty("error") && Array.isArray(response.error)) {
        err = response.error[0];
      }
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
            Sign up for an account
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit} noValidate>
          <div className="rounded-md shadow-sm">
            <div className="mb-3">
              <label htmlFor="username" className="sr-only">
                Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                autoComplete="username"
                className="appearance-none relative block w-full px-3 py-2 border text-gray-700 placeholder-gray-400 focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm rounded"
                placeholder="Username"
                onChange={handleChange}
                disabled={isLoading}
                value={formData.username}
              />
              {errorMsg?.username && (
                <p className="mt-2  text-pink-600 text-sm">
                  {errorMsg?.username}
                </p>
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="sr-only">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                className="appearance-none rounded relative block w-full px-3 py-2 border text-gray-700 placeholder-gray-400 focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
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
            <div className="mb-3">
              <label htmlFor="confirmPassword" className="sr-only">
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                autoComplete="new-password"
                className="appearance-none rounded relative block w-full px-3 py-2 border text-gray-700 placeholder-gray-400 focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Confirm Password"
                onChange={handleChange}
                disabled={isLoading}
                value={formData.confirmPassword}
              />
              {errorMsg?.confirmPassword && (
                <p className="mt-2  text-pink-600 text-sm">
                  {errorMsg?.confirmPassword}
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
              {isLoading ? "Loading" : "Sign Up"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
