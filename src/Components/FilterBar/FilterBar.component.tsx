import { SetStateAction } from "react";
import DateFilterDynamic from "../DateFiter/DateFilterDynamic";
import "./FilterBar.style.scss";

type Props = {
  showTags?: boolean;
  setFilterRange: React.Dispatch<SetStateAction<TimeRangeInterface | null>>;
};

interface rangeInterface {
  min: Date;
  max: Date;
}

interface TimeRangeInterface {
  id: string;
  title: string;
  range(): rangeInterface;
}

const FilterBar = ({ showTags = false, setFilterRange }: Props) => {
  return (
    <div className="filter-bar-container">
      <div className="filter-bar">
        <div className="card">
          <div className="input-card">
            <span className="material-icons">attach_money</span>
            <input
              type="text"
              className="search-box"
              placeholder="search by title, item or amount"
            />
          </div>

          <DateFilterDynamic setFilterRange={setFilterRange} />

          {showTags ? (
            <div className="filter-tags">
              <div className="completed">completed</div>
              <div className="pending">pending</div>
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
};

export default FilterBar;
