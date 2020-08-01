import React, { Component } from 'react';

import './input.css';
class Input extends Component {

  render() {
    const { setMessage, sendMessage, message, socket } = this.props
    return (
      <form className="form">
        <input
          className="input"
          type="text"
          placeholder="Type a message..."
          value={message}
          onChange={({ target: { value } }) => setMessage(value)}
          onKeyPress={event => event.key === 'Enter' ? sendMessage(event) : null}
        />
        <input type="file" className="sendButton" id="siofu_input" onChange={e => sendMessage(e)} />
        <button type='submit' className="sendButton" onClick={e => sendMessage(e)}>Send</button>
      </form>
    );
  }
}

export default Input;