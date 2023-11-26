import React, { useState } from "react";
import "./style.css";
import Input from "../Input";
import Button from "../Button";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { auth, db, provider } from "../../firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Spin } from "antd";

const SignupSignin = () => {
  // State variables for user input and loading state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [loading, setLoading] = useState(false);

  // State variable for toggling between signup and login forms
  const [loginForm, setLoginForm] = useState(false);

  // Navigation hook for redirecting after successful actions
  const navigate = useNavigate();

  // Function to sign up with email and password
  const signUpWithEmail = () => {
    setLoading(true);

    // Validation and authentication logic
    if (name !== "" && email !== "" && confirmPass !== "") {
      if (password === confirmPass) {
        createUserWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            // User signed up successfully
            const user = userCredential.user;
            toast.success("User Created!");
            createDoc(user);
            setLoading(false);
            setName("");
            setEmail("");
            setPassword("");
            setConfirmPass("");
            navigate("/dashboard");
          })
          .catch((error) => {
            // Handle signup errors
            const errorMessage = error.message;
            toast.error(errorMessage);
            setLoading(false);
          });
      } else {
        toast.error("The password and confirmation password do not match.");
        setLoading(false);
      }
    } else {
      toast.error("All fields are mandatory!");
      setLoading(false);
    }
  };

  // Function to login using email and password
  const loginUsingEmail = () => {
    setLoading(true);
    if (email !== "" && password !== "") {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in successfully
          const user = userCredential.user;
          toast.success("Successfully Logged In");
          setLoading(false);
          navigate("/dashboard");
        })
        .catch((error) => {
          // Handle login errors
          const errorMessage = error.message;
          setLoading(false);
          toast.error(errorMessage);
        });
    } else {
      toast.error("All fields are mandatory!");
      setLoading(false);
    }
  };

  // Function to create user document in Firestore
  const createDoc = async (user) => {
    setLoading(true);
    if (!user || !user.uid) {
      console.error("User or user.id is undefined");
      return;
    }

    const useRef = doc(db, "users", user.uid);
    const userData = await getDoc(useRef);

    if (!userData.exists()) {
      try {
        await setDoc(doc(db, "users", user.uid), {
          name: user.displayName ? user.displayName : name,
          email: user.email,
          photoURL: user.photoURL ? user.photoURL : "",
          createdAt: new Date(),
        });

        toast.success("Doc created");
        setLoading(false);
      } catch (e) {
        toast.error(e.message);
      }
    } else {
      // Document already created
      setLoading(false);
    }
  };

  // Function to authenticate using Google
  const googleAuth = () => {
    setLoading(true);
    try {
      signInWithPopup(auth, provider)
        .then((result) => {
          // Google authentication successful
          const credential = GoogleAuthProvider.credentialFromResult(result);
          const token = credential.accessToken;
          const user = result.user;
          console.log("user>>>", user);
          toast.success("User Authenticated");
          createDoc(user);
          setLoading(false);
          navigate("/dashboard");
        })
        .catch((error) => {
          // Handle Google authentication errors
          setLoading(false);
          const errorMessage = error.message;
          toast.error(errorMessage);
        });
    } catch (e) {
      setLoading(false);
      toast.error(e.message);
    }
  };

  return (
    <>
      {loginForm ? (
        <>
          <Spin
            spinning={loading}
            className="spinner"
            tip="loading"
            size="large"
          >
            {" "}
          </Spin>
          <div className="signup-wrapper">
            <h2 className="title">
              Login on <span style={{ color: "var(--theme)" }}>Financely.</span>
            </h2>
            <form>
              <Input
                label={"Email"}
                state={email}
                setState={setEmail}
                placeholder={"johndoe@gmail.com"}
              />
              <Input
                type="password"
                label={"Password"}
                state={password}
                setState={setPassword}
                placeholder={"Enter your password"}
              />
              <Button
                disabled={loading}
                text={loading ? "loading..." : "Login Using Email and Password"}
                onClick={loginUsingEmail}
              />
              <p className="p-style">or</p>
              <Button
                disabled={loading}
                text={loading ? "Loading..." : "Login Using Google"}
                blue={true}
                onClick={googleAuth}
              />
              <p className="p-style" onClick={() => setLoginForm(false)}>
                Or Don't Have an Account? Click Here.
              </p>
            </form>
          </div>
        </>
      ) : (
        <>
          <div className="signup-wrapper">
            <h2 className="title">
              Sign Up on{" "}
              <span style={{ color: "var(--theme)" }}>Financely.</span>
            </h2>
            <form>
              <Input
                label={"Full name"}
                state={name}
                setState={setName}
                placeholder={"John Doe"}
              />
              <Input
                label={"Email"}
                state={email}
                setState={setEmail}
                placeholder={"johndoe@gmail.com"}
              />
              <Input
                type="password"
                label={"Password"}
                state={password}
                setState={setPassword}
                placeholder={"Enter your password"}
              />
              <Input
                type="password"
                label={"Confirm Password"}
                state={confirmPass}
                setState={setConfirmPass}
                placeholder={"Confirm the password"}
              />
              <Button
                disabled={loading}
                text={
                  loading ? "loading..." : "Signup Using Email and Password"
                }
                onClick={signUpWithEmail}
              />
              <p className="p-style">or</p>
              <Button
                disabled={loading}
                text={loading ? "Loading..." : "Signup Using Google"}
                blue={true}
                onClick={googleAuth}
              />
              <p onClick={() => setLoginForm(true)} className="p-style">
                Or Have An Account Already? Click Here.
              </p>
            </form>
          </div>
        </>
      )}
    </>
  );
};

export default SignupSignin;
