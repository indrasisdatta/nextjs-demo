"use client";
import { logoutData } from "@/services/UserService";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const Logout = () => {
  const router = useRouter();

  useEffect(() => {
    (async () => {
      const response = await logoutData();
      if (response?.status === 1) {
        router.push("/");
      } else {
        let err = response.error ?? "Something went wrong";
      }
    })();
  }, []);

  return null;
};

export default Logout;
