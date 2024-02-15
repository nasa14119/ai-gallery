import Loading from "../../../components/Loading"
import Gallery from "./Gallery";
import NoImages from "./NoImages";
import {useImageContext} from "../../../context/images.context"
export default function MainImages() {
  const {data,  isLoading}= useImageContext(); 
  if (isLoading || data === null) {
    return <Loading />;
  }
  if (Array.isArray(data) && !data.length) {
    return <NoImages />;
  }
  return <Gallery sources={data} />;
}