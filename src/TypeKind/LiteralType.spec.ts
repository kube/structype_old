
      /*#######.
     ########",#:
   #########',##".
  ##'##'## .##',##.
   ## ## ## # ##",#.
    ## ## ## ## ##'
     ## ## ## :##
      ## ## ##*/

import { LiteralType } from './LiteralType'

describe('LiteralType', () => {
  it('returns a literal kind', () => {
    const FortyTwo = LiteralType(42)
    expect(FortyTwo.kind).toBe('literal')
  })
})
