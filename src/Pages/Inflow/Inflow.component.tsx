import ActivityCard from "../../Components/ActivityCard";
import FilterBar from "../../Components/FilterBar";

import "./Inflow.style.scss";
import { useMemo, useState } from "react";
import { FetchCategories, FetchInflows } from "../../Queries";
import CategoryChart from "../../Components/Charts/DoughnutChart/CategoryChart.component";

import { TimeRangeInterface } from "../../TypeDefs";
import ActionCard from "../../Components/ActionCard";
import { countCategories, filterDate, filterText } from "./helpers";

type Props = {};

const Inflow = (props: Props) => {
  const userId = "636ac4a250bbc5afa6004a8c";
  const [filterRange, setFilterRange] = useState<TimeRangeInterface | null>(
    null
  );
  const [textFilter, setTextFilter] = useState<string>("");

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

  const textFiltered = useMemo(() => {
    return filterText(dateFiltered, textFilter);
  }, [dateFiltered, textFilter]);

  return (
    <main>
      <section className="filter-bar-section">
        <FilterBar
          setTextFilter={setTextFilter}
          setFilterRange={setFilterRange}
        />
      </section>
      <section id="inflow-activity-section">
        <ActivityCard cardTitle="Inflow" activities={textFiltered} />
      </section>
      <section id="distribution-chart-section">
        <ActionCard
          title="Inflow Categories"
          categoriesNum={inflowCategories}
          categoryType="inflow"
        />
        <CategoryChart dataset={[inflowsData]} showFixedDateFilter />
      </section>
    </main>
  );
};

export default Inflow;
