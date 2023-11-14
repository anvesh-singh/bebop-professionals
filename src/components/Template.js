import React from "react";
import frameImage from "../assets/frame.jpeg"
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import { FcGoogle } from "react-icons/fc";
const Template = ({title,desc1,desc2,image,formType,setIsLoggedIn})=>{
return(
   <div className="flex w-11/12 max-w-[1160px] p-12 mx-auto gap-y-4 gap-x-20 justify-between">
   <div className="w-11/12 max-w-[450px] mx-0">
      <h1 className="text-white font-semibold text-[1.875rem] leading-[2.375rem]">{title}</h1>
      <p className="text=[1.125rem] leading-[1.625rem] mt-2">
         <span className="text-white">{desc1}</span><br/>
         <span className="text-blue-600 italic">{desc2}</span>
      </p>
      {
    formType === "signup" ? (<SignupForm setIsLoggedIn={setIsLoggedIn}/>):
    (<LoginForm setIsLoggedIn={setIsLoggedIn}/>) 
      }
  <div className="flex w-full items-center my-4 gap-x-2">
   <div className="w-full h-[1px] bg-white"></div>
   <p className="text-white font-medium leading-[1.375rem]">OR</p>
   <div className="w-full h-[1px] bg-white"></div>
  </div>
  <button className="w-full flex justify-center items-center rounded-[8px] font-medium text-white px-[12px] py-[8px] mt-6 gap-x-6 border-2 border-gray-600">
   <FcGoogle/>
   <p>Sign Up with Google</p>
   </button>
   </div>
   <div className="relative w-11/12 max-w-[450px]">
           <img
     src={frameImage}
     alt="Pattern"
     width={400}
     height={400}
     loading="lazy"
     className="absolute -top-4 right-4"
     /> 
       <img
     src={image}
     alt="Students"
     width={400}
     height={400}
     loading="lazy"
     className="absolute top-12 right-4"
     /> 
  
   </div>
   </div>
)
}
export default Template;