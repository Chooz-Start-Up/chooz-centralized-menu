import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "./firebaseAuthentication";
import { useAuthState } from "react-firebase-hooks/auth";
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

  const [exitLoading, setExitLoading] = useState(true);

  useEffect(() => {
    setExitLoading(true);
    if (loading) return;
    else if (user) {
      getRestaurantKey(user.uid).then(() => {
        navigate("/edit");
      });
    } else {
      setExitLoading(false);
    }
  }, [user, loading]);

  return <>{!exitLoading && !loading && children}</>;
};

export default AlreadyLoggedInRoute;
