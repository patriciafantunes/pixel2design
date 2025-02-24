export interface Section {
  key: string,
  preTitle: string,
  title: string, 
  description: string,
  services: Service[],
  packs: Pack[],
  ctaText: string,
  ctaLink: string,
  ctaSlug: {current: string, _type: string},
  anchor: string
}

export interface Homepage {
  sections: Section[],
}

export interface Service {
  key: string,
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

export interface Component {
  key: string,
  preTitle: string,
  title: string, 
  description: string,
  otherServices: {
    title: string,
    description: string,
    svg: string,
    svgviewbox: string,
    image: string,
  }[],
  ctaText: string,
  ctaLink: string,
  ctaSlug: {current: string, _type: string},
  anchor: string,
}

