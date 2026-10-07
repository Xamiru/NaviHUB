import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'founding-of-the-soviet-union',
  names: [
    { text: 'Founding of the Soviet Union', lang: 'en', role: 'primary' },
    { text: 'Образование СССР', lang: 'ru', role: 'native' }
  ],
  researched: '2026-10-07',
  type: 'founding',
  start: {
    alts: [
      {
        value: { d: '1922-12' },
        cites: [
          {
            source: 'loc-russia-country-study-1996',
            loc: { section: 'The Era of the New Economic Policy', para: '4' }
          },
          { source: 'lemo-chronik-1922', loc: { section: 'Chronik 1922', para: '224' } }
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
          id: 'q1',
          text: 'Der X. Allrussische Rätekongress in Moskau beschließt die Gründung der Union der Sozialistischen Sowjetrepubliken (UdSSR). Damit soll eine engere Bindung von der Ukraine, Weißrusslands und der Kaukasusrepubliken an Sowjetrussland erreicht werden.',
          lang: 'de',
          cite: { source: 'lemo-chronik-1922', loc: { section: 'Chronik 1922', para: '225' } },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.dhm.de/lemo/jahreschronik/1922.html'
          }
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
        }
      ]
    },
    {
      kind: 'aftermath',
      quotes: [
        {
          id: 'q5',
          text: 'But when Lenin became temporarily incapacitated after a stroke in May 1922, the unity of the Politburo fractured, and a troika (triumvirate) formed by Stalin, Lev Kamenev, and Grigoriy Zinov\'yev assumed leadership in opposition to Trotsky.',
          lang: 'en',
          cite: {
            source: 'loc-russia-country-study-1996',
            loc: { section: 'The Era of the New Economic Policy', para: '6' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/russia/9.htm' }
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
        }
      ]
    },
    {
      kind: 'legacy',
      quotes: [
        {
          id: 'q7',
          text: 'Thus, although the Soviet regime was not totalitarian when he died, Lenin had nonetheless laid the foundation upon which such a tyranny would later arise.',
          lang: 'en',
          cite: {
            source: 'loc-russia-country-study-1996',
            loc: { section: 'The Era of the New Economic Policy', para: '7' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/russia/9.htm' }
        }
      ]
    }
  ],
  course: [
    {
      date: {
        alts: [
          {
            value: { d: '1922-04-03' },
            cites: [
              { source: 'lemo-chronik-1922', loc: { section: 'Chronik 1922', para: '58' } }
            ]
          }
        ]
      },
      quote: {
        id: 'q8',
        text: 'Auf Vorschlag von Wladimir I. Lenin wird Josef W. Stalin zum neuen Generalsekretär des Zentralkomitees (ZK) der Kommunistischen Partei (KP) Russlands gewählt.',
        lang: 'de',
        cite: { source: 'lemo-chronik-1922', loc: { section: 'Chronik 1922', para: '59' } },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://www.dhm.de/lemo/jahreschronik/1922.html'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1923-07-06' },
            cites: [
              { source: 'lemo-chronik-1923', loc: { section: 'Chronik 1923', para: '136' } }
            ]
          }
        ]
      },
      quote: {
        id: 'q9',
        text: 'Nach Billigung durch das sowjetische Zentralexekutivkomitee tritt die erste Verfassung der UdSSR in Kraft.',
        lang: 'de',
        cite: { source: 'lemo-chronik-1923', loc: { section: 'Chronik 1923', para: '137' } },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://www.dhm.de/lemo/jahreschronik/1923.html'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1924-01-21' },
            cites: [
              { source: 'lemo-chronik-1924', loc: { section: 'Chronik 1924', para: '8' } }
            ]
          }
        ]
      },
      quote: {
        id: 'q10',
        text: 'Tod des Gründers und Regierungschefs der Sowjetunion, Wladimir I. Lenin, in Gorki (bei Moskau).',
        lang: 'de',
        cite: { source: 'lemo-chronik-1924', loc: { section: 'Chronik 1924', para: '9' } },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://www.dhm.de/lemo/jahreschronik/1924.html'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1929-01-29' },
            cites: [
              { source: 'lemo-chronik-1929', loc: { section: 'Chronik 1929', para: '14' } }
            ]
          }
        ]
      },
      quote: {
        id: 'q11',
        text: 'Der ehemalige Volkskommissar des Äußeren, Leo D. Trotzki, wird aus der Sowjetunion ausgewiesen und reist nach Konstantinopel (heute: Istanbul).',
        lang: 'de',
        cite: { source: 'lemo-chronik-1929', loc: { section: 'Chronik 1929', para: '15' } },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://www.dhm.de/lemo/jahreschronik/1929.html'
        }
      }
    }
  ],
  hero: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/1/14/Declaration_and_Treaty_on_the_Creation_of_the_USSR-1922-page1.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Declaration_and_Treaty_on_the_Creation_of_the_USSR-1922-page1.jpg',
    credit: { institution: 'Federal Archival Agency of Russia' },
    license: { id: 'public-domain' }
  }
})
