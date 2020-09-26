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
  background-color: ${({ theme }) => theme.colors.white};
  display: flex;
  height: fit-content;
  vertical-align: top;
`;

const RatedListContainer = styled(DashBoardCards)`
  display: grid;
  grid-template-columns: repeat(4, 25%);
  justify-items: center;
`;

const BooksContainer = styled(DashBoardCards)`
  flex-direction: column;

  h3 {
    padding-bottom: 14px;
    padding-left: 14px;
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
  <DashboardProduct>
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
  </DashboardProduct>
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
