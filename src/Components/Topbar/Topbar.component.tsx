import React, { useEffect, useState } from "react";

import "./Topbar.style.scss";

type Props = {};


const Topbar = (props: Props) => {
  const [profilePic, setProfilePic] = useState<string>("");
  const [date, setDate] = useState<string>(new Date(Date.now()).toDateString());

  useEffect(() => {
    (async () => {
      console.log("First useEffect firing");
      try {
        const { default: profilePicPath } = await import(
          "../../Assets/Images/profilePic.jpg"
        );
        setProfilePic(profilePicPath);
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  useEffect(() => {
    console.log("Second useEffect Firing");
    const interval = setInterval(() => {
      const currentTime = (new Date(Date.now())).toDateString();
      setDate(currentTime);
    }, 1000);
  

    return () => clearInterval(interval);
  }, [date]);

  return (
    <div className="topbar">
      <div className="leftTopbar">Current Page</div>
      <div className="middleTopbar">{date}</div>
      <div className="rightTopbar">
        <img src={profilePic} alt="profile" className="profilePic" />
      </div>
    </div>
  );
};

export default Topbar;
