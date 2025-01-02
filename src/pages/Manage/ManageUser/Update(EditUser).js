import React, { useState, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import axios from 'axios';
import { Link } from "react-router-dom";

const EditUser = ({ match }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');

  useEffect(() => {
    const fetchUser = async () => {
      const response = await axios.get(`/api/users/${match.params.id}`);
      setName(response.data.name);
      setEmail(response.data.email);
      setRole(response.data.role);
    };
    fetchUser();
  }, [match.params.id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`/api/users/${match.params.id}`, { name, email, role });
      alert('User updated successfully');
    } catch (error) {
      console.error(error);
      alert('Error updating user');
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="name">
        <Form.Label>Name</Form.Label>
        <Form.Control 
          type="text" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
        />
      </Form.Group>

      <Form.Group controlId="email">
        <Form.Label>Email</Form.Label>
        <Form.Control 
          type="email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
        />
      </Form.Group>

      <Form.Group controlId="role">
        <Form.Label>Role</Form.Label>
        <Form.Control 
          as="select" 
          value={role} 
          onChange={(e) => setRole(e.target.value)}
        >
          <option>Admin</option>
          <option>User</option>
        </Form.Control>
      </Form.Group>

      <Button type="submit" variant="primary">Update User</Button>
    </Form>
  );
};

export default EditUser;
