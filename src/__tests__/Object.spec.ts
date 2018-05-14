
      /*#######.
     ########",#:
   #########',##".
  ##'##'## .##',##.
   ## ## ## # ##",#.
    ## ## ## ## ##'
     ## ## ## :##
      ## ## ##*/

import { Type } from '../Type'
import { ObjectType } from '../Object'
import { StaticCheck, IsType } from './helpers'

const Number = Type((x: any): x is number => typeof x === 'number')

const String = Type((x: any): x is string => typeof x === 'string')

const PositiveNumber = Type(
  (x: any): x is number => Number.test(x) && x > 0
)

it('returns a correct validator', () => {
  const Person = ObjectType({
    firstName: String,
    lastName: String,
    age: PositiveNumber
  })

  // Check Static Type inference
  StaticCheck<
    IsType<
      {
        firstName: string
        lastName: string
        age: number
      },
      typeof Person.Type
    >
  >()

  expect(
    Person.test({
      firstName: 'John',
      lastName: 'Doe',
      age: 42
    })
  ).toBe(true)

  expect(
    Person.test({
      firstName: 'John',
      lastName: 'Doe',
      age: -42 // Age is not positive
    })
  ).toBe(false)

  expect(
    Person.test({
      firstName: 'John',
      lastName: 'Doe',
      age: '42' // Age is not a number
    })
  ).toBe(false)
})
