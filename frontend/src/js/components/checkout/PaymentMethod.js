import React from "react";
import styled from "styled-components";
import { times } from "lodash";
import { v4 as uuid } from "uuid";
import { useDispatch } from "react-redux";

import { AmazonButton, TextDivider, UIForm, UIHeader } from "../shared";
import UISelector from "../shared/UISelector";
import UISmall from "../shared/UISmall";
import { PAYMENT_CARD_VALIDATION } from "../../constants/constants";
import { nextCheckoutStageAction } from "../../actions/CartActions";
import { CONFIRM_PAYMENT } from "../../actions/ActionTypes";

const Container = styled.div`
  height: 100%;
  display: grid;
  grid-template-columns: 3fr 1fr;
`;

const Content = styled.div`
  & > div:first-child {
    padding-bottom: 15px;
  }

  h5,
  h4 {
    padding-bottom: 15px;
  }
`;

const Sidebar = styled.div`
  display: block;
  border: 1px #ddd solid;
  background-color: #f3f3f3;
  border-radius: 4px;
  width: 280px;
  height: 11%;
  padding: 10px;
`;

const CardInfo = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  width: 30%;
`;

const SelectorsContainer = styled.div`
  h5 {
    padding-bottom: 0;
    font-size: 13px;
  }

  select {
    margin: 5px 0;
    width: fit-content;
    margin-right: 6px;
  }
`;

const NUMBER_OF_MONTHS = 12;

const YEARS = [2020, 2021, 2022, 2023, 2024, 2025];

const PaymentMethod = () => {
  const dispatch = useDispatch();

  const handleAddCard = (data) => {
    console.log("handleAddCard -> data", data);
  };

  const handleContinue = () =>
    dispatch(nextCheckoutStageAction(CONFIRM_PAYMENT));

  return (
    <Container>
      <Content>
        <TextDivider />
        <UIHeader as="h4" content="Add a payment method" />
        <UIHeader as="h5" content="Credit or Debit Cards" />

        <CardInfo>
          <SelectorsContainer>
            <UIHeader as="h5" content="Expiry date" />
            <UISelector>
              {times(NUMBER_OF_MONTHS, (index) => (
                <option key={uuid()} value={index + 1}>
                  {index + 1}
                </option>
              ))}
            </UISelector>
            <UISelector>
              {YEARS.map((year) => (
                <option key={uuid()} value={year}>
                  {year}
                </option>
              ))}
            </UISelector>
          </SelectorsContainer>

          <UIForm
            initialState={{ name: "", card_number: "" }}
            validationSchema={PAYMENT_CARD_VALIDATION}
            submitHandler={handleAddCard}
          >
            <UIForm.Input label="Name on card" name="card_name" />

            <UIForm.Input label="Card number" name="card_number" />

            <UIForm.Button buttonText="Add your card" type="submit" />
          </UIForm>
        </CardInfo>
      </Content>
      <Sidebar>
        <AmazonButton buttonText="Continue" handleClick={handleContinue} />
        <UISmall content="You can review this order before it's final." />
      </Sidebar>
    </Container>
  );
};

PaymentMethod.propTypes = {};

export default PaymentMethod;
