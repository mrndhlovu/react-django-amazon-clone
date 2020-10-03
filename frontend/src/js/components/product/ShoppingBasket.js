import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { times } from "lodash";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuid } from "uuid";
import styled from "styled-components";

import {
  clearCartAction,
  removeFromCartAction,
  updateQuantityAction,
} from "../../actions/CartActions";
import { AmazonButton, TextDivider, UIHeader, UILinkButton } from "../shared";
import ProtectedComponentWrapper from "../auth/ProtectedComponentWrapper";

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  background-color: ${({ theme }) => theme.colors.white};
  display: flex;
  padding: 57px 2%;

  h2 {
    font-weight: ${({ theme }) => theme.fonts.weight.medium};
  }
`;

const BasketContent = styled.div`
  flex-grow: 1;
  padding: 0 20px;
  height: 50px;

  button {
    padding: 0;
  }

  & > div:last-child {
    margin-top: 15px;
  }
`;

const SubTotalContainer = styled.div`
  padding: 10px;

  & > span:last-child {
    font-weight: ${({ theme }) => theme.fonts.weight.bold};
  }
`;

const Title = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;

  & h4 {
    color: ${({ theme }) => theme.colors.amazonBlue};
  }

  & span:first-child {
  }
`;

const ItemList = styled.ul`
  padding: 15px;
`;
const Item = styled.li`
  padding: 15px;
  display: grid;
  grid-template-columns: 0fr 0fr 1fr;

  & > div:last-child {
    padding-left: 3%;
  }

  & > div:first-child {
    display: flex;
    justify-content: center;
    align-items: center;
    min-width: 25px;

    & input {
      cursor: pointer;
    }

    & > input {
      background-color: ${({ theme }) => theme.colors.amazonBright};
    }
  }
`;

const ImageContainer = styled.div`
  display: flex;

  img {
    height: 145px;
    width: auto;
  }
`;

const Price = styled.div`
  & > span:first-child {
    font-size: 10px;
  }

  & > span:last-child {
    font-weight: ${({ theme }) => theme.fonts.weight.bold};
  }
`;

const ItemDescription = styled.div`
  flex-grow: 1;

  & > span:last-child {
    font-size: 12px;
    color: #067d62;
  }

  & select {
    background-color: transparent;
    border: none;
    cursor: pointer;
  }

  & > button {
    padding: 3px;
    cursor: pointer;
  }
`;

const RightSideBar = styled.div`
  display: block;
  border: 1px #ddd solid;
  background-color: #f3f3f3;
  border-radius: 4px;
  width: 280px;
  height: 20%;
  padding: 10px;
`;

const ShoppingBasket = () => {
  const {
    cart: { BASKET },
    auth: { CURRENCY_SYMBOL },
    products: { list },
  } = useSelector((state) => state);
  const dispatch = useDispatch();

  const CARD_IDS = BASKET?.items.map((item) => item.product) || [];
  const CART_ITEMS = list.filter((item) => CARD_IDS.includes(item.id));

  const hasCartItems = CART_ITEMS.length !== 0;
  const hasMoreThatOne = BASKET?.item_count > 1;

  const handleCheckboxClick = (productId) =>
    dispatch(removeFromCartAction({ productId }));

  const handleDeselectAll = () => dispatch(clearCartAction());

  const handleChangeQuantity = (qty, id) =>
    dispatch(updateQuantityAction({ quantity: qty, id }));

  return (
    <ProtectedComponentWrapper>
      <Container>
        <BasketContent>
          <UIHeader as="h2" content="Shopping Basket" />

          <UILinkButton
            content="Deselect all items"
            onClick={() => handleDeselectAll()}
          />
          <TextDivider />
          <ItemList>
            {CART_ITEMS.map((item) => (
              <Fragment key={uuid()}>
                <Item>
                  <div>
                    <input
                      type="checkbox"
                      defaultChecked={item?.id}
                      onChange={() => handleCheckboxClick(item?.id)}
                    />
                  </div>
                  <ImageContainer>
                    <img src={item?.image} alt="" />
                  </ImageContainer>
                  <ItemDescription>
                    <Title>
                      <UIHeader as="h4" content={item?.title} />
                      <Price>
                        <span>Price</span>
                        <br />
                        <span>
                          {`${CURRENCY_SYMBOL}${(
                            item?.price *
                            BASKET?.items.find(
                              (cartItem) => cartItem.product === item.id
                            ).quantity
                          ).toFixed(2)}`}
                        </span>
                      </Price>
                    </Title>
                    <span>
                      {item?.inventory_count > 0 ? "In stock" : "Out of stock"}
                    </span>
                    <br />
                    <button type="button">
                      <span>Qty: </span>
                      <select
                        onChange={(e) =>
                          handleChangeQuantity(e.target.value, item.id)
                        }
                        name="available"
                        id="available"
                        value={
                          BASKET?.items.find(
                            (cartItem) => cartItem.product === item.id
                          ).quantity
                        }
                      >
                        {times(item?.inventory_count, (index) => (
                          <option value={index + 1}>{index + 1}</option>
                        ))}
                      </select>
                    </button>
                  </ItemDescription>
                </Item>
                <TextDivider />
              </Fragment>
            ))}
          </ItemList>
        </BasketContent>
        <RightSideBar>
          <SubTotalContainer>
            {hasCartItems && (
              <>
                <span>Subtotal</span>
                <span>
                  {` (${BASKET?.item_count} ${
                    hasMoreThatOne ? "Items" : "Item"
                  })`}
                </span>
              </>
            )}
            <br />
            <span>
              {hasCartItems
                ? `${CURRENCY_SYMBOL}${BASKET?.sub_total}`
                : "Your shopping basket is empty"}
            </span>
          </SubTotalContainer>
          {hasCartItems && (
            <Link to="/checkout">
              <AmazonButton buttonText="Proceed to Checkout" />
            </Link>
          )}
        </RightSideBar>
      </Container>
    </ProtectedComponentWrapper>
  );
};

export default ShoppingBasket;
