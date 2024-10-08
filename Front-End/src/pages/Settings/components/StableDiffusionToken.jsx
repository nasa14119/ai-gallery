import { useState } from "react";
import { EyeClose, EyeOpen } from "../assets/Eyes";
import img from "../assets/StableDiffusionIcon.png";
export function StableDiffusionToken({ token, setToken }) {
  const [edit, setEdit] = useState(!token);
  return (
    <div className="font-sarabun text-xl flex flex-col gap-y-2">
      <span className="flex h-10 items-center gap-x-2 p-1">
        <img src={img} alt="" className="h-full" />
        <span className="text-slate-400 capitalize">
          Stable Diffusion Token (coming soon)
        </span>
      </span>
      <span className="text-base px-5 border border-slate-400 rounded-2xl py-2 flex relative items-center">
        <span className="pr-2 text-slate-500">Token:</span>
        {edit ? (
          <input
            type="text"
            className="text-[12px] bg-transparent  w-[85%] border-none outline-none caret-slate-600 text-slate-400"
            value={token}
            onChange={setToken}
          />
        ) : (
          <>
            {token && <span className="select-none">・・・・・・・・・・</span>}
          </>
        )}
        <span
          className="w-[5%] cursor-pointer aspect-square absolute right-2 text-slate-400"
          onClick={() => setEdit((prev) => !prev)}
        >
          {edit ? <EyeOpen /> : <EyeClose />}
        </span>
      </span>
    </div>
  );
}
