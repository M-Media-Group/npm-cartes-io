# npm-cartes-io

[![npm package][npm-img]][https://www.npmjs.com/package/@m-media/npm-cartes-io]
[![Build Status][build-img]][build-url]
[![Downloads][downloads-img]][downloads-url]
[![Issues][issues-img]][issues-url]
[![Code Coverage][codecov-img]][codecov-url]
[![Commitizen Friendly][commitizen-img]][commitizen-url]
[![Semantic Release][semantic-release-img]][semantic-release-url]

<!-- > My awesome module -->

## Install

```bash
npm i @m-media/npm-cartes-io
```

## Usage

```ts
import cartes from "npm-cartes-io";

// Maps
cartes.maps().get();
cartes.maps().with(['markers']).get();

cartes.maps().search(query);

const map = cartes.maps().create(data);

// You can create a map from a file (requires auth and permissions)
const map = cartes.maps().createFromFile(file);

cartes.maps(map.uuid).get();
cartes.maps(map.uuid).related().get();
cartes.maps(map.uuid, map.token).update(data);
cartes.maps(map.uuid, map.token).delete();

// Markers
cartes.maps(map.uuid).markers().get();

const marker = cartes.maps(map.uuid).markers().create(data);

// You can create markers from a file (requires auth and permissions)
const marker = cartes.maps(map.uuid).markers().createFromFile(file);


cartes.maps(map.uuid).markers(marker.id, marker.token).delete();

// Categories
cartes.categories().get();
cartes.categories().search(query);

// Authentication
cartes.setApiKey(apiKey);

// User
cartes.me().get();
cartes.me().update(data);

// Users
cartes.users().get();
cartes.users(userId).get();

```

[build-img]:https://github.com/ryansonshine/typescript-npm-package-template/actions/workflows/release.yml/badge.svg
[build-url]:https://github.com/ryansonshine/typescript-npm-package-template/actions/workflows/release.yml
[downloads-img]:https://img.shields.io/npm/dt/typescript-npm-package-template
[downloads-url]:https://www.npmtrends.com/typescript-npm-package-template
[npm-img]:https://img.shields.io/npm/v/typescript-npm-package-template
[https://www.npmjs.com/package/@m-media/npm-cartes-io]:https://www.npmjs.com/package/@m-media/npm-cartes-io
[issues-img]:https://img.shields.io/github/issues/ryansonshine/typescript-npm-package-template
[issues-url]:https://github.com/ryansonshine/typescript-npm-package-template/issues
[codecov-img]:https://codecov.io/gh/ryansonshine/typescript-npm-package-template/branch/main/graph/badge.svg
[codecov-url]:https://codecov.io/gh/ryansonshine/typescript-npm-package-template
[semantic-release-img]:https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg
[semantic-release-url]:https://github.com/semantic-release/semantic-release
[commitizen-img]:https://img.shields.io/badge/commitizen-friendly-brightgreen.svg
[commitizen-url]:http://commitizen.github.io/cz-cli/
