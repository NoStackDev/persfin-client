import React, { useState } from "react";
import { UseMutationResult } from "react-query";

import "./BudgetCard.style.scss";
import { BudgetType } from "../../../../TypeDefs";

type Props = {
  budget: BudgetType;
  deleteMutation: UseMutationResult<any, unknown, any, unknown>;
  updateMutation: UseMutationResult<any, unknown, any, unknown>;
  setShowMainModal: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedBudget: React.Dispatch<React.SetStateAction<BudgetType | null>>;
};

const BudgetCard = ({
  budget,
  deleteMutation,
  updateMutation,
  setShowMainModal,
  setSelectedBudget,
}: Props) => {

  const handleUpdateClick = (budgetId: string) => {
    setSelectedBudget(budget)
    setShowMainModal(true);
  };

  return (
    <>
      <div className="budget-card">
        <div className="card-top">
          <span className="title">{budget.title}</span>
          <div className="card-top-right">
            <span
              className="material-icons edit"
              onClick={() => handleUpdateClick(budget._id)}
            >
              edit
            </span>
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
    </>
  );
};

export default BudgetCard;
