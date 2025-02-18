import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate } from "react-router";

const UserLoginRedirect = ({ children }) => {
  const { user, isLogin } = useContext(AuthContext);
  console.log(user);

  if (isLogin === false) {
    return (
      <div className="flex justify-center items-center content-center">
        <h3>Loading......</h3>
      </div>
    );
  }

  if (user) {
    return children;
  }
  return <Navigate to="/" />;
};

export default UserLoginRedirect;
