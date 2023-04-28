import { useState } from "react";
import FirebaseAuthService from "../FirebaseAuthService";

const LoginForm = ({ existingUser }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      await FirebaseAuthService.loginUser(username, password);
      setUsername("");
      setPassword("");
    } catch (error) {
      alert(error.message);
    }
  }

  function handleLogout() {
    FirebaseAuthService.logoutUser();
  }

  async function handleSendResetPasswordEmail() {
    if (!username) {
      alert("Missing username");
      return;
    }

    try {
      await FirebaseAuthService.sendPasswordResetEmail(username);
      alert("send password reset email");
    } catch (error) {
      console.log(error.message);
    }
  }

  // async function handleLoginWithGoogle() {
  //   try {
  //     await FirebaseAuthService.loginWithGoogle();
  //   } catch (error) {
  //     console.log(error.message);
  //   }
  // }

  return (
    <div className="login-form-container">
      {existingUser ? (
        <div className="row">
          <h3>Welcome, {existingUser.email} </h3>
          <button
            onClick={handleLogout}
            type="button"
            className="primary-button"
          >
            Logout
          </button>
        </div>
      ) : (
        <form className="login-form" onSubmit={handleSubmit}>
          <label className="input-label login-label">
            Username (email):
            <input
              type="email"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="input-text"
            />
          </label>
          <label className="input-label login-label">
            Password:
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input-text"
            />
          </label>
          <div className="button-box">
            <button className="primary-button">Login</button>
            <button
              type="button"
              className="primary-button"
              onClick={handleSendResetPasswordEmail}
            >
              Reset password
            </button>
            {/* <button
              type="button"
              className="primary-button"
              onClick={handleLoginWithGoogle}
            >
              Login with google
            </button> */}
          </div>
        </form>
      )}
    </div>
  );
};

export default LoginForm;
