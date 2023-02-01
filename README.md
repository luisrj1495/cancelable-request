[![npm version](https://badge.fury.io/js/cancelable-request.svg)](https://badge.fury.io/js/cancelable-request)
[![TypeScript](https://badgen.net/badge/icon/typescript?icon=typescript&label)](https://typescriptlang.org)
[![npm downloads](https://img.shields.io/npm/dt/cancelable-request.svg?maxAge=2592000)](https://www.npmtrends.com/cancelable-request)


# Cancelable Request

> Cancelable request allows us to abort Web requests as and when desired.

## Table of contents

- [Cancelable Request](#project-name)
  - [Table of contents](#table-of-contents)
  - [Getting Started](#getting-started)
  - [Installation](#installation)
  - [Usage](#usage)
    - [Axios usage](#axios-usage)
    - [Fetch usage](#fetch-usage)
    - [React usage](#react-usage)
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

### React usage

```tsx
import React, { useState, useEffect, FC } from "react";
import { cancelableRequest } from "cancelable-request";
import axios from "axios";

type CatType = {
  fact: string;
  length: number;
};

const Cats: FC = () => {
  const [cats, setCats] = useState<Array<CatType>>([]);

  const cancelableGetCats = cancelableRequest(
    async (signal, params: { page: number; limit: number }) => {
      const { data } = await axios.get<{ data: Array<CatType> }>(
        "https://catfact.ninja/facts",
        {
          signal,
          params
        }
      );

      return data.data;
    }
  );

  useEffect(() => {
    const fetchCats = async () => {
      try {
        const catsData = await cancelableGetCats({ page: 10, limit: 10 });

        setCats(catsData);
      } catch (error) {
        console.log(error);
      }
    };

    fetchCats();

    return () => {
      cancelableGetCats.cancel();
    };
  }, []);

  return (
    <ul>
      {cats.map((cat, index) => (
        <li key={index}>
          <p>{cat.fact}</p>
          <p>{cat.length}</p>
        </li>
      ))}
    </ul>
  );
};

export default Cats;
```

## License

[MIT License](https://www.npmjs.com/package/cancelable-request)
