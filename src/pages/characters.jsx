import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_CHARACTERS } from "../queries/queries";

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
    <>
      <div className="flex justify-around mt-6">
        <div className="flex flex-col md:flex-row md:items-center">
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
            className="outline-none p-1 rounded-md md:mx-3"
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
      <div className="flex my-4">
        <input
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
          placeholder="search characters..."
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
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 px-2 md:px-6">
          {data.characters.results.map((item, index) => (
            <Link key={index} to={`/characters/${item.id}`}>
              <div className="flex border flex-col justify-center items-center py-4">
                <div>Id:{item.id}</div>
                <div className="py-3">
                  <img
                    src={item.image}
                    className="rounded-full"
                    alt="avatar"
                    height={75}
                    width={75}
                  />
                </div>
                <div className="text-sm text-center font-bold w-2/3">
                  {item.name}
                </div>
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
          hidden={pageNumber === data?.characters.info.pages}
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

export default ListCharacters;
