// Fetching data from Sanity

import { client } from '../client'
import { Lang } from '@/types/lang'

export const getHomepageData = async (locale: Lang) => {
  const query = `*[_type == "homepage"][0] {
    sections[]{
      key,
      "preTitle": preTitle[_key == $locale][0].value,
      "title": title[_key == $locale][0].value, 
      "description": description[_key == $locale][0].value,
      "ctaText": ctaText[_key == $locale][0].value,
      ctaLink,
      ctaSlug,
      anchor,
      "services": services[]-> {
        _id,
        "title": title[_key == $locale][0].value, 
        "subtitle": subtitle[_key == $locale][0].value, 
        "description": description[_key == $locale][0].value, 
        "image": image.asset->url
      },
      "packs": packs[]-> {
        _id,
        "title": title[_key == $locale][0].value, 
        "subtitle": subtitle[_key == $locale][0].value, 
        "description": description[_key == $locale][0].value, 
        "image": image.asset->url,
        features[]->
      }
    }
  }`

  const params = { locale };

  const homepageData = await client.fetch(query, params);

  return homepageData
}
