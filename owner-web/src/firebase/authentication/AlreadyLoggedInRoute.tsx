import React, { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { query, collection, getDocs, where } from "firebase/firestore";
import { auth, db } from "./firebaseAuthentication";
import { useAuthState } from "react-firebase-hooks/auth";

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
    if (loading) return;
    if (user) return navigate("/edit");
  }, [user, loading]);

  return <>{children}</>;
};

export default AlreadyLoggedInRoute;
