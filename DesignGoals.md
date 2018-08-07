# Design Goals

```ts
import { Type } from 'structype'

/**
{
  type: { ... }
  kind: 'object'
  literal: false
  black: false
}
**/
const Animal = Type({
  age: Type.Number.Positive,
  name: Type.String.NotEmpty,
  children: Type.Array(Animal),
  weight: PositiveNumber,
  height: PositiveNumber
})

/**
{
  type: { ... }
  kind: 'object'
  literal: false
  black: true
}
**/
const FatAnimal = Animal.and(animal => animal.weight / animal.height ** 2 > 30)

/**
{
  type: number
  kind: 'number'
  literal: false
  black: true
}
**/
const PositiveNumber = Type(Number).and(x => x % 2 === 0)
```
