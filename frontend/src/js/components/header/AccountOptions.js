import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const Container = styled.div`
  width: fit-content;
  display: flex;
  flex-direction: column;
  height: 300px;
  width: 350px;
  overflow-wrap: wrap;
  position: relative;
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  flex-grow: 1;
`;

const Content = styled.div`
  flex-grow: 1;
  display: flex;
  justify-content: space-evenly;
  padding: 10px;
  align-items: flex-start;

  & > div:first-child {
    &::after {
      content: "";
      width: 2px;
      height: 100%;
      color: ${({ theme }) => theme.colors.grey};
    }
  }

  h3 {
    margin: 0;
    padding: 0;
    padding-bottom: 8px;
  }

  button {
    margin: 0;
    padding: 3px 0;
    ${({ theme }) => theme.helpers.hoverText(theme.colors.amazon)};
  }
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 10px 10%;

  a {
    text-decoration: none;
    color: ${({ theme }) => theme.colors.amazonBlue};
    padding-left: 10px;
  }
`;

const AccountOptions = ({ children }) => {
  return <Container>{children}</Container>;
};

AccountOptions.Column = ({ children }) => {
  return <Column>{children}</Column>;
};

AccountOptions.Content = ({ children }) => {
  return <Content>{children}</Content>;
};

AccountOptions.Header = ({ children }) => {
  return <Header>{children}</Header>;
};

AccountOptions.propTypes = { children: PropTypes.node.isRequired };
AccountOptions.Column.propTypes = { children: PropTypes.node.isRequired };
AccountOptions.Content.propTypes = { children: PropTypes.node.isRequired };
AccountOptions.Header.propTypes = { children: PropTypes.node.isRequired };

export default AccountOptions;
