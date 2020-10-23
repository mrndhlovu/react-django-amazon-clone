import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import InfoIcon from "@material-ui/icons/Info";
import WarningIcon from "@material-ui/icons/Warning";

import UISmall from "./UISmall";

const Container = styled.div`
  border: 1px solid
    ${({ theme, error }) => (error ? theme.colors.red : "#bbd3de")};
  border-radius: 3px;
  margin-bottom: 10px;
`;

const Content = styled.div`
  background-color: #fafafa;
  padding: 18px;
  display: flex;

  svg {
    color: ${({ theme, error }) => (error ? theme.colors.red : "#bbd3de")};
  }
`;

const Message = styled.p`
  flex-grow: 1;
  text-align: center;
`;

const UIAlert = ({ message, error }) => {
  return (
    <Container error={error}>
      <Content error={error}>
        <div>{error ? <WarningIcon /> : <InfoIcon />}</div>
        <Message>
          <UISmall content={message} />
        </Message>
      </Content>
    </Container>
  );
};

UIAlert.defaultProps = {
  error: false,
};

UIAlert.propTypes = {
  message: PropTypes.string.isRequired,
  error: PropTypes.bool,
};

export default UIAlert;
