import { Link } from "react-router-dom";
import { DatabaseIcon } from "../../../../assets/Icons/DatabaseIcon";
import { useEffect, useState } from "react";
import { SaveBtn } from "./SaveBtn";

function BucketLink() {
  const [isEmpty, setState] = useState(null);
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API}/save/bucket`, {
      credentials: "include",
    }).then((r) => {
      if (r.status === 404) {
        setState(true);
      }
      setState(false);
    });
  }, []);
  return (
    <>
      <Link to={"/settings/ai"} className="absolute bottom-4 right-20">
        <div className={`p-2 bg-slate-600/40 rounded-full group`}>
          <span className="absolute px-[10%] -top-7 -left-3 -right-3 text-[8px] bg-slate-600/40 rounded-3xl font-sarabun uppercase text-center invisible opacity-0 group-hover:visible duration-200 ease-in transition-all group-hover:opacity-100">
            Bucket Settings
          </span>
          <DatabaseIcon
            className={`h-6 w-6 ${
              isEmpty || isEmpty === null ? "text-red-700" : "text-white"
            }`}
          />
        </div>
      </Link>
      <SaveBtn isEmpty={isEmpty} />
    </>
  );
}

export default BucketLink;
