import React from "react";
import { TABS } from "../helpers/constants";
import { Link } from "react-router-dom";

export default function Tabs(props) {
  const tabs = Object.values(TABS);
  // console.log(tabs);
  return (
    <div>
      {tabs.map((tab) => {
        return (
          <Link to={`/${tab}`} key={tab}>
            <button
              className={`tab ${props.activeTab === tab ? "active" : ""}`}
              onClick={() => {
                props.onTabClick(tab);
              }}
            >
              {tab}
            </button>
          </Link>
        );
      })}
    </div>
  );
}
/*
      <button className="tab">{TABS.HOME}</button>
      <button className="tab">{TABS.FAVORITE}</button>
      <button className="tab">{TABS.RATED}</button>
*/
