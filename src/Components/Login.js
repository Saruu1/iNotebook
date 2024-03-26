import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
const Login = (props) => {
    const [credentials, setCredentials] = useState({email:"", password:""})
     let navigate = useNavigate();
    const handleSubmit = async (e) =>{
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/auth/login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({email:credentials.email, password:credentials.password})
          });
          const json = await response.json();
          console.log(json);
          if(json.success){
            // Save the auth token and redirect
            localStorage.setItem('token', json.authToken)
            props.showAlert("Logged in Successfully ", "success");
            navigate("/");
          }    
          else{
            props.showAlert("Invalid Credentials", "danger")
          }
    }
    const onChange =(e)=>{
        setCredentials({...credentials, [e.target.name]:e.target.value})
        }
  return (
    <div> 
      <h2>Login to continue to iNotebook</h2>
        <form onSubmit={handleSubmit}>
    <div className="form-group my-4">
      <label htmlFor="exampleInputEmail1">Email address</label>
      <input type="email" className="form-control" onChange={onChange} value= {credentials.email} id="email" name="email" aria-describedby="emailHelp" placeholder="Enter email"/>
    </div>
    <div className="form-group my-3">
      <label htmlFor="exampleInputPassword1">Password</label>
      <input type="password" className="form-control" onChange={onChange} value= {credentials.password} id="password" name="password" placeholder="Password"/>
    </div>
    <button type="submit" className="btn btn-primary my-3">Login</button>
  </form>
  </div>
  )
}

export default Login