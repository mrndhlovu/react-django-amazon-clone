import React from "react";
import ProtectedComponentWrapper from "./ProtectedComponentWrapper";

const Payments = () => {
  return (
    <ProtectedComponentWrapper>
      <div>Payments</div>
    </ProtectedComponentWrapper>
  );
};

export default Payments;
