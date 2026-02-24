import "./Login.css";

const Login = ({ onLogin }) => {
  return (
    <div className="login-wrapper">
      <div className="login-card">
        <div className="login-left">
          <h3 className="logo-text">Pink Desert Landscape</h3>
        </div>

        <div className="login-right">
          <h1>Login</h1>

          <div className="input-group">
            <label>Email</label>
            <input type="email" placeholder="example@mail.com" />
          </div>

          <div className="input-group">
            <label>Password</label>
            <input type="password" placeholder="••••••••" />
          </div>

          <button className="login-btn" onClick={onLogin}>
            Login
          </button>

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