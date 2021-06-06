import React, { useState } from "react";
//import './login.css'
import SignUp from "./signup";

function LoginScreen(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [failure, setFailure] = useState(null);
  const [signingUp, setSigningUp] = useState(false);

  const cancelSignup = () => {
    setSigningUp(false);
  }

  const signIn = (e) => {
    e.preventDefault();

    props.firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Signed in
        var user = userCredential.user;
        // ...
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        setFailure("Email or password is invalid.");
      });
  };

  return (
    <div>
      {signingUp ? (
        <SignUp firebase={props.firebase} auth={props.auth} cancelSignup={cancelSignup} />
      ) : (
        <div className="login-wrapper">
          <div className="login-waves">
            <form className="login-form">
              <h1 className="login-title">Whisper</h1>
              <input
                type="text"
                placeholder="Email"
                onChange={(event) => setEmail(event.target.value)}
              />
              <input
                type="password"
                placeholder="Password"
                onChange={(event) => setPassword(event.target.value)}
              />
              <button
                //type="submit"
                id="login-button"
                onClick={signIn}
              >
                Login
              </button>
              <button
                //type="submit"
                id="signup-button"
                onClick={() => setSigningUp(true)}
              >
                Signup
              </button>
              <h2>{failure}</h2>
            </form>

            <ul className="bg-bubbles">
              <li className="square1"></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export default LoginScreen;
