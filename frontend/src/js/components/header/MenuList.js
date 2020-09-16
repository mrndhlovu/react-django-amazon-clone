import React from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";

import { useMainContext } from "../../utils/hookUtils";

const MenuList = ({ list, handleClick }) => {
  const history = useHistory();
  const { handleLogOut = () => {} } = useMainContext();

  const handleSelectedOption = (option) => {
    if (option === "logout") return handleLogOut;
    return history.push(`/${option}`);
  };

  return list.map((category) => (
    <li key={category?.header || category}>
      <button
        type="button"
        className="link__menu__button"
        onClick={
          handleClick
            ? () => handleClick(category?.redirect || category)
            : () => handleSelectedOption(category?.redirect || category)
        }
      >
        {category?.header || category}
      </button>
    </li>
  ));
};

MenuList.defaultProps = { handleClick: undefined };

MenuList.propTypes = {
  list: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.shape({})),
    PropTypes.arrayOf(PropTypes.string),
  ]).isRequired,
  handleClick: PropTypes.func,
};

export default MenuList;
