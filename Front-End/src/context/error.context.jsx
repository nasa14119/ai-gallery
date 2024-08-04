import { createContext, useContext } from "react";
import { useMakeError } from "../hooks/useMakeError";

const ErrorContext = createContext(null); 

export const ErrorProvider = ({children}) => {
    const [Error, addError] = useMakeError()
    return (
        <ErrorContext.Provider value={{Error, addError}}>
            {children}
        </ErrorContext.Provider>
    )
}
export const useTriggerError = () => {
    const addError = useContext(ErrorContext).addError
    return (message) => addError(message)
}; 

export const useErrorComponent = () => useContext(ErrorContext).Error
