import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'reuter-concession',
  names: [
    { text: 'Reuter concession', lang: 'en', role: 'primary' },
    { text: 'امتیاز رویتر', lang: 'fa', role: 'native' }
  ],
  researched: '2026-10-06',
  type: 'economic',
  start: {
    alts: [
      {
        value: { d: '1872' },
        cites: [
          {
            source: 'iranica-ettehadiyeh-concessions-qajar',
            loc: { section: 'CONCESSIONS ii. In the Qajar period', para: '4' }
          },
          {
            source: 'iranica-amanat-great-britain-ii',
            loc: {
              section: 'GREAT BRITAIN ii. British influence in Persia in the 19th century',
              para: '25'
            }
          },
          {
            source: 'iranica-yarshater-chronology-part-2',
            loc: { section: 'Chronology of Iranian History Part 2, 1872' }
          }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1873' },
        cites: [
          {
            source: 'iranica-ettehadiyeh-concessions-qajar',
            loc: { section: 'CONCESSIONS ii. In the Qajar period', para: '4' }
          },
          {
            source: 'iranica-amanat-great-britain-ii',
            loc: {
              section: 'GREAT BRITAIN ii. British influence in Persia in the 19th century',
              para: '25'
            }
          }
        ]
      }
    ]
  },
  regions: ['iran', 'europe'],
  prominence: 1,
  places: [
    { ref: 'place:tehran' },
    {
      ref: 'place:london',
      cites: [
        {
          source: 'iranica-amanat-great-britain-ii',
          loc: {
            section: 'GREAT BRITAIN ii. British influence in Persia in the 19th century',
            para: '25'
          }
        }
      ]
    }
  ],
  partOf: [
    { ref: 'period:reign-of-naser-al-din-shah-qajar' },
    { ref: 'period:qajar-dynasty' }
  ],
  participants: [
    {
      ref: 'person:julius-de-reuter',
      role: 'participant',
      cites: [
        {
          source: 'iranica-ettehadiyeh-concessions-qajar',
          loc: { section: 'CONCESSIONS ii. In the Qajar period', para: '4' }
        }
      ]
    },
    {
      ref: 'person:naser-al-din-shah-qajar',
      role: 'head-of-state',
      cites: [
        {
          source: 'iranica-ettehadiyeh-concessions-qajar',
          loc: { section: 'CONCESSIONS ii. In the Qajar period', para: '4' }
        }
      ]
    },
    {
      ref: 'person:mirza-hosayn-khan-moshir-al-dowla',
      role: 'negotiator',
      cites: [
        {
          source: 'iranica-amanat-great-britain-ii',
          loc: {
            section: 'GREAT BRITAIN ii. British influence in Persia in the 19th century',
            para: '25'
          }
        }
      ]
    },
    {
      name: 'Mirzā Moḥsen Khan Moʿin-al-Molk',
      role: 'diplomat',
      cites: [
        {
          source: 'iranica-amanat-great-britain-ii',
          loc: {
            section: 'GREAT BRITAIN ii. British influence in Persia in the 19th century',
            para: '25'
          }
        }
      ]
    },
    {
      name: 'William Taylour Thomson',
      role: 'diplomat',
      cites: [
        {
          source: 'iranica-amanat-great-britain-ii',
          loc: {
            section: 'GREAT BRITAIN ii. British influence in Persia in the 19th century',
            para: '26'
          }
        }
      ]
    }
  ],
  related: [
    { ref: 'event:reforms-of-mirza-hosayn-khan-moshir-al-dowla', rel: 'related' },
    {
      ref: 'event:naser-al-din-shahs-first-european-journey',
      rel: 'related',
      cites: [
        {
          source: 'iranica-bast-germany-diplomatic-relations',
          loc: { section: 'GERMANY i. German-Persian diplomatic relations', para: '10' }
        }
      ]
    },
    { ref: 'event:imperial-bank-of-persia', rel: 'followed-by' }
  ],
  sections: [
    {
      kind: 'background',
      quotes: [
        {
          id: 'q1',
          text: 'The increasing rivalry of the two great powers during the last quarter of the 19th century brought scores of British and Russian concession hunters to Persia in search of quick profits.',
          lang: 'en',
          cite: {
            source: 'iranica-ettehadiyeh-concessions-qajar',
            loc: { section: 'CONCESSIONS ii. In the Qajar period', para: '3' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/concessions/concessions-ii-in-the-qajar-period'
          }
        }
      ]
    },
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q2',
          text: 'The most comprehensive economic concession was granted in 1289/1872 to a British subject. Baron Julius de Router (q.v.); for a period of seventy years he was to have the sole right to exploit most of Persia’s natural resources; to build dams, bridges, roads, railways, and factories; to farm the customs; and to exercise the first option should the government decide to establish a national bank (Kazemzadeh, pp. 100-24; Teymūrī, pp. 97-150).',
          lang: 'en',
          cite: {
            source: 'iranica-ettehadiyeh-concessions-qajar',
            loc: { section: 'CONCESSIONS ii. In the Qajar period', para: '4' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/concessions/concessions-ii-in-the-qajar-period'
          }
        },
        {
          id: 'q3',
          text: 'The granting and then repealing of the Reuter concession (1872-1873), and its long-term consequences, introduced a new kind of British economic and financial presence in Persia beyond the familiar areas of strategy and diplomacy.',
          lang: 'en',
          cite: {
            source: 'iranica-amanat-great-britain-ii',
            loc: {
              section: 'GREAT BRITAIN ii. British influence in Persia in the 19th century',
              para: '25'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/great-britain-ii/'
          }
        },
        {
          id: 'q4',
          text: '1872 Nāṣer-al-Din Shah grants a number of generous concessions to Baron Reuter, a British national, including the right to establish a State bank.',
          lang: 'en',
          cite: {
            source: 'iranica-yarshater-chronology-part-2',
            loc: { section: 'Chronology of Iranian History Part 2, 1872' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/chronology-of-iranian-history-part-2/'
          }
        }
      ]
    },
    {
      kind: 'aftermath',
      quotes: [
        {
          id: 'q5',
          text: 'Persia had taken the initiative as Russia, because of the granting of the Reuter Concession, had put pressure on the shah, which the latter tried to compensate by seeking German mediation.',
          lang: 'en',
          cite: {
            source: 'iranica-bast-germany-diplomatic-relations',
            loc: { section: 'GERMANY i. German-Persian diplomatic relations', para: '10' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/germany-i'
          }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q6',
          text: 'Starting in the 1870s, both Britain and Russia each pressured Iranian monarchs to grant it a railroad concession and to deny one to the other power. As a result, Iran’s interests were completely ignored, and, with the exception of several insignificant branches, railroad construction was under a moratorium until after World War I (see Kazemzadeh, 1957; see also RAILROADS i).',
          lang: 'en',
          cite: {
            source: 'iranica-andreeva-russia-relations',
            loc: {
              section: 'RUSSIA i. Russo-Iranian Relations up to the Bolshevik Revolution',
              para: '36'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/russia-i-relations/'
          }
        },
        {
          id: 'q7',
          text: 'Taken as a whole, Persian concessions encouraged foreign trade, commercialization of agriculture, contacts with the West, and gradual incorporation of the country into the world economy.',
          lang: 'en',
          cite: {
            source: 'iranica-ettehadiyeh-concessions-qajar',
            loc: { section: 'CONCESSIONS ii. In the Qajar period', para: '8' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/concessions/concessions-ii-in-the-qajar-period'
          }
        }
      ]
    }
  ],
  hero: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/a/aa/Reuter%2C_Paul_Julius_von%2C_Nadar%2C_Gallica.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Reuter,_Paul_Julius_von,_Nadar,_Gallica.jpg',
    credit: { institution: 'Bibliothèque nationale de France', creator: 'Nadar' },
    license: { id: 'public-domain' }
  }
})
