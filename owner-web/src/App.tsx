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
import AfterVerificationRoute from "./firebase/authentication/AfterEmailVerificationRoute";
import AuthRoute from "./firebase/authentication/AuthRoute";
import { firebaseConfig } from "./firebase/config/config";
import CreateAccountPage from "./pages/CreateAccountPage";
import FillRestaurantInfoPage from "./pages/FillRestaurantInfoPage";
import InConstructionPage from "./pages/InConstructionPage";
import LoginPage from "./pages/LoginPage";
import MainLandingPage from "./pages/MainLandingPage";
import MenuEditPage from "./pages/MenuEditPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import VerifyEmailPage from "./pages/VerifyEmailPage";

interface AppProps {}

export const app = initializeApp(firebaseConfig);

const App: React.FC<AppProps> = (props: AppProps) => {
  const [isPasswordVisibile, setIsPasswordVisibile] = useState(false);

  const handleClickShowPassword = (event: any) => {
    setIsPasswordVisibile(!isPasswordVisibile);
  };

  return (
    <BrowserRouter>
      <Routes>
        {/* <Route
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
        /> */}
        <Route path="/" element={<InConstructionPage />} />

        <Route path="/preview" element={<MainLandingPage />} />

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
        <Route
          path="/verifyemail"
          element={
            <AfterVerificationRoute>
              <VerifyEmailPage />
            </AfterVerificationRoute>
          }
        />
        <Route
          path="/fillinfo"
          element={
            <AuthRoute>
              <FillRestaurantInfoPage />
            </AuthRoute>
          }
        />
        <Route path="/resetpassword" element={<ResetPasswordPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
