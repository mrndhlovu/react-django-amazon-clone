/* eslint-disable comma-dangle */
import React from "react";
import styled from "styled-components";

import Header from "../components/header/Header";

const Container = styled.div`
  height: 100%;
`;

const HomeContainer = () => {
  return (
    <>
      <Header />
      <Container data-testid="home-page">
        <h1>React App Mounted</h1>
      </Container>
    </>
  );
};

export default HomeContainer;
