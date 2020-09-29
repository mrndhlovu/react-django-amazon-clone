/* eslint-disable camelcase */

import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Link } from "react-router-dom";

import ProductRating from "./ProductRating";
import { useSelector } from "react-redux";

const Container = styled.div`
  background-color: ${({ theme }) => theme.colors.white};
  display: flex;
  flex-direction: column;
  height: 450px;
  justify-content: space-around;
  width: 285px;
  padding: 15px;

  a {
    text-decoration: none;
  }
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

const RatedProductCard = ({ image, price, rating, description, id }) => {
  const {
    auth: { CURRENCY_SYMBOL },
  } = useSelector((state) => state);
  const [whole, fraction] = parseFloat(price).toString().split(".");

  return (
    <Container>
      <ImageContainer>
        <Link to={`/product-detail/${id}`}>
          <img src={image} alt={description} />
        </Link>
      </ImageContainer>
      <div>
        <Link to={`/product-detail/${id}`}>
          <ProductDescription>{description}</ProductDescription>
        </Link>
        <ProductRating rating={rating} />
        <PriceContainer>
          <ProductPrice>{`${CURRENCY_SYMBOL}`}</ProductPrice>
          <ProductPrice>{`${whole}`}</ProductPrice>
          <ProductPrice>{`${fraction}`}</ProductPrice>
        </PriceContainer>
      </div>
    </Container>
  );
};

RatedProductCard.defaultProps = {
  description: "",
  image: "",
  price: 0,
  rating: 0,
};

RatedProductCard.propTypes = {
  image: PropTypes.string,
  price: PropTypes.number,
  description: PropTypes.string,
  id: PropTypes.number.isRequired,
  rating: PropTypes.number,
};

export default RatedProductCard;
