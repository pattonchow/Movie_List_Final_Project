import React, { useContext } from "react";
import Context from "../context/Context";
import Tabs from "./Tabs";
import { Link } from "react-router-dom";

export default function Header(props) {
  const contextValue = useContext(Context);
  return (
    <div className="headBar">
      <div className="headBar-left">
        <img
          className="logo"
          alt=""
          src={
            "https://www.themoviedb.org/assets/2/v4/logos/v2/blue_square_2-d537fb228cf3ded904ef09b136fe3fec72548ebc1fea3fbbd1ad9e36364db38b.svg"
          }
        />
        <Tabs activeTab={props.activeTab} onTabClick={props.onTabClick} />
      </div>
      <div className="headBar-right">
        {/* <div>{console.log(contextValue)}</div> */}
        {/* <div>{console.log(contextValue.isUsernameClicked)}</div> */}
        {contextValue.loggedIn ? (
          <div>
            {contextValue.isUsernameClicked ? (
              <button className="tab logoutTab" onClick={props.handleLogout}>
                Logout
              </button>
            ) : (
              <button className="tab" onClick={props.handleUsernameClick}>
                {contextValue.user.username}
              </button>
            )}
          </div>
        ) : (
          // <button className="tab usernameTab" onClick={handleUsernameClick}>
          //   {contextValue.user.username}
          // </button>
          <Link to="Login">
            <button className="tab">Login</button>
          </Link>
        )}
      </div>
    </div>
  );
}
