import { Link } from "react-router-dom";
import "./styles.css";
import Loading from "../../components/Loading";
import { useAuth } from "../../context/auth.context";
import { Info } from "./components/Info";
import { useConfirmDialog } from "./hooks/useConfirmDialog";
import { Nav } from "./components/Nav";

export const Settings = () => {
  const { user, isLoading, handleLogout, handleDeleteUser } = useAuth();
  const { Dialog, showDialog } = useConfirmDialog(handleDeleteUser);
  if (user === null || isLoading) {
    return <Loading />;
  }
  return (
    <>
      <Nav/>
      <main className="h-[90vh] w-[min(100%,_800px)] mx-auto flex flex-col items-center justify-start font-sarabun">
        <h1 className="px-4 md:px-5 text-2xl md:text-4xl text-left w-full font-sarabun font-bold">
          Settings {user.username}
        </h1>
        <Info />
        <ul className="other-options-settings">
          <li className="bg-red-600" onClick={showDialog}>
            <span className="bg-red-800">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                />
              </svg>
            </span>
            <span>Delete Acount</span>
          </li>
          <li className="bg-gray-600/40" onClick={() => handleLogout()}>
            <span className="bg-gray-900">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15"
                />
              </svg>
            </span>
            <span>Log out of the acount</span>
          </li>
          <Link to="/settings/ai">
            <li className="bg-gray-600/40">
              <span className="bg-gray-900">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m6.75 7.5 3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0 0 21 18V6a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 6v12a2.25 2.25 0 0 0 2.25 2.25Z"
                  />
                </svg>
              </span>
              <span>Ai Setup</span>
            </li>
          </Link>
        </ul>
      </main>
      <Dialog />
    </>
  );
};
