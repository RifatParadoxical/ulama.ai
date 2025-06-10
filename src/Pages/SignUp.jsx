import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../Context/Firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { onAuthStateChanged } from "firebase/auth";
import Messages from "./Messages"
import { Link } from "react-router-dom";

const SignUp = () =>{
    const { auth } = useContext(AppContext)
    const { register, handleSubmit, formState: {errors} } = useForm()
    const navigate = useNavigate()
    const [ SignUpError, setSignUpError ] = useState(null)
    const [ user, setUser ] = useState(null)
    const onSubmit = async (data) => {
        try {
            await createUserWithEmailAndPassword( auth , data.email, data.password )
            await console.log(data.email, data.password)
            await navigate("/")
        } catch (error) {
            setSignUpError(error)
        }
    }
    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth , (user)=>{
            setUser(user)
        })
        return unsubscribe;
    },[auth])
return(
    <div>
        { user ? <Messages /> : 
        <div>
        <h1>Create an account for Free! </h1>
        <form onSubmit={handleSubmit(onSubmit)}>
            <input {...register("email",{
                required: "Email is required" ,
                pattern: {
                    value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                    message: "Invalid email format"  
                } })} autoComplete="email" />
            {errors.email && <p style={{color:"red", fontSize:"large"}}>{errors.email.message}</p> }
            <input {...register("password",{
                required: "Password is required",
                maxLength:{ value: 12, message:"Please keep it under 12 characters"},
                minLength: { value: 6, message: "Password should contain minimum 6 characters"}
            })}
            type="password" autoComplete="password" />
            {errors.password && <p style={{color:"red", fontSize:"large"}}>{errors.password.message}</p> }
            <input type="submit" value="SignUp" />
            <p>Already have an account? <Link to="/login">Log In</Link></p>
            {SignUpError && <p style={{color:"red", fontSize:"24px"}}>{ SignUpError.code }</p> }
        </form>
        </div>
        }
    </div>
)
}

export default SignUp ;