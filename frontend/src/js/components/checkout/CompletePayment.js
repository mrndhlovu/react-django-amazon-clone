import React, { useEffect } from "react";
import styled from "styled-components";

import { useDispatch, useSelector } from "react-redux";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useHistory } from "react-router-dom";

import { AmazonButton } from "../shared";
import UISmall from "../shared/UISmall";
import { nextCheckoutStageAction } from "../../actions/CartActions";
import { CONFIRM_ORDER } from "../../actions/ActionTypes";
import CheckoutForm from "./CheckoutForm";

const Container = styled.div`
  height: fit-content;
`;

const Content = styled.div``;

const promise = loadStripe(
  "pk_test_51HYVtzEtxjzs9HVgddjmJ7zoVAVKSaZkBnT4uet9yFvfNPB3v7X66TxZJWhEOHFQfCBoHqyQXkqvLK0xHWrLV7nU00T2OrmUtZ"
);

const CompletePayment = () => {
  const {
    auth: { data },
    cart: { CURRENCY = "EUR" },
    checkout: { processing, orderComplete },
  } = useSelector((state) => state);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    if (orderComplete) {
      history.replace("/orders");
    }
  }, [orderComplete]);

  return (
    <Container>
      <Content>
        <Elements stripe={promise}>
          <CheckoutForm />
        </Elements>
      </Content>
    </Container>
  );
};

CompletePayment.propTypes = {};

export default CompletePayment;
