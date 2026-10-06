import { definePerson } from '../../schema'

export default definePerson({
  id: 'sattar-khan',
  names: [
    { text: 'Sattar Khan', lang: 'en', role: 'primary' },
    { text: 'ستارخان', lang: 'fa', role: 'native' },
    {
      text: 'Sardār-e Melli',
      lang: 'fa-Latn',
      role: 'alternative',
      cites: [
        {
          source: 'iranica-pistor-hatam-sattar-khan',
          loc: { section: 'SATTĀR KHAN', para: '1' }
        }
      ]
    }
  ],
  researched: '2026-10-06',
  born: {
    alts: [
      {
        value: { d: '1868' },
        cites: [
          {
            source: 'iranica-pistor-hatam-sattar-khan',
            loc: { section: 'SATTĀR KHAN', para: '1' }
          }
        ]
      }
    ]
  },
  died: {
    alts: [
      {
        value: { d: '1914-11-09' },
        cites: [
          {
            source: 'iranica-pistor-hatam-sattar-khan',
            loc: { section: 'SATTĀR KHAN', para: '1' }
          }
        ]
      }
    ]
  },
  diedIn: {
    ref: 'place:tehran',
    cites: [
      {
        source: 'iranica-pistor-hatam-sattar-khan',
        loc: { section: 'SATTĀR KHAN', para: '1' }
      }
    ]
  },
  regions: ['iran'],
  roles: ['revolutionary', 'military'],
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'SATTĀR KHAN (b. Janali village, Azarbaijan, 1868; d. Tehran, November 9, 1914), later known as “Sardār-e Melli” (The People’s Commander), one of the most popular heroes from Tabriz who defended the town during the Lesser Autocracy (estebdād-e ṣaḡir) in 1908-09',
          lang: 'en',
          cite: {
            source: 'iranica-pistor-hatam-sattar-khan',
            loc: { section: 'SATTĀR KHAN', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/sattar-khan-one-of-the-most-popular-heroes-from-tabriz-who-defended-the-town-during-the-lesser-autocracy-in-1908-09/'
          }
        },
        {
          id: 'q2',
          text: 'During these three phases of civil war, Sattār Khan emerged as both a local and a national hero.',
          lang: 'en',
          cite: {
            source: 'iranica-pistor-hatam-sattar-khan',
            loc: { section: 'SATTĀR KHAN', para: '4' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/sattar-khan-one-of-the-most-popular-heroes-from-tabriz-who-defended-the-town-during-the-lesser-autocracy-in-1908-09/'
          }
        }
      ]
    },
    {
      kind: 'legacy',
      quotes: [
        {
          id: 'q3',
          text: 'Nevertheless, Sattār Khan gives a face to the Constitutional Revolution and even represents it, at least after the coup d’état of 1908.',
          lang: 'en',
          cite: {
            source: 'iranica-pistor-hatam-sattar-khan',
            loc: { section: 'SATTĀR KHAN', para: '9' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/sattar-khan-one-of-the-most-popular-heroes-from-tabriz-who-defended-the-town-during-the-lesser-autocracy-in-1908-09/'
          }
        },
        {
          id: 'q4',
          text: 'Perceived as a local hero in Azarbaijan, he is still remembered as one of the champions of the Constitutional Revolution throughout Iran.',
          lang: 'en',
          cite: {
            source: 'iranica-pistor-hatam-sattar-khan',
            loc: { section: 'SATTĀR KHAN', para: '9' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/sattar-khan-one-of-the-most-popular-heroes-from-tabriz-who-defended-the-town-during-the-lesser-autocracy-in-1908-09/'
          }
        }
      ]
    }
  ],
  portrait: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/4/4d/Sattar_khan_and_Bagir_khan.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Sattar_khan_and_Bagir_khan.jpg',
    credit: {
      institution: 'Azərbaycan Respublikası Prezidentinin İşlər İdarəsinin Siyasi Sənədlər Arxivi'
    },
    license: { id: 'public-domain' }
  }
})
