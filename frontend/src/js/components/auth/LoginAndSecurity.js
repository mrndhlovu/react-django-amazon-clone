import React from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import PropTypes from "prop-types";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";

import ChangeEmail from "./ChangeEmail";
import ChangeName from "./ChangeName";
import ChangePhone from "./ChangePhone";
import UpdatePassword from "./UpdatePassword";

import { AmazonButton } from "../shared";

import {
  EDIT_EMAIL,
  EDIT_NAME,
  EDIT_PASSWORD,
  EDIT_PHONE_NUMBER,
} from "../../actions/ActionTypes";
import { editProfileAction } from "../../actions/AppActions";

const ListContainer = styled(List)`
  margin-top: 15px !important;
  border: 1px solid #0000001f;
  border-radius: 3px;

  & .amazon__button {
    font-weight: ${({ theme }) => theme.fonts.weight.medium};
  }
`;

const LoginAndSecurity = ({ ACTIVE_SECTION }) => {
  const {
    auth: { data },
  } = useSelector((state) => state);
  const dispatch = useDispatch();

  const handleClick = (action) => dispatch(editProfileAction(action));

  return (
    <>
      {!ACTIVE_SECTION.SUBHEADER && (
        <ListContainer>
          <ListItem alignItems="flex-start">
            <ListItemText primary="Name:" secondary={data?.full_name} />
            <div>
              <AmazonButton
                handleClick={() => handleClick(EDIT_NAME)}
                secondary
                buttonText="Edit"
              />
            </div>
          </ListItem>
          <Divider variant="fullWidth" component="li" />
          <ListItem alignItems="flex-start">
            <ListItemText primary="Email:" secondary={data?.email} />
            <div>
              <AmazonButton
                handleClick={() => handleClick(EDIT_EMAIL)}
                secondary
                buttonText="Edit"
              />
            </div>
          </ListItem>
          <Divider variant="fullWidth" component="li" />
          <ListItem alignItems="flex-start">
            <ListItemText
              primary="Mobile Phone Number:"
              secondary={data?.phone_number || "Add Phone number"}
            />
            <div>
              <AmazonButton
                handleClick={() => handleClick(EDIT_PHONE_NUMBER)}
                secondary
                buttonText="Edit"
              />
            </div>
          </ListItem>
          <Divider variant="fullWidth" component="li" />
          <ListItem alignItems="flex-start">
            <ListItemText primary="Password:" secondary="*********" />
            <div>
              <AmazonButton
                handleClick={() => handleClick(EDIT_PASSWORD)}
                secondary
                buttonText="Edit"
              />
            </div>
          </ListItem>
        </ListContainer>
      )}
      {ACTIVE_SECTION.SUBHEADER === "Edit Your Email" && <ChangeEmail />}
      {ACTIVE_SECTION.SUBHEADER === "Edit Your Name" && <ChangeName />}
      {ACTIVE_SECTION.SUBHEADER === "Edit Your Phone" && <ChangePhone />}
      {ACTIVE_SECTION.SUBHEADER === "Edit Your Password" && <UpdatePassword />}
    </>
  );
};

LoginAndSecurity.propTypes = {
  ACTIVE_SECTION: PropTypes.shape({ SUBHEADER: PropTypes.string }).isRequired,
};

export default LoginAndSecurity;
