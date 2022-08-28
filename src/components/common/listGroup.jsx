import React from "react";

const ListGroup = ({
  items,
  textProperty,
  valueProperty,
  onItemSelect,
  selectedItem
}) => {
  console.log("ListGroup - Rendered");
  const classes = "list-group-item list-group-item-action";

  return (
    <React.Fragment>
      <div className="list-group">
        {items.map((item) => (
          <a
            onClick={() => onItemSelect(item)}
            href="#"
            key={item[valueProperty]}
            className={item === selectedItem ? classes + " active" : classes}
            aria-current="true"
          >
            {item[textProperty]}
          </a>
        ))}
        {/* <li class="list-group-item">Second</li> */}
      </div>
    </React.Fragment>
  );
};

ListGroup.defaultProps = {
  textProperty: "name",
  valueProperty: "_id"
};

export default ListGroup;
