import React from "react";
import styled from "styled-components";
import { v4 as uuid } from "uuid";
import { useSelector } from "react-redux";

import { AmazonButton, TextDivider, UIHeader } from "../shared";
import UISmall from "../shared/UISmall";
import UIAlert from "../shared/UIAlert";

const Container = styled.div`
  display: grid;
  grid-template-columns: 3fr 1fr;
`;
const ShipAddress = styled.div`
  display: block;
  border: 1px #ddd solid;
  border-radius: 4px;
  padding: 10px;
  height: fit-content;
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

const OrderConfirmation = () => {
  const {
    cart: { BASKET, CURRENCY = "EUR" },
    auth: { data, address },
  } = useSelector((state) => state);

  return (
    <Container>
      <Content>
        <UIAlert message="Want to save time on your next order and go directly to this step when checking out?" />
        <ShipAddress>
          <Address>
            <UIHeader as="h5" content="Delivery Address" />
            <UISmall content={data.full_name} />
            {Object.values(address).map((line) => (
              <div key={uuid()}>
                <UISmall content={line} />
              </div>
            ))}
          </Address>
        </ShipAddress>
      </Content>
      <Sidebar>
        <AmazonButton buttonText={`Pay in ${CURRENCY}`} />
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
