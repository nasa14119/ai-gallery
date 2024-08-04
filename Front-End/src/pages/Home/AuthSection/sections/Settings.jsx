import { useAuth } from "../../../../context/auth.context";

export function Settings() {
    const {user} = useAuth()
  return (
    <div className="flex flex-col justify-center">
      <h1 className="text-3xl md:text-5xl text-center select-none pointer-events-none">
        <strong className="text-5xl md:text-7xl">Welcome</strong>
        <br />
        <span>{user.username}</span>
      </h1>
    </div>
  );
}