// Services.ts
// Query for services page

import { client } from '../client'
import { Lang } from '@/types/lang'

export const getComponentsData = async (locale: Lang) => {
  const query = `*[_type == "component"][] {
        _id,
  		key,
        "preTitle": preTitle[_key == $locale][0].value, 
        "title": title[_key == $locale][0].value, 
        "description": description[_key == $locale][0].value, 
        "image": image.asset->url,
  			"ctaText": ctaText[_key == $locale][0].value,
  			ctaLink,
  		otherServices[] {
	        "title": title[_key == $locale][0].value, 
	        "description": description[_key == $locale][0].value, 
	        "image": image.asset->url,
	      }
  }`

  const params = { locale };

  const componentsData = await client.fetch(query, params);

  return componentsData
}