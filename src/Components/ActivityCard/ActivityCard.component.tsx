import React from "react";

import "./ActivityCard.style.scss";
type InflowType = {
  _id: string;
  title: string;
  amount: number;
  category: CategoryType;
  description: string;
  time: string;
  createdAt: string;
  modelType: string;
};

type OutflowType = {
  _id: string;
  title: string;
  amount: number;
  category: CategoryType;
  budget: string;
  item: string;
  description: string;
  receiptImage: string[];
  time: string;
  createdAt: string;
  modelType: string;
};

type BudgetType = {
  _id: string;
  title: string;
  total: number;
  balance: number;
  status: string;
  description: string;
  items: BudgetItemType[];
  time: string;
  completed: boolean;
  createdAt: string;
  modelType: string;
};

type BudgetItemType = {
  _id: string;
  title: string;
  amount: number;
  category: string;
  balance: number;
  description: string;
};

type SavingsType = {
  _id: string;
  amount: number;
  time: string;
  modelType: string;
  title?: string;
};

type CategoryType = {
  _id: string;
  title: string;
  categoryType: string;
  description: string;
  createdAt: string;
};

type DataObj = InflowType | OutflowType | BudgetType | SavingsType;

type Props = {
  cardTitle: string;
  activities: Array<DataObj | null> | null;
};

const icons = (_type: string): JSX.Element => {
  switch (_type.toLowerCase()) {
    case "budget":
      return <span className="material-icons">pie_chart</span>;
    case "inflow":
      return <span className="material-icons">south</span>;
    case "outflow":
      return <span className="material-icons">north</span>;
    case "savings":
      return <span className="material-icons">savings</span>;
    default:
      return <></>;
  }
};

const ActivityCard = ({ cardTitle, activities }: Props) => {
  return (
    <div className="activity-container">
      <div className="card">
        <div className="card-top">
          <h2>{cardTitle}</h2>
        </div>
        <div className="activities">
          {activities?.map((activity, index) => {
            if (activity)
              return (
                <div
                  className={"activity " + activity?.modelType}
                  key={activity._id}
                >
                  <div className="icon-title-wrapper">
                    {icons(activity?.modelType)}
                    {activity?.modelType === "savings" ? (
                      <span className="title">savings</span>
                    ) : (
                      <span className="title">{activity.title}</span>
                    )}
                  </div>

                  <span className="type">{activity.modelType}</span>
                  <span className="date">
                    {new Date(Number(activity.time)).toLocaleDateString()}
                  </span>
                  <span className="time">
                    {new Date(Number(activity.time)).toLocaleTimeString()}{" "}
                    {Number(
                      new Date(Number(activity.time))
                        .toLocaleTimeString()
                        .split(":")[0]
                    ) >= 12 ? (
                      <>PM</>
                    ) : (
                      <>AM</>
                    )}
                  </span>
                  <div className="amount">
                    <span className="material-icons">attach_money</span>
                    <span>
                      {new Intl.NumberFormat().format(
                        activity.modelType === "budget"
                          ? (activity as BudgetType).total
                          : (activity as InflowType | OutflowType | SavingsType)
                              .amount
                      )}
                    </span>
                  </div>
                </div>
              );
            return <div key={index}></div>;
          })}
        </div>
      </div>
    </div>
  );
};

export default ActivityCard;
