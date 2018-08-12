
      /*#######.
     ########",#:
   #########',##".
  ##'##'## .##',##.
   ## ## ## # ##",#.
    ## ## ## ## ##'
     ## ## ## :##
      ## ## ##*/

import 'jest'
import { StaticCheck, IsSameStaticType } from './__helpers'
import { TypeFromTypeProps, Type } from '../Type'

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
    type Animal = TypeFromTypeProps<{ age: number; color: string }>
    type Expected = { age: number; color: string }

    StaticCheck<IsSameStaticType<Animal['kind'], 'object'>>()
    StaticCheck<IsSameStaticType<Animal['type'], Expected>>()
  })

  it('handles object description with Primitive constructor', () => {
    type Animal = TypeFromTypeProps<{
      age: NumberConstructor
      color: StringConstructor
    }>
    type Expected = { age: number; color: string }

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
    const Paco = Type({
      firstName: Type('Paco'),
      lastName: 'de Lucia'
    })
    // type Paco = typeof Paco.type
    expect(Paco.kind).toBe('object')
  })
})

describe('PrimitiveType', () => {
  it('works', () => {
    const SomeString = Type(String)
    type SomeString = typeof SomeString.type
    StaticCheck<IsSameStaticType<SomeString, string>>()
  })

  it('works', () => {
    const Animal = Type({
      sex: Type('Male').or('Female'),
      name: Type(String).or(Number),
      age: Number,
      props: {
        a: String,
        b: Number
      }
    })
    type Animal = typeof Animal.type
    type Expected = {
      sex: 'Male' | 'Female'
      name: string | number
      age: number
      props: {
        a: string
        b: number
      }
    }
    StaticCheck<IsSameStaticType<Expected, Animal>>()

    expect(
      Animal.test({
        sex: 'Male',
        name: 'Hello',
        age: 42,
        props: { a: 'Hello', b: 42 }
      })
    ).toBe(true)

    expect(
      Animal.test({
        name: 42,
        age: 42,
        props: { a: 'Hello', b: 42 }
      })
    ).toBe(false)
  })
})

describe('UnionType', () => {})

describe('IntersectionType', () => {})

describe('Type', () => {})
