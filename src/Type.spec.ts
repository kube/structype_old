
      /*#######.
     ########",#:
   #########',##".
  ##'##'## .##',##.
   ## ## ## # ##",#.
    ## ## ## ## ##'
     ## ## ## :##
      ## ## ##*/

import 'jest'
import { Type, UnionType, StaticTypeFromTypeProps } from './Type'
import { StaticCheck, IsSameStaticType } from './__helpers'

//
// DYNAMIC
//
describe('RegexType', () => {
  it('works', () => {
    const PhoneNumber = Type(/([0-9]{2}-?){5}/)

    StaticCheck<IsSameStaticType<string, typeof PhoneNumber.type>>()

    expect(PhoneNumber.test('06-25-97-07-71')).toBe(true)
    expect(PhoneNumber.test('06-25-97-07-71-')).toBe(true)
  })
})

describe('LiteralType', () => {
  it('works', () => {
    const FortyTwo = Type(42)
    type FortyTwo = typeof FortyTwo.type
    type ExpectedType = 42

    StaticCheck<IsSameStaticType<FortyTwo, ExpectedType>>()

    expect(FortyTwo.test(42)).toBe(true)
  })

  it('still works with unions', () => {
    const ThirteenOrFortyTwo = UnionType(13, 42)
    type ExpectedType = 13 | 42
    type ThirteenOrFortyTwo = typeof ThirteenOrFortyTwo.type

    StaticCheck<IsSameStaticType<ExpectedType, ThirteenOrFortyTwo>>()

    expect(ThirteenOrFortyTwo.test(13)).toBe(true)
    expect(ThirteenOrFortyTwo.test(42)).toBe(true)
    expect(ThirteenOrFortyTwo.test(43)).toBe(false)
    expect(ThirteenOrFortyTwo.test(-13)).toBe(false)
  })
})

//
// STATIC ONLY
//
describe('TypeFromTypeProps', () => {
  it('works for literal', () => {
    type FortyTwo = StaticTypeFromTypeProps<42>
    type ExpectedType = 42
    StaticCheck<IsSameStaticType<ExpectedType, FortyTwo>>()
  })

  it('works for objects', () => {
    type Animal = StaticTypeFromTypeProps<{ age: number }>
    type ExpectedType = { age: number }

    StaticCheck<IsSameStaticType<ExpectedType, Animal>>()
  })
})

//
// DYNAMIC
//
describe('ObjectType', () => {
  it('works', () => {
    const Animal = Type({
      age: Type(42),
      name: Type('Hello')
    })
    type Animal = typeof Animal.type
    type ExpectedType = { age: 42; name: 'Hello' }

    StaticCheck<IsSameStaticType<ExpectedType, Animal>>()

    expect(Animal.test({ age: 42, name: 'Hello' })).toBe(true)
    expect(Animal.test({ age: 42 })).toBe(false)
    expect(Animal.test({ age: 13, name: 'Hello' })).toBe(false)
  })
})

describe('Static', () => {
  describe('StaticTypeFromTypeProps', () => {})
  describe('TypeFromTypeProps', () => {})
})

describe('RegexType', () => {})

describe('LiteralType', () => {})

describe('ObjectType', () => {})

describe('UnionType', () => {})

describe('IntersectionType', () => {})

describe('Type', () => {

})
