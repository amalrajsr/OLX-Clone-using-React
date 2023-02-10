import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { FireBaseContext,Context } from './store/FireBaseContext';
import {auth,db} from './Firebase/config'
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <FireBaseContext.Provider value={{auth,db}}>
      <Context>
    <App/>
      </Context>
    </FireBaseContext.Provider>
    </BrowserRouter>
  </React.StrictMode>
);
