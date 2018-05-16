
      /*#######.
     ########",#:
   #########',##".
  ##'##'## .##',##.
   ## ## ## # ##",#.
    ## ## ## ## ##'
     ## ## ## :##
      ## ## ##*/

/**
 * To prevent coupling a Type to the library,
 * we use a simple property string to mark a Type
 * to be able to detect it at runtime.
 */
export const TYPE_IDENTIFIER = '__StructypeType__'

export type Type<T> = {
  type: T
  [TYPE_IDENTIFIER]: true
  test: (x: any) => x is T
}

export type TypeTestFunction<T> = (x: any) => x is T
