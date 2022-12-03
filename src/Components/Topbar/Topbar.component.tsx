import React, { useEffect, useState } from "react";
import {
  FetchBudgets,
  FetchCategories,
  FetchInflows,
  FetchOutflows,
  FetchSavings,
  FetchUser,
} from "../../Queries";

import "./Topbar.style.scss";

type Props = {};
type User = {
  _id: string;
  email: string;
  firstname: string;
  lastname: string;
  othername: string;
  profilePic: string;
};

const Topbar = (props: Props) => {
  const [date, setDate] = useState<string>(new Date(Date.now()).toDateString());
  const userId = "636ac4a250bbc5afa6004a8c";
  const {
    isLoading: isLoadingUserData,
    isSuccess: isSuccessUserData,
    data: userData,
  } = FetchUser(userId);

  FetchSavings(userId);
  FetchInflows(userId);
  FetchOutflows(userId);
  FetchCategories(userId);
  FetchBudgets(userId);

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
