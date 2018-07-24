
      /*#######.
     ########",#:
   #########',##".
  ##'##'## .##',##.
   ## ## ## # ##",#.
    ## ## ## ## ##'
     ## ## ## :##
      ## ## ##*/

export type IsSubStaticType<T, S> = S extends T ? true : false

export type IsSameStaticType<T, S> = S extends T
  ? (T extends S ? true : false)
  : false

export const StaticCheck = <_T extends true>() => {}
