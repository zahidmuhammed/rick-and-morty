import React from "react";
import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import { GET_CHAR_BY_ID } from "../queries/queries";

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
    <div>
      {loading ? (
        <>Loading....</>
      ) : (
        <div>
          <div className="flex mx-10">
            <div>
              <img src={data.character.image} alt="avatar" />
            </div>
            <div>
              <div>Name:{data.character.name}</div>
              <div>Origin:{data.character.origin.name}</div>
              <div>Species:{data.character.species}</div>
              <div>Location:{data.character.location.name}</div>
              <div>Gender:{data.character.gender}</div>
            </div>
          </div>
          <div className="mx-32">
            Episodes:
            <div className="grid grid-cols-6  gap-4">
              {data.character.episode.map((item, index) => (
                <div className="flex border">
                  <div className="bg-gray-300 p-1 flex items-center">
                    {item.episode}
                  </div>
                  <div className="flex items-center pl-3">{item.name}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewCharacter;
