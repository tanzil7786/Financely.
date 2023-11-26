import React, { useEffect } from "react";
import "./style.css";
import userImg from "../../assets/user.svg";
import { auth } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { toast } from "react-toastify";

const Header = () => {
  const navigate = useNavigate();
  const [user, loading] = useAuthState(auth);

  useEffect(() => {
    // Redirect to dashboard if the user is authenticated
    if (user) {
      navigate("/dashboard");
    }
  }, [user, loading, navigate]);

  const logoutfunc = () => {
    try {
      // Sign out the user and navigate to the home page
      signOut(auth).then(() => {
        toast.success("Logged out successfully!");
        navigate("/");
      });
    } catch (error) {
      // Handle any sign-out errors
      toast.error(error.message);
    }
  };

  return (
    <div className="nav">
      <p className="logo">Financely.</p>
      {user && (
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          {/* Display user profile image */}
          <img
            src={user.photoURL ? user.photoURL : userImg}
            style={{ height: "2rem", width: "2rem", borderRadius: "50%" }}
            alt="User Profile"
          />
          {/* Logout link */}
          <p className="logo link" onClick={logoutfunc}>
            Logout
          </p>
        </div>
      )}
    </div>
  );
};

export default Header;
