import React from 'react'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';

function NavBar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
      console.log('You are logged out');
    } catch (e) {
      console.log(e.message);
    }
  };
  return (
    <>
    <Navbar bg="light" variant="light">
    <Container>
      <Navbar.Brand href="/dashboard">EXPENSE TRACKER</Navbar.Brand>
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            {user && user.email}
            <Button variant="text" color="secondary" onClick={handleLogout} >
                Logout
              </Button>
          </Navbar.Text>
        </Navbar.Collapse>
    </Container>
  </Navbar>
  </>
  )
}

export default NavBar
