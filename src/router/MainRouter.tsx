import { MainPage } from "pages";
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const Router = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<MainPage />} />
    </Routes>
  </BrowserRouter>
);

export default Router;
