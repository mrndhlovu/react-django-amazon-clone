import React, { memo } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import {
  clearCartAction,
  removeFromCartAction,
  updateQuantityAction,
} from "../../actions/CartActions";
import { AmazonButton, TextDivider, UIHeader, UILinkButton } from "../shared";
import ProtectedComponentWrapper from "../auth/ProtectedComponentWrapper";
import OrderList from "./OrderList";
import { useMainContext } from "../../utils/hookUtils";

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  background-color: ${({ theme }) => theme.colors.white};
  display: flex;
  padding: 57px 2%;

  h2 {
    font-weight: ${({ theme }) => theme.fonts.weight.medium};
  }

  @media (max-width: 845px) {
    flex-direction: column;
  }
`;

const BasketContent = styled.div`
  flex-grow: 1;
  padding: 0 20px;

  button {
    padding: 0;
  }

  & > div:last-child {
    margin-top: 15px;
  }

  @media (max-width: 845px) {
    flex-grow: 0;
  }
`;

const SubTotalContainer = styled.div`
  padding: 10px;

  & > span:last-child {
    font-weight: ${({ theme }) => theme.fonts.weight.bold};
  }

  @media (max-width: 845px) {
    text-align: center;
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

  @media (max-width: 845px) {
    width: 100%;
  }
`;

const ShoppingBasket = () => {
  const {
    cart: { BASKET },
    user: { CURRENCY_SYMBOL },
  } = useMainContext();
  const dispatch = useDispatch();

  const hasCartItems = BASKET && BASKET?.items.length !== 0;
  const hasMoreThatOne = BASKET && BASKET?.item_count > 1;

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
          <OrderList
            handleChangeQuantity={handleChangeQuantity}
            handleCheckboxClick={handleCheckboxClick}
            order={BASKET}
          />
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

export default memo(ShoppingBasket);
