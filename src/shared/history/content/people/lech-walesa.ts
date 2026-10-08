import { definePerson } from '../../schema'

export default definePerson({
  id: 'lech-walesa',
  names: [
    {
      text: 'Lech Walesa',
      lang: 'en',
      role: 'primary',
      cites: [
        {
          source: 'loc-poland-country-study-1992',
          loc: { section: 'The Birth of Solidarity', para: '1' }
        }
      ]
    },
    { text: 'Lech Wałęsa', lang: 'pl', role: 'native' }
  ],
  researched: '2026-10-08',
  born: {
    alts: [
      {
        value: { d: '1943-09-29' },
        cites: [
          { source: 'ipn-wzz-biogram-lech-walesa', loc: { section: 'Lech Wałęsa', para: '2' } }
        ],
        heldBy: [
          { kind: 'organization', name: 'Institute of National Remembrance' }
        ]
      },
      {
        value: { d: '1943-10-29' },
        cites: [
          {
            source: 'lech-walesa-institute-biography',
            loc: { section: 'BIOGRAPHY', para: '2' }
          }
        ],
        heldBy: [
          { kind: 'organization', name: 'Lech Wałęsa Institute Foundation' }
        ]
      }
    ]
  },
  bornIn: {
    ref: 'place:popowo',
    cites: [
      { source: 'ipn-wzz-biogram-lech-walesa', loc: { section: 'Lech Wałęsa', para: '2' } }
    ]
  },
  regions: ['europe'],
  roles: ['activist', 'politician', 'head-of-state'],
  offices: [
    {
      title: 'Chairman of the National Coordinating Commission of Solidarity',
      start: {
        alts: [
          {
            value: { d: '1980-09-17' },
            cites: [
              {
                source: 'ecs-how-did-solidarnosc-come-to-be',
                loc: { section: 'How Did Solidarność (Solidarity) Come To Be?', para: '39' }
              }
            ]
          }
        ]
      },
      cites: [
        {
          source: 'ecs-how-did-solidarnosc-come-to-be',
          loc: { section: 'How Did Solidarność (Solidarity) Come To Be?', para: '39' }
        }
      ]
    },
    {
      title: 'President of Poland',
      start: {
        alts: [
          {
            value: { d: '1990' },
            cites: [
              {
                source: 'ipn-wzz-biogram-lech-walesa',
                loc: { section: 'Lech Wałęsa', para: '9' }
              }
            ]
          }
        ]
      },
      end: {
        alts: [
          {
            value: { d: '1995' },
            cites: [
              {
                source: 'ipn-wzz-biogram-lech-walesa',
                loc: { section: 'Lech Wałęsa', para: '9' }
              }
            ]
          }
        ]
      },
      cites: [
        { source: 'ipn-wzz-biogram-lech-walesa', loc: { section: 'Lech Wałęsa', para: '9' } }
      ]
    }
  ],
  portrait: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/f/fa/Lech_Walesa_1980.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Lech_Walesa_1980.jpg',
    credit: { institution: 'Znak (Polish magazine), August–September 1980 issue' },
    license: { id: 'public-domain' }
  },
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'Lech Wałęsa, once an employee, proved to be a charismatic leader and became the head of the movement.',
          lang: 'en',
          cite: {
            source: 'ecs-how-did-solidarnosc-come-to-be',
            loc: { section: 'How Did Solidarność (Solidarity) Come To Be?', para: '13' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://ecs.gda.pl/en/how-did-solidarnosc-solidarity-come-to-be/'
          }
        },
        {
          id: 'q2',
          text: 'The strike at the Gdańsk Shipyard, led by Lech Wałęsa, soon evolved into a nationwide movement, supported by more than 10 million members within just a year.',
          lang: 'en',
          cite: {
            source: 'ipn-the-anniversary-of-solidarity',
            loc: { section: 'The Anniversary of Solidarity: A Legacy of Freedom', para: '3' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://eng.ipn.gov.pl/en/news/11979,The-Anniversary-of-Solidarity-A-Legacy-of-Freedom.html'
          }
        }
      ]
    },
    {
      kind: 'early-life',
      quotes: [
        {
          id: 'q12',
          text: 'Lech Wałęsa was born on 29th October 1943. First mention about his activity in the anti-communist opposition originates from 1968 when Wałęsa, then a young electrician in the Gdansk shipyard, tried to persuade his colleagues not to take part in the mass meetings organized by the Polish government to condemn student’s strikes during the March 1968 events.',
          lang: 'en',
          cite: {
            source: 'lech-walesa-institute-biography',
            loc: { section: 'BIOGRAPHY', para: '2' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://web.archive.org/web/20230814094244/https://ilw.org.pl/en/founder/biography'
          }
        },
        {
          id: 'q3',
          text: 'Urodził się 29 IX 1943 r. w Popowie k. Lipna.',
          lang: 'pl',
          cite: { source: 'ipn-wzz-biogram-lech-walesa', loc: { section: 'Lech Wałęsa', para: '2' } },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://wzz.ipn.gov.pl/wzz/biogramy/2653,Lech-Walesa.html'
          }
        },
        {
          id: 'q4',
          text: 'W 1967 rozpoczął pracę w Stoczni Gdańskiej im. Lenina jako elektryk okrętowy.',
          lang: 'pl',
          cite: { source: 'ipn-wzz-biogram-lech-walesa', loc: { section: 'Lech Wałęsa', para: '3' } },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://wzz.ipn.gov.pl/wzz/biogramy/2653,Lech-Walesa.html'
          }
        }
      ]
    },
    {
      kind: 'career',
      quotes: [
        {
          id: 'q13',
          text: 'In August 1980 Wałęsa was one of the main organisers of the strike in the Gdansk Shipyard. His brave character resulted in unyielding negotiations and tough struggle for the realisation of the protesters demands. Wałęsa’s activity led to a bloodless victory - the foundation of “Solidarity”, the first independent and oppositional social movement in the Soviet bloc.',
          lang: 'en',
          cite: {
            source: 'lech-walesa-institute-biography',
            loc: { section: 'BIOGRAPHY', para: '5' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://web.archive.org/web/20230814094244/https://ilw.org.pl/en/founder/biography'
          }
        },
        {
          id: 'q5',
          text: 'W sierpniu 1980 stanął na czele strajku w Stoczni Gdańskiej. Jako przewodniczący powołanego 16 VIII 1980 Międzyzakładowego Komitetu Strajkowego prowadził negocjacje z delegacją rządową. Sygnatariusz porozumień sierpniowych.',
          lang: 'pl',
          cite: { source: 'ipn-wzz-biogram-lech-walesa', loc: { section: 'Lech Wałęsa', para: '5' } },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://wzz.ipn.gov.pl/wzz/biogramy/2653,Lech-Walesa.html'
          }
        },
        {
          id: 'q6',
          text: 'With an oversized pen featuring the image of Pope John Paul II, Lech Wałęsa was the first among the members of the Inter-Enterprise Strike Committee (MKS) to sign the Gdańsk Agreement.',
          lang: 'en',
          cite: {
            source: 'ecs-how-did-solidarnosc-come-to-be',
            loc: { section: 'How Did Solidarność (Solidarity) Come To Be?', para: '37' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://ecs.gda.pl/en/how-did-solidarnosc-solidarity-come-to-be/'
          }
        },
        {
          id: 'q7',
          text: 'Under martial law, Jaruzelski\'s regime applied draconian restrictions on civil liberties, closed the universities, and imprisoned thousands of Solidarity activists, including Walesa.',
          lang: 'en',
          cite: {
            source: 'loc-poland-country-study-1992',
            loc: { section: 'Jaruzelski', para: '4' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/poland/20.htm' }
        },
        {
          id: 'q8',
          text: 'Walesa in particular refused to fade into obscurity; he gained added luster by his receipt of the Nobel Prize for Peace in 1983.',
          lang: 'en',
          cite: {
            source: 'loc-poland-country-study-1992',
            loc: { section: 'Jaruzelski', para: '7' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/poland/20.htm' }
        },
        {
          id: 'q14',
          text: 'In 1989 Wałęsa was the leader of the oppositional delegation during the Round Table Talks. Although relatively week, Polish regime was still dangerous. Wałęsa’s courage and decisiveness led to the compromise with the communist authorities. The election of 4 July 1989, being a great success of the opposition, resulted in the formation of the first noncommunist cabinet in the Soviet bloc.',
          lang: 'en',
          cite: {
            source: 'lech-walesa-institute-biography',
            loc: { section: 'BIOGRAPHY', para: '9' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://web.archive.org/web/20230814094244/https://ilw.org.pl/en/founder/biography'
          }
        },
        {
          id: 'q9',
          text: 'W trakcie obrad „Okrągłego Stołu” (6 II – 5 IV 1989) stał na czele delegacji NSZZ „Solidarność”',
          lang: 'pl',
          cite: { source: 'ipn-wzz-biogram-lech-walesa', loc: { section: 'Lech Wałęsa', para: '8' } },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://wzz.ipn.gov.pl/wzz/biogramy/2653,Lech-Walesa.html'
          }
        }
      ]
    },
    {
      kind: 'later-life',
      quotes: [
        {
          id: 'q15',
          text: 'On 22 December 1990 Wałęsa was elected the president of free Poland.',
          lang: 'en',
          cite: {
            source: 'lech-walesa-institute-biography',
            loc: { section: 'BIOGRAPHY', para: '10' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://web.archive.org/web/20230814094244/https://ilw.org.pl/en/founder/biography'
          }
        },
        {
          id: 'q16',
          text: 'With the reluctant support of the Mazowiecki faction and the implicit endorsement of the Roman Catholic Church, Walesa won the runoff with almost 75 percent of the vote to become Poland\'s first popularly elected president.',
          lang: 'en',
          cite: {
            source: 'loc-poland-country-study-1992',
            loc: { section: 'Popular Election of a President', para: '6' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/poland/65.htm' }
        },
        {
          id: 'q10',
          text: 'W 1990 w wyborach powszechnych wybrany Prezydentem RP. W 1995 ubiegał się o reelekcję, w drugiej turze wyborów został pokonany przez Aleksandra Kwaśniewskiego.',
          lang: 'pl',
          cite: { source: 'ipn-wzz-biogram-lech-walesa', loc: { section: 'Lech Wałęsa', para: '9' } },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://wzz.ipn.gov.pl/wzz/biogramy/2653,Lech-Walesa.html'
          }
        }
      ]
    },
    {
      kind: 'in-their-words',
      quotes: [
        {
          id: 'q11',
          text: 'At last, we have independent, self-governing trade unions! We have the right to strike! And we will have more rights established soon!',
          lang: 'en',
          cite: {
            source: 'ecs-how-did-solidarnosc-come-to-be',
            loc: { section: 'How Did Solidarność (Solidarity) Come To Be?', para: '37' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://ecs.gda.pl/en/how-did-solidarnosc-solidarity-come-to-be/'
          }
        }
      ]
    }
  ]
})
