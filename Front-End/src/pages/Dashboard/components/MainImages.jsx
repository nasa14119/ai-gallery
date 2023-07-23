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
// https://images.unsplash.com/photo-1605721911519-3dfeb3be25e7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=735&q=80