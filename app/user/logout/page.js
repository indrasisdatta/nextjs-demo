"use client";
import { useAuth } from "@/hooks/useAuth";
import { logoutData } from "@/services/UserService";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const Logout = () => {
  const router = useRouter();
  const { setAuthenticated } = useAuth();

  useEffect(() => {
    (async () => {
      const response = await logoutData();
      if (response?.status === 1) {
        setAuthenticated(false);
        router.push("/");
      } else {
        let err = response.error ?? "Something went wrong";
      }
    })();
  }, []);

  return null;
};

export default Logout;
