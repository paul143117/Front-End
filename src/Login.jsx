import "./Login.css";
import { fetchCurrentUser, login, register } from "./services/api";
import { useState } from "react";

const Login = ({ onLogin }) => {
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [showCreateAccount, setShowCreateAccount] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");
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

  const handleCreateAccount = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");
    setSubmitting(true);

    const form = new FormData(e.currentTarget);
    const name = String(form.get("name") || "").trim();
    const email = String(form.get("email") || "").trim();
    const password = String(form.get("password") || "");

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      setSubmitting(false);
      return;
    }

    try {
      await register({ name, email, password });
      setSuccessMessage("Account created! Signing you in...");
      const user = await fetchCurrentUser();
      onLogin({
        id: String(user?.id ?? "—"),
        email: user?.email ?? email,
        name: user?.name ?? (name || email.split("@")[0]),
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Registration failed.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-card">
        <div className="login-left">
          <h3 className="logo-text"></h3>
        </div>

        <div className="login-right">
          {showCreateAccount ? (
            <>
              <h1>Create an account</h1>
              <form onSubmit={handleCreateAccount}>
                <div className="input-group">
                  <label>Name</label>
                  <input
                    name="name"
                    type="text"
                    placeholder="Your name"
                    autoComplete="name"
                  />
                </div>
                <div className="input-group">
                  <label>Email</label>
                  <input
                    name="email"
                    type="email"
                    placeholder="example@mail.com"
                    required
                    autoComplete="email"
                  />
                </div>
                <div className="input-group">
                  <label>Password</label>
                  <input
                    name="password"
                    type="password"
                    placeholder="At least 6 characters"
                    required
                    minLength={6}
                    autoComplete="new-password"
                  />
                </div>
                {error && <div className="login-error">{error}</div>}
                {successMessage && <div className="login-success">{successMessage}</div>}
                <button type="submit" className="login-btn" disabled={submitting}>
                  {submitting ? "Creating account..." : "Create account"}
                </button>
              </form>
              <div className="login-links">
                <span onClick={() => { setShowCreateAccount(false); setError(""); setSuccessMessage(""); }}>
                  Back to login
                </span>
              </div>
            </>
          ) : (
            <>
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
                <button type="submit" className="login-btn" disabled={submitting}>
                  {submitting ? "Signing in..." : "Login"}
                </button>
              </form>
              <div className="login-links">
                <span onClick={() => { setShowCreateAccount(true); setError(""); }}>
                  Create an account
                </span>
                <span>Forgot password</span>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;