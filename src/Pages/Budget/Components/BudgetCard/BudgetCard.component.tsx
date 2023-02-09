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
        {/* card top (title edit delete) */}
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

        {/* date status */}
        <div className="date-status">
          <div className="create-date">
            created: {new Date(budget.created).toLocaleDateString()}
          </div>
          <div className="status">{budget.exhausted ? "exhausted" : null}</div>
        </div>

        {/* budget items  */}
        <div className="budget-items">
          <ul>
            {budget.items.map((item: BudgetItemType) => {
              return (
                <li key={item.id}>
                  <span>{item.title}</span>
                  <div className="amount">
                    &#x20A6;
                    <span className="number">
                      {item.balance.toLocaleString()}
                    </span>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>

        {/* budget balance  */}
        <div className="budget-balance">
          <span>Balance</span>
          <div className="amount">
            &#x20A6;
            <span className="number">{budget.balance.toLocaleString()}</span>
          </div>
        </div>

        {/* budget total  */}
        <div className="budget-total">
          <span>Total</span>
          <div className="amount">
            &#x20A6;
            <span className="number">{budget.total.toLocaleString()}</span>
          </div>
        </div>

        {/* progress  */}
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
