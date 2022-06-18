import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "./firebaseAuthentication";
import { useAuthState } from "react-firebase-hooks/auth";
import LoadingPage from "../../pages/LoadingPage";

export interface IAfterVerificationRouteProps {
  children: any;
}

const AfterVerificationRoute: React.FunctionComponent<
  IAfterVerificationRouteProps
> = (props) => {
  const { children } = props;
  const navigate = useNavigate();
  const [user, loading] = useAuthState(auth);

  useEffect(() => {
    if (loading) return;
    if (!user) return navigate("/login");
    else if (user.emailVerified) return navigate("/edit");
  }, [user, loading]);

  return (
    <>
      {loading && <LoadingPage />}
      {!loading && children}
    </>
  );
};

export default AfterVerificationRoute;
