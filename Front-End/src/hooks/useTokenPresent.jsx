
import { useEffect, useState } from "react"

export const  useTokenPresent = () => {
  const [response, setResponse] = useState(null)
  useEffect(()=>{
    (async () => {
      const res = await fetch(`${import.meta.env.VITE_API}/ai/text/is-auth`, {
        "Content-Type": "application/json", 
        credentials: "include"
      })
      const { isAuth } = await res.json(); 
      return isAuth
    })().then(v => setResponse(v))
  },[])
  return response
}
