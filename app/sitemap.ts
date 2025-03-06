import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://pixel2design.pt',
      lastModified: new Date(),
      alternates: {
        languages: {
          pt: 'https://pixel2design.pt/pt',
          en: 'https://pixel2design.pt/en',
        },
      },
    },
    {
      url: 'https://pixel2design.pt/services',
      lastModified: new Date(),
      alternates: {
        languages: {
          pt: 'https://pixel2design.pt/pt/services',
          en: 'https://pixel2design.pt/en/services',
        },
      },
    },
    {
      url: 'https://pixel2design.pt/terms',
      lastModified: new Date(),
      alternates: {
        languages: {
          pt: 'https://pixel2design.pt/pt/terms',
          en: 'https://pixel2design.pt/en/terms',
        },
      },
    },
    {
      url: 'https://pixel2design.pt/privacy',
      lastModified: new Date(),
      alternates: {
        languages: {
          pt: 'https://pixel2design.pt/pt/privacy',
          en: 'https://pixel2design.pt/en/privacy',
        },
      },
    },
  ]
}
