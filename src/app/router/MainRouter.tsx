import { MainPage } from "pages";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const Router = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<MainPage />} />
    </Routes>
  </BrowserRouter>
);

export default Router;
