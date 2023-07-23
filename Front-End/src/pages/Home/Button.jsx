import { Link } from "react-router-dom";
export const Button = ({ href, body }) => {
  return (
    <Link
      to={href}
      className="text-white text-center text-[18px] w-full py-2 bg-gradient-to-br from-purple-600 to-blue-500 rounded-xl cursor-pointer font-medium transition-all duration-700 hover:scale-110"
    >
      {body}
    </Link>
  );
};
