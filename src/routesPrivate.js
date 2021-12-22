import { lazy } from 'react';

import Home from './routes/Home';
const NewApp = lazy(() => import('./routes/App'));
const About = lazy(() => import('./routes/About'));
const routes = [
   { path: '/', element: <Home />, name: "Home" },
   { path: '/about/:docId', element: <About />, name: "About" },
   { path: '/projects', element: <Home />, name: "Projects" },
   { path: '/about/app', element: <NewApp />, name: "OldApp" }
]

export default routes;