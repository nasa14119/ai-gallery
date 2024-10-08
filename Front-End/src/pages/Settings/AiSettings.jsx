import { useEffect, useRef, useState } from "react";
import { OpenAiToken } from "./components/OpenAiToken";
import { StableDiffusionToken } from "./components/StableDiffusionToken";
import { BucketSetting } from "./components/BucketSetting";
import { useErrorComponent } from "../../context/error.context";

export function AiSettings() {
  const [tokens, setToken] = useState({ openai: "", stable_diffusion: "" });
  const Error = useErrorComponent();
  const prev_tokens = useRef(null);
  useEffect(() => {
    const fetchApi = async () => {
      const response = await fetch(
        `${import.meta.env.VITE_API}/profile/tokens`,
        { credentials: "include" }
      );
      const res = await response.json();
      prev_tokens.current = res;
      return res;
    };
    fetchApi().then((v) => setToken(v));
  }, []);
  const handleInput = (type) => {
    return (e) => {
      setToken((prev) => {
        const values = { ...prev };
        values[type] = e.target.value;
        return values;
      });
    };
  };
  const handleSubmit = async () => {
    const response = await fetch(`${import.meta.env.VITE_API}/profile/tokens`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(tokens),
    });
    const res = await response.json();
    prev_tokens.current = res;
    setToken(res);
  };
  const delteToken = async (type) => {
    const res = await fetch(
      `${import.meta.env.VITE_API}/profile/tokens/openai`,
      {
        credentials: "include",
        method: "DELETE",
      }
    );
    if (!res.ok) return;
    window.location.reload();
  };
  if (!prev_tokens.current || !tokens) return null;
  return (
    <>
      <main className="max-w-[500px] mx-auto flex flex-col gap-y-4 come-to-view">
        <OpenAiToken
          token={tokens.openai}
          setToken={handleInput("openai")}
          delteToken={() => delteToken("openai")}
        />
        <StableDiffusionToken
          token={tokens.stable_diffusion}
          setToken={handleInput("stable_diffusion")}
        />
        <BucketSetting />
        {(prev_tokens.current.openai !== tokens.openai ||
          prev_tokens.current.stable_diffusion !== tokens.stable_diffusion) && (
          <button
            className="mt-auto uppercase bg-green-700 w-1/2 ml-auto py-2 rounded-3xl animation-load"
            onClick={handleSubmit}
          >
            save
          </button>
        )}
      </main>
      <Error />
    </>
  );
}
