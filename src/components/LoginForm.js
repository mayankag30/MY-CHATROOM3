import { useState } from "react";
import axios from "axios";

function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const authObject = {
      "Project-ID": "46f4b846-24d5-44ce-b33e-cab0a4365993",
      "User-Name": username,
      "User-Secret": password,
    };

    // try to get the messages once we actually have the user
    try {
      // username/password = ask chatengine -> give messages
      await axios.get("https://api.chatengine.io/chats", {
        headers: authObject,
      });
      // works out -> logged In
      // store the username and password to localStorage
      // to avoid re-login
      localStorage.setItem("username", username);
      localStorage.setItem("password", password);

      // reload the page
      window.location.reload();
    } catch (err) {
      // else error -> try with new username...
      setError("Oops! Invalid Username or Password");
      setUsername("");
      setPassword("");
    }
  };

  return (
    <div className="wrapper">
      <div className="form">
        <h1 className="title"> Chat Application </h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="input"
            placeholder="Username"
            required
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input"
            placeholder="Password"
            required
          />
          <div align="center">
            <button type="submit" className="button">
              <span>Start Chatting</span>
            </button>
          </div>
          <h2 className="error">{error}</h2>
        </form>
      </div>
    </div>
  );
}

export default LoginForm;
