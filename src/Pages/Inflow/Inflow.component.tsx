import ActivityCard from "../../Components/ActivityCard";
import FilterBar from "../../Components/FilterBar";

import "./Inflow.style.scss";
import { useMemo, useState } from "react";
import { FetchCategories, FetchInflows } from "../../Queries";
import filterDate from "./helpers/filterDate";
import CategoryChart from "../../Components/Charts/DoughnutChart/CategoryChart.component";

import { TimeRangeInterface } from "../../TypeDefs";
import ActionCard from "./Components/ActionCard";
import { countCategories } from "./Components/ActionCard/helper";

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

  const {
    isLoading: isLoadingCategoriesData,
    isSuccess: isSuccessCategoriesData,
    data: categoriesData,
  } = FetchCategories(userId);

  const { inflowCategories } = useMemo(() => {
    return countCategories(categoriesData);
  }, [categoriesData]);

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
      <section id="distribution-chart-section">
        <ActionCard categoriesNum={inflowCategories} />
        <CategoryChart dataset={[dateFiltered]} showFixedDateFilter />
      </section>
    </main>
  );
};

export default Inflow;
