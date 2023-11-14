import React from "react";
import signupImg from "../assets/signup.jpeg"
import Template from "../components/Template";
const Signup = ({setIsLoggedIn}) =>{
return(
    <Template
    title="Join to Learn Code"
    desc1="Build skills for today,tomorrow,and beyond."
    desc2 = "Education to future-proof your career."
    image={signupImg}
    formType="signup"
    setIsLoggedIn={setIsLoggedIn}
    />
)
}
export default Signup;