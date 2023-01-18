import { Record as pbRecord } from "pocketbase";
import React, { useEffect, useState } from "react";
import {
  InflowType,
  OutflowType,
  BudgetType,
  SavingsType,
} from "../../../../TypeDefs";

import "./ActivityTable.style.scss";

type DataObj = InflowType | OutflowType | BudgetType | SavingsType | pbRecord;

type Props = {
  activities: (DataObj | undefined)[] | null;
};

const icons = (_type: string): JSX.Element => {
  if (!_type) {
    return <></>
  }
  switch (_type.toLowerCase()) {
    case "budgets":
      return <span className="material-icons">pie_chart</span>;
    case "inflows":
      return <span className="material-icons">south</span>;
    case "outflows":
      return <span className="material-icons">north</span>;
    case "savings":
      return <span className="material-icons">savings</span>;
    default:
      return <></>;
  }
};

// handle date header render
const renderDateHeader = (
  activity: DataObj,
  dateHeaders: Record<string, string>
) => {
  const activityTime = new Date(Number(activity.created))
    .toLocaleString()
    .split(",")[0];

  if (dateHeaders[activityTime] !== activity.id) {
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

// handle icon and title render
const renderIconTitle = (activity: DataObj | null) => {
  if (!activity) {
    return null;
  }

  if (activity["@collectionName"] === "savings") {
    return (
      <td className="icon-title-wrapper">
        {icons(activity["@collectionName"])}
        <span className="title">savings</span>
      </td>
    );
  }

  return (
    <td className="icon-title-wrapper">
      {icons(activity["@collectionName"])}
      <span className="title">
        {(activity as InflowType | OutflowType | BudgetType).title}
      </span>
    </td>
  );
};

// handle created render
const renderTime = (activity: DataObj | null) => {
  if (!activity) {
    return null;
  }

  return (
    <td className="created">
      {new Date(Number(activity.created)).toLocaleTimeString()}
      {Number(
        new Date(Number(activity.created)).toLocaleTimeString().split(":")[0]
      ) >= 12 ? (
        <>PM</>
      ) : (
        <>AM</>
      )}
    </td>
  );
};

// handle amount render
const renderAmount = (activity: DataObj | null) => {
  if (!activity) {
    return null;
  }

  if (activity["@collectionName"] === "budgets") {
    return (
      <td className="amount">
        <span className="material-icons">attach_money</span>
        <span>
          {new Intl.NumberFormat().format((activity as BudgetType).total)}
        </span>
      </td>
    );
  }

  return (
    <td className="amount">
      <span className="material-icons">attach_money</span>
      <span>
        {new Intl.NumberFormat().format(
          (activity as InflowType | OutflowType | SavingsType).amount
        )}
      </span>
    </td>
  );
};

const ActivityTable = ({ activities }: Props) => {
  const [dateHeaders, setDateHeaders] = useState<Record<string, string>>({});

  useEffect(() => {
    if (activities) {
      const tempDateHeaders: Record<string, string> = {};
      activities.forEach((activity) => {
        if (
          activity &&
          !tempDateHeaders[
            new Date(Number(activity.created)).toLocaleString().split(",")[0]
          ]
        ) {
          const activityDate = new Date(Number(activity.created))
            .toLocaleString()
            .split(",")[0];
          tempDateHeaders[activityDate] = activity.id;
        }
      });
      setDateHeaders({ ...tempDateHeaders });
    }
  }, [activities]);

  return (
    <table className="table">
      <thead>
        <tr>
          <th></th>
          <th className="type"></th>
          <th className="date"></th>
          <th className="created"></th>
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
                  className={"activity " + activity?.["@collectionName"]}
                  key={activity.id}
                >
                  {renderIconTitle(activity)}
                  <td className="type">{activity["@collectionName"]}</td>
                  <td className="date">
                    {new Date(Number(activity.created)).toLocaleDateString()}
                  </td>
                  {renderTime(activity)}
                  {renderAmount(activity)}
                </tr>
              </React.Fragment>
            );
          return <tr key={index}></tr>;
        })}
      </tbody>
    </table>
  );
};

export default ActivityTable;
