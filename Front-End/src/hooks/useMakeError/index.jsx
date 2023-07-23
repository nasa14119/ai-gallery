import { useEffect, useState } from "react";
import {Confirmation} from "./Confirmation"
import "./styles.css"

export const useMakeError = () =>{
    const [error, setError] = useState(null); 
    const addError = (newError) => {
        setError(prev => newError); 
    }
    useEffect(()=> {
        if(error !== null){
            var Timer = setTimeout(() => setError(null), 2000);
        }
        return () => {
            clearTimeout(Timer);
        };
    }, [error]); 
    const Element = () => {
      if (error !== null) {
        return <Confirmation err={error} />;
      }
    };
    return [Element, addError]
}