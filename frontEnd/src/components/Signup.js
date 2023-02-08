import React, { useEffect, useState } from "react";
import {useNavigate} from "react-router-dom";
import ConfigApi from "./ConfigApi";

const Signup =()=>{
    const [name , setName] = useState("");
    const [email , setEmail] = useState("");
    const [password , setPassword] = useState("");
    useEffect(()=>{
        const auth = localStorage.getItem('user');
        if(auth) {navigate('/')} ;
    }
    );
    const navigate = useNavigate();
    const collectdata= async ()=>{
        console.warn(name, password ,email); 
        let result =  await fetch(`${ConfigApi.ApiUrl}/signup` , {
            method:'post', 
            body: JSON.stringify({name,email, password }),
            headers: {
                'Content-Type' : 'application/json'
            }
        });
        result =  await result.json();
        localStorage.setItem("user" , JSON.stringify(result));
        navigate('/');
    }
    return(
        <div className="signup">
            <h1>SIGN UP</h1>
            <input type="text" placeholder="Enter Name" value={name} onChange={(e)=>{setName(e.target.value)}}></input>
            <input type="text" placeholder="Enter Emial" value={email} onChange={(e)=>{setEmail(e.target.value)}}></input>
            <input type="password" placeholder="Enter Password" value={password} onChange={(e)=>{setPassword(e.target.value)}}></input>
            <button className="signup-button" type="button" onClick={collectdata}>Signup </button>

        </div>
    )
}

export default Signup;