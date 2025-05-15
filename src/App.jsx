import { onAuthStateChanged } from 'firebase/auth';
import { Routes, Route } from 'react-router-dom';
import { auth } from './Context/Firebase.jsx';
import { useEffect, useState } from 'react';
import Messages from './Messages.jsx';
import ForgetPass from './ForgetPass.jsx';
import SignUp from './SignUp.jsx';
import Login from './Login.jsx';
import './App.css'


export function Chat({user}){
  
 return(
     <div>
      {user 
      ? < Messages/>
      : < SignUp />
      }
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
    <Route path="/forgot" element={<ForgetPass />} />
    </Routes>
    </>
  )
}

export default App;
