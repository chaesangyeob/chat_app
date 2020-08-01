import React, { useState, useEffect } from 'react';
import queryString from 'query-string'
import io from 'socket.io-client'



import './chat.css'
import InfoBar from '../InfoBar/InfoBar'
import Messages from '../Messages/Messages'
import Input from '../Input/Input'


let socket ='default'
const Chat = ({location}) => {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState([])

  const END_POINT = 'localhost:5000'
  //componentdidmount와 같다
  useEffect(()=>{
    const {name, room} = queryString.parse(location.search)
    socket = io(END_POINT)
    setName(name)
    setRoom(room)

    //server에 join을 통해서 데이터를 보냄
    socket.emit('join', {name, room}, (res)=>{
    })
    //useEffect()애서 return 은 unmount와 같다. 즉 user leave일 때 사용!
    return () =>{
      socket.emit('disconnect')
      socket.off()
    }
  },[END_POINT, location.search])

  useEffect(() => {
  
    socket.on('message', (message) =>{
      console.log(message,'wwwwwwwwwwwwwwwwwwwwwwwwwww')
      setMessages([...messages, message])
    })
  }, [messages])

  const uploadFile = async e => {
    const files = e.target.files;
    console.log(files, '---fiels---');
    const data = new FormData;
    data.append('file', files[0]);
    data.append('upload_preset', 'sickfit');

    const res = await fetch('https://api.cloudinary.com/v1_1/dgoigks5z/image/upload', {
      method: 'POST',
      body: data,
    });
    const file = await res.json();
    socket.emit('sendMessage', file, ()=>console.log('aaaaaaaa'))
  };

  const sendMessage = (event) => {
    event.preventDefault();
    if(event.target.files) {
      uploadFile(event)
    }
    if(message) {
      socket.emit('sendMessage', message, () => setMessage(''));
    }
  }
  
  return (
    <div className="outerContainer">
      <div className="container">
        <InfoBar room={room} />
        <Messages messages={messages} name={name} />
        <Input socket={socket} message={message} setMessage={setMessage} sendMessage={sendMessage} />
      </div>
    </div>
  );
};

export default Chat;