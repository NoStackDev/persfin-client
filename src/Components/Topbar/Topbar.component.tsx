import React, { useEffect, useState } from "react";

import "./Topbar.style.scss";

type Props = {};

const Topbar = (props: Props) => {
  const [profilePic, setProfilePic] = useState<string>("");

  useEffect(() => {
    (async () => {
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

  return (
    <div className="topbar">
      <div className="leftTopbar">
        <div className="hamburgerMenu"></div>
      </div>
      <div className="middleTopbar"></div>
      <div className="rightTopbar">
        <img src={profilePic} alt="profile" className="profilePic" />
      </div>
    </div>
  );
};

export default Topbar;
