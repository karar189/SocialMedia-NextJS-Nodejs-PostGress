import React from "react";
import Link from "next/link";
import Head from "next/head";

const Navbar = () => {
  return (
    <>
      <Head>
        <title>Social Media PWA</title>
      </Head>
      <nav>
        <h2>
          <Link href="/">Go to Home</Link>
        </h2>
        <h2>
          <Link href="/postpage">Go to route /postpage</Link>
        </h2>
        <h2>
          <Link href="/authpage">Go to route /auth</Link>
        </h2>
      </nav>
    </>
  );
};

export default Navbar;
