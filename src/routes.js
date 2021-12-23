import { lazy } from 'react';
import FOF from './static/404'

import Home from './routes/Home';
// import Records, { Entry, EntryForm } from './routes/Records';
import Entry from './routes/Records/getRecords';
import Display from './routes/Records/getByTypeAndId';
import PRegister from './routes/auth/RegisterPerson'
import { Navigate } from 'react-router-dom';
import CreateRecord from './routes/Records/createRecord';
// const NewApp = lazy(() => import('./routes/App'));
// const About = lazy(() => import('./routes/About'));
const CoronaDetail = lazy(() => import('./routes/Corona'))
const PersonRegister = lazy(() => import('./routes/auth/RegisterPersonInit'))
const PostPage = lazy(() => import('./routes/Posts/PostPage'))
const PostListPage = lazy(() => import('./routes/Posts/PostListPage'))
const routes = [
   { path: '*', element: <FOF />, name: "404" },
   { path: '/login', element: null, name: "Login" },
   { path: '/register', element: null, name: "UserRegister" },
   { path: '/logout', element: <Navigate replace to="/login" />, name: "LogOut" },
   { path: '/register/person', element: <PersonRegister />, name: "PersonRegister" },
   { path: '/pregister', element: <PRegister />, name: "PersonRegisterAfterId" },
   { path: '/records', element: <Entry />, name: "Records" },
   { path: '/records/create', element: <CreateRecord />, name: "Create" },
   { path: '/records/:type/:id', element: <Display />, name: "Records" },
   // { path: '/records/entry', element: <EntryForm />, name: "Records" },
   { path: '/corona', element: <CoronaDetail />, name: "Corona" },
   { path: '/posts', element: <PostListPage />, name: "Posts" },
   { path: '/posts/:id', element: <PostPage />, name: "PostPage" }
]

export default routes;