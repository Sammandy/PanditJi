import React from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import './Header.css';

function Header() {
  return (
    <Navbar bg="light" variant="light" expand="lg" className="header">
      <Container>
        <Navbar.Brand href="/">My Website</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          <Nav className="ml-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="#about">About</Nav.Link>
            <Nav.Link href="#contact">Contact</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
