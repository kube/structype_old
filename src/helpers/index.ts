
      /*#######.
     ########",#:
   #########',##".
  ##'##'## .##',##.
   ## ## ## # ##",#.
    ## ## ## ## ##'
     ## ## ## :##
      ## ## ##*/

export type IsSubStaticType<T, S> = [S] extends [T] ? true : false

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
export function Assert<
  _Expected extends boolean,
  _Expression extends _Expected
>() {}
