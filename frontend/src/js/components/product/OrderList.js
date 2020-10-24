import React, { Fragment, useEffect } from "react";
import styled, { css } from "styled-components";
import { v4 as uuid } from "uuid";
import { times } from "lodash";
import { useDispatch } from "react-redux";

import { TextDivider, UIHeader } from "../shared";
import { nextCheckoutStageAction } from "../../actions/CartActions";
import { useMainContext } from "../../utils/hookUtils";

const ItemList = styled.ul`
  padding: 15px;

  @media (max-width: 685px) {
    padding: 0;
  }
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

  @media (max-width: 685px) {
    display: flex;
    justify-content: space-between;

    height: fit-content;

    ${({ complete }) =>
      complete
        ? css`
            flex-direction: column;
            align-items: flex-start;
          `
        : css``};

    & > div:first-child {
      ${({ complete }) =>
        complete
          ? css`
              display: none;
            `
          : css``};
    }

    & > div > img {
      margin-top: 10px;
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

  & > span {
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
    margin-top: 5px;
  }

  p {
    font-size: 10px;
    padding: 10px 0;
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

  @media (max-width: 685px) {
    flex-direction: column;
    align-items: flex-start;
    padding: 10px 0;
    h4 {
      font-size: 13px;
    }
  }
`;

const OrderList = ({ handleCheckboxClick, handleChangeQuantity, order }) => {
  const {
    user: { CURRENCY_SYMBOL },
    checkout: { orderComplete },
  } = useMainContext();
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      if (orderComplete) {
        dispatch(nextCheckoutStageAction());
      }
    };
  }, [orderComplete, dispatch]);

  return (
    <ItemList complete={order?.complete}>
      {order?.items.map((item) => (
        <Fragment key={uuid()}>
          <Item>
            <div>
              <input
                disabled={order.complete}
                type="checkbox"
                defaultChecked={item?.product}
                onChange={() => handleCheckboxClick(item?.product)}
              />
            </div>

            <ImageContainer>
              <img src={item?.product_image} alt="" />
            </ImageContainer>
            <ItemDescription>
              <Title>
                <UIHeader as="h4" content={item?.product_name} />
                <Price>
                  <span>Price</span>
                  <br />
                  <span>
                    {`${CURRENCY_SYMBOL}${(item?.value * item.quantity).toFixed(
                      2
                    )}`}
                  </span>
                </Price>
              </Title>
              {!order.complete && <p>{item?.short_desc}</p>}

              {!order.complete && (
                <span>
                  {item?.inventory_count > 0 ? "In stock" : "Out of stock"}
                </span>
              )}
              <br />
              <button disabled={order?.complete} type="button">
                <span>Qty: </span>
                <select
                  onChange={(e) =>
                    handleChangeQuantity(e.target.value, item.product)
                  }
                  disabled={order?.complete}
                  name="available"
                  id="available"
                  value={item?.quantity}>
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
  );
};

export default OrderList;
