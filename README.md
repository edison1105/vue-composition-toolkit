# vue-composition-toolkit

[![](https://github.com/shuidi-fed/vue-composition-toolkit/workflows/test/badge.svg)](https://github.com/shuidi-fed/vue-composition-toolkit/actions)

Vue composition-api toolkit.

## Progress Tracking

- [x] useCssVar
- [x] useSWR
- [x] useWindowSize
- [x] useWindowFocus
- [x] useAsyncState
- [x] useCopyToClipboard
- [x] useRaf
- [x] useGeolocation
- [x] useMouse
- [x] useOnline
- [x] useVisibilityState
- [x] useTimeout
- [x] useTimeoutFn
- [x] useInterval
- [x] useRendered
- [x] useScroll
- [x] useScrolling
- [x] useLocalStorage
- [x] useSessionStorage
- [x] useCounter
- [x] useToggle
- [x] useBoolean
- [ ] More...Welcome contribution

## Prior Art

vue-composition-toolkit is heavily inspired by [react-use](https://github.com/streamich/react-use).

## Contribution

We are really excited that you are interested in contributing to `vue-composition-toolkit`, read the following to learn how to contribute great work.

### Development Setup

This project is still in a very early stage, and `Vue3` has not yet released the npm package, therefore, you need to complete the following steps to start the project:

1. Cloning project

```sh
# clone vue-composition-toolkit
git clone https://github.com/shuidi-fed/vue-composition-toolkit.git
# clone vue3
git clone https://github.com/vuejs/vue-next.git
```

2. Building Vue3 locally

```sh
# clone
git clone https://github.com/vuejs/vue-next.git
# install deps
yarn
# build
yarn build --types
```

3. Installation deps & copy

```sh
# Installation deps
cd vue-composition-toolkit
yarn install

# Copy vue3 built resources to vue-composition-toolkit/node_modules/@vue
cp vue3/packages vue-composition-toolkit/node_modules/@vue
```

### Development Guide

1. Add a composition api function

Add the `useXXX.ts` file under the `src/` folder, for example: `useBoolean.ts`.

2. Add the corresponding test file

Add the corresponding test file under the `src/__tests__/` folder, for example: `src/__tests__/useBoolean.spec.ts`.

3. Add the corresponding story

A story is a showcase, stored in the `src/stories` folder, for example: `src/stories/useBoolean.story.ts`. A story should export a component(the default export), and the corresponding markdown document, then register the story in `examples/metaData.ts`.

4. Running story/example

Run the following command to start the story/example

```sh
yarn dev examples
```

### Run test

```sh
# run all tests
$ yarn test

# run tests in watch mode
$ yarn test --watch

# run tests in a specific file
$ yarn test fileName

# run a specific test in a specific file
$ yarn test fileName -t 'test name'
```

Debug single test file in vscode:

1. Open a test file
2. Make breakpoint
3. Click Start debugging

### Project Structure

- `src`: Store the source code of the composition api toolkit.
- `src/__tests__`: Store the test code associated with the composition api toolkit.
- `src/stories`: Store the `story/example` code associated with the composition api toolkit.
- `examples`: A simple version of the StoryBook alternative for vue-composition-toolkit.

## Core Author

**vue-composition-api** © [HcySunYang](https://github.com/HcySunYang), Released under the [MIT](./LICENSE) License.<br>
Authored and maintained by HcySunYang.

> [homepage](http://hcysun.me/homepage/) · GitHub [@HcySunYang](https://github.com/HcySunYang) · Twitter [@HcySunYang](https://twitter.com/HcySunYang)