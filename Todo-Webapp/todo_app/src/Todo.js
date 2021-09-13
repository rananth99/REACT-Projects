import React, {useState} from 'react';
import {Button, List, ListItem, ListItemAvatar, ListItemText, Modal} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import db from './firebase';
import './Todo.css';

const useStyles = makeStyles((theme) => ({
    paper: {
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));

function Todo(props) {
    // this is the style for the modal taken from material ui 
    const classes = useStyles();

    const [open, setOpen] = useState(false);
    const [input, setInput] = useState();

    // this is basically to open the Modal box for us to edit the particular todo
    const handleOpen = () => {
        setOpen(true);
    };
    // this function is to close the modal after typing the new input text
    const handleClose = () => {
        setOpen(false);
    };
    const updateTodo = () => {
        // update the todo with the new input text
        db.collection('todos').doc(props.todo.id).set({
            todo : {input}
        }, { merge: true});

        setOpen(false);
    };
    return (
        <>
        <Modal
            open={open}
            onClose={e => setOpen(false)}
        >
            <div className={classes.paper}>
                <h1>Edit the TODO</h1>
                <input placeholder={props.todo.todo} value={input} onChange={event => setInput(event.target.value)}/>
                <Button onclick={updateTodo}>Update Todo</Button>
            </div>
        </Modal>
        {/* this is basically the material ui code snippet to add the todo's as a list one below the other */}
        <List className="todo_list">
            <ListItem>
                {/* props.text is basically taking one element of the todo list at a time anad adding it
                to the list item. */}
                <ListItemAvatar>
                </ListItemAvatar>
                <ListItemText primary={props.todo.todo} secondary="Deadline ⏰" />
            </ListItem>
            <Button onClick={e => setOpen(true)}>Edit Todo</Button>
            <DeleteForeverIcon onClick={event => {
                db.collection('todos').doc(props.todo.id).delete()
            }} />
        </List>
        </>
    )
}

export default Todo
