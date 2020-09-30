import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const Container = styled.div`
  ${({ theme }) => theme.helpers.useFlex()};
  height: 308px;
  width: 100%;
`;

const Image = styled.img`
  width: auto;
  height: 200px;
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
