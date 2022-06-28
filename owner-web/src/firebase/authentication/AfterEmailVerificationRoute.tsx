import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "./firebaseAuthentication";
import { useAuthState } from "react-firebase-hooks/auth";

export interface IAfterVerificationRouteProps {
  children: any;
}

const AfterVerificationRoute: React.FunctionComponent<
  IAfterVerificationRouteProps
> = (props) => {
  const { children } = props;
  const navigate = useNavigate();
  const [user, loading] = useAuthState(auth);
  const [exitLoading, setExitLoading] = useState(true);

  useEffect(() => {
    setExitLoading(true);
    if (loading) return;
    if (!user) return navigate("/login");
    else if (user.emailVerified) return navigate("/edit");
    else setExitLoading(false);
  }, [user, loading]);

  return <>{!exitLoading && !loading && children}</>;
};

export default AfterVerificationRoute;
