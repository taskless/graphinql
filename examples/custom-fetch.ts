import fetch from "cross-fetch";
import { GraphQLClient } from "../src/client.js";

const q = /* GraphQL */ `
  {
    getPokemon(pokemon: dragonite) {
      sprite
      num
      species
      color
    }
  }
`;

const client = new GraphQLClient("https://graphql-pokemon.now.sh", {
  fetch,
});

const promiseResult = client.request(q);
