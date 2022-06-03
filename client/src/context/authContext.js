import React, {useReducer, useContext, useEffect, useState} from "react";
import {createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  GoogleAuthProvider,
signInWithPopup} from "firebase/auth"
import {auth} from "../firebase"

//creamos la store
const authContext = React.createContext();
//useContext me devuelve el array con el estado del store y la funcion dispatch que me permite modif el store
export const useAuth = () => {
  const context =  useContext(authContext);
  if (!context) throw new Error("There is no Auth Provider")
  return context
}

export function AuthProvider({ children }){
  const [user, setUser] = useState()
  const [loading, setLoading] = useState(true)

  const signup = async (email, password) =>{
  await createUserWithEmailAndPassword(auth, email, password)
  }

  const login = async (email, password)=>{
    const userCredentials = await signInWithEmailAndPassword(auth, email, password)
    console.log(userCredentials)
    return userCredentials
  }

  useEffect(()=>{
    onAuthStateChanged(auth, currentUser=>{
      setUser(currentUser)
      setLoading(false)
    })
  },[])

  const logout = async ()=>{
    await signOut(auth)
  }

  const loginWithGoogle = ()=>{
    const googleProvider = new GoogleAuthProvider()
    signInWithPopup(auth, googleProvider)
  }


  return (<authContext.Provider value={{signup, login, user, logout, loading, loginWithGoogle}}>{children}</authContext.Provider>);
};
