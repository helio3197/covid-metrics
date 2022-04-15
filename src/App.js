import React, { useEffect } from 'react';
import { Outlet, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import { BsFillMicFill, BsFillGearFill } from 'react-icons/bs';
import { IoIosArrowBack } from 'react-icons/io';
import { fetchGlobalMetrics } from './redux/home/home';
import { fetchCountriesMetrics } from './redux/filter/filter';
import './App.scss';

const App = () => {
  const { header, previous } = useSelector((state) => state.path);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchGlobalMetrics());
    dispatch(fetchCountriesMetrics());
  }, []);

  return (
    <>
      <Navbar as="header">
        <Container fluid="md">
          {previous && (
            <Link to={previous} className="fs-5">
              <IoIosArrowBack />
            </Link>
          )}
          <h1 className="mx-auto my-0 fs-3 text-center">
            {header}
          </h1>
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
