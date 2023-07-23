import { useEffect, useRef, useState } from "react"
import { useImageContext } from "../../../context/images.context"

export function HandleLoad() {
    const {changePage} = useImageContext()
    const onBottom =useRef(); 
    const isIntersecting = useIsVisible(onBottom); 
    useEffect(() =>{
        if(isIntersecting){
            changePage()
        }        
    }, [isIntersecting])
    return <div ref={onBottom} className="p-5"></div>
}
const useIsVisible = (element) => {
    const [isIntersecting, setIntersecting] = useState(false);
    useEffect(()=>{
        const observer = new IntersectionObserver(([entry])=>{
            setIntersecting(entry.isIntersecting)
        }); 
        observer.observe(element.current)
        return () => {
            observer.disconnect();
        };
    },[element])
    return isIntersecting; 
}
