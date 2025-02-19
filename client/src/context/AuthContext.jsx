import { useState, useEffect, createContext } from "react";
export const AuthContext = createContext();
import app from "../config/firebase";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  GithubAuthProvider,
  FacebookAuthProvider,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
import { Cookies } from "react-cookie";
import UserService from "../services/user.service"; // Assuming you have this service

const cookies = new Cookies();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLogin, setIsLogin] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // Added isLoading state

  const auth = getAuth(app); // Firebase Auth instance

  const getUser = () => {
    const token = cookies.get("token") || null;
    // Optionally decode the token to get user info
    const userInfo = {
      email: "",
      role: "",
    };
    return userInfo;
  };

  const createUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logout = () => {
    return signOut(auth);
  };

  const signUpWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider);
  };

  const signUpWithGithub = () => {
    const provider = new GithubAuthProvider();
    return signInWithPopup(auth, provider);
  };

  const signUpWithFacebook = () => {
    const provider = new FacebookAuthProvider();
    return signInWithPopup(auth, provider);
  };

  const updateUser = (name, profile) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: profile,
    });
  };

  // Handle user state and set JWT token
  const handleAuthStateChanged = async (currentUser) => {
    setUser(currentUser);
    if (currentUser) {
      setIsLogin(true);
      const { email } = currentUser;
      try {
        const data = await UserService.signJwt(email); // Assuming this returns the token
        if (data.token) {
          cookies.set("token", data.token, { path: "/" });
        }
      } catch (error) {
        console.log("Error getting JWT:", error);
      }
    } else {
      setIsLogin(false);
      cookies.remove("token");
    }
    setIsLoading(false); // Set loading to false once state is updated
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      setIsLoading(false); // Set loading to false
      if (currentUser) {
        const { email } = currentUser;
        try {
          const { data } = await UserService.signJwt(email); // Correct the data extraction
          if (data && data.token) {
            cookies.set("user", data, { path: "/" }); // Store user data properly
          }
        } catch (error) {
          console.log("Error fetching JWT token:", error);
        }
      } else {
        cookies.remove("user"); // Remove user if not logged in
      }
    });

    return () => unsubscribe(); // Cleanup subscription on unmount
  }, [auth]);

  const authInfo = {
    user,
    createUser,
    login,
    logout,
    signUpWithGoogle,
    signUpWithGithub,
    signUpWithFacebook,
    updateUser,
    isLogin,
    isLoading, // Expose loading state
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
