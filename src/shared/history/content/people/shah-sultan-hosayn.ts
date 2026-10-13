import { definePerson } from '../../schema'

export default definePerson({
  id: 'shah-sultan-hosayn',
  names: [
    { text: 'Shah Sultan Hosayn', lang: 'en', role: 'primary' },
    { text: 'شاه سلطان حسین', lang: 'fa', role: 'native', translit: 'Šāh Solṭān Ḥosayn' },
    {
      text: 'Solṭān Ḥosayn',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'iranica-matthee-soltan-hosayn',
          loc: { section: 'SOLṬĀN ḤOSAYN', para: '1' }
        }
      ]
    },
    {
      text: 'Shah Sultan Husayn',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'lc-names-no96041809',
          loc: { section: 'Ḥusayn I, Shah of Iran, 1668-1726' }
        }
      ]
    }
  ],
  researched: '2026-10-13',
  born: {
    alts: [
      {
        value: { d: '1668' },
        cites: [
          {
            source: 'iranica-matthee-soltan-hosayn',
            loc: { section: 'SOLṬĀN ḤOSAYN', para: '1' }
          },
          {
            source: 'lc-names-no96041809',
            loc: { section: 'Ḥusayn I, Shah of Iran, 1668-1726' }
          }
        ]
      }
    ]
  },
  died: {
    alts: [
      {
        value: { d: '1727-09-09' },
        cites: [
          {
            source: 'iranica-matthee-soltan-hosayn',
            loc: { section: 'SOLṬĀN ḤOSAYN', para: '25' }
          }
        ],
        heldBy: [
          { kind: 'scholar', name: 'Rudi Matthee', discipline: 'historian' }
        ]
      },
      {
        value: { d: '1726' },
        cites: [
          {
            source: 'iranica-balland-asraf-gilzay',
            loc: { section: 'AŠRAF ḠILZAY', para: '2' }
          },
          {
            source: 'lc-names-no96041809',
            loc: { section: 'Ḥusayn I, Shah of Iran, 1668-1726' }
          }
        ],
        heldBy: [
          { kind: 'scholar', name: 'Daniel Balland', discipline: 'historian' },
          { kind: 'organization', name: 'Library of Congress' }
        ]
      },
      {
        value: { d: '1729' },
        cites: [
          { source: 'britannica-1911-persia', loc: { section: 'PERSIA', para: '1087' } }
        ],
        heldBy: [
          { kind: 'organization', name: 'Encyclopædia Britannica (11th edition, 1911)' }
        ]
      }
    ]
  },
  regions: ['iran'],
  roles: ['monarch'],
  offices: [
    {
      title: 'Shah of Iran',
      polity: 'polity:safavid-iran',
      start: {
        alts: [
          {
            value: { d: '1694-08-07' },
            cites: [
              {
                source: 'iranica-matthee-soltan-hosayn',
                loc: { section: 'SOLṬĀN ḤOSAYN', para: '4' }
              }
            ]
          }
        ]
      },
      end: {
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
      cites: [
        {
          source: 'iranica-matthee-soltan-hosayn',
          loc: { section: 'SOLṬĀN ḤOSAYN', para: '4' }
        },
        {
          source: 'iranica-matthee-soltan-hosayn',
          loc: { section: 'SOLṬĀN ḤOSAYN', para: '24' }
        }
      ]
    }
  ],
  portrait: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/8/8a/Sultan_Husayn_by_Bruyn.jpg/1280px-Sultan_Husayn_by_Bruyn.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Sultan_Husayn_by_Bruyn.jpg',
    credit: { institution: 'Rijksmuseum', creator: 'Cornelis de Bruijn' },
    license: { id: 'public-domain' }
  },
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'SOLṬĀN ḤOSAYN, the ninth and last Safavid king (1078-105/1668-1727; r. 1105-35/1694-1722).',
          lang: 'en',
          cite: {
            source: 'iranica-matthee-soltan-hosayn',
            loc: { section: 'SOLṬĀN ḤOSAYN', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/soltan-hosayn'
          }
        },
        {
          id: 'q2',
          text: 'The last two rulers, Shah Sulayman (1669-94) and Shah Sultan Hosain (1694-1722), were voluptuaries.',
          lang: 'en',
          cite: {
            source: 'loc-iran-country-study-1987',
            loc: { section: 'THE SAFAVIDS, 1501-1722', para: '7' }
          },
          provenance: { via: 'web', at: '2026-10-13', url: 'http://countrystudies.us/iran/11.htm' }
        },
        {
          id: 'q3',
          text: 'Under Solṭān Ḥosayn’s auspices, the royal harem grew to immense proportions.',
          lang: 'en',
          cite: {
            source: 'iranica-matthee-soltan-hosayn',
            loc: { section: 'SOLṬĀN ḤOSAYN', para: '9' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/soltan-hosayn'
          }
        }
      ]
    },
    {
      kind: 'career',
      quotes: [
        {
          id: 'q4',
          text: 'Soltan Ḥosayn broke with the custom of his predecessors, who had had the leader of the Sufis gird the new shah with a sword, and requested that Moḥammad-Bāqer Majlesi, the šayḵ-al-Eslām of Isfahan and the most prominent cleric of the age, perform this task and preside over the ceremony.',
          lang: 'en',
          cite: {
            source: 'iranica-matthee-soltan-hosayn',
            loc: { section: 'SOLṬĀN ḤOSAYN', para: '5' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/soltan-hosayn'
          }
        },
        {
          id: 'q5',
          text: 'All observers draw attention to the shah’s meekness.',
          lang: 'en',
          cite: {
            source: 'iranica-matthee-soltan-hosayn',
            loc: { section: 'SOLṬĀN ḤOSAYN', para: '8' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/soltan-hosayn'
          }
        },
        {
          id: 'q6',
          text: 'Throughout his reign Solṭān Ḥosayn surrounded himself with advisers who often took on a leading role in politics to the point of dominating him.',
          lang: 'en',
          cite: {
            source: 'iranica-matthee-soltan-hosayn',
            loc: { section: 'SOLṬĀN ḤOSAYN', para: '15' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/soltan-hosayn'
          }
        },
        {
          id: 'q7',
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
          id: 'q8',
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
        }
      ]
    },
    {
      kind: 'death',
      quotes: [
        {
          id: 'q9',
          text: 'Solṭān Ḥosayn subsequently was kept in confinement for two years.',
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
          id: 'q10',
          text: 'In late 1726 the Ottomans invaded Persia, and Aḥmad Pasha, the Turkish commander-in-chief, sent an insulting message to Ašraf, who had meanwhile succeeded Maḥmud, saying that the Afghans were a miserable lot and that the Ottomans had come to reinstate Shah Solṭān Ḥosayn.',
          lang: 'en',
          cite: {
            source: 'iranica-matthee-soltan-hosayn',
            loc: { section: 'SOLṬĀN ḤOSAYN', para: '25' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/soltan-hosayn'
          }
        },
        {
          id: 'q11',
          text: 'Ašraf thereupon ordered the execution of Shah Solṭān Ḥosayn.',
          lang: 'en',
          cite: {
            source: 'iranica-matthee-soltan-hosayn',
            loc: { section: 'SOLṬĀN ḤOSAYN', para: '25' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/soltan-hosayn'
          }
        },
        {
          id: 'q12',
          text: 'The Afghans fled through the town; and Ashraf, murdering the poor old shah Ḥosain on his way, hurried with the wreck of his army towards Shiraz.',
          lang: 'en',
          cite: { source: 'britannica-1911-persia', loc: { section: 'PERSIA', para: '1087' } },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Persia'
          }
        }
      ]
    }
  ]
})
