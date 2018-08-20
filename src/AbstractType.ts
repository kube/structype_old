
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

export type TypeFlags = {
  optional?: boolean
  black?: boolean
  literal?: boolean
}

export type AbstractType<
  K extends string = string,
  T extends StaticType = StaticType,
  F extends TypeFlags = TypeFlags,
  P = any
> = {
  [STRUCTYPE_FLAG]: true
  type: T
  kind: K
  flags: F
  properties: P
  test: (x: any) => x is T
}

/**
 * Abstract Type Creator.
 * TODO: RENAME TO ABSTRACT TYPE.
 */
export const AbstractType = <
  K extends string,
  T extends StaticType,
  F extends TypeFlags,
  P
>(
  kind: K,
  properties: P,
  flags: F,
  test: (x: any) => x is T
): AbstractType<K, T, F, P> => ({
  [STRUCTYPE_FLAG]: true,
  type: (null as any) as T,
  kind,
  properties,
  flags,
  test
})
