import React from "react";
import ActivityCard from "../../Components/Cards/ActivityCard";

import "./Overview.style.scss";
import recentActivities from "./recentAtivities";

type Props = {};

const Overview = (props: Props) => {
  return (
    <main>
      <section className="recent-activities">
        <div className="container">
          {recentActivities.map((recentActivity, index) => {
            return (
              <ActivityCard
                key={index}
                title={recentActivity.title}
                _type={recentActivity._type}
                _date={recentActivity._date}
                _time={recentActivity._time}
                amount={recentActivity.amount}
              />
            );
          })}
        </div>
      </section>
    </main>
  );
};

export default Overview;
