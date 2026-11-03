import { QueryProvider } from "./providers";
import { MainRouter } from "./router";

import "./styles/index.scss";

export const App = () => (
  <QueryProvider>
    <MainRouter />
  </QueryProvider>
);
