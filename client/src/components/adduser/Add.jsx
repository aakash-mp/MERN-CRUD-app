import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import "./add.css";
import { toast } from 'react-hot-toast';


const Add = () => {

    const [user, setUser] = useState({
        fname:"",
        lname:"",
        email:"",
        password:"",
    });

    const navigate = useNavigate();

    function handleOnChange(event) {
        const {name, value} = event.target;

        setUser(prevValue => {
            return {
                ...prevValue,
                [name]: value
            };
        });
    }

     async function handleSubmit(event) {
        event.preventDefault();
        await axios.post("http://localhost:3001/api/create", user)
        .then((response)=> {
            toast.success(response.data.msg, {position: "top-right"});
            navigate("/");

        }).catch(error => console.log(error))
    }

    /*const handleSubmit = async(event) =>{
        event.preventDefault();
        await axios.post("http://localhost:3001/api/create", user)
        .then((response)=> {
            console.log(response);

        }).catch(error => console.log(error))
    }*/

  return (
    <div className='addUser'>
      <Link to={"/"}>Back</Link>
      <h3>Add New User</h3>
      <form className='addUserForm' onSubmit={handleSubmit}>
        <div className='inputGroup'>
            <label htmlFor="fname">First Name</label>
            <input type="text" onChange={handleOnChange} id='fname' name='fname' autoComplete='off' placeholder='first name' />
        </div>
        <div className='inputGroup'>
            <label htmlFor="lname">Last Name</label>
            <input type="text" onChange={handleOnChange} id='lname' name='lname' autoComplete='off' placeholder='last name' />
        </div>
        <div className='inputGroup'>
            <label htmlFor="email">Email</label>
            <input type="email" onChange={handleOnChange} id='email' name='email' autoComplete='off' placeholder='email' />
        </div>
        <div className='inputGroup'>
            <label htmlFor="password">Password</label>
            <input type="password" onChange={handleOnChange} id='password' name='password' autoComplete='off' placeholder='password' />
        </div>
        <div className='inputGroup'>
            <button type='submit'>Add User</button>
        </div>
      </form>
    </div>
  )
}

export default Add




