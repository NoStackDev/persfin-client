import React from "react";

import "./ActivityCard.style.scss";

interface recentActivity {
  title: string;
  _type: string;
  _date: string;
  _time: string;
  amount: number;
}

type Props = {
  cardTitle: string;
  activities: recentActivity[];
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
    <div className="card">
      <div className="card-top">
        <h2>{cardTitle}</h2>
        <div className="duration">This week</div>
      </div>
      <div className="activities">
        {activities.map((activity, index) => {
          return (
            <div className={"activity " + activity._type.toLowerCase()}>
              <div className="icon-title-wrapper">
                {icons(activity._type)}
                <span className="title">{activity.title}</span>
              </div>

              <span className="type">{activity._type}</span>
              <span className="date">{activity._date}</span>
              <span className="time">{activity._time}</span>
              <div className="amount">
              <span className="material-icons">attach_money</span>
              <span>{new Intl.NumberFormat().format(activity.amount)}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ActivityCard;
