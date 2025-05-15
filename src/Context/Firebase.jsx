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