import React, {useState} from 'react'
import { useHistory } from "react-router-dom";

const Signup = (props) => {

    const [credentials, setCredentials] = useState({name:"",email:"", password:""})
    let history = useHistory();
    
    const handleSubmit = async (e)=>{
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/auth/createuser", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({name:credentials.name,email:credentials.email, password:credentials.password}) //yeh hum body me bhej rhe hai
    });
    const json= await response.json();
    console.log(json)
    if(json.success){
        //save the auth token and redirect
        localStorage.setItem('token', json.authToken)
        history.push("/");
        props.showAlert("Account Created Successfully", "success")
    }else{
        props.showAlert("invalid Details", "danger")
    }
    }  
    
    const onChange =(e) =>{
        //spread operator
        setCredentials({...credentials, [e.target.name]:e.target.value})
    }

    return (
        <div className="mt-2">
        <h1 className="my-2">Create an account to use iNoteBook</h1>
            <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label htmlFor="name" className="form-label">Name</label>
                <input type="text" className="form-control" name="name" value={credentials.name} onChange={onChange} id="name"/>
            </div>
            <div className="mb-3">
                <label htmlFor="email" className="form-label">Email address</label>
                <input type="email" className="form-control" name="email" value={credentials.email} onChange={onChange} id="email" aria-describedby="emailHelp"/>
                <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
            </div>
            <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input type="password" className="form-control" name="password" value={credentials.password} onChange={onChange} id="password" minLength={5} required/>
            </div>
            <div className="mb-3">
                <label htmlFor="cpassword" className="form-label">Confirm Password</label>
                <input type="password" className="form-control" name="cpassword" value={credentials.password} onChange={onChange} id="cpassword" minLength={5} required/>
            </div>
            <button type="submit" className="btn btn-primary">Sign Up</button>
            </form>
        </div>
    )
}

export default Signup
