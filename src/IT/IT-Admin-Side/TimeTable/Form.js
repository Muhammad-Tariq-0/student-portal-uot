import React, { useState } from 'react';
import firebase from './firebase';
import {Input,Button} from 'antd';

export default function Form() {
  const [title, setTitle] = useState('');

  const handleOnChange = (e) => {
    setTitle(e.target.value);
  };
  const createTodo = () => {
    
    const todoRef = firebase.database().ref('Todo');
    const todo = {
      title,
      complete: false,
    };

    todoRef.push(todo);
  };
  return (
    <div>
      <Input type="text" onChange={handleOnChange} value={title} /><br/><br/>
      <Button type='primary' onClick={createTodo}>Publish</Button>
    </div>
  );
}
