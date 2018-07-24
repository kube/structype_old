
      /*#######.
     ########",#:
   #########',##".
  ##'##'## .##',##.
   ## ## ## # ##",#.
    ## ## ## ## ##'
     ## ## ## :##
      ## ## ##*/

import 'jest'
import { Type } from './Type'
import { StaticCheck, IsSameStaticType } from './__helpers'

describe('RegexType', () => {
  it('works', () => {
    const PhoneNumber = Type(/([0-9]{2}-?){5}/)

    StaticCheck<IsSameStaticType<string, typeof PhoneNumber.Type>>()

    expect(PhoneNumber.test('06-25-97-07-71')).toBe(true)
    expect(PhoneNumber.test('06-25-97-07-71-')).toBe(true)
  })
})

describe('LiteralType', () => {
  it('works', () => {
    const FortyTwo = Type(42)

    StaticCheck<IsSameStaticType<42, typeof FortyTwo.Type>>()

    expect(FortyTwo.test(42)).toBe(true)
  })
})
