import { BrowserRouter, Route, Routes } from "react-router-dom";

import { MainPage } from "pages";

export const MainRouter = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<MainPage />} />
    </Routes>
  </BrowserRouter>
);
