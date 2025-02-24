// System Pages.ts
// Query for services page

import { client } from '../client'
import { Lang } from '@/types/lang'

export const getSystemData = async (locale: Lang) => {
  const query = `*[_type == "systempages"][] {
        _id,
  		  key,
        "title": title[_key == $locale][0].value, 
        "content": content[language == $locale].content[], 
  }`

  const params = { locale };

  const systemData = await client.fetch(query, params);

  return systemData
}