//importing modules.
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";


// initializing firebase authentication.
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDERID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
    measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
  };
const appInitial = initializeApp(firebaseConfig)
export const auth = getAuth(appInitial)
 console.log(firebaseConfig)

//exporting components & modules.
const AppContext = createContext();
export const UseAuth=()=>useContext(AppContext);
export const AppProvider =({children})=>{


return(
    <AppContext.Provider value={{auth}}>
        {children}
    </AppContext.Provider>
)

}



































// import { createContext } from "react";
// import { initializeApp } from "firebase/app";
// import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";

// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//     apiKey: "AIzaSyCuevlpqhXZtvBh8aNzieVbv0tPearzAuE",
//     authDomain: "tactoctoe-ddd39.firebaseapp.com",
//     projectId: "tactoctoe-ddd39",
//     storageBucket: "tactoctoe-ddd39.firebasestorage.app",
//     messagingSenderId: "942469692843",
//     appId: "1:942469692843:web:5c4a1bf07d2dcb183e66ee",
//     measurementId: "G-YSZ8LFJX86"
//   };

// const app = initializeApp(firebaseConfig);
// export const auth = getAuth(app)

// export const userContext = createContext();
// export const AppProvider = ({children}) =>{
//     const SignUpWithEmailAndPassword = (email, password) => {
//        return createUserWithEmailAndPassword(auth, email, password)
//     }
//     return(
//         <userContext.Provider value={ SignUpWithEmailAndPassword }>
//             {children}
//         </userContext.Provider>
//     )
// }
