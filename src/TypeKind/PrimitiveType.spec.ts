
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
import { PrimitiveType } from './PrimitiveType'

it('works', () => {
  const SomeString = PrimitiveType(String)
  type SomeString = typeof SomeString.type
  Assert<true, IsSameStaticType<SomeString, string>>()
})
