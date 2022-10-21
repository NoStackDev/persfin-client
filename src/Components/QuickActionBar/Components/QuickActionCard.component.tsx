import React from "react";

import "./QuickActionCard.style.scss"

type Props = {
    icon: string;
    title: string;
    amount: number;
    hasBtn: boolean;
};

const QuickActionCard = ({title, icon, amount, hasBtn}: Props ) => {
  return (
    <div className={"card " + title.toLowerCase()}>
      <div className={"icon-wrapper " + title.toLowerCase()}>
        <span className="material-icons ">{icon}</span>
      </div>
      <div className="action-info">
        <h2>{title}</h2>
        <div className="amount">
          <span className="material-icons">attach_money</span>
          <h3>{new Intl.NumberFormat().format(amount)}</h3>
        </div>
      </div>
      {hasBtn ? (
        <button className={title.toLowerCase()}>
          Add {title}
        </button>
      ) : (
        <></>
      )}
    </div>
  );
};

export default QuickActionCard;
