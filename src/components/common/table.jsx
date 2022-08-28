import React from "react";
import TableHeader from "./tableHeader";
import TableBody from "./tableBody";

const Table = ({ columns, sortColumn, onSort, data }) => {
  console.log("Table - Rendered");

  // hide table if zero results
  const { length: count } = data;
  if (count === 0) return null;

  return (
    <React.Fragment>
      <table className="table table-striped table-sm">
        <TableHeader
          columns={columns}
          sortColumn={sortColumn}
          onSort={onSort}
        />
        <TableBody columns={columns} data={data} />
      </table>
    </React.Fragment>
  );
};

export default Table;
