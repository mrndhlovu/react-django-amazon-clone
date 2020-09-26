/* eslint-disable no-nested-ternary */

import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { v4 as uuid } from "uuid";
import styled from "styled-components";

import {
  Star as StarIcon,
  StarHalf as StarHalfIcon,
  StarBorder,
} from "@material-ui/icons";

import { getStars } from "../../utils/appUtils";

const FullStarRating = styled(StarIcon)`
  color: ${({ theme }) => theme.colors.amazon};
`;

const HalfStarRating = styled(StarHalfIcon)`
  color: ${({ theme }) => theme.colors.amazon};
`;

const EmptyStarRating = styled(StarBorder)`
  color: ${({ theme }) => theme.colors.amazon};
`;

const StarsContainer = styled.div`
  svg {
    cursor: pointer;
    font-size: 20px;
  }
`;

const ProductRating = ({ rating, handleClick }) => {
  return (
    <StarsContainer>
      {getStars(rating).map((star, index) => (
        <Fragment key={uuid()}>
          {star === "FULL" ? (
            <FullStarRating onClick={() => handleClick(index + 1)} />
          ) : star === "HALF" ? (
            <HalfStarRating onClick={() => handleClick(index + 1)} />
          ) : (
            <EmptyStarRating onClick={() => handleClick(index + 1)} />
          )}
        </Fragment>
      ))}
    </StarsContainer>
  );
};

ProductRating.defaultProps = { rating: 0 };

ProductRating.propTypes = {
  rating: PropTypes.number,
  handleClick: PropTypes.func.isRequired,
};

export default ProductRating;
