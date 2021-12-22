import React, { Suspense, useContext, useEffect } from "react";
import { Loading, Errorboundary } from "../static";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { BreadCrumb, NavBar } from ".";
import { Navbar, Container } from "react-bootstrap";
import ChatBot from "./ChatBot.js";
import "./App.scss";
import routes from "../routes";
import proutes from "../routesPrivate";
import PRoute from "../static/PrivateRoute";
import { QueryClient, QueryClientProvider } from "react-query";
import { AuthContext } from "../context/AuthContext";
import { useCookies } from "react-cookie";
const queryClient = new QueryClient();

const App = () => {
  const { accessToken, dispatch } = useContext(AuthContext);
  const [cookies] = useCookies(["jwt"]);

  useEffect(() => {
    if (accessToken === "") {
      const { jwt, user } = cookies;

      if (jwt) dispatch({ type: "ACCESS_TOKEN", payload: { user, jwt } });
    }
  }, [dispatch, accessToken, cookies]);

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Router>
          <NavBar />
          <Errorboundary>
            <Navbar bg="dark" variant="dark" className="p-0">
              <Container>
                <BreadCrumb />
              </Container>
            </Navbar>
            <Suspense fallback={<Loading />}>
              <Routes>
                {routes.map(({ path, element }, index) => (
                  <Route path={path} element={element} key={index} />
                ))}
                <Route path="/" element={<PRoute />}>
                  {proutes.map(({ path, element }, index) => (
                    <Route path={path} element={element} key={index} />
                  ))}
                </Route>
              </Routes>
              <ChatBot />
            </Suspense>
          </Errorboundary>
        </Router>
      </QueryClientProvider>
    </>
  );
};

export default App;
