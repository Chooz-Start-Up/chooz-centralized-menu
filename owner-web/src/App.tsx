import React from "react";
import { Router, Routes, Route, Link, BrowserRouter } from "react-router-dom";
import MainLandingPage from "./pages/MainLandingPage";
import MenuEditPage from "./pages/MenuEditPage";

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Routes>
          <Route
            path="/preview/"
            element={<MainLandingPage isLoggedin={false} />}
          />

          <Route path="/edit" element={<MenuEditPage isLoggedin={true} />} />
        </Routes>
      </BrowserRouter>
    );
  }
}

export default App;
