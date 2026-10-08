import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'suppression-of-the-tudeh-party',
  names: [
    { text: 'Suppression of the Tudeh Party', lang: 'en', role: 'primary' },
    { text: 'سرکوب حزب توده ایران', lang: 'fa', role: 'native' }
  ],
  researched: '2026-10-08',
  type: 'other',
  start: {
    alts: [
      {
        value: { d: '1983-02' },
        cites: [
          {
            source: 'loc-iran-country-study-1987',
            loc: { section: 'Terror and Repression', para: '12' }
          }
        ]
      }
    ]
  },
  regions: ['iran'],
  prominence: 3,
  places: [
    {
      ref: 'place:tehran',
      cites: [
        {
          source: 'loc-iran-country-study-1987',
          loc: { section: 'Terror and Repression', para: '12' }
        }
      ]
    }
  ],
  polities: [
    {
      ref: 'polity:islamic-republic-of-iran',
      cites: [
        {
          source: 'loc-iran-country-study-1987',
          loc: { section: 'Terror and Repression', para: '12' }
        }
      ]
    },
    {
      ref: 'polity:soviet-union',
      cites: [
        {
          source: 'loc-iran-country-study-1987',
          loc: { section: 'Terror and Repression', para: '12' }
        }
      ]
    }
  ],
  sides: [
    {
      key: 'state',
      name: 'Islamic Republic of Iran',
      polity: 'polity:islamic-republic-of-iran',
      cites: [
        {
          source: 'loc-iran-country-study-1987',
          loc: { section: 'Terror and Repression', para: '12' }
        }
      ]
    },
    {
      key: 'party',
      name: 'Tudeh Party of Iran',
      cites: [
        {
          source: 'loc-iran-country-study-1987',
          loc: { section: 'Terror and Repression', para: '12' }
        }
      ]
    }
  ],
  participants: [
    {
      name: 'Nureddin Kianuri',
      role: 'victim',
      side: 'party',
      cites: [
        {
          source: 'loc-iran-country-study-1987',
          loc: { section: 'Terror and Repression', para: '12' }
        }
      ]
    },
    {
      name: 'Vladimir Kuzichkin',
      role: 'witness',
      cites: [
        {
          source: 'iranica-yarshater-chronology-part-4',
          loc: { section: 'Chronology of Iranian History Part 4, 1983' }
        }
      ]
    }
  ],
  related: [
    {
      ref: 'event:iran-iraq-war',
      rel: 'related',
      cites: [
        {
          source: 'loc-iran-country-study-1987',
          loc: { section: 'Terror and Repression', para: '11' }
        }
      ]
    }
  ],
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'In February 1983, the government arrested Tudeh leader Nureddin Kianuri, other members of the party Central Committee, and more than 1,000 party members.',
          lang: 'en',
          cite: {
            source: 'loc-iran-country-study-1987',
            loc: { section: 'Terror and Repression', para: '12' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/iran/26.htm' }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q2',
          text: 'The Tudeh had secured itself a measure of freedom during the first three years of the Revolution by declaring loyalty to Khomeini and supporting the clerics against liberal and left-wing opposition groups.',
          lang: 'en',
          cite: {
            source: 'loc-iran-country-study-1987',
            loc: { section: 'Terror and Repression', para: '11' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/iran/26.htm' }
        },
        {
          id: 'q3',
          text: 'The party\'s position further deteriorated in 1982, as relations between Iran and the Soviet Union grew more strained over such issues as the war with Iraq and the Soviet presence in Afghanistan.',
          lang: 'en',
          cite: {
            source: 'loc-iran-country-study-1987',
            loc: { section: 'Terror and Repression', para: '11' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/iran/26.htm' }
        }
      ]
    },
    {
      kind: 'course',
      quotes: [
        {
          id: 'q4',
          text: 'A campaign of repression against the Tudeh Party, which had welcomed and collaborated with Ayatollah Khomeini and the Islamic Republic, leads to the arrest of the Party’s leadership and 1,000 other active members.',
          lang: 'en',
          cite: {
            source: 'iranica-yarshater-chronology-part-4',
            loc: { section: 'Chronology of Iranian History Part 4' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.iranicaonline.org/articles/chronology-of-iranian-history-part-4/'
          }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q5',
          text: 'Possibly because of Soviet intervention, none of the leading members of the party was brought to trial or executed, although the leaders remained in prison.',
          lang: 'en',
          cite: {
            source: 'loc-iran-country-study-1987',
            loc: { section: 'Terror and Repression', para: '12' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/iran/26.htm' }
        },
        {
          id: 'q6',
          text: 'Later, some leaders of the military branch of the party who had committed espionage for the Soviet Union, are tried and executed; the connection was disclosed by the Soviet diplomat, Vladimir Kuzichkin, who had defected to Iran.',
          lang: 'en',
          cite: {
            source: 'iranica-yarshater-chronology-part-4',
            loc: { section: 'Chronology of Iranian History Part 4, 1983' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.iranicaonline.org/articles/chronology-of-iranian-history-part-4/'
          }
        }
      ]
    }
  ],
  course: [
    {
      date: {
        alts: [
          {
            value: { d: '1983-02' },
            cites: [
              {
                source: 'loc-iran-country-study-1987',
                loc: { section: 'Terror and Repression', para: '12' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q7',
        text: 'The party was proscribed, and Kianuri confessed on television to spying for the Soviet Union and to "espionage, deceit, and treason."',
        lang: 'en',
        cite: {
          source: 'loc-iran-country-study-1987',
          loc: { section: 'Terror and Repression', para: '12' }
        },
        provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/iran/26.htm' }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1983' },
            cites: [
              {
                source: 'iranica-yarshater-chronology-part-4',
                loc: { section: 'Chronology of Iranian History Part 4, 1983' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q8',
        text: 'Soviet diplomats are expelled from Iran and the Tudeh Party is officially outlawed.',
        lang: 'en',
        cite: {
          source: 'iranica-yarshater-chronology-part-4',
          loc: { section: 'Chronology of Iranian History Part 4' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-08',
          url: 'https://www.iranicaonline.org/articles/chronology-of-iranian-history-part-4/'
        }
      }
    }
  ],
  hero: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/c/c8/Kianouri1981.jpeg',
    page: 'https://commons.wikimedia.org/wiki/File:Kianouri1981.jpeg',
    credit: { institution: 'Islamic Republic of Iran Broadcasting' },
    license: { id: 'public-domain' }
  }
})
