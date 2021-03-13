import React from 'react';
import firebase from './firebase';
import {Tooltip,List} from 'antd'
import {
  DeleteOutlined,
} from "@ant-design/icons";

export default function Todo({ todo }) {
  const deleteTodo = () => {
    const todoRef = firebase.database().ref('Todo').child(todo.id);
    todoRef.remove();
  };
  return (
    <div>
      <br/>
      <List>{todo.title}<Tooltip title='Delete'>
        <DeleteOutlined onClick={deleteTodo} style={{float:'right'}} /></Tooltip></List>
    </div>
  );
}
