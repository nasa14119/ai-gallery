import { Link } from "react-router-dom"
import SwitchTheme from "../../components/SwithTheme"
import "./styles.css"
import Loading from "../../components/Loading";
import { useRealUser } from "./hooks/useRealUser";
import {useAuth} from "../../context/auth.context"
import { Info } from "./components/Info";
import {Logout} from "../Home/Logout"
import { TrashIcon } from "./components/TrashIcon";
import { useConfirmDialog } from "./hooks/useConfirmDialog";
// TODO Delete user
export const Settings = () => {
  const {user, isLoading, handleLogout, handleDeleteUser} = useAuth(); 
  const {Dialog, showDialog} = useConfirmDialog(handleDeleteUser); 
  if(user === null || isLoading){
    return <Loading/> 
  }
  return (
    <>
      <nav className="h-[10vh] sticky top-0 flex w-full p-3 justify-between items-center settings-nav">
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/dashboard">Dashboard</Link></li>
          <li><Link to="/dashboard/add-image">Add Image</Link></li>
        </ul>
        <SwitchTheme isStatic/>
      </nav>
        <main className="h-[90vh] w-[min(100%,_800px)] mx-auto flex flex-col items-center justify-start">
          <h1 className="px-2 md:px-5 text-4xl text-left w-full">Settings {user.username}</h1>
          <Info/>
          <ul className="other-options-settings">
            <li className="bg-red-600" onClick={showDialog}>
              <span className="bg-red-800">
                <TrashIcon/> 
              </span>
              <span>Delete Acount</span>
            </li>
            <li className="bg-gray-700" onClick={() => handleLogout()}>
              <span className="bg-gray-900">
                <Logout styles="w-5 h-5"/>
              </span>
              <span>Log out of the acount</span>
            </li>
          </ul>
        </main>
        <Dialog/>
    </>
  )
}
