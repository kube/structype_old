
      /*#######.
     ########",#:
   #########',##".
  ##'##'## .##',##.
   ## ## ## # ##",#.
    ## ## ## ## ##'
     ## ## ## :##
      ## ## ##*/

import 'jest'
import { Assert, IsSameStaticType, IsSubStaticType } from '../__tests__/__helpers'

import { Type } from '../Type'
import { OptionalType, Optional } from '../Optional'

describe('OptionalType', () => {
  it('works statically', () => {
    const Person = Type({ name: String })

    type PersonType = typeof Person
    type OptionalPersonType = OptionalType<PersonType>

    Assert.False<IsSubStaticType<OptionalType, PersonType>>()
    Assert.True<IsSubStaticType<OptionalType, OptionalPersonType>>()

    type Person = PersonType['type']
    type OptionalPerson = OptionalPersonType['type']

    Assert.True<IsSameStaticType<Person, OptionalPerson>>()
  })

  it('works with runtime function', () => {
    const Person = Type({ name: String })
    const OptionalPerson = Optional({ name: String })

    type Person = typeof Person.type
    type OptionalPerson = typeof OptionalPerson.type
    type Expected = { name: string }

    Assert.True<IsSameStaticType<Expected, Person>>()
    Assert.True<IsSameStaticType<Expected, OptionalPerson>>()
    Assert.True<IsSameStaticType<Person, OptionalPerson>>()
  })

  it('works on objects', () => {
    const Person = Type({
      name: String,
      lastName: String,
      //TODO: CHECK WHY OPTIONAL DOES SHIT ON STATIC INFERENCE
      age: Optional(Number),
      surname: Optional(String)
    })

    type Person = typeof Person.type
    type Expected = {
      name: string
      lastName: string
      age?: number
      surname?: string
    }

    type Keys = keyof Person

    let p: Person
    p.

    // type R = {
    //   StaticTypeFromTypeDescription<typeof p.age>
    // }

    // Assert.True<IsSameStaticType<Expected, Person>>()
  })
})
