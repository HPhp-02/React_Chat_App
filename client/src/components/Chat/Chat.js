import React , { useState ,useEffect } from 'react';
import queryString from 'query-string';
import { useLocation } from 'react-router-dom';
import io from 'socket.io-client';

import './Chat.css';
import Input from '../Input/Input';
import Infobar from '../InfoBar/InfoBar';
import Messages from '../Messages/Messages';

let socket;
// import io from 'socket.io-client';

const Chat=()=>{
    const location =useLocation();
    const [ name ,setName]=useState('');
    const [ room ,setRoom]=useState('');
    const [message,setMessage]=useState('');

    const [messages,setMessages]=useState([]);
    const ENDPOINT='http://localhost:5000';
    useEffect(()=>{
        const {name,room} = queryString.parse(location.search);
        socket=io(ENDPOINT);
        setName(name);
        setRoom(room);
        socket.emit('join',{name,room},(error)=>{
         if(error){
            alert(error);
         }
        });

        return ()=>{
         socket.emit('disconnect');
         socket.off();

        }
    },[ENDPOINT,location.search]);
     
    useEffect(()=>{
        socket.on('message',(message)=>{
            setMessages([...messages,message]);
        })
    },[messages]);

    const sendMessage =(event)=>{
        event.preventDefault();
        if(message){
            socket.emit('sendMessage',message,()=> setMessage(''));
        }
    }
    console.log(message,messages);
    return(
        <div className="outerContainer">
            <div className="container">
             <Infobar room={room} />
             <Messages messages={messages} name={name}/>
             <Input message={message} setMessage={setMessage} sendMessage={sendMessage}/>   
            
            </div>
        </div>
    );
}
export default Chat;