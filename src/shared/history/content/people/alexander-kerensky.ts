import { definePerson } from '../../schema'

export default definePerson({
  id: 'alexander-kerensky',
  names: [
    { text: 'Alexander Kerensky', lang: 'en', role: 'primary' },
    { text: 'Александр Фёдорович Керенский', lang: 'ru', role: 'native' },
    { text: 'Aleksandr Kerenskii', lang: 'en', role: 'alternative' }
  ],
  researched: '2026-10-08',
  born: {
    alts: [
      {
        value: { d: '1881-04-22' },
        cites: [
          {
            source: 'eo1418-peeling-kerenskii',
            loc: { section: 'Kerenskii, Aleksandr Fedorovich' }
          }
        ]
      }
    ]
  },
  died: {
    alts: [
      {
        value: { d: '1970-06-11' },
        cites: [
          {
            source: 'eo1418-peeling-kerenskii',
            loc: { section: 'Kerenskii, Aleksandr Fedorovich' }
          }
        ]
      }
    ]
  },
  bornIn: {
    ref: 'place:simbirsk',
    cites: [
      {
        source: 'eo1418-peeling-kerenskii',
        loc: { section: 'Kerenskii, Aleksandr Fedorovich' }
      }
    ]
  },
  diedIn: {
    ref: 'place:new-york-city',
    cites: [
      {
        source: 'eo1418-peeling-kerenskii',
        loc: { section: 'Kerenskii, Aleksandr Fedorovich' }
      }
    ]
  },
  regions: ['russia-central-asia'],
  roles: ['politician', 'head-of-state'],
  offices: [
    {
      title: 'Prime Minister of the Provisional Government',
      start: {
        alts: [
          {
            value: { d: '1917-07' },
            cites: [
              {
                source: 'eo1418-peeling-kerenskii',
                loc: { section: 'Kerenskii, Aleksandr Fedorovich' }
              }
            ]
          }
        ]
      },
      end: {
        alts: [
          {
            value: { d: '1917-10' },
            cites: [
              {
                source: 'eo1418-peeling-kerenskii',
                loc: { section: 'Kerenskii, Aleksandr Fedorovich' }
              }
            ]
          }
        ]
      },
      cites: [
        {
          source: 'eo1418-peeling-kerenskii',
          loc: { section: 'Kerenskii, Aleksandr Fedorovich' }
        }
      ]
    }
  ],
  portrait: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/e/e8/Isaak_Brodsky%2C_Alexander_Kerensky%2C_c._1917%E2%80%931918%2C_Museum_of_Contemporary_History_of_Russia%2C_Moscow_%D0%93%D0%A6%D0%9C%D0%A1%D0%98%D0%A0_%D0%93%D0%98%D0%9A_12067%3B_from_goskatalog.ru.jpg/1280px-Isaak_Brodsky%2C_Alexander_Kerensky%2C_c._1917%E2%80%931918%2C_Museum_of_Contemporary_History_of_Russia%2C_Moscow_%D0%93%D0%A6%D0%9C%D0%A1%D0%98%D0%A0_%D0%93%D0%98%D0%9A_12067%3B_from_goskatalog.ru.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Isaak_Brodsky,_Alexander_Kerensky,_c._1917%E2%80%931918,_Museum_of_Contemporary_History_of_Russia,_Moscow_%D0%93%D0%A6%D0%9C%D0%A1%D0%98%D0%A0_%D0%93%D0%98%D0%9A_12067;_from_goskatalog.ru.jpg',
    credit: { institution: 'Museum of Contemporary History of Russia', creator: 'Isaak Brodsky' },
    license: { id: 'public-domain' }
  },
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'Aleksandr Kerenskii was Minister of War in Russia’s Provisional Government from April to October 1917 and Prime Minister from July to October. He embodied the hopes of the February Revolution of 1917, the doomed military offensive of June 1917, and the abrupt failure of the Provisional Government in October.',
          lang: 'en',
          cite: {
            source: 'eo1418-peeling-kerenskii',
            loc: { section: 'Kerenskii, Aleksandr Fedorovich' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://encyclopedia.1914-1918-online.net/article/kerenskii-aleksandr-fedorovich/'
          }
        }
      ]
    },
    {
      kind: 'early-life',
      quotes: [
        {
          id: 'q2',
          text: 'Aleksandr Kerenskii (1881-1970) was born in Simbirsk, Russia, where his father was director of the Classical Gymnasium. Among the Gymnasium’s pupils was Vladimir Il’ich Ulianov (1870-1924), the future Lenin.',
          lang: 'en',
          cite: {
            source: 'eo1418-peeling-kerenskii',
            loc: { section: 'Kerenskii, Aleksandr Fedorovich' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://encyclopedia.1914-1918-online.net/article/kerenskii-aleksandr-fedorovich/'
          }
        }
      ]
    },
    {
      kind: 'career',
      quotes: [
        {
          id: 'q3',
          text: 'The Socialist Revolutionaries boycotted the parliament, but Kerenskii was elected in October 1912 to represent the peasant-based Trudovik group.',
          lang: 'en',
          cite: {
            source: 'eo1418-peeling-kerenskii',
            loc: { section: 'Kerenskii, Aleksandr Fedorovich' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://encyclopedia.1914-1918-online.net/article/kerenskii-aleksandr-fedorovich/'
          }
        },
        {
          id: 'q4',
          text: 'Quickly assuming de facto leadership of the government, Kerenskiy ordered the army to launch a major offensive in June. After early successes, that offensive turned into a full-scale retreat in July.',
          lang: 'en',
          cite: {
            source: 'loc-russia-country-study-1996',
            loc: { section: 'Revolutions and Civil War', para: '8' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/russia/8.htm' }
        },
        {
          id: 'q5',
          text: 'Kerenskii’s intentions during the Kornilov Affair remain disputed, in particular the extent to which he was complicit in Kornilov’s plans or sought to use Kornilov, either to create his own dictatorship or as a scapegoat for strong-arm measures, before backing down.',
          lang: 'en',
          cite: {
            source: 'eo1418-peeling-kerenskii',
            loc: { section: 'Kerenskii, Aleksandr Fedorovich' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://encyclopedia.1914-1918-online.net/article/kerenskii-aleksandr-fedorovich/'
          }
        },
        {
          id: 'q6',
          text: 'Kerenskiy left Petrograd to organize resistance, but his countercoup failed and he fled Russia.',
          lang: 'en',
          cite: {
            source: 'loc-russia-country-study-1996',
            loc: { section: 'Revolutions and Civil War', para: '15' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/russia/8.htm' }
        }
      ]
    },
    {
      kind: 'later-life',
      quotes: [
        {
          id: 'q7',
          text: 'He spent the rest of his life in exile, reflecting on the failure of his government, which he blamed on the inability to establish peace.',
          lang: 'en',
          cite: {
            source: 'eo1418-peeling-kerenskii',
            loc: { section: 'Kerenskii, Aleksandr Fedorovich' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://encyclopedia.1914-1918-online.net/article/kerenskii-aleksandr-fedorovich/'
          }
        }
      ]
    },
    {
      kind: 'legacy',
      quotes: [
        {
          id: 'q8',
          text: 'Kerenskii extolled freedom but rejected autonomy for Russia’s nationalities; signed a Declaration of Soldier’s Rights but toyed with restoring order through military discipline; and was devoted to democratic government but became virtual dictator in a failed attempt to save it.',
          lang: 'en',
          cite: {
            source: 'eo1418-peeling-kerenskii',
            loc: { section: 'Kerenskii, Aleksandr Fedorovich' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://encyclopedia.1914-1918-online.net/article/kerenskii-aleksandr-fedorovich/'
          }
        }
      ]
    }
  ]
})
