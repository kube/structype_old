
      /*#######.
     ########",#:
   #########',##".
  ##'##'## .##',##.
   ## ## ## # ##",#.
    ## ## ## ## ##'
     ## ## ## :##
      ## ## ##*/

import 'jest'
import { StaticCheck, IsSameStaticType } from './__helpers';
import { TypeFromTypeProps, Type } from './Type';

// Static-only checks
describe('TypeFromTypeProps', () => {
  it('handles string literal', () => {
    type Hello = TypeFromTypeProps<'Hello'>
    StaticCheck<IsSameStaticType<Hello['kind'], 'literal'>>()
    StaticCheck<IsSameStaticType<Hello['type'], 'Hello'>>()
  })

  it('handles number literal', () => {
    type FortyTwo = TypeFromTypeProps<42>
    StaticCheck<IsSameStaticType<FortyTwo['kind'], 'literal'>>()
    StaticCheck<IsSameStaticType<FortyTwo['type'], 42>>()
  })

  it('handles boolean literal', () => {
    type True = TypeFromTypeProps<true>
    StaticCheck<IsSameStaticType<True['kind'], 'literal'>>()
    StaticCheck<IsSameStaticType<True['type'], true>>()

    type False = TypeFromTypeProps<false>
    StaticCheck<IsSameStaticType<False['kind'], 'literal'>>()
    StaticCheck<IsSameStaticType<False['type'], false>>()
  })

  it('handles object description', () => {
    type Animal = TypeFromTypeProps<{ age: number, color: string }>
    type Expected = { age: number, color: string }

    StaticCheck<IsSameStaticType<Animal['kind'], 'object'>>()
    StaticCheck<IsSameStaticType<Animal['type'], Expected>>()
  })
})

describe('RegexType', () => {})

describe('LiteralType', () => {
  it('returns a literal kind', () => {
    const FortyTwo = Type(42)
    expect(FortyTwo.kind).toBe('literal')
  })
})

describe('ObjectType', () => {
  it('returns an object kind', () => {
    const Paco = Type({ firstName: Type('Paco'), lastName: 'de Lucia' })
    // type Paco = typeof Paco.type
    // expect(Paco.kind).toBe('object')
  })
})

describe('UnionType', () => {})

describe('IntersectionType', () => {})

describe('Type', () => {})
