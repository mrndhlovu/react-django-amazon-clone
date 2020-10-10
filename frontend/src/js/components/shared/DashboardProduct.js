import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { v4 as uuid } from "uuid";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import ProductCard from "./ProductCard";
import RatedProductCard from "./RatedProductCard";
import UICard from "./UICard";
import UIHeader from "./UIHeader";
import UILinkButton from "./UILinkButton";

const DashBoardCards = styled.div`
  background-color: ${({ theme }) => theme.colors.white};
  display: flex;
  height: fit-content;
  vertical-align: top;
`;

const RatedListContainer = styled(DashBoardCards)`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  justify-content: space-evenly;
  grid-column-gap: 5px;
  grid-row-gap: 25px;
  place-items: center;
`;

const BooksContainer = styled(DashBoardCards)`
  flex-direction: column;
  padding: 15px;

  h3 {
    padding-bottom: 14px;
    padding-left: 14px;
  }

  div {
    display: flex;
    justify-content: flex-start;
  }
`;

const BookImage = styled.img`
  cursor: pointer;
  width: auto;
  height: 200px;
  padding: 10px;
`;

const DashboardProduct = ({ children }) => (
  <DashBoardCards>{children}</DashBoardCards>
);

const Featured = ({ category, header, footerLink }) => {
  const {
    products: { PRODUCTS },
  } = useSelector((state) => state);
  const FEATURED_ITEM = PRODUCTS.find(
    (item) => item.category === category && item.featured && item
  );

  return (
    <UICard>
      <UICard.Header avatar={<UIHeader as="h3" content={header} />} />
      <ProductCard image={FEATURED_ITEM?.image} />
      <UICard.Action>
        <Link to={`/product-list?category=${category} `}>
          <UILinkButton content={footerLink} />
        </Link>
      </UICard.Action>
    </UICard>
  );
};

DashboardProduct.Featured = Featured;

DashboardProduct.RatedList = ({ products }) => (
  <RatedListContainer>
    {products.map((product) => (
      <RatedProductCard key={uuid()} {...product} />
    ))}
  </RatedListContainer>
);

DashboardProduct.Books = ({ books }) => (
  <BooksContainer>
    <UIHeader as="h3" content="Books from you" />
    <div>
      {books.map((book) => (
        <Link key={uuid()} to={`/product-detail/${book.id}/`}>
          <BookImage src={book.image} />
        </Link>
      ))}
    </div>
  </BooksContainer>
);

DashboardProduct.Books.defaultProps = {
  books: [],
};

Featured.defaultProps = {
  category: "",
  header: "",
  footerLink: "",
};

DashboardProduct.RatedList.defaultProps = {
  products: [],
};

DashboardProduct.Books.propTypes = {
  books: PropTypes.arrayOf(PropTypes.string),
};

Featured.propTypes = {
  category: PropTypes.string,
  header: PropTypes.string,
  footerLink: PropTypes.string,
};

DashboardProduct.RatedList.propTypes = {
  products: PropTypes.arrayOf(PropTypes.shape({})),
};

DashboardProduct.propTypes = {
  children: PropTypes.node.isRequired,
};

export default DashboardProduct;
