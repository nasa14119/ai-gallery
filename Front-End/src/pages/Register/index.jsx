import SwitchTheme from "../../components/SwithTheme";
import {FollowMouse} from "../../components/FollowMouse";
import { Form } from "../../components/Form";
import { Link, useNavigate } from "react-router-dom";
import RegisterIcon from "../../assets/Icons/register-icon.svg"
import { useAuth } from "../../context/auth.context";
import HomeLink from "../../components/HomeLink";
function Register() {
  const {handleRegistration, ErrorElement, isAuth} = useAuth()
  const navigate = useNavigate(); 
  return (
    <div className="w-full h-screen flex justify-center items-center flex-col gap-y-5">
      <SwitchTheme />
      <HomeLink/> 
      <FollowMouse />
      <main className="bg-purple-600 rounded-3xl w-7/8 md:w-[minmax(50vw, 500px)] aspect-square flex flex-col p-10 justify-between relative">
        <h1 className="w-20 aspect-square mx-auto">
          <img src={RegisterIcon} alt="Icon of a pen and paper" />
        </h1>
        <Form func={(obj) =>{
            handleRegistration(obj); 
            if(isAuth){
              navigate("/dashboard"); 
            }
          }}/>
        <span className="absolute bottom-0 left-0 w-full text-center h-10 text-white">
          Already have an account?{" "}
          <Link to="/login" className="underline">
            log in
          </Link>
        </span>
      </main>
      <ErrorElement/> 
    </div>
  );
}

export default Register