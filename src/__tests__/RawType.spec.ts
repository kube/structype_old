
      /*#######.
     ########",#:
   #########',##".
  ##'##'## .##',##.
   ## ## ## # ##",#.
    ## ## ## ## ##'
     ## ## ## :##
      ## ## ##*/

import { StaticCheck, IsSameStaticType } from './__helpers'
import { RawType } from '..'
import { isType } from '../isType'

it('returns a Type', () => {
  const Number = RawType(
    (x: any): x is number => typeof x === 'number'
  )
  expect(isType(Number)).toBe(true)
})

it('can validate object', () => {
  const Number = RawType(
    (x: any): x is number => typeof x === 'number'
  )
  const PositiveNumber = RawType(
    (x: any): x is number => Number.test(x) && x >= 0
  )

  // Check Static Type inference
  StaticCheck<IsSameStaticType<number, typeof Number.type>>()

  expect(PositiveNumber.test(42)).toBe(true)
})

it('can create intersections', () => {
  const Number = RawType(
    (x: any): x is number => typeof x === 'number'
  )
  const PositiveNumber = RawType(
    (x: any): x is number => Number.test(x) && x >= 0
  )
  const EvenNumber = RawType(
    (x: any): x is number => Number.test(x) && x % 2 === 0
  )

  const EvenPositiveNumber = EvenNumber.and(PositiveNumber)

  // Check Static Type inference
  StaticCheck<
    IsSameStaticType<number, typeof EvenPositiveNumber.type>
  >()

  expect(EvenPositiveNumber.test(42)).toBe(true)
  expect(EvenPositiveNumber.test(-42)).toBe(false)
  expect(EvenPositiveNumber.test(-43)).toBe(false)
})

it('can create unions', () => {
  const Number = RawType(
    (x: any): x is number => typeof x === 'number'
  )
  const PositiveNumber = RawType(
    (x: any): x is number => Number.test(x) && x >= 0
  )
  const EvenNumber = RawType(
    (x: any): x is number => Number.test(x) && x % 2 === 0
  )

  const EvenPositiveNumber = EvenNumber.or(PositiveNumber)

  // Check Static Type inference
  StaticCheck<
    IsSameStaticType<number, typeof EvenPositiveNumber.type>
  >()

  expect(EvenPositiveNumber.test(42)).toBe(true)
  expect(EvenPositiveNumber.test(-42)).toBe(true)
  expect(EvenPositiveNumber.test(-43)).toBe(false)
})
