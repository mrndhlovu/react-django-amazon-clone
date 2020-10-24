import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const Small = styled.small``;

const UISmall = ({ content }) => <Small>{content}</Small>;

UISmall.defaultProps = { content: " " };

UISmall.propTypes = { content: PropTypes.string };

export default UISmall;
