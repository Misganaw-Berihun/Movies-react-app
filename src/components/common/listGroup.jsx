import React from "react";

const Listgroup = (props) => {
  const { items, textProperty, valueProperty, onItemSelect, selectedItem } =
    props;

  return (
    <ul className="list-group">
      {items.map((item) => (
        <li
          onClick={() => onItemSelect(item)}
          key={item[valueProperty]}
          className={
            "clickable list-group-item" +
            (item === selectedItem ? " active" : "")
          }
        >
          {item[textProperty]}
        </li>
      ))}
    </ul>
  );
};

Listgroup.defaultProps = {
  textProperty: "name",
  valueProperty: "_id",
};

export default Listgroup;
