import { Link } from "react-router-dom";

export default function HomeLink() {
  return (
    <div className="absolute top-5 right-14 aspect-square h-7 md:h-9 md:right-16">
      <Link to="/">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 24 24"
          className="h-full w-full"
        >
          <path d="M21 20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.49a1 1 0 0 1 .386-.79l8-6.223a1 1 0 0 1 1.228 0l8 6.223a1 1 0 0 1 .386.79V20Zm-2-1V9.978l-7-5.444-7 5.444V19h14Z" />
        </svg>
      </Link>
    </div>
  );
}
