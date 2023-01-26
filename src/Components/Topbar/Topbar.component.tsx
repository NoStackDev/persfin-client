import React, { useEffect, useState } from "react";
import {
  useBudgetsQuery,
  useInflowsQuery,
  useOutlflowsQuery,
  useSavingsQuery,
  useInflowCategoriesQuery,
  useOutflowCategoriesQuery,
} from "../../Queries";

import "./Topbar.style.scss";

type Props = {};

const Topbar = (props: Props) => {
  const [date, setDate] = useState<string>(new Date(Date.now()).toDateString());

  useSavingsQuery();
  useInflowsQuery();
  useOutlflowsQuery();
  useBudgetsQuery();
  useInflowCategoriesQuery();
  useOutflowCategoriesQuery();

  useEffect(() => {
    const interval = setInterval(() => {
      const currentTime = new Date(Date.now()).toDateString();
      setDate(currentTime);
    }, 1000 * 60);

    return () => clearInterval(interval);
  }, [date]);

  return (
    <div className="topbar">
      <div className="leftTopbar">Current Page</div>
      <div className="middleTopbar">{date}</div>
      <div className="rightTopbar">
        {/* <img src={profilePic} alt="profile" className="profilePic" /> */}
        <span className="material-icons">person</span>
      </div>
    </div>
  );
};

export default Topbar;
