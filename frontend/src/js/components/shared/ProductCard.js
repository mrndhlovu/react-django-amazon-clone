import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const Container = styled.div`
  ${({ theme }) => theme.helpers.useFlex()};
  width: 100%;
  height: 77%;
`;

const Image = styled.img`
  width: 80%;
  height: 62%;
  cursor: pointer;
`;

const ProductCard = ({ image }) => {
  return (
    <Container>
      <Image src={image} />
    </Container>
  );
};

ProductCard.defaultProps = {
  image: "Recently viewed",
};

ProductCard.propTypes = {
  image: PropTypes.string,
};

export default ProductCard;
