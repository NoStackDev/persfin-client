import { useEffect, useState } from "react";
import pb from "../../lib/pocketbase";
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
      <div className="leftTopbar appLogo">PERSFIN</div>
      <div className="middleTopbar">{date}</div>
      <div className="rightTopbar">
        <span className="user-email">{pb.authStore.model?.email}</span>
      </div>
    </div>
  );
};

export default Topbar;
