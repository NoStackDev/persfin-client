import React from "react";
import { useState } from "react";
import "./ActivityPageNumber.style.scss";

type Props = {
  totalPageNumber: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
};

const ActivityPageNumber = ({ totalPageNumber, setCurrentPage }: Props) => {
  const [page, setPage] = useState<number>(1);

  const pageNumbers = [...Array(totalPageNumber + 1).keys()].slice(1);

  const handleClick = (pageNum: number) => {
    setPage(pageNum);
    setCurrentPage(pageNum);
  };

  const handlePrevClick = () => {
    setPage(page - 1);
    setCurrentPage(page - 1);
  };

  const handleNextClick = () => {
    setPage(page + 1);
    setCurrentPage(page + 1);
  };

  return (
    <div className="page-numbers">
      <span
        className="page-number"
        onClick={handlePrevClick}
        style={{ visibility: `${page === 1 ? "hidden" : "visible"}` }}
      >
        &#60;
      </span>
      {pageNumbers.map((pgNum) => {
        return (
          <span
            onClick={() => handleClick(pgNum)}
            key={pgNum}
            className={`page-number ${page === pgNum ? "active" : "inactive"}`}
          >
            {pgNum}
          </span>
        );
      })}
      <span
        className="page-number"
        onClick={handleNextClick}
        style={{
          visibility: `${page === totalPageNumber ? "hidden" : "visible"}`,
        }}
      >
        &#62;
      </span>
    </div>
  );
};

export default ActivityPageNumber;
