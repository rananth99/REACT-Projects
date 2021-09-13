import React, {forwardRef} from 'react';
import {Card, CardContent, Typography} from '@material-ui/core';
import './Message.css';

// we have passed message and username as a parameter in the App.js file
// that text will now come as props/object to the Message component
// here forwardRef() is a higher order component
const Message = forwardRef(({message, username}, ref) => {
    {/* here we are accessing the the text content sent by the parameter which in this case is the props
            so props.text gives us each message that is entered in the input field .
            We are styling the messages or the text sent using material ui 
        */}
    // this line is basically to differentiate between the user and fellow people on the chat
    const isUser = username === message.username;
    return (
        // this particular styling is basically to tell the message class gets applied to all the messages and 
        // message__user class gets applied only if the person is user who has logged in on his device
        <div ref={ref} className={`message ${isUser && "message__user"}`}>
            {/* this below line is basically a ternary operator where it checks for the value of isUser
            and based on that it is going to use one of the two styling classes */}
            <Card className={isUser ? "message__userCard" : "message__guestCard"}>
                <CardContent>
                    <Typography color="white" variant="h5" component="h2">
                        {!isUser && `${message.username || 'Anonymous'} :`} {message.message}
                    </Typography>
                </CardContent>
            </Card>
        </div>
    )
})

export default Message
