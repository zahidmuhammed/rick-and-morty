import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_EPISODES } from "../queries/queries";
import HeaderFooter from "../components/layout";
import { CgChevronLeftO, CgChevronRightO } from "react-icons/cg";

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
      <div className="bg-[#97ce4c] font-bold w-full text-center text-2xl py-4">
        Episodes
      </div>
      <div className="flex py-4 bg-[#97ce4c] px-3 md:px-32">
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
          className="w-2/3 md:w-3/4 border outline-none px-4 py-1 rounded-l-md"
          type="text"
        />
        <button
          className="w-1/3 md:w-1/4 border bg-gray-200 rounded-r-md"
          onClick={() => {
            setPageNumber(1);
            setCharName(searchName);
          }}
        >
          Search
        </button>
      </div>
      {loading ? (
        <div className="h-screen text-white flex justify-center bg-[#97ce4c]">
          Loading...
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 bg-[#97ce4c] text-center gap-3 px-3 md:px-32">
          {data.episodes.results.map((item, index) => (
            <Link key={index} to={`/episodes/${item.id}`}>
              <div className="border bg-white h-full grid grid-cols-2">
                <div className="bg-gray-300 border-b border-white flex items-center justify-center">
                  {item.episode}
                </div>
                <div className="flex items-center justify-center border-b border-gray-300">
                  {item.name}
                </div>
                <div className="bg-gray-300 flex items-center justify-center">
                  Aired Date
                </div>
                <div className="flex items-center justify-center">
                  {item.air_date}
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
      {!data?.episodes.info.count && (
        <div className="w-full text-center h-screen bg-[#97ce4c]">
          No episodes found.
        </div>
      )}

      <div className="flex justify-center py-5 bg-[#97ce4c]">
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
