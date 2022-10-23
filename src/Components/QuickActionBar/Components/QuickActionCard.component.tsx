import React from "react";

import DateFilterFixed from "../../DateFiter/DateFilterFixed";
import "./QuickActionCard.style.scss";

type Props = {
  icon: string;
  title: string;
  amount: number;
  hasBtn: boolean;
};

const QuickActionCard = ({ title, icon, amount, hasBtn }: Props) => {
  return (
    <div className={"card " + title.toLowerCase()}>
      <div className="card-top">
        <div className={"icon-wrapper " + title.toLowerCase()}>
          <span className="material-icons ">{icon}</span>
        </div>

        <DateFilterFixed />
      </div>

      <div className="action-info">
        <h2>{title}</h2>
        <h3 className="amount">
          &#x20A6; {new Intl.NumberFormat().format(amount)}
        </h3>
      </div>
      {hasBtn ? (
        <button className={title.toLowerCase()}>Add {title}</button>
      ) : (
        <></>
      )}
    </div>
  );
};

export default QuickActionCard;
