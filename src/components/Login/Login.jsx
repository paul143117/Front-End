import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Login attempt:', formData);
    navigate('/dashboard');
  };

  return (
    <div className="login-container">
      <div className="login-card">

        <div className="login-left">
          <h1 className="login-title">Hello!</h1>
          <p className="login-subtitle">Sign in to your account</p>

          <form onSubmit={handleSubmit} className="login-form">

            <div className="form-group">
              <div className="input-wrapper">
                <div className="input-icon email-icon">
                  📧
                </div>

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="E-mail"
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <div className="input-wrapper">
                <div className="input-icon password-icon">
                  🔒
                </div>

                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Password"
                  required
                />

                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  👁
                </button>
              </div>
            </div>

            <div className="form-options">
              <label className="remember-me">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                Remember me
              </label>

              <a href="#" className="forgot-password">
                Forgot password?
              </a>
            </div>

            <button type="submit" className="login-button">
              SIGN IN
            </button>

          </form>

          <div className="signup-link">
            <p>Don't have an account? <a href="#">Create</a></p>
          </div>
        </div>

        <div className="login-right">
          <div className="decorative-shapes">
            <div className="shape shape-1"></div>
            <div className="shape shape-2"></div>
            <div className="shape shape-3"></div>
          </div>

          <h2 className="welcome-title">Welcome Back!</h2>

          <p className="welcome-text">
            We're glad to see you again. Please sign in to continue accessing your account.
          </p>
        </div>

      </div>
    </div>
  );
}

export default Login;