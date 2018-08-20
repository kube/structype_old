
      /*#######.
     ########",#:
   #########',##".
  ##'##'## .##',##.
   ## ## ## # ##",#.
    ## ## ## ## ##'
     ## ## ## :##
      ## ## ##*/

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
