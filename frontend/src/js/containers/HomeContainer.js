/* eslint-disable comma-dangle */
import React from "react";
import styled from "styled-components";

const Container = styled.div`
  height: 100%;
`;

const HomeContainer = () => {
  return (
    <>
      <Container data-testid="home-page">
        <h1>React App Mounted</h1>
      </Container>
    </>
  );
};

export default HomeContainer;
