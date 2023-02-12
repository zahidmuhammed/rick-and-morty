import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_CHARACTERS } from "../queries/queries";
import HeaderFooter from "../components/layout";
import { CgChevronLeftO, CgChevronRightO } from "react-icons/cg";

const ListCharacters = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const [charStatus, setCharStatus] = useState("");
  const [charSpecies, setCharSpecies] = useState("");
  const [charGender, setCharGender] = useState("");
  const [charName, setCharName] = useState("");
  const [searchName, setSearchName] = useState("");

  const { loading, error, data } = useQuery(GET_CHARACTERS, {
    variables: {
      pageNo: pageNumber,
      name: charName,
      status: charStatus,
      gender: charGender,
      species: charSpecies,
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
        Characters
      </div>
      <div className="flex justify-between py-1 bg-[#97ce4c] px-3 md:px-32 md:py-4">
        <div className="flex flex-col md:flex-row md:items-center ">
          Status
          <select
            className="outline-none p-1 rounded-md md:mx-3"
            value={charStatus}
            onChange={(e) => {
              setCharStatus(e.target.value);
              setPageNumber(1);
            }}
          >
            <option value="">All</option>
            <option value="alive">Alive</option>
            <option value="dead">Dead</option>
            <option value="unknown">unknown</option>
          </select>
        </div>
        <div className="flex flex-col md:flex-row md:items-center">
          Species
          <select
            className="outline-none p-1 rounded-md md:mx-3"
            value={charSpecies}
            onChange={(e) => {
              setCharSpecies(e.target.value);
              setPageNumber(1);
            }}
          >
            <option value="">All</option>
            <option value="human">Human</option>
            <option value="animal">Animal</option>
            <option value="humanoid">Humanoid</option>
            <option value="robot">Robot</option>
            <option value="alien">Alien</option>
            <option value="poopybutthole">Poopybutthole</option>
            <option value="cronenberg">Cronenberg</option>
            <option value="disease">Disease</option>
            <option value="mythological creature">Mythological Creature</option>
            <option value="unknown">unknown</option>
          </select>
        </div>
        <div className="flex flex-col md:flex-row md:items-center">
          Gender
          <select
            className="outline-none p-1 rounded-md md:ml-3"
            value={charGender}
            onChange={(e) => {
              setCharGender(e.target.value);
              setPageNumber(1);
            }}
          >
            <option value="">All</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="unknown">unknown</option>
          </select>
        </div>
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
          placeholder="Enter character name"
          className="w-2/3 md:w-3/4 border outline-none px-4 py-1 rounded-l-md "
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
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 px-3 md:px-32 bg-[#97ce4c]">
          {data.characters.results.map((item, index) => (
            <Link key={index} to={`/characters/${item.id}`}>
              <div className="flex border flex-col justify-center items-center py-4 bg-white h-full">
                <div className="border-4 rounded-full">
                  <img
                    src={item.image}
                    className="rounded-full"
                    alt="avatar"
                    height={75}
                    width={75}
                  />
                </div>
                <div className="text-sm text-center font-bold w-2/3 py-1">
                  {item.name}
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
      {!data?.characters.info.count && (
        <div className="w-full text-center h-screen bg-[#97ce4c]">
          No characters found.
        </div>
      )}

      <div className="flex justify-center py-5 bg-[#97ce4c]">
        <button
          className="px-6"
          hidden={pageNumber === 1 || !data?.characters.info.count}
          onClick={() => {
            setPageNumber(pageNumber - 1);
          }}
        >
          <CgChevronLeftO size={30} color="#fff" />
        </button>
        <button
          className="px-6"
          hidden={
            pageNumber === data?.characters.info.pages ||
            !data?.characters.info.count
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

export default ListCharacters;
