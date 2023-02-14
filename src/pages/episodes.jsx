import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_EPISODES } from "../queries/queries";
import HeaderFooter from "../components/layout";
import { CgChevronLeftO, CgChevronRightO } from "react-icons/cg";
import Spinner from "../components/spinner";

const ListEpisodes = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const [charName, setCharName] = useState("");
  const [searchName, setSearchName] = useState("");

  const { loading, error, data } = useQuery(GET_EPISODES, {
    variables: {
      pageNo: pageNumber,
      name: charName,
    },
  });

  if (error)
    return (
      <div className="flex h-screen justify-center items-center">
        Error : {error.message}
      </div>
    );
  return (
    <HeaderFooter>
      <div className="bg-primary  font-bold w-full text-center text-2xl py-4">
        Episodes
      </div>
      <div className="flex py-4 bg-primary px-3 md:px-32">
        <input
          value={searchName}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              setPageNumber(1);
              setCharName(searchName);
            }
          }}
          onChange={(e) => setSearchName(e.target.value)}
          placeholder="Enter episode name"
          className="w-2/3 md:w-3/4 outline-none px-4 py-1 rounded-l-md"
          type="text"
        />
        <button
          className="w-1/3 md:w-1/4 bg-secondary text-primary  rounded-r-md"
          onClick={() => {
            setPageNumber(1);
            setCharName(searchName);
          }}
        >
          Search
        </button>
      </div>
      {loading ? (
        <Spinner />
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 bg-primary text-center gap-3 md:gap-y-7 px-3 md:px-32">
          {data.episodes.results.map((item, index) => (
            <Link key={index} to={`/episodes/${item.id}`}>
              <div className="h-full grid grid-cols-3">
                <div className="bg-secondary text-offwhite border-b border-white md:rounded-tl-xl flex items-center justify-center text-sm">
                  {item.episode}
                </div>
                <div className="col-span-2 flex items-center justify-center bg-offwhite border-b border-gray-300">
                  {item.name}
                </div>
                <div className="bg-secondary text-offwhite flex items-center justify-center text-sm md:rounded-none">
                  Aired Date
                </div>
                <div className="col-span-2 flex items-center justify-center bg-offwhite md:rounded-br-xl">
                  {item.air_date}
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
      {!data?.episodes.info.count && (
        <div className="w-full text-center h-screen bg-primary">
          No episodes found.
        </div>
      )}

      <div className="flex justify-center py-5 bg-primary">
        <button
          className="px-6"
          hidden={pageNumber === 1 || !data?.episodes.info.count}
          onClick={() => {
            setPageNumber(pageNumber - 1);
          }}
        >
          <CgChevronLeftO size={30} color="#fff" />
        </button>
        <button
          className="px-6"
          hidden={
            pageNumber === data?.episodes.info.pages ||
            !data?.episodes.info.count
          }
          onClick={() => {
            setPageNumber(pageNumber + 1);
          }}
        >
          <CgChevronRightO size={30} color="#fff" />
        </button>
      </div>
    </HeaderFooter>
  );
};

export default ListEpisodes;
