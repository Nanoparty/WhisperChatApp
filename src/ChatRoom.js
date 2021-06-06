import React, { useRef, useState } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
//import './chatRoom.css'

import { BiLogOut } from "react-icons/bi";
import { RiUserSettingsLine } from "react-icons/ri";

import ChatMessage from "./ChatMessage";
import PopUp from "./PopUp";
import EditProfile from "./EditProfile";

function ChatRoom(props) {
  const dummy = useRef();
  const messagesRef = props.firebase.firestore().collection("messages");
  const query = messagesRef.orderBy("createdAt").limit(25);

  const [messages] = useCollectionData(query, { idField: "id" });

  const [formValue, setFormValue] = useState("");

  const [editing, setEditing] = useState(false);

  const componentDidMount = () => {
    dummy.current.scrollIntoView({ behavior: "smooth" });
  }

  const closeEdit = () => {
    setEditing(false);
  };

  const sendMessage = async (e) => {
    e.preventDefault();

    const { uid, photoURL, displayName } = props.auth.currentUser;

    await messagesRef.add({
      text: formValue,
      createdAt: props.firebase.firestore.FieldValue.serverTimestamp(),
      uid,
      photoURL,
      displayName,
    });

    setFormValue("");
    dummy.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div>
      {editing ? (
        <EditProfile closeEdit={closeEdit} auth={props.auth} firebase={props.firebase} />
      ) : (
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
                <h1>Chat Room</h1>
                <div>
                  <EditUsername setEditing={setEditing} />
                  <SignOut auth={props.auth} />
                </div>
              </header>

              <section className="chat-section">
                <main>
                  {messages &&
                    messages.map((msg) => (
                      <ChatMessage
                        key={msg.id}
                        message={msg}
                        auth={props.auth}
                      />
                    ))}

                  <span ref={dummy}></span>
                </main>

                <form className="chat-form" onSubmit={sendMessage}>
                  <input
                    value={formValue}
                    onChange={(e) => setFormValue(e.target.value)}
                    placeholder="say something toxic"
                  />

                  <button type="submit" disabled={!formValue}>
                    Send
                  </button>
                </form>
              </section>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function SignOut(props) {
  return (
    props.auth.currentUser && (
      <BiLogOut onClick={() => props.auth.signOut()} className="sign-out" />
      //   <button className="sign-out" onClick={() => props.auth.signOut()}>
      //     Sign Out
      //   </button>
    )
  );
}

function EditUsername(props) {
  return (
    <RiUserSettingsLine
      onClick={() => props.setEditing(true)}
      className="edit-profile"
    />
  );
}

export default ChatRoom;
