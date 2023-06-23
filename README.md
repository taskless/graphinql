<!-- Banner -->
<p align="center">
  <a href="https://taskless.io">
    <img alt="taskless logo" height="128" src="https://raw.githubusercontent.com/taskless/taskless/main/.github/resources/taskless.png">
    <h1 align="center">Taskless</h1>
  </a>
</p>

<!-- Docs -->
<p align="center">
  <a aria-label="taskless documentation" href="https://taskless.io/docs">Read the Documentation 📚</a>
</p>

---

# @taskless/graphinql

A super-lightweight GraphQL client built on cross-fetch. It's used by both the Taskless Client and Taskless Dev Server for simple GraphQL operations. Originally inspired by phin, which the library was inspired by. As few dependencies as possible, works in the browser and server. Specifically built to work with strings and avoid a dependency on `graphql` / `graphql-tag` so you can keep your codebase light. In short, the best parts of [graphql-request](https://github.com/prisma-labs/graphql-request) without the `graphql` dependency.

- ✅ Queries, Mutations, Introspection
- ✅ Custom headers per request or shared via `new GraphQLClient()`
- ❌ Typed GraphQL Document Node (exposing these types would force `graphql` to be a dependency, even for types-only)
- ❌ Subscriptions

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

## About the Name

This library was originally built on `phin` before migrating to a What-WG fetch solution.

<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->

[![All Contributors](https://img.shields.io/badge/all_contributors-3-orange.svg?style=flat-square)](#contributors-)

<!-- ALL-CONTRIBUTORS-BADGE:END -->

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tbody>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="https://codedrift.com"><img src="https://avatars.githubusercontent.com/u/1795?v=4?s=100" width="100px;" alt="Jakob Heuser"/><br /><sub><b>Jakob Heuser</b></sub></a><br /><a href="https://github.com/taskless/taskless/commits?author=jakobo" title="Code">💻</a> <a href="#infra-jakobo" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a> <a href="https://github.com/taskless/taskless/commits?author=jakobo" title="Documentation">📖</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/TAKANOME-DEV"><img src="https://avatars.githubusercontent.com/u/79809121?v=4?s=100" width="100px;" alt="takanome_dev"/><br /><sub><b>takanome_dev</b></sub></a><br /><a href="https://github.com/taskless/taskless/commits?author=TAKANOME-DEV" title="Documentation">📖</a> <a href="https://github.com/taskless/taskless/commits?author=TAKANOME-DEV" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://segiddins.me"><img src="https://avatars.githubusercontent.com/u/1946610?v=4?s=100" width="100px;" alt="Samuel Giddins"/><br /><sub><b>Samuel Giddins</b></sub></a><br /><a href="https://github.com/taskless/taskless/commits?author=segiddins" title="Code">💻</a> <a href="#infra-segiddins" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a> <a href="https://github.com/taskless/taskless/commits?author=segiddins" title="Tests">⚠️</a></td>
    </tr>
  </tbody>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

## License

The Taskless source code in this repository is made available under the [MIT license](LICENSE). Some of the dependencies are licensed differently, with the BSD license, for example.
