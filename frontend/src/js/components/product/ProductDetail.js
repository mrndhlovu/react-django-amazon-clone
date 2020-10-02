/* eslint-disable nonblock-statement-body-position */
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { times } from "lodash";
import { v4 as uuid } from "uuid";
import { useParams } from "react-router-dom";

import { AmazonButton, UIHeader, UILoadingSpinner } from "../shared";
import ProductRating from "../shared/ProductRating";
import {
  addToCartAction,
  removeFromCartAction,
  updateQuantityAction,
} from "../../actions/CartActions";
import { getProductDetailAction } from "../../actions/ProductActions";

const Container = styled.div`
  display: grid;
  justify-content: space-between;
  grid-template-columns: 1fr 2fr 1fr;
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
  height: 60%;
  padding: 10px;
  min-width: 240px;

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

const Image = styled.img`
  width: 350px;
  height: auto;
`;

const ProductDetail = () => {
  const { id } = useParams();
  const {
    auth: { CURRENCY_SYMBOL },
    products: { detail },
    cart: { BASKET },
  } = useSelector((state) => state);
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);

  const itemInCart = BASKET?.items.find(
    (item) => item.product === parseInt(id, 10)
  );
  const isInCart = itemInCart !== undefined;

  const handleChange = (qty) => {
    if (itemInCart)
      dispatch(updateQuantityAction({ ...detail, quantity: qty }));
    setQuantity(qty);
  };

  const handleAddToCart = (product) => dispatch(addToCartAction(product));

  const handleRemoveFromCart = () =>
    dispatch(removeFromCartAction({ productId: parseInt(id, 10) }));

  useEffect(() => {
    dispatch(getProductDetailAction(id));
  }, []);

  if (!detail?.id) return <UILoadingSpinner />;

  return (
    <Container>
      <ImageContainer>
        <Image src={detail?.image} />
      </ImageContainer>
      <DescriptionContainer>
        <UIHeader as="h4" content={detail?.name} />
        <ProductRating rating={detail?.rating} />
        <Description>{detail?.description}</Description>
      </DescriptionContainer>
      <RightSideBar>
        <span>{`${CURRENCY_SYMBOL}${detail?.price}`}</span>
        <Availability>
          <UIHeader
            as="h4"
            content={
              detail?.inventory_count > 0 ? "In stock." : "Out of stock."
            }
          />
          <QuantitySelector>
            <span>Quantity</span>
            <select
              name="available"
              id="available"
              value={itemInCart?.quantity || quantity}
              onChange={(e) => handleChange(e.target.value)}
            >
              {times(detail?.inventory_count, (index) => (
                <option key={uuid()} value={index + 1}>
                  {index + 1}
                </option>
              ))}
            </select>
          </QuantitySelector>
        </Availability>
        <AmazonButton
          disabled={isInCart}
          buttonText={itemInCart ? "Is in shopping Basket" : "Add to Basket"}
          handleClick={() =>
            handleAddToCart({
              ...detail,
              quantity,
            })
          }
        />
        {itemInCart && (
          <RemoveFromCartButton
            secondary
            buttonText="Remove from Basket"
            handleClick={() => handleRemoveFromCart()}
          />
        )}
      </RightSideBar>
    </Container>
  );
};

export default ProductDetail;
