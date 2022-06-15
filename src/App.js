import React, { useState } from "react";
import { Button, button, Card, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

import "./App.css";

function Todo({ todo, index, markTodo, removeTodo }) {
  return (
    <div className="todo">
      <span style={{ textDecoration: todo.isDone ? "line-through" : "" }}>
        {todo.text}
      </span>
      <div>
        <Button variant="outline-success" onClick={() => markTodo(index)}>
          Done
        </Button>
        <Button variant="outline-danger" onClick={() => removeTodo(index)}>
          Delete
        </Button>
      </div>
    </div>
  );
}

function FormTodo({ addTodo }) {
  const [value, setValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!value) return;
    addTodo(value);
    setValue("");
  };

  return (
    <Form onSubmit={handleSubmit}>
      <div className="form-group">
        <Form.Group>
          <Form.Label>
            <b>Add Todo</b>
          </Form.Label>
          <Form.Control
            type="text"
            className="input"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Add new todo E.G. Read Book"
          />
        </Form.Group>
      </div>
      <Button variant="primary mb-3" type="submit">
        Submit
      </Button>
    </Form>
  );
}

function App() {
  const [todoList, setTodoList] = useState([
    {
      text: "This is an example todo",
      isDone: false,
    },
  ]);

  const addTodo = (text) => {
    const newTodos = [...todoList, { text }];
    setTodoList(newTodos);
  };

  const markTodo = (index) => {
    const newTodos = [...todoList];
    newTodos[index].isDone = true;
    setTodoList(newTodos);
  };

  const removeTodo = (index) => {
    const newTodos = [...todoList];
    newTodos.splice(index, 1);
    setTodoList(newTodos);
  };

  return (
    <div className="app">
      <div className="container">
        <h1 className="text-center mb-4">Todo List</h1>
        <FormTodo addTodo={addTodo} />
        <div>
          {todoList.map((todo, index) => (
            <Card>
              <Card.Body>
                <Todo
                  key={index}
                  index={index}
                  todo={todo}
                  markTodo={markTodo}
                  removeTodo={removeTodo}
                />
              </Card.Body>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
