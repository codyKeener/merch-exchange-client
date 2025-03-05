// import React, { useEffect } from 'react';
import { Button } from 'react-bootstrap';
// import { useRouter } from 'next/router';
import { signIn } from '../utils/auth';
// import { useAuth } from '../utils/context/authContext';

function Signin() {
  return (
    <div
      className="text-center d-flex flex-column justify-content-center align-content-center"
      style={{
        minHeight: '600px', marginTop: 'auto', display: 'flex', flex: '1 0 auto', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',
      }}
    >
      <h1>Hi there!</h1>
      <h5>Click the button below to login!</h5>
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '30px' }}>
        <Button type="button" size="lg" className="blue-button" onClick={signIn} style={{ width: '200px' }}>
          Sign In
        </Button>
      </div>
    </div>
  );
}

export default Signin;
