import { Link } from "react-router-dom";
import HomeCardImage from "./images/rm_homepage.png";
import HeaderFooter from "./components/layout";

const Home = () => {
  return (
    <HeaderFooter>
      <div className="flex flex-col justify-center items-center h-screen bg-secondary">
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
            <div className="py-2 px-4 rounded-md text-offwhite text-center font-bold bg-gradient-to-tr from-[#97ce4c] to-[#557b1f] mx-2 cursor-pointer">
              View Characters
            </div>
          </Link>
          <Link to="/episodes">
            <div className="py-2 px-4 rounded-md text-offwhite text-center font-bold bg-gradient-to-tl from-[#97ce4c] to-[#557b1f] mx-2 cursor-pointer">
              View Episodes
            </div>
          </Link>
        </div>
        <div className="w-full text-center px-10 py-6 md:px-64 text-offwhite">
          Rick, an alcoholic sociopath and scientist, lives with his daughter
          Beth's family. Apart from building gadgets, he takes his morally right
          but dimwit grandson Morty on absurd intergalactic adventures.
        </div>
      </div>
    </HeaderFooter>
  );
};

export default Home;
