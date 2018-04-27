
      /*#######.
     ########",#:
   #########',##".
  ##'##'## .##',##.
   ## ## ## # ##",#.
    ## ## ## ## ##'
     ## ## ## :##
      ## ## ##*/

import { createSchema } from '../Schema'

it('returns a validator', () => {
  const NumberSchema = createSchema(
    (x: any): x is number => typeof x === 'number'
  )

  expect(NumberSchema(42)).toBe(true)
  expect(NumberSchema('42')).toBe(false)
})

it('can create union schema', () => {
  const FortyTwo = createSchema((x: any): x is 42 => x === 42)
  const OddNumber = createSchema(
    (x: any): x is number => typeof x === 'number' && x % 2 === 1
  )
  const FortyTwoOrOddSchema = FortyTwo.or(OddNumber)

  expect(FortyTwoOrOddSchema(0)).toBe(false)
  expect(FortyTwoOrOddSchema(1)).toBe(true)
  expect(FortyTwoOrOddSchema(42)).toBe(true)
  expect(FortyTwoOrOddSchema(43)).toBe(true)
  expect(FortyTwoOrOddSchema(44)).toBe(false)
})

it('can create intersection schema', () => {
  const EvenNumber = createSchema(
    (x: any): x is number => typeof x === 'number' && x % 2 === 0
  )
  const PositiveNumber = createSchema(
    (x: any): x is number => typeof x === 'number' && x >= 0
  )

  const EvenPositiveNumber = EvenNumber.and(PositiveNumber)

  expect(EvenPositiveNumber(-43)).toBe(false)
  expect(EvenPositiveNumber(-42)).toBe(false)
  expect(EvenPositiveNumber(0)).toBe(true)
  expect(EvenPositiveNumber(42)).toBe(true)
  expect(EvenPositiveNumber(43)).toBe(false)
})
