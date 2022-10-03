import "./FilterBar.style.scss";

type Props = {
  showTags?: boolean
};

const FilterBar = ({showTags=false}: Props) => {
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

          <div className="duration-selector">
            <input type="date" name="" id="" />
            <span>To</span>
            <input type="date" name="" id="" />
          </div>

          {showTags? <div className="filter-tags">
            <div className="completed">completed</div>
            <div className="pending">pending</div>
          </div>: <></>}
          
        </div>
      </div>
    </div>
  );
};

export default FilterBar;
