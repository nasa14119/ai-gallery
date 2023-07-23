import {useAuth} from "../../context/auth.context"
import MainImages from "./components/MainImages";
import "./styles.css"
import { ImagesProvider } from "../../context/images.context";
function Dashboard() {
  const {user} = useAuth(); 
  return (
    <div className="min-h-[100vh] flex flex-col">
      <div className="w-full px-5">
        <h2 className="text-xl font-bold">
          Welcome {user.username}
        </h2>
      </div>
      <ImagesProvider>
        <MainImages/> 
      </ImagesProvider>
    </div>
  )
}

export default Dashboard