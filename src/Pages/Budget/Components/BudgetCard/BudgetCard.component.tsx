import React from "react";
import { UseMutationResult } from "react-query";

import "./BudgetCard.style.scss";

interface BudgetInterface {
  _id: string;
  title: string;
  balance: number;
  total: number;
  time: string;
  items: {
    _id: string;
    title?: string;
    amount: number;
    balance: number;
    category: string;
  }[];
  completed: boolean;
  modelType: string;
}

type Props = {
  budget: BudgetInterface;
  deleteMutation: UseMutationResult<any, unknown, any, unknown>;
};

const BudgetCard = ({ budget, deleteMutation }: Props) => {
  return (
    <div className="budget-card">
      <div className="card-top">
        <span className="title">{budget.title}</span>
        <div className="card-top-right">
          <span className="material-icons copy">content_copy</span>
          <span className="material-icons edit">edit</span>
          <span
            className="material-icons delete"
            onClick={() => deleteMutation.mutate({ budget: budget._id })}
          >
            delete
          </span>
        </div>
      </div>
      <div className="date-status">
        <div className="create-date">
          created: {new Date(Number(budget.time)).toLocaleDateString()}
        </div>
        <div className="status">{budget.completed ? "completed" : null}</div>
      </div>
      <div className="budget-items">
        <ul>
          {budget.items.map((item) => {
            return (
              <li key={item._id}>
                <span>{item.title}</span>
                <div className="amount">
                  <span className="material-icons">attach_money</span>
                  <span className="number">{item.balance}</span>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="budget-balance">
        <span>Balance</span>
        <div className="amount">
          <span className="material-icons">attach_money</span>
          <span className="number">{budget.balance}</span>
        </div>
      </div>
      <div className="budget-total">
        <span>Total</span>
        <div className="amount">
          <span className="material-icons">attach_money</span>
          <span className="number">{budget.total}</span>
        </div>
      </div>
      <div className="progress">
        <div className="progress-total"></div>
        <div
          className="progress-current"
          style={{
            width: ((budget.balance / budget.total) * 100).toString() + "%",
          }}
        ></div>
      </div>
    </div>
  );
};

export default BudgetCard;
