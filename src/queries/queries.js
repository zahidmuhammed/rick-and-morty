import { gql } from "@apollo/client";

const GET_CHARACTERS = gql`
  query Characters(
    $pageNo: Int! = 1
    $name: String
    $species: String
    $status: String
    $gender: String
  ) {
    characters(
      page: $pageNo
      filter: {
        name: $name
        species: $species
        status: $status
        gender: $gender
      }
    ) {
      info {
        count
        pages
        next
        prev
      }
      results {
        id
        name
        image
      }
    }
  }
`;

const GET_EPISODES = gql`
  query Episodes($pageNo: Int! = 1, $name: String) {
    episodes(page: $pageNo, filter: { name: $name }) {
      info {
        count
        pages
        next
        prev
      }
      results {
        id
        name
        episode
        air_date
      }
    }
  }
`;

const GET_CHAR_BY_ID = gql`
  query CharacterByID($id: ID!) {
    character(id: $id) {
      name
      image
      origin {
        name
      }
      species
      location {
        name
      }
      gender
      episode {
        name
        episode
        id
      }
    }
  }
`;

const GET_EPIS_BY_ID = gql`
  query EpisodeByID($id: ID!) {
    episode(id: $id) {
      name
      air_date
      characters {
        name
        image
        id
      }
    }
  }
`;

export { GET_CHARACTERS, GET_EPISODES, GET_CHAR_BY_ID, GET_EPIS_BY_ID };
