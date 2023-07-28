import { useState } from "react";
import { useAuth } from "../context/auth.context";
import {useNavigate} from "react-router-dom"
const URL = `${import.meta.env.VITE_API}/images`

const callDb = async () => {
  return await fetch(URL, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });
};

async function getImagesFromDb(addError, navigate){
  let res; 
  try {
    res = await callDb();
    res = await res.json();
    res = res.reverse();
  } catch (error) {
    addError("There was an error while geting images");
    navigate("/login")
  }
  return res; 
}

export function useImages() {
  const [data, setFetch] = useState(null);
  const navigate = useNavigate();  
  const {addError,handleLogout } = useAuth()
  const makeFetch = async () => {
    let res = await callDb(); 
    if(res.status !== 200){
      addError("There was an error"); 
      handleLogout(); 
      navigate("/login"); 
      return
    }
    res = await res.json()
    setFetch(() => res.reverse());
  };
  return {data , makeFetch}
}
