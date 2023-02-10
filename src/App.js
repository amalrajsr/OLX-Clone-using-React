import React, { useEffect,useContext } from 'react';
import { onAuthStateChanged } from "firebase/auth";
 import { Routes, Route } from 'react-router-dom';
import './App.css';
import {AuthContext, FireBaseContext} from './store/FireBaseContext';
import Home from './Pages/Home';
import Signup from './Pages/Signup'
import Login from './Pages/Login'
import Create from './Components/Create/Create';
import View from './Components/View/View' 
function App() {
  const {setuserStatus}=useContext(AuthContext)
  const {auth}=useContext(FireBaseContext)
 useEffect(()=>{
  onAuthStateChanged(auth,(user)=>{
    if(user){
      setuserStatus(user)
     
      console.log('logged in');
    }
  })
})
  
  return (
    <div>
     <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/view' element={<View/>}/>
      <Route path='/signup' element={<Signup/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/create' element={<Create/>}/>
     </Routes>
    </div>
  );
}

export default App;
