import React from "react";

const ButtonGroup = ({
  items,
  textProperty,
  valueProperty,
  onItemSelect,
  selectedItem
}) => {
  console.log("ButtonGroup - Rendered");
  const classes = "btn btn-outline-primary border";

  return (
    <React.Fragment>
      <div className="btn-group d-flex d-md-none">
        {items.map((item) => (
          <button
            type="button"
            onClick={() => onItemSelect(item)}
            href="#"
            key={item[valueProperty]}
            className={item === selectedItem ? classes + " active" : classes}
            aria-current="true"
          >
            {item[textProperty]}
          </button>
        ))}
        {/* <li class="list-group-item">Second</li> */}
      </div>
    </React.Fragment>
  );
};

ButtonGroup.defaultProps = {
  textProperty: "name",
  valueProperty: "_id"
};

export default ButtonGroup;
