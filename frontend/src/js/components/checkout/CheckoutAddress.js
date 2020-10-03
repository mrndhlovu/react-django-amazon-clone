/* eslint-disable no-param-reassign */
import React, { useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { v4 as uuid } from "uuid";
import { useDispatch } from "react-redux";

import { ADDRESS_SCHEMA, COUNTRIES } from "../../constants/constants";
import { AmazonButton, UIForm, UIHeader } from "../shared";
import { CHECKOUT_PAYMENT } from "../../actions/ActionTypes";
import { nextCheckoutStageAction } from "../../actions/CartActions";
import { updateAddressAction } from "../../actions/AuthActions";
import UISelector from "../shared/UISelector";
import UISmall from "../shared/UISmall";

const AddressLine = styled.div``;

const AddressContent = styled.div`
  &::before {
    display: block;
    width: 100%;
    height: 44px;
    background: -webkit-linear-gradient(top, #ddd, #f7f7f7 3px, #fff);
    content: "";
  }
`;

const Address = styled.div`
  padding: 15px 0;
  width: 25%;
`;

const AddAddress = styled.div`
  width: 50%;

  h6 {
    font-size: 13px;
  }

  h3 {
    margin-bottom: 5px;
  }

  button {
    width: 200px;
  }
`;

const CheckoutAddress = ({ address, name }) => {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState("Ireland");

  const handleAddAddress = (data) => {
    const addressData = `${data.addressLine1}, ${data.addressLine2}`;

    delete data.addressLine1;
    delete data.addressLine2;

    dispatch(
      updateAddressAction({ ...data, address: addressData, country: formData })
    );
  };

  const handleDeliverToAddress = () =>
    dispatch(nextCheckoutStageAction(CHECKOUT_PAYMENT));

  return (
    <AddressContent>
      <Address>
        <UIHeader as="h5" content={name} />
        {Object.values(address).map((line) => (
          <AddressLine key={uuid()}>
            <UISmall content={line} />
          </AddressLine>
        ))}

        <AmazonButton
          handleClick={handleDeliverToAddress}
          buttonText="Deliver to this address"
        />
      </Address>
      <AddAddress>
        <UIHeader as="h3" content="Add a new address" />

        <UIHeader as="h6" content="Country/Region" />
        <UISelector
          name="countries"
          id="countries"
          onChange={(e) => setFormData(e.target.value)}
        >
          <option name="country" defaultValue={formData}>
            {formData}
          </option>
          {COUNTRIES.map((country) => (
            <option key={uuid()} value={country.name}>
              {country.name}
            </option>
          ))}
        </UISelector>

        <UIForm
          initialState={ADDRESS_SCHEMA.INITIAL_STATE}
          validationSchema={ADDRESS_SCHEMA.VALIDATION}
          submitHandler={handleAddAddress}
        >
          <UIForm.Input label="Postcode" name="postcode" />
          <UIForm.Input label="Phone number" name="phone_number" />
          <UIForm.Input
            label="Address line 1 (or Company name)"
            name="addressLine1"
          />
          <UIForm.Input label="Address line 2 (optional)" name="addressLine2" />
          <UIForm.Input label="Town/City" name="city" />
          <UIForm.Input label="County" name="county" />
          <UIForm.Button buttonText="Add address" type="submit" />
        </UIForm>
      </AddAddress>
    </AddressContent>
  );
};

CheckoutAddress.defaultProps = {
  address: {},
  name: "",
};

CheckoutAddress.propTypes = {
  address: PropTypes.shape({}),
  name: PropTypes.string,
};

export default CheckoutAddress;
