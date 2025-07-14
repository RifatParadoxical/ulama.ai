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
 <div style={{display:"flex", justifyContent:"center", alignItems:"center",height:"100vh", width:"100vw", backgroundColor: "#f0f0f0"}} >
   { user ? <Messages /> :
   <div style={{width:"70vw", maxWidth: "500px", padding: "20px", height:"auto", backgroundColor:"#fff", borderRadius:"10px", boxShadow: "0 0 10px rgba(0,0,0,0.1)"}} >
    <h1 style={{textAlign: "center", marginBottom: "20px", color: "#333"}}>Create an account for Free!</h1>
    <form onSubmit={handleSubmit(onSubmit)} style={{display: "flex", flexDirection: "column", gap: "10px"}}>
        <input
          style={{padding: "10px", borderRadius: "5px", border: "1px solid #ccc", fontSize: "16px"}}
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
              message: "Invalid email format",
            },
          })}
          autoComplete="email"
          placeholder="Email"
        />
        {errors.email && (
          <p style={{color: "red", fontSize: "14px", marginTop: "-5px"}}>{errors.email.message}</p>
        )}
        <input
          style={{padding: "10px", borderRadius: "5px", border: "1px solid #ccc", fontSize: "16px"}}
          {...register("password", {
            required: "Password is required",
            maxLength: { value: 12, message: "Please keep it under 12 characters" },
            minLength: { value: 6, message: "Password should contain minimum 6 characters" },
          })}
          autoComplete="new-password"
          type="password"
          placeholder="Password"
        />
        {errors.password && (
          <p style={{color: "red", fontSize: "14px", marginTop: "-5px"}}>{errors.password.message}</p>
        )}

        <input
          type="submit"
          value="Sign Up"
          style={{
            backgroundColor: "#007bff",
            color: "white",
            padding: "10px 15px",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            fontSize: "16px",
          }}
        />
        <p style={{textAlign: "center"}}>
          Already have an account? <Link to="/login" style={{color: "#007bff", textDecoration: "none"}}>Log In</Link>
        </p>
        {SignUpError && <p style={{color: "red", fontSize: "16px", textAlign: "center"}}> {SignUpError.code} </p>}
      </form>
    </div>
}
  </div>
)
}

export default SignUp ;