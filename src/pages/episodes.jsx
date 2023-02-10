import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_EPISODES } from "../queries/queries";

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
    <>
      <div className="flex my-4">
        <input
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
          placeholder="Enter episode name"
          className="flex-1 ml-6 border outline-none px-4 py-1 rounded-l-md"
          type="text"
        />
        <button
          className="flex-1 border mr-6 bg-gray-200 rounded-r-md"
          onClick={() => {
            setPageNumber(1);
            setCharName(searchName);
          }}
        >
          Search
        </button>
      </div>
      {loading ? (
        <>Loading...</>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-2 text-center gap-3 px-2 md:px-6">
          {data.episodes.results.map((item, index) => (
            <Link key={index} to={`/episodes/${item.id}`}>
              <div className="border p-2">
                <div>
                  {item.episode} - {item.name}
                </div>

                <div>Aired Date : {item.air_date}</div>
              </div>
            </Link>
          ))}
        </div>
      )}

      <div className="flex justify-center ">
        <button
          hidden={pageNumber === 1}
          onClick={() => {
            setPageNumber(pageNumber - 1);
          }}
        >
          Prev
        </button>
        <button
          hidden={pageNumber === data?.episodes.info.pages}
          onClick={() => {
            setPageNumber(pageNumber + 1);
          }}
        >
          Next
        </button>
      </div>
    </>
  );
};

export default ListEpisodes;
