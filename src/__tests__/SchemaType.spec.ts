
      /*#######.
     ########",#:
   #########',##".
  ##'##'## .##',##.
   ## ## ## # ##",#.
    ## ## ## ## ##'
     ## ## ## :##
      ## ## ##*/

import {
  StaticCheck,
  IsSameStaticType,
  IsSubStaticType
} from './__helpers'

import { RawType } from '../RawType'
import { SchemaType } from '../SchemaType'
import { Number, String, Undefined } from '../Primitives'
import { LiteralType } from '../LiteralType'
import { UnionType } from '../UnionType'

const PositiveNumber = RawType(
  (x: any): x is number => Number.test(x) && x > 0
)

it('handles one-level objects', () => {
  const Person = SchemaType({
    firstName: String,
    lastName: String,
    age: PositiveNumber
  })

  type Person = typeof Person.type
  type ExpectedPersonType = {
    firstName: string
    lastName: string
    age: number
  }
  StaticCheck<IsSameStaticType<ExpectedPersonType, Person>>()

  expect(
    Person.test({ firstName: 'John', lastName: 'Doe', age: 42 })
  ).toBe(true)

  expect(
    // Age is not positive
    Person.test({ firstName: 'John', lastName: 'Doe', age: -42 })
  ).toBe(false)

  expect(
    // Age is not a number
    Person.test({ firstName: 'John', lastName: 'Doe', age: '42' })
  ).toBe(false)
})

it('handles nested objects', () => {
  const State = SchemaType({
    Hello: {
      A: UnionType(String, Undefined),
      B: UnionType(String, Number)
    },
    OptionalProp: UnionType(
      Undefined,
      SchemaType({
        A: LiteralType(42)
      })
    )
  })

  type State = typeof State.type
  type ExpectedStateType = {
    Hello: {
      A: string | undefined
      B: string | number
    }
    OptionalProp: { A: 42 } | undefined
  }
  StaticCheck<IsSameStaticType<ExpectedStateType, State>>()

  expect(State.test({ Hello: { B: 42 } })).toBe(true)
  expect(State.test({ Hello: { B: '42' } })).toBe(true)

  expect(
    State.test({
      Hello: { A: 'World', B: 42 }
    })
  ).toBe(true)

  expect(
    State.test({
      Hello: { A: 'World', B: 42 },
      OptionalProp: { A: 42 }
    })
  ).toBe(true)

  expect(
    State.test({
      Hello: { B: true }
    })
  ).toBe(false)

  expect(
    State.test({
      Hello: { A: 'World', B: 42 },
      OptionalProp: { A: 43 }
    })
  ).toBe(false)

  expect(
    State.test({
      Hello: { A: 'World', B: 42 },
      OptionalProp: { A: true }
    })
  ).toBe(false)
})

it('works with unions of two different SchemaTypes', () => {
  const Position = UnionType(
    SchemaType({
      x: Number,
      y: Number,
      z: Number
    }),
    SchemaType({
      latitude: Number,
      longitude: Number,
      altitude: Number
    })
  )

  type Position = typeof Position.type
  type ExpectedPositionType =
    | {
        x: number
        y: number
        z: number
      }
    | {
        latitude: number
        longitude: number
        altitude: number
      }

  // TODO: Fix IsSameStaticType to handle union at root level
  StaticCheck<IsSubStaticType<ExpectedPositionType, Position>>()
  StaticCheck<IsSubStaticType<Position, ExpectedPositionType>>()

  expect(
    Position.test({
      x: 42,
      y: -42,
      z: 0
    })
  ).toBe(true)

  expect(
    Position.test({
      latitude: 42.4242,
      longitude: -42.0042,
      altitude: 0.1311
    })
  ).toBe(true)

  expect(
    Position.test({
      x: '42',
      y: -42,
      z: 0
    })
  ).toBe(false)

  expect(
    Position.test({
      x: 42,
      longitude: -42,
      z: 0
    })
  ).toBe(false)
})
