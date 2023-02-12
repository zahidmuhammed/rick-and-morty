import React from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import { GET_EPIS_BY_ID } from "../queries/queries";

const ViewEpisode = () => {
  const params = useParams();

  const { loading, error, data } = useQuery(GET_EPIS_BY_ID, {
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
          <div>{data.episode.name}</div>
          <div>{data.episode.air_date}</div>
          characters:
          <div className="grid grid-cols-5">
            {data.episode.characters.map((item, index) => (
              <Link to={`/characters/${item.id}`} key={index}>
                <div>
                  <img src={item.image} className="h-16 w-16" alt="" />
                  <div>{item.name}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewEpisode;
