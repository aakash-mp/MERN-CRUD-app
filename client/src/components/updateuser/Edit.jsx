import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-hot-toast';
import axios from 'axios';

import "./edit.css";


const Edit = () => {

  const {id} = useParams();
  const [user, setUser] = useState({
    fname:"",
    lname:"",
    email:"",
    password:"",
});

const navigate = useNavigate();

function handleOnChange(event) {
  const {name, value} = event.target;
  setUser({...user, [name]: value});
}

useEffect(()=>{

  axios.get(`http://localhost:3001/api/getone/${id}`)
    .then((response) =>{
      setUser(response.data)
    })
    .catch((error) =>{
      console.log(error);
    })
  },[id])

  async function handleSubmit(event) {
    event.preventDefault();
    await axios.put(`http://localhost:3001/api/update/${id}`, user)
    .then((response)=> {
        toast.success(response.data.msg, {position: "top-right"});
        navigate("/");

    }).catch(error => console.log(error))
}


  return (
    <div className='updateUser'>
      <Link to={"/"}>Back</Link>
      <h3>Update User</h3>
      <form className='updateUserForm' onSubmit={handleSubmit}>
        <div className='inputGroup'>
            <label htmlFor="fname">First Name</label>
            <input type="text" value={user.fname} onChange={handleOnChange} id='fname' name='fname' autoComplete='off' placeholder='first name' />
        </div>
        <div className='inputGroup'>
            <label htmlFor="lname">Last Name</label>
            <input type="text" value={user.lname} onChange={handleOnChange} id='lname' name='lname' autoComplete='off' placeholder='last name' />
        </div>
        <div className='inputGroup'>
            <label htmlFor="email">Email</label>
            <input type="email" value={user.email} onChange={handleOnChange} id='email' name='email' autoComplete='off' placeholder='email' />
        </div>
        <div className='inputGroup'>
            <label htmlFor="password">Password</label>
            <input type="password" value={user.password} onChange={handleOnChange} id='password' name='password' autoComplete='off' placeholder='password' />
        </div>
        <div className='inputGroup'>
            <button type='submit'>Update User</button>
        </div>
      </form>
    </div>
  )
}

export default Edit
