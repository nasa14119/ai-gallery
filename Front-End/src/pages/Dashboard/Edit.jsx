import { useNavigate, useParams } from "react-router-dom"
import Loading from "../../components/Loading"
import { useEffect, useState } from "react";
import { Changes } from "./components/Chages";
import { useAuth } from "../../context/auth.context";
import { updateImage } from "./utils/updateImg";
export const Edit = () => {
  const [img, setImg] = useState(null)
  const [isLoading, setLoading] = useState(true); 
  const {addError} = useAuth(); 
  const {id} = useParams(); 
  const navigate = useNavigate()
  const handleSubmit = async (newImage) => {
    try {
      const res = await updateImage(id , newImage); 
      if(res === 200) return navigate("/dashboard"); 
      addError("Error while sending new infomation"); 
    } catch (error) {
      addError("Error while sending new infomation"); 
    }
  }
  useEffect(() =>{
    const API = `${import.meta.env.VITE_API}/image/${id}`
    const makeFetch = async () => {
      const res = await fetch(API, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      })
        .then((res) => res.json())
        .catch((err) => {
          throw Error("Something hapened");
        })
        .finally(() => setLoading(false));
      setImg(res);
    };
    try {
      makeFetch()
    } catch (err) {
      addError("Error while fetching"); 
    }
  },[])
  if(isLoading || img === null){
    return (
      <Loading/>
    )
  }
  return <Changes initialImg={img.src} initialTitle={img.title} initialSize={img.size} changeDb={handleSubmit}/>
}
