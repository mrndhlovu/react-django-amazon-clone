import React from "react";
import PropTypes from "prop-types";

const MenuList = ({ list, handleClick }) => {
  return list.map((category) => (
    <li
      onClick={() => handleClick(category?.redirect || category)}
      onKeyDown={() => handleClick(category?.redirect || category)}
      key={category?.header || category}
    >
      {category?.header || category}
    </li>
  ));
};

MenuList.defaultProps = { className: "" };

MenuList.propTypes = {
  list: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.shape({})),
    PropTypes.arrayOf(PropTypes.string),
  ]).isRequired,
  className: PropTypes.string,
  handleClick: PropTypes.func.isRequired,
};

export default MenuList;
