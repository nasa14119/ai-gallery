import { Fragment } from "react";
import { Img } from "./Img";
import { useImageContext } from "../../../context/images.context";
import { HandleLoad } from "./HandleLoad";
import {FocusInImage} from "./FocusInImage"
export default function Gallery() {
  const {data} = useImageContext()
  return (
      <>
      <FocusInImage/>
      <main className="gap-x-5 px-5 container-gallery">
        {data?.map((img, i) => (
          <Fragment key={i}>
            <Img img={img} index={i}/>
          </Fragment>
        ))}
      </main>
      <HandleLoad/> 
    </>
  );
}