import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'french-coup-of-1851',
  names: [
    { text: 'French coup of 2 December 1851', lang: 'en', role: 'primary' },
    { text: 'Coup d\'État du 2 décembre 1851', lang: 'fr', role: 'native' }
  ],
  researched: '2026-10-06',
  type: 'coup',
  start: {
    alts: [
      {
        value: { d: '1851-12-01', notAfter: '1851-12-02' },
        cites: [
          {
            source: 'elysee-louis-napoleon-bonaparte',
            loc: { section: 'Louis-Napoléon Bonaparte' }
          }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1852-01' },
        cites: [
          {
            source: 'elysee-louis-napoleon-bonaparte',
            loc: { section: 'Louis-Napoléon Bonaparte' }
          }
        ]
      }
    ]
  },
  regions: ['europe'],
  prominence: 2,
  places: [
    { ref: 'place:paris' }
  ],
  participants: [
    {
      ref: 'person:napoleon-iii',
      role: 'leader',
      cites: [
        {
          source: 'elysee-louis-napoleon-bonaparte',
          loc: { section: 'Louis-Napoléon Bonaparte' }
        }
      ]
    }
  ],
  related: [
    {
      ref: 'period:second-french-empire',
      rel: 'led-to',
      cites: [
        {
          source: 'elysee-louis-napoleon-bonaparte',
          loc: { section: 'Louis-Napoléon Bonaparte' }
        }
      ]
    }
  ],
  sections: [
    {
      kind: 'background',
      quotes: [
        {
          id: 'q1',
          text: 'L\'Assemblée vote une loi électorale imposant une obligation de domicile de 3 ans dans la même commune ou le même canton pour pouvoir voter, ce qui élimine 3 millions de personnes du corps électoral, notamment des artisans et des ouvriers saisonniers.',
          lang: 'fr',
          cite: {
            source: 'elysee-louis-napoleon-bonaparte',
            loc: { section: 'Louis-Napoléon Bonaparte' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.elysee.fr/la-presidence/louis-napoleon-bonaparte'
          }
        },
        {
          id: 'q2',
          text: 'Louis-Napoléon fait pression pour allonger la durée de son mandat tandis que l\'Assemblée nationale est opposée à tout projet de révision constitutionnelle.',
          lang: 'fr',
          cite: {
            source: 'elysee-louis-napoleon-bonaparte',
            loc: { section: 'Louis-Napoléon Bonaparte' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.elysee.fr/la-presidence/louis-napoleon-bonaparte'
          }
        }
      ]
    },
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q3',
          text: 'Un décret dissout l\'Assemblée nationale et rétablit le suffrage universel.',
          lang: 'fr',
          cite: {
            source: 'elysee-louis-napoleon-bonaparte',
            loc: { section: 'Louis-Napoléon Bonaparte' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.elysee.fr/la-presidence/louis-napoleon-bonaparte'
          }
        },
        {
          id: 'q4',
          text: 'Malgré quelques soulèvements vigoureusement réprimés, le coup d\'Etat est approuvé et le plébiscite sur les nouvelles institutions reçoit une majorité d\'avis favorables.',
          lang: 'fr',
          cite: {
            source: 'elysee-louis-napoleon-bonaparte',
            loc: { section: 'Louis-Napoléon Bonaparte' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.elysee.fr/la-presidence/louis-napoleon-bonaparte'
          }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q5',
          text: 'Une nouvelle constitution étend le mandat du président à 10 ans.',
          lang: 'fr',
          cite: {
            source: 'elysee-louis-napoleon-bonaparte',
            loc: { section: 'Louis-Napoléon Bonaparte' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.elysee.fr/la-presidence/louis-napoleon-bonaparte'
          }
        }
      ]
    }
  ],
  hero: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/8/8c/Impression_des_proclamations_du_coup_d%27%C3%89tat_du_2_d%C3%A9cembre_1851.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Impression_des_proclamations_du_coup_d%27%C3%89tat_du_2_d%C3%A9cembre_1851.jpg',
    credit: { institution: 'Bibliothèque nationale de France (Gallica)', creator: 'Burgun' },
    license: { id: 'public-domain' }
  },
  archive: [
    {
      id: 'tenot-1870',
      mediaKind: 'document',
      title: 'Paris in December, 1851; or, The coup d\'tat of Napoleon III',
      date: { d: '1870' },
      url: 'https://archive.org/download/parisindecember00tenoiala/parisindecember00tenoiala.pdf',
      page: 'https://archive.org/details/parisindecember00tenoiala',
      credit: {
        institution: 'University of California Libraries (Internet Archive)',
        creator: 'Eugène Ténot'
      },
      license: { id: 'public-domain' },
      bytes: 16130366
    }
  ]
})
