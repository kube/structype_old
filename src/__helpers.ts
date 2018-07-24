
      /*#######.
     ########",#:
   #########',##".
  ##'##'## .##',##.
   ## ## ## # ##",#.
    ## ## ## ## ##'
     ## ## ## :##
      ## ## ##*/

/**
 * Helper to check that two types are equal.
 * Both types are wrapped in an object, as unions
 * at root of type fail to pass the verification.
 */
export type IsSameStaticType<T, S> = { _: S } extends { _: T }
  ? ({ _: T } extends { _: S } ? true : false)
  : false

/**
 * Helper to easily check static types.
 */
export const StaticCheck = <_T extends true>() => {}
