import ActivityCard from "../../Components/ActivityCard";
import FilterBar from "../../Components/FilterBar";
import DistributionChart from "../../Components/Charts/PieChart/DistributionChart.component";

import "./Inflow.style.scss";
import { useEffect, useMemo, useState } from "react";
import { FetchInflows } from "../../Queries";
import filterDate from "./helpers/filterDate";

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

const Inflow = (props: Props) => {
  const userId = "636ac4a250bbc5afa6004a8c";

  const [filterRange, setFilterRange] = useState<TimeRangeInterface | null>(
    null
  );

  const {
    isLoading: isLoadingInflowsData,
    isSuccess: isSuccessInflowsData,
    data: inflowsData,
  } = FetchInflows(userId);

  const dateFiltered = useMemo(() => {
    return filterDate(inflowsData, filterRange);
  }, [inflowsData, filterRange]);

  return (
    <main>
      <section className="filter-bar-section">
        <FilterBar setFilterRange={setFilterRange} />
      </section>
      <section id="inflow-activity-section">
        <ActivityCard cardTitle="Inflow" activities={dateFiltered} />
      </section>
      {/* <section id="distribution-chart-section">
        <DistributionChart />
      </section> */}
    </main>
  );
};

export default Inflow;
