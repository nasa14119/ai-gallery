import { DeleteCan } from "../../../assets/Icons/DeleteCan";
import PenEdit from "../../../assets/Icons/PendEdit";
import { CloudFlareIcon } from "../../../assets/Icons/CloudFlareIcon";
import { useBucketModal } from "./BucketModal";
import { useEffect, useRef, useState } from "react";
export function BucketSetting() {
  const [url, setPreview] = useState(null);
  const deleteData = async () => {
    const response = await fetch(`${import.meta.env.VITE_API}/save/bucket`, {
      credentials: "include",
      method: "DELETE",
    });
    if (response === 204) {
      window.location.reload();
    }
  };
  useEffect(() => {
    const getBucketData = async () => {
      const response = await fetch(`${import.meta.env.VITE_API}/save/bucket`, {
        credentials: "include",
      });
      const res = await response.json();
      const value = res.endpoint.split("").map((v, i) => (i > 15 ? "✷" : v));
      setPreview(value);
    };
    getBucketData();
  }, []);
  const [Modal, openModal] = useBucketModal();
  return (
    <div className="font-sarabun text-xl flex flex-col gap-y-2">
      <span className="flex h-10 items-center gap-x-2">
        <CloudFlareIcon className="py-2" />
        <span className="text-slate-400 capitalize">Bucket</span>
      </span>
      <span className="text-base rounded-2xl flex relative items-center gap-x-3">
        <span className="px-6 py-2 text-slate-500 rounded-2xl outline-slate-400 outline w-full text-left text-[9px]  truncate">
          {url}
        </span>
        <span
          className="w-fit cursor-pointer text-slate-400 outline rounded-2xl py-2 px-3 grid place-content-center"
          onClick={() => openModal(true)}
        >
          <PenEdit className="w-6" />
        </span>
        <span
          className="w-fit cursor-pointer text-slate-400 outline rounded-2xl py-2 px-3 grid place-content-center"
          onClick={deleteData}
        >
          <DeleteCan className="w-6" />
        </span>
      </span>
      <Modal />
    </div>
  );
}
