import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "./firebaseAuthentication";
import { useAuthState } from "react-firebase-hooks/auth";
import LoadingPage from "../../pages/LoadingPage";

export interface IAlreadyLoggedInRouteProps {
  children: any;
}

const AlreadyLoggedInRoute: React.FunctionComponent<
  IAlreadyLoggedInRouteProps
> = (props) => {
  const { children } = props;
  const navigate = useNavigate();
  const [user, loading] = useAuthState(auth);

  useEffect(() => {
    if (user) return navigate("/edit");
  }, [user, loading]);

  return (
    <>
      {loading && <LoadingPage />}
      {!loading && children}
    </>
  );
};

export default AlreadyLoggedInRoute;
