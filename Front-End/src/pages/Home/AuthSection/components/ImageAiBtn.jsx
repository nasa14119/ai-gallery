import { Spinner} from "../../../../assets/Icons/Spinner";
import { GenerateImageIcon as ImageIcon} from "../../../../assets/Icons/GenerateImageIcon";
import { useImageGeneration, useLoadingImage } from "../context/hooks";

export function ImageAiBtn() {
  const generateImage = useImageGeneration()
  const loading = useLoadingImage()
  return (
    <div
      className={`absolute bottom-4 right-7 p-2 bg-slate-600/40 rounded-full z-40 cursor-pointer group`}
      onClick={generateImage}
    >
      <span className="absolute px-[10%] -top-7 -left-3 -right-3 text-[8px] bg-slate-600/40 rounded-3xl font-sarabun uppercase text-center invisible opacity-0 group-hover:visible duration-200 ease-in transition-all group-hover:opacity-100">
        Generate Image
      </span>
      <div className="h-6 aspect-square">
        {loading ? <Spinner className="animate-spin" /> : <ImageIcon />}
      </div>
    </div>
  );
}
