import { createContext, useState } from "react"
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