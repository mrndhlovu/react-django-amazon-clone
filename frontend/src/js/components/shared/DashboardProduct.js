import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import UICard from "./UICard";
import UILinkButton from "./UILinkButton";
import ProductCard from "./ProductCard";
import UIHeader from "./UIHeader";
import CategoryImage from "./CategoryImage";

const DashBoardCards = styled.div`
  background-color: transparent;
  top: -9.5% !important;
  display: flex;
  left: 50%;
  position: relative;
  transform: translate(-50%);
  vertical-align: top;
  height: fit-content;
  width: 98%;
`;

const DashboardProduct = ({ children }) => (
  <DashBoardCards>{children}</DashBoardCards>
);

DashboardProduct.List = ({ products }) => (
  <DashBoardCards>
    {products.map((product) => (
      <UICard>
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

DashboardProduct.Categories = ({ category }) => (
  <DashBoardCards>
    <CategoryImage category={category} />
  </DashBoardCards>
);

DashboardProduct.defaultProps = {};
DashboardProduct.propTypes = {
  children: PropTypes.node.isRequired,
};

export default DashboardProduct;
