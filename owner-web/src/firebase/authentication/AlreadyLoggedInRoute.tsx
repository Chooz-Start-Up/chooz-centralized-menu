import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "./firebaseAuthentication";
import { useAuthState } from "react-firebase-hooks/auth";
import LoadingPage from "../../pages/LoadingPage";
import { getRestaurantKey } from "../databaseAPI/RestaurantApi";

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
    else if (user) {
      getRestaurantKey(user.uid).then(
        () => {
          navigate("/edit");
        },
        () => {
          console.log("Had problem reading key");
        }
      );
    }
  }, [user, loading]);

  return (
    <>
      {loading && <LoadingPage />}
      {!loading && children}
    </>
  );
};

export default AlreadyLoggedInRoute;
