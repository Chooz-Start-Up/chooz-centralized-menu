import React from "react";
import { Router, Routes, Route, Link, BrowserRouter } from "react-router-dom";
import CreateAccountPage from "./pages/CreateAccountPage";
import LoginPage from "./pages/LoginPage";
import MainLandingPage from "./pages/MainLandingPage";
import MenuEditPage from "./pages/MenuEditPage";

interface AppProps {}

interface AppState {
  isLoggedin: boolean;
  isPasswordVisibile: boolean;
}

class App extends React.Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);

    this.state = { isLoggedin: false, isPasswordVisibile: false };
  }

  handleClickShowPassword = (event: any) => {
    this.setState(() => {
      return { isPasswordVisibile: !this.state.isPasswordVisibile };
    });
  };

  render() {
    return (
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <p>
                  <Link to="/preview">/preview</Link>
                </p>
                <p>
                  <Link to="/edit">/edit</Link>
                </p>
                <p>
                  <Link to="/login">/login</Link>
                </p>
                <p>
                  <Link to="/registration">/registration</Link>
                </p>
              </>
            }
          />
          <Route
            path="/preview/"
            element={<MainLandingPage isLoggedin={false} />}
          />

          <Route path="/edit" element={<MenuEditPage isLoggedin={true} />} />

          <Route
            path="/login"
            element={
              <LoginPage
                isLoggedin={this.state.isLoggedin}
                isPasswordVisibile={this.state.isPasswordVisibile}
                handleClickShowPassword={this.handleClickShowPassword}
              />
            }
          />
          <Route
            path="/registration"
            element={
              <CreateAccountPage
                isLoggedin={this.state.isLoggedin}
                isPasswordVisibile={this.state.isPasswordVisibile}
                handleClickShowPassword={this.handleClickShowPassword}
              />
            }
          />
        </Routes>
      </BrowserRouter>
    );
  }
}

export default App;
