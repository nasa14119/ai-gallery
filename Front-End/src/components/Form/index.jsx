
import { useEffect, useState } from "react"
import "./styles.css"
import EyeClose from "./assets/eye-close.svg"
import EyeOpen from "./assets/eye-open.svg"
import {useForm} from "react-hook-form"
import {z} from "zod"
import { useAuth } from "../../context/auth.context"
const parseData = (values) => {
  const schema = z.object({
    username: z.string({
        required_error: "Username is required"
    }), 
    password: z.string({
        required_error: "Password is required"
    }).min(10 , {
        message: "Password must be of minimun 10 caracters"
    })
  })
  let response = {
    isFine: false, 
    message: ""
  }
  try {
    schema.parse(values);
    response.isFine = true; 
  } catch (errors) {
    response = {
      isFine: false, 
      message: errors.errors.map(error => error.message)
    }
  }
  return response
}
function sleep(time) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('done!');
    }, time);
  });
}
export const Form = ({func}) => {
  const {addError} = useAuth(); 
  const {register, handleSubmit, formState:{errors}} = useForm()
  const [showPassword, setState] = useState(false); 
  const [isLoading, setLoading ] = useState(false); 
  const handleInput = handleSubmit((values) => {
    setLoading(true);
    const { isFine, message } = parseData(values);
    if (!isFine) return addError(message.join(" - "));
    try {
      func(values);
    } catch (error) {
      sleep(500).then(() => setLoading(false))  
    }
  });
  useEffect(() =>{
    if(Object.entries(errors).length > 0){
      const formError = Object.entries(errors); 
      const message = formError.map(e => `${e[0]} is required`); 
      addError(message.join(" - "));  
    }
  }, [errors])
  return (
    <form className="form" onSubmit={handleInput}>
      <label htmlFor="username">
        <input
          {...register("username", { required: true })}
          type="text"
          name="username"
          autoComplete="username"
          id="username"
          maxLength={20}
          placeholder=" "
        />
        <span>User Name</span>
      </label>
      <label htmlFor="password">
        <input
          {...register("password", { required: true })}
          type={showPassword ? "text" : "password"}
          name="password"
          autoComplete="password"
          id="password"
          placeholder=" "
          maxLength={20}
        />
        <span>Password</span>
        <div
          className="absolute right-2 bottom-[5px] w-[30px] aspect-square cursor-pointer "
          onClick={() => setState((prev) => !prev)}
        >
          {showPassword ? (
            <img src={EyeOpen} width="40px" height="40px" />
          ) : (
            <img src={EyeClose} width="40px" height="40px" />
          )}
        </div>
      </label>
      <div className="submitContainer relative">
        <div
          className="background absolute inset-y-0 inset-x-auto"
          data-loading={isLoading}
        ></div>
        {isLoading ? (
          <div className="loader">
            <span className="bar"></span>
            <span className="bar"></span>
            <span className="bar"></span>
          </div>
        ) : (
          <button type="submit" onClick={()=> console.log("Button Click")}> Send </button>
        )}
      </div>
    </form>
  );
}
