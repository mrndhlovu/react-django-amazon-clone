import React from "react";
import styled from "styled-components";

const Container = styled.div`
  font-size: 12px;
  padding: 10px 0;
  letter-spacing: 0.4px;
  line-height: 18px;
`;

const TermsAndConditions = () => {
  return (
    <Container>
      <p>
        By signing-in you agree to Amazon&apos;s Conditions of Use & Sale.
        Please see our Privacy Notice, our Cookies Notice and our Interest-Based
        Ads Notice.
      </p>
    </Container>
  );
};

export default TermsAndConditions;
