
      /*#######.
     ########",#:
   #########',##".
  ##'##'## .##',##.
   ## ## ## # ##",#.
    ## ## ## ## ##'
     ## ## ## :##
      ## ## ##*/

import 'jest'
import { Assert, IsSameStaticType } from '../helpers'
import { ObjectType } from './ObjectType'
import { LiteralType } from './LiteralType'
import { PrimitiveType } from './PrimitiveType'

describe('ObjectType', () => {
  it('returns an object kind', () => {
    const Paco = ObjectType({
      firstName: LiteralType('Paco'),
      lastName: 'de Lucia'
    })

    expect(Paco.kind).toBe('object')
  })
})



it('works', () => {
  const Animal = ObjectType({
    sex: LiteralType('Male').or('Female'),
    name: PrimitiveType(String).or(Number),
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
  Assert<true, IsSameStaticType<Expected, Animal>>()

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
