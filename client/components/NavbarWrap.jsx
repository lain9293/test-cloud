import { faCloudUploadAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { A } from 'hookrouter';
import React from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import { useSelector } from 'react-redux';

export default function NavExample() {
  const token = useSelector((state) => state.token);

  return (
    <Navbar bg="primary" variant="dark" expand="lg">
      <Navbar.Brand>
        <FontAwesomeIcon icon={faCloudUploadAlt} />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          {token ? (
            <>
              <A className="nav-link" href="/files">
                Файлы
              </A>
              <A className="nav-link" href="/personal-area">
                Личный кабинет
              </A>
            </>
          ) : (
            <>
              <A className="nav-link" href="/login">
                Авторизация
              </A>
              <A className="nav-link" href="/signup">
                Регистрация
              </A>
            </>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}
