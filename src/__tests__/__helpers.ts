
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
 * Both types are wrapped in a tuple, as Unions
 * at root are distributed with Conditional Types.
 * https://github.com/Microsoft/TypeScript/issues/25912
 */
export type IsSameStaticType<T, S> = [S] extends [T]
  ? [T] extends [S] ? true : false
  : false

/**
 * //TODO: UPDATE DESCRIPTION
 * Helper to easily check static types.
 */
export const Assert = {
  True: <_T extends true>() => {},
  False: <_T extends false>() => {},
}
