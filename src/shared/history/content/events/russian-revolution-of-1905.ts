import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'russian-revolution-of-1905',
  names: [
    { text: 'Russian Revolution of 1905', lang: 'en', role: 'primary' },
    { text: 'Революция 1905 года', lang: 'ru', role: 'native' }
  ],
  researched: '2026-10-07',
  type: 'revolution',
  start: {
    alts: [
      {
        value: { d: '1905-01' },
        cites: [
          {
            source: 'loc-russia-country-study-1996',
            loc: { section: 'The Last Years of the Autocracy', para: '4' }
          }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1907' },
        cites: [
          {
            source: 'loc-russia-country-study-1996',
            loc: { section: 'Revolution and Counterrevolution, 1905-07', para: '2' }
          }
        ]
      }
    ]
  },
  regions: ['russia-central-asia', 'europe'],
  prominence: 1,
  places: [
    { ref: 'place:saint-petersburg' }
  ],
  participants: [
    {
      ref: 'person:nicholas-ii',
      role: 'head-of-state',
      cites: [
        {
          source: 'loc-russia-country-study-1996',
          loc: { section: 'The Last Years of the Autocracy', para: '5' }
        }
      ]
    },
    {
      name: 'Georgiy Gapon',
      role: 'leader',
      cites: [
        {
          source: 'loc-russia-country-study-1996',
          loc: { section: 'The Last Years of the Autocracy', para: '4' }
        }
      ]
    },
    {
      name: 'Sergey Witte',
      role: 'head-of-government',
      cites: [
        {
          source: 'loc-russia-country-study-1996',
          loc: { section: 'The Last Years of the Autocracy', para: '5' }
        }
      ]
    },
    {
      name: 'Pyotr Stolypin',
      role: 'head-of-government',
      cites: [
        {
          source: 'loc-russia-country-study-1996',
          loc: { section: 'The Last Years of the Autocracy', para: '8' }
        }
      ]
    }
  ],
  related: [
    {
      ref: 'event:russo-japanese-war',
      rel: 'caused-by',
      cites: [
        {
          source: 'loc-russia-country-study-1996',
          loc: { section: 'The Last Years of the Autocracy', para: '3' }
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
          text: 'The Russo-Japanese War accelerated the rise of political movements among all classes and the major nationalities, including propertied Russians. By early 1904, Russian liberal activists from the zemstva and from the professions had formed an organization called the Union of Liberation. In the same year, they joined with Finns, Poles, Georgians, Armenians, and Russian members of the Socialist Revolutionary Party to form an antiautocratic alliance.',
          lang: 'en',
          cite: {
            source: 'loc-russia-country-study-1996',
            loc: { section: 'The Last Years of the Autocracy', para: '3' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/russia/7.htm' }
        }
      ]
    },
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q10',
          text: 'Social and political unrest swept the Russian Empire in 1905, forcing the autocratic tsarist regime to grant the creation of a popularly-elected legislative body; the State Duma. However, the army remained largely loyal to the Tsar, unlike in the wartime conditions of 1917, and the regime did not topple.',
          lang: 'en',
          cite: {
            source: 'eo1418-peeling-revolution-of-1905',
            loc: { section: 'Revolution of 1905 (Russian Empire)' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://encyclopedia.1914-1918-online.net/article/revolution-of-1905-russian-empire/'
          }
        },
        {
          id: 'q2',
          text: 'This event, which came to be called Bloody Sunday, combined with the embarrassing failures in the war with Japan to prompt more strikes, agrarian disorders, army mutinies, and terrorist acts organized by opposition groups. Workers formed a council, or soviet, in St. Petersburg. Armed uprisings occurred in Moscow, the Urals, Latvia, and parts of Poland. Activists from the zemstva and the broad professional Union of Unions formed the Constitutional Democratic Party, whose initials lent the party its informal name, the Kadets.',
          lang: 'en',
          cite: {
            source: 'loc-russia-country-study-1996',
            loc: { section: 'The Last Years of the Autocracy', para: '4' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/russia/7.htm' }
        },
        {
          id: 'q3',
          text: 'Nevertheless, the regime continued to function through the chaotic year of 1905, eventually restoring order in the cities, the countryside, and the army. In the process, terrorists murdered several thousand officials, and the government executed an equal number of terrorists.',
          lang: 'en',
          cite: {
            source: 'loc-russia-country-study-1996',
            loc: { section: 'The Last Years of the Autocracy', para: '5' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/russia/7.htm' }
        }
      ]
    },
    {
      kind: 'legacy',
      quotes: [
        {
          id: 'q4',
          text: 'Historians have debated whether Russia had the potential to develop a constitutional government between 1905 and 1914. The failure to do so was partly because the tsar was not willing to give up autocratic rule or share power. By manipulating the franchise, the government obtained progressively more conservative, but less representative, Dumas. Moreover, the regime sometimes bypassed the conservative Dumas and ruled by decree.',
          lang: 'en',
          cite: {
            source: 'loc-russia-country-study-1996',
            loc: { section: 'The Last Years of the Autocracy', para: '11' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/russia/7.htm' }
        },
        {
          id: 'q5',
          text: 'Historians have speculated about whether Witte\'s and Stolypin\'s bold reform plans could have "saved" the Russian Empire. But court politics, together with the continuing isolation of the tsar and the bureaucracy from the rest of society, hampered all reforms.',
          lang: 'en',
          cite: {
            source: 'loc-russia-country-study-1996',
            loc: { section: 'The Last Years of the Autocracy', para: '12' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/russia/7.htm' }
        }
      ]
    }
  ],
  course: [
    {
      date: {
        alts: [
          {
            value: { d: '1905-01' },
            cites: [
              {
                source: 'loc-russia-country-study-1996',
                loc: { section: 'The Last Years of the Autocracy', para: '4' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q6',
        text: 'In January 1905, Father Georgiy Gapon, a Russian Orthodox priest who headed a police-sponsored workers\' association, led a huge, peaceful march in St. Petersburg to present a petition to the tsar. Nervous troops responded to the throng with gunfire, killing several hundred people and initiating the Revolution of 1905.',
        lang: 'en',
        cite: {
          source: 'loc-russia-country-study-1996',
          loc: { section: 'The Last Years of the Autocracy', para: '4' }
        },
        provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/russia/7.htm' }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1905' },
            cites: [
              {
                source: 'loc-russia-country-study-1996',
                loc: { section: 'The Last Years of the Autocracy', para: '5' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q7',
        text: 'In late 1905, Witte pressured Nicholas to issue the so-called October Manifesto, which gave Russia a constitution and proclaimed basic civil liberties for all citizens.',
        lang: 'en',
        cite: {
          source: 'loc-russia-country-study-1996',
          loc: { section: 'The Last Years of the Autocracy', para: '5' }
        },
        provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/russia/7.htm' }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1906-03' },
            cites: [
              {
                source: 'loc-russia-country-study-1996',
                loc: { section: 'The Last Years of the Autocracy', para: '6' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q8',
        text: 'The First Duma was elected in March 1906. The Kadets and their allies dominated it, with the mainly nonparty radical leftists slightly weaker than the Octobrists and the nonparty center-rightists combined. The socialists had boycotted the election, but several socialist delegates were elected. Relations between the Duma and the Stolypin government were hostile from the beginning. A deadlock of the Kadets and the government over the adoption of a constitution and peasant reform led to the dissolution of the Duma and the scheduling of new elections.',
        lang: 'en',
        cite: {
          source: 'loc-russia-country-study-1996',
          loc: { section: 'The Last Years of the Autocracy', para: '6' }
        },
        provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/russia/7.htm' }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1907-06' },
            cites: [
              {
                source: 'loc-russia-country-study-1996',
                loc: { section: 'The Last Years of the Autocracy', para: '8' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q9',
        text: 'In June 1907, he dissolved the Second Duma and promulgated a new electoral law, which vastly reduced the electoral weight of lower-class and non-Russian voters and increased the weight of the nobility. This political coup had the desired short-term result of restoring order.',
        lang: 'en',
        cite: {
          source: 'loc-russia-country-study-1996',
          loc: { section: 'The Last Years of the Autocracy', para: '8' }
        },
        provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/russia/7.htm' }
      }
    }
  ],
  hero: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/5/52/Rasstrel_rabochego_shestviya1.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Rasstrel_rabochego_shestviya1.jpg',
    credit: { creator: 'Karl Bulla' },
    license: { id: 'public-domain' }
  }
})
