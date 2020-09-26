import React from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { v4 as uuid } from "uuid";
import PropTypes from "prop-types";
import { isNumber } from "lodash";

import { TextDivider, UIHeader } from "../shared";
import ProductRating from "../shared/ProductRating";
import { CATEGORY_FILTER_OPTIONS } from "../../constants/constants";

const Container = styled.div`
  display: flex;
  height: 94vh;
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

const ProductList = styled.div`
  padding: 20px;
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

const CategoryList = () => {
  const { CURRENCY_SYMBOL = "€" } = useDispatch((state) => state.store);
  return (
    <Container>
      <SideBar>
        <UIHeader as="h5" content="Show results for" />
        <TextDivider />
        <SearchFilter>
          <UIHeader as="h6" content="Price" />
          {CATEGORY_FILTER_OPTIONS.PRICE.map((price) => (
            <FilterCheckbox
              name={`under-${price?.low}-${price.high}`}
              content={`${isNumber(price?.low) ? CURRENCY_SYMBOL : ""} ${
                price.low
              } - ${CURRENCY_SYMBOL} ${price.high}`}
            />
          ))}
        </SearchFilter>
        <SearchFilter>
          <UIHeader as="h6" content="Avg. Customer Review" />

          {CATEGORY_FILTER_OPTIONS.STARS.map((rating) => (
            <div>
              <ProductRating key={uuid()} rating={rating} />
              <span>& Up</span>
            </div>
          ))}
        </SearchFilter>

        <SearchFilter>
          <UIHeader as="h6" content="Availability" />
          <FilterCheckbox name="in-stock" content="Include Out of Stock" />
        </SearchFilter>
      </SideBar>
      <ProductList>Category List</ProductList>
    </Container>
  );
};

const FilterCheckbox = ({ name, content }) => (
  <div>
    <input type="checkbox" name={name} value={content} />
    <label htmlFor={name}>{content}</label>
  </div>
);

FilterCheckbox.propTypes = {
  name: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
};

export default CategoryList;
