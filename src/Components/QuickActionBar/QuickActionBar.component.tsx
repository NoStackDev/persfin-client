import React from "react";

import quickActions from "./quickActionBarConfig";
import "./QuickActionBar.style.scss";

type Props = {};

const QuickActionBar = (props: Props) => {
  return (
    <section className="quick-action-bar">
      <div className="carousel-container">
        <div className="carousel">
          {quickActions.map((quickAction, index) => {
            return (
              <div className={"card " + quickAction.title.toLowerCase()} key={index}>
                <div
                  className={"icon-wrapper " + quickAction.title.toLowerCase()}
                >
                  <span className="material-icons ">{quickAction.icon}</span>
                </div>
                <div className="action-info">
                  <h2>{quickAction.title}</h2>
                  <div className="amount">
                    <span className="material-icons">attach_money</span>
                    <h3>{quickAction.amount}</h3>
                  </div>
                </div>
                {quickAction.hasBtn ? (
                  <button className={quickAction.title.toLowerCase()}>
                    Add {quickAction.title}
                  </button>
                ) : (
                  <></>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default QuickActionBar;
