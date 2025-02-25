/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import Link from 'next/link';
import {
  Navbar, //
  Container,
  Nav,
  Button,
  Image,
} from 'react-bootstrap';
import { signOut } from '../utils/auth';

export default function NavBar() {
  return (
    <Navbar collapseOnSelect expand="lg" class="navbar">
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
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav
            className="me-auto"
            style={{
              width: '100%',
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            {/* CLOSE NAVBAR ON LINK SELECTION: https://stackoverflow.com/questions/72813635/collapse-on-select-react-bootstrap-navbar-with-nextjs-not-working */}
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
              <Button variant="danger" onClick={signOut}>
                Sign Out
              </Button>
            </div>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
