/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import Link from 'next/link';
import {
  Navbar, //
  Container,
  Nav,
  // Button,
  Image,
} from 'react-bootstrap';
// import { signOut } from '../utils/auth';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { useAuth } from '../utils/context/authContext';

export default function NavBar() {
  const { user } = useAuth();

  return (
    <Navbar expand="md" className="mb-3 navbar" data-bs-theme="dark">
      <Container>
        <Link passHref href="/">
          <Navbar.Brand>
            <Image
              src="/merch-exchange-logo.png"
              alt="Merch Exchange Logo"
              height="40px"
            />
          </Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="offcanvasNavbar-expand-md" />
        <Navbar.Offcanvas id="responsive-navbar-nav" aria-labelledby="offcanvasNavbarLabel-expand-md" placement="end">
          <Offcanvas.Header
            closeButton
            style={{
              // backgroundColor: '#000000',
              color: '#4495db',
              fontFamily: '"League Spartan", serif',
              fontSize: '24px',
              fontWeight: '600',
            }}
          >
            <Offcanvas.Title>Merch Exchange</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body
            style={{
              backgroundColor: '#000000',
              color: '#4495db',
              fontFamily: '"League Spartan", serif',
              fontSize: '24px',
              fontWeight: '600',
            }}
          >
            <Nav className="justify-content-left flex-grow-1 pe-3">
              <Link passHref href="/artists">
                <Nav.Link className="navbar navlink">Artists</Nav.Link>
              </Link>
              <Link passHref href="/products">
                <Nav.Link className="navbar navlink">Products</Nav.Link>
              </Link>
            </Nav>
            <Nav className="justify-content-end flex-grow-1 pe-3">
              <Link passHref href={user.uid ? '/profile/my-profile' : '/profile/login'}>
                <Nav.Link className="navbar navlink">Profile</Nav.Link>
              </Link>
            </Nav>
          </Offcanvas.Body>
          {/* <Nav
            className="me-auto"
            style={{
              width: '100%',
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
             CLOSE NAVBAR ON LINK SELECTION: https://stackoverflow.com/questions/72813635/collapse-on-select-react-bootstrap-navbar-with-nextjs-not-working
            <div style={{
              display: 'flex',
            }}
            >
              <Link passHref href="/bands">
                <Nav.Link className="navbar navlink">Bands</Nav.Link>
              </Link>
              <Link passHref href="/products">
                <Nav.Link className="navbar navlink">Products</Nav.Link>
              </Link>
            </div>
            <div style={{
              display: 'flex',
              marginLeft: 'auto',
            }}
            >
              <Link passHref href="/profile">
                <Nav.Link className="navbar navlink">Profile</Nav.Link>
              </Link>
              <Button variant="danger" onClick={signOut}>
                Sign Out
              </Button>}
            </div>
          </Nav> */}
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
}
