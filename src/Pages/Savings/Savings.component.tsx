import "./Savings.style.scss";
import FilterBar from "../../Components/FilterBar";
import ActivityCard from "../../Components/ActivityCard";
import DistributionChart from "../../Components/Charts/PieChart";
import { useEffect, useMemo, useState } from "react";
import filterDate from "./helpers/filterDate";
import { getSavings } from "../../Queries";

interface rangeInterface {
  min: Date;
  max: Date;
}

interface TimeRangeInterface {
  id: string;
  title: string;
  range(): rangeInterface;
}

type SavingsType = {
  _id: string;
  amount: number;
  time: string;
  modelType: string;
};

type Props = {};

const Savings = (props: Props) => {
  const [filterRange, setFilterRange] = useState<TimeRangeInterface | null>(
    null
  );
  const [outflows, setOutflows] = useState<SavingsType[] | null>(null);

  const dateFiltered = useMemo(() => {
    return filterDate(outflows, filterRange);
  }, [outflows, filterRange]);

  useEffect(() => {
    (async () => {
      try {
        const savingsArr = await getSavings("636ac4a250bbc5afa6004a8c");
        setOutflows(savingsArr);
      } catch (err: any) {
        console.log(err.message);
      }
    })();
  }, []);

  return (
    <main>
      <section className="filter-bar-section">
        <FilterBar setFilterRange={setFilterRange} />
      </section>
      <section id="savings-activity-section">
        <ActivityCard cardTitle="Savings" activities={dateFiltered} />
      </section>
      <section id="distribution-chart-section">
        <DistributionChart />
      </section>
    </main>
  );
};

export default Savings;
