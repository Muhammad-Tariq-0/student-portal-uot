import React from 'react';
import {List} from 'antd'

export default function Todo({ todo }) {
  return (
    <div>
      <br/>
      <List>{todo.title}</List>
    </div>
  );
}
