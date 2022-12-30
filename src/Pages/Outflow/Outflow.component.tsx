import ActivityCard from "../../Components/ActivityCard";
import FilterBar from "../../Components/FilterBar";

import "./Outflow.style.scss";
import { useMemo, useState } from "react";
import filterDate from "./helpers/filterDate";
import { FetchCategories, FetchOutflows } from "../../Queries";
import CategoryChart from "../../Components/Charts/DoughnutChart/CategoryChart.component";

import { TimeRangeInterface } from "../../TypeDefs";
import { countCategories } from "./helpers"
import ActionCard from "../../Components/ActionCard";

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

  const {
    isLoading: isLoadingCategoriesData,
    isSuccess: isSuccessCategoriesData,
    data: categoriesData,
  } = FetchCategories(userId);

  const { outflowCategories } = useMemo(() => {
    return countCategories(categoriesData);
  }, [categoriesData]);

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
        <ActionCard
          title="Outflow Categories"
          categoriesNum={outflowCategories}
          categoryType="outflow"
        />
        <CategoryChart dataset={[outflowsData]} showFixedDateFilter />
      </section>
    </main>
  );
};

export default Outflow;
