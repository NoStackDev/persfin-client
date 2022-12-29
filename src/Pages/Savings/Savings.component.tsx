import "./Savings.style.scss";
import FilterBar from "../../Components/FilterBar";
import ActivityCard from "../../Components/ActivityCard";
import DistributionChart from "../../Components/Charts/PieChart";
import { useMemo, useState } from "react";
import filterDate from "./helpers/filterDate";
import { FetchSavings } from "../../Queries";

import { TimeRangeInterface } from "../../TypeDefs";

type Props = {};

const Savings = (props: Props) => {
  const [filterRange, setFilterRange] = useState<TimeRangeInterface | null>(
    null
  );

  const userId = "636ac4a250bbc5afa6004a8c";

  const {
    isLoading: isLoadingSavingsData,
    isSuccess: isSuccessSavingsData,
    data: savingsData,
  } = FetchSavings(userId);

  const dateFiltered = useMemo(() => {
    return filterDate(savingsData, filterRange);
  }, [savingsData, filterRange]);

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
