import React, { useState,useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from "firebase/auth";

import Logo from '../../olx-logo.png';
import './Login.css';
import { FireBaseContext } from '../../store/FireBaseContext';

function Login() {
  const [email,setEmail]=useState('')
  const [pass,setPass]=useState('')
  const {auth}=useContext(FireBaseContext)
  const [error,setError]= useState('')
  const navigate= useNavigate()
   const userValidation=(e)=>{
    e.preventDefault()
    signInWithEmailAndPassword(auth,email, pass)
    .then(() => {
      console.log('User logged in');
      navigate('/')
    })
    .catch((error) => {
      console.log(error);

     console.log(error.message);
     setError(error.message)
    });
  
    
  }

  return (

    <div className='signup-div'>
    <div className="signupParentDiv d-flex justify-content-between container ">
      <div className='col-lg-4'>
        <img width='200px' height='200px' className='col-lg-none ' src={Logo} alt='olx'></img>
          <Link to='/signup' >signup</Link>
      </div>
      <div className=' form-div  '>
      <form onSubmit={userValidation} className='me-4'>
        <label htmlFor="fname">Email</label>
        <br/>
        <input className="input" type="email"  id="fname" name="email"  value={email}  onChange={(e)=>setEmail(e.target.value)}/>
        <br />
        <label htmlFor="fname">Password</label>
        <br />
        <input className="input" type="text" id="pass" name="pass" value={pass} onChange={(e)=>setPass(e.target.value)} />
        <br />
         <br/>
        <button>Signin</button>
        {error && <p className='text-bold'>{error}</p>}

      </form>
      </div>
    </div>
  </div>
  );
}

export default Login;
