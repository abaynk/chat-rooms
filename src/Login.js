import { Button } from '@material-ui/core';
import React from 'react';
import { auth, provider } from './firebase';
import './Login.css';
import { actionTypes } from './reducer';
import { useStateValue } from './StateProvider';

function Login() {
    const [, dispatch] = useStateValue();

    const signIn = () => {
        auth.signInWithPopup(provider)
            .then((result) => {
                console.log(result);
                dispatch({
                    type: actionTypes.SET_USER,
                    user: result.user,
                })
            })
            .catch(err => alert(err.message));
    }

    const signInAnonym = () => {
        auth.signInAnonymously()
            .then(() => {
                alert('You have signed in Anonymously');
                auth.onAuthStateChanged(user => {
                    console.log(user);
                    dispatch({
                        type: actionTypes.SET_USER,
                        user: user
                    })
                });
                // dispatch({
                //     type: actionTypes.SET_USER,
                //     user: user
                // })
            })
            .catch(err => alert(err.message));
    }

    return (
        <div className='Login'>
            <div className='Login__container'>
                <div className='Login__text'>
                <span class="Login__hand">📲</span>
                    <h1> Sign in to Chat Rooms</h1>
                </div>
                <Button type='submit' onClick={signIn}>
                    Sign In with Google
                </Button><br></br>
                <Button type='submit' onClick={signInAnonym}>
                    Sign In Anonymously
                </Button>
            </div>
        </div>
    );
}

export default Login;
