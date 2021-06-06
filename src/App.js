import React, { useRef, useState } from "react";
import './App.css';
import { config } from "./firebase.config";
import Login from "./LoginScreen";
import ChatRoom from "./ChatRoom";

import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/analytics";

import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";

firebase.initializeApp(config);

const auth = firebase.auth();
const firestore = firebase.firestore();
const analytics = firebase.analytics();

function App() {
  const [user] = useAuthState(auth);

  return (
    <div>
      {user ? (
        <ChatRoom firebase={firebase} auth={auth} user={user} />
      ) : (
        <Login firebase={firebase} auth={auth} />
      )}
    </div>
  );
}

function SignOut() {
  return (
    auth.currentUser && (
      <button className="sign-out" onClick={() => auth.signOut()}>
        Sign Out
      </button>
    )
  );
}

export default App;
