// contactForm.ts
// Query for services page

import { client } from '../client'
import { Lang } from '@/types/lang'

export const getFormData = async (locale: Lang) => {
  const query = `*[_type == "contactForm"][0] {
    "title": title[_key == $locale][0].value,
    "subtitle": subtitle[_key == $locale][0].value,
    email,
    "labelservices": labelservices[_key == $locale][0].value,
    services[] {
      key,
      "title": title[_key == $locale][0].value,
    },
    "labelname": labelname[_key == $locale][0].value,
    "labelcompany": labelcompany[_key == $locale][0].value,
    "labelemail": labelemail[_key == $locale][0].value,
    "labelmessage": labelmessage[_key == $locale][0].value,
    "button": button[_key == $locale][0].value,
  }`

  const params = { locale };

  const contactData = await client.fetch(query, params);

  return contactData
}