import {PortableTextBlock} from '@portabletext/types'

export interface SystemPages {
  key: string,
  title: string,
  content: PortableTextBlock[],
}