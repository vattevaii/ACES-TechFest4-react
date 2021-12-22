import { lazy } from 'react';
import FOF from './static/404'

import Home from './routes/Home';
import Records from './components/Records';
import Login from './routes/Login';
import Register from './routes/NewRegister';
import PRegister from './routes/RegisterPerson'
// const NewApp = lazy(() => import('./routes/App'));
// const About = lazy(() => import('./routes/About'));
const CoronaDetail = lazy(() => import('./routes/Corona'))
const NewRegister = lazy(() => import('./routes/Register'))
const PostPage = lazy(() => import('./routes/PostPage'))
const PostListPage = lazy(() => import('./routes/PostListPage'))
const routes = [
   { path: '*', element: <FOF />, name: "404" },
   { path: '/login', element: <Login />, name: "Login" },
   { path: '/register', element: <Register />, name: "Register" },
   { path: '/newregister', element: <NewRegister />, name: "Register" },
   { path: '/pregister', element: <PRegister />, name: "PersonRegister" },
   { path: '/records', element: <Records />, name: "Records" },
   { path: '/corona', element: <CoronaDetail />, name: "Corona" },
   { path: '/posts', element: <PostListPage />, name: "Posts" },
   { path: '/posts/:id', element: <PostPage />, name: "PostPage" }
]

export default routes;