# Structype

Schema/Type Validator. With static typing!

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

PositiveNumber(42) // true
PositiveNumber(-42) // false

const EvenNumber = createSchema(
  (x: any): x is number => typeof x === 'number' && x % 2 === 0
)

EvenNumber(-42) // true
EvenNumber(43) // false

// Intersection type
const EvenPositiveNumber = PositiveNumber.and(EvenNumber)

EvenPositiveNumber(-42) // false
EvenPositiveNumber(43) // false
EvenPositiveNumber(42) // true
```

## Static Type Inference

```ts
function handleInput(x: any) {
  if (EvenPositiveNumber(x)) {
    x.toExponential // x is a number
  } else {
    x // x is still any
  }
}
```
