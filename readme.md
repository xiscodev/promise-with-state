<div style="display: -ms-flexbox; display: -webkit-flex; display: flex; -webkit-flex-direction: row; -ms-flex-direction: row; flex-direction: row; -webkit-flex-wrap: wrap; -ms-flex-wrap: wrap; flex-wrap: wrap; -webkit-justify-content: center; -ms-flex-pack: center; justify-content: center; -webkit-align-content: center; -ms-flex-line-pack: center; align-content: center; -webkit-align-items: center; -ms-flex-align: center; align-items: center;">
  <img style="-webkit-order: 0; -ms-flex-order: 0; order: 0; -webkit-flex: 0 1 auto; -ms-flex: 0 1 auto; flex: 0 1 auto; -webkit-align-self: auto; -ms-flex-item-align: auto; align-self: auto;" src="icon.png" />
</div>

<h1 style="text-align:center;">Promise with state</h1>

## What is this?

A library to use queryable promises or make native promise A+ queryable.

## Why?

According to [Promises/A+](https://promisesaplus.com) standard definition, a [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) is a "thenable" object, which sets itself into 3 different states: [PENDING](#pending), [FULFILLED](#fulfilled), or [REJECTED](#rejected). However, there is no way to ask a promise which state it is only know it has fulfilled or rejected. With this library you can create queryable promise or make native promise queryable.

## A little bit about promises

Let see a typical Promise use:

```js
new Promise((resolve, reject) => {
  if (condition) {
    resolve(result)
  } else {
    reject(err)
  }
})
```

A promise is built to fulfill or reject whatever its executor function defines, so a promise and its executor callback can look like this:

```js
const functionExecutor = (resolve, reject) => {
  if (condition) {
    resolve(result)
  } else {
    reject(err)
  }
}

new Promise(functionExecutor)
```

This package was made to handle both cases, when a Promise instance is handled or if an executor callback is instead

Feel free to look the source code on the [github repository](https://github.com/xiscodev/promise-with-state/) of this project

## How to use it?

First you need to install it to your project.

```bash
npm install promise-with-state
```

Then import it in your project.

*   *The require way*

```js
let { QueryablePromise } = require("promise-with-state");
```

*   *The import way*

```js
import { QueryablePromise } from "promise-with-state";
```

Use it so you can instantiate [QueryablePromise](#queryablepromise) to create Promises that are queryable.

*   in the case it resolves

```js
  import { QueryablePromise } from "promise-with-state";

  const queryableWithResolution = new QueryablePromise((resolve, reject) => {
    // YOUR OWN CODE AND STUFF
    resolve()
  })

  console.log(queryableWithResolution.state)
  // PENDING
  console.log(queryableWithResolution.isPending())
  // true
  console.log(queryableWithResolution.isFulfilled())
  // false
  console.log(queryableWithResolution.isRejected())
  // false

  queryableWithResolution
  .then(() => {
    console.log(queryableWithResolution.state)
    // FULFILLED
    console.log(queryableWithResolution.isPending())
    // false
    console.log(queryableWithResolution.isFulfilled())
    // true
  })
  .catch()
```

*   in the case it rejects

```js
  import { QueryablePromise } from "promise-with-state";
  const promiseExecutor = (resolve, reject) => {
    // YOUR OWN CODE AND STUFF
    reject()
  }

  const queryableWithRejection = new QueryablePromise(promiseExecutor)

  console.log(queryableWithRejection.state)
  // PENDING
  console.log(queryableWithRejection.isPending())
  // true
  console.log(queryableWithRejection.isFulfilled())
  // false
  console.log(queryableWithRejection.isRejected())
  // false

  queryableWithRejection
  .then() // promises always should has thenable
  .catch((err) => {
    console.log(queryableWithRejection.state)
    // REJECTED
    console.log(queryableWithRejection.isPending())
    // false
    console.log(queryableWithRejection.isRejected())
    // true
    handleError(err)
  })
```

The states for queryable promises are grouped in a constant called [PromiseState](#promisestate)

```js
  import { PromiseState } from "promise-with-state";

  console.log(PromiseState)
  // {
  //   "PENDING": "PENDING",
  //   "FULFILLED": "FULFILLED",
  //   "REJECTED": "REJECTED"
  // }

  const queryableWithResolution = new QueryablePromise((resolve, reject) => {
    // YOUR OWN CODE AND STUFF
    resolve(foo)
  })

  console.log(queryableWithResolution.state === PromiseState.PENDING)
  // true
```

Native thenables can be transformed into queryable promises with [makeQueryablePromise](#makequeryablepromise).

```js
  import { makeQueryablePromise } from "promise-with-state";

  const promiseExecutor = (resolve, reject) => {
    // YOUR OWN CODE AND STUFF
    if (condition) {
      resolve()
    } else {
      reject()
    }
  }

  const processTextPromise = new Promise(promiseExecutor)
  const queryableTextPromise = makeQueryablePromise(processTextPromise)

  queryableTextPromise
    // if resolves
    .then(() => {
      console.log(queryableTextPromise.state)
      // FULFILLED
      console.log(queryableTextPromise.isPending())
      // false
      console.log(queryableTextPromise.isFulfilled())
      // true
    })
    // if rejects
    .catch(() => {
      console.log(queryableTextPromise.state)
      // REJECTED
      console.log(queryableTextPromise.isPending())
      // false
      console.log(queryableTextPromise.isRejected())
      // true
    })
    // whatever happens here
    .finally(() => {
      console.log(queryableTextPromise.isPending())
      // false
    })
```

Powered by <https://xisco.dev>

<details>
<summary>Additional JSDOC info</summary>

### JSDOC

<!-- Generated by documentation.js. Update this documentation by updating the source code. -->

##### Table of Contents

*   [makeQueryablePromise](#makequeryablepromise)
    *   [Parameters](#parameters)
*   [PromiseExecutor](#promiseexecutor)
*   [PromiseState](#promisestate)
    *   [PENDING](#pending)
    *   [FULFILLED](#fulfilled)
    *   [REJECTED](#rejected)
*   [QueryablePromise](#queryablepromise)
    *   [Parameters](#parameters-1)
    *   [then](#then)
        *   [Parameters](#parameters-2)
    *   [catch](#catch)
        *   [Parameters](#parameters-3)
    *   [finally](#finally)
        *   [Parameters](#parameters-4)
    *   [state](#state)
    *   [isPending](#ispending)
    *   [isFulfilled](#isfulfilled)
    *   [isRejected](#isrejected)

#### makeQueryablePromise

Takes a native Promise and returns a QueryablePromise with state and query methods.

##### Parameters

*   `fnExecutor` **[Function](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Statements/function)** The native Promise or function which contains fulfill and reject callbacks

<!---->

*   Throws **[Error](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Error)** if the fnExecutor is invalid

Returns **[QueryablePromise](#queryablepromise)** A QueryablePromise instance with state and query methods.

#### PromiseExecutor

describes what a promise executor should look like

Type: function (fulfill: function (value: (T | PromiseLike\<T>)): void, reject: function (reason: any): void): void

#### PromiseState

Contains queryable promise states

##### PENDING

Promise state PENDING for queryable promise

Type: [PromiseState](#promisestate)

##### FULFILLED

Promise state FULFILLED for queryable promise

Type: [PromiseState](#promisestate)

##### REJECTED

Promise state REJECTED for queryable promise

Type: [PromiseState](#promisestate)

#### QueryablePromise

##### Parameters

*   `fnExecutor` **[Function](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Statements/function)** The native Promise or function which contains fulfill and reject callbacks

##### then

then method refers to promise method.

###### Parameters

*   `onFulfilled` **[Function](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Statements/function)** callback function to run on fulfilled
*   `onRejected` **[Function](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Statements/function)** callback function to run on rejected

Returns **[QueryablePromise](#queryablepromise)** returns class instance

##### catch

catch method refers to promise method.

###### Parameters

*   `onRejected` **[Function](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Statements/function)** callback function to run on rejected

Returns **[QueryablePromise](#queryablepromise)** returns class instance

##### finally

finally method refers to promise method.

###### Parameters

*   `onFinally` **[Function](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Statements/function)** callback function that can run after fulfilled or rejected states

Returns **[QueryablePromise](#queryablepromise)** returns class instance

##### state

Getter for queryable promise state.

Type: [PromiseState](#promisestate)

Returns **[PromiseState](#promisestate)** contains current promise state

##### isPending

a function that retrieves if queried state is the actual queryable promise state.

Returns **[boolean](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** a boolean whether a queryable promise state is PENDING

##### isFulfilled

a function that retrieves if queried state is the actual queryable promise state.

Returns **[boolean](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** a boolean whether a queryable promise state is FULFILLED

##### isRejected

a function that retrieves if queried state is the actual queryable promise state.

Returns **[boolean](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** a boolean whether a queryable promise state is REJECTED
