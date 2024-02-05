import React from "react";
import Link from "next/link";
import Head from "next/head";
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
          <img
            src="https://static.vecteezy.com/system/resources/thumbnails/012/682/141/small/colorful-gradient-round-shape-circle-decoration-png.png"
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
        <div className="flex items-center">
          <div className="userr pl-4 w-96 flex">
            {user ? (
              <>
                <p className="text-gray-600 font-semibold px-3 py-2 text-sm flex">
                  <span className="px-4">
                    <button
                      className="p-2  rounded-full hover:bg-gray-10 hover:text-blue-800 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
                      onClick={handleLogout}
                    >
                      Logout
                    </button>
                  </span>
                  <span className="mr-1 mt-2">Welcome, {user.username}!</span>
                  <span>
                    {" "}
                    <img
                      className="h-14 w-14 pb-4 rounded-full object-cover"
                      src="https://www.shutterstock.com/image-vector/young-smiling-man-adam-avatar-600nw-2107967969.jpg"
                      alt="Your Name"
                    />
                  </span>
                </p>
              </>
            ) : (
              <Link href="/authpage">
                <a className="text-gray-600 font-semibold  py-2 text-sm hover:text-blue-800 -mr-10 w-80 text-right">
                  Login | Register
                </a>
              </Link>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
