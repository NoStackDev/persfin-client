import ActivityCard from "../../Components/ActivityCard";
import FilterBar from "../../Components/FilterBar";

import "./Inflow.style.scss";
import { useMemo, useState } from "react";
import {
  useInflowCategoriesQuery,
  useInflowsQuery,
  useOutlflowsQuery,
} from "../../Queries";
import CategoryChart from "../../Components/Charts/DoughnutChart/CategoryChart.component";

import { InflowType, TimeRangeInterface } from "../../TypeDefs";
import ActionCard from "../../Components/ActionCard";
import { filterByDate, filterByText } from "../../Helpers";
type Props = {};

const Inflow = (props: Props) => {
  const [filterRange, setFilterRange] = useState<TimeRangeInterface | null>(
    null
  );
  const [textFilter, setTextFilter] = useState<string>("");

  // queries
  const { data: inflowsData } = useInflowsQuery();
  const { data: outflowsData } = useOutlflowsQuery();
  const { data: categoryData } = useInflowCategoriesQuery();

  const inflowCategoryNum = useMemo(() => {
    return categoryData ? categoryData.length + 1 : 1;
  }, [categoryData]);

  const dateFiltered = useMemo(() => {
    return filterByDate(inflowsData, filterRange) as InflowType[];
  }, [inflowsData, filterRange]);

  const textFiltered = useMemo(() => {
    return filterByText(dateFiltered, textFilter) as InflowType[];
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
      <section id="action-card-category-chart-section">
        <ActionCard
          title="Inflow Categories"
          categoriesNum={inflowCategoryNum}
          categoryType="inflowCategories"
        />
        <CategoryChart
          dataset={[inflowsData, outflowsData]}
          showFixedDateFilter
        />
      </section>
    </main>
  );
};

export default Inflow;
