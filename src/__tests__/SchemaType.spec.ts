
      /*#######.
     ########",#:
   #########',##".
  ##'##'## .##',##.
   ## ## ## # ##",#.
    ## ## ## ## ##'
     ## ## ## :##
      ## ## ##*/

import { createType } from '../createType'
import { SchemaType } from '../SchemaType'
import { StaticCheck, IsType } from './__helpers'

import { Number, String } from '../Primitives'

const PositiveNumber = createType(
  (x: any): x is number => Number.test(x) && x > 0
)

it('returns a correct validator', () => {
  const Person = SchemaType({
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
      typeof Person.type
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
