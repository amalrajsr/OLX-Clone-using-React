import React, { Fragment,useContext,useState ,} from 'react';
import { getStorage, ref, uploadBytes ,getDownloadURL} from "firebase/storage";
import { collection, addDoc } from "firebase/firestore"; 

import './Create.css';
import Header from '../Header/Header';
import { AuthContext, FireBaseContext } from '../../store/FireBaseContext';
import { useNavigate } from 'react-router-dom';

const Create = () => {
  const navigate=useNavigate()
  const {db} = useContext(FireBaseContext)
  const {userStatus}=useContext(AuthContext)
  const [productName,setProductName]=useState('')
  const [productCategory,setProductCategory]=useState('')
  const [productPrice,setProductPrice]=useState('')
  const [productImage,setProductImage]=useState(null)
  try{
     
    const productUpload= async()=>{
      const date= new Date()
      const uid= Math.floor(Math.random() * 10000)
      const storage = getStorage();
      if(userStatus){

        const storageRef =ref(storage,`/images/${productImage.name+uid+Date.now()}`);
        const snapshot= await uploadBytes(storageRef, productImage)
           console.log('Image uploaded');
           const imageurl= await getDownloadURL(snapshot.ref)
         await  addDoc(collection(db,"products"),{
             user:userStatus.uid,
             name:productName,
             category:productCategory,
             price:productPrice,
             imageurl,
             date:date.toDateString()
   
           })
           console.log('product added to database')
      }else{
        console.log('Unauthorised access restricted');
      }
       navigate('/')
    }
    
  
 

  return (
    <Fragment>
      <Header />
      
        <div className="centerDiv">
            <label htmlFor="fname">Name</label>
            <br />
            <input
              className="input"
              type="text"
              id="fname"
              name="Name"
              value={productName}
              onChange={(e)=>setProductName(e.target.value)}
              required
            />
            <br />
            <label htmlFor="fname">Category</label>
            <br />
            <input
              className="input"
              type="text"
              id="fname"
              name="category"
              value={productCategory}
              onChange={(e)=>setProductCategory(e.target.value)}
              required
            />
            <br />
            <label htmlFor="fname">Price</label>
            <br />
            <input className="input" type="number" id="fname" name="Price" value={productPrice} onChange={(e)=>setProductPrice(e.target.value)} required/>
            <br />
          <br />
          <img alt="Post" className='mb-2' width="100px" height="80px" src={productImage?URL.createObjectURL(productImage):''}/>
          
            <br />
            <input type="file" 
              onChange={(e)=>setProductImage(e.target.files[0])} />
            <br />
            <button className="uploadBtn" onClick={productUpload}>upload</button>
        </div>
    </Fragment>
  );
}catch(err){
  console.log(err);
}
};

export default Create;
