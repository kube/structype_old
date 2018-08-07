
      /*#######.
     ########",#:
   #########',##".
  ##'##'## .##',##.
   ## ## ## # ##",#.
    ## ## ## ## ##'
     ## ## ## :##
      ## ## ##*/

import { StaticType } from './Type'

export const STRUCTYPE_FLAG = '__STRUCTYPE__'

export type GenericType<K extends string, T extends StaticType, P> = {
  [STRUCTYPE_FLAG]: true
  type: T
  kind: K
  // TODO: Rename props to something else
  // to avoid ambiguity with TypeProps
  props: P
  test: (x: any) => x is T
}

/**
 * Generic Type Creator.
 */
export const GenericType = <K extends string, T extends StaticType, P>(
  kind: K,
  props: P,
  test: (x: any) => x is T
): GenericType<K, T, P> => ({
  [STRUCTYPE_FLAG]: true,
  type: (null as any) as T,
  kind,
  props,
  test
})
