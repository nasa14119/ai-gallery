import { useState } from "react"
import { useAuth } from "../../../context/auth.context"
const UserIcon = () =>{
    return (
        <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-16 h-16"
      >
        <path
          fillRule="evenodd"
          d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z"
          clipRule="evenodd"
        />
      </svg>
    )
}
const LockIcon = () =>{
    return(
        <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-16 h-16"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
        />
      </svg>
    )
}
const fetchUpdateData = async (body) => {
    console.log(body); 
    const API = `${import.meta.env.VITE_API}/profile`
    const res = await fetch(API, {
        method:"PUT", 
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body), 
        credentials:"include"
    })
    return res; 
}
export const Info = () =>{
    const [formUserName, setUsername] = useState(false); 
    const [formPassword, setPassword] = useState(false); 
    const {addError , ErrorElement, triggerReload} = useAuth(); 
    const handleSubmit = async (event) =>{
        event.preventDefault(); 
        const form = event.target; 
        const formData = Object.fromEntries(new FormData(form)); 
        const body = {password: formData.password}
        body[formUserName ? "NewUsername" : "NewPassword"] = formData.newInformation; 
        const res = await fetchUpdateData(body); 
        if(!res.ok){
            if(res.status === 401)return addError("Wrong password"); 
            addError("There was an error traing to save the information")
        }
        formUserName ? setUsername(false) : setPassword(false);
        triggerReload(); 
    }
    return (
      <>
        {!formUserName && !formPassword ? (
          <div className="info-container">
            <div onClick={() => setUsername(true)}>
              <span>
                <UserIcon />
              </span>
              <h2>Username</h2>
            </div>
            <div onClick={() => setPassword(true)}>
              <span>
                <LockIcon />
              </span>
              <h2>Password</h2>
            </div>
          </div>
        ) : (
          <div className="info-form">
            <button
              className="text-red-500 text-5xl absolute top-0 right-5 z-50 cursor-pointer"
              onClick={() => formUserName ? setUsername(false) : setPassword(false)}
            >
              &times;
            </button>
            <h3>{formUserName ? <UserIcon /> : <LockIcon />}</h3>
            <form action="" onSubmit={handleSubmit}>
              <label htmlFor="password">
                {formUserName ? "Password:" : "Old Password:"}
              </label>
              <input type="text" name="password" id="password" />
              <label htmlFor="new-password">
                {formUserName ? "New UserName:" : "NewPassword:"}
              </label>
              <input type="text" name="newInformation" id="new-password" />
              <button
                type="submit"
                className="text-lg py-2 px-5 bg-green-700 text-white rounded-2xl  w-full mt-auto"
              >
                Send
              </button>
            </form>
          </div>
        )}
        <ErrorElement/> 
      </>
    );
  }