import React from "react";
import UnderConstructionPage from "./page/UnderConstructionPage";
import WelcomePage from "./page/WelcomePage";

import { Routes, Route, BrowserRouter } from "react-router-dom";
import RestaurantMenuPage from "./page/RestaurantMenuPage";

const App: React.FC = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<UnderConstructionPage />} />

          <Route path="/welcome" element={<WelcomePage />} />

          <Route path="/preview" element={<RestaurantMenuPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
