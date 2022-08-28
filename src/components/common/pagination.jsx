import React from "react";
import _ from "lodash";
import PropTypes from "prop-types";

// What inputs and what events is it going to raise?

const Pagination = ({ itemsCount, pageSize, currentPage, onPageChange }) => {
  console.log("Pagination - Rendered");

  // get pagesCount as integer
  const pagesCount = Math.ceil(itemsCount / pageSize);

  // if one page, don't show page navigation
  if (pagesCount === 1) return null;

  const pages = _.range(1, pagesCount + 1);

  return (
    <React.Fragment>
      <nav aria-label="Page navigation example">
        <ul className="pagination">
          {pages.map((page) => (
            <li
              key={page}
              className={
                page === currentPage ? "page-item active" : "page-item"
              }
            >
              <a
                onClick={() => onPageChange(page)}
                className="page-link"
                href="#"
              >
                {page}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </React.Fragment>
  );
};

// type checking used to be included in React, but now we need proptypes for it
// const { itemsCount, pageSize, currentPage, onPageChange } = props;
Pagination.propTypes = {
  itemsCount: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired
};

export default Pagination;
