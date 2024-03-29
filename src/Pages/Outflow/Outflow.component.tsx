import ActivityCard from "../../Components/ActivityCard";
import FilterBar from "../../Components/FilterBar";

import "./Outflow.style.scss";
import { useMemo, useState } from "react";
import {
  useInflowsQuery,
  useOutflowCategoriesQuery,
  useOutlflowsQuery,
} from "../../Queries";
import CategoryChart from "../../Components/Charts/DoughnutChart/CategoryChart.component";

import { OutflowType, TimeRangeInterface } from "../../TypeDefs";
import { filterByDate, filterByText } from "../../Helpers";
import ActionCard from "../../Components/ActionCard";

type Props = {};

const Outflow = (props: Props) => {
  const [filterRange, setFilterRange] = useState<TimeRangeInterface | null>(
    null
  );
  const [textFilter, setTextFilter] = useState<string>("");

  // queries
  const { data: outflowsData } = useOutlflowsQuery();
  const { data: inflowsData } = useInflowsQuery();
  const { data: categoryData } = useOutflowCategoriesQuery();

  const outflowCategoryNum = useMemo(() => {
    return categoryData ? categoryData.length + 1 : 1;
  }, [categoryData]);

  const dateFiltered = useMemo(() => {
    return filterByDate(outflowsData, filterRange) as OutflowType[];
  }, [outflowsData, filterRange]);

  const textFiltered = useMemo(() => {
    return filterByText(dateFiltered, textFilter) as OutflowType[];
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
        <CategoryChart
          dataset={[outflowsData, inflowsData]}
          showFixedDateFilter
        />
      </section>
    </main>
  );
};

export default Outflow;
