import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { v4 as uuid } from "uuid";

import ProductCard from "./ProductCard";
import RatedProductCard from "./RatedProductCard";
import UICard from "./UICard";
import UIHeader from "./UIHeader";
import UILinkButton from "./UILinkButton";

const DashBoardCards = styled.div`
  background-color: transparent;
  display: flex;
  height: fit-content;
  left: 50%;
  position: relative;
  top: -9.5% !important;
  transform: translate(-50%);
  vertical-align: top;
  width: 98%;
`;

const RatedListContainer = styled(DashBoardCards)`
  background-color: ${({ theme }) => theme.colors.white};
  height: fit-content;
  top: -9% !important;
  width: 96%;
  display: grid;
  grid-template-columns: repeat(4, 25%);
`;

const BooksContainer = styled(DashBoardCards)`
  background-color: ${({ theme }) => theme.colors.white};
  flex-direction: column;
  height: fit-content;
  padding: 10px;
  top: -9% !important;
  width: 96%;

  h3 {
    padding-bottom: 14px;
  }

  div {
    display: flex;
    justify-content: space-around;
  }
`;

const BookImage = styled.img`
  cursor: pointer;
`;

const DashboardProduct = ({ children }) => (
  <DashBoardCards>{children}</DashBoardCards>
);

DashboardProduct.List = ({ products }) => (
  <DashBoardCards>
    {products.map((product) => (
      <UICard key={uuid()}>
        <UICard.Header
          avatar={<UIHeader as="h3" content={product?.header} />}
        />
        <ProductCard image={product?.image} />
        <UICard.Action>
          <UILinkButton content={product?.footerLink} />
        </UICard.Action>
      </UICard>
    ))}
  </DashBoardCards>
);

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
        <BookImage src={book} key={uuid()} />
      ))}
    </div>
  </BooksContainer>
);

DashboardProduct.Books.defaultProps = {
  books: [],
};

DashboardProduct.List.defaultProps = {
  products: [],
};

DashboardProduct.RatedList.defaultProps = {
  products: [],
};

DashboardProduct.Books.propTypes = {
  books: PropTypes.arrayOf(PropTypes.string),
};

DashboardProduct.List.propTypes = {
  products: PropTypes.arrayOf(PropTypes.shape({})),
};

DashboardProduct.RatedList.propTypes = {
  products: PropTypes.arrayOf(PropTypes.shape({})),
};

DashboardProduct.propTypes = {
  children: PropTypes.node.isRequired,
};

export default DashboardProduct;
