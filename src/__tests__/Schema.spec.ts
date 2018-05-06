
      /*#######.
     ########",#:
   #########',##".
  ##'##'## .##',##.
   ## ## ## # ##",#.
    ## ## ## ## ##'
     ## ## ## :##
      ## ## ##*/

import { createSchema, isSchema } from '../Schema'
import { StaticCheck, IsType } from './helpers'

it('returns a validator', () => {
  const Number = createSchema(
    (x: any): x is number => typeof x === 'number'
  )

  expect(Number.test(42)).toBe(true)
  expect(Number.test('42')).toBe(false)

  // Check static type inference
  !((x: any) => {
    if (Number.test(x)) {
      StaticCheck<IsType<number, typeof x>>()
    }
  })
})

it('is possible to detect a Schema at runtime', () => {
  const Number = createSchema(
    (x: any): x is number => typeof x === 'number'
  )

  expect(isSchema(Number)).toBe(true)
  expect(isSchema({})).toBe(false)
})

it('can create union schema', () => {
  const FortyTwo = createSchema((x: any): x is 42 => x === 42)
  const OddNumber = createSchema(
    (x: any): x is number => typeof x === 'number' && x % 2 === 1
  )
  const FortyTwoOrOdd = FortyTwo.or(OddNumber)

  expect(FortyTwoOrOdd.test(0)).toBe(false)
  expect(FortyTwoOrOdd.test(1)).toBe(true)
  expect(FortyTwoOrOdd.test(42)).toBe(true)
  expect(FortyTwoOrOdd.test(43)).toBe(true)
  expect(FortyTwoOrOdd.test(44)).toBe(false)

  // Check static type inference
  !((x: any) => {
    if (FortyTwoOrOdd.test(x)) {
      StaticCheck<IsType<number, typeof x>>()
    }
  })
})

it('can create intersection schema', () => {
  const EvenNumber = createSchema(
    (x: any): x is number => typeof x === 'number' && x % 2 === 0
  )
  const PositiveNumber = createSchema(
    (x: any): x is number => typeof x === 'number' && x >= 0
  )

  const EvenPositiveNumber = EvenNumber.and(PositiveNumber)

  expect(EvenPositiveNumber.test(-43)).toBe(false)
  expect(EvenPositiveNumber.test(-42)).toBe(false)
  expect(EvenPositiveNumber.test(0)).toBe(true)
  expect(EvenPositiveNumber.test(42)).toBe(true)
  expect(EvenPositiveNumber.test(43)).toBe(false)

  // Check static type inference
  !((x: any) => {
    if (EvenPositiveNumber.test(x)) {
      StaticCheck<IsType<number, typeof x>>()
    }
  })
})
