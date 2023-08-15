<!-- Banner -->
<p align="center">
    <img alt="graphinql logo" height="128" src="https://github.com/taskless/graphinql/assets/1795/95429cc4-72d4-4f34-b1ca-dad6dd1d5637">
    <h1 align="center">@taskless/graphinql</h1>
</p>

A super-lightweight GraphQL client built on cross-fetch. As few dependencies as possible, works in the browser and server. Specifically built to work with strings and avoid a dependency on `graphql` / `graphql-tag` so you can keep your codebase light. In short, the best parts of [graphql-request](https://github.com/prisma-labs/graphql-request) without the `graphql` dependency, but without losing the ability to type your requests and responses.

- ✅ Queries, Mutations, Introspection
- ✅ Custom headers per request or shared via `new GraphQLClient()`
- ✅ Typed responses and variables
- ❌ Typed GraphQL Document Node (exposing these types would force `graphql` to be a dependency, and risks the "multiple GraphQL" bug even for types-only support)
  - Note: If you need the Typed Document Node, you should use the excellent [graphql-request](https://www.npmjs.com/package/graphql-request) library
- ❌ Subscriptions (operates over https fetch)

# BREAKING CHANGE (4.x)

:warning: With node 18 providing a What-WG compatible fetch, version 4.0 of `graphinql` no longer provides a fetch by default nor includes p-retry. If you need these features, you can provide them yourself, via the new `fetch` option.

# Usage

```ts
import { GraphQLClient, request } from "@taskless/graphinql";

// as an object
const client = new GraphQLClient(endpoint, options);
const { data, error } = await client.request<TReturnType, TVariables>(
  stringDocument,
  {
    // variables
  },
  {
    // options
  }
);

// or as a one-off
request<TReturnType, TVariables>(endpoint, stringDocument, variables, options);
```

- `endpoint` Your GraphQL endpoint
- `stringDocument` A GraphQL query, as a string
- `variables` (optional) GraphQL Variables if applicable
- `options` (optional) A set of GraphQL Client options, provided as an object
  - `options.headers<HeadersInit>` (optional) A Headers compatible object, specifying headers to include with the request
  - `options.fetch<typeof fetch>` (optional) A What-WG compatible fetch interface

### Additional Examples

- [Using a ponyfilled fetch](https://github.com/taskless/graphinql/blob/main/examples/custom-fetch.ts)
- [Using a p-retry for retrying requests](https://github.com/taskless/graphinql/blob/main/examples/retry-fetch.ts)

# About the Name

This library was originally built on `phin` before migrating to a What-WG fetch solution.

# Contributors

<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->

[![All Contributors](https://img.shields.io/badge/all_contributors-3-orange.svg?style=flat-square)](#contributors-)

<!-- ALL-CONTRIBUTORS-BADGE:END -->

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tbody>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="https://codedrift.com"><img src="https://avatars.githubusercontent.com/u/1795?v=4?s=100" width="100px;" height="100px;" alt="Jakob Heuser"/><br /><sub><b>Jakob Heuser</b></sub></a><br /><a href="https://github.com/taskless/taskless/commits?author=jakobo" title="Code">💻</a> <a href="#infra-jakobo" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a> <a href="https://github.com/taskless/taskless/commits?author=jakobo" title="Documentation">📖</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/TAKANOME-DEV"><img src="https://avatars.githubusercontent.com/u/79809121?v=4?s=100" width="100px;" height="100px;" alt="takanome_dev"/><br /><sub><b>takanome_dev</b></sub></a><br /><a href="https://github.com/taskless/taskless/commits?author=TAKANOME-DEV" title="Documentation">📖</a> <a href="https://github.com/taskless/taskless/commits?author=TAKANOME-DEV" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://segiddins.me"><img src="https://avatars.githubusercontent.com/u/1946610?v=4?s=100" width="100px;" height="100px;" alt="Samuel Giddins"/><br /><sub><b>Samuel Giddins</b></sub></a><br /><a href="https://github.com/taskless/taskless/commits?author=segiddins" title="Code">💻</a> <a href="#infra-segiddins" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a> <a href="https://github.com/taskless/taskless/commits?author=segiddins" title="Tests">⚠️</a></td>
    </tr>
  </tbody>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

# License

The source code in this repository is made available under the [MIT license](LICENSE).
