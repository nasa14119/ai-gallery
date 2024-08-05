import { useRef } from "react";
import { useImage } from "../context/hooks";

export function ImageAi() {
  const img = useRef(null)
  const src = useImage(); 
  return (
    <div className={`overflow-hidden absolute inset-0 rounded-[4rem] -z-40`}>
      <PlaceHolder />
      <picture className="absolute inset-0">
        <img
          src={src}
          alt=""
          className="object-cover opacity-0"
          ref={img}
          onChange={() => img.current.classList.remove("animation-load")}
          onLoad={() => img.current.classList.add("animation-load")}
        />
      </picture>
    </div>
  );
}
function PlaceHolder() {
  return (
    <div className={`absolute inset-0 -z-50 flex justify-center items-center bg-slate-500/60 opacity-20`}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-1/3 aspect-square"
      >
        <path d="M2.9918 21C2.44405 21 2 20.5551 2 20.0066V3.9934C2 3.44476 2.45531 3 2.9918 3H21.0082C21.556 3 22 3.44495 22 3.9934V20.0066C22 20.5552 21.5447 21 21.0082 21H2.9918ZM20 15V5H4V19L14 9L20 15ZM20 17.8284L14 11.8284L6.82843 19H20V17.8284ZM8 11C6.89543 11 6 10.1046 6 9C6 7.89543 6.89543 7 8 7C9.10457 7 10 7.89543 10 9C10 10.1046 9.10457 11 8 11Z"></path>
      </svg>
    </div>
  );
}