import React, { useContext, useState } from "react";
import axios from "axios";
import { API_KEY } from "../api/api";
import { useNavigate } from "react-router-dom";
import Context from "../context/Context";

export default function Login(props) {
  // const { setFavoriteList } = useContext(React.createContext({}));
  // const { setRatedList } = useContext(React.createContext({}));
  const [usernameInput, setUsernameInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const contextValue = useContext(Context);

  const handleUsernameChange = (e) => {
    //console.log(e.target.value);
    setUsernameInput(e.target.value);
  };

  const handlePasswordChange = (e) => {
    //console.log(e.target.value);
    setPasswordInput(e.target.value);
    //console.log(passwordInput);
  };

  const handleSubmit = () => {
    if (usernameInput === "" || passwordInput === "") {
      alert("Enter your username and password");
    } else {
      login(usernameInput, passwordInput);
    }
    setUsernameInput("");
    setPasswordInput("");
  };

  const login = async (username, password) => {
    try {
      // console.log("hello");
      setLoading(true);
      const {
        data: { request_token }
      } = await axios.get(
        `https://api.themoviedb.org/3/authentication/token/new?api_key=${API_KEY}`
      );
      // console.log(request_token);
      await axios.post(
        `https://api.themoviedb.org/3/authentication/token/validate_with_login?api_key=${API_KEY}`,
        {
          username,
          password,
          request_token
        }
      );
      const {
        data: { session_id }
      } = await axios.post(
        `https://api.themoviedb.org/3/authentication/session/new?api_key=${API_KEY}`,
        { request_token }
      );
      axios.defaults.params = { ...axios.defaults.params, session_id };
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/account?api_key=${API_KEY}`
      );
      const userData = {
        username,
        accoundId: data.id,
        sessionId: session_id,
        requestToken: request_token
      };
      //console.log(userData);
      const favoriteData = await axios.get(
        `https://api.themoviedb.org/3/account/${contextValue.user.username}/favorite/movies?api_key=${API_KEY}&session_id=${contextValue.user.sessionId}`
      );
      const ratedData = await axios.get(
        `https://api.themoviedb.org/3/account/${contextValue.user.username}/rated/movies?api_key=${API_KEY}&session_id=${contextValue.user.sessionId}`
      );
      //console.log(favoriteData);
      // console.log(ratedData);
      props.handleLoginSuccess(
        userData,
        favoriteData.data.results,
        ratedData.data.results
      );
      // setUser(userData);
      // setLoggedIn(true);
      setLoading(false);
    } catch (e) {
      setLoading(false);
      alert("Failed to login");
    }
  };

  return contextValue.loggedIn ? (
    <div> {navigate("/HOME")} </div>
  ) : loading ? (
    <div>Loading...</div>
  ) : (
    <div className="loginContainer">
      <div className="mainBody">
        <br />
        <br />
        <div className="loginTextContainer">
          <h1>Login</h1>
        </div>
        <br />
        <label className="loginInputName">
          {/* <label className="loginInputName" for="username"> */}
          Username
        </label>
        <input
          className="input"
          type="text"
          // id="username"
          name="username"
          value={usernameInput}
          onChange={handleUsernameChange}
        />
        <br />
        <label className="loginInputName">Password</label>
        <input
          className="input"
          type="password"
          // id="password"
          name="password"
          value={passwordInput}
          onChange={handlePasswordChange}
        />
        <br />
        <button className="submitButton" onClick={handleSubmit}>
          SUBMIT
        </button>
      </div>
    </div>
  );
}
