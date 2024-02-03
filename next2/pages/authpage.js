import { useState } from "react";
import { useStore } from "../store/index";
import { useRouter } from "next/router";

const Authpage = () => {
  // Login state
  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  // Registration state
  const [registerUsername, setRegisterUsername] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");

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

  return (
    <>
      <h1>This is route /auth</h1>
      <div>
        <h2>Login</h2>
        <input
          value={loginUsername}
          onChange={(e) => setLoginUsername(e.target.value)}
          placeholder="Username"
        />
        <input
          type="password"
          value={loginPassword}
          onChange={(e) => setLoginPassword(e.target.value)}
          placeholder="Password"
        />
        <button onClick={handleLogin}>Login</button>
      </div>
      <div>
        <h2>Register</h2>
        <input
          value={registerUsername}
          onChange={(e) => setRegisterUsername(e.target.value)}
          placeholder="Username"
        />
        <input
          value={registerEmail}
          onChange={(e) => setRegisterEmail(e.target.value)}
          type="email"
          placeholder="Email"
        />
        <input
          type="password"
          value={registerPassword}
          onChange={(e) => setRegisterPassword(e.target.value)}
          placeholder="Password"
        />
        <button onClick={handleRegister}>Register</button>
      </div>
    </>
  );
};

export default Authpage;
