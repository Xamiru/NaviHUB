import { definePerson } from '../../schema'

export default definePerson({
  id: 'mahmud-hotaki',
  names: [
    { text: 'Mahmud Hotaki', lang: 'en', role: 'primary' },
    {
      text: 'Maḥmūd Hōtak',
      lang: 'en',
      role: 'alternative',
      cites: [
        { source: 'iranica-hanifi-gilzi', loc: { section: 'ḠILZĪ', para: '6' } }
      ]
    },
    {
      text: 'Mahmud the Afghan',
      lang: 'en',
      role: 'alternative',
      cites: [
        { source: 'britannica-1911-persia', loc: { section: 'PERSIA', para: '1084' } }
      ]
    }
  ],
  researched: '2026-10-13',
  died: {
    alts: [
      {
        value: { d: '1725-04-22' },
        cites: [
          { source: 'britannica-1911-persia', loc: { section: 'PERSIA', para: '1086' } }
        ]
      }
    ]
  },
  regions: ['south-asia', 'iran'],
  roles: ['monarch', 'military'],
  offices: [
    {
      title: 'Shah of Persia',
      polity: 'polity:hotaki-dynasty',
      start: {
        alts: [
          {
            value: { d: '1722-10-21' },
            cites: [
              {
                source: 'iranica-matthee-soltan-hosayn',
                loc: { section: 'SOLṬĀN ḤOSAYN', para: '24' }
              }
            ]
          }
        ]
      },
      end: {
        alts: [
          {
            value: { d: '1725-04-22' },
            cites: [
              { source: 'britannica-1911-persia', loc: { section: 'PERSIA', para: '1086' } }
            ]
          }
        ]
      },
      cites: [
        {
          source: 'iranica-matthee-soltan-hosayn',
          loc: { section: 'SOLṬĀN ḤOSAYN', para: '24' }
        },
        { source: 'britannica-1911-persia', loc: { section: 'PERSIA', para: '1086' } }
      ]
    }
  ],
  portrait: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/5/54/SHAH-MAHMUD-HOTAK.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:SHAH-MAHMUD-HOTAK.jpg',
    credit: { creator: 'Maulvi Abdurab Ahadi' },
    license: { id: 'public-domain' }
  },
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'Maḥmūd invaded Persia and captured Isfahan, the Persian capital, in 1135/1722.',
          lang: 'en',
          cite: { source: 'iranica-hanifi-gilzi', loc: { section: 'ḠILZĪ', para: '6' } },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/gilzi-'
          }
        },
        {
          id: 'q2',
          text: 'Mahmud entered Isfahan in triumph with the captive shah on his left hand, and, seating himself on the throne in the royal palace, he was saluted as sovereign of Persia by the unfortunate Ḥosain.',
          lang: 'en',
          cite: { source: 'britannica-1911-persia', loc: { section: 'PERSIA', para: '1084' } },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Persia'
          }
        }
      ]
    },
    {
      kind: 'early-life',
      quotes: [
        {
          id: 'q3',
          text: 'After Shah ʿAbbās I (997-1039/1587-1629) relocated the Abdālī vassals from Qandahār to Herāt, the Ḡalzī, especially the Hōtaks, became dominant in the former city.',
          lang: 'en',
          cite: { source: 'iranica-hanifi-gilzi', loc: { section: 'ḠILZĪ', para: '6' } },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/gilzi-'
          }
        },
        {
          id: 'q4',
          text: 'His brother, Mir ʽAbdallah, succeeded him in the government of the Afghans; but after a few months, Mahmud, a son of Mir Waʽiẓ, a very young man, murdered his uncle and assumed the title of a sovereign prince.',
          lang: 'en',
          cite: { source: 'britannica-1911-persia', loc: { section: 'PERSIA', para: '1081' } },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Persia'
          }
        }
      ]
    },
    {
      kind: 'career',
      quotes: [
        {
          id: 'q5',
          text: 'Following various Baluchi incursions, the Afghans marched into Persia’s heartland in 1720, taking Kerman.',
          lang: 'en',
          cite: {
            source: 'iranica-matthee-soltan-hosayn',
            loc: { section: 'SOLṬĀN ḤOSAYN', para: '21' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/soltan-hosayn'
          }
        },
        {
          id: 'q6',
          text: 'In early 1722, Maḥmud and his troops arrived at Golnābād, a village some 20 km from Isfahan.',
          lang: 'en',
          cite: {
            source: 'iranica-matthee-soltan-hosayn',
            loc: { section: 'SOLṬĀN ḤOSAYN', para: '22' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/soltan-hosayn'
          }
        },
        {
          id: 'q7',
          text: 'Even during the siege Maḥmud still showed himself willing to negotiate.',
          lang: 'en',
          cite: {
            source: 'iranica-matthee-soltan-hosayn',
            loc: { section: 'SOLṬĀN ḤOSAYN', para: '24' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/soltan-hosayn'
          }
        },
        {
          id: 'q8',
          text: 'On the 8th of March 1722 the richly dressed hosts of Persia appeared before the little band of Afghans, who were scorched and disfigured by their long marches.',
          lang: 'en',
          cite: { source: 'britannica-1911-persia', loc: { section: 'PERSIA', para: '1084' } },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Persia'
          }
        }
      ]
    },
    {
      kind: 'death',
      quotes: [
        {
          id: 'q9',
          text: 'In Šaʿbān 1137/April 1725, Maḥmud died or was put to death by members of his court after he had gone mad, so his cousin Ašraf became shah.',
          lang: 'en',
          cite: {
            source: 'iranica-tucker-ottoman-persian-relations-afsharid-zand',
            loc: { section: 'OTTOMAN-PERSIAN RELATIONS ii. AFSHARID AND ZAND PERIODS', para: '5' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/ottoman-persian-relations-ii'
          }
        }
      ]
    }
  ]
})
