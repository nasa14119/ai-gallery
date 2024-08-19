import { useTriggerError } from "../../../../context/error.context";
import { ImageContext } from "./index";
import { useContext } from "react";

export const useLoadingImage = () => useContext(ImageContext).loading.src;
export const useLoadingText = () => useContext(ImageContext).loading.message;
export const useTriggerLoading = (option) => {
  if (option === "IMG") return useContext(ImageContext).triggerLoadingImage;
  if (option === "TEXT") return useContext(ImageContext).triggerLoadingText;
  throw new Error("No option was provided");
};

export const useTextHandler = () => {
  const { message, setMessage } = useContext(ImageContext).prompt;
  return [message, (e) => setMessage(e.target.value)];
};
const fechForText = async (prompt) => {
  const API = `${import.meta.env.VITE_API}/ai/text`;
  const response = await fetch(API, {
    method: "POST",
    body: JSON.stringify({ prompt }),
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });
  if (response.status !== 200)
    throw new Error("Something wrong while fetching text");
  const res = await response.json();
  return res.text;
};
export const useTextGeneration = () => {
  const { message, setMessage } = useContext(ImageContext).prompt;
  const triggerLoading = useTriggerLoading("TEXT");
  const triggerError = useTriggerError();

  return async () => {
    if (!message) return triggerError("Prompt can't be empty");
    triggerLoading();
    try {
      const text = await fechForText(message);
      setMessage(text);
    } catch (error) {
      console.log(error);
      triggerError("Somenting went wrong sending request");
    } finally {
      triggerLoading();
    }
  };
};

export const useImage = () => useContext(ImageContext).img.src;
const fetchForImage = async (prompt) => {
  const API = `${import.meta.env.VITE_API}/ai/image`;
  const response = await fetch(API, {
    method: "POST",
    body: JSON.stringify({ prompt }),
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });
  if (response.status !== 200)
    throw new Error("Something went erong sending the request");
  const blob = await response.blob();
  return URL.createObjectURL(blob);
};
export const useImageGeneration = () => {
  const { message } = useContext(ImageContext).prompt;
  const { setSrc } = useContext(ImageContext).img;
  const triggerLoading = useTriggerLoading("IMG");
  const triggerError = useTriggerError();

  return async () => {
    if (!message) return triggerError("Prompt can't be empty");
    triggerLoading();
    try {
      const ai_src = await fetchForImage(message);
      setSrc(ai_src);
    } catch (error) {
      triggerError("Something wrong while making request");
    } finally {
      triggerLoading();
      window.location.reload();
    }
  };
};
// https://images.unsplash.com/photo-1721908919503-a8a1106bec3a?q=80&w=2865&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D
