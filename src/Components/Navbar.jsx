import { signOut } from "firebase/auth";
import { useContext, useState } from "react";
import { AppContext } from "../Context/Firebase";
import "../index.css"

const Navbar = () => {
    const [logoutError, setLogoutError] = useState(null)
    const { auth } = useContext(AppContext)
    const handleLogOut = async() => {
    try {
        await signOut(auth)
    } catch (error) {
        setLogoutError(error)
    }
}

    return(
        <div style={{position:"absolute", width:"100vw", display:"flex"}}>
            <img style={{height:"48px", position:"absolute",left:"3px", top:"7px", aspectRatio:"1/1"}} src="/ulama-ai.svg" alt="Ulama Ai Logo" srcSet="/ulama-ai.svg" />
            <button style={{backgroundColor:"red", position:"absolute",right:"5px", top:"10px", color:"white", border:"none", borderRadius:"4px", padding:"12px", fontSize:"14px"}}
            onClick={handleLogOut} >Logout</button>
            { logoutError && <p> {logoutError.code} </p> }
        </div>
    )
}

export default Navbar;