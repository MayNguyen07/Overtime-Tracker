import React from 'react';
import { Nav } from 'react-bootstrap';

function HeaderComponent() {
  return (
    <div className="justify-content">
      <Nav style={{ background: '#003c8f', height: '70px' }}>
        <Nav.Item>
          <Nav.Link
            style={{ color: 'white', fontSize: '30px', fontWeight: 'bold' }}
            href="/"
            className="NavLink"
          >
            OT REQUEST
          </Nav.Link>
        </Nav.Item>
      </Nav>
    </div>
  );
}

export default HeaderComponent;
