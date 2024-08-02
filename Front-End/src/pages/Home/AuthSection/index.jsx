import "./styles.css";
import { useAuth } from "../../../context/auth.context";
import { Nav } from "../Nav";

export function AuthSection() {
  const { user } = useAuth();
  return (
    <>
      <Nav />
      <main className="h-screen w-full flex flex-col justify-center items-center">
        <h1 className="text-3xl md:text-5xl text-center select-none pointer-events-none">
          <strong className="text-5xl md:text-7xl">Welcome</strong>
          <br />
          <span>{user.username}</span>
        </h1>
      </main>
    </>
  );
}
