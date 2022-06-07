import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import {
  Routes,
  Route,
  Link,
  BrowserRouter,
  useNavigate,
} from "react-router-dom";
import AuthRoute from "./firebase/authentication/AuthRoute";
import { firebaseConfig } from "./firebase/config/config";
import CreateAccountPage from "./pages/CreateAccountPage";
import LoginPage from "./pages/LoginPage";
import MainLandingPage from "./pages/MainLandingPage";
import MenuEditPage from "./pages/MenuEditPage";

interface AppProps {}

export const app = initializeApp(firebaseConfig);

const App: React.FC<AppProps> = (props: AppProps) => {
  const [isPasswordVisibile, setIsPasswordVisibile] = useState(false);

  const auth = getAuth();
  const [user, loading, error] = useAuthState(auth);

  const handleClickShowPassword = (event: any) => {
    setIsPasswordVisibile(!isPasswordVisibile);
  };

  const requireAuth = (nextState: any, replace: any): any => {
    if (!user) {
      replace({
        pathname: "/edit",
        state: { nextPathname: nextState.location.pathname },
      });
    }
  };

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
        <Route path="/preview/" element={<MainLandingPage />} />

        <Route
          path="/edit"
          element={
            <AuthRoute>
              <MenuEditPage />
            </AuthRoute>
          }
        />

        <Route
          path="/login"
          element={
            <LoginPage
              isPasswordVisibile={isPasswordVisibile}
              handleClickShowPassword={handleClickShowPassword}
            />
          }
        />
        <Route
          path="/registration"
          element={
            <CreateAccountPage
              isPasswordVisibile={isPasswordVisibile}
              handleClickShowPassword={handleClickShowPassword}
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
