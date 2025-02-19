import React from "react";
import { FaFacebook, FaGoogle } from "react-icons/fa6";
import { FaGithub } from "react-icons/fa";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import Swal from "sweetalert2";
import { useNavigate, useLocation } from "react-router";
import UserService from "../services/user.service"; // Import the UserService

const SocailLogin = () => {
  const { signUpWithGoogle, signUpWithGithub, signUpWithFacebook } =
    useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location?.state?.from?.pathname || "/";

  const GoogleSignUp = async () => {
    try {
      const result = await signUpWithGoogle();
      const user = result.user;
      console.log(user);

      // Add user to your database (optional)
      await UserService.addUser(user.email);

      Swal.fire({
        icon: "success",
        title: "Google SignUp Successfully",
        showConfirmButton: false,
        timer: 1500,
      });

      document.getElementById("login").close();
      navigate(from, { replace: true });
    } catch (error) {
      console.log(error);
    }
  };

  const FacebookSignUp = async () => {
    try {
      const result = await signUpWithFacebook();
      const user = result.user;
      console.log(user);

      // Add user to your database (optional)
      await UserService.addUser(user.email);

      Swal.fire({
        icon: "success",
        title: "Facebook SignUp Successfully",
        showConfirmButton: false,
        timer: 1500,
      });

      document.getElementById("login").close();
      navigate(from, { replace: true });
    } catch (error) {
      console.log(error);
    }
  };

  const GithubSignUp = async () => {
    try {
      const result = await signUpWithGithub();
      const user = result.user;
      console.log(user);

      // Add user to your database (optional)
      await UserService.addUser(user.email);

      Swal.fire({
        icon: "success",
        title: "Github SignUp Successfully",
        showConfirmButton: false,
        timer: 1500,
      });

      document.getElementById("login").close();
      navigate(from, { replace: true });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="text-center space-x-3 mb-5">
      <button className="btn btn-ghost btn-circle hover:bg-red hover:text-white">
        <FaGoogle className="w-6 h-6" onClick={GoogleSignUp} />
      </button>
      <button className="btn btn-ghost btn-circle hover:bg-red hover:text-white">
        <FaGithub className="w-6 h-6" onClick={GithubSignUp} />
      </button>
      <button className="btn btn-ghost btn-circle hover:bg-red hover:text-white">
        <FaFacebook className="w-6 h-6" onClick={FacebookSignUp} />
      </button>
    </div>
  );
};

export default SocailLogin;
