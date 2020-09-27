import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { times } from "lodash";

import { FAKE_PRODUCTS } from "../../constants/constants";
import { AmazonButton, UIHeader } from "../shared";
import ProductRating from "../shared/ProductRating";

const Container = styled.div`
  display: flex;
  justify-content: space-evenly;
  padding: 28px 22%;
  height: 100%;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.white};
`;

const ImageContainer = styled.div`
  padding: 20px;
`;

const DescriptionContainer = styled.div`
  align-items: center;
  flex-grow: 1;
  padding: 20px;

  p {
    padding: 15px 0;
    max-width: 60%;
  }
`;

const RightSideBar = styled.div`
  display: block;
  border: 1px #ddd solid;
  background-color: #fff;
  border-radius: 4px;
  width: 280px;
  height: 60%;
  padding: 10px;

  & > span {
    color: #b12704;
  }

  .amazon__button.secondary {
    background: linear-gradient(to bottom, #f6c88f, #ed9220) !important;
  }
`;

const Availability = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 50px;
  justify-content: space-between;
  align-items: flex-start;
  padding: 10px 0;

  & > h4 {
    color: #067d62;
    padding-bottom: 5px;
  }

  span {
    font-size: 13px;
    padding-right: 5px;
    font-weight: ${({ theme }) => theme.fonts.weight.bold};
  }
  select {
    padding: 2px 5px;
    cursor: pointer;
  }
`;

const QuantitySelector = styled.div``;

const Description = styled.p``;

const RemoveFromCartButton = styled(AmazonButton)``;

const Image = styled.img``;

const ProductDetail = ({ product = FAKE_PRODUCTS[0] }) => {
  const {
    auth: { CURRENCY_SYMBOL },
    cart,
  } = useSelector((state) => state);
  const isInCart = cart?.items.includes(product);

  return (
    <Container>
      <ImageContainer>
        <Image src={product?.image} />
      </ImageContainer>
      <DescriptionContainer>
        <UIHeader as="h4" content={product?.title} />
        <ProductRating rating={product?.rating} />
        <Description>{product?.description}</Description>
      </DescriptionContainer>
      <RightSideBar>
        <span>{`${CURRENCY_SYMBOL}${product?.price}`}</span>
        <Availability>
          <UIHeader
            as="h4"
            content={product?.quantity > 0 ? "In stock." : "Out of stock."}
          />
          <QuantitySelector>
            <span>Quantity</span>
            <select name="quantity" id="quantity">
              {times(product?.quantity, (index) => (
                <option value={index + 1}>{index + 1}</option>
              ))}
            </select>
          </QuantitySelector>
        </Availability>
        <AmazonButton buttonText="Add to Basket" />
        {!isInCart && (
          <RemoveFromCartButton secondary buttonText="Remove from Basket" />
        )}
      </RightSideBar>
    </Container>
  );
};

export default ProductDetail;
