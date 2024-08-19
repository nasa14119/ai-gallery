import { useTriggerError } from "../../../../context/error.context";
import "./styles.css";
import { useEffect, useRef, useState } from "react";
const fetchPutNewData = async (body) => {
  try {
    const response = await fetch(`${import.meta.env.VITE_API}/save/bucket`, {
      method: "PUT",
      body: JSON.stringify(body),
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response;
  } catch (error) {
    console.log(error);
    throw "Something went wrong in the request";
  }
};
const fetchBucketData = async () => {
  const response = await fetch(`${import.meta.env.VITE_API}/save/bucket`, {
    credentials: "include",
  });
  return await response.json();
};
function BucketModal({ isVisible, setVisibility }) {
  const triggerError = useTriggerError();
  const [values, setValues] = useState({
    bucket_name: "",
    endpoint: "",
    accessKeyId: "",
    secretAccessKey: "",
  });
  useEffect(() => {
    if (isVisible) {
      fetchBucketData().then((r) => {
        setValues(r);
      });
    }
  }, [isVisible]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    try {
      const res = await fetchPutNewData(data);
      if (res.status !== 204) triggerError("Bad request");
      setVisibility(false);
      window.location.reload();
    } catch (error) {
      triggerError(error);
    }
  };
  return (
    <div
      className={`fixed inset-0 justify-center items-center modal-bucket`}
      onClick={() => setVisibility(false)}
      data-isopen={isVisible}
    >
      <div
        className={`w-full max-w-[500px] bg-slate-400 aspect-square rounded-2xl`}
        onClick={(e) => e.stopPropagation()}
      >
        <form
          action=""
          className="flex justify-center items-center flex-col h-full gap-y-4 *:w-full px-[10%]"
          onSubmit={handleSubmit}
        >
          <label htmlFor="" className="label-bucket">
            <span>Bucket Name :</span>
            <input
              type="text"
              className="input-bucket"
              name="bucket_name"
              placeholder={values.bucket_name}
            />
          </label>
          <label htmlFor="" className="label-bucket">
            <span>Url :</span>
            <input
              type="text"
              className="input-bucket"
              name="endpoint"
              placeholder={values.endpoint}
            />
          </label>
          <label htmlFor="" className="label-bucket">
            <span>Access Key ID :</span>
            <input
              type="text"
              className="input-bucket"
              name="accessKeyId"
              placeholder={values.accessKeyId}
            />
          </label>
          <label htmlFor="" className="label-bucket">
            <span>Secret Access Key :</span>
            <input
              type="password"
              className="input-bucket"
              name="secretAccessKey"
              placeholder={values.secretAccessKey
                .split("")
                .map(() => "✳︎")
                .join("")}
            />
          </label>
          <button id="submit-bucket">Send</button>
        </form>
      </div>
    </div>
  );
}
export function useBucketModal() {
  const [isVisible, setToggle] = useState(false);
  const handleClick = (value) => {
    if (typeof value === "undefined") {
      return setToggle((prev) => !prev);
    }
    setToggle(value);
  };
  const Compoenent = () => (
    <BucketModal isVisible={isVisible} setVisibility={handleClick} />
  );
  return [Compoenent, handleClick];
}
