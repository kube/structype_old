
      /*#######.
     ########",#:
   #########',##".
  ##'##'## .##',##.
   ## ## ## # ##",#.
    ## ## ## ## ##'
     ## ## ## :##
      ## ## ##*/

import { GenericType } from './GenericType'
import { TypeProps, TypeFromTypeProps, StaticTypeFromTypeProps } from './Type'

/**
 * Intersection Type Creator.
 */
export interface IntersectionType<P1 extends TypeProps, P2 extends TypeProps>
  extends GenericType<
      'intersection',
      StaticTypeFromTypeProps<P1> & StaticTypeFromTypeProps<P2>,
      {
        left: TypeFromTypeProps<P1>
        right: TypeFromTypeProps<P2>
      }
    > {}
