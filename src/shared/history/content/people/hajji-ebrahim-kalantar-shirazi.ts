import { definePerson } from '../../schema'

export default definePerson({
  id: 'hajji-ebrahim-kalantar-shirazi',
  names: [
    { text: 'Hajji Ebrahim Kalantar Shirazi', lang: 'en', role: 'primary' },
    {
      text: 'حاجی ابراهیم کلانتر شیرازی',
      lang: 'fa',
      role: 'native',
      translit: 'Ḥājī Ebrāhīm Kalāntar Šīrāzī'
    }
  ],
  researched: '2026-10-13',
  born: {
    alts: [
      {
        value: { d: '1745' },
        cites: [
          {
            source: 'iranica-amanat-ebrahim-kalantar-sirazi',
            loc: { section: 'EBRĀHĪM KALĀNTAR ŠĪRĀZĪ', para: '1' }
          }
        ]
      }
    ]
  },
  died: {
    alts: [
      {
        value: { d: '1800' },
        cites: [
          {
            source: 'iranica-amanat-ebrahim-kalantar-sirazi',
            loc: { section: 'EBRĀHĪM KALĀNTAR ŠĪRĀZĪ', para: '1' }
          }
        ]
      },
      {
        value: { d: '1801' },
        cites: [
          {
            source: 'iranica-amanat-ebrahim-kalantar-sirazi',
            loc: { section: 'EBRĀHĪM KALĀNTAR ŠĪRĀZĪ', para: '1' }
          }
        ]
      }
    ]
  },
  regions: ['iran'],
  roles: ['politician'],
  offices: [
    {
      title: 'Grand vizier (ṣadr-e aʿẓam)',
      polity: 'polity:qajar-iran',
      cites: [
        {
          source: 'iranica-amanat-ebrahim-kalantar-sirazi',
          loc: { section: 'EBRĀHĪM KALĀNTAR ŠĪRĀZĪ', para: '1' }
        }
      ]
    }
  ],
  portrait: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/0/0e/Ebrahim_Khan_Kalantar_-_cropped.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Ebrahim_Khan_Kalantar_-_cropped.jpg',
    credit: { creator: 'Unnamed 18th-century painter' },
    license: { id: 'public-domain' }
  },
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'Ḥāji Ebrāhim later became the first grand vizier (ṣadr-e aʿẓam) and a major political figure of the early Qajar period.',
          lang: 'en',
          cite: { source: 'iranica-perry-zand-dynasty', loc: { section: 'ZAND DYNASTY', para: '9' } },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/zand-dynasty'
          }
        }
      ]
    },
    {
      kind: 'early-life',
      quotes: [
        {
          id: 'q2',
          text: 'Mīrzā Ebrāhīm’s training in urban administration and his introduction to the intricate politics of Shiraz began in earnest during the later years of Karīm Khan’s reign (1163-93/1750-79), when the urban notables (ʿayān) of the Zand capital were curtailed by Karīm Khan, without their economic base being ruined and social network eroded.',
          lang: 'en',
          cite: {
            source: 'iranica-amanat-ebrahim-kalantar-sirazi',
            loc: { section: 'EBRĀHĪM KALĀNTAR ŠĪRĀZĪ', para: '3' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/ebrahim-kalantar-sirazi'
          }
        }
      ]
    },
    {
      kind: 'career',
      quotes: [
        {
          id: 'q3',
          text: 'Mindful of Šīrāzī civil officers and their influence over the Zand capital, ʿAlī-Morād Khan (1193-99/1779-85) immediately ordered Mīrzā Moḥammad Kalāntar and his cohorts, among them Mīrzā Ebrāhīm, to accompany him to Isfahan, his new seat of power.',
          lang: 'en',
          cite: {
            source: 'iranica-amanat-ebrahim-kalantar-sirazi',
            loc: { section: 'EBRĀHĪM KALĀNTAR ŠĪRĀZĪ', para: '5' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/ebrahim-kalantar-sirazi'
          }
        },
        {
          id: 'q4',
          text: 'Upon his arrival in Shiraz Ḥājī Ebrāhīm was appointed the new kalāntar by Jaʿfar Khan Zand',
          lang: 'en',
          cite: {
            source: 'iranica-amanat-ebrahim-kalantar-sirazi',
            loc: { section: 'EBRĀHĪM KALĀNTAR ŠĪRĀZĪ', para: '6' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/ebrahim-kalantar-sirazi'
          }
        },
        {
          id: 'q5',
          text: 'Loṭf-ʿAlī Khan’s failure to defend Shiraz and Hājī Ebrāhīm’s fear for his own life encouraged him to break with the Zands and eventually switch to the Qajar side.',
          lang: 'en',
          cite: {
            source: 'iranica-amanat-ebrahim-kalantar-sirazi',
            loc: { section: 'EBRĀHĪM KALĀNTAR ŠĪRĀZĪ', para: '8' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/ebrahim-kalantar-sirazi'
          }
        },
        {
          id: 'q6',
          text: 'Ḥāǰǰī Ebrāhīm, the kalāntar of Shiraz, engineered a coup in the Zand army and denied entry to Loṭf-ʿAlī on his retreat.',
          lang: 'en',
          cite: {
            source: 'iranica-perry-aga-mohammad-khan-qajar',
            loc: { section: 'ĀḠĀ MOḤAMMAD KHAN QĀJĀR', para: '5' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/aga-mohammad-khan'
          }
        }
      ]
    }
  ]
})
