import React, { useEffect, useState } from "react";
import {useNavigate} from "react-router-dom";
import ConfigApi from "./ConfigApi";

const Login = ()=> {
    const [email , setEmail] = useState("");
    const [password , setPassword] = useState("");
    const [msg , setMsg] = useState("");
    useEffect(()=>{
        const auth = localStorage.getItem('user');
        if(auth) {navigate('/')} ;
    }
    );
    const navigate = useNavigate();
    const collectdata= async ()=>{
        let result =  await fetch(`${ConfigApi.ApiUrl}/login` , {
            method:'post', 
            body: JSON.stringify({email, password}),
            headers: {
                'Content-Type' : 'application/json'
            }
        });
        result =  await result.json();
        if(result.result){
            console.warn(result.result);
            let ans = <p className="login-error">{result.result}</p>
            setMsg(ans);

        }
        else{
            localStorage.setItem("user" , JSON.stringify(result));
            navigate('/');
        }
        
    }
    return(
        <div className="login">
            <h1>LOGIN</h1>
            {msg}
            <input type="text" placeholder="Enter Emial" value={email} onChange={(e)=>{setEmail(e.target.value)}}></input>
            <input type="text" placeholder="Enter Password" value={password} onChange={(e)=>{setPassword(e.target.value)}}></input>
            <button className="login-button" type="button" onClick={collectdata}>Login </button>

        </div>
    )
}

export default Login ;  