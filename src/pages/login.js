
import { useState } from "react";
import { IoMdEye } from "react-icons/io";
import { IoMdEyeOff } from "react-icons/io";
import {useNavigate} from "react-router-dom";

import axios from "axios";
import "../CSS/login.css";


const Login = ()=>{

    let [username,setUsername] = useState("");
    let [password,setPassword] = useState("");

    const navigate = useNavigate();

    let loginURL = 'https://stg.dhunjam.in/account/admin/login';

    function handleSubmit(e)
    {
        e.preventDefault();
        
        if(!username || !password)
            return;

        axios({
            url:loginURL,
            method:"POST",
            data:{
                "username":username,
                "password":password,
            }
        })
        .then((data)=>{
            console.log(data.data.data);
            sessionStorage.setItem("id",data.data.data.id)
            sessionStorage.setItem("token",data.data.data.token);
            navigate("/dashboard");
        })
        .catch((err)=>{
            console.log(err)
        })
    }

    function handleView(e)
    {
        if(e.target.id == "eye")
        {
            document.getElementById("eye").style.display = "none";
            document.getElementById("not-eye").style.display = "block";

            document.getElementById("password").setAttribute("type","text");
        }else{
            document.getElementById("eye").style.display = "block";
            document.getElementById("not-eye").style.display = "none"; 

            document.getElementById("password").setAttribute("type","password");
        }
    }

    return (
        <div className="form-container">
            <h2>Venue Admin Login</h2>
            <form onSubmit={handleSubmit}>
                <div className="field-container">
                    <input type="text" id="username" className="username" value={username} onChange={(e)=>setUsername(e.target.value)} placeholder="Username"/>
                </div>
                <div className="field-container password-field">
                    <input type="password" id="password" className="password" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="Password"/>
                    <IoMdEye onClick={handleView} className="eye" id="eye"/>
                    <IoMdEyeOff onClick={handleView} className="not-eye" id="not-eye"/>
                </div>
                <button>Sign in</button>
                <div className="field-container link-container">
                    <a href="#" className="link">New Registration ?</a>
                </div>
            </form>
        </div>
    )
};


export default Login;