import React from "react";
import { v4 as uuid } from "uuid";
import styled from "styled-components";

import { Carousel as ResponsiveCarousel } from "react-responsive-carousel";

import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";

import "react-responsive-carousel/lib/styles/carousel.min.css";
import { UILinkButton } from "../shared";
import { IMAGES } from "../../constants/constants";

const Container = styled.div``;
const StyledResponsiveCarousel = styled(ResponsiveCarousel)`
  position: relative;
`;

const IconRight = styled(UILinkButton)`
  color: ${({ theme }) => theme.colors.black};

  position: absolute;
  top: 40%;
  z-index: 10;
  right: 2%;
  cursor: pointer;
`;

const IconLeft = styled(UILinkButton)`
  color: ${({ theme }) => theme.colors.black};

  position: absolute;
  top: 40%;
  z-index: 10;
  left: 2%;
  cursor: pointer;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;
const ImageContainer = styled.div`
  height: 100%;
  align-items: center;
  justify-content: center;
`;

const Carousel = () => {
  return (
    <Container>
      <StyledResponsiveCarousel
        showStatus={false}
        showIndicators={false}
        autoPlay
        renderArrowNext={({ onClickHandler }) => (
          <IconRight onClick={onClickHandler}>
            <ArrowForwardIosIcon fontSize="large" />
          </IconRight>
        )}
        renderArrowPrev={({ onClickHandler }) => (
          <IconLeft onClick={onClickHandler}>
            <ArrowBackIosIcon fontSize="large" />
          </IconLeft>
        )}>
        {IMAGES.CAROUSEL.map((image) => (
          <ImageContainer key={uuid()}>
            <Image src={image} alt="carousel-image" />
          </ImageContainer>
        ))}
      </StyledResponsiveCarousel>
    </Container>
  );
};

export default Carousel;
