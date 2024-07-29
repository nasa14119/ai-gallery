import { useRef, useState } from "react"
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
const PASSWORD_OPTIONS = {
  icon: <LockIcon/>, 
  key: "NewPassword", 
  first_input: {
    id: "password", 
    label: "Old Password",
    name: "password"
  }, 
  second_input: {
    id:"new-password", 
    label: "New Password",
    name: "newInformation"
  }
}
const USERNAME_OPTIONS = {
  icon: <UserIcon/>, 
  key: "NewUsername", 
  first_input: {
    id: "username",
    label: "New Username", 
    name: "newInformation"
  }, 
  second_input: {
    id:"password", 
    label: "Write Your Password", 
    name: "password"
  }
}
//"NewUsername" : "NewPassword"
export const Info = () =>{
    const form = useRef(null)
    const [options, setOptions] = useState({
      icon: <LockIcon/>, 
      key: "NewPassword", 
      first_input: {
        id: "password", 
        label: "Old Password",
        name: "password"
      }, 
      second_input: {
        id:"new-password", 
        label: "New Password",
        name: "newInformation"
      }
    }); 
    const [isVisible, setVisibility] = useState(false)
    const {addError , ErrorElement, triggerReload} = useAuth(); 
    const handleClickOption = (v) => {
      form.current.reset()
      setOptions(v === "PASSWORD" ? PASSWORD_OPTIONS : USERNAME_OPTIONS)
      setVisibility(true)
    }
    const handleSubmit = async (event) =>{
        event.preventDefault(); 
        // const form = event.target; 
        const formData = Object.fromEntries(new FormData(form.current)); 
        const body = {
          [options.key] : formData.newInformation,
          password: formData.password,
        }
        const res = await fetchUpdateData(body); 
        if (!res.ok) {
          if (res.status === 401) return addError("Wrong password");
          addError("There was an error traing to save the information");
        }
        setVisibility(false)
        triggerReload(); 
    }
    return (
      <>
          <div className="info-container">
            <div onClick={() => handleClickOption("USERNAME")}>
              <span>
                <UserIcon />
              </span>
              <h2>Username</h2>
            </div>
            <div onClick={() => handleClickOption("PASSWORD")}>
              <span>
                <LockIcon />
              </span>
              <h2>Password</h2>
            </div>
          </div>
          <div className="info-form z-50" data-isvisible={isVisible}>
            <button
              className="text-red-500 text-5xl absolute top-0 right-5 z-50 cursor-pointer"
              onClick={() => setVisibility(false)}
            >
              &times;
            </button>
            <h3>{options.icon}</h3>
            <form action="" onSubmit={handleSubmit} ref={form}>
              <label htmlFor={options.first_input.id}>
                {options.first_input.label}
              </label>
              <input type="text" name={options.first_input.name} id={options.first_input.id} />
              <label htmlFor={options.second_input.id}>
                {options.second_input.label}
              </label>
              <input type="text" name={options.second_input.name} id={options.second_input.id} />
              <button
                type="submit"
                className="text-lg py-2 px-5 bg-green-700 text-white rounded-2xl  w-full mt-auto"
              >
                Send
              </button>
            </form>
          </div>
            <div className={`fixed inset-0 ${isVisible?"block":"hidden"}`} onClick={() => setVisibility(prev => !prev)}></div>
        <ErrorElement/> 
      </>
    );
  }