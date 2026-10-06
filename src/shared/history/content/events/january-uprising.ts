import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'january-uprising',
  names: [
    { text: 'January Uprising', lang: 'en', role: 'primary' },
    {
      text: 'January Insurrection',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'loc-poland-country-study-1992',
          loc: { section: 'PARTITIONED POLAND', para: '15' }
        }
      ]
    }
  ],
  researched: '2026-10-06',
  type: 'uprising',
  start: {
    alts: [
      {
        value: { d: '1863-01' },
        cites: [
          {
            source: 'loc-poland-country-study-1992',
            loc: { section: 'PARTITIONED POLAND', para: '15' }
          }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1864-08' },
        cites: [
          {
            source: 'loc-poland-country-study-1992',
            loc: { section: 'PARTITIONED POLAND', para: '15' }
          }
        ]
      }
    ]
  },
  regions: ['europe', 'russia-central-asia'],
  prominence: 2,
  partOf: [
    { ref: 'period:reign-of-alexander-ii' }
  ],
  participants: [
    {
      ref: 'person:alexander-ii-of-russia',
      role: 'head-of-state',
      cites: [
        {
          source: 'loc-poland-country-study-1992',
          loc: { section: 'PARTITIONED POLAND', para: '15' }
        }
      ]
    },
    {
      name: 'Mikhail Muravev',
      role: 'commander',
      cites: [
        {
          source: 'loc-poland-country-study-1992',
          loc: { section: 'PARTITIONED POLAND', para: '15' }
        }
      ]
    },
    {
      ref: 'person:otto-von-bismarck',
      role: 'participant',
      cites: [
        {
          source: 'lemo-biografie-otto-von-bismarck',
          loc: { section: 'Otto von Bismarck 1815-1898', para: '62' }
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
          text: 'The last and most tenacious of the Polish uprisings of the mid- nineteenth century erupted in the Russian-occupied sector in January 1863.',
          lang: 'en',
          cite: {
            source: 'loc-poland-country-study-1992',
            loc: { section: 'PARTITIONED POLAND', para: '15' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/poland/12.htm' }
        }
      ]
    },
    {
      kind: 'causes',
      quotes: [
        {
          id: 'q2',
          text: 'Following Russia\'s disastrous defeat in the Crimean War, the government of Tsar Alexander II enacted a series of liberal reforms, including liberation of the serfs throughout the empire. High-handed imposition of land reforms in Poland aroused hostility among the landed nobles and a group of young radical intellectuals influenced by Karl Marx and the Russian liberal Alexander Herzen.',
          lang: 'en',
          cite: {
            source: 'loc-poland-country-study-1992',
            loc: { section: 'PARTITIONED POLAND', para: '15' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/poland/12.htm' }
        }
      ]
    },
    {
      kind: 'course',
      quotes: [
        {
          id: 'q3',
          text: 'Repeating the pattern of 1830-31, the open revolt of the January Insurrection by Congress Poland failed to win foreign backing. Although its socially progressive program could not mobilize the peasants, the rebellion persisted stubbornly for fifteen months.',
          lang: 'en',
          cite: {
            source: 'loc-poland-country-study-1992',
            loc: { section: 'PARTITIONED POLAND', para: '15' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/poland/12.htm' }
        },
        {
          id: 'q4',
          text: 'A weak Franco-Russian entente soured, however, when France backed a Polish uprising against Russian rule in 1863.',
          lang: 'en',
          cite: {
            source: 'loc-russia-country-study-1996',
            loc: { section: 'Transformation of Russia in the Nineteenth Century', para: '18' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/russia/6.htm' }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q5',
          text: 'After finally crushing the insurgency in August 1864, Russia abolished the Congress Kingdom of Poland altogether and revoked the separate status of the Polish lands, incorporating them directly as the Western Region of the Russian Empire.',
          lang: 'en',
          cite: {
            source: 'loc-poland-country-study-1992',
            loc: { section: 'PARTITIONED POLAND', para: '15' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/poland/12.htm' }
        },
        {
          id: 'q6',
          text: 'The region was placed under the dictatorial rule of Mikhail Muravev, who became known as the Hangman of Wilno.',
          lang: 'en',
          cite: {
            source: 'loc-poland-country-study-1992',
            loc: { section: 'PARTITIONED POLAND', para: '15' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/poland/12.htm' }
        },
        {
          id: 'q7',
          text: 'Increasing oppression at Russian hands after failed national uprisings finally convinced Polish leaders that insurrection was premature at best and perhaps fundamentally misguided and counterproductive.',
          lang: 'en',
          cite: {
            source: 'loc-poland-country-study-1992',
            loc: { section: 'PARTITIONED POLAND', para: '17' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/poland/12.htm' }
        }
      ]
    }
  ],
  course: [
    {
      date: {
        alts: [
          {
            value: { d: '1863-02-08' },
            cites: [
              {
                source: 'lemo-biografie-otto-von-bismarck',
                loc: { section: 'Otto von Bismarck 1815-1898', para: '61' }
              },
              {
                source: 'lemo-biografie-otto-von-bismarck',
                loc: { section: 'Otto von Bismarck 1815-1898', para: '62' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q8',
        text: '8. Februar: Mit Unterzeichnung der Alvenslebenschen Konvention unterstützt Bismarck Russland in der Bekämpfung des polnischen Aufstands und sichert sich so den in den kommenden Jahren wichtigen russischen Rückhalt.',
        lang: 'de',
        cite: {
          source: 'lemo-biografie-otto-von-bismarck',
          loc: { section: 'Otto von Bismarck 1815-1898', para: '62' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://www.dhm.de/lemo/biografie/otto-von-bismarck'
        }
      }
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/8/83/Artur_Grottger_-_Po_powstaniu._W_drodze_do_ko%C5%9Bcio%C5%82a_1864.jpg/1280px-Artur_Grottger_-_Po_powstaniu._W_drodze_do_ko%C5%9Bcio%C5%82a_1864.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Artur_Grottger_-_Po_powstaniu._W_drodze_do_ko%C5%9Bcio%C5%82a_1864.jpg',
    credit: { institution: 'National Museum in Wrocław', creator: 'Artur Grottger' },
    license: { id: 'public-domain' }
  }
})
