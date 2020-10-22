import React from "react";
import styled from "styled-components";
import { times } from "lodash";
import { v4 as uuid } from "uuid";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";

import { UILinkButton, UIHeader } from "../shared";

const Container = styled.div`
  height: 40px;
  width: 100%;
  background-color: #eee;
  margin: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Navigator = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border: none;
  ${({ theme }) => theme.helpers.hoverText(theme.colors.amazon)};
`;

const PageCounter = styled.div`
  padding: 0 10px;
`;

const Pagination = ({ data, handlePagination, pageSize = 10 }) => {
  const pageNumbers =
    data.count % pageSize === 0
      ? data.count / pageSize
      : data.count / pageSize + 1;

  return (
    <Container>
      <Navigator
        disabled={!data?.previous}
        onClick={() => handlePagination(data?.previous)}
      >
        <ArrowBackIosIcon fontSize="large" />
        <UIHeader as="h5" content="Previous Page" />
      </Navigator>

      {times(pageNumbers, (index) => (
        <PageCounter key={uuid()}>
          <UILinkButton
            content={`${index + 1}`}
            onClick={() => handlePagination(index + 1)}
          />
        </PageCounter>
      ))}

      <Navigator
        disabled={!data?.next}
        onClick={() => handlePagination(data?.next)}
      >
        <UIHeader as="h5" content="Next Page" />
        <ArrowForwardIosIcon fontSize="large" />
      </Navigator>
    </Container>
  );
};

export default Pagination;
