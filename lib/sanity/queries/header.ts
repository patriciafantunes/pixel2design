// Header.ts
// Query for services page

import { client } from '../client'
import { Lang } from '@/types/lang'

export const getHeaderLinks = async (locale: Lang) => {
  const query = `*[_type == "header"][0] {
        headerlinks[] {
          "title": title[_key == $locale][0].value, 
          slug, 
        }
        
  }`

  const params = { locale };

  const headerData = await client.fetch(query, params);

  return headerData
}