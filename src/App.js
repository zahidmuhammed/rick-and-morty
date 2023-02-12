import HomeCardImage from "./images/rm_homepage.png";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <div>
        <img
          src={HomeCardImage}
          alt="Rick and Morty"
          height={300}
          width={300}
        />
      </div>
      <div className="flex">
        <Link to="/characters">
          <div className="border py-2 px-4 rounded-md text-white font-bold bg-gradient-to-tr from-[#97ce4c] to-[#557b1f] mx-2 cursor-pointer">
            View Characters
          </div>
        </Link>
        <Link to="/episodes">
          <div className="border py-2 px-4 rounded-md text-white font-bold bg-gradient-to-tl from-[#97ce4c] to-[#557b1f] mx-2 cursor-pointer">
            View Episodes
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Home;
