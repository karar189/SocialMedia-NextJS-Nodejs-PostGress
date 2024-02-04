import React from "react";
import Link from "next/link";
import Head from "next/head";
import Image from "next/image";
import { useStore } from "../store/index";
const Navbar = () => {
  const { user, clearUser } = useStore();

  const handleLogout = () => {
    clearUser();
  };
  return (
    <>
      <Head>
        <title>Social Media PWA</title>
      </Head>
      <nav className="bg-white shadow flex items-center justify-between px-32 py-3">
        <div className="flex items-center">
          <Image
            src="/path-to-your-logo.svg"
            alt="Logo"
            width={40}
            height={40}
          />
          <div className="hidden sm:flex items-center space-x-1">
            <Link href="/">
              <a className="text-blue-600 font-semibold px-3 py-2 text-sm hover:text-blue-800">
                Home
              </a>
            </Link>
            <Link href="/postpage">
              <a className="text-gray-600 font-semibold px-3 py-2 text-sm hover:text-blue-800">
                Postpage
              </a>
            </Link>
          </div>
        </div>

        {/* Right Side Icons */}
        <div className="flex items-center space-x-4">
          <Link href="/authpage">
            <a className="text-gray-600 font-semibold px-3 py-2 text-sm hover:text-blue-800 -mr-10">
              Login / Register
            </a>
          </Link>
          <div className="userr px-2">
            {user ? (
              <>
                <p className="text-gray-600 font-semibold px-3 py-2 text-sm ">
                  <span>
                    <button
                      className="p-2  rounded-full hover:bg-gray-10 hover:text-blue-800 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
                      onClick={handleLogout}
                    >
                      Logout
                    </button>
                  </span>
                  Welcome, {user.username}!
                </p>
              </>
            ) : (
              <p></p>
            )}
          </div>

          <img
            className="h-8 w-8 rounded-full object-cover"
            src="/path-to-your-profile-image.jpg"
            alt="Your Name"
          />
        </div>
      </nav>
    </>
  );
};

export default Navbar;
