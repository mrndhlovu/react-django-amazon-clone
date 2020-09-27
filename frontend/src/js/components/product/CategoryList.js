import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { v4 as uuid } from "uuid";
import PropTypes from "prop-types";
import { isNumber } from "lodash";

import {
  CATEGORY_FILTER_OPTIONS,
  FAKE_PRODUCTS,
} from "../../constants/constants";
import { DashboardProduct, TextDivider, UIHeader } from "../shared";
import ProductRating from "../shared/ProductRating";

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

const CategoryList = () => {
  const {
    auth: { CURRENCY_SYMBOL },
  } = useSelector((state) => state.store);
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
      <ListContainer>
        <SearchInfo>
          <ResultCount>
            <span>1 - 24 of 200 </span>
            <span>Books</span>
          </ResultCount>
          <SearchSort>
            <SearchSelect />
          </SearchSort>
        </SearchInfo>

        <CategoryProductList products={[...FAKE_PRODUCTS, ...FAKE_PRODUCTS]} />
        <TextDivider />
      </ListContainer>
    </Container>
  );
};

const SearchSelect = () => (
  <select name="search" id="search-options">
    <option value="featured">Featured</option>
    <option value="low-to-high">Price: Low to High</option>
    <option value="high-to-low">Price: High to Low</option>
  </select>
);

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
