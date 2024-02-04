import { useState } from "react";
import { useStore } from "../store/index";
import { useRouter } from "next/router";

const Authpage = () => {
  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [registerUsername, setRegisterUsername] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [showLogin, setShowLogin] = useState(true);

  const router = useRouter();
  const { loginUser } = useStore();

  const handleLogin = () => {
    loginUser(loginUsername, loginPassword);
    setLoginUsername("");
    setLoginPassword("");
    router.push("/postpage");
  };

  const handleRegister = () => {
    useStore
      .getState()
      .registerUser(registerUsername, registerEmail, registerPassword);
    setRegisterUsername("");
    setRegisterEmail("");
    setRegisterPassword("");
  };

  const toggleForm = () => {
    setShowLogin(!showLogin);
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-purple-300 via-purple-200 to-purple-100">
      <div className="w-full max-w-md p-8 bg-white shadow-md rounded">
        {showLogin ? (
          <div>
            <h2 className="text-center text-2xl font-bold text-gray-700 mb-6">
              Sign in to your account
            </h2>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4"
              id="username"
              type="text"
              placeholder="Email address"
              value={loginUsername}
              onChange={(e) => setLoginUsername(e.target.value)}
            />
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-4 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="Password"
              value={loginPassword}
              onChange={(e) => setLoginPassword(e.target.value)}
            />
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
              onClick={handleLogin}
            >
              Sign in
            </button>
            <div className="mt-4 text-center">
              <a
                href="#"
                className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
                onClick={() => setShowLogin(false)}
              >
                Forgot password?
              </a>
            </div>
            <div className="mt-4 text-center">
              <button
                className="text-blue-500 hover:text-blue-800 text-sm"
                onClick={toggleForm}
              >
                Not a member? Start a 14 day free trial
              </button>
            </div>
          </div>
        ) : (
          <div>
            <h2 className="text-center text-2xl font-bold text-gray-700 mb-6">
              Create an account
            </h2>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4"
              id="registerUsername"
              type="text"
              placeholder="Username"
              value={registerUsername}
              onChange={(e) => setRegisterUsername(e.target.value)}
            />
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-4 leading-tight focus:outline-none focus:shadow-outline"
              id="registerEmail"
              type="email"
              placeholder="Email"
              value={registerEmail}
              onChange={(e) => setRegisterEmail(e.target.value)}
            />
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-4 leading-tight focus:outline-none focus:shadow-outline"
              id="registerPassword"
              type="password"
              placeholder="Password"
              value={registerPassword}
              onChange={(e) => setRegisterPassword(e.target.value)}
            />
            <button
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
              onClick={handleRegister}
            >
              Register
            </button>
            <div className="mt-4 text-center">
              <button
                className="text-blue-500 hover:text-blue-800 text-sm"
                onClick={toggleForm}
              >
                Already have an account? Sign in
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Authpage;
