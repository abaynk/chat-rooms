import { Avatar, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, Switch } from '@material-ui/core';
import { AirlineSeatFlatAngled, AttachFile, DeleteOutlined, InsertEmoticon, Mic, MoreVert, SearchOutlined } from '@material-ui/icons';
import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import './Chat.css';
import db, { firebaseApp } from './firebase';
import firebase from 'firebase';
import { useStateValue } from './StateProvider';

function Chat() {
    const [seed, setSeed] = useState('');
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState([]);
    const { roomId } = useParams();
    const [roomName, setRoomName] = useState('');
    const [{user}, dispatch] = useStateValue();
    const [imageUrl, setImageUrl] = useState('');
    const [open, setOpen] = useState(false);
    const uniqNames = [...new Set(messages.map(message=>message.name))];

    useEffect(() => {
        if (roomId) {
            db.collection('rooms').doc(roomId).onSnapshot((snapshot) => (
                setRoomName(snapshot.data().name)
            ));

            db.collection('rooms').doc(roomId)
                .collection('messages').orderBy('timestamp', 'asc')
                .onSnapshot(snapshot => 
                    setMessages(snapshot.docs.map(doc => doc.data()))
                );
        }
    }, [roomId]);

    useEffect(() => {
        setSeed(Math.floor(Math.random()*5000));
    }, [roomId]);

    const sendMessage = (e) => {
        e.preventDefault();
        console.log('salam');
        db.collection('rooms').doc(roomId).collection('messages').add({
            message: input,
            name: user.displayName,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            image: imageUrl,
        });
        setInput('');
        setImageUrl('');
    };

    const handleClickOpen = () => {
        setOpen(true);
      };
    
      const handleClose = () => {
        setOpen(false);
      };

    return (
        
        <div className='Chat'>
            <div className='Chat__header'>
                <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
                <div className='Chat__headerInfo'>
                    <h3>{roomName}</h3>
                    <p>{new Date(messages[messages.length-1]?.timestamp?.toDate()).toString().slice(0,25) !== 'Invalid Date' ? `Last message on: ${new Date(messages[messages.length-1]?.timestamp?.toDate()).toString().slice(0,25)}` : 'No messages yet'}</p>
                </div>
                <div className='Chat__headerRight'>
                    <IconButton>
                        <SearchOutlined />
                    </IconButton>
                    <IconButton>
                        <label for='file__upload' className='Chat__headerRightUpload'>
                            <AttachFile type='file' />
                        </label> 
                        <input id='file__upload' value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} type='file'></input>
                    </IconButton>
                    <IconButton>
                        <MoreVert onClick={handleClickOpen}/>
                        <Dialog
                            open={open}
                            onClose={handleClose}
                        >
                            <DialogTitle>List of Room members:</DialogTitle>
                            <DialogContent>
                                <ol>
                                {uniqNames.map(name => (
                                    <li>{name ? name : 'anonym'}</li>
                                ))}
                                </ol>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={handleClose} color="primary" autoFocus>
                                    Close
                                </Button>
                            </DialogActions>
                        </Dialog>
                    </IconButton>
                </div>
            </div>
            <div className='Chat__body'>
                {messages.map((message) => (
                <div>
                <p className={`Chat__message ${message.name === user.displayName && "Chat__reciever"}`}>
                    <span className='Chat__name'>{message.name ? message.name : 'anonym'}</span>
                    {message.message}
                    <span className='Chat__timestamp'>
                        {String(new Date()).slice(0,16) === (new Date(message.timestamp?.toDate()).toString().slice(0,16)) 
                            ? new Date(message.timestamp?.toDate()).toString().slice(16,21)
                        : new Date(message.timestamp?.toDate()).toString().slice(4,21)}
                    </span>
                </p>
                </div>
                ))}
            </div>
            <div className='Chat__footer'>
                <IconButton>
                    <InsertEmoticon />
                </IconButton>
                <form onSubmit={sendMessage}>
                    <input value={input} onChange={e => setInput(e.target.value)} placeholder={`Type a message`} type='tex' />
                    <button type='submit'></button>
                </form>
                <IconButton>
                    <Mic />
                </IconButton>
            </div>
        </div>
    )
}

export default Chat;
