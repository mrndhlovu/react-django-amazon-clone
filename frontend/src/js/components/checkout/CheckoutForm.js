import React, { useState, useEffect, memo } from "react";
import styled from "styled-components";

import { useDispatch, useSelector } from "react-redux";

import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

import { AmazonButton } from "../shared";
import {
  completeOrderAction,
  paymentIntentAction,
} from "../../actions/CartActions";
import UIAlert from "../shared/UIAlert";

const CardInfo = styled.div`
  width: 100%;

  form {
    border: 1px solid ${({ theme }) => theme.colors.grey};
    padding: 10px;
    height: 100px;
    border-radius: 3px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    & > div:first-child {
      width: 50%;
    }

    @media (max-width: 845px) {
      & > div:first-child {
        width: 100%;
        padding: 0 10px;
      }

      flex-direction: column;
      justify-content: space-evenly;
      padding: 0;
      height: 150px;
    }
  }
`;

const cardStyle = {
  style: {
    base: {
      height: "20px",
      border: "1px solid black",
      color: "#32325d",
      fontSmoothing: "antialiased",
      fontSize: "16px",
      "::placeholder": {
        color: "#32325d",
      },
    },
    invalid: {
      color: "#fa755a",
      iconColor: "#fa755a",
    },
  },
};

const Sidebar = styled.div`
  display: block;
  border: 1px #ddd solid;
  background-color: #f3f3f3;
  border-radius: 4px;
  width: 280px;
  padding: 10px;

  @media (max-width: 845px) {
    width: 100%;
    background-color: transparent;
    border: none;
  }
`;

const CheckoutForm = () => {
  const {
    checkout: { clientSecret, processing, error },
    auth: { data },
    cart: { CURRENCY = "EUR" },
  } = useSelector((state) => state);
  const dispatch = useDispatch();
  const stripe = useStripe();
  const elements = useElements();

  const [errMessage, setErrMessage] = useState("");

  const handlePay = async (e) => {
    e.preventDefault();
    await stripe
      .confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            name: data?.full_name,
          },
        },
      })
      .then((res) => {
        dispatch(
          completeOrderAction({
            token: "tok_mastercard",
            stripe_complete_id: res.paymentIntent.id,
          })
        );
      })
      .catch((err) => setErrMessage(`Payment failed ${err?.message}`));
  };

  useEffect(() => {
    if (!clientSecret) dispatch(paymentIntentAction());
    if (errMessage) {
      setTimeout(() => {
        setErrMessage("");
      }, 2000);
    }
  }, [dispatch, clientSecret, errMessage]);

  return (
    <>
      {(error || errMessage) && (
        <UIAlert
          error={(error || errMessage) !== undefined}
          message={error || errMessage}
        />
      )}
      <CardInfo>
        <form id="payment-form" onSubmit={handlePay}>
          <div>
            <CardElement id="card-element" options={cardStyle} />
          </div>
          <Sidebar>
            <AmazonButton
              disabled={processing}
              buttonText={processing ? "Processing" : `Pay in ${CURRENCY}`}
              type="submit"
            />
          </Sidebar>
        </form>
      </CardInfo>
    </>
  );
};

CheckoutForm.propTypes = {};

export default memo(CheckoutForm);
