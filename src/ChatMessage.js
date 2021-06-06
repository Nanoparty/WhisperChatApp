import React from 'react'

function ChatMessage(props) {
    const { text, uid, photoURL, displayName } = props.message;
  
    const messageClass = uid === props.auth.currentUser.uid ? "sent" : "received";
  
    return (
      <>
        <div className={`message ${messageClass}`}>
          <img
            src={
              photoURL || "https://image.flaticon.com/icons/png/512/758/758771.png"
            }
          />
          <div className="message-group">
            <p className="displayName">{(displayName || "Annon")}</p>
            <p className="message-body">{text}</p>
          </div>
        </div>
      </>
    );
  }

export default ChatMessage
