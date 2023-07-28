import { createContext, useContext, useEffect, useState } from "react";
import {useDelete} from "../hooks/useDelete"; 
import { useImages } from "../hooks/useImages"

export const Images = createContext();

export const useImageContext = () => {
  return useContext(Images)
}

export function ImagesProvider({ children }) {
    const [isLoading, setLoading] = useState(true); 
    const [page, setPage] = useState(0); 
    const {data, makeFetch} = useImages(); 
    const [visibleImages, setVisibleImages] = useState(null); 
    const [focusImage, setFocus] = useState(null);
    const [linkCopied, setLink] = useState(""); 
    useEffect(()=>{
      (
        async ()=>{
          await makeFetch(); 
        }
      )()
    },[])
    useEffect(() => {
      if (data === null) return;
      setVisibleImages(() => data.slice(0, 10));
      setPage(1);
      setLoading(false);
    }, [data]);
    const handleDelete = async (id) => {
      setVisibleImages((prev) => [...prev.filter((img) => img._id !== id)]);
      await useDelete(id);
    };
    const changePage = () => {
      if (!page || !data) return;
      const changingToPage = page * 10 + 10;
      const maxLenght = data.length;
      const firstImageIn = page * 10 + 1;
      if (firstImageIn >= maxLenght) {
        setVisibleImages((prev) => [
          ...prev,
          ...data.slice(visibleImages.length, -1),
        ]);
      } else {
        setVisibleImages((prev) => [
          ...prev,
          ...data.slice(firstImageIn, changingToPage + 1),
        ]);
        setPage((prev) => prev + 1);
      }
    };
    const values = {
      isLoading,
      data:visibleImages, 
      changePage, 
      handleDelete, 
      focusImage, 
      setFocus, 
      setLink, 
      linkCopied,
    };
  return (
    <Images.Provider value={values}>{children}</Images.Provider>
  );
}
