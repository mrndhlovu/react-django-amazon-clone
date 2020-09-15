/* eslint-disable comma-dangle */
import React from "react";
import styled from "styled-components";

import { requestCurrentUser } from "../apis/apiRequests";
import { useFetch } from "../utils/hookUtils";
import Header from "../components/header/Header";

const Container = styled.div`
  height: 100%;
`;

const HomeContainer = () => {
  const [data, isLoading] = useFetch(requestCurrentUser);
  console.log("HomeContainer -> data", data);

  return (
    <>
      <Header />
      <Container data-testid="home-page">
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <>
            <h1>React App Mounted</h1>
            <h3>{`Placeholder api data:  ${data?.title}`}</h3>
          </>
        )}
      </Container>
    </>
  );
};

export default HomeContainer;
