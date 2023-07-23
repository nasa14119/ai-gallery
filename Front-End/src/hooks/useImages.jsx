import { useState } from "react";
import { useAuth } from "../context/auth.context";
const URL = `${import.meta.env.VITE_API}/images`

const callDb = async () => {
  return await fetch(URL, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });
};

async function getImagesFromDb(addError){
  let res; 
  try {
    res = await callDb();
    res = await res.json();
    res = res.reverse();
  } catch (error) {
    addError("There was an error while geting images");
  }
  return res; 
}

export function useImages() {
  const [data, setFetch] = useState(null);
  const {addError} = useAuth()
  const makeFetch = async () => {
    const res = await getImagesFromDb(addError);
    setFetch(() => res);
  };
  return {data , makeFetch}
}
