
      /*#######.
     ########",#:
   #########',##".
  ##'##'## .##',##.
   ## ## ## # ##",#.
    ## ## ## ## ##'
     ## ## ## :##
      ## ## ##*/

import 'jest'
import { Assert, IsSameStaticType } from './__tests__/__helpers'
import { TypeFromTypeDescription } from './Type'

// Static-only checks
describe('TypeFromTypeProps', () => {
  it('handles string literal', () => {
    type Hello = TypeFromTypeDescription<'Hello'>
    Assert.True<IsSameStaticType<Hello['kind'], 'literal'>>()
    Assert.True<IsSameStaticType<Hello['type'], 'Hello'>>()
  })

  it('handles number literal', () => {
    type FortyTwo = TypeFromTypeDescription<42>
    Assert.True<IsSameStaticType<FortyTwo['kind'], 'literal'>>()
    Assert.True<IsSameStaticType<FortyTwo['type'], 42>>()
  })

  it('handles boolean literal', () => {
    type True = TypeFromTypeDescription<true>
    Assert.True<IsSameStaticType<True['kind'], 'literal'>>()
    Assert.True<IsSameStaticType<True['type'], true>>()

    type False = TypeFromTypeDescription<false>
    Assert.True<IsSameStaticType<False['kind'], 'literal'>>()
    Assert.True<IsSameStaticType<False['type'], false>>()
  })

  it('handles object description', () => {
    type Animal = TypeFromTypeDescription<{ age: number; color: string }>
    type Expected = { age: number; color: string }

    Assert.True<IsSameStaticType<Animal['kind'], 'object'>>()
    Assert.True<IsSameStaticType<Animal['type'], Expected>>()
  })

  it('handles object description with Primitive constructor', () => {
    type Animal = TypeFromTypeDescription<{
      age: NumberConstructor
      color: StringConstructor
    }>
    type Expected = { age: number; color: string }

    Assert.True<IsSameStaticType<Animal['kind'], 'object'>>()
    Assert.True<IsSameStaticType<Animal['type'], Expected>>()
  })
})
