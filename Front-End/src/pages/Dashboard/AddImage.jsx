import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth.context";
import { Changes } from "./components/Chages";
import { setNewImage } from "./utils/setNewImage";


export function AddImage() {
  const {addError} = useAuth(); 
  const navigate = useNavigate(); 
  const handleSubmit = async (newImage) => {
    try {
      const res = await setNewImage(newImage); 
      if(res === 200) return navigate("/dashboard"); 
      addError("Error while sending new infomation"); 
    } catch (error) {
      addError("Error while sending new infomation"); 
    }
  }
  return <Changes changeDb={handleSubmit}/> 
}