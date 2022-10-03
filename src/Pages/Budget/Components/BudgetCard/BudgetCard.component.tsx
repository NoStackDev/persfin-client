import React from "react";

import "./BudgetCard.style.scss";
type Props = {};

const BudgetCard = (props: Props) => {
  return (
    <div className="budget-card">
      <div className="card-top">
        <span className="title">Birthday</span>
        <div className="card-top-right">
          <span className="material-icons copy">content_copy</span>
          <span className="material-icons edit">edit</span>
          <span className="material-icons delete">delete</span>
        </div>
      </div>
      <div className="create-date">created: 10-09-2022</div>
      <div className="budget-items">
        <ul>
          <li>
            <span>Cake</span>
            <div className="amount">
              <span className="material-icons">attach_money</span>
              <span className="number">30000</span>
            </div>
          </li>
          <li>
            <span>Cake</span>
            <div className="amount">
              <span className="material-icons">attach_money</span>
              <span className="number">30000</span>
            </div>
          </li>
        </ul>
      </div>
      <div className="budget-left">
        <span>Left</span>
        <div className="amount">
          <span className="material-icons">attach_money</span>
          <span className="number">30000</span>
        </div>
      </div>
      <div className="budget-total">
        <span>Total</span>
        <div className="amount">
          <span className="material-icons">attach_money</span>
          <span className="number">30000</span>
        </div>
      </div>
      <div className="progress">
        <div className="progress-total"></div>
        <div className="progress-current" data-percentage="70%"></div>
      </div>
    </div>
  );
};

export default BudgetCard;
