import React, { useEffect, useState } from "react";

import "./ActivityCard.style.scss";

import { InflowType, OutflowType, BudgetType, SavingsType } from "../../Types";

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

const renderDateHeader = (
  activity: DataObj,
  dateHeaders: Record<string, string>
) => {
  const activityTime = new Date(Number(activity.time))
    .toLocaleString()
    .split(",")[0];

  if (dateHeaders[activityTime] !== activity._id) {
    return null;
  }

  if (new Date(Date.now()).toLocaleString().split(",")[0] === activityTime) {
    return (
      <tr className={"date-header"}>
        <td>Today</td>
      </tr>
    );
  }

  if (
    new Date(Date.now() - 1000 * 60 * 60 * 24)
      .toLocaleString()
      .split(",")[0] === activityTime
  ) {
    return (
      <tr className={"date-header"}>
        <td>Yesterday</td>
      </tr>
    );
  }

  return (
    <tr className={"date-header"}>
      <td>{activityTime}</td>
    </tr>
  );
};

const ActivityCard = ({ cardTitle, activities }: Props) => {
  const [dateHeaders, setDateHeaders] = useState<Record<string, string>>({});

  useEffect(() => {
    if (activities) {
      const tempDateHeaders: Record<string, string> = {};
      activities.forEach((activity) => {
        if (
          activity &&
          !tempDateHeaders[
            new Date(Number(activity.time)).toLocaleString().split(",")[0]
          ]
        ) {
          const activityDate = new Date(Number(activity.time))
            .toLocaleString()
            .split(",")[0];
          tempDateHeaders[activityDate] = activity._id;
        }
      });
      setDateHeaders({ ...tempDateHeaders });
    }
  }, [activities]);

  return (
    <div className="activity-container">
      <div className="card">
        <div className="card-top">
          <h2>{cardTitle}</h2>
        </div>
        <div className="activities">
          <table>
            <thead>
              <tr>
                <th></th>
                <th className="type"></th>
                <th className="date"></th>
                <th className="time"></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {activities?.map((activity, index) => {
                if (activity)
                  return (
                    <React.Fragment key={index}>
                      {renderDateHeader(activity, dateHeaders)}
                      <tr
                        className={"activity " + activity?.modelType}
                        key={activity._id}
                      >
                        <td className="icon-title-wrapper">
                          {icons(activity?.modelType)}
                          {activity?.modelType === "savings" ? (
                            <span className="title">savings</span>
                          ) : (
                            <span className="title">
                              {
                                (
                                  activity as
                                    | InflowType
                                    | OutflowType
                                    | BudgetType
                                ).title
                              }
                            </span>
                          )}
                        </td>
                        <td className="type">{activity.modelType}</td>
                        <td className="date">
                          {new Date(Number(activity.time)).toLocaleDateString()}
                        </td>
                        <td className="time">
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
                        </td>
                        <td className="amount">
                          <span className="material-icons">attach_money</span>
                          <span>
                            {new Intl.NumberFormat().format(
                              activity.modelType === "budget"
                                ? (activity as BudgetType).total
                                : (
                                    activity as
                                      | InflowType
                                      | OutflowType
                                      | SavingsType
                                  ).amount
                            )}
                          </span>
                        </td>
                      </tr>
                    </React.Fragment>
                  );
                return <tr key={index}></tr>;
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ActivityCard;
