import React, { memo, useEffect } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useHistory } from "react-router-dom";

import { getShoppingBasketAction } from "../../actions/CartActions";
import CheckoutForm from "./CheckoutForm";
import { useMainContext } from "../../utils/hookUtils";

const Container = styled.div`
  height: fit-content;
`;

const Content = styled.div``;

const promise = loadStripe(
  "pk_test_51HYVtzEtxjzs9HVgddjmJ7zoVAVKSaZkBnT4uet9yFvfNPB3v7X66TxZJWhEOHFQfCBoHqyQXkqvLK0xHWrLV7nU00T2OrmUtZ"
);

const CompletePayment = () => {
  const {
    checkout: { orderComplete },
  } = useMainContext();
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    if (orderComplete) {
      dispatch(getShoppingBasketAction());
      history.replace("/user-profile?flowId=orders");
    }
  }, [orderComplete, dispatch, history]);

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

export default memo(CompletePayment);
