// Core typings taken from https://github.com/prisma-labs/graphql-request/blob/master/src/types.ts

export type Variables = Record<string, any>;

export type GraphQLError = {
  message: string;
  locations?: Array<{ line: number; column: number }>;
  path?: string[];
  extensions?: any;
};

export type GraphQLResponse<T = any> = {
  data?: T;
  errors?: GraphQLError[];
  extensions?: any;
  status: number;
} & Record<string, any>;

export type GraphQLRequestContext<V = Variables> = {
  query: string | string[];
  variables?: V;
};
