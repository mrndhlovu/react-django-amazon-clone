import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";

import { AmazonButton } from "../shared";

import {
  EDIT_EMAIL,
  EDIT_NAME,
  EDIT_PASSWORD,
  EDIT_PHONE_NUMBER,
} from "../../actions/ActionTypes";

const ListContainer = styled(List)`
  margin-top: 15px !important;
  border: 1px solid #0000001f;
  border-radius: 3px;

  & .amazon__button {
    font-weight: ${({ theme }) => theme.fonts.weight.medium};
  }
`;

const LoginAndSecurity = ({ handleClick }) => {
  const {
    auth: { data },
  } = useSelector((state) => state);

  return (
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
  );
};

LoginAndSecurity.propTypes = {
  handleClick: PropTypes.func.isRequired,
};

export default LoginAndSecurity;
