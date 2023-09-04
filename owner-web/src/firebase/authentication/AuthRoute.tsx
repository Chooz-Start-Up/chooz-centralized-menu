import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "./firebaseAuthentication";
import { useAuthState } from "react-firebase-hooks/auth";

export interface IAuthRouteProps {
  children: any;
}

const AuthRoute: React.FunctionComponent<IAuthRouteProps> = (props) => {
  const { children } = props;
  const navigate = useNavigate();
  const [user, loading] = useAuthState(auth);

  const [exitLoading, setExitLoading] = useState(true);

  useEffect(() => {
    setExitLoading(true);
    if (loading) return;
    if (!user) return navigate("/login");
    else if (
      !user.emailVerified &&
      user.providerData[0].providerId.indexOf("facebook.com") === -1
    )
      return navigate("/verifyemail");
    else setExitLoading(false);
  }, [user, loading]);

  return <>{!loading && !exitLoading && children}</>;
};

export default AuthRoute;
