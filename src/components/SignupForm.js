import React from "react";
import { useState } from "react";
import { FiEyeOff,FiEye} from "react-icons/fi";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";
const SignupForm = ({setIsLoggedIn}) => {
    const navigate = useNavigate();
    const[formData,setFormData]= useState({firstname:"",lastname:"",email:"",password:"",confirmPassword:""});
    const[showPassword,setshowPassword]=useState(false);
    const[showconfirmPassword,setshowconfirmPassword]=useState(false);
    const[accountType,setaccountType] = useState("student");
    function changeHandler(event){
        setFormData((prevData)=>(
           {
               ...prevData,
               [event.target.name]: event.target.value
           }
        ))
       }
       function submitHandler(event){
   event.preventDefault();
   if(formData.password !== formData.confirmPassword){
    toast.error("Password Not Matched");
    return;
   }
  setIsLoggedIn(true);
  toast.success("Account created");
  const accountData ={
   ...formData
  }
  const finalData = {
   ...accountData,
   accountType
  }
  console.log("Printing Final account data");
  console.log(finalData);
  navigate("/dashboard");
  }
return(
<div>
{/* student instructor tab */}
<div className="flex bg-gray-700 gap-x-10 my-6 rounded-full max-w-max w-full">
 <button className={`${accountType === "student" ? "bg-black text-white" : "bg-gray-700 text-white opacity-80"} py-2 px-5 rounded-full transition-all duration-200`}
  onClick={()=>{
   setaccountType("student");
 }}>
    Student
 </button>
 <button className={`${accountType === "instructor" ? "bg-black text-white" : "bg-gray-700 text-white opacity-80"} py-2 px-5 rounded-full transition-all duration-200`}
  onClick={()=>{
   setaccountType("instructor");
 }}>
    Instructor
 </button>
</div>
<form onSubmit={submitHandler}>
<div className="flex gap-x-4 w-full">
<label className="w-full">
    <p className="text-[0.875rem] text-white mb-1 leading-[1.375rem] ">First Name<sup className="text-red-600">*</sup></p>
    <input
    required
    type="text"
    name="firstname"
    onChange={changeHandler}
    placeholder="Enter First Name"
    value={formData.firstname}
    className="bg-gray-800 rounded-[0.5rem] text-white opacity-80 w-full p-[12px] border-2 border-gray-400 "
    />
 </label>
 <label className="w-full ">
    <p className="text-[0.875rem] text-white mb-1 leading-[1.375rem] ">Last Name<sup className="text-red-600">*</sup></p>
    <input
    required
    type="text"
    name="lastname"
    onChange={changeHandler}
    placeholder="Enter Last Name"
    value={formData.lastname}
    className="bg-gray-800 rounded-[0.5rem] text-white opacity-80 w-full p-[12px] border-2 border-gray-400 "
    />
 </label>
</div>

{/* email added */}
 <label className="w-full ">
    <p className="text-[0.875rem] text-white mb-1 leading-[1.375rem] ">Email Address<sup className="text-red-600">*</sup></p>
    <input
    required
    type="email"
    name="email"
    onChange={changeHandler}
    placeholder="Enter Email Address"
    value={formData.email}
    className="bg-gray-800 rounded-[0.5rem] text-white opacity-80 w-full p-[12px] border-2 border-gray-400 "
    />
 </label>
{/* createPassword and confirmPassword */}
<div className="flex gap-x-4 w-full">
<label className="w-full relative">
    <p className="text-[0.875rem] text-white mb-1 leading-[1.375rem] ">Create Password<sup className="text-red-600">*</sup></p>
    <input
    required
    type={showPassword ? ("text") : ("password")}
    name="password"
    onChange={changeHandler}
    placeholder="Enter Password"
    value={formData.password}
    className="bg-gray-800 rounded-[0.5rem] text-white opacity-80 w-full p-[12px] border-2 border-gray-400 "
    />
      <span className="absolute right-3 top-[38px]  cursor-pointer" onClick={()=> setshowPassword((prev)=>!prev)}>
            {showPassword ? (<FiEye fontSize={24} color="white"/>):(<FiEyeOff fontSize={24} color="white"/>)}
        </span>
 </label>
 <label className="w-full relative">
    <p className="text-[0.875rem] text-white mb-1 leading-[1.375rem] ">Confirm Password<sup className="text-red-600">*</sup></p>
    <input
    required
    type={showconfirmPassword ? ("text") : ("password")}
    name="confirmPassword"
    onChange={changeHandler}
    placeholder="Confirm Password"
    value={formData.confirmPassword}
    className="bg-gray-800 rounded-[0.5rem] text-white opacity-80 w-full p-[12px] border-2 border-gray-400 "
    />
      <span className="absolute right-3 top-[38px]  cursor-pointer" onClick={()=> setshowconfirmPassword((prev)=>!prev)}>
            {showconfirmPassword ? (<FiEye fontSize={24} color="white"/>):(<FiEyeOff fontSize={24} color="white"/>)}
        </span>
 </label>
</div>

<button className="bg-yellow-600 rounded-[80px] font-medium text-black px-[12px] py-[8px] w-full mt-6">Create Account</button>
</form>


</div>


)

}

export default SignupForm;