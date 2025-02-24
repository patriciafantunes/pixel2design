// Footer.ts
// Query for services page

import { client } from '../client'
import { Lang } from '@/types/lang'

export const getFooterData = async (locale: Lang) => {
  const query = `*[_type == "footer"][0] {
    footerlinks[] {
      "title": title[_key == $locale][0].value, 
      slug, 
    },
    "copyright": copyright[_key == $locale][0].value,
    "follow": follow[_key == $locale][0].value,
  }`

  const params = { locale };

  const footerData = await client.fetch(query, params);

  return footerData
}