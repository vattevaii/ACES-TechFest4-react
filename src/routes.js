import { lazy } from 'react';
import FOF from './static/404'

import Home from './routes/Home';
const NewApp = lazy(() => import('./routes/App'));
const About = lazy(() => import('./routes/About'));
const routes = [
   { path: '*', element: <FOF />, name: "404" },
   { path: '/login', element: <Home />, name: "Home" },
   { path: '/register', element: <Home />, name: "Home" },
]

export default routes;