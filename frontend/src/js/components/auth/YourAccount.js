/* eslint-disable nonblock-statement-body-position */
import React, { memo, useEffect } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

import LocalShippingIcon from "@material-ui/icons/LocalShipping";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import PaymentIcon from "@material-ui/icons/Payment";
import RoomIcon from "@material-ui/icons/Room";

import LoginAndSecurity from "./LoginAndSecurity";
import Orders from "./Orders";
import Address from "./Address";
import Payments from "./Payments";
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
import { getSearchParams } from "../../utils/appUtils";

const OptionsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 50%);
  padding: 10px 0;
`;

const YourAccount = () => {
  const {
    editProfile: { ACTIVE_SECTION, BREADCRUMBS },
  } = useSelector((state) => state);
  const dispatch = useDispatch();
  const {
    ACCOUNT,
    ADDRESS,
    LOGIN_SECURITY,
    ORDERS,
    PAYMENTS,
  } = MANAGE_ACCOUNT_SECTIONS;
  const { search } = useLocation();
  const handleClickOption = (option) => dispatch(editProfileAction(option));

  useEffect(() => {
    if (getSearchParams(search).includes("orders")) {
      dispatch(editProfileAction(OPEN_ORDERS));
    }
  }, [dispatch, ORDERS, search]);

  return (
    <UIContentWrapper
      header={ACTIVE_SECTION?.SUBHEADER || ACTIVE_SECTION.HEADER}
    >
      <UIBreadcrumbs breadCrumbs={BREADCRUMBS} onClick={handleClickOption} />
      {ACCOUNT.HEADER === ACTIVE_SECTION.HEADER && (
        <OptionsContainer>
          <OptionCard
            content="Track return, or buy things again."
            header="Your Orders"
            icon={() => <LocalShippingIcon size="large" />}
            onClick={() => handleClickOption(OPEN_ORDERS)}
            pageId="orders"
          />
          <OptionCard
            content="Track return, or buy things again."
            header="Login & Security"
            icon={() => <LockOpenIcon />}
            onClick={() => handleClickOption(OPEN_LOGIN_SECURITY)}
            pageId="login-&-security"
          />

          <OptionCard
            content="Track return, or buy things again."
            header="Your Address"
            icon={() => <RoomIcon />}
            onClick={() => handleClickOption(OPEN_ADDRESS)}
            pageId="address"
          />
          <OptionCard
            content="Track return, or buy things again."
            header="Your payments"
            icon={() => <PaymentIcon />}
            onClick={() => handleClickOption(OPEN_PAYMENTS)}
            pageId="payments"
          />
        </OptionsContainer>
      )}

      {LOGIN_SECURITY.HEADER === ACTIVE_SECTION.HEADER && (
        <LoginAndSecurity
          ACTIVE_SECTION={ACTIVE_SECTION}
          sectionHeader={ACTIVE_SECTION.HEADER}
        />
      )}

      {ORDERS.HEADER === ACTIVE_SECTION.HEADER && (
        <Orders
          ACTIVE_SECTION={ACTIVE_SECTION}
          sectionHeader={ACTIVE_SECTION.HEADER}
        />
      )}

      {ADDRESS.HEADER === ACTIVE_SECTION.HEADER && (
        <Address
          ACTIVE_SECTION={ACTIVE_SECTION}
          sectionHeader={ACTIVE_SECTION.HEADER}
        />
      )}

      {PAYMENTS.HEADER === ACTIVE_SECTION.HEADER && (
        <Payments
          ACTIVE_SECTION={ACTIVE_SECTION}
          sectionHeader={ACTIVE_SECTION.HEADER}
        />
      )}
    </UIContentWrapper>
  );
};

export default memo(YourAccount);
