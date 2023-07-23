import { IconDark } from "./IconDark";
import { IconLight} from "./IconLight";
import {getFunctionTheme, getTheme} from "../../context/theme.context"
import "./styles.css"
const SwitchTheme = ({isStatic = false}) => {
  const isDark = getTheme(); 
  const handleTheme = getFunctionTheme(); 
  return (
    <div onClick={handleTheme} className={`toggle-theme ${!isStatic && "absolute top-5 right-5"}`}>
      {isDark ? (
          <IconDark />
      ) : (
          <IconLight />
      )}
    </div>
  );
}; 

export default SwitchTheme; 
