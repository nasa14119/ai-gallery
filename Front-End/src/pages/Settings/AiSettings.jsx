import { Nav } from "./components/Nav";
import {OpenAiToken} from "./components/OpenAiToken";
import { StableDiffusionToken } from "./components/StableDiffusionToken";

export function AiSettings() {
  return (
    <>
        <Nav/>
        <main className="max-w-[500px] mx-auto flex flex-col gap-y-4">
          <OpenAiToken/>
          <StableDiffusionToken/>
        </main>
    </>
  )
}