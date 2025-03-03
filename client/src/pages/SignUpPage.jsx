import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";

const SignUpPage = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signup } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signup(username, email, password);
      navigate("/");
    } catch (error) {
      console.error("Sign up failed:", error);
    }
  };

  const handleSignUp = () => {
    navigate("/login");
  };

  return (
    <div className="center padding">
      {/* <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Sign Up</button> */}
      <form className="padding center " onSubmit={handleSubmit}>
        <h1 className="rubik-bubbles-regular center-align">Sign Up</h1>
        <fieldset>
          <div className="field border label">
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <label>Username</label>
          </div>
          <div className="field border label">
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <label>Email</label>
          </div>
          <div className="field border label">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <label>Password</label>
          </div>
          <button type="submit">Sign Up</button>
        </fieldset>
        <p className="center-align">
          Have an account?{" "}
          <a className="link" onClick={handleSignUp}>
            Sign in{" "}
          </a>
        </p>
      </form>
    </div>
  );
};

export default SignUpPage;
