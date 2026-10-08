import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'founding-of-the-soviet-union',
  names: [
    { text: 'Founding of the Soviet Union', lang: 'en', role: 'primary' },
    { text: 'Образование СССР', lang: 'ru', role: 'native' }
  ],
  researched: '2026-10-08',
  type: 'founding',
  start: {
    alts: [
      {
        value: { d: '1922-12-30' },
        cites: [
          {
            source: 'stalin-1922-formation-of-the-union-of-soviet-republics',
            loc: { section: 'Notes', para: '1' }
          }
        ]
      }
    ]
  },
  regions: ['russia-central-asia', 'europe'],
  prominence: 1,
  places: [
    {
      ref: 'place:moscow',
      cites: [
        { source: 'lemo-chronik-1922', loc: { section: 'Chronik 1922', para: '225' } }
      ]
    }
  ],
  participants: [
    {
      ref: 'person:vladimir-lenin',
      role: 'leader',
      cites: [
        {
          source: 'loc-russia-country-study-1996',
          loc: { section: 'The Era of the New Economic Policy', para: '6' }
        }
      ]
    },
    {
      ref: 'person:joseph-stalin',
      role: 'leader',
      cites: [
        {
          source: 'loc-russia-country-study-1996',
          loc: { section: 'The Era of the New Economic Policy', para: '6' }
        }
      ]
    }
  ],
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q2',
          text: 'Some communists favored a centralized Soviet state, while nationalists wanted autonomy for the borderlands. A compromise between the two positions was reached in December 1922 with the formation of the USSR.',
          lang: 'en',
          cite: {
            source: 'loc-russia-country-study-1996',
            loc: { section: 'The Era of the New Economic Policy', para: '4' }
          },
          provenance: { via: 'web', at: '2026-10-07', url: 'http://countrystudies.us/russia/9.htm' }
        },
        {
          id: 'q12',
          text: 'The constituent republics of this "Soviet Union" (the Russian, Belorussian, Ukrainian, and Transcaucasian republics--the last combining Armenia, Azerbaijan, and Georgia) exercised a degree of cultural and linguistic autonomy, while the communist, predominantly Russian, leadership in Moscow retained political authority over the entire country.',
          lang: 'en',
          cite: {
            source: 'loc-russia-country-study-1996',
            loc: { section: 'The Era of the New Economic Policy', para: '4' }
          },
          provenance: { via: 'web', at: '2026-10-07', url: 'http://countrystudies.us/russia/9.htm' }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q3',
          text: 'The period of war communism was followed in the 1920s by a partial retreat from Bolshevik principles. The New Economic Policy (Novaya ekonomicheskaya politika--NEP; see Glossary) permitted certain types of private economic activity, so that the country might recover from the ravages of the Civil War. The interval was cut short, however, by the death of Lenin and the sharply different approach to governance of his successor, Joseph Stalin.',
          lang: 'en',
          cite: {
            source: 'loc-russia-country-study-1996',
            loc: { section: 'The Era of the New Economic Policy', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/russia/9.htm' }
        },
        {
          id: 'q4',
          text: 'Now the Soviet leader proposed a tactical retreat, convincing the congress to adopt a temporary compromise with capitalism under the NEP program.',
          lang: 'en',
          cite: {
            source: 'loc-russia-country-study-1996',
            loc: { section: 'The Era of the New Economic Policy', para: '3' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/russia/9.htm' }
        },
        {
          id: 'q13',
          text: 'The Politburo (Political Bureau), which became the elite policy-making agency of the nation, created the new post of general secretary for the supervision of personnel matters and assigned Stalin to this office in April 1922.',
          lang: 'en',
          cite: {
            source: 'loc-russia-country-study-1996',
            loc: { section: 'The Era of the New Economic Policy', para: '5' }
          },
          provenance: { via: 'web', at: '2026-10-07', url: 'http://countrystudies.us/russia/9.htm' }
        },
        {
          id: 'q19',
          text: 'From 1922 until 1936, Georgia was part of a united Transcaucasian Soviet Federated Socialist Republic (TSFSR) within the Soviet Union.',
          lang: 'en',
          cite: {
            source: 'loc-georgia-country-study-1994',
            loc: { section: 'Within the Soviet Union', para: '3' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/georgia/9.htm' }
        }
      ]
    },
    {
      kind: 'in-their-words',
      quotes: [
        {
          id: 'q18',
          text: 'Comrades, this day marks a turning point in the history of the Soviet power.',
          lang: 'en',
          cite: {
            source: 'stalin-1922-formation-of-the-union-of-soviet-republics',
            loc: { section: 'The Formation of the Union of the Soviet Republics', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.marxists.org/reference/archive/stalin/works/1922/12/30.htm'
          }
        }
      ]
    },
    {
      kind: 'aftermath',
      quotes: [
        {
          id: 'q5',
          text: 'Although a collective of prominent communists nominally guided the party and the Soviet Union, Lenin commanded such prestige and authority that even such brilliant theoreticians as Trotsky and Nikolay Bukharin generally yielded to his will. But when Lenin became temporarily incapacitated after a stroke in May 1922, the unity of the Politburo fractured, and a troika (triumvirate) formed by Stalin, Lev Kamenev, and Grigoriy Zinov\'yev assumed leadership in opposition to Trotsky.',
          lang: 'en',
          cite: {
            source: 'loc-russia-country-study-1996',
            loc: { section: 'The Era of the New Economic Policy', para: '6' }
          },
          provenance: { via: 'web', at: '2026-10-09', url: 'http://countrystudies.us/russia/9.htm' }
        },
        {
          id: 'q14',
          text: 'Although Lenin recommended that Stalin be removed from that position, the Politburo decided not to take action, and Stalin still was in office when Lenin died in January 1924.',
          lang: 'en',
          cite: {
            source: 'loc-russia-country-study-1996',
            loc: { section: 'The Era of the New Economic Policy', para: '6' }
          },
          provenance: { via: 'web', at: '2026-10-07', url: 'http://countrystudies.us/russia/9.htm' }
        },
        {
          id: 'q6',
          text: 'With this support, Stalin ousted the leaders of the "Left Opposition" from their positions in 1926 and 1927 and forced Trotsky into exile in 1928. As the NEP era ended, open debate within the party became increasingly limited as Stalin gradually eliminated his opponents.',
          lang: 'en',
          cite: {
            source: 'loc-russia-country-study-1996',
            loc: { section: 'The Era of the New Economic Policy', para: '10' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/russia/9.htm' }
        },
        {
          id: 'q15',
          text: 'The period of Trotsky’s triumph also contained the seeds of his future disappointments. The national revolution did not spread beyond Russia’s borders; Joseph Stalin’s (1878-1953) leadership attempted to build socialism in isolation. It was a political environment that, after Lenin’s death, saw Trotsky crushed politically and exiled from the USSR.',
          lang: 'en',
          cite: {
            source: 'eo1418-thatcher-trotsky',
            loc: { section: 'The 1917 Russian Revolution', para: '4' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://encyclopedia.1914-1918-online.net/article/trotsky-leon/'
          }
        }
      ]
    },
    {
      kind: 'legacy',
      quotes: [
        {
          id: 'q20',
          text: 'As important as Lenin\'s activities were to the establishment of the Soviet Union, his legacy to the Soviet future was perhaps even more significant.',
          lang: 'en',
          cite: {
            source: 'loc-russia-country-study-1996',
            loc: { section: 'The Era of the New Economic Policy', para: '7' }
          },
          provenance: { via: 'web', at: '2026-10-09', url: 'http://countrystudies.us/russia/9.htm' }
        },
        {
          id: 'q7',
          text: 'Thus, although the Soviet regime was not totalitarian when he died, Lenin had nonetheless laid the foundation upon which such a tyranny would later arise.',
          lang: 'en',
          cite: {
            source: 'loc-russia-country-study-1996',
            loc: { section: 'The Era of the New Economic Policy', para: '7' }
          },
          provenance: { via: 'web', at: '2026-10-09', url: 'http://countrystudies.us/russia/9.htm' }
        }
      ]
    }
  ],
  course: [
    {
      date: {
        alts: [
          {
            value: { d: '1922-12-29' },
            cites: [
              {
                source: 'stalin-1922-formation-of-the-union-of-soviet-republics',
                loc: { section: 'Notes', para: '2' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q16',
        text: 'The conference examined and adopted the Declaration and the Treaty on the Formation of the Union of Soviet Socialist Republics.',
        lang: 'en',
        cite: {
          source: 'stalin-1922-formation-of-the-union-of-soviet-republics',
          loc: { section: 'Notes', para: '2' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-08',
          url: 'https://www.marxists.org/reference/archive/stalin/works/1922/12/30.htm'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1922-12-30' },
            cites: [
              {
                source: 'stalin-1922-formation-of-the-union-of-soviet-republics',
                loc: { section: 'Notes', para: '1' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q17',
        text: 'The First Congress of Soviets of the U.S.S.R. took place in Moscow on December 30, 1922. There were present 1,727 delegates from the R.S.F.S.R., 364 from the Ukrainian S.S.R., 91 from the Transcaucasian Federation and 33 from the Byelo-russian S.S.R. The congress discussed J. V. Stalin\'s report on the formation of the Union of Soviet Socialist Republics, it ratified the Declaration and the Treaty of Union on the Formation of the U.S.S.R., and elected the Central Executive Committee of the U.S.S.R.',
        lang: 'en',
        cite: {
          source: 'stalin-1922-formation-of-the-union-of-soviet-republics',
          loc: { section: 'Notes', para: '1' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-08',
          url: 'https://www.marxists.org/reference/archive/stalin/works/1922/12/30.htm'
        }
      }
    }
  ],
  hero: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/1/14/Declaration_and_Treaty_on_the_Creation_of_the_USSR-1922-page1.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Declaration_and_Treaty_on_the_Creation_of_the_USSR-1922-page1.jpg',
    credit: { institution: 'Federal Archival Agency of Russia' },
    license: { id: 'public-domain' }
  },
  furtherReading: [
    { source: 'gurvich-1923-istoriia-sovetskoi-konstitutsii', perspective: 'russian-soviet' },
    { source: 'kharmandarian-1972-obrazovanie-soiuza-sssr', perspective: 'russian-soviet' }
  ]
})
