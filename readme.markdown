# @mcansh/next-progress

Easily integrate [NProgress](https://github.com/rstacruz/nprogress) into your
[Next.js](https://github.com/zeit/next.js) app using styled-components

## A note about typescript types

In order to get typescript types be sure to install the types for `nprogress`.

```bash
$ yarn add -D @types/nprogress

or

$ npm install -D @types/nprogress
```

## Usage

```js
import * as React from 'react';
import App from 'next/app';
import { NProgress } from '@mcansh/next-nprogress';

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;
    return (
      <>
        <NProgress
          color="#FE7912"
          options={{ trickleSpeed: 50 }}
          spinner={false}
        />
        <Component {...pageProps} />
      </>
    );
  }
}
```
