/* eslint-disable comma-dangle */
import React from "react";

import { useFetch } from "../utils/hookUtils";
import Header from "../components/header/Header";

const HomeContainer = () => {
  const [data, isLoading] = useFetch(
    "https://jsonplaceholder.typicode.com/todos/1"
  );

  return (
    <>
      <Header />
      <div data-testid="home-page">
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <>
            <h1>React App Mounted</h1>
            <h3>{`Placeholder api data:  ${data?.title}`}</h3>
          </>
        )}
      </div>
    </>
  );
};

export default HomeContainer;
