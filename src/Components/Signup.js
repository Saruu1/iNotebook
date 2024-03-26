import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
const Signup = (props) => {
  const [credentials, setCredentials] = useState({name:"", email :"", password:"", cpassword:""})
  let navigate = useNavigate();
  const handleSubmit = async (e) =>{
      e.preventDefault();
      const {name, email, password} = credentials;
      const response = await fetch("http://localhost:5000/api/auth/createuser", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({name, email, password})
        });
        const json = await response.json();
        console.log(json);
        if(json.success){
          // Save the auth token andredirect
          localStorage.setItem('token', json.authToken)
          navigate("/");
        props.showAlert("Account Created Successfully", "success")
        }    
        else{
        props.showAlert("Invalid Details", "danger")
        }
  }
   const onChange = (e) => {
    setCredentials({...credentials, [e.target.name]:e.target.value})
   }
  return (
    <div className="container">
      <h2>Create an account to use iNotebook</h2>
      <form onSubmit={handleSubmit}>
      <div className="form-group my-4">
      <label htmlFor="name">Name</label>
      <input type="text" className="form-control" id="name" name = "name" value = {credentials.name}  aria-describedby="emailHelp" placeholder="Enter Name" onChange = {onChange} />
    </div>
    <div className="form-group my-3">
      <label htmlFor="email">Email address</label>
      <input type="email" className="form-control" id="email" name = "email" value = {credentials.email} aria-describedby="emailHelp" placeholder="Enter email" onChange = {onChange} />
    </div>
    <div className="form-group my-3">
      <label htmlFor="password">Password</label>
      <input type="password" className="form-control" id="password" name = "password" value = {credentials.password} placeholder="Password" onChange = {onChange} minLength={5} required/>
    </div>
    <div className="form-group my-3">
      <label htmlFor="cpassword">Confirm Password</label>
      <input type="password" className="form-control" id="cpassword" name = "cpassword"value = {credentials.cpassword} aria-describedby="emailHelp" placeholder="Confirm Password" onChange = {onChange} minLength={5} required/>
    </div>
    <button type="submit" className="btn btn-primary">Signup</button>
  </form>
  </div>
  )
}

export default Signup