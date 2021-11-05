import React from "react";
import { Redirect, Route } from "react-router-dom";
import jwt from "jsonwebtoken";

function ProtectedRoute(props) {
  const token = localStorage.getItem("token");

  if (token != null) {
    const decode = jwt.verify(token, "secretkey");

    if (decode.email != null && decode.iat != null) {
      return (
        <div>
          <Route path={props.path} component={props.component} />
        </div>
      );
    } else {
      localStorage.removeItem("token");
      localStorage.removeItem("filterOption");
      return <Redirect to={"/login"} />;
    }
  } else {
    localStorage.removeItem("token");
    localStorage.removeItem("filterOption");
    return <Redirect to={"/login"} />;
  }
}
export default ProtectedRoute;
