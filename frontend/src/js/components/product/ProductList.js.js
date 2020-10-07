import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { v4 as uuid } from "uuid";
import PropTypes from "prop-types";
import { isNumber } from "lodash";
import { useLocation } from "react-router-dom";

import { PRODUCT_FILTER_OPTIONS } from "../../constants/constants";
import {
  AmazonButton,
  DashboardProduct,
  TextDivider,
  UIHeader,
} from "../shared";
import ProductRating from "../shared/ProductRating";
import UILoadingSpinner from "../shared/UILoadingSpinner";
import { resetForm } from "../../utils/appUtils";
import { getProductList } from "../../actions/ProductActions";

const Container = styled.div`
  display: flex;
  height: 94vh;
  background-color: ${({ theme }) => theme.colors.white};
`;

const SideBar = styled.div`
  width: 251px;
  padding: 20px;
  border-right: 1px solid ${({ theme }) => theme.colors.grey};

  h5 {
    color: ${({ theme }) => theme.colors.textGrey};
    padding-bottom: 15px;
  }
`;

const ListContainer = styled.div`
  padding: 10px 20px;
  flex-grow: 1;
`;

const CategoryProductList = styled(DashboardProduct.RatedList)`
  padding-top: 10px;
  height: 472px;
  display: grid;
  justify-items: center;
  grid-template-columns: repeat(4, 16.66667%) !important;
`;

const SearchInfo = styled.div`
  background-color: ${({ theme }) => theme.colors.white};
  box-shadow: 0px 1px 5px 0px rgba(0, 0, 0, 0.75);
  display: flex;
  justify-content: space-between;
  padding: 9px;
  align-items: center;
  border-radius: 2px;

  span {
    font-size: 13px;
    font-weight: ${({ theme }) => theme.fonts.weight.medium};
  }

  select {
    padding: 2px;
    min-width: 150px;
    font-weight: ${({ theme }) => theme.fonts.weight.bold};
  }
`;

const SearchSort = styled.div``;

const ResultCount = styled.div`
  flex-grow: 1;
`;

const SearchFilter = styled.div`
  padding-top: 15px;

  div {
    display: flex;
    align-items: center;
    padding: 3px;
  }

  h6 {
    padding-bottom: 5px;
    ${({ theme }) => theme.fonts.weight.bold};
  }

  label {
    font-size: 12px;
    padding-left: 5px;
    ${({ theme }) => theme.fonts.weight.bold};
  }

  span {
    font-size: 12px;
  }

  input {
    cursor: pointer;
  }
`;

const AvgRating = styled.div``;

const CustomPriceRangeFilter = styled.div`
  display: flex;
  justify-content: space-around;
  width: fit-content;

  button {
    margin: 0;
    width: fit-content;
    cursor: pointer;
  }

  input {
    width: 70px;
    padding: 5px;
    margin-right: 5px;
  }
`;

const FILTER_PARAMS_INITIAL_STATE = {
  price: "",
  rating: "",
  stock: "",
};

const ProductList = () => {
  const {
    auth: { CURRENCY_SYMBOL },
    products: { isLoading, FILTERED_PRODUCTS },
  } = useSelector((state) => state);
  const dispatch = useDispatch();
  const { search } = useLocation();
  const [filterParams, setFilterParams] = useState(search);
  const [filter, setFilter] = useState(FILTER_PARAMS_INITIAL_STATE);
  const [activePriceFilter, setActivePriceFilter] = useState(undefined);
  const [inStock, setInStock] = useState(true);
  const [customPriceFilter, setCustomPriceFilter] = useState({
    low: 0,
    high: 0,
  });

  const handleSortParams = (data) => {
    const [sortValue] = data.split("-");
    if (sortValue === "all") return;
    const sortParam = `ordering=${sortValue === "low" ? "price" : "-price"}`;

    setFilterParams(`${search}&${sortParam}`);
  };

  const handlePriceFilter = (price, clickIndex) => {
    setActivePriceFilter(!price ? -1 : clickIndex);
    if (!price) {
      resetForm(["price-low", "price-high"]);
      return setFilter({ ...filter, price: "" });
    }

    setFilter({
      ...filter,
      price: `&low_price=${isNumber(price.low) ? price.low : 0}&high_price=${
        price.high
      }`,
    });
  };

  const handleStarFilter = (rating) =>
    setFilter({ ...filter, rating: `&rating=${rating}` });

  const handleOutOfStockFilter = () => {
    setFilter({
      ...filter,
      stock: `${!inStock ? "" : "&in_stock=True&in_stock=False"}`,
    });

    setInStock(!inStock);
  };

  useEffect(() => {
    const buildFilterParam = () => {
      const newFilterParams = Object.values(filter)
        .map((value) => value && value)
        .join("");

      setFilterParams(`${search || "?"}${newFilterParams}`);
    };

    buildFilterParam();
  }, [filter, search]);

  useEffect(() => {
    dispatch(getProductList(filterParams));
  }, [filterParams, dispatch]);

  return (
    <Container>
      <SideBar>
        <UIHeader as="h5" content="Show results for" />
        <TextDivider />
        <SearchFilter>
          <UIHeader as="h6" content="Price" />
          <FilterCheckbox
            key={uuid()}
            onChange={() => handlePriceFilter()}
            value="All"
            checked={activePriceFilter === -1}
            name="all"
            content="All"
          />
          {PRODUCT_FILTER_OPTIONS.PRICE.map((price, index) => (
            <FilterCheckbox
              key={uuid()}
              onChange={() => handlePriceFilter(price, index)}
              value={index}
              checked={activePriceFilter === index}
              name={`range-${price?.low}-${price.high}`}
              content={`${isNumber(price?.low) ? CURRENCY_SYMBOL : ""} ${
                price.low
              } - ${CURRENCY_SYMBOL} ${price.high}`}
            />
          ))}

          <CustomPriceRangeFilter>
            <input
              type="number"
              id="price-low"
              placeholder={`${CURRENCY_SYMBOL} Min`}
              onChange={(e) =>
                setCustomPriceFilter({
                  ...customPriceFilter,
                  low: e.target.value,
                })
              }
            />
            <input
              type="number"
              id="price-high"
              placeholder={`${CURRENCY_SYMBOL} Max`}
              onChange={(e) =>
                setCustomPriceFilter({
                  ...customPriceFilter,
                  high: e.target.value,
                })
              }
            />
            <AmazonButton
              secondary
              buttonText="Go"
              handleClick={() => handlePriceFilter(customPriceFilter)}
            />
          </CustomPriceRangeFilter>
        </SearchFilter>
        <SearchFilter>
          <UIHeader as="h6" content="Avg. Customer Review" />

          {PRODUCT_FILTER_OPTIONS.STARS.map((rating, index) => (
            <AvgRating
              key={uuid()}
              onClick={() => handleStarFilter(5 - (index + 1))}
            >
              <ProductRating rating={rating} />
              <span>& Up</span>
            </AvgRating>
          ))}
        </SearchFilter>

        <SearchFilter>
          <UIHeader as="h6" content="Availability" />
          <FilterCheckbox
            name="in-stock"
            content="Include Out of Stock"
            checked={!inStock}
            onChange={handleOutOfStockFilter}
            type="checkbox"
          />
        </SearchFilter>
      </SideBar>
      <ListContainer>
        <SearchInfo>
          <ResultCount>
            <span>1 - 24 of 200 </span>
            <span>Books</span>
          </ResultCount>
          <SearchSort>
            <SearchSelect onChange={handleSortParams} />
          </SearchSort>
        </SearchInfo>

        {isLoading ? (
          <UILoadingSpinner />
        ) : (
          <CategoryProductList products={FILTERED_PRODUCTS} />
        )}
        <TextDivider />
      </ListContainer>
    </Container>
  );
};

const SearchSelect = ({ onChange }) => (
  <select
    onChange={(e) => onChange(e.target.value)}
    name="search"
    id="search-options"
  >
    <option value="all">Sort by:</option>
    <option value="low-to-high">Price: Low to High</option>
    <option value="high-to-low">Price: High to Low</option>
  </select>
);

const FilterCheckbox = ({ name, content, onChange, value, checked, type }) => (
  <div>
    <input
      onChange={onChange}
      value={value}
      checked={checked}
      type={type}
      name={name}
    />
    <label htmlFor={name}>{content}</label>
  </div>
);

FilterCheckbox.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  checked: PropTypes.bool.isRequired,
  content: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  type: PropTypes.string,
};

FilterCheckbox.defaultProps = {
  type: "radio",
  value: "",
};

SearchSelect.propTypes = {
  onChange: PropTypes.func.isRequired,
};

export default ProductList;
