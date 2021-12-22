import React, { Suspense } from 'react';
import { Loading, Errorboundary } from '../static';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { BreadCrumb, NavBar } from '.'
import { Navbar, Container } from "react-bootstrap"
import ChatBot from "./ChatBot.js"
import './App.scss'
import routes from '../routes';
import proutes from '../routesPrivate'
import PRoute from '../static/PrivateRoute'

const App = () => (
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
              routes.map(({ path, element }, index) => <Route path={path} element={element} key={index} />)
            }
            <Route path="/" element={<PRoute />}>
              {
                proutes.map(({ path, element }, index) => <Route path={path} element={element} key={index} />)
              }
            </Route>
          </Routes>
          <ChatBot />
        </Suspense>
      </Errorboundary>
    </Router></>
);

export default App;
