
      /*#######.
     ########",#:
   #########',##".
  ##'##'## .##',##.
   ## ## ## # ##",#.
    ## ## ## ## ##'
     ## ## ## :##
      ## ## ##*/

/**
 * Key set to true on a Type object to detect it at runtime.
 */
export const TYPE_IDENTIFIER = '__StructypeType__'

export const RUNTIME_STATIC_TYPE_VALUE = null as any

export type Type<T> = {
  [TYPE_IDENTIFIER]: true
  /**
   * Static Type associated to Type object.
   * Not meant to be used at runtime.
   */
  type: T
  /**
   * Test if an object matches the current Type description.
   */
  test: TypeTestFunction<T>
}

export type TypeTestFunction<T> = (x: any) => x is T
