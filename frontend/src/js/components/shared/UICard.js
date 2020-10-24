import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
} from "@material-ui/core";

const Container = styled(Card)`
  min-height: 400px;
  width: 100%;
  margin: 10px;
  border-radius: 2px !important;
  position: relative;

  @media (max-width: 845px) {
    height: 300px;
    width: 100%;
  }
`;

const ContainerMedia = styled(CardMedia)`
  height: 100%;
  width: 100%;
  margin: 10px;
`;

const ContainerContent = styled(CardContent)`
  min-height: 100%;
  width: 100%;
  padding: 10px;
`;

const UICard = ({ children }) => {
  return <Container>{children}</Container>;
};

UICard.Content = ContainerContent;
UICard.Action = CardActions;
UICard.Header = CardHeader;
UICard.Media = ContainerMedia;

UICard.propTypes = {
  children: PropTypes.node.isRequired,
};

export default UICard;
