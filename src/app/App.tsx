import React from "react";
import { QueryProvider } from "./providers";
import Router from "./router";

import "./styles/index.scss";

const App = () => (
  <QueryProvider>
    <Router />
  </QueryProvider>
);

export default App;
