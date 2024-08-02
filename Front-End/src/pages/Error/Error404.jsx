import "./style.css"
import { useAuth } from "../../context/auth.context";
import { getFunctionTheme, getTheme } from "../../context/theme.context";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Logout } from "../Home/Logout";
import { DashBoardIcon } from "../../assets/Icons/Dashboard";

function Navigation() {
  const isDark = getTheme();
  const handleTheme = getFunctionTheme(); 
  const { handleLogout } = useAuth();
  const [state, setState] = useState(false); 
  return (
    <nav className="h-[15vh] w-full flex justify-between items-center px-5 z-50">
      <span className="text-4xl">
        <Link to="/dashboard"><DashBoardIcon/></Link>
      </span>
      <span className="relative h-9 aspect-square flex justify-center items-center">
        <span
          className="cursor-pointer"
          onClick={() => setState((prev) => !prev)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-full aspect-square"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
        </span>
        <div
          className={`nav-controls z-50 ${
            isDark ? "bg-white text-black" : "bg-black text-white"
          }`}
          data-active={state}
        >
          <span
            className="w-9 h-9 absolute top-5 right-5 text-red-500 cursor-pointer z-50"
            onClick={() => setState((prev) => !prev)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-full aspect-square"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </span>
          <main className="absolute inset-0 flex justify-center items-center flex-col gap-y-5 text-2xl font-bold">
            <Link to="/">Home</Link>
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/dashboard/add-image">Add Image</Link>
          </main>
          <footer className="absolute right-2 bottom-5 flex justify-end items-center h-5 gap-x-5">
            <Link to="/settings">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-8 h-8"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 011.45.12l.773.774c.39.389.44 1.002.12 1.45l-.527.737c-.25.35-.272.806-.107 1.204.165.397.505.71.93.78l.893.15c.543.09.94.56.94 1.109v1.094c0 .55-.397 1.02-.94 1.11l-.893.149c-.425.07-.765.383-.93.78-.165.398-.143.854.107 1.204l.527.738c.32.447.269 1.06-.12 1.45l-.774.773a1.125 1.125 0 01-1.449.12l-.738-.527c-.35-.25-.806-.272-1.203-.107-.397.165-.71.505-.781.929l-.149.894c-.09.542-.56.94-1.11.94h-1.094c-.55 0-1.019-.398-1.11-.94l-.148-.894c-.071-.424-.384-.764-.781-.93-.398-.164-.854-.142-1.204.108l-.738.527c-.447.32-1.06.269-1.45-.12l-.773-.774a1.125 1.125 0 01-.12-1.45l.527-.737c.25-.35.273-.806.108-1.204-.165-.397-.505-.71-.93-.78l-.894-.15c-.542-.09-.94-.56-.94-1.109v-1.094c0-.55.398-1.02.94-1.11l.894-.149c.424-.07.765-.383.93-.78.165-.398.143-.854-.107-1.204l-.527-.738a1.125 1.125 0 01.12-1.45l.773-.773a1.125 1.125 0 011.45-.12l.737.527c.35.25.807.272 1.204.107.397-.165.71-.505.78-.929l.15-.894z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </Link>
            <span className="cursor-pointer" onClick={handleLogout}>
              <Logout styles="h-8 w-8" />
            </span>
            <span onClick={handleTheme} className="cursor-pointer">
              {isDark ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-7 h-7"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-7 h-7"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"
                  />
                </svg>
              )}
            </span>
          </footer>
        </div>
      </span>
      <div
          className={`${state ? "block" : "hidden"} fixed inset-0 -z-40`}
          onClick={() => setState((prev) => !prev)}
        ></div>
    </nav>
  );
}

export function Error404() {
  return (
    <>
      <Navigation/> 
      <div className="flex justify-center items-center fixed inset-0 -z-50">
        <span className="text-center">
          <h1 className="text-7xl">Error</h1>
          <h3 className="text-5xl">404</h3>
        </span>
      </div>
    </>
  );
}
