import React from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import { GET_CHAR_BY_ID } from "../queries/queries";
import HeaderFooter from "../components/layout";
import { IoIosArrowDropleft } from "react-icons/io";
import Spinner from "../components/spinner";

const ViewCharacter = () => {
  const params = useParams();

  const { loading, error, data } = useQuery(GET_CHAR_BY_ID, {
    variables: {
      id: params.id,
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
      {loading ? (
        <Spinner />
      ) : (
        <div className="px-3 bg-primary">
          <div className="w-full text-center font-bold text-2xl py-4">
            {data.character.name}
          </div>
          <div className="flex bg-secondary text-primary rounded-sm text-sm md:text-xl md:mx-32">
            <div>
              <img
                src={data.character.image}
                alt="avatar"
                className="h-32 md:h-64 w-32 md:w-64"
              />
            </div>
            <div className="px-1 md:px-12 flex flex-col justify-center">
              <div>
                Character Name:{" "}
                <span className="font-bold">{data.character.name}</span>
              </div>
              <div>
                Origin:{" "}
                <span className="font-bold">{data.character.origin.name}</span>
              </div>
              <div>
                Species:{" "}
                <span className="font-bold">{data.character.species}</span>
              </div>
              <div>
                Location:{" "}
                <span className="font-bold">
                  {data.character.location.name}
                </span>
              </div>
              <div>
                Gender:{" "}
                <span className="font-bold">{data.character.gender}</span>
              </div>
            </div>
          </div>
          <div className="md:px-20 lg:px-32">
            <div className="py-3 md:py-8">
              Episodes in which the character appears :
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-4">
              {data.character.episode.map((item, index) => (
                <Link to={`/episodes/${item.id}`} key={index}>
                  <div className="flex h-full">
                    <div className="bg-secondary text-offwhite p-1 md:px-3 flex items-center text-sm md:text-base">
                      {item.episode}
                    </div>
                    <div className="bg-gray-300 w-full flex items-center px-1 md:px-3">
                      {item.name}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
            <div className="flex justify-end py-3">
              <Link to="/characters">
                <IoIosArrowDropleft size={32} color="#1E90FF" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </HeaderFooter>
  );
};

export default ViewCharacter;
