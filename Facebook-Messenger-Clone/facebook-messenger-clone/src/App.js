import React, { useState, useEffect} from 'react';
import {Button, FormControl, Input, InputLabel, IconButton} from '@material-ui/core';
import Message from './Message';
import './App.css';
import db from './firebase';
import firebase from 'firebase';
import FlipMove from 'react-flip-move';
import SendIcon from '@material-ui/icons/Send';

function App() {
  // state is a short term memory storage.
  // useState is basically like a variable in REACT , which is used to hold some data/memory
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [username, setUsername] = useState('');

  useEffect(() => {
    // this useEffect runs once when the app component loads initially
    // snapshot here is actually a collection of all the data present in the database (similar to an array)
    // onSnapshot() this is like a listner which is always listening to any changes that happen in the database.
    // whenever there is any change in the database , this particular function gets fired
    // orderBy() is basically sorting function which takes the parameter on which the data needs to be sorted and 2nd 
    // parameter is the order , which is either ascending or descending order
    db.collection('messages').orderBy('timestamp','desc').onSnapshot(snapshot => {
      // this basically loops over each of the data entry present in the database
      setMessages(snapshot.docs.map(doc => ({id:doc.id, message:doc.data()})))
    })
  }, [])

  // useEffect is a REACT hook which is basically a function that gets executed based on a condition
  useEffect(() => {
    // this is where we define the code and run it
    // this basically sets the username to the name entered by the user
    setUsername(prompt('Please Enter your Name : '));
    // [] is basically the dependency(s). If the [] is empty that means this particular code runs once when the component
    // gets loaded.
  }, []);
  // If we write input in the dependecy parameter , whenever there is change in the input field the run inside 
  // the useEffect gets fired.

  // this function of sendMessage is fired when we click on the button Send Message
  const sendMessage =(event) => {
    // this particular command stops the page from refreshing 
    // if we didnt write this command then every time we click the button or press enter , the page refresh's
    // and we loose the content
    event.preventDefault();
    // this line here basically adds the content written by the user into the database
    // we are also adding a new field called timestamp whihc is the timestamp of the server which will
    // be common across all the users 
    db.collection('messages').add({
      message: input,
      username:username,
      timestamp:firebase.firestore.FieldValue.serverTimestamp()
    })
      // all the logic of sending the message goes in here
      // the ... basically tells us to to add the input to whatever is already existing in the message
      // similar to appending in case of arrray's
      // in this case the message has 2 parts , the username of the user and the input which is the message text.
    // setMessages([...messages, {username: username, message:input}]);
    // this is to clear the input field after clicking on the send message button
    setInput('');
  }

  return (
    <div className="App">
      <br/><br/>
      <img src="https://facebookbrand.com/wp-content/uploads/2018/09/Header-e1538151782912.png?w=100&h=100"></img>
      <h1 className="heading">
        MESSENGER
      </h1>

      {/* having the input field inside the form allows to use the enter key instead of the button onclick() */}
      <form className="app__form">
      <FormControl className="app__formControl">
        {/* input field , the onChnage() function is basically to set the new input to the 
        input field as and when we are typing on the keyboard*/}
        <Input className="app__input" placeholder='Enter a Message...' value={input} onChange={event => setInput(event.target.value)} />
        {/* button to send the message 
        disabled parameter makes sure that the button functionality is disabled when there is no input in the 
        input field.*/}
        <IconButton className="app__iconButton" disabled={!input} type='submit' color="primary" variant="contained" onClick={sendMessage}>
            <SendIcon/>
        </IconButton> 
      </FormControl>
      </form>

      {/* displaying the messages themselves */}
      <FlipMove>
        {
          // map command basically walks through the list/array of messages 
          // similar to a for loop
          // only difference btw map and for each is that map returns an object , in this case its the message.
          messages.map(({id, message}) => (
            // we are basically capturing the message as a text which is props parameter and pass it on to the component
            // called Message , which will actually contain the function to display each of the message.
            // this component is written in Message.js file
            // we have 2 parts of the message , one is the text and the other is the username.
            // now the message is no more a list , its an object
            // having the key={id} helps us only re-render those parts which are new and do not touch the already existing
            // objects
            <Message key={id} username={username} message={message}/>
            // writing components will actually help us in reuse of the component multiple times instead of re-writting it
            // everytime we need the functionality
          ))
        }
      </FlipMove>
    </div>
  );
}

export default App;
