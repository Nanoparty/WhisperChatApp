import React, { useRef, useState } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import "./editProfile.css";

import { CgCloseR } from "react-icons/cg";

function EditProfile(props) {
  const [email, setEmail] = useState("");
  const [newpassword, setNewPassword] = useState("");
  const [curpassword, setCurPassword] = useState("");
  const [username, setUsername] = useState("");
  const [img, setImg] = useState("");

  const [usernameFailure, setUsernameFailure] = useState("");
  const [imageFailure, setImageFailure] = useState("");
  const [passwordFailure, setPasswordFailure] = useState("");
  const [emailFailure, setEmailFailure] = useState("");

  const updateEmail = (e) => {
    e.preventDefault();

    var user = props.firebase.auth().currentUser;
    const credential = props.firebase.auth.EmailAuthProvider.credential(
      user.email,
      curpassword
    );

    user
      .reauthenticateWithCredential(credential)
      .then(function () {
        // Update successful.
        props.auth.currentUser
          .updateEmail(email)
          .then(function () {
            // Update successful.
            console.log("Email update succeed");
            setEmailFailure("Update Successful");
            setEmail("");
            setCurPassword("")
          })
          .catch(function (error) {
            // An error happened.
            console.log("Email update failed");
            setEmailFailure("Update Failed");
            setEmail("");
            setCurPassword("")
          });
      })
      .catch(function (error) {
        // An error happened.
        console.log("Email update failed");
        setEmailFailure("Incorrect Password");
        setEmail("");
        setCurPassword("")
      });
  };

  const updateUsername = (e) => {
    e.preventDefault();

    props.auth.currentUser
      .updateProfile({
        displayName: username,
      })
      .then(function () {
        // Update successful.
        console.log("Default Profile Success");
        setUsernameFailure("Update Successful");
      })
      .catch(function (error) {
        // An error happened.
        console.log("Default Profile Failed");
        setUsernameFailure(error.message);
      });
    // ...
  };

  const updateImg = (e) => {
    e.preventDefault();

    props.auth.currentUser
      .updateProfile({
        photoURL: img,
      })
      .then(function () {
        // Update successful.
        console.log("Image update Success");
        setImageFailure("Update Successful");
        setImg("");
      })
      .catch(function (error) {
        // An error happened.
        console.log("Image update Failed");
        setImageFailure(error.message);
      });
    // ...
  };

  const updatePassword = (e) => {
    e.preventDefault();

    var user = props.firebase.auth().currentUser;
    const credential = props.firebase.auth.EmailAuthProvider.credential(
      user.email,
      curpassword
    );

    user
      .reauthenticateWithCredential(credential)
      .then(function () {
        // Update successful.
        props.auth.currentUser
          .updatePassword(newpassword)
          .then(function () {
            // Update successful.
            console.log("Password update succeed");
            setPasswordFailure("Update Successful");
            setNewPassword("");
            setCurPassword("")
          })
          .catch(function (error) {
            // An error happened.
            console.log("Password update failed");
            setPasswordFailure("Update Failed");
            setNewPassword("");
            setCurPassword("")
          });
      })
      .catch(function (error) {
        // An error happened.
        console.log("Password update failed");
        setPasswordFailure("Incorrect Password");
        setNewPassword("");
        setCurPassword("")
      });
  };

  //   const changeThePassword = (e) => {
  //     e.preventDefault();

  //     props.auth.userCredential.user

  //     props.firebase
  //       .auth().currentUser.reauthenticateWithCredential
  //       .createUserWithEmailAndPassword(email, password)
  //       .then((userCredential) => {
  //         // Signed in
  //         var user = userCredential.user;

  //         user
  //           .updateProfile({
  //             displayName: username || "Fortnight Default Skin",
  //             // photoURL:
  //             //   "https://lh3.googleusercontent.com/a-/AOh14Gg3glDzENly1ugFObdJbabZnmrRbee51x0PBQzgaA=s96-c",
  //           })
  //           .then(function () {
  //             // Update successful.
  //             console.log("Default Profile Success");
  //           })
  //           .catch(function (error) {
  //             // An error happened.
  //             console.log("Default Profile Failed");
  //           });
  //         // ...
  //       })
  //       .catch((error) => {
  //         var errorCode = error.code;
  //         var errorMessage = error.message;
  //         setFailure(errorMessage);
  //         // ..
  //       });
  //   };

  return (
    <div className="chat-bg">
      <div className="chat-waves">
        {/* <ul className="bg-bubbles">
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
        </ul> */}

        <div className="chat-app">
          <header className="chat-header">
            <h1>Edit Profile</h1>
            <div>
              <CloseEdit closeEdit={props.closeEdit} />
            </div>
          </header>

          <section className="chat-section">
            <main>
              <div className="edit-profile-container">
                <form className="login-form">
                  <h1>Change Username</h1>
                  <input
                    type="text"
                    value={username}
                    placeholder="New Username"
                    onChange={(event) => setUsername(event.target.value)}
                  />
                  <button
                    //type="submit"
                    id="login-button"
                    onClick={updateUsername}
                  >
                    Confirm
                  </button>
                  <h2>{usernameFailure}</h2>
                </form>

                <form className="login-form">
                  <h1>Change Profile Picture</h1>
                  <input
                    type="text"
                    placeholder="Image URL"
                    onChange={(event) => setImg(event.target.value)}
                  />
                  <button
                    //type="submit"
                    id="login-button"
                    onClick={updateImg}
                  >
                    Confirm
                  </button>
                  <h2>{imageFailure}</h2>
                </form>

                <form className="login-form">
                  <h1>Change Email</h1>
                  <input
                    type="text"
                    placeholder="New Email"
                    onChange={(event) => setEmail(event.target.value)}
                  />
                  <input
                    type="text"
                    placeholder="Current Password"
                    onChange={(event) => setCurPassword(event.target.value)}
                  />
                  <button
                    //type="submit"
                    id="login-button"
                    onClick={updateEmail}
                  >
                    Confirm
                  </button>
                  <h2>{emailFailure}</h2>
                </form>

                <form className="login-form">
                  <h1>Change Password</h1>
                  <input
                    type="text"
                    placeholder="Current Pasword"
                    onChange={(event) => setCurPassword(event.target.value)}
                  />
                  <input
                    type="text"
                    placeholder="New Pasword"
                    onChange={(event) => setNewPassword(event.target.value)}
                  />
                  <button
                    //type="submit"
                    id="login-button"
                    onClick={updatePassword}
                  >
                    Confirm
                  </button>
                  <h2>{passwordFailure}</h2>
                </form>
              </div>
            </main>
          </section>
        </div>
      </div>
    </div>
  );
}

function CloseEdit(props) {
  return (
    <CgCloseR onClick={() => props.closeEdit()} className="edit-profile" />
  );
}

export default EditProfile;
