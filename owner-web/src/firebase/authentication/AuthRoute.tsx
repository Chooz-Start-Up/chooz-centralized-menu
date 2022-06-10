import React, { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { query, collection, getDocs, where } from "firebase/firestore";
import { auth, db } from "./firebaseAuthentication";
import { useAuthState } from "react-firebase-hooks/auth";

export interface IAuthRouteProps {
  children: any;
}

const AuthRoute: React.FunctionComponent<IAuthRouteProps> = (props) => {
  const [name, setName] = useState("");
  const { children } = props;
  const navigate = useNavigate();
  const [user, loading, error] = useAuthState(auth);

  // useEffect(() => {
  //   const AuthCheck = onAuthStateChanged(auth, (user) => {
  //     if (user) {
  //       setLoading(false);
  //     } else {
  //       console.log("unauthorized");
  //       navigate("/login");
  //     }
  //   });

  //   return () => AuthCheck();
  // }, [auth]);

  // const fetchUserName = async () => {
  //   try {
  //     const q = query(collection(db, "users"), where("uid", "==", user?.uid));
  //     const doc = await getDocs(q);
  //     const data = doc.docs[0].data();
  //     setName(data.name);
  //   } catch (err) {
  //     console.error(err);
  //     alert("An error occured while fetching user data");
  //   }
  // };

  useEffect(() => {
    if (loading) return;
    if (!user) return navigate("/login");
    else if (
      !user.emailVerified &&
      user.providerData[0].providerId.indexOf("facebook.com") === -1
    )
      return navigate("/verifyemail");
    // fetchUserName();
  }, [user, loading]);

  return <>{children}</>;
};

export default AuthRoute;
