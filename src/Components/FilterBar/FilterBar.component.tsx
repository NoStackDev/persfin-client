import { SetStateAction, useState } from "react";
import DateFilterDynamic from "../DateFiter/DateFilterDynamic";
import "./FilterBar.style.scss";
import {
  BudgetType,
  InflowType,
  OutflowType,
  TimeRangeInterface,
} from "../../TypeDefs";

type Props = {
  showTags?: boolean;
  setFilterRange: React.Dispatch<SetStateAction<TimeRangeInterface | null>>;
  setTextFilter: React.Dispatch<SetStateAction<string>>;
  setTagFilter?: React.Dispatch<SetStateAction<boolean | null>>;
};

const FilterBar = ({
  setTextFilter,
  showTags = false,
  setFilterRange,
  setTagFilter,
}: Props) => {
  const [textSearch, setTextSearch] = useState<string>("");
  const [tag, setTag] = useState<number>(0);

  const handleTextInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTextSearch(e.target.value);
    setTextFilter(e.target.value.trim());
  };

  const handleTagClick = (tagId: number) => {
    // 0 = pending = false
    // 1 = completed = true
    // 2 = all = null
    setTag(tagId)
    if (setTagFilter)
      switch (tagId) {
        case 0:
          setTagFilter(false);
          break;
        case 1:
          setTagFilter(true);
          break;
        case 2:
          setTagFilter(null);
          break;
        default:
          setTagFilter(false);
      }
  };

  return (
    <div className="filter-bar-container">
      <div className="filter-bar">
        <div className="card">
          <div className="input-card">
            <span className="material-icons">search</span>
            <input
              type="text"
              className="search-box"
              placeholder="search by title"
              value={textSearch}
              onChange={(e) => handleTextInput(e)}
            />
          </div>

          <DateFilterDynamic setFilterRange={setFilterRange} />

          {showTags ? (
            <div className="filter-tags">
              <div
                className={tag === 0 ? "pending active" : "pending"}
                onClick={() => handleTagClick(0)}
              >
                pending
              </div>
              <div
                className={tag === 1 ? "completed active" : "completed"}
                onClick={() => handleTagClick(1)}
              >
                completed
              </div>
              <div
                className={tag === 2 ? "all active" : "all"}
                onClick={() => handleTagClick(2)}
              >
                all
              </div>
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
