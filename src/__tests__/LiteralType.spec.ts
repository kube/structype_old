
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
  IsSameStaticType,
  IsSubStaticType
} from './__helpers'

import { LiteralType } from '../LiteralType'
import { UnionType } from '../UnionType'
import { IntersectionType } from '../IntersectionType'

it('validates only passed literal', () => {
  const FortyTwo = LiteralType(42)
  type FortyTwo = typeof FortyTwo.type

  StaticCheck<IsSameStaticType<42, FortyTwo>>()

  expect(FortyTwo.test(42)).toBe(true)
  expect(FortyTwo.test(43)).toBe(false)
  expect(FortyTwo.test('42')).toBe(false)

  const True = LiteralType(true)
  type True = typeof True.type

  StaticCheck<IsSameStaticType<true, True>>()

  expect(True.test(true)).toBe(true)
  expect(True.test(false)).toBe(false)
  expect(True.test(0)).toBe(false)
  expect(True.test(1)).toBe(false)
  expect(True.test(null)).toBe(false)
})

it('allows unions', () => {
  const Hello = LiteralType('Hello')
  const FortyTwo = LiteralType(42)

  const HelloOrFortyTwo = UnionType(Hello, FortyTwo)
  type HelloOrFortyTwo = typeof HelloOrFortyTwo.type

  StaticCheck<IsSameStaticType<42, typeof FortyTwo.type>>()
  StaticCheck<IsSameStaticType<'Hello', typeof Hello.type>>()

  // TODO: Fix IsSameStaticType to allow unions at root
  StaticCheck<IsSubStaticType<'Hello' | 42, HelloOrFortyTwo>>()
  StaticCheck<IsSubStaticType<HelloOrFortyTwo, 'Hello' | 42>>()
})

it('allows intersections', () => {
  const Hello = LiteralType('Hello')
  const World = LiteralType('World')

  // This is the same type
  const HelloAndHello = IntersectionType(Hello, Hello)
  type HelloAndHello = typeof HelloAndHello.type

  StaticCheck<IsSameStaticType<'Hello', HelloAndHello>>()

  expect(HelloAndHello.test('Hello')).toBe(true)
  expect(HelloAndHello.test('World')).toBe(false)

  // This is impossible
  const HelloAndWorld = IntersectionType(Hello, World)
  type HelloAndWorld = typeof HelloAndWorld.type

  StaticCheck<IsSameStaticType<'Hello' & 'World', HelloAndWorld>>()

  expect(HelloAndWorld.test('Hello')).toBe(false)
  expect(HelloAndWorld.test('World')).toBe(false)
  expect(HelloAndWorld.test('Bonjour')).toBe(false)
})
