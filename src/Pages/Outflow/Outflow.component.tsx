import ActivityCard from "../../Components/ActivityCard";
import FilterBar from "../../Components/FilterBar";

import "./Outflow.style.scss";
import { useMemo, useState } from "react";
import filterDate from "./helpers/filterDate";
import { FetchOutflows } from "../../Queries";
import CategoryChart from "../../Components/Charts/DoughnutChart/CategoryChart.component";

import { TimeRangeInterface } from "../../TypeDefs";

type Props = {};

const Outflow = (props: Props) => {
  const userId = "636ac4a250bbc5afa6004a8c";

  const [filterRange, setFilterRange] = useState<TimeRangeInterface | null>(
    null
  );

  const {
    isLoading: isLoadingOutflowsData,
    isSuccess: isSuccessOutflowsData,
    data: outflowsData,
  } = FetchOutflows(userId);

  const dateFiltered = useMemo(() => {
    return filterDate(outflowsData, filterRange);
  }, [outflowsData, filterRange]);

  return (
    <main>
      <section className="filter-bar-section">
        <FilterBar setFilterRange={setFilterRange} />
      </section>
      <section id="outflow-activity-section">
        <ActivityCard cardTitle="Outflow" activities={dateFiltered} />
      </section>
      <section id="distribution-chart-section">
        <CategoryChart dataset={[outflowsData]} showFixedDateFilter />
      </section>
    </main>
  );
};

export default Outflow;
