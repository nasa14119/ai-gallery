import { Link, NavLink } from "react-router-dom";
import SwitchTheme from "../../../components/SwithTheme";
export function Nav() {
  return (
    <nav className="h-[10vh] sticky top-0 flex w-full px-5 py-3 justify-between items-center settings-nav">
      <ul>
        <NavLink to="/settings/" end>
          {({ isActive }) =>
            !isActive && (
              <li className="md:h-12 flex items-center justify-center !bg-slate-400/40">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-4 md:size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 19.5 8.25 12l7.5-7.5"
                  />
                </svg>
              </li>
            )
          }
        </NavLink>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/dashboard">Dashboard</Link>
        </li>
        <li>
          <Link to="/dashboard/add-image">Add Image</Link>
        </li>
      </ul>
      <SwitchTheme isStatic />
    </nav>
  );
}
