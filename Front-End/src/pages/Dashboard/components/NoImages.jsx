
import imgNoFile from "../../../assets/Icons/no-file-icon.svg"
export default function NoImages() {
  return (
    <div className="px-10 flex-grow flex justify-center items-center flex-col">
      <img
        src={imgNoFile}
        alt="NoFileIcon"
        className="w-[min(30vw,_150px)] aspect-square"
      />
      <h3 className="text-3xl text-center">
        There is no images in the database
      </h3>
    </div>
  );
}
