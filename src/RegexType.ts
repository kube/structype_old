
      /*#######.
     ########",#:
   #########',##".
  ##'##'## .##',##.
   ## ## ## # ##",#.
    ## ## ## ## ##'
     ## ## ## :##
      ## ## ##*/

import { GenericType } from './GenericType'

/**
 * Regex Type Creator.
 */
export type RegexType = GenericType<'regex', string, RegExp>

export const RegexType = (regex: RegExp): RegexType =>
  GenericType(
    'regex',
    regex,
    (x: any): x is string => {
      return typeof x === 'string' && regex.test(x)
    }
  )
