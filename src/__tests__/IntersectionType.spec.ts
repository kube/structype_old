
      /*#######.
     ########",#:
   #########',##".
  ##'##'## .##',##.
   ## ## ## # ##",#.
    ## ## ## ## ##'
     ## ## ## :##
      ## ## ##*/

import { StaticCheck, IsSameStaticType } from './__helpers'

import { IntersectionType } from '../IntersectionType'
import { isType } from '../isType'
import { Number } from '../Primitives'
import { RawType } from '../RawType'

it('creates a new Type', () => {
  const PositiveNumber = RawType(
    (x: number): x is number => Number.test(x) && x >= 0
  )
  const EvenNumber = RawType(
    (x: number): x is number => Number.test(x) && x % 2 === 0
  )
  const EvenPositiveNumber = IntersectionType(
    PositiveNumber,
    EvenNumber
  )

  StaticCheck<
    IsSameStaticType<number, typeof EvenPositiveNumber.type>
  >()

  expect(isType(EvenPositiveNumber)).toBe(true)
})

it('validates correctly', () => {
  const PositiveNumber = RawType(
    (x: number): x is number => Number.test(x) && x >= 0
  )
  const EvenNumber = RawType(
    (x: number): x is number => Number.test(x) && x % 2 === 0
  )

  const EvenPositiveNumber = IntersectionType(
    PositiveNumber,
    EvenNumber
  )

  expect(EvenPositiveNumber.test(0)).toBe(true)
  expect(EvenPositiveNumber.test(43)).toBe(false)
  expect(EvenPositiveNumber.test(42)).toBe(true)
  expect(EvenPositiveNumber.test(-42)).toBe(false)
  expect(EvenPositiveNumber.test(-43)).toBe(false)
})

describe('IntersectionableType', () => {
  it('exposes an and method', () => {
    expect(typeof Number.and).toBe('function')
  })

  it('returns a valid IntersectionType', () => {
    const PositiveNumber = RawType(
      (x: number): x is number => Number.test(x) && x >= 0
    )
    const EvenNumber = RawType(
      (x: number): x is number => Number.test(x) && x % 2 === 0
    )

    const EvenPositiveNumber = PositiveNumber.and(EvenNumber)

    StaticCheck<
      IsSameStaticType<number, typeof EvenPositiveNumber.type>
    >()

    expect(EvenPositiveNumber.test(0)).toBe(true)
    expect(EvenPositiveNumber.test(43)).toBe(false)
    expect(EvenPositiveNumber.test(42)).toBe(true)
    expect(EvenPositiveNumber.test(-42)).toBe(false)
    expect(EvenPositiveNumber.test(-43)).toBe(false)
  })
})
