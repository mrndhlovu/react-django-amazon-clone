import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const Container = styled.div`
  ${({ theme }) => theme.helpers.useFlex()};
  padding: 0 25%;
  height: 77%;
`;

const Image = styled.img`
  width: 100%;
  height: auto;
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
