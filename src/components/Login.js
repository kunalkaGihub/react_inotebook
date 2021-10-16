import React,{useState} from "react";
import { useHistory } from "react-router-dom";

const Login = (props) => {

    const [credentials, setCredentials] = useState({email:"", password:""})
    let history = useHistory();
    
    const handleSubmit = async (e)=>{
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/auth/login", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({email:credentials.email, password:credentials.password}) //yeh hum body me bhej rhe hai
    });
    const json= await response.json();
    console.log(json)
    if(json.success){
        //save the auth token and redirect
        localStorage.setItem('token', json.authToken) 
        //yaha token update ho jaayega local storage me.. fr ish token k notes milenge
       
        props.showAlert("Logged In Successfully", "success")
        history.push("/")
    }else{
        props.showAlert("invalid Credentials", "danger")
    }
  }  
    
  
  const onChange =(e) =>{
        //spread operator
        setCredentials({...credentials, [e.target.name]:e.target.value})
    }

  return (
    <div className="mt-3">
    <h2 className="my-2">Login to your iNoteBook</h2>
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="email" className="form-label">Email address</label>
        <input type="email" className="form-control" id="email" value={credentials.email} onChange={onChange} name="email" aria-describedby="emailHelp" minLength={7} required/>
        <div id="emailHelp" className="form-text">
          We'll never share your email with anyone else.
        </div>
      </div>
      <div className="mb-3">
        <label htmlFor="password" className="form-label">Password</label>
        <input type="password" className="form-control" value={credentials.password} onChange={onChange} id="password" name="password" minLength={5} required/>
      </div>
      <button type="submit" className="btn btn-primary">Submit</button>
    </form>
    </div>
  );
};

export default Login;
