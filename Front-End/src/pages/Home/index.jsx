import SwitchTheme from "../../components/SwithTheme";
import { Button } from "./Button";
import { FollowMouse } from "../../components/FollowMouse";
import "./styles.css"
import { useAuth } from "../../context/auth.context";
import { AuthSection } from "./AuthSection";
function Home() {
  const { isAuth} = useAuth();
  if (isAuth) return <AuthSection />
  return (
    <main className="h-screen w-full flex flex-col justify-center items-center">
      <SwitchTheme />
      <h1 className="text-3xl md:text-5xl text-center select-none pointer-events-none">
        <strong className="text-5xl md:text-7xl">Welcome to your</strong>
        <br />
        <span>personal unsplash galerie</span>
      </h1>
      <div className="h-20 grid grid-cols-[repeat(2,_min(300px,_50%))] items-center justify-center mt-10 w-3/4 gap-5">
        <Button href="/login" body="Login" />
        <Button href="/register" body="Register" />
      </div>
      <FollowMouse />
    </main>
  );
}
export default Home; 