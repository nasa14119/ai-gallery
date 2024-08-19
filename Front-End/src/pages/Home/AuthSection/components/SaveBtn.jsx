import { useState, useEffect } from "react";
import { Spinner } from "../../../../assets/Icons/Spinner";
import { useNavigate } from "react-router-dom";

const SaveIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    {...props}
  >
    <path d="M18 21V13H6V21H4C3.44772 21 3 20.5523 3 20V4C3 3.44772 3.44772 3 4 3H17L21 7V20C21 20.5523 20.5523 21 20 21H18ZM16 21H8V15H16V21Z"></path>
  </svg>
);
const getCachedImg = async () => {
  const API = `${import.meta.env.VITE_API}/ai/cached-image`;
  const res = await fetch(API, { credentials: "include" });
  return res.status === 204;
};
export function SaveBtn({ isEmpty }) {
  const [loading, setLoading] = useState(false);
  const [isCached, setCheck] = useState(null);
  const navigator = useNavigate();
  const isVisible =
    isEmpty !== null && !isEmpty && isCached !== null && !isCached;
  useEffect(() => {
    getCachedImg().then((r) => setCheck(r));
  }, []);
  const handleClick = async () => {
    try {
      setLoading(true);
      await fetch(`${import.meta.env.VITE_API}/save/cached-image`, {
        credentials: "include",
      });
      navigator("/dashboard");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  if (isVisible)
    return (
      <div
        className="absolute bottom-4 right-32 text-center bg-green-400/40 p-2 rounded-full cursor-pointer group"
        onClick={handleClick}
      >
        <span className="absolute px-[10%] -top-7 -left-3 -right-3 text-[8px] bg-slate-600/40 rounded-3xl font-sarabun uppercase text-center invisible opacity-0 group-hover:visible duration-200 ease-in transition-all group-hover:opacity-100">
          SAVE IN BUCKET
        </span>
        <div className="h-6 aspect-square">
          {loading ? (
            <Spinner className="animate-spin" />
          ) : (
            <SaveIcon className="aspect-square text-green-900" />
          )}
        </div>
      </div>
    );
}
