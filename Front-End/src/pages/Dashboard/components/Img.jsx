import { useEffect, useRef, useState} from "react";
import placeHolderImg from "../../../assets/img/placeholder-600x400-300x200.webp";
import { useImageContext } from "../../../context/images.context";
import { Link } from "react-router-dom";
import PendEdit from "../../../assets/Icons/PendEdit";
import { useDeleteModal } from "../../../hooks/useDeleteModal";

export function Img({ img, index }) {
  const {setFocus} = useImageContext(); 
  const [DeleteBtn, Modal] = useDeleteModal({img: img.src, id: img._id})
  const handleLoad = (img) => {
    img.dataset.isload = "true"; 
  }
  return (
    <div
    index={index}
    style={{
      backgroundImage: `url(${placeHolderImg})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
    }}
    onClick={() => setFocus(img)}
    className={`relative group ${img.size} text-white z-0`}
    >
      <Modal/>
      <img
        data-isload="false"
        src={img.src}
        id="img-load"
        alt={`image-#${index}`}
        loading="lazy"
        onLoad={(e) => handleLoad(e.target)}
      />
      <div className="group-hover:h-full absolute bg-black/50 inset-0 text-white cursor-pointer md:h-0 transition-all duration-500 md:bottom-0 md:top-auto ease-out"></div>
      <div className="text-sm px-5 absolute bottom-5 flex justify-between items-center inset-x-0">
        <span>{img.title}</span>
        <Controls Delete={DeleteBtn} id={img._id}/>
      </div>
    </div>
  );
}
function Controls({Delete, id}) {
  return (
    <ul className="flex justify-end items-center gap-x-2 relative z-40">
      <li className="cursor-pointer">
        <Delete />
        {/* <DeleteCan
          className="h-5 aspect-square"
          onClick={(e) => {
            e.stopPropagation();
            handleDelete();
          }}
        /> */}
      </li>
      <li className="cursor-pointer">
        <Link to={`edit/${id}`}>
          <PendEdit className="h-5 aspect-square" />
        </Link>
      </li>
    </ul>
  );
}
