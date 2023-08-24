"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
import { loggedinUserData } from "@/services/UserService";

const HeaderMenu = () => {
  const { authenticated, setAuthenticated } = useAuth();

  useEffect(() => {
    (async () => {
      const response = await loggedinUserData();
      if (response.status == 1 && response.data?.id) {
        setAuthenticated(true);
      } else {
        setAuthenticated(false);
      }
    })();
  }, []);

  console.log("Authenticated flag", authenticated);
  return (
    <ul className="flex space-x-4">
      <li>
        <Link href="/" className="hover:text-gray-300">
          Home
        </Link>
      </li>
      <li>
        <Link href="/examples/teacher" className="hover:text-gray-300">
          Teachers
        </Link>
      </li>
      <li>
        <Link href="/examples/student" className="hover:text-gray-300">
          Students
        </Link>
      </li>
      <li>
        <Link href="/examples/todo" className="hover:text-gray-300">
          To do
        </Link>
      </li>
      {authenticated === false && (
        <li>
          <Link href="/user/login" className="hover:text-gray-300">
            Login
          </Link>
        </li>
      )}
      {authenticated === false && (
        <li>
          <Link href="/user/signup" className="hover:text-gray-300">
            Sign up
          </Link>
        </li>
      )}
      {authenticated === true && (
        <li>
          <Link href="/user/profile" className="hover:text-gray-300">
            Profile
          </Link>
        </li>
      )}
      {authenticated === true && (
        <li>
          <Link href="/user/logout" className="hover:text-gray-300">
            Logout
          </Link>
        </li>
      )}
    </ul>
  );
};

export default HeaderMenu;
