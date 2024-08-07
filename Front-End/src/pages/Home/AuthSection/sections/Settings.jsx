import { useAuth } from "../../../../context/auth.context";
import { OpenWarning } from "../components/OpenWarning";

export function Settings() {
    const {user} = useAuth()
  return (
    <div className="flex flex-col justify-center relative">
      <h1 className="text-3xl md:text-5xl text-center select-none pointer-events-none">
        <strong className="text-5xl md:text-7xl">Welcome</strong>
        <br />
        <span>{user.username}</span>
      </h1>
      <OpenWarning className={"bottom-5 right-5"}/>
    </div>
  );
}