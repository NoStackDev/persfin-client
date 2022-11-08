import React from "react";

import "./ActivityCard.style.scss";

type Tr = {
  _id: string;
  title: string;
  amount: number;
  category: {
    _id: string;
    title: string;
    categoryType: string;
  };
  budget: string;
  description: string;
  receiptImage: string[];
  time: string;
  createdAt: Date;
  modelType: string;
};

type Savings = {
  _id: string;
  amount: number;
  time: string;
  modelType: string;
  title?: string;
};

type Props = {
  cardTitle: string;
  activities: Array<Tr | Savings | null>;
};

const ActivityCard = ({ cardTitle, activities }: Props) => {
  const icons = (_type: string): JSX.Element => {
    switch (_type) {
      case "Budget":
        return <span className="material-icons">pie_chart</span>;
      case "Inflow":
        return <span className="material-icons">south</span>;
      case "Outflow":
        return <span className="material-icons">north</span>;
      case "Savings":
        return <span className="material-icons">savings</span>;
      default:
        return <></>;
    }
  };

  return (
    <div className="activity-container">
      <div className="card">
        <div className="card-top">
          <h2>{cardTitle}</h2>
        </div>
        <div className="activities">
          {activities.map((activity, index) => {
            if (activity)
              return (
                <div className={"activity " + activity?.modelType} key={index}>
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
                      {new Intl.NumberFormat().format(activity.amount)}
                    </span>
                  </div>
                </div>
              );
          })}
        </div>
      </div>
    </div>
  );
};

export default ActivityCard;
