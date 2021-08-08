<div style="display: -ms-flexbox; display: -webkit-flex; display: flex; -webkit-flex-direction: row; -ms-flex-direction: row; flex-direction: row; -webkit-flex-wrap: wrap; -ms-flex-wrap: wrap; flex-wrap: wrap; -webkit-justify-content: center; -ms-flex-pack: center; justify-content: center; -webkit-align-content: center; -ms-flex-line-pack: center; align-content: center; -webkit-align-items: center; -ms-flex-align: center; align-items: center;">
  <img style="-webkit-order: 0; -ms-flex-order: 0; order: 0; -webkit-flex: 0 1 auto; -ms-flex: 0 1 auto; flex: 0 1 auto; -webkit-align-self: auto; -ms-flex-item-align: auto; align-self: auto;" src="icon.png" />
</div>

<h1 style="text-align:center;">Promise with state</h1>

## What is this?

A library to use queryable promises or make native promise A+ queryable.

## Why?

According to [Promises/A+](https://promisesaplus.com) standard definition, a [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) is a "thenable" object, which sets itself into 3 different states: [PENDING](#pending), [FULFILLED](#fulfilled), or [REJECTED](#rejected). However, there is no way to ask a promise which state it is only know it has fulfilled or rejected. With this library you can create queryable promise or make native promise queryable.

## How to use it?

First you need to import it in your project.

*The require way*

```js
let { QueryablePromise } = require("promise-with-state");
```

*The import way*

```js
import { QueryablePromise } from "promise-with-state";
```

Then you can instantiate [QueryablePromise](#queryablepromise) to create Promises that are queryable for its state.

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

  const queryableWithRejection = new QueryablePromise((resolve, reject) => {
    // YOUR OWN CODE AND STUFF
    reject()
  })

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
  .catch(() => {
    console.log(queryableWithRejection.state)
    // REJECTED
    console.log(queryableWithRejection.isPending())
    // false
    console.log(queryableWithRejection.isRejected())
    // true
  })
```

The states for queryable promises are grouped in a constant called [QueryablePromiseState](#queryablepromisestate)

```js
  import { QueryablePromise, QueryablePromiseState } from "promise-with-state";

  const queryablePromise = new QueryablePromise((resolve, reject) => {
    // YOUR OWN CODE AND STUFF
  })

  console.log(queryablePromise.state)
  // PENDING
  console.log(queryablePromise.isPending())
  // true
  console.log(queryablePromise.state === QueryablePromiseState.PENDING)
  // true
  console.log(queryablePromise.isFulfilled())
  // false
  console.log(queryablePromise.isRejected())
  // false
```

Native thenables can be transformed into queryable promises with [makeQueryablePromise](#makequeryablepromise).

```js
  import { makeQueryablePromise, QueryablePromiseState } from "promise-with-state";

  const processTextPromise = new Promise((resolve, reject) => {
    // YOUR OWN CODE AND STUFF
    if (condition) {
      resolve()
    } else {
      reject()
    }
  })

  const queryableTextPromise = makeQueryablePromise(processTextPromise)

  console.log(queryableTextPromise.state)
  // PENDING
  console.log(queryableTextPromise.isPending())
  // true
  console.log(queryableTextPromise.isFulfilled())
  // false
  console.log(queryableTextPromise.isRejected())
  // false

  processTextPromise
    // if resolves
    .then(() => {
      console.log(processTextPromise.state)
      // FULFILLED
      console.log(processTextPromise.isPending())
      // false
      console.log(processTextPromise.isFulfilled())
      // true
    })
    // if rejects
    .catch(() => {
      console.log(processTextPromise.state)
      // REJECTED
      console.log(processTextPromise.isPending())
      // false
      console.log(processTextPromise.isRejected())
      // true
    })
    .finally(() => {
      console.log(processTextPromise.isPending())
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
    *   [isPending](#ispending)
    *   [isFulfilled](#isfulfilled)
    *   [isRejected](#isrejected)
*   [QueryablePromise](#queryablepromise)
    *   [Parameters](#parameters-1)
    *   [resolve](#resolve)
        *   [Parameters](#parameters-2)
    *   [reject](#reject)
        *   [Parameters](#parameters-3)
    *   [toStringTag](#tostringtag)
    *   [then](#then)
        *   [Parameters](#parameters-4)
    *   [catch](#catch)
        *   [Parameters](#parameters-5)
    *   [finally](#finally)
        *   [Parameters](#parameters-6)
    *   [state](#state)
    *   [isPending](#ispending-1)
    *   [isFulfilled](#isfulfilled-1)
    *   [isRejected](#isrejected-1)
*   [QueryablePromiseState](#queryablepromisestate)
    *   [PENDING](#pending)
    *   [FULFILLED](#fulfilled)
    *   [REJECTED](#rejected)

#### makeQueryablePromise

Transform any promise to queryable promise.

##### Parameters

*   `thenable` **[Promise](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)** the promise to be transformed

Returns **any** a promise enhanced with state query methods

##### isPending

retrieves true if queried state is actual queryable promise state.

Returns **[boolean](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** true when queryable promise state is PENDING

##### isFulfilled

retrieves true if queried state is actual queryable promise state.

Returns **[boolean](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** true when queryable promise state is FULFILLED

##### isRejected

retrieves true if queried state is actual queryable promise state.

Returns **[boolean](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** true when queryable promise state is REJECTED

#### QueryablePromise

##### Parameters

*   `fnExecutor` **[Function](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Statements/function)** function which contains fulfill and reject resolvers for Promise

##### resolve

then method refers to promise method

###### Parameters

*   `x` **any** the result value of resolve

Returns **[QueryablePromise](#queryablepromise)** the resolve instance of the class

##### reject

then method refers to promise method

###### Parameters

*   `y` **any** the reason or message error

Returns **[QueryablePromise](#queryablepromise)** the reject instance of the class

##### toStringTag

the property \[Symbol.toStringTag] included in Promise

Type: [string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)

Returns **[QueryablePromise](#queryablepromise)** returns class instance

##### then

then method refers to promise method

###### Parameters

*   `fn` **any** method accepts a callback function

Returns **[QueryablePromise](#queryablepromise)** returns class instance

##### catch

catch method refers to promise method

###### Parameters

*   `fn` **any** method accepts a callback function

Returns **[QueryablePromise](#queryablepromise)** returns class instance

##### finally

catch method refers to promise method

###### Parameters

*   `fn` **any** method accepts a callback function

Returns **[QueryablePromise](#queryablepromise)** returns class instance

##### state

Getter for queryable promise state.

Type: [QueryablePromiseState](#queryablepromisestate)

Returns **[QueryablePromiseState](#queryablepromisestate)** contains current promise state

##### isPending

retrieves true if queried state is actual queryable promise state.

Returns **[boolean](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** true when queryable promise state is PENDING

##### isFulfilled

retrieves true if queried state is actual queryable promise state.

Returns **[boolean](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** true when queryable promise state is FULFILLED

##### isRejected

retrieves true if queried state is actual queryable promise state.

Returns **[boolean](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** true when queryable promise state is REJECTED

#### QueryablePromiseState

Contains queryable promise states

Type: [object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)

##### PENDING

Promise state PENDING for queryable

Type: [QueryablePromiseState](#queryablepromisestate)

##### FULFILLED

Promise state FULFILLED for queryable

Type: [QueryablePromiseState](#queryablepromisestate)

##### REJECTED

Promise state REJECTED for queryable

Type: [QueryablePromiseState](#queryablepromisestate)
