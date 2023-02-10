import React, { useContext, useState } from 'react';
import { collection, getDocs } from "firebase/firestore";

import './Post.css';
import { FireBaseContext } from '../../store/FireBaseContext';


 function Posts() {
  const {db} =useContext(FireBaseContext)
  const [products,setProducts]= useState([])
    getDocs(collection(db, "products")).then((querySnapshot)=>{
      const allpost=querySnapshot.docs.map((doc) => {
      return{
        ...doc.data(),
        id:doc.id
      }
    });
    setProducts(allpost)

  }
  )
  return (
    <div className="postParentDiv">
      <div className="moreView">
        <div className="heading">
          <span>Quick Menu</span>
          <span>View more</span>
        </div>
        <div className="cards">
          {
        products.map((product)=>{
          return(
            <div key={product.id} className="card" >
            <div className="favorite">
            </div>
            <div className="image">
              <img src={product.imageurl} alt="product" />
            </div>
            <div className="content">
              <p className="rate">&#x20B9;{product.price}</p>
              <span className="kilometer">{product.category}</span>
              <p className="name"> {product.name}</p>
            </div>
            <div className="date">
              <span>{product.date}</span>
            </div>
          </div>
         ) })
          
            }
        </div>
      </div>
    </div>
  );
}

export default Posts;
