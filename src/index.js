import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './components/App';
import "bootstrap/dist/css/bootstrap.min.css";
import { StateProvider } from './states/userProvider';
import reducer, { initialState } from './states/userReducer';

ReactDOM.render(
  <React.StrictMode>
    <StateProvider initialState={initialState} reducer={reducer}>
      <App />
    </StateProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
