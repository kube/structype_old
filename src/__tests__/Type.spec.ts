
      /*#######.
     ########",#:
   #########',##".
  ##'##'## .##',##.
   ## ## ## # ##",#.
    ## ## ## ## ##'
     ## ## ## :##
      ## ## ##*/

import { createType, isType } from '../Type'
import { StaticCheck, IsType } from './helpers'

it('returns a validator', () => {
  const Number = createType(
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

it('is possible to detect a Type at runtime', () => {
  const Number = createType(
    (x: any): x is number => typeof x === 'number'
  )

  expect(isType(Number)).toBe(true)
  expect(isType({})).toBe(false)
})

it('can create union Type', () => {
  const FortyTwo = createType((x: any): x is 42 => x === 42)
  const OddNumber = createType(
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

it('can create intersection Type', () => {
  const EvenNumber = createType(
    (x: any): x is number => typeof x === 'number' && x % 2 === 0
  )
  const PositiveNumber = createType(
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