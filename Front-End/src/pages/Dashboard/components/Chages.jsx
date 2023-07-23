import { useState} from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/auth.context";
const SIZES = ["thick", "tall", "big", ""]

export function Changes({initialImg , initialTitle , initialSize, changeDb}) {
  const [newImage, setImage] = useState(initialImg ?? ""); 
  const [title, setTitle] = useState(initialTitle?? ""); 
  const [currentSize, setSize] = useState(initialSize ?? ""); 
  const { addError } = useAuth()
  const navigate = useNavigate()
  const handleUrlRezice = e => {
    const textarea = e.target
    textarea.style.height = "auto"
    let scrollHeight = e.target.scrollHeight; 
    textarea.style.height = `${scrollHeight}px`
  }
  const handleSubmit = (e) => {
    e.preventDefault(); 
    const opt = {}
    if(!newImage) return addError("link must be provided"); 
    opt.src = newImage; 
    title ? opt.title = title : opt.title = "No-title"
    opt.size = currentSize 
    changeDb(opt); 
  }
  // https://designyoutrust.com/wp-content/uploads/2019/01/000-1.jpg
  return (
    <>
      <main className="grid grid-cols-1 grid-rows-2 md:grid-cols-[minmax(300px,_1fr)_1fr] md:grid-rows-1 p-10 h-[80vh]">
        <aside className="w-full h-full grid grid-cols-[repeat(2,_50%)] grid-rows-[repeat(2,_50%)] md:max-w-[700px] md:mx-auto bg-[#63696c]/30 rounded-[10px]">
          <div
            className={`flex h-full w-full bg-[#63696c] overflow-hidden rounded-[10px] relative change-${currentSize}`}
          > 
            {newImage && (
              <img
                src={newImage}
                id="img-load"
                alt="Error in the link"
                loading="lazy"
                className="w-full h-full object-cover addimage-display object-[75%_top]"
              />
            )}
            {title && (
              <div className="absolute left-5 bottom-5 text-white text-3xl">
                {title}
              </div>
            )}
          </div>
        </aside>
        {/* https://images.pexels.com/photos/933054/pexels-photo-933054.jpeg?cs=srgb&dl=pexels-joyston-judah-933054.jpg&fm=jpg */}
        <form action="" className="container-addimage" onSubmit={handleSubmit}>
          <span className="url-span">Url <i className="text-red-500 not-italic align-text-top">٭</i></span>
          <label htmlFor="img" className="textarea-label pt-2">
            <textarea
              rows="1"
              name="img"
              id="img"
              value={newImage}
              placeholder=" "
              onKeyUp={handleUrlRezice}
              onChange={(e) => setImage(e.target.value)}
            ></textarea>
          </label>
          <label htmlFor="title">
            <input
              type="text"
              name="title"
              id="title"
              placeholder="No-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <span>Title</span>
          </label>
          <ul>
            {SIZES.map((size, i) => (
              <li
                key={`button-#${i}`}
                data-size={size === currentSize}
                className="button-li"
              >
                <button type="button" onClick={() =>{setSize(size)}}>
                  {size ? size : "unset"}
                </button>
              </li>
            ))}
          </ul>
          <button
            type="submit"
            className="text-lg py-2 px-5 bg-green-700 text-white rounded-2xl"
          >
            Save
          </button>
        </form>
      </main>
    </>
  );
}