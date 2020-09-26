/* eslint-disable camelcase */

import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import ProductRating from "./ProductRating";

const Container = styled.div`
  background-color: ${({ theme }) => theme.colors.white};
  display: flex;
  flex-direction: column;
  height: 450px;
  justify-content: space-around;
  width: 285px;
  padding: 15px;
`;

const ImageContainer = styled.div`
  ${({ theme }) => theme.helpers.useFlex()};
  width: 100%;
  height: 150px;
  cursor: pointer;

  img {
    width: 100%;
    height: auto;
  }
`;

const ProductPrice = styled.span`
  cursor: pointer;
`;

const PriceContainer = styled.div`
  display: flex;
  justify-content: end;
  font-weight: ${({ theme }) => theme.fonts.weight.bold};

  & > span:first-child {
    font-size: 12px;
    padding-right: 2px;
  }

  & > span:last-child {
    font-size: 10px;
    padding-left: 3px;
  }
`;

const ProductDescription = styled.p`
  ${({ theme }) => theme.helpers.hoverText(theme.colors.amazon)};
  color: ${({ theme }) => theme.colors.black};
  font-size: 15px;
  cursor: pointer;
  padding-bottom: 8px;
`;

const RatedProductCard = ({
  currency,
  image,
  price,
  rating,
  short_description,
}) => {
  const [whole, fraction] = parseFloat(price).toString().split(".");

  return (
    <Container>
      <ImageContainer>
        <img src={image} alt={short_description} />
      </ImageContainer>
      <div>
        <ProductDescription>{short_description}</ProductDescription>
        <ProductRating rating={rating} />
        <PriceContainer>
          <ProductPrice>{`${currency}`}</ProductPrice>
          <ProductPrice>{`${whole}`}</ProductPrice>
          <ProductPrice>{`${fraction}`}</ProductPrice>
        </PriceContainer>
      </div>
    </Container>
  );
};

RatedProductCard.defaultProps = {
  short_description: "",
  image: "",
  price: 0,
  rating: 0,
  currency: "€",
};

RatedProductCard.propTypes = {
  image: PropTypes.string,
  price: PropTypes.number,
  short_description: PropTypes.string,
  currency: PropTypes.string,
  rating: PropTypes.number,
};

export default RatedProductCard;
