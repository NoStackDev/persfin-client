import React, { useEffect, useState } from "react";

import "./ActivityCard.style.scss";

import {
  InflowType,
  OutflowType,
  BudgetType,
  SavingsType,
} from "../../TypeDefs";
import ActivityTable from "./Components/ActivityTable";
import ActivityPageNumber from "./Components/ActivityPageNumber";
import { Record } from "pocketbase";

type DataObj = InflowType | OutflowType | BudgetType | SavingsType | Record;

type Props = {
  cardTitle: string;
  activities: Array<DataObj | undefined> | null;
};

const ActivityCard = ({ cardTitle, activities }: Props) => {
  const [activitiesPerPage] = useState<number>(5);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const totalPageNumber = activities
    ? Math.ceil(activities.length / activitiesPerPage)
    : 1;

  const firstIndex = (currentPage - 1) * activitiesPerPage;
  const lastIndex = firstIndex + activitiesPerPage;

  const activitiesPaginated = activities
    ? activities.slice(firstIndex, lastIndex)
    : null;

  return (
    <div className="activity-container">
      <div className="card">
        <div className="card-top">
          <h2>{cardTitle}</h2>
        </div>
        <div className="activities">
          <ActivityTable activities={activitiesPaginated} />
        </div>
        <ActivityPageNumber
          totalPageNumber={totalPageNumber}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </div>
  );
};

export default ActivityCard;
