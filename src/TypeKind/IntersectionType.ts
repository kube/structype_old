
      /*#######.
     ########",#:
   #########',##".
  ##'##'## .##',##.
   ## ## ## # ##",#.
    ## ## ## ## ##'
     ## ## ## :##
      ## ## ##*/

import { AbstractType } from '../AbstractType'
import { TypeDescription, TypeFromTypeDescription, StaticTypeFromTypeDescription } from '../Type'

/**
 * Intersection Type Creator.
 */
export interface IntersectionType<P1 extends TypeDescription, P2 extends TypeDescription>
  extends AbstractType<
      'intersection',
      StaticTypeFromTypeDescription<P1> & StaticTypeFromTypeDescription<P2>,
      {},
      {
        left: TypeFromTypeDescription<P1>
        right: TypeFromTypeDescription<P2>
      }
    > {}
