import Head from "next/head";
import Link from "next/link";

const HeroSection = () => {
  return (
    <>
      <Head>
        <title>Social Media App</title>
      </Head>
      <div className="flex justify-center items-center h-screen bg-gradient-to-r from-purple-300 via-purple-200 to-purple-100">
        <div className="text-center">
          {/* <img src="/" alt="Logo" className="mx-auto mb-8" /> */}
          <div className="bg-white text-purple-600 py-2 px-4 rounded-full mb-8 inline-block shadow-md">
            Announcing our new features.{" "}
            <Link href="/features">
              <a className="font-semibold">Read more →</a>
            </Link>
          </div>

          {/* Main heading */}
          <h1 className="text-6xl font-bold text-gray-800">
            Connect with your world
          </h1>

          {/* Subtext */}
          <p className="mt-4 text-xl text-gray-700">
            Join the conversation, explore communities, and share with the
            people that matter to you.
          </p>

          {/* Action buttons */}
          <div className="mt-8">
            <button className="bg-blue-600 text-white font-bold py-3 px-8 rounded-full mr-4 hover:bg-blue-700 transition duration-300">
              Get started
            </button>
            <Link href="/authpage">
              <a className="text-blue-600 font-semibold py-3 px-8 rounded-full inline-block border border-blue-600 hover:bg-blue-600 hover:text-white transition duration-300">
                Login Now
              </a>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

const Index = () => {
  return (
    <div>
      <HeroSection />
    </div>
  );
};

export default Index;
