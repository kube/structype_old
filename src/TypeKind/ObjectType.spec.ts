
      /*#######.
     ########",#:
   #########',##".
  ##'##'## .##',##.
   ## ## ## # ##",#.
    ## ## ## ## ##'
     ## ## ## :##
      ## ## ##*/

import { ObjectType } from './ObjectType'
import { LiteralType } from './LiteralType'

describe('ObjectType', () => {
  it('returns an object kind', () => {
    const Paco = ObjectType({
      firstName: LiteralType('Paco'),
      lastName: 'de Lucia'
    })

    expect(Paco.kind).toBe('object')
  })
})
