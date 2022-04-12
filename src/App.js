import React from 'react';
import { Outlet, useLocation, Link } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import { BsFillMicFill, BsFillGearFill } from 'react-icons/bs';
import { IoIosArrowBack } from 'react-icons/io';
import './App.scss';

const App = () => {
  const { pathname } = useLocation();

  const renderHeaderTitle = () => {
    switch (pathname) {
      case '/':
        return 'home';
      case '/details':
        return 'details';
      default:
        return 'unknown';
    }
  };

  const renderBackBtn = () => {
    switch (pathname) {
      case '/':
        return false;
      case '/details':
        return (
          <Link to="/" className="fs-5">
            <IoIosArrowBack />
          </Link>
        );
      default:
        return (
          <Link to="/" className="fs-5">
            <IoIosArrowBack />
          </Link>
        );
    }
  };

  return (
    <>
      <Navbar as="header">
        <Container fluid="md">
          {renderBackBtn()}
          <h1 className="mx-auto my-0">{renderHeaderTitle()}</h1>
          <div>
            <button type="button" className="button-icon">
              <BsFillMicFill />
            </button>
            <button type="button" className="button-icon">
              <BsFillGearFill />
            </button>
          </div>
        </Container>
      </Navbar>
      <Outlet />
    </>
  );
};

export default App;
