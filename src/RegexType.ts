
      /*#######.
     ########",#:
   #########',##".
  ##'##'## .##',##.
   ## ## ## # ##",#.
    ## ## ## ## ##'
     ## ## ## :##
      ## ## ##*/

import { AbstractType } from './AbstractType'

/**
 * Regex Type Creator.
 */
export type RegexType = AbstractType<'regex', string, { black: true }, RegExp>

export const RegexType = (regex: RegExp): RegexType =>
  AbstractType(
    'regex',
    regex,
    { black: true },
    (x: any): x is string => {
      return typeof x === 'string' && regex.test(x)
    }
  )
