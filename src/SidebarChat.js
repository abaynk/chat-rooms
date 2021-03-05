import { Avatar } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import db from './firebase';
import './SidebarChat.css';

function SidebarChat({ id, name, addNewChat }) {
    const [seed, setSeed] = useState('');
    const [messages, setMessages] = useState('');
    
    useEffect(() => {
        if (id) {
            db.collection('rooms').doc(id).collection('messages').orderBy('timestamp','desc')
                .onSnapshot(snapshot => 
                    setMessages(snapshot.docs.map((doc) => 
                    doc.data()))
                );
        }
    }, [id]);

    useEffect(() => {
        setSeed(Math.floor(Math.random()*5000));
    }, []);

    const createChat = () => {
        const roomName = prompt('Please enter name for Chat Room:');

        if (roomName) {
            //do some clever database stuff
            db.collection('rooms').add({
                name: roomName,
            })
        }
    };

    return !addNewChat ? (
        <Link to={`/rooms/${id}`}>
        <div className='SidebarChat'>
            <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
            <div className='SidebarChat__info'>
                <h2>{name}</h2>
                <p>{messages[0] ? `${messages[0]?.name ? messages[0]?.name : 'anonym'}: ${messages[0]?.message.slice(0,15)}...` : 'no messages yet'}</p>
            </div>
        </div>
        </Link>
    ) : (
        <div onClick={createChat} className='SidebarChat SidebarChat__add'>
            <h2>Add new chat room</h2>
        </div>
    )
}

export default SidebarChat;
