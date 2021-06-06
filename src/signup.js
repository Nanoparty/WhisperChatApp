import React, { useState } from "react";
//import './login.css'

function LoginScreen(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [failure, setFailure] = useState(null);
  const [username, setUsername] = useState("");

  const signUp = (e) => {
    e.preventDefault();

    props.firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Signed in
        var user = userCredential.user;

        user
          .updateProfile({
            displayName: username || "Fortnight Default Skin",
            // photoURL:
            //   "https://lh3.googleusercontent.com/a-/AOh14Gg3glDzENly1ugFObdJbabZnmrRbee51x0PBQzgaA=s96-c",
          })
          .then(function () {
            // Update successful.
            console.log("Default Profile Success");
          })
          .catch(function (error) {
            // An error happened.
            console.log("Default Profile Failed");
          });
        // ...
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        setFailure(errorMessage);
        // ..
      });
  };

  return (
    <div className="login-wrapper">
      <div className="login-waves">
        <form className="login-form">
          <h1 className="login-title">Create Account</h1>
          <input
            type="text"
            placeholder="Email"
            onChange={(event) => setEmail(event.target.value)}
          />
          <input
            type="text"
            placeholder="Username"
            onChange={(event) => setUsername(event.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            onChange={(event) => setPassword(event.target.value)}
          />
          <button
            //type="submit"
            id="login-button"
            onClick={signUp}
          >
            Confirm
          </button>
          <button
            //type="submit"
            id="signup-button"
            onClick={props.cancelSignup}
          >
            Cancel
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
  );
}

export default LoginScreen;
