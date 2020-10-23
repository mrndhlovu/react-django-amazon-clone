import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const Small = styled.small``;

const UISmall = ({ content }) => {
  return <Small>{content}</Small>;
};

UISmall.propTypes = {
  content: PropTypes.string.isRequired,
};

export default UISmall;
