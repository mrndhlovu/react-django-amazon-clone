import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import UICard from "./UICard";
import UIHeader from "./UIHeader";
import ProductCard from "./ProductCard";
import UILinkButton from "./UILinkButton";

const Content = styled.div`
  ${({ theme }) => theme.helpers.useFlex("column", "space-around")};
  position: relative;
  max-width: 150px;
  height: 100%;

  img {
    width: 100%;
    height: 100px;
    mix-blend-mode: multiply;
    cursor: pointer;
  }
`;

const CategoryImage = ({ category }) => {
  return (
    <UICard>
      <UICard.Header avatar={<UIHeader as="h3" content={category?.header} />} />
      <Content>
        <ProductCard image={category?.image} />
        <ProductCard image={category?.image} />
        <ProductCard image={category?.image} />
        <ProductCard image={category?.image} />
      </Content>
      <UICard.Action>
        <UILinkButton content={category?.footerLink} />
      </UICard.Action>
    </UICard>
  );
};

CategoryImage.defaultProps = {
  category: {},
};

CategoryImage.propTypes = {
  category: PropTypes.shape({
    image: PropTypes.string,
    header: PropTypes.string,
    footerLink: PropTypes.string,
  }),
};

export default CategoryImage;
