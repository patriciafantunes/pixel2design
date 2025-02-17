export interface Section {
  preTitle: string,
  title: string, 
  description: string,
  ctaText: string,
  ctaLink: string;
}

export interface Homepage {
  sections: Section[];
}

