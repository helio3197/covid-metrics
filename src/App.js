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
      <Navbar as="header" bg="secondary" variant="dark">
        <Container fluid="md">
          {previous && (
            <Link to={previous} className="fs-5 text-light">
              <IoIosArrowBack />
            </Link>
          )}
          <h1 className="mx-auto my-0 fs-3 text-center text-light">
            {header}
          </h1>
          <div>
            <button type="button" className="button-icon text-light">
              <BsFillMicFill />
            </button>
            <button type="button" className="button-icon text-light">
              <BsFillGearFill />
            </button>
          </div>
        </Container>
      </Navbar>
      <Container fluid className="py-2">
        <Outlet />
      </Container>
      <Container fluid as="footer" className="bg-secondary mt-auto">
        <Container fluid="md" className="d-flex pt-2">
          <Link to="/" className="text-decoration-none">
            <h2 className="text-light m-0">Global Covid Metrics</h2>
          </Link>
          <p className="ms-auto">
            Source:
            {' '}
            <a
              href="https://covid19tracking.narrativa.com/index_en.html"
              className="text-reset"
              target="_blank"
              rel="noreferrer"
            >
              Narrativa API
            </a>
          </p>
        </Container>
      </Container>
    </>
  );
};

export default App;
