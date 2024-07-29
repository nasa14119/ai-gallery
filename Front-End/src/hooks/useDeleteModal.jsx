import { useState } from "react";
import Icon from "../assets/Icons/DeleteCan"
import { useImageContext } from "../context/images.context";
import { getTheme } from "../context/theme.context"

export function useDeleteModal({img, id}) {
    const [isVisible, setVisibility] = useState(false); 
    const isDark = getTheme(); 
    const { handleDelete } = useImageContext()
    const confimed = (e) => {
      e.stopPropagation()
      handleDelete(id); 
      setVisibility(prev => !prev)
    }
    const close = (e) => {
        e.stopPropagation()
        setVisibility(prev => !prev)
    }
  const Btn = () => (
    <span onClick={close}>
      <Icon className="h-5 aspect-square" />
    </span>
  );
  const Modal = () => (
    <>
      {
          isVisible && (
          <div className={`absolute inset-0 z-50 ${isDark?"bg-white":"bg-black"} flex items-center animate-fade-in`} onClick={e => e.stopPropagation()}>
            <div className="h-3/4 w-full grid [grid-template-rows:80%_1fr] grid-cols-1 gap-y-2">
              <picture className="w-full px-[10%]">
                <img src={img} alt="" className="rounded-3xl"/>
              </picture>
              <div className="flex justify-evenly items-stretch px-[10%] gap-x-4">
                <button className="bg-slate-700 w-full rounded-[2rem]" onClick={close}>Cancel</button>
                <button className="bg-red-700 w-full rounded-[2rem]" onClick={confimed}>Delete</button>
              </div>
            </div>
          </div>
          )
        }
    </>
  )
  return [Btn, Modal]
}
