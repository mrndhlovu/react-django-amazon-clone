import React, { memo, useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";

import "./_header.scss";

import { useFormInput, useMainContext } from "../../utils/hookUtils";
import NavBar from "./NavBar";

const Navigation = () => {
  const { isAuthenticated, data } = useMainContext().user;
  const dispatch = useDispatch();

  const [inputData, handleChange] = useFormInput();
  const history = useHistory();
  const [activeCategory, setActiveCategory] = useState("All");

  const handleSearch = (category) => {
    let searchParams;
    setActiveCategory(
      category === "All Departments" ? "All" : category || "Search"
    );
    searchParams =
      inputData?.search && `?search=${inputData?.search.toLowerCase()}`;

    if (inputData.search) {
      return history.replace(`/product-list${searchParams}`);
    }

    searchParams = `?category=${category.toLowerCase()}`;

    history.replace(
      category ? `/product-list${searchParams}` : "/product-list"
    );
  };

  return (
    <NavBar>
      <NavBar.Left history={history} />
      <NavBar.Center
        handleSearch={handleSearch}
        activeCategory={activeCategory}
        handleChange={handleChange}
      />
      <NavBar.Right
        isAuthenticated={isAuthenticated}
        user={data}
        dispatch={dispatch}
      />
    </NavBar>
  );
};

export default memo(Navigation);
