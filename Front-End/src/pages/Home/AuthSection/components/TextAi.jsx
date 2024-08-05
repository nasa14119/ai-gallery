import { useState } from "react"
import { Spinner } from "../../../../assets/Icons/Spinner.jsx"
import { Brain } from "../../../../assets/Icons/Brain.jsx";
import { useLoadingText, useTextGeneration } from "../context/hooks.jsx";
function TextAi({className}) {
  const loading = useLoadingText()
  const generateText = useTextGeneration(); 
  return (
    <div className={`absolute ${className} p-2 bg-slate-600/40 rounded-full z-40 cursor-pointer group`} onClick={generateText}>
      <span className="absolute px-[10%] -top-5 -left-3 -right-3 text-[10px] bg-slate-600/40 rounded-3xl font-sarabun uppercase text-center invisible opacity-0 group-hover:visible duration-200 ease-in transition-all group-hover:opacity-100">Ai Prompt</span>
      <div className="h-6 aspect-square">
        {loading ? <Spinner className="animate-spin"/> : <Brain/>} 
      </div>
    </div>
  )
}

export default TextAi