/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react/jsx-closing-tag-location */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from "react";
import styled from "styled-components";
import { v4 as uuid } from "uuid";
import { useDispatch, useSelector } from "react-redux";

import { useStripe } from "@stripe/react-stripe-js";

import { AmazonButton, TextDivider, UIHeader } from "../shared";
import UISmall from "../shared/UISmall";
import UIAlert from "../shared/UIAlert";
import { CHECKOUT_MESSAGE } from "../../constants/constants";
import { updateAddressAction } from "../../actions/AuthActions";
import { isString } from "lodash";
import { nextCheckoutStageAction } from "../../actions/CartActions";
import { CHECKOUT_PAYMENT } from "../../actions/ActionTypes";

const Container = styled.div`
  display: grid;
  grid-template-columns: 3fr 1fr;
`;
const ShipAddress = styled.div`
  display: block;
  border: 1px #ddd solid;
  border-radius: 4px;
  padding: 10px;
  height: 100%;
`;

const Sidebar = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border: 1px #ddd solid;
  border-radius: 4px;
  width: 280px;
  height: 100%;
  padding: 10px;
`;

const Summary = styled.div`
  padding: 15px 3px;
  & > div {
    padding-bottom: 10px;
  }

  h6 {
    padding-bottom: 10px;
  }
`;
const SummaryItem = styled.div`
  display: flex;
  justify-content: space-between;

  h2,
  h3 {
    color: ${({ theme }) => theme.colors.red};
  }
`;

const Content = styled.div`
  margin-right: 10px;
`;

const Address = styled.div`
  padding: 15px 0;
  width: 25%;
`;

const Checkbox = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;

  span {
    font-size: 13px;
    padding-left: 5px;
    font-weight: ${({ theme }) => theme.fonts.weight.bold};
  }
`;

const OrderConfirmation = () => {
  const {
    cart: { BASKET, CURRENCY = "EUR" },
    auth: { data },
  } = useSelector((state) => state);
  const dispatch = useDispatch();

  const handleContinueToPay = () =>
    dispatch(nextCheckoutStageAction(CHECKOUT_PAYMENT));

  const handleSetDefault = () => {
    dispatch(
      updateAddressAction({
        ...data?.address,
        is_shipping_address: !data?.address.is_shipping_address,
      })
    );
  };

  return (
    <Container>
      <Content>
        {!data?.address?.is_shipping_address && (
          <UIAlert message={CHECKOUT_MESSAGE} />
        )}
        <ShipAddress>
          <Address>
            <UIHeader as="h5" content="Delivery Address" />
            <UISmall content={data.full_name} />
            {Object.values(data.address || {}).map(
              (line) =>
                isString(line) && (
                  <div key={uuid()}>
                    <UISmall content={line} />
                  </div>
                )
            )}
          </Address>
          <Checkbox>
            <input
              onChange={() => handleSetDefault()}
              type="checkbox"
              name="address"
              defaultChecked={data?.address?.is_shipping_address}
            />
            <span>{`${
              data?.address?.is_shipping_address
                ? "Remove as default."
                : "Use as Default."
            }`}</span>
          </Checkbox>
        </ShipAddress>
      </Content>
      <Sidebar>
        <AmazonButton
          buttonText="Continue to pay"
          handleClick={handleContinueToPay}
        />
        <Summary>
          <UIHeader as="h6" content="Order Summary" />
          <SummaryItem>
            <UISmall content="Items:" />
            <UISmall
              content={`${CURRENCY} ${(
                BASKET?.total - BASKET?.shipping
              ).toFixed(2)}`}
            />
          </SummaryItem>
          <SummaryItem>
            <UISmall content="Postage & Packaging:" />
            <UISmall content={`${CURRENCY} ${BASKET?.shipping || 0}`} />
          </SummaryItem>

          <TextDivider />
        </Summary>
        <SummaryItem>
          <UIHeader as="h2" content="Total" />
          <UIHeader as="h3" content={`${CURRENCY} ${BASKET?.total || 0} `} />
        </SummaryItem>
        <UISmall content="Order Totals include VAT." />
      </Sidebar>
    </Container>
  );
};

export default OrderConfirmation;
