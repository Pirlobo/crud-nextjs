import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import axios from 'axios';
import { useRouter } from 'next/router'

const UpdateUser = (props) => {
  const router = useRouter()
  const [user, setUser] = useState({
    id: props.user.id,
    name: props.user.name,
    email: props.user.email,
  });
  const [imageBase64Value, setImageBase64Value] = useState(null);
  const [error, setError] = useState('');
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
    let req = {
      id: user.id,
    name: user.name,
    email: user.email,
    imageBase64Value : imageBase64Value,
    }
    e.preventDefault()
    if (error !== '') {
      return 
    }
    else {
      await axios.put(`/api/updateUser/${router.query.id}`, req);
    router.push('http://localhost:3000/protected')
    }
  }
  const getBase64Value = (img, callback) => {
    const reader = new FileReader();
    reader.readAsDataURL(img);
    reader.onload = () => {
        callback(reader.result);
    };
  };
  
  const beforeImageUpload = (file) => {
    const fileIsValidImage = file.type === "image/jpeg" || file.type === "image/png";
    const fileIsValidSize = file.size / 1024 / 1024 < 1;
  
    if (!fileIsValidImage) {
        return false;
    }
  
    if (!fileIsValidSize) {
        return false;
    }
  
    return fileIsValidImage && fileIsValidSize;
  };
  
    const selectFile = (event) => {
      if (beforeImageUpload(event.target.files[0])) {
        getBase64Value(event.target.files[0], imageBase64Value => {
          setImageBase64Value(imageBase64Value);
          setError('');
      }); 
      }
      else{
        setError("Error: File is not valid");
      }
    };

  return (
    <Form>
    <Form.Group>
        <Form.Label>Image 
        {error !== '' ? <span style= {{color: "red"}}> {`: ${error}`}</span> : null}
        </Form.Label>
        <Form.Control
        onChange={selectFile}
          name="image"
          type="file"
          id="avatar" name="avatar"
          accept="image/png, image/jpeg"
        />
      </Form.Group>
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
        Update
      </Button>
    </Form>
  );
};

export default UpdateUser;
