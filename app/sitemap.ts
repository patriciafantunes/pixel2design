export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date().toISOString()

  return [
    {
      url: 'https://pixel2design.pt/pt',
      lastModified,
      alternates: {
        languages: {
          pt: 'https://pixel2design.pt/pt',
          en: 'https://pixel2design.pt/en',
        },
      },
    },
    {
      url: 'https://pixel2design.pt/pt/services',
      lastModified,
      alternates: {
        languages: {
          pt: 'https://pixel2design.pt/pt/services',
          en: 'https://pixel2design.pt/en/services',
        },
      },
    },
    {
      url: 'https://pixel2design.pt/pt/terms',
      lastModified,
      alternates: {
        languages: {
          pt: 'https://pixel2design.pt/pt/terms',
          en: 'https://pixel2design.pt/en/terms',
        },
      },
    },
    {
      url: 'https://pixel2design.pt/pt/privacy',
      lastModified,
      alternates: {
        languages: {
          pt: 'https://pixel2design.pt/pt/privacy',
          en: 'https://pixel2design.pt/en/privacy',
        },
      },
    },
  ]
}
