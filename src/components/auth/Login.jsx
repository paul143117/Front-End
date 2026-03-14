import { useState } from "react";
import "../../Login.css";

function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, validate here then call onLogin on success
    if (onLogin) {
      onLogin({ email });
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <h1 className="login-title">studentportal</h1>
        <p className="login-subtitle">Sign in with your student account</p>
        <form onSubmit={handleSubmit} className="login-form">
          <label>
            Email
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
          <label>
            Password
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
          <button type="submit" className="login-button">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;

