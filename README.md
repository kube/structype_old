[![CircleCI](https://circleci.com/gh/kube/structype.svg?style=svg)](https://circleci.com/gh/kube/structype)

<h1 align="center">
  <img width="310" alt="Structype" src="logo.svg">
</h1>

<h3 align="center">Schema/Type Validator. With static typing!</h3>

## Install

```sh
yarn add structype
```

## Usage

```ts
import { createSchema } from 'structype'

const PositiveNumber = createSchema(
  (x: any): x is number => typeof x === 'number' && x >= 0
)

PositiveNumber.test(42) // true
PositiveNumber.test(-42) // false

const EvenNumber = createSchema(
  (x: any): x is number => typeof x === 'number' && x % 2 === 0
)

EvenNumber.test(-42) // true
EvenNumber.test(43) // false

// Intersection type
const EvenPositiveNumber = PositiveNumber.and(EvenNumber)

EvenPositiveNumber.test(-42) // false
EvenPositiveNumber.test(43) // false
EvenPositiveNumber.test(42) // true
```

## Static Type Inference

```ts
function handleInput(x: any) {
  if (EvenPositiveNumber.test(x)) {
    x // x is a number
  } else {
    x // x is still any
  }
}
```
