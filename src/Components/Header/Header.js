import React, { useContext } from 'react';

import './Header.css';
import OlxLogo from '../../assets/OlxLogo';
import Search from '../../assets/Search';
import Arrow from '../../assets/Arrow';
import SellButton from '../../assets/SellButton';
import SellButtonPlus from '../../assets/SellButtonPlus';
import { signOut } from "firebase/auth";

import { Link } from 'react-router-dom';
import { AuthContext, FireBaseContext } from '../../store/FireBaseContext';
function Header() {
  const {userStatus,setuserStatus}=useContext(AuthContext)
  const {auth}=useContext(FireBaseContext)
  return (
    <div className="headerParentDiv">
      <div className="headerChildDiv">
        <div className="brandName">
          <OlxLogo></OlxLogo>
        </div>
        <div className="placeSearch">
          <Search></Search>
          <input type="text" />
          <Arrow></Arrow>
        </div>
        <div className="productSearch">
          <div className="input">
            <input
              type="text"
              placeholder="Find car,mobile phone and more..."
            />
          </div>
          <div className="searchAction">
            <Search color="#ffffff"></Search>
          </div>
        </div>
        <div className="language">
          <span> ENGLISH </span>
          <Arrow></Arrow>
        </div>
        <div className="loginPage">
          {userStatus?<span className='userName'>{userStatus.displayName}</span>:<Link to='/login' className='login'>Login</Link>}
        </div>
        {userStatus && <button className='logout' onClick={()=>{
          signOut(auth).then(() => {
            console.log('user logged out');
            setuserStatus('')
          }).catch((error) => {
            console.log(error);
          });
        }}>log out</button>}
        <div className="sellMenu d-flex justify-content-center align-items-center">
          <SellButton></SellButton>
          <div className="sellMenuContent">
            <SellButtonPlus></SellButtonPlus>
           {userStatus?<Link to='/create' className='sell ms-1'>SELL</Link>:<span>SELL</span>}           
            </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
