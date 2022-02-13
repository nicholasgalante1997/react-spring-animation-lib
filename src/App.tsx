import React from "react";
import ReactDOM from "react-dom";
import { Hover, hoverExampleStyles } from "./examples/hover";

import "./index.css";

const App = () => (
  <div className="container">
    <Hover fromStyle={hoverExampleStyles.from} toStyle={hoverExampleStyles.to} />
    <Hover lift {...hoverExampleStyles.from} />
    <Hover invert {...hoverExampleStyles.from}>
      <p>Use Spring !</p>
    </Hover>
  </div>
);
ReactDOM.render(<App />, document.getElementById("app"));
