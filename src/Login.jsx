import "./Login.css";

const Login = ({ onLogin }) => {

  const handleLogin = (e) => {
    e.preventDefault(); 
    onLogin(); 
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
              <input type="email" placeholder="example@mail.com" required />
            </div>

            <div className="input-group">
              <label>Password</label>
              <input type="password" placeholder="••••••••" required />
            </div>

            <button type="submit" className="login-btn">
              Login
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