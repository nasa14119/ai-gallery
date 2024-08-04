import "./styles.css";
import { Nav } from "../Nav";
import {ImageGeneration} from "./sections/ImageGeneration"
import { Prompt } from "./sections/Prompt";
import { Settings } from "./sections/Settings";

export function AuthSection() {
  return (
    <>
      <Nav />
      <main className="min-h-screen w-full grid grid-cols-1 md:grid-cols-2 grid-rows-2 mt-[10vh] md:mt-0 md:py-[5vh] px-[5vw] gap-y-2 gap-x-10">
        <ImageGeneration />
        <Settings/>
        <Prompt/>
      </main>
    </>
  );
}
