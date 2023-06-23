import fetch from "cross-fetch";
import { ClientError, RequestError } from "./error.js";
import {
  type GraphQLRequestContext,
  type GraphQLResponse,
  type Variables,
} from "./graphql-types.js";
import { type RequestOptions } from "./request-types.js";

export async function request<T, V extends Variables>(
  endpoint: string | URL,
  query: string,
  variables?: V,
  options?: RequestOptions
) {
  const { headers, retries } = options ?? {};

  // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
  const noVariables = {} as V; // Hard-cast

  const gqlRequest: GraphQLRequestContext<V> = {
    query,
    variables: variables ?? noVariables,
  };

  let result: GraphQLResponse<T> | undefined;

  const { default: pRetry } = await import("p-retry");

  try {
    result = await pRetry(
      async () => {
        const r = await fetch(endpoint, {
          method: "POST",
          headers: {
            ...headers,
            "content-type": "application/json",
          },
          body: JSON.stringify(gqlRequest),
        });
        const j = (await r.json()) as GraphQLResponse<T>;
        return j;
      },

      {
        retries: typeof retries === "number" ? retries : 5,
      }
    );
  } catch (error) {
    // The network request itself failed
    const error_ = new RequestError("Unable to make the request");
    error_.original = error as Error;
    throw error_;
  }

  if (result === undefined) {
    throw new RequestError("Unable to parse the response");
  }

  const gqlResponse: GraphQLResponse<T> = {
    data: result.data,
    errors: result.errors,
    extensions: "extensions" in result ? (result.extensions as unknown) : {},
    ...result,
  };

  if (result.errors) {
    throw new ClientError(gqlResponse, gqlRequest);
  }

  return result.data as T;
}

export class GraphQLClient {
  private readonly endpoint: string | URL;
  private readonly options: RequestOptions;

  constructor(endpoint: string | URL, options?: RequestOptions) {
    this.endpoint = endpoint;
    this.options = {
      retries: typeof options?.retries === "number" ? options.retries : 5,
      headers: options?.headers ?? {},
    };
  }

  async request<T = unknown, V extends Variables = Variables>(
    query: string,
    variables?: V,
    options?: RequestOptions
  ) {
    const mergedOptions: RequestOptions = {
      retries:
        typeof options?.retries === "number"
          ? options.retries
          : this.options.retries,
      headers: {
        ...this.options.headers,
        ...options?.headers,
      },
    };
    return request<T, V>(this.endpoint, query, variables, mergedOptions);
  }
}
