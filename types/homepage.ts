export interface Section {
  key: string,
  preTitle: string,
  title: string, 
  description: string,
  services: Service[],
  packs: Pack[],
  ctaText: string,
  ctaLink: string,
}

export interface Homepage {
  sections: Section[],
}

export interface Service {
  title: string,
  subtitle: string,
  description: string,
  image: string,
  packs: Pack[],
}

export interface Pack {
  title: string,
  subtitle: string,
  description: string,
  image: string,
  features: {
    featurename: string,
    description: string
  }[],
}

