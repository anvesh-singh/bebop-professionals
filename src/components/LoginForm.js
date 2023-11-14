import React from "react";
import { useState } from "react";
import { FiEyeOff,FiEye} from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const LoginForm = ({setIsLoggedIn})=>{
    const[formData,setFormData] = useState({email:"",password:""

    })
    const navigate = useNavigate();

    const[showPassword,setshowPassword] = useState(false);
    function changeHandler(event){
     setFormData((prevData)=>(
        {
            ...prevData,
            [event.target.name]: event.target.value,
        }
     ))
    }
    function submitHandler(event){
   event.preventDefault();
   setIsLoggedIn(true);
   toast.success("Logged In");
   const accountData ={
    ...formData
   }
   console.log("Printing the final data of login page");
   console.log(accountData);
   navigate("/dashboard");
    }
return(
<form  onSubmit={submitHandler}
className="flex flex-col w-full gap-y-6 top-20">
    <label className="w-full">
        <p className="text-[0.875rem] text-white mb-1 leading-[1.375rem] ">Email Address<sup className="text-red-600"> * </sup></p>
        <input
        required
        type="email"
        value={formData.email}
        onChange={changeHandler}
        placeholder="Enter email id"
        name="email"
        className="bg-gray-800 rounded-[0.5rem] text-white opacity-80 w-full p-[12px] border-2 border-gray-400 "
        />
    </label>
    <label className="w-full relative">
        <p className="text-[0.875rem] text-white mb-1 leading-[1.375rem] ">Password<sup className="text-red-600"> * </sup></p>
        <input
        required
        type= {showPassword ? ("text"):("password")}
        value={formData.password}
        onChange={changeHandler}
        placeholder="Enter Password"
        name="password"
        className="bg-gray-800 rounded-[0.5rem] text-white opacity-80 w-full p-[12px] border-2 border-gray-400 "
        />
         <span className="absolute right-3 top-[38px]  cursor-pointer" onClick={()=> setshowPassword((prev)=>!prev)}> 
            {showPassword ? (<FiEye fontSize={24} color="white"/>):(<FiEyeOff fontSize={24} color="white"/>)}
        </span>
        <Link to="#">
            <p className="flex justify-end text-xs mt-1 text-blue-700">Forgot Password</p>
        </Link>
    </label>
    <button className="bg-yellow-600 rounded-[80px] font-medium text-black px-[12px] py-[8px] mt-6" >
        Sign In
    </button>
</form>
)}
export default LoginForm;