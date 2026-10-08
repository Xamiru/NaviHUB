import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'congress-of-vienna',
  names: [
    { text: 'Congress of Vienna', lang: 'en', role: 'primary' },
    { text: 'Wiener Kongress', lang: 'de', role: 'native' }
  ],
  researched: '2026-10-08',
  type: 'conference',
  start: {
    alts: [
      {
        value: { d: '1814-09' },
        cites: [
          {
            source: 'loc-austria-country-study-1994',
            loc: { section: 'The Congress of Vienna', para: '1' }
          }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1815-06-09' },
        cites: [
          {
            source: 'britannica-1911-vienna-congress-of',
            loc: { section: 'VIENNA, CONGRESS OF', para: '12' }
          }
        ]
      }
    ]
  },
  regions: ['europe', 'global'],
  prominence: 1,
  places: [
    {
      ref: 'place:vienna',
      cites: [
        {
          source: 'loc-austria-country-study-1994',
          loc: { section: 'The Congress of Vienna', para: '1' }
        }
      ]
    }
  ],
  polities: [
    { ref: 'polity:austrian-empire' },
    { ref: 'polity:kingdom-of-prussia' },
    { ref: 'polity:united-kingdom' }
  ],
  participants: [
    {
      ref: 'person:klemens-von-metternich',
      role: 'leader',
      cites: [
        {
          source: 'loc-austria-country-study-1994',
          loc: { section: 'The Congress of Vienna', para: '1' }
        }
      ]
    },
    {
      ref: 'person:alexander-i-of-russia',
      role: 'head-of-state',
      cites: [
        {
          source: 'loc-russia-country-study-1996',
          loc: { section: 'Ruling the Empire', para: '8' }
        }
      ]
    },
    {
      name: 'Prince Talleyrand',
      role: 'diplomat',
      cites: [
        {
          source: 'britannica-1911-vienna-congress-of',
          loc: { section: 'VIENNA, CONGRESS OF', para: '3' }
        }
      ]
    },
    {
      name: 'Lord Castlereagh',
      role: 'diplomat',
      cites: [
        {
          source: 'britannica-1911-vienna-congress-of',
          loc: { section: 'VIENNA, CONGRESS OF', para: '2' }
        }
      ]
    },
    {
      name: 'Prince von Hardenberg',
      role: 'diplomat',
      cites: [
        {
          source: 'britannica-1911-vienna-congress-of',
          loc: { section: 'VIENNA, CONGRESS OF', para: '2' }
        }
      ]
    },
    {
      name: 'Frederick William III. of Prussia',
      role: 'head-of-state',
      cites: [
        {
          source: 'britannica-1911-vienna-congress-of',
          loc: { section: 'VIENNA, CONGRESS OF', para: '2' }
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
          text: 'From September 1814 to June 1815, representatives of the European powers met in Vienna. Guided by Metternich, the Congress of Vienna redrew the map of Europe and laid the foundation for a long period of European peace.',
          lang: 'en',
          cite: {
            source: 'loc-austria-country-study-1994',
            loc: { section: 'The Congress of Vienna', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/austria/20.htm' }
        },
        {
          id: 'q2',
          text: 'In addition to the delegates of many small states, the congress included representatives of five large European states: Austria, Prussia, Russia, Britain, and France.',
          lang: 'en',
          cite: {
            source: 'loc-germany-country-study-1995',
            loc: { section: 'The German Confederation, 1815-66', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/germany/23.htm' }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q6',
          text: 'The fall of Napoleon was only achieved by the creation of a special alliance between Great Britain, Austria, Russia and Prussia. By the Treaty of Chaumont of March 10, 1814, these four powers bound themselves together in a bond which was not to be dissolved when peace was concluded. When Napoleon had been beaten, France conceded to these allies by a secret article of the first Treaty of Paris of May 30, 1814, the disposition of all countries which Napoleon\'s fall had freed from French suzerainty. This stupendous task was reserved for a general congress, and it was agreed to meet at Vienna.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-vienna-congress-of',
            loc: { section: 'VIENNA, CONGRESS OF', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Vienna,_Congress_of'
          }
        }
      ]
    },
    {
      kind: 'course',
      quotes: [
        {
          id: 'q8',
          text: 'Had the Four remained united in their views they would still have been irresistible. But they were gradually dividing into two irreconcilable parties upon the Saxon-Polish question. Alexander, exaggerating the part he had played in the final struggle, and with some vague idea of nationality in his brain, demanded that the whole of Poland should be added to the Russian dominions.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-vienna-congress-of',
            loc: { section: 'VIENNA, CONGRESS OF', para: '7' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Vienna,_Congress_of'
          }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q3',
          text: 'The Holy Roman Empire was not resurrected but was replaced with a German Confederation composed of thirty-five sovereign princes and four free cities.',
          lang: 'en',
          cite: {
            source: 'loc-austria-country-study-1994',
            loc: { section: 'The Congress of Vienna', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/austria/20.htm' }
        },
        {
          id: 'q4',
          text: 'The Congress of Vienna created the Kingdom of Poland (Russian Poland), to which Alexander granted a constitution.',
          lang: 'en',
          cite: {
            source: 'loc-russia-country-study-1996',
            loc: { section: 'Ruling the Empire', para: '9' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/russia/5.htm' }
        },
        {
          id: 'q5',
          text: 'The wartime allies--Austria, Britain, Russia, and Prussia-- concluded the Congress of Vienna by signing the Quadruple Alliance, which pledged them to uphold the peace settlement.',
          lang: 'en',
          cite: {
            source: 'loc-austria-country-study-1994',
            loc: { section: 'The Congress of Vienna', para: '2' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/austria/20.htm' }
        },
        {
          id: 'q11',
          text: 'Switzerland was given a constitution which led it in the direction of its later federalism. In Italy Austria retained her hold on Lombardy and Venetia, Genoa was assigned to the kingdom of Sardinia, while Parma went to Marie Louise, the legitimate heir. Carlo Ludivico, having to be content with the reversion after her death, the congress meanwhile assigning Lucca to him as a duchy; the claims of the young Napoleon to succeed his mother in Parma were only destroyed by the efforts of France and England. The other petty monarchs were restored, and Murat\'s rash attempt, after Napoleon\'s return from Elba, to make himself king of united Italy, gave back Naples to the Bourbons, an event which would have been brought about in any case in the course of the next few years (see Murat, Joachim). Holland was confirmed in the possession of Belgium and Luxemburg, Limburg and Liége were added to her dominions. Sweden, who had sacrificed Finland to Russia, obtained Norway.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-vienna-congress-of',
            loc: { section: 'VIENNA, CONGRESS OF', para: '10' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Vienna,_Congress_of'
          }
        }
      ]
    },
    {
      kind: 'legacy',
      quotes: [
        {
          id: 'q13',
          text: 'Europe was not ready for the recognition of nationality and liberalism. What it wanted most of all was peace, and by establishing something like a territorial equilibrium the congress did much to win that breathing space which was the cardinal need of all.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-vienna-congress-of',
            loc: { section: 'VIENNA, CONGRESS OF', para: '14' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Vienna,_Congress_of'
          }
        },
        {
          id: 'q12',
          text: 'Thus the congress of Vienna failed to institute any new system for securing the stability of the European polity, nor did it recognize those new forces of liberty and nationality which had really caused Napoleon\'s downfall. Following the tradition of all preceding congresses, it was mainly a scramble for territory and power. Territories were distributed among the powers with no consideration for the feelings of their inhabitants, and in general the right of the strongest prevailed.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-vienna-congress-of',
            loc: { section: 'VIENNA, CONGRESS OF', para: '14' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Vienna,_Congress_of'
          }
        }
      ]
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/b/b6/Congres_de_vienne.png/1280px-Congres_de_vienne.png',
    page: 'https://commons.wikimedia.org/wiki/File:Congres_de_vienne.png',
    credit: { creator: 'Jean-Baptiste Isabey' },
    license: { id: 'public-domain' }
  },
  course: [
    {
      date: {
        alts: [
          {
            value: { d: '1814-09-22' },
            cites: [
              {
                source: 'britannica-1911-vienna-congress-of',
                loc: { section: 'VIENNA, CONGRESS OF', para: '5' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q7',
        text: 'At an informal meeting on the 22nd of September the four great powers agreed that all subjects of general interest were to be settled by a committee consisting of Austria, Russia, Prussia and Great Britain together with France and Spain. At the same time, however, it was decided by a secret protocol that the four powers should first settle among themselves the distribution of the conquered territories, and that France and Spain should only be consulted when their final decision was announced.',
        lang: 'en',
        cite: {
          source: 'britannica-1911-vienna-congress-of',
          loc: { section: 'VIENNA, CONGRESS OF', para: '5' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-07',
          url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Vienna,_Congress_of'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1815-01' },
            cites: [
              {
                source: 'britannica-1911-vienna-congress-of',
                loc: { section: 'VIENNA, CONGRESS OF', para: '9' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q9',
        text: 'Gradually a compromise was arranged, and by the end of the month all danger was past. Eventually Austria and Prussia retained most of their Polish dominions, and the latter power only received about two-fifths of Saxony. The rest of Poland was incorporated as a separate kingdom in the Russian dominions with a promise of a constitution of its own.',
        lang: 'en',
        cite: {
          source: 'britannica-1911-vienna-congress-of',
          loc: { section: 'VIENNA, CONGRESS OF', para: '9' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-07',
          url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Vienna,_Congress_of'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1815-06-09' },
            cites: [
              {
                source: 'britannica-1911-vienna-congress-of',
                loc: { section: 'VIENNA, CONGRESS OF', para: '12' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q10',
        text: 'The Final Act, embodying all the separate treaties, was signed on the 9th of June 1815, a few days before the battle of Waterloo.',
        lang: 'en',
        cite: {
          source: 'britannica-1911-vienna-congress-of',
          loc: { section: 'VIENNA, CONGRESS OF', para: '12' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-07',
          url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Vienna,_Congress_of'
        }
      }
    }
  ],
  furtherReading: [
    { source: 'lentz-2013-le-congres-de-vienne', perspective: 'european' },
    { source: 'duchhardt-2013-der-wiener-kongress', perspective: 'european' },
    { source: 'stauber-2014-der-wiener-kongress', perspective: 'european' }
  ]
})
