import { useMakeError } from "../hooks/useMakeError";
import {createContext, useContext, useEffect, useState} from "react"
import {fetchRegister, fetchLogin, fetchLogout, VerifyToken} from "../utils/auth"
import Cookies from "js-cookie";

export const AuthContext = createContext(); 

export const useAuth = () =>{
    const context = useContext(AuthContext); 
    if(!context) throw Error("The Element cant acces the context"); 
    return context; 
}; 
const VerifyAuth = async () => {
  try {
    const res = await VerifyToken(); 
    const userFound = await res.json()
    return userFound; 
  }catch{
    return null
  } 
}
export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(async () => {
      setLoading(true);
      const cookies = Cookies.get();
      if (!cookies.token) {
        setAutentification(false);
        setLoading(false);
        return null;
      }
      const res = await VerifyAuth();
      if (res !== null) {
        setAutentification(true);
      }
      setLoading(false);
      return res;
    }); 
    const [isAuth, setAutentification] = useState(false); 
    const [isLoading, setLoading] = useState(true); 
    const [ErrorElement, addError] = useMakeError(); 
    const handleRegistration = async (obj) => {
      const {status, data} = await fetchRegister(obj);
      if (status !== 200) {
        addError(data.message);
        return
      }
      if(!data) return addError("Error in connection with server"); 
      setUser(data);
      setAutentification(true);
    };
    const handleLogin = async (obj) => {
      const { status, data } = await fetchLogin(obj);
      if(!data) return addError("Error in connection with server"); 
      if (status !== 200) {
        addError(data.message);
        return;
      }
      setUser(data);
      setAutentification(true);
    };
    const handleLogout = async () => {
      const status = await fetchLogout(); 
      if(status === 200){
        setUser(null);
        setAutentification(false);
      }
    }
    useEffect(()=>{
      const cookies = Cookies.get();
      if(!cookies.token) {
        setAutentification(false); 
        setUser(null); 
        setLoading(false); 
        return 
      }
      setUser(async () => {
        const res = await VerifyAuth(); 
        if(res !== null){
          setAutentification(true); 
        }
        setLoading(false); 
        return res; 
      })
    }, [])
    const triggerReload = async () =>{
      setLoading(true); 
      try {
        const res = await VerifyToken(); 
        const userFound = await res.json()
        setAutentification(true); 
        setUser(userFound); 
      } catch (err) {
        setAutentification(false);
      }
      setLoading(false); 
    }
    const handleDeleteUser = async () => {
      setLoading(true); 
      const API = `${import.meta.env.VITE_API}/profile`
      const res = await fetch(API, {method:"DELETE", credentials:"include"}); 
      const parse = await res.json()
      if(!parse) return;
      setLoading(false); 
      setAutentification(false); 
      addError(`${parse.user} have been deleted`); 
    }
    return (
      <AuthContext.Provider
        value={{
          handleRegistration,
          handleLogin, 
          handleLogout, 
          ErrorElement,
          addError,
          user,
          isAuth,
          isLoading,
          triggerReload, 
          handleDeleteUser
        }}
      >
        {children}
      </AuthContext.Provider>
    );
}