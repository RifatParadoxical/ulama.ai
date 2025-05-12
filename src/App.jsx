import { onAuthStateChanged } from 'firebase/auth';
import { Routes, Route, Link } from 'react-router-dom';
import { auth } from './Context/Firebase.jsx';
import { useEffect, useState } from 'react';
import SignUp from './SignUp.jsx'
import Login from './Login.jsx';
import './App.css'


export function Chat({user}){
 return(
   <div>
    <h1 style={{color:"black"}}>ulama.ai </h1>
         <div>
      {user 
      ? <p style={{color:"black"}}>Welcome, {user.email}. <br /> Thanks for joining us. <br />We will ready and notify you soon, In sha Allah! </p> 
      : <p style={{color:"black"}}>Please <Link to="/login">login</Link> or <Link to="/signup">signup</Link> first. </p>}
    </div>
   </div>
 )
}

function App() {
  const [user, setUser] = useState(null)
 useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    // Cleanup listener on unmount
    return () => unsubscribe();
  }, []);

  return (
    <>
    <Routes>
    <Route path="/signup" element={<SignUp />} />
    <Route path="/login" element={<Login />} />
    <Route path='/' element={<Chat user={user} />} />
    </Routes>
    </>
  )
}

export default App;
