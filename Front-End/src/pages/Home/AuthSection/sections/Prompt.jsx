import { useState } from "react";
import TextAi from "../components/TextAi";
import { useTextHandler } from "../context/hooks";

export function Prompt() {
  const [prompt, setPrompt] = useTextHandler();
  return (
    <div className="border-2 border-gray-400/40 p-2 rounded-3xl grid grid-rows-[auto_1fr] relative">
      <span>Prompt :</span>
      <div className="">
        <textarea
          name=""
          id=""
          value={prompt}
          onChange={setPrompt}
          className="w-full h-full bg-transparent outline-none resize-none font-sarabun-extralight"
        ></textarea>
      </div>
      <TextAi className="right-5 bottom-3"/>
    </div>
  );
}
