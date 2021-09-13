import React , { useState , useEffect } from 'react';
import { Button, FormControl, Input, InputLabel } from '@material-ui/core';
import firebase from "firebase";
import Todo from './Todo';
import db from './firebase';
import './App.css';

function App() {
  // this is basically setting up a short term state for the app
  // react gives us the useState function to set up the short term state
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');

  // When the app loads initially , we need to listen to the database 
  // and load all the todos that either get added or removed
  
  // useEffect(function , dependencies)
  // the function here gets fired once when the app.js initially loads
  // and dependency is basically when the useEffect should run , whenever there is any change we should fire the useEffect.
  useEffect(() => {
    //  this code here , fires when the app.js loads
    db.collection('todos').orderBy('timestamp', 'desc').onSnapshot(snapshot => {
      // console.log(setTodos(snapshot.docs.map(doc => doc.data().todo));
      setTodos(snapshot.docs.map(doc => ({id: doc.id, todo: doc.data().todo})))
    })
  }, []);   

  const addTodo = (event) => {
    // this will fire when we click the button
    event.preventDefault();
    // this line is basically to add the input thats written in the input field
    // it adds the input to the firebase database
    // since there is change in the modification , the snapshot of the db is different
    // hence the useEffect gets fired and hence we can see it in the list
    db.collection('todos').add({
      todo: input,
      // this is basically adding the timestamp to display the recent todo on top.
      // we are taking the timestamp of the firebase server and not our individual timestamp
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    })
    // this is basically appending the new entry in to the array thats already populated
    // setTodos([...already present , new entry])
    setTodos([...todos , input]);
    // this is basically to set the the input box to blank after entering one entry.
    setInput('');
  }
  return (
    <div className="App">
      <h1>
        WELCOME TO THE TODO APP !! 📅📅 
      </h1>
      <form>
        {/* <input value={ input } onChange={ event => setInput(event.target.value)}/> */}
        <FormControl>
          <InputLabel>🖊️Write a TODO</InputLabel>
          <Input value={ input } onChange={ event => setInput(event.target.value)}/>
        </FormControl>
        {/* disabled={!input} this command basically disables the button if the input is null. */}
        <Button disabled={!input} type="submit" onClick={ addTodo } variant="contained" color="primary">Add Todo</Button>
      </form>
      <ul>
         {/* // todos.map() is like a loop which traverses through the todos array  */}
         {/* // which contain the todo content and then populate the li element. */}
        { todos.map(todo => (
          // this below line is basically calling the Todo component which is Todo.js file.
          <Todo todo = {todo}/>
        )) }
      </ul>
    </div>
  );
}

export default App;
