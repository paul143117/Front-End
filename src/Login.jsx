import "./Login.css";
import { fetchCurrentUser, login } from "./services/api";
import { useState } from "react";

const Login = ({ onLogin }) => {
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);

    const form = new FormData(e.currentTarget);
    const email = String(form.get("email") || "").trim();
    const password = String(form.get("password") || "");

    try {
      await login({ email, password, device_name: "tomol-react-app" });
      const user = await fetchCurrentUser();

      onLogin({
        id: String(user?.id ?? "—"),
        email: user?.email ?? email,
        name: user?.name ?? "—",
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-card">
      
        <div className="login-left">
          <h3 className="logo-text">Pink Desert Landscape</h3>
        </div>

        <div className="login-right">
          <h1>Login</h1>

          <form onSubmit={handleLogin}>
            <div className="input-group">
              <label>Email</label>
              <input
                name="email"
                type="email"
                placeholder="example@mail.com"
                required
              />
            </div>

            <div className="input-group">
              <label>Password</label>
              <input
                name="password"
                type="password"
                placeholder="••••••••"
                required
              />
            </div>

            {error && <div className="login-error">{error}</div>}

            <button type="submit" className="login-btn">
              {submitting ? "Signing in..." : "Login"}
            </button>

          </form>

          <div className="login-links">
            <span>Create an account</span>
            <span>Forgot password</span>
          </div>

        </div>

      </div>
    </div>
  );
};

export default Login;