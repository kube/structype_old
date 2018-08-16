
      /*#######.
     ########",#:
   #########',##".
  ##'##'## .##',##.
   ## ## ## # ##",#.
    ## ## ## ## ##'
     ## ## ## :##
      ## ## ##*/

import 'jest'
import { Assert, IsSameStaticType } from './__helpers'
import { TypeFromTypeDescription, Type } from '../Type'
import { OptionalType, IsOptionalType } from '../Optional'

describe('OptionalType', () => {
  it('works statically', () => {
    const Person = Type({
      name: String
    })
    type PersonType = typeof Person

    type OptionalPersonType = OptionalType<PersonType>
    Assert.False<IsOptionalType<PersonType>>()
    Assert.True<IsOptionalType<OptionalPersonType>>()

    type Person = PersonType['type']
    type OptionalPerson = OptionalPersonType['type']
  })
})

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
    Assert.True<IsSameStaticType<SomeString, string>>()
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
    Assert.True<IsSameStaticType<Expected, Animal>>()

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
