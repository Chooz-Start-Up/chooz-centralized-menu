import React from "react";
import UnderConstructionPage from "./page/UnderConstructionPage";
import WelcomePage from "./page/WelcomePage";
import PageNotFound from "./page/PageNotFound";

import { Routes, Route, BrowserRouter } from "react-router-dom";
import RestaurantMenuPage from "./page/RestaurantMenuPage";
import "./App.css";

const App: React.FC = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* <Route path="/" element={<UnderConstructionPage />} /> */}

          <Route path="/welcome/:restaurantKey" element={<WelcomePage />} />

          <Route
            path="/menu/:restaurantName/:restaurantKey"
            element={<RestaurantMenuPage />}
          />

          <Route path="/notfound" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
