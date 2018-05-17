
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
  IsSubStaticType,
  IsSameStaticType
} from './__helpers'

import { UnionType } from '../UnionType'
import { isType } from '../isType'
import { Number, String } from '../Primitives'
import { RawType } from '../RawType'

it('creates a new Type', () => {
  const NumberOrString = UnionType(Number, String)
  type NumberOrString = typeof NumberOrString.type

  // TODO: Fix IsSameStaticType to allow unions at root
  StaticCheck<IsSubStaticType<number | string, NumberOrString>>()
  StaticCheck<IsSubStaticType<NumberOrString, number | string>>()

  expect(isType(NumberOrString)).toBe(true)
})

it('validates correctly', () => {
  const NumberOrString = UnionType(Number, String)
  type NumberOrString = typeof NumberOrString.type

  expect(NumberOrString.test('42')).toBe(true)
  expect(NumberOrString.test(42)).toBe(true)
  expect(NumberOrString.test({ 42: true })).toBe(false)
  expect(NumberOrString.test(null)).toBe(false)
})

describe('UnionableType', () => {
  it('exposes an or method', () => {
    expect(typeof Number.or).toBe('function')
  })

  it('returns a valid UnionType', () => {
    const PositiveNumber = RawType(
      (x: number): x is number => Number.test(x) && x >= 0
    )
    const EvenNumber = RawType(
      (x: number): x is number => Number.test(x) && x % 2 === 0
    )

    const EvenOrPositiveNumber = PositiveNumber.or(EvenNumber)

    StaticCheck<
      IsSameStaticType<number, typeof EvenOrPositiveNumber.type>
    >()

    expect(EvenOrPositiveNumber.test(0)).toBe(true)
    expect(EvenOrPositiveNumber.test(42)).toBe(true)
    expect(EvenOrPositiveNumber.test(43)).toBe(true)
    expect(EvenOrPositiveNumber.test(-42)).toBe(true)
    expect(EvenOrPositiveNumber.test(-43)).toBe(false)
  })
})
