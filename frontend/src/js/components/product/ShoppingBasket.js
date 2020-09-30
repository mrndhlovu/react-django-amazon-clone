import React, { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { v4 as uuid } from "uuid";
import { times } from "lodash";

import {
  clearCartAction,
  removeFromCartAction,
  updateQuantityAction,
} from "../../actions/CartActions";

import { getCartDetails } from "../../utils/appUtils";
import { AmazonButton, TextDivider, UIHeader, UILinkButton } from "../shared";

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

const ItemList = styled.ul`
  padding: 15px;
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

const Item = styled.li`
  display: flex;
  height: 110;
  padding: 15px;

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
  min-width: 22%;
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
    cart: { items },
    auth: { CURRENCY_SYMBOL },
  } = useSelector((state) => state);
  const dispatch = useDispatch();
  const { subTotal, cartCount } = getCartDetails(items);

  const hasCartItems = items.length !== 0;
  const hasMoreThatOne = cartCount > 1;

  const handleCheckboxClick = (data) => dispatch(removeFromCartAction(data));

  const handleDeselectAll = () => dispatch(clearCartAction());

  const handleChangeQuantity = (qty, item) =>
    dispatch(updateQuantityAction({ ...item, quantity: qty }));

  return (
    <Container>
      <BasketContent>
        <UIHeader as="h2" content="Shopping Basket" />

        <UILinkButton
          content="Deselect all items"
          onClick={() => handleDeselectAll()}
        />
        <TextDivider />
        <ItemList>
          {items.map((item) => (
            <Fragment key={uuid()}>
              <Item>
                <div>
                  <input
                    type="checkbox"
                    defaultChecked={item?.price !== undefined}
                    onChange={() => handleCheckboxClick({ id: item?.id })}
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
                          item?.price * item.quantity
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
                        handleChangeQuantity(e.target.value, item)
                      }
                      name="available"
                      id="available"
                      value={item?.quantity}
                    >
                      {times(item?.available, (index) => (
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
                {` (${cartCount} ${hasMoreThatOne ? "Items" : "Item"})`}
              </span>
            </>
          )}
          <br />
          <span>
            {hasCartItems
              ? `${CURRENCY_SYMBOL}${subTotal}`
              : "Your shopping basket is empty"}
          </span>
        </SubTotalContainer>
        <AmazonButton buttonText="Proceed to Checkout" />
      </RightSideBar>
    </Container>
  );
};

export default ShoppingBasket;
