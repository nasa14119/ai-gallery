import { useState } from "react";
import { useAuth } from "../../../context/auth.context";

export const EmailIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="size-full md:size-16"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
    />
  </svg>
);
const API = `${import.meta.env.VITE_API}/profile/email`;

const fetchGetEmail = async () => {
  const response = await fetch(API, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });
  const res = await response.json();
  return res.email;
};
const fetchUpdateEmail = async (body) => {
  const response = await fetch(API, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
    credentials: "include",
  });
  return response
};
let email = await fetchGetEmail();
export function useEmailModal(triggerError) {
  const { triggerReload } = useAuth();
  const [isVisible, setVisibility] = useState(false);
  const handleVisibility = () => {
    setVisibility(true);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    const res = await fetchUpdateEmail(data);
    if (res.ok) {
      triggerReload();
      email = await fetchGetEmail();
      return;
    }
    triggerError("Email wasent safe");
    setVisibility(false);
  };
  const Component = () => (
    <>
      <div className="info-form z-50" data-isvisible={isVisible}>
        <h3 className="size-1/2 p-5 md:size-1/3 md:p-0 md:grid md:place-content-center">
          <EmailIcon />
        </h3>
        <span className="current-email flex flex-col ">
          <span>Current Email</span>
          <span className="opacity-30 pl-5 text-sm md:text-base">{email}</span>
        </span>
        <button
          className="text-red-500 text-5xl absolute top-0 right-5 z-50 cursor-pointer"
          onClick={() => setVisibility(false)}
        >
          &times;
        </button>
        <form onSubmit={handleSubmit}>
          <label htmlFor="email">New Email</label>
          <input
            type="text"
            name="email"
            id="email"
            autoComplete="email"
            className="!text-sm !md:text-base"
          />
          <label htmlFor="">Password</label>
          <input
            type="text"
            name="password"
            id="password"
            autoComplete="password"
          />
          <button
            type="submit"
            className="text-lg py-2 px-5 bg-green-700 text-white rounded-2xl  w-full mt-5"
          >
            Send
          </button>
        </form>
      </div>
      {isVisible && (
        <div
          className="fixed inset-0"
          onClick={() => setVisibility(false)}
        ></div>
      )}
    </>
  );
  return [Component, handleVisibility];
}
