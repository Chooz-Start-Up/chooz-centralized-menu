import React from "react";
import UnderConstructionPage from "./page/UnderConstructionPage";
import WelcomePage from "./page/WelcomePage";

import { Routes, Route, BrowserRouter } from "react-router-dom";

const App: React.FC = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<UnderConstructionPage />} />

          <Route path="/preview" element={<WelcomePage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
