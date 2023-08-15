import retry, { AbortError } from "p-retry";
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
  async fetch(input, init) {
    const run = async () => {
      const response = await fetch(input, init);

      // Abort retrying if the resource doesn't exist
      if (response.status === 404) {
        throw new AbortError(response.statusText);
      }

      return response;
    };

    // perform a fetch retry with p-retry
    return retry(run, { retries: 3 });
  },
});

const promiseResult = client.request(q);
