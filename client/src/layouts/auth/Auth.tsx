import { ReactNode, useEffect } from "react";
import { Navigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { ReactComponent as Background } from "../../images/auth_background.svg";

const Auth = ({
  children,
  className,
}: {
  children: ReactNode;
  className: string;
}) => {
  const { auth } = useAuth();

  useEffect(() => {
    auth && auth.acccessToken && <Navigate to="/" replace />;
    // eslint-disable-next-line
  }, []);

  return (
    <div className="h-[100vh] overflow-hidden">
      <div className="hidden sm:block sm:h-screen">
        <Background />
      </div>
      <div
        className={`${className} bg-main-bg h-screen w-screen flex flex-col px-3 py-6 sm:fixed sm:inset-0 sm:m-auto sm:rounded-md`}
      >
        {children}
      </div>
    </div>
  );
};

export default Auth;
