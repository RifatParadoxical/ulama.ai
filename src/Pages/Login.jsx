import { useForm } from "react-hook-form";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../Context/Firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import Messages from "./Messages";
import { Link } from "react-router-dom";

const Login = () =>{
    const {register, handleSubmit, formState: {errors} } = useForm()
    const { auth } = useContext(AppContext)
    const navigate = useNavigate()
    const [logError, setlogError] = useState(null)
    const [ user, setUser ] = useState(null)
    const onSubmit = async (data) => {
      try {
        await signInWithEmailAndPassword(auth, data.email, data.password)
        await navigate("/")
      } catch (error) {
        setlogError(error.code)
      } 
    }
    useEffect(()=>{
      const unsubscribe = onAuthStateChanged( auth , (user)=>{
        setUser(user)
      })
      return unsubscribe;
    })
 return(
   <div>
   { user ? <Messages /> :
   <div>
<h1>Welcome Back ! </h1>
<form onSubmit={handleSubmit(onSubmit)}>
<input {...register("email", {
  required: "Email is required",
  pattern: {
    value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
    message: "Invalid email format"  
  } })}
  autoComplete="email" />
  { errors.email &&  <p style={{color:"red", fontSize:"large"}}>{errors.email.message}</p> }
  <input {...register("password", {
    required: "Password is required",
    maxLength:{ value: 12, message:"Please keep it under 12 characters"},
    minLength: { value: 6, message: "Password should contain minimum 6 characters"}
  })}
  autoComplete="current-password"
  type="password" />
  { errors.password && <p style={{color:"red", fontSize:"large"}}>{errors.password.message}</p> }
  <Link to="/forget-password">Forget password? </Link>
  <input type="submit" value="Log In"/>
  <p>Don't have an Account? <Link to="/signup">Sign Up</Link></p>
  {logError && <p style={{color:"red", fontSize:"24px"}}> {logError.code} </p> } 
  </form>
  </div>
}
  </div> 
)
}

export default Login ;