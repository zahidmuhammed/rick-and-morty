import React from "react";
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

  return <div>V</div>;
};

export default ViewEpisode;
