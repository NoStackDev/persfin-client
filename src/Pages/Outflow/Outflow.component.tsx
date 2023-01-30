import ActivityCard from "../../Components/ActivityCard";
import FilterBar from "../../Components/FilterBar";

import "./Outflow.style.scss";
import { useMemo, useState } from "react";
import { useOutflowCategoriesQuery, useOutlflowsQuery } from "../../Queries";
import CategoryChart from "../../Components/Charts/DoughnutChart/CategoryChart.component";

import { TimeRangeInterface } from "../../TypeDefs";
import { filterDate, filterText } from "./helpers";
import ActionCard from "../../Components/ActionCard";

type Props = {};

const Outflow = (props: Props) => {
  const [filterRange, setFilterRange] = useState<TimeRangeInterface | null>(
    null
  );
  const [textFilter, setTextFilter] = useState<string>("");

  const {
    isLoading: isLoadingOutflowsData,
    isSuccess: isSuccessOutflowsData,
    data: outflowsData,
  } = useOutlflowsQuery();

  const {
    isLoading: isLoadingCategoriesData,
    isSuccess: isSuccessCategoriesData,
    data: categoryData,
  } = useOutflowCategoriesQuery();

  const outflowCategoryNum = useMemo(() => {
    return categoryData ? categoryData.length + 1 : 1;
  }, [categoryData]);

  const dateFiltered = useMemo(() => {
    return filterDate(outflowsData, filterRange);
  }, [outflowsData, filterRange]);

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
      <section id="outflow-activity-section">
        <ActivityCard cardTitle="Outflow" activities={textFiltered} />
      </section>
      <section id="action-card-category-chart-section">
        <ActionCard
          title="Outflow Categories"
          categoriesNum={outflowCategoryNum}
          categoryType="outflowCategories"
        />
        <CategoryChart dataset={[outflowsData]} showFixedDateFilter />
      </section>
    </main>
  );
};

export default Outflow;
