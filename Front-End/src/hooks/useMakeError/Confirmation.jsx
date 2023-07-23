import  { useState } from 'react'

export function Confirmation({err}) {
    const [state, setState] = useState(true); 
  return (
    <div
      className="confimation fixed w-full h-16 bottom-5 inset-x-0 z-50"
      data-state={state}
      onAnimationEnd={() => setState((prev) => false)}
    >
      <div className="flex flex-col justify-center items-center w-3/4 md:w-1/2 h-full bg-[#db4c4c] mx-auto">
        <span className="text-primary font-h1 text-lg">
          Error
        </span>
        <div className='flex gap-x-5'><span>{err}</span></div>
      </div>
    </div>
  );
}
