import React from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import { GET_EPIS_BY_ID } from "../queries/queries";
import HeaderFooter from "../components/layout";
import { IoIosArrowDropleft } from "react-icons/io";

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
    <HeaderFooter>
      {loading ? (
        <div className="h-screen text-white flex justify-center bg-[#97ce4c]">
          Loading...
        </div>
      ) : (
        <div className="bg-[#97ce4c]">
          <div className="w-full text-center font-bold text-2xl py-4">
            {data.episode.name}
          </div>
          <div className="px-3 md:px-32">
            <div className="text-center">
              <span className="font-bold">Episode Name :</span>{" "}
              {data.episode.name}
            </div>
            <div className="text-center">
              <span className="font-bold">Aired Date :</span>{" "}
              {data.episode.air_date}
            </div>
            <div className="py-3">Characters played in this episode : </div>
            <div className="grid grid-cols-5 py-3 gap-6">
              {data.episode.characters.map((item, index) => (
                <Link to={`/characters/${item.id}`} key={index}>
                  <div className="flex flex-col border justify-center items-center p-2">
                    <img src={item.image} className="h-16 w-16" alt="" />
                    <div>{item.name}</div>
                  </div>
                </Link>
              ))}
            </div>
            <div className="flex justify-end py-3">
              <Link to="/episodes">
                <IoIosArrowDropleft size={32} color="#1E90FF" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </HeaderFooter>
  );
};

export default ViewEpisode;
