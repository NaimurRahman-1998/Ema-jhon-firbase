import React, { createContext, useEffect, useState } from 'react';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";
import app from '../firebase/firebase.config';
export const AuthContext = createContext(null)

const AuthProvider = ({children}) => {
    const auth = getAuth(app)

    const [user,setUser]=useState(null)
    const [loader,setLoader]= useState(true)

    const SignUp = (email,password)=>{
        setLoader(true)
        return createUserWithEmailAndPassword(auth,email,password)
        
    }
    const LogIn = (email,password)=>{
        setLoader(true)
        return signInWithEmailAndPassword(auth,email,password)
        
    }
    const LogOut = ()=>{
        return signOut(auth)
    }
    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth, currentUser=>{
            setUser(currentUser)
            setLoader(false)
        });
        return ()=>{
            return unsubscribe();
        }
    },[])


    const authInfo = {
        user,
        SignUp,
        LogIn,
        LogOut,
        loader,
    }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;