import React, { Suspense, useEffect } from 'react';
import { Loading, Errorboundary } from '../static';
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';
import BreadCrumb from './BreadCrumb'
import NavBar from './NavBar'
import { Navbar, Container } from "react-bootstrap"
import ChatBot from "./ChatBot.js"
import './MainPage.scss'
import routes from '../routes';
import proutes from '../routesPrivate'
import PRoute from '../static/PrivateRoute'

import Login from '../routes/auth/Login';
import Register from '../routes/auth/UserRegister';
import { useStateValue } from '../states/userProvider';

const App = function () {
  const [{ user, jwt }, dispatch] = useStateValue();

  useEffect(() => {
    if (jwt === "") {
      const token = localStorage.getItem('jwt')
      const user = localStorage.getItem('user')
      // localStorage.setItem('jwt', token)
      // localStorage.setItem('user', user)
      // console.log('app', JSON.parse(user), token)
      if (token) dispatch({ type: "SET_TOKEN", payload: { token, user: JSON.parse(user) } })
    }
  }, [])
  return (
    <>
      <Router>
        <NavBar />
        <Errorboundary>
          <Navbar bg="dark" variant='dark' className="p-0">
            <Container>
              <BreadCrumb />
            </Container>
          </Navbar>
          <Suspense fallback={<Loading />}>
            <Routes>
              {
                routes.map(({ path, element }, index) => {
                  return element !== null ? <Route path={path} element={element} key={index} /> : ''
                })
              }
              <Route path="/" element={<PRoute />}>
                {
                  proutes.map(({ path, element }, index) => <Route path={path} element={element} key={index} />)
                }
              </Route>
              <Route path="/login" element={user ? <Navigate replace to="/" /> : <Login />} />
              <Route path="/register" element={user ? <Navigate replace to="/" /> : <Register />} />
            </Routes>
            <ChatBot />
          </Suspense>
        </Errorboundary>
      </Router></>
  );
}
export default App;
