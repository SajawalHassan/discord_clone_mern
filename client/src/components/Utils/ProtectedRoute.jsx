import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import { loginFail, loginSuccess } from "../../features/loginSlice";

const ProtectedRoute = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage.getItem("accessToken")) {
      dispatch(loginSuccess());
    } else {
      dispatch(loginFail(""));
      navigate("/login");
    }
  }, [navigate, dispatch]);

  return <Outlet />;
};

export default ProtectedRoute;
