import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AuthContext);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Login attempt with email:", email);
    console.log("Login attempt with password:", password);
    setError("");
    try {
      await login(email, password);
      console.log("Login successful");
      navigate("/");
    } catch (error) {
      console.error("Login failed:", error);
      setError("Login failed. Please check your credentials.");
    }
  };

  const handleSignup = () => {
    navigate("/signup");
  };

  return (
    <>
      <div className="center padding">
        <h1 className="rubik-bubbles-regular center-align">Login</h1>
        <form className="padding center" onSubmit={handleSubmit}>
          <fieldset>
            <legend>Fill all fields</legend>
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
            <button type="submit">Login</button>
          </fieldset>
          <p className="center-align">
            Do not have an account?{" "}
            <a className="link" onClick={handleSignup}>
              Sign up
            </a>
          </p>
        </form>
      </div>
      {error && <p className="error center-align large">{error}</p>}
    </>
  );
};

export default LoginPage;
