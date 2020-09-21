import React, { useRef } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";

import LocalShippingIcon from "@material-ui/icons/LocalShipping";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import PaymentIcon from "@material-ui/icons/Payment";
import RoomIcon from "@material-ui/icons/Room";

import ChangeEmail from "./ChangeEmail";
import ChangeName from "./ChangeName";
import ChangePhone from "./ChangePhone";
import OptionCard from "./OptionCard";
import UIContentWrapper from "../shared/UIContentWrapper";
import UpdatePassword from "./UpdatePassword";
import LoginAndSecurity from "./LoginAndSecurity";

import {
  EDIT_EMAIL,
  EDIT_LOGIN_SECURITY,
  EDIT_NAME,
  EDIT_PASSWORD,
  EDIT_PHONE_NUMBER,
} from "../../actions/ActionTypes";
import { editProfileAction } from "../../actions/AppActions";

const OptionsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 50%);
  padding: 10px;
`;

const YourAccount = () => {
  const {
    editProfile: { breadcrumb, EDITING, header },
  } = useSelector((state) => state);
  const dispatch = useDispatch();

  const loginRef = useRef();

  const handleClickOption = (option) => {
    return dispatch(editProfileAction(option));
  };

  return (
    <UIContentWrapper header={header && breadcrumb}>
      {!EDITING && (
        <OptionsContainer>
          <OptionCard
            content="Track return, or buy things again."
            header="Your Orders"
            icon={() => <LocalShippingIcon size="large" />}
            onClick={() => handleClickOption(EDIT_LOGIN_SECURITY)}
          />
          <OptionCard
            content="Track return, or buy things again."
            header="Login & Security"
            icon={() => <LockOpenIcon />}
            onClick={() => handleClickOption(EDIT_LOGIN_SECURITY)}
            ref={loginRef}
          />

          <OptionCard
            content="Track return, or buy things again."
            header="Your Address"
            icon={() => <RoomIcon />}
            onClick={() => handleClickOption(EDIT_LOGIN_SECURITY)}
          />
          <OptionCard
            content="Track return, or buy things again."
            header="Your payments"
            icon={() => <PaymentIcon />}
            onClick={() => handleClickOption(EDIT_LOGIN_SECURITY)}
          />
        </OptionsContainer>
      )}
      {EDITING === EDIT_LOGIN_SECURITY && (
        <LoginAndSecurity handleClick={handleClickOption} />
      )}
      {EDITING === EDIT_NAME && <ChangeName />}
      {EDITING === EDIT_EMAIL && <ChangeEmail />}
      {EDITING === EDIT_PHONE_NUMBER && <ChangePhone />}
      {EDITING === EDIT_PASSWORD && <UpdatePassword />}
    </UIContentWrapper>
  );
};

export default YourAccount;
