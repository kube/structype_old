[![CircleCI](https://circleci.com/gh/kube/structype.svg?style=svg)](https://circleci.com/gh/kube/structype)

<h1 align="center" style="text-align: center">
  <img width="310" alt="Structype" src="https://rawgithub.com/kube/structype/master/logo.svg">
</h1>

<h3 align="center">Structural Type validation. Statically-typed.</h3>

## Install

```sh
yarn add structype
```

## Usage

```ts
import { Type, String, Number } from 'structype'

export const Person = Type({
  firstName: String,
  lastName: String,
  age: Number
})

export type Person = typeof Person.type
```

## Static Type Inference

```ts
function handleInput(obj: any) {
  if (Person.test(obj)) {
    obj // x is a Person
  } else {
    obj // x is still any
  }
}
```
