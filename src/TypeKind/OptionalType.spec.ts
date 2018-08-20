
      /*#######.
     ########",#:
   #########',##".
  ##'##'## .##',##.
   ## ## ## # ##",#.
    ## ## ## ## ##'
     ## ## ## :##
      ## ## ##*/

import 'jest'
import { Assert, IsSubStaticType, IsSameStaticType } from '../helpers'
import { Type } from '../Type'
import { OptionalType } from '../OptionalType'

it('works statically', () => {
  const Person = Type({ name: String })

  type PersonType = typeof Person
  type OptionalPersonType = OptionalType<PersonType>

  Assert<false, IsSubStaticType<OptionalType, PersonType>>()
  Assert<true, IsSubStaticType<OptionalType, OptionalPersonType>>()

  type Person = PersonType['type']
  type OptionalPerson = OptionalPersonType['type']

  Assert<true, IsSameStaticType<Person, OptionalPerson>>()
})

it('works with runtime function', () => {
  const Person = Type({ name: String })
  const OptionalPerson = OptionalType({ name: String })

  type Person = typeof Person.type
  type OptionalPerson = typeof OptionalPerson.type
  type Expected = { name: string }

  Assert<true, IsSameStaticType<Expected, Person>>()
  Assert<true, IsSameStaticType<Expected, OptionalPerson>>()
  Assert<true, IsSameStaticType<Person, OptionalPerson>>()
})

it('works on objects', () => {
  const Person = Type({
    name: String,
    lastName: String,
    //TODO: CHECK WHY OPTIONAL DOES SHIT ON STATIC INFERENCE
    age: OptionalType(Number),
    surname: OptionalType(String)
  })

  type Person = typeof Person.type
  type Expected = {
    name: string
    lastName: string
    age?: number
    surname?: string
  }
})
