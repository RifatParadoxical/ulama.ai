import { onAuthStateChanged } from "firebase/auth";
import { useContext } from "react";
import { useState, useEffect } from "react";
import { AppContext } from "../Context/Firebase";
import Login from "./Login";
import Navbar from "../Components/Navbar"
import Chats from "../Components/Chats";
import ChatList from "../Components/ChatList";
import "../index.css"

const Messages = () =>{
const { auth } = useContext(AppContext)
const [ user, setUser] = useState(null)
useEffect(() => {
 const unsubscribe = onAuthStateChanged(auth, (user)=>{
    setUser(user)
 })
 return unsubscribe;
}, [auth])


return(
    <div>
    {user ? 
    <div>
        <Navbar />
        <div style={{display:"flex", }}>
        <ChatList />
        <Chats />
        </div>
        
    </div> 
    : <Login />}
    </div>
)
}

export default Messages ;