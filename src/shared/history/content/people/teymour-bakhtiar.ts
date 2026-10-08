import { definePerson } from '../../schema'

export default definePerson({
  id: 'teymour-bakhtiar',
  names: [
    { text: 'Teymour Bakhtiar', lang: 'en', role: 'primary' },
    { text: 'تیمور بختیار', lang: 'fa', role: 'native' },
    { text: 'Teymūr Baḵtīār', lang: 'fa-Latn', role: 'alternative' }
  ],
  researched: '2026-10-08',
  born: {
    alts: [
      {
        value: { d: '1914' },
        cites: [
          {
            source: 'iranica-zabih-bakhtiar-teymur',
            loc: { section: 'BAḴTĪĀR, TEYMŪR', para: '1' }
          }
        ]
      }
    ]
  },
  died: {
    alts: [
      {
        value: { d: '1970-08-12' },
        cites: [
          {
            source: 'iranica-zabih-bakhtiar-teymur',
            loc: { section: 'BAḴTĪĀR, TEYMŪR', para: '3' }
          }
        ]
      }
    ]
  },
  regions: ['iran'],
  roles: ['military'],
  offices: [
    {
      title: 'chief of SAVAK',
      polity: 'polity:pahlavi-iran',
      start: {
        alts: [
          {
            value: { d: '1958-02' },
            cites: [
              {
                source: 'iranica-zabih-bakhtiar-teymur',
                loc: { section: 'BAḴTĪĀR, TEYMŪR', para: '2' }
              }
            ]
          }
        ]
      },
      end: {
        alts: [
          {
            value: { d: '1961' },
            cites: [
              {
                source: 'iranica-zabih-bakhtiar-teymur',
                loc: { section: 'BAḴTĪĀR, TEYMŪR', para: '3' }
              }
            ]
          }
        ]
      },
      cites: [
        {
          source: 'iranica-zabih-bakhtiar-teymur',
          loc: { section: 'BAḴTĪĀR, TEYMŪR', para: '2' }
        },
        {
          source: 'iranica-zabih-bakhtiar-teymur',
          loc: { section: 'BAḴTĪĀR, TEYMŪR', para: '3' }
        }
      ]
    }
  ],
  portrait: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/2/21/%D8%AA%DB%8C%D9%85%D9%88%D8%B1_%D8%A8%D8%AE%D8%AA%DB%8C%D8%A7%D8%B1.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:%D8%AA%DB%8C%D9%85%D9%88%D8%B1_%D8%A8%D8%AE%D8%AA%DB%8C%D8%A7%D8%B1.jpg',
    credit: { institution: 'Ebrat Museum of Iran' },
    license: { id: 'public-domain' }
  },
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'BAḴTĪĀR, TEYMŪR, Iranian general born in 1914, the son of Sardār Moʿaẓẓam Baḵtīārī.',
          lang: 'en',
          cite: {
            source: 'iranica-zabih-bakhtiar-teymur',
            loc: { section: 'BAḴTĪĀR, TEYMŪR', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.iranicaonline.org/articles/baktiar-teymur-iranian-general-born-in-1914-the-son-of-sardar-moazzam-baktiari/'
          }
        }
      ]
    },
    {
      kind: 'early-life',
      quotes: [
        {
          id: 'q2',
          text: 'At the age of fourteen, he was sent to Beirut where he studied at a French high school until he was nineteen. Upon graduation he was accepted at St. Cyr military academy, where he studied between 1930-35.',
          lang: 'en',
          cite: {
            source: 'iranica-zabih-bakhtiar-teymur',
            loc: { section: 'BAḴTĪĀR, TEYMŪR', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.iranicaonline.org/articles/baktiar-teymur-iranian-general-born-in-1914-the-son-of-sardar-moazzam-baktiari/'
          }
        }
      ]
    },
    {
      kind: 'career',
      quotes: [
        {
          id: 'q3',
          text: 'His meteoric rise to power began after the fall of Moṣaddeq in August, 1953, when he was called to Tehran, promoted to brigadier general, and put in charge of Tehran’s military governorship. In that position he waged a vigorous campaign to eradicate the Tudeh (Tūda) party, the Fedāʾīān-e Eslām, and to a lesser extent remnants of the pro-Moṣaddeq National Front.',
          lang: 'en',
          cite: {
            source: 'iranica-zabih-bakhtiar-teymur',
            loc: { section: 'BAḴTĪĀR, TEYMŪR', para: '2' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.iranicaonline.org/articles/baktiar-teymur-iranian-general-born-in-1914-the-son-of-sardar-moazzam-baktiari/'
          }
        },
        {
          id: 'q4',
          text: 'In February 1958, he was appointed as the first chief of SAVAK (State Security and Intelligence Organization).',
          lang: 'en',
          cite: {
            source: 'iranica-zabih-bakhtiar-teymur',
            loc: { section: 'BAḴTĪĀR, TEYMŪR', para: '2' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.iranicaonline.org/articles/baktiar-teymur-iranian-general-born-in-1914-the-son-of-sardar-moazzam-baktiari/'
          }
        },
        {
          id: 'q5',
          text: 'In 1961, when Dr. ʿAlī Amīnī was made prime minister, he convinced the shah that the more moderate general Pākravān should replace Baḵtīār.',
          lang: 'en',
          cite: {
            source: 'iranica-zabih-bakhtiar-teymur',
            loc: { section: 'BAḴTĪĀR, TEYMŪR', para: '3' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.iranicaonline.org/articles/baktiar-teymur-iranian-general-born-in-1914-the-son-of-sardar-moazzam-baktiari/'
          }
        },
        {
          id: 'q6',
          text: 'The general soon turned into a sworn enemy of the shah. First in Europe and then in Lebanon and Iraq, he contacted every known opponent of the regime.',
          lang: 'en',
          cite: {
            source: 'iranica-zabih-bakhtiar-teymur',
            loc: { section: 'BAḴTĪĀR, TEYMŪR', para: '3' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.iranicaonline.org/articles/baktiar-teymur-iranian-general-born-in-1914-the-son-of-sardar-moazzam-baktiari/'
          }
        }
      ]
    },
    {
      kind: 'death',
      quotes: [
        {
          id: 'q7',
          text: 'SAVAK was instructed by the shah to eliminate Baḵtīār at all costs. In a carefully organized plot, SAVAK agents managed to cultivate his trust. On August 12, 1970, his trusted driver, sent two years earlier from Tehran, shot him as he was lured to an area near the Iranian border ostensibly for hunting.',
          lang: 'en',
          cite: {
            source: 'iranica-zabih-bakhtiar-teymur',
            loc: { section: 'BAḴTĪĀR, TEYMŪR', para: '3' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.iranicaonline.org/articles/baktiar-teymur-iranian-general-born-in-1914-the-son-of-sardar-moazzam-baktiari/'
          }
        }
      ]
    }
  ]
})
