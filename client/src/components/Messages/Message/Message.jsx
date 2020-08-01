import React from 'react';

import './message.css';


const Message = ({ message: { text, user }, name }) => {
  let isSentByCurrentUser = false;
  let isText = false
  console.log(text, '---text---');
  if(typeof text == 'string') {
    isText = true
  }

  const trimmedName = name.trim().toLowerCase();

  if(user === trimmedName) {
    isSentByCurrentUser = true;
  }

  return (
    isSentByCurrentUser
      ? (
        <div className="messageContainer justifyEnd">
          <p className="sentText pr-10">{trimmedName}</p>
          <div className="messageBox backgroundBlue">
            {isText ? (<p className="messageText colorWhite">{text}</p>) : (<img width="200" src={text.secure_url} alt="Upload Preview" />)}
          </div> 
        </div>
        )
        : (
          <div className="messageContainer justifyStart">
            <div className="messageBox backgroundLight">
              {isText ? (<p className="messageText colorDark">{text}</p>) : (<img width="200" src={text.secure_url} alt="Upload Preview" />)}
            </div>
            <p className="sentText pl-10 ">{user}</p>
          </div>
        )
  );
}

export default Message;