import React from "react";
import ReactDOM from "react-dom";

import App from "./js/App";
import "./assets/theme/sass/styles.scss";
import reportWebVitals from "./reportWebVitals";

const ROOT_ELEMENT = document.getElementById("root");

ReactDOM.render(<App />, ROOT_ELEMENT);

reportWebVitals();
