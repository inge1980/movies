import React, { Component } from "react";

// columns: array
// sortColumn: object
// onSort: function
class TableHeader extends Component {
  raiseSort = (path) => {
    // clone sortColumn from state
    const sortColumn = { ...this.props.sortColumn };
    if (sortColumn.path === path) {
      // if path/column is same, then change the order
      sortColumn.order = sortColumn.order === "asc" ? "desc" : "asc";
    } else {
      // else always start with asc order
      sortColumn.path = path;
      sortColumn.order = "asc";
    }
    //raise the sort event
    this.props.onSort(sortColumn);
  };

  renderSortIcon = (column) => {
    const { sortColumn } = this.props;
    if (column.path !== sortColumn.path) return null;
    if (sortColumn.order === "asc")
      return <span className="fa fa-sort-asc"></span>;
    return <span className="fa fa-sort-desc"></span>;
  };

  render() {
    console.log("TableHeader - Rendered");

    return (
      <React.Fragment>
        <thead>
          <tr>
            {this.props.columns.map((column) => (
              <th
                style={{ cursor: "pointer", width: "29%" }}
                key={column.path || column.key}
                onClick={() => this.raiseSort(column.path)}
              >
                {column.label} {this.renderSortIcon(column)}
              </th>
            ))}
          </tr>
        </thead>
      </React.Fragment>
    );
  }
}

export default TableHeader;
