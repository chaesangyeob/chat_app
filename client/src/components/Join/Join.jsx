import React, { useState } from 'react';
import { Link } from "react-router-dom";

import './join.css';
import terms from '../../terms'

export default function SignIn() {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const { header,signIn } = terms.join
  return (
    <div className="joinOuterContainer">
      <div className="joinInnerContainer">
        <h1 className="heading">{header}</h1>
        <div>
          <input placeholder="Name" className="joinInput" type="text" onChange={(event) => setName(event.target.value)} />
        </div>
        <div>
          <input placeholder="Room" className="joinInput mt-20" type="text" onChange={(event) => setRoom(event.target.value)} />
        </div>
        <Link onClick={e => (!name || !room) ? e.preventDefault() : null} to={`/chat?name=${name}&room=${room}`}>
          <button className={'button mt-20'} type="submit">{signIn}</button>
        </Link>
      </div>
    </div>
  );
}