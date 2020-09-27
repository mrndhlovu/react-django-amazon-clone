import React, { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { v4 as uuid } from "uuid";
import { removeFromCart } from "../../actions/cartActions";

import { FAKE_PRODUCTS } from "../../constants/constants";
import { getSubTotal } from "../../utils/appUtils";
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

const SubTotalContainer = styled.div``;

const ItemList = styled.ul`
  padding: 15px;
`;

const Title = styled.div`
  display: flex;
  justify-content: space-between;
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

const Price = styled.div``;

const ItemDescription = styled.div`
  flex-grow: 1;

  & > span:last-child {
    font-size: 10px;
    color: #067d62;
  }
`;

const RightSideBar = styled.div`
  display: block;
  border: 1px #ddd solid;
  background-color: #fff;
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

  const hasCartItems = items.length !== 0;
  const hasMoreThatOne = items.length > 1;

  const handleClick = (data) => {
    dispatch(removeFromCart(data));
  };

  return (
    <Container>
      <BasketContent>
        <UIHeader as="h2" content="Shopping Basket" />
        <UILinkButton content="Deselect all items" />
        <TextDivider />
        <ItemList>
          {items.map((item) => (
            <Fragment key={uuid()}>
              <Item>
                <div>
                  <input
                    type="checkbox"
                    defaultChecked={item?.price !== undefined}
                    onChange={() => handleClick({ id: item?.id })}
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
                      <span>{`${CURRENCY_SYMBOL} ${item?.price}`}</span>
                    </Price>
                  </Title>
                  <span>
                    {item?.quantity > 0 ? "In stock" : "Out of stock"}
                  </span>
                </ItemDescription>
              </Item>
              <TextDivider />
            </Fragment>
          ))}
        </ItemList>
      </BasketContent>
      <RightSideBar>
        <SubTotalContainer>
          {hasCartItems && <span>Subtotal</span>}
          <span>
            {` (${items?.length} ${hasMoreThatOne ? "Items" : "Item"})`}
          </span>
          <br />
          <span>{`${CURRENCY_SYMBOL}${getSubTotal(items)}`}</span>
        </SubTotalContainer>
        <AmazonButton buttonText="Proceed to Checkout" />
      </RightSideBar>
    </Container>
  );
};

export default ShoppingBasket;
