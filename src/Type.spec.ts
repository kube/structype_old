
      /*#######.
     ########",#:
   #########',##".
  ##'##'## .##',##.
   ## ## ## # ##",#.
    ## ## ## ## ##'
     ## ## ## :##
      ## ## ##*/

import 'jest'
import { Assert, IsSameStaticType } from './helpers'
import { TypeFromTypeDescription } from './Type'

describe('TypeFromTypeProps', () => {
  it('handles string literal', () => {
    type Hello = TypeFromTypeDescription<'Hello'>
    Assert<true, IsSameStaticType<Hello['kind'], 'literal'>>()
    Assert<true, IsSameStaticType<Hello['type'], 'Hello'>>()
  })

  it('handles number literal', () => {
    type FortyTwo = TypeFromTypeDescription<42>
    Assert<true, IsSameStaticType<FortyTwo['kind'], 'literal'>>()
    Assert<true, IsSameStaticType<FortyTwo['type'], 42>>()
  })

  it('handles boolean literal', () => {
    type True = TypeFromTypeDescription<true>
    Assert<true, IsSameStaticType<True['kind'], 'literal'>>()
    Assert<true, IsSameStaticType<True['type'], true>>()

    type False = TypeFromTypeDescription<false>
    Assert<true, IsSameStaticType<False['kind'], 'literal'>>()
    Assert<true, IsSameStaticType<False['type'], false>>()
  })

  it('handles object description', () => {
    type Animal = TypeFromTypeDescription<{ age: number; color: string }>
    type Expected = { age: number; color: string }

    Assert<true, IsSameStaticType<Animal['kind'], 'object'>>()
    Assert<true, IsSameStaticType<Animal['type'], Expected>>()
  })

  it('handles object description with Primitive constructor', () => {
    type Animal = TypeFromTypeDescription<{
      age: NumberConstructor
      color: StringConstructor
    }>
    type Expected = { age: number; color: string }

    Assert<true, IsSameStaticType<Animal['kind'], 'object'>>()
    Assert<true, IsSameStaticType<Animal['type'], Expected>>()
  })
})
