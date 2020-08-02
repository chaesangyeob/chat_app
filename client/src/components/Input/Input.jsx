import React, { Component } from 'react';

import './input.css';
import terms from '../../terms'

class Input extends Component {
  render() {
    const { title } = terms.uploadImg
    const { setMessage, sendMessage, message } = this.props
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
        <label className='fileUpload' htmlFor="siofu_input">{title}</label>
        <input type="file" className="file" id="siofu_input" onChange={e => sendMessage(e)} />
        <button type='submit' className="sendButton" onClick={e => sendMessage(e)}>Send</button>
      </form>
    );
  }
}

export default Input;