import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import axios from 'axios';
import { useRouter } from 'next/router'

const AddUser = () => {
  const router = useRouter()
  const [user, setUser] = useState({
    id: undefined,
    name: "",
    email: "",
  });
  const handleChange = (e) => {
    if (e.target.name == "id") {
      setUser({
        ...user,
        id: e.target.value,
      });
    } else if (e.target.name == "name") {
      setUser({
        ...user,
        name: e.target.value,
      });
    } else {
      setUser({
        ...user,
        email: e.target.value,
      });
    }
  };
   async function onSubmit (e) {
    e.preventDefault()
    await axios.post('/api/addUser', user);
    router.push('http://localhost:3000/protected')
  }

  return (
    <Form>
      <Form.Group>
        <Form.Label>Id</Form.Label>
        <Form.Control
          onChange={handleChange}
          value={user.id}
          name="id"
          type="text"
          placeholder="Id"
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Name</Form.Label>
        <Form.Control
          onChange={handleChange}
          value={user.name}
          name="name"
          type="text"
          placeholder="Name"
        />
      </Form.Group>
      <Form.Group controlId="formBasicEmail">
        <Form.Label>Email</Form.Label>
        <Form.Control
          onChange={handleChange}
          value={user.email}
          name="email"
          type="email"
          placeholder="Enter emil"
        />
      </Form.Group>

      <Button onClick={onSubmit} variant="primary" type="submit">
        Add
      </Button>
    </Form>
  );
};

export default AddUser;
