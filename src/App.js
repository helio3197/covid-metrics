import React, { useEffect } from 'react';
import { Outlet, useLocation, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import { BsFillMicFill, BsFillGearFill } from 'react-icons/bs';
import { IoIosArrowBack } from 'react-icons/io';
import { fetchGlobalMetrics } from './redux/home/home';
import './App.scss';

const App = () => {
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchGlobalMetrics());
  }, []);

  const renderHeaderTitle = () => {
    switch (pathname) {
      case '/':
        return 'Global Covid Metrics';
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
          <h1 className="mx-auto my-0 fs-3">{renderHeaderTitle()}</h1>
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
      <Container fluid className="py-2">
        <Outlet />
      </Container>
    </>
  );
};

export default App;
