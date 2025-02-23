// Services.ts
// Query for services page

import { client } from '../client'
import { Lang } from '@/types/lang'

export const getServicesData = async (locale: Lang) => {
  const query = `*[_type == "service"][] {
        _id,
        "title": title[_key == $locale][0].value, 
        "subtitle": subtitle[_key == $locale][0].value, 
        "description": description[_key == $locale][0].value, 
        "image": image.asset->url,
  		packs[]-> {
	        _id,
	        "title": title[_key == $locale][0].value, 
	        "subtitle": subtitle[_key == $locale][0].value, 
	        "description": description[_key == $locale][0].value, 
	        "image": image.asset->url,
	        features[] {
  				"featurename": featurename[_key == $locale][0].value, 
	        	"description": description[_key == $locale][0].value,
	        }
	      }
  }`

  const params = { locale };

  const servicesData = await client.fetch(query, params);

  return servicesData
}