import React from "react";
import { UseMutationResult } from "react-query";

import "./BudgetCard.style.scss";
import { BudgetItemType, BudgetType } from "../../../../TypeDefs";
import { Record } from "pocketbase";

type Props = {
  budget: BudgetType | Record;
  deleteMutation: UseMutationResult<any, unknown, any, unknown>;
  updateMutation: UseMutationResult<any, unknown, any, unknown>;
  setShowMainModal: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedBudget: React.Dispatch<
    React.SetStateAction<(BudgetType | Record) | null>
  >;
};

const BudgetCard = ({
  budget,
  deleteMutation,
  updateMutation,
  setShowMainModal,
  setSelectedBudget,
}: Props) => {
  const handleUpdateClick = (budgetId: string) => {
    setSelectedBudget(budget);
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
              onClick={() => handleUpdateClick(budget.id)}
            >
              edit
            </span>
            <span
              className="material-icons delete"
              onClick={() => deleteMutation.mutate({ budgetId: budget.id })}
            >
              delete
            </span>
          </div>
        </div>
        <div className="date-status">
          <div className="create-date">
            created: {new Date(budget.created).toLocaleDateString()}
          </div>
          <div className="status">{budget.exhausted ? "exhausted" : null}</div>
        </div>
        <div className="budget-items">
          <ul>
            {budget.items.map((item: BudgetItemType) => {
              return (
                <li key={item.id}>
                  <span>{item.title}</span>
                  <div className="amount">
                    &#x20A6;
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
            &#x20A6;
            <span className="number">{budget.balance}</span>
          </div>
        </div>
        <div className="budget-total">
          <span>Total</span>
          <div className="amount">
            &#x20A6;
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
