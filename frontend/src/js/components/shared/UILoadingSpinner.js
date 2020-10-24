import React from "react";
import styled from "styled-components";

import CircularProgress from "@material-ui/core/CircularProgress";

const Spinner = styled.div`
  left: 0;
  top: 0;
  z-index: 100;
  position: absolute;
  transform: translate(-50%, 50%);
  top: 40%;
  left: 50%;

  & > div {
    background-color: transparent;

    & > svg {
      color: #000;
    }
  }
`;

const UILoadingSpinner = () => (
  <Spinner>
    <CircularProgress color="inherit" size={20} />
  </Spinner>
);

export default UILoadingSpinner;
