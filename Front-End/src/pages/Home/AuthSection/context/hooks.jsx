import { ImageContext } from "./index"
import { useContext } from "react"

export const useLoadingImage = () => useContext(ImageContext).loading.src
export const useLoadingText = () => useContext(ImageContext).loading.message
export const useTriggerLoading = (option) => {
    if(option === "IMG") return useContext(ImageContext).triggerLoadingImage
    if(option === "TEXT") return useContext(ImageContext).triggerLoadingText
    throw new Error("No option was provided")
}

export const useTextHandler = () => {
    const {message, setMessage} = useContext(ImageContext).prompt; 
    return [ message,(e) => setMessage(e.target.value)]
}

export const useTextGeneration = () => {
    const { setMessage } = useContext(ImageContext).prompt; 
    return () => setMessage("Something from Api")
}

export const useImage = () => useContext(ImageContext).img.src
export const useImageGeneration = () => {
    const { setSrc } = useContext(ImageContext).img
    return () => setSrc("https://images.unsplash.com/photo-1721908919503-a8a1106bec3a?q=80&w=2865&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")
}
// https://images.unsplash.com/photo-1721908919503-a8a1106bec3a?q=80&w=2865&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D