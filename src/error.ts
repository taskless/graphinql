import {
  type GraphQLRequestContext,
  type GraphQLResponse,
} from "./graphql-types.js";

export class RequestError extends Error {
  original?: Error;
}

export class ClientError extends Error {
  private static extractMessage(response: GraphQLResponse): string {
    try {
      return response.errors?.[0].message ?? "Unknown error";
    } catch {
      return `GraphQL Error (Code: ${response.status})`;
    }
  }

  response: GraphQLResponse;
  request: GraphQLRequestContext;

  constructor(response: GraphQLResponse, request: GraphQLRequestContext) {
    const message = `${ClientError.extractMessage(response)}: ${JSON.stringify({
      response,
      request,
    })}`;

    super(message);

    Object.setPrototypeOf(this, ClientError.prototype);

    this.response = response;
    this.request = request;

    // This is needed as Safari doesn't support .captureStackTrace
    if (typeof Error.captureStackTrace === "function") {
      Error.captureStackTrace(this, ClientError);
    }
  }
}
