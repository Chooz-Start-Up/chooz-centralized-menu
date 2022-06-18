import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "./firebaseAuthentication";
import { useAuthState } from "react-firebase-hooks/auth";
import LoadingPage from "../../pages/LoadingPage";

export interface IAuthRouteProps {
  children: any;
}

const AuthRoute: React.FunctionComponent<IAuthRouteProps> = (props) => {
  const { children } = props;
  const navigate = useNavigate();
  const [user, loading] = useAuthState(auth);

  useEffect(() => {
    if (loading) return;
    if (!user) return navigate("/login");
    else if (
      !user.emailVerified &&
      user.providerData[0].providerId.indexOf("facebook.com") === -1
    )
      return navigate("/verifyemail");
  }, [user, loading]);

  return (
    <>
      {loading && <LoadingPage />}
      {!loading && children}
    </>
  );
};

export default AuthRoute;
