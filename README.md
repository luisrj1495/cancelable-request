[![npm version](https://d25lcipzij17d.cloudfront.net/badge.svg?id=js&r=r&type=6e&v=1.0.1&x2=0)](https://www.npmjs.com/package/cancelable-request)

# Cancelable Request

> Cancelable request allows us to create a promise that can be canceled at any time

## Prerequisites

Cancelable request requires NodeJS and NPM. you can learn more about at [Node JS](http://nodejs.org/) and [NPM](https://npmjs.org/).

## Table of contents

- [Cancelable Request](#project-name)
  - [Prerequisites](#prerequisites)
  - [Table of contents](#table-of-contents)
  - [Getting Started](#getting-started)
  - [Installation](#installation)
  - [Usage](#usage)
    - [Axios usage](#axios-usage)
    - [Fetch usage](#fetch-usage)
  - [Authors](#authors)
  - [License](#license)

## Getting Started

These instructions will allow you to use the Cancelable Request library according to your needs.

## Installation

To install the library, run:

```sh
$ yarn add cancelable-request
```

Or if you prefer using npm:

```sh
$ npm i cancelable-request
```

## Usage

### Axios usage

```typescript
import axios from "axios";
import { cancelableRequest } from "cancelable-request";

const cancelableGetCats = cancelableRequest(async (signal, name: string) => {
  const { data } = await axios.get("https://catfact.ninja/fact", {
    signal,
    params: { name }
  });

  return data;
});

cancelableGetCats("Miau!");

cancelableGetCats.cancel();
```

### Fetch usage

```typescript
import { cancelableRequest } from "cancelable-request";

const cancelableGetCats = cancelableRequest(async (signal, name: string) => {
  const response = await fetch("https://catfact.ninja/fact", {
    signal,
    body: name
  });
  const cats = await response.json();

  return cats;
});

cancelableGetCats("Miau!");

cancelableGetCats.cancel();
```

## Authors

- **Luis Ernesto Ruis Jaramillo** - [luisrj1495](https://github.com/luisrj1495)

## License

[MIT License](https://andreasonny.mit-license.org/2019)
