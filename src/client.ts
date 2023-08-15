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
  // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
  const noVariables = {} as V; // Hard-cast

  const gqlRequest: GraphQLRequestContext<V> = {
    query,
    variables: variables ?? noVariables,
  };

  const fxtch = options?.fetch ?? fetch;

  const r = await fxtch(endpoint, {
    method: "POST",
    headers: {
      ...options?.headers,
      "content-type": "application/json",
    },
    body: JSON.stringify(gqlRequest),
  });

  const result = (await r.json()) as GraphQLResponse<T>;

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
      headers: options?.headers ?? {},
      fetch: options?.fetch ?? fetch,
    };
  }

  async request<T = unknown, V extends Variables = Variables>(
    query: string,
    variables?: V,
    options?: RequestOptions
  ) {
    const mergedOptions: RequestOptions = {
      fetch: options?.fetch ?? this.options.fetch,
      headers: {
        ...this.options.headers,
        ...options?.headers,
      },
    };
    return request<T, V>(this.endpoint, query, variables, mergedOptions);
  }
}
