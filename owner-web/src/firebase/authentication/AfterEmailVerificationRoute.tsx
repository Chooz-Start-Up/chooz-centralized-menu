import React, { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { query, collection, getDocs, where } from "firebase/firestore";
import { auth, db } from "./firebaseAuthentication";
import { useAuthState } from "react-firebase-hooks/auth";

export interface IAfterVerificationRouteProps {
  children: any;
}

const AfterVerificationRoute: React.FunctionComponent<
  IAfterVerificationRouteProps
> = (props) => {
  const [name, setName] = useState("");
  const { children } = props;
  const navigate = useNavigate();
  const [user, loading, error] = useAuthState(auth);

  useEffect(() => {
    if (loading) return;
    if (!user) return navigate("/login");
    else if (user.emailVerified) return navigate("/edit");
  }, [user, loading]);

  return <>{children}</>;
};

export default AfterVerificationRoute;
