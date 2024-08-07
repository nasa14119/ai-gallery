import { Link } from "react-router-dom";
import { useTokenPresent } from "../../../../hooks/useTokenPresent"
import { OpenAiIcon } from "../../../Settings/assets/OpenAiIcon"
const OPTIONS = {
  loading: {
    color: "text-white", 
    message:"loading" 
  },
  false: {
    color: "text-red-600", 
    message: "token not provided" 
  },
  true: {
    color: "text-green-600", 
    message: "Set Api Token" 
  }
}
export function OpenWarning({className}) {
  const isAuth = useTokenPresent(); 
  const getTheme = () => {
    if(isAuth === null) return OPTIONS["loading"]
    return isAuth ? OPTIONS["true"]: OPTIONS["false"]
  }
  const theme = getTheme()
  return (
    <Link to="/settings/ai">
      <div className={`absolute ${className} p-2 bg-slate-600/40 rounded-full z-40 cursor-pointer w-max group`}>
        <span className="absolute px-[10%] -top-8 -left-3 -right-3 text-[9px] bg-slate-600/40 rounded-3xl font-sarabun uppercase text-center invisible opacity-0 group-hover:visible duration-200 ease-in transition-all group-hover:opacity-100">{theme.message}</span>
        <div className={`h-6 aspect-square ${theme.color} flex justify-center`}>
          <OpenAiIcon/>
        </div>
      </div>
    </Link>
  )
}