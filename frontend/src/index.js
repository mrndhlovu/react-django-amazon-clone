import React from "react";
import ReactDOM from "react-dom";
import App from "./js/App";
import "./assets/theme/sass/styles.scss";
import * as serviceWorker from "./serviceWorker";

const ROOT_ELEMENT = document.getElementById("root");

ReactDOM.render(<App />, ROOT_ELEMENT);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
