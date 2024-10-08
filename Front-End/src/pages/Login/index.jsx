import SwitchTheme from "../../components/SwithTheme";
import {FollowMouse} from "../../components/FollowMouse";
import { Form } from "../../components/Form";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/auth.context";
import HomeLink from "../../components/HomeLink";
function Login() {
  const {ErrorElement, handleLogin} = useAuth()
  return (
    <div className="w-full h-screen flex justify-center items-center flex-col gap-y-5">
      <SwitchTheme />
      <HomeLink/> 
      <FollowMouse />
      <main className="bg-purple-600 rounded-3xl w-4/5 lg:w-[minmax(50vw, 500px)] aspect-square flex flex-col px-5 md:px-10 py-10 justify-between relative max-h-[400px] max-w-[400px]">
        <h1 className="w-20 aspect-square mx-auto">
          <svg
            fill="#ffffff"
            viewBox="0 0 16 16"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              <path d="M11.57 4.87a.62.62 0 0 0-.05.88c1 1.11 1.1 4.79.51 7.22a.63.63 0 0 0 .46.76h.15a.63.63 0 0 0 .61-.47c.6-2.48.65-6.75-.8-8.36a.63.63 0 0 0-.88-.03zM8 4.1a4.67 4.67 0 0 1 1.89.39.62.62 0 1 0 .5-1.14A5.88 5.88 0 0 0 8 2.85C5 2.85 2.57 5 2.57 7.64a13.5 13.5 0 0 1-.49 4.65.62.62 0 0 0 .34.81.52.52 0 0 0 .24.05.63.63 0 0 0 .58-.38 14.34 14.34 0 0 0 .58-5.13C3.82 5.69 5.7 4.1 8 4.1z"></path>
              <path d="M13.6 2.44A8.27 8.27 0 0 0 8 .29a8.5 8.5 0 0 0-3.7.84A.62.62 0 0 0 4 2a.63.63 0 0 0 .84.29A7.38 7.38 0 0 1 8 1.54c3.65 0 6.73 2.79 6.73 6.1a.63.63 0 0 0 .63.62.62.62 0 0 0 .64-.62 7 7 0 0 0-2.4-5.2zM2.16 3.54a.64.64 0 0 0-.87.16A7.05 7.05 0 0 0 0 7.63a.63.63 0 0 0 .62.63.62.62 0 0 0 .62-.62 5.74 5.74 0 0 1 1.08-3.23.62.62 0 0 0-.16-.87zM8 5.41a2.9 2.9 0 0 0-2.2.8.61.61 0 0 0 0 .88.62.62 0 0 0 .88 0A1.83 1.83 0 0 1 8 6.66a1.62 1.62 0 0 1 1.65 1.18c.33.93 0 4.93-.55 6.4a.63.63 0 0 0 .38.8.78.78 0 0 0 .21 0 .62.62 0 0 0 .59-.42A18 18 0 0 0 11 11a10.9 10.9 0 0 0-.12-3.53A2.87 2.87 0 0 0 8 5.41zM5.68 8.34a.62.62 0 0 0-.57.66 11.09 11.09 0 0 1-.79 4.65.62.62 0 0 0 .18.86.6.6 0 0 0 .34.11.61.61 0 0 0 .52-.29 11.93 11.93 0 0 0 1-5.43.62.62 0 0 0-.68-.56z"></path>
              <path d="M7.9 7.66a.63.63 0 0 0-.52.72 15.66 15.66 0 0 1-.78 5.95.63.63 0 0 0 .29.84.63.63 0 0 0 .83-.29 16.6 16.6 0 0 0 .9-6.71.62.62 0 0 0-.72-.51z"></path>
            </g>
          </svg>
        </h1>
        <Form func={handleLogin}/>
        <span className="absolute bottom-0 left-0 w-full text-center h-10 text-white">
            You don't have an account? <Link to="/register" className="underline">register</Link> 
        </span>
      </main>
      <ErrorElement/>
    </div>
  );
}

export default Login