import { useMakeError } from "../hooks/useMakeError";
import {createContext, useContext, useEffect, useState} from "react"
import {fetchRegister, fetchLogin, fetchLogout, VerifyToken} from "../utils/auth"
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

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
  const [isLoading, setLoading] = useState(true); 
  const [isAuth, setAutentification] = useState(false); 
  const navigate = useNavigate()
  const [user, setUser] = useState(null); 
  const [ErrorElement, addError] = useMakeError(); 
    const handleRegistration = (obj) => {
      return new Promise(async (resolve, reject)=>{
        const {status, data} = await fetchRegister(obj); 
        if(!data){
          return reject(addError("Error in connection with server"))
        } 
        if (status !== 200) {
          return reject(addError(data.message)); 
        }
        setUser(data);
        setAutentification(true);
        navigate("/dashboard");
        resolve(data); 
      })
    };
    const handleLogin = async (obj) => {
      try {
        const { status, data } = await fetchLogin(obj);
        if(!data){
          addError("Error in connection with server")
          throw new Error("No information found")
        }
        if (status !== 200) {
          addError(data.message)
          throw new Error("Someting whent wrong in the fetch request")
        }
        setUser(data);
        setAutentification(true);
        navigate("/dashboard");
      } catch (error) {
        console.log(error)
      }
    };
    const handleLogout = async () => {
      try {
        const status = await fetchLogout(); 
        if(status === 200){
          setUser(null);
          setAutentification(false);
        }
      } catch (error) {
        addError(error.message)
      }
    }
    const triggerReload = async () =>{
      setLoading(true); 
      try {
        const res = await VerifyToken(); 
        const userFound = await res.json()
        setAutentification(true); 
        setUser(userFound); 
      } catch (err) {
        addError(err.message)
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
    useEffect(() => {
      const checkForCookies = async () => {
        setLoading(true);
        const cookies = Cookies.get();
        //If token is not in the cookies
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
      };
      checkForCookies().then((v) => setUser(v));
    }, []);
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