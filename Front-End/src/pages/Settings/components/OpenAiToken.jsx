import { useState } from "react";
import { DeleteCan } from "../../../assets/Icons/DeleteCan"
import { OpenAiIcon } from "../assets/OpenAiIcon";
import { EyeClose, EyeOpen } from "../assets/Eyes";
export function OpenAiToken({ token, setToken, delteToken}) {
  const [edit, setEdit] = useState(!token);
  return (
    <div className="font-sarabun text-xl flex flex-col gap-y-2">
      <span className="flex h-10 items-center gap-x-2">
        <OpenAiIcon className="h-full aspect-square text-green-600/40 " />
        <span className="text-slate-400 capitalize">Open Ai Token</span>
      </span>
      <span className="text-base px-5 border border-slate-400 rounded-2xl py-2 flex relative items-center">
        <span className="pr-2 text-slate-500">Token:</span>
        {edit ? (
          <input
            type="text"
            value={token}
            onChange={setToken}
            className="text-[12px] bg-transparent  w-[85%] border-none outline-none caret-slate-600 text-slate-400"
          />
        ) : (
          (
            <>
              {token && <span className="select-none">・・・・・・・・・・</span>}
            </>
          )
        )}
        <span
          className="w-[5%] cursor-pointer aspect-square absolute right-2 text-slate-400"
          onClick={() => setEdit((prev) => !prev)}
        >
          {edit ? <EyeOpen /> : <EyeClose />}
        </span>
        <span
          className="w-[5%] cursor-pointer aspect-square absolute right-10 text-slate-400"
          onClick={delteToken}
        >
          <DeleteCan/>
        </span>
      </span>
    </div>
  );
}
