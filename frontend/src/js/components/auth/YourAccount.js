import React from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";

import LocalShippingIcon from "@material-ui/icons/LocalShipping";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import PaymentIcon from "@material-ui/icons/Payment";
import RoomIcon from "@material-ui/icons/Room";

import LoginAndSecurity from "./LoginAndSecurity";
import OptionCard from "./OptionCard";
import UIContentWrapper from "../shared/UIContentWrapper";

import {
  OPEN_ADDRESS,
  OPEN_LOGIN_SECURITY,
  OPEN_PAYMENTS,
  OPEN_ORDERS,
} from "../../actions/ActionTypes";
import { editProfileAction } from "../../actions/AppActions";
import UIBreadcrumbs from "../shared/UIBreadcrumbs";
import { MANAGE_ACCOUNT_SECTIONS } from "../../constants/constants";

const OptionsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 50%);
  padding: 10px;
`;

const YourAccount = () => {
  const {
    editProfile: { ACTIVE_SECTION, BREADCRUMBS, OPEN },
  } = useSelector((state) => state);
  const dispatch = useDispatch();
  const {
    ACCOUNT,
    ADDRESS,
    LOGIN_SECURITY,
    ORDERS,
    PAYMENTS,
  } = MANAGE_ACCOUNT_SECTIONS;

  const handleClickOption = (option) => {
    return dispatch(editProfileAction(option));
  };

  return (
    <UIContentWrapper
      header={ACTIVE_SECTION?.SUBHEADER || ACTIVE_SECTION.HEADER}
    >
      <UIBreadcrumbs
        breadCrumbs={BREADCRUMBS}
        activePageId={OPEN}
        onClick={handleClickOption}
      />
      {ACCOUNT.HEADER === ACTIVE_SECTION.HEADER && (
        <OptionsContainer>
          <OptionCard
            content="Track return, or buy things again."
            header="Your Orders"
            icon={() => <LocalShippingIcon size="large" />}
            onClick={() => handleClickOption(OPEN_ORDERS)}
            linkTo="/user-profile?flowId=orders"
          />
          <OptionCard
            content="Track return, or buy things again."
            header="Login & Security"
            icon={() => <LockOpenIcon />}
            onClick={() => handleClickOption(OPEN_LOGIN_SECURITY)}
            linkTo="/user-profile?flowId=login-&-security"
          />

          <OptionCard
            content="Track return, or buy things again."
            header="Your Address"
            icon={() => <RoomIcon />}
            onClick={() => handleClickOption(OPEN_ADDRESS)}
            linkTo="/user-profile?flowId=address"
          />
          <OptionCard
            content="Track return, or buy things again."
            header="Your payments"
            icon={() => <PaymentIcon />}
            onClick={() => handleClickOption(OPEN_PAYMENTS)}
            linkTo="/user-profile?flowId=payments"
          />
        </OptionsContainer>
      )}

      {LOGIN_SECURITY.HEADER === ACTIVE_SECTION.HEADER && (
        <LoginAndSecurity
          ACTIVE_SECTION={ACTIVE_SECTION}
          sectionHeader={ACTIVE_SECTION.HEADER}
        />
      )}
    </UIContentWrapper>
  );
};

export default YourAccount;
