import { createContext, useEffect, useState } from "react"
import { useTriggerError } from "../../../../context/error.context";

const inicialContext = {
    img: {
        src: "",
    }, 
    prompt: {
        message:""
    }
}
export const ImageContext = createContext(inicialContext);

export const ImageProvider = ({children}) => {
    const [src, setSrc] = useState({}); 
    const [message, setMessage]  = useState(""); 
    const [loading, setLoading] = useState({message: false, src: false}); 
    const triggerLoadingImage = () => {
      setLoading((prev) => ({ ...prev, src: !prev.src }));
    };
    const triggerLoadingText = () => {
      setLoading((prev) => ({ ...prev, message: !prev.message }));
    };
    useEffect(() =>{
        const fetchCache = async () => {
            const API = `${import.meta.env.VITE_API}/ai/cached-image`
            const response = await fetch(API, {
              credentials: "include",
            });
            if(response.status !== 200) throw new Error("Something went erong sending the request")
            const blob = await response.blob(); 
            return URL.createObjectURL(blob)
        }
        fetchCache().then(v => setSrc(v))
    },[])
    const VALUES = {
        img: {
            src, 
            setSrc
        },
        prompt: {
            message, 
            setMessage
        },
        loading, 
        triggerLoadingImage, 
        triggerLoadingText
    }
    return (
        <ImageContext.Provider value={VALUES}>
            {children}
        </ImageContext.Provider>
    )
}