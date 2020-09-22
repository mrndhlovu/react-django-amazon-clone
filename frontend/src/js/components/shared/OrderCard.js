import React from "react";
import styled from "styled-components";

const Card = styled.div`
  padding: 10px;
`;
const CardBody = styled.div``;
const CardHeader = styled.div`
  height: 60px;
  width: 100%;
`;

const OrderCard = ({ order }) => {
  return (
    <Card>
      <CardHeader>header</CardHeader>
      <CardBody>body</CardBody>
    </Card>
  );
};

OrderCard.propTypes = {};

export default OrderCard;
