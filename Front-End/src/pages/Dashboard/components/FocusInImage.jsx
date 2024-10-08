import { useEffect, useState } from "react";
import { useImageContext } from "../../../context/images.context";
import { getTheme } from "../../../context/theme.context";
import { Link } from "react-router-dom";
import { BtnOpenNewPage } from "../../../components/BtnOpenNewPage";
export function FocusInImage() {
  const [isVisible, setVisibility] = useState(false);
  const isDark = getTheme();
  const { focusImage, setFocus , setLink, linkCopied} = useImageContext();
  useEffect(() => {
    if (!focusImage && isVisible) return setVisibility(false);
    if (focusImage) return setVisibility(true);
  }, [focusImage]);

  if (isVisible && focusImage)
    return (
      <div
        className="fixed inset-0 flex justify-center items-center z-50"
        onClick={() => setFocus(null)}
      >
        <div
          className={`max-h-[80%] ${focusImage.size === "tall" ? "h-[90%] md:w-1/2 aspect-[9/16] max-w-[500px]" : "w-[90%] h-[80%] md:w-3/4 aspect-square max-w-[750px]"} relative rounded-3xl -z-50 text-white focusImage ${
            isDark ? "bg-white" : "bg-black"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <button
            className="text-red-500 text-5xl absolute top-0 right-5 z-50 cursor-pointer"
            onClick={() => setFocus(null)}
          >
            &times;
          </button>
          <main className="md:px-5 md:py-5 gap-x-5 h-full relative">
            <div className="absolute inset-2 md:inset-10 overflow-hidden rounded-3xl">
              <div className="bg-slate-700/50 absolute inset-0"></div>
              <img
                src={focusImage.src}
                alt=""
                className="object-cover min-h-full w-full relative -z-40 object-center"
              />
              <div className="h-10 w-10 absolute right-5 bottom-5 opacity-70 p-2 bg-black/60 rounded-full">
                <BtnOpenNewPage href={focusImage.src}/>
              </div>
              <aside className="z-40 py-6 px-2 absolute inset-y-0 w-full md:w-1/2">
                <ul className="flex flex-col ">
                  <li className="odd:font-bold even:text-[0.9rem]">Title:</li>
                  <li className="odd:font-bold even:text-[0.9rem]">
                    {focusImage.title}
                  </li>
                  <li className="odd:font-bold even:text-[0.9rem]">Size:</li>
                  <li className="odd:font-bold even:text-[0.9rem] capitalize">
                    {focusImage.size}
                  </li>
                  <li className="odd:font-bold even:text-[0.9rem]">Src:</li>
                  <li className="odd:font-bold even:text-[0.9rem] peer">
                    <button
                      className="w-full text-ellipsis max-h-20 overflow-hidden text-left whitespace-nowrap"
                      onClick={(e) => {
                        e.stopPropagation();
                        setLink(focusImage.src);
                        navigator.clipboard.writeText(focusImage.src);
                      }}
                    >
                      {focusImage.src}
                    </button>
                  </li>
                  <span className="text-[0.8rem] peer-hover:visible invisible mt-5 mx-auto text-center bg-black/60 rounded-3xl px-2 py-1">
                    {linkCopied === focusImage.src ? "Copied" : "Click to Copy"}
                  </span>
                </ul>
                <Link to={`edit/${focusImage._id}`}>
                  <div className="cursor-pointer absolute bottom-5 rounded-3xl w-1/2 bg-black/60 text-center py-2">
                    Edit
                  </div>
                </Link>
              </aside>
            </div>
          </main>
        </div>
      </div>
    );
}
