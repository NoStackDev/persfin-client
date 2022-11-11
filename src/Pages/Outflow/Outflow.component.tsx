import ActivityCard from "../../Components/ActivityCard";
import FilterBar from "../../Components/FilterBar";
import DistributionChart from "../../Components/Charts/PieChart/DistributionChart.component";

import "./Outflow.style.scss";
import { useEffect, useMemo, useState } from "react";
import filterDate from "./helpers/filterDate";
import { getOutflows } from "../../Queries";

interface rangeInterface {
  min: Date;
  max: Date;
}

interface TimeRangeInterface {
  id: string;
  title: string;
  range(): rangeInterface;
}

type Transaction = {
  _id: string;
  title: string;
  amount: number;
  category: {
    _id: string;
    title: string;
    categoryType: string;
  };
  budget: string;
  description: string;
  receiptImage: string[];
  time: string;
  createdAt: Date;
  modelType: string;
};

type Props = {};

const Outflow = (props: Props) => {
  const [filterRange, setFilterRange] = useState<TimeRangeInterface | null>(
    null
  );
  const [outflows, setOutflows] = useState<Transaction[] | null>(null);

  const dateFiltered = useMemo(() => {
    return filterDate(outflows, filterRange);
  }, [outflows, filterRange]);

  useEffect(() => {
    (async () => {
      try {
        const outflowArr = await getOutflows("636ac4a250bbc5afa6004a8c");
        setOutflows(outflowArr);
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
      <section id="outflow-activity-section">
        <ActivityCard cardTitle="Outflow" activities={dateFiltered} />
      </section>
      <section id="distribution-chart-section">
        <DistributionChart />
      </section>
    </main>
  );
};

export default Outflow;
