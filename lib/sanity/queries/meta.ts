// meta.ts
// Query for services page

import { client } from '../client'
import { Lang } from '@/types/lang'

export const getMeta = async (locale: Lang) => {
  const query = `*[_type == "settings"][0] {
      key,
      "title": title[_key == $locale][0].value, 
      "metatitle": metatitle[_key == $locale][0].value, 
      "metadescription": metadescription[_key == $locale][0].value, 
      "ogImage": ogImage.asset->url,  
  }`

  const params = { locale };

  const metaData = await client.fetch(query, params);

  return metaData
}