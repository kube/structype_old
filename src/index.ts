
      /*#######.
     ########",#:
   #########',##".
  ##'##'## .##',##.
   ## ## ## # ##",#.
    ## ## ## ## ##'
     ## ## ## :##
      ## ## ##*/

import { Type as _Type } from './Type'
import { assign } from './assign'

const Type = assign(_Type, {
  Optional: () => console.log('OPTIONAL'),
  SayHello: () => console.log('Hello')
})

/////////

export const Animal = Type({
  name: Type(String).or(Number),
  hello: Number
})

let obj: any
if (Animal.test(obj)) {
  console.log(obj.hello)
}

Type.Optional()
