import { useState, useEffect } from "react";

export const useRealUser = () => {
  const [find, setRes] = useState(null)
  const API = `${import.meta.env.VITE_API}/profile`
    useEffect(()=>{
        // const makeFetch = async () => {
        //     try {
        //         const res = await fetch(API, {
        //             credentials: "include",
        //         }); 
        //         const profile = await res.json()
        //         console.log(profile); 
        //         setRes(profile); 
        //     } catch (error) {
        //         throw Error("An error ocured while fetching"); 
        //     }
        // }
        // makeFetch(); 
    },[])
    return () => find; 
}
