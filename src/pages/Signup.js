import React from "react";
import Header from "../component/Header";
import SignupSignin from "../component/SignupSignin";

// Signup component represents the signup page containing the header and signup/signin form
const Signup = () => {
  return (
    <>
      {/* Header component at the top of the page */}
      <Header />

      {/* Main content wrapper containing the signup/signin form */}
      <div className="wrapper">
        <SignupSignin />
      </div>
    </>
  );
};

export default Signup;
