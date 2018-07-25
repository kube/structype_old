
      /*#######.
     ########",#:
   #########',##".
  ##'##'## .##',##.
   ## ## ## # ##",#.
    ## ## ## ## ##'
     ## ## ## :##
      ## ## ##*/

import 'jest'
import { Type, UnionType } from './Type'
import { StaticCheck, IsSameStaticType } from './__helpers'

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
    type ExpectedType = 42
    type FortyTwo = typeof FortyTwo.type

    StaticCheck<IsSameStaticType<FortyTwo, ExpectedType>>()

    expect(FortyTwo.test(42)).toBe(true)
  })

  it('still works', () => {
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
