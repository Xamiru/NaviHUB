import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'turkish-war-of-independence',
  names: [
    { text: 'Turkish War of Independence', lang: 'en', role: 'primary' },
    { text: 'Kurtuluş Savaşı', lang: 'tr', role: 'native' },
    {
      text: 'Defence of National Rights movement',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'eo1418-zurcher-kemal',
          loc: { section: 'World War I Years – Beyond the Gallipoli Narrative' }
        }
      ]
    }
  ],
  researched: '2026-10-08',
  type: 'war',
  start: {
    alts: [
      {
        value: { d: '1919-05' },
        cites: [
          {
            source: 'eo1418-zurcher-kemal',
            loc: { section: 'World War I Years – Beyond the Gallipoli Narrative' }
          }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1922' },
        cites: [
          {
            source: 'eo1418-zurcher-kemal',
            loc: { section: 'World War I Years – Beyond the Gallipoli Narrative' }
          }
        ]
      }
    ]
  },
  regions: ['mena', 'europe'],
  prominence: 2,
  places: [
    {
      ref: 'place:ankara',
      cites: [
        {
          source: 'loc-turkey-country-study-1995',
          loc: { section: 'Atatürk and the Turkish Nation', para: '11' }
        }
      ]
    },
    {
      ref: 'place:izmir',
      cites: [
        {
          source: 'loc-turkey-country-study-1995',
          loc: { section: 'Atatürk and the Turkish Nation', para: '15' }
        }
      ]
    }
  ],
  polities: [
    { ref: 'polity:ottoman-empire' }
  ],
  sides: [
    {
      key: 'nationalists',
      name: 'Turkish nationalist movement',
      cites: [
        {
          source: 'loc-turkey-country-study-1995',
          loc: { section: 'Atatürk and the Turkish Nation', para: '8' }
        }
      ]
    },
    {
      key: 'greece',
      name: 'Greek army',
      polity: 'polity:kingdom-of-greece',
      cites: [
        {
          source: 'loc-turkey-country-study-1995',
          loc: { section: 'Atatürk and the Turkish Nation', para: '13' }
        }
      ]
    }
  ],
  participants: [
    {
      ref: 'person:mustafa-kemal-ataturk',
      role: 'leader',
      side: 'nationalists',
      cites: [
        {
          source: 'loc-turkey-country-study-1995',
          loc: { section: 'Atatürk and the Turkish Nation', para: '8' }
        },
        {
          source: 'eo1418-zurcher-kemal',
          loc: { section: 'World War I Years – Beyond the Gallipoli Narrative' }
        }
      ]
    },
    {
      name: 'Ismet Pasha',
      role: 'commander',
      side: 'nationalists',
      cites: [
        {
          source: 'loc-turkey-country-study-1995',
          loc: { section: 'Atatürk and the Turkish Nation', para: '13' }
        }
      ]
    }
  ],
  related: [
    {
      ref: 'event:treaty-of-lausanne',
      rel: 'led-to',
      cites: [
        {
          source: 'loc-turkey-country-study-1995',
          loc: { section: 'Atatürk and the Turkish Nation', para: '18' }
        }
      ]
    },
    {
      ref: 'event:proclamation-of-the-republic-of-turkey',
      rel: 'led-to',
      cites: [
        {
          source: 'loc-turkey-country-study-1995',
          loc: { section: 'Atatürk and the Turkish Nation', para: '20' }
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
          text: 'After the war he emerged as the leader of the resistance against the dismemberment of the Ottoman Empire in Anatolia, the “Defence of National Rights” movement. After the victory of this resistance movement in 1922 he went on to proclaim the Republic of Turkey on 29 October 1923 and became its first president.',
          lang: 'en',
          cite: {
            source: 'eo1418-zurcher-kemal',
            loc: { section: 'World War I Years – Beyond the Gallipoli Narrative' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://encyclopedia.1914-1918-online.net/article/kemal-mustafa-ataturk/'
          }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q2',
          text: 'Allied troops--British, French, and Italian, as well as a contingent of Greeks--occupied Istanbul and were permitted under the conditions of the armistice to intervene in areas where they considered their interests to be imperiled. During the war, the Allies had negotiated a series of agreements that outlined not only the definitive dismantling of the Ottoman Empire but also the partitioning among them of what Turkish nationalists had come to regard as the Turkish homeland.',
          lang: 'en',
          cite: {
            source: 'loc-turkey-country-study-1995',
            loc: { section: 'Atatürk and the Turkish Nation', para: '4' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/turkey/13.htm' }
        },
        {
          id: 'q3',
          text: 'The terms of a peace treaty with the Ottoman Empire were presented by the Allies in April 1920 at San Remo, Italy, and were embodied in the Treaty of Sèvres, which was concluded the following August.',
          lang: 'en',
          cite: {
            source: 'loc-turkey-country-study-1995',
            loc: { section: 'Atatürk and the Turkish Nation', para: '6' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/turkey/13.htm' }
        }
      ]
    },
    {
      kind: 'course',
      quotes: [
        {
          id: 'q4',
          text: 'At the same time, a Turkish nationalist movement was organized under Atatürk\'s leadership to resist the dismemberment of Turkish-speaking areas.',
          lang: 'en',
          cite: {
            source: 'loc-turkey-country-study-1995',
            loc: { section: 'Atatürk and the Turkish Nation', para: '8' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/turkey/13.htm' }
        },
        {
          id: 'q5',
          text: 'The congress adopted the National Pact, which defined objectives of the nationalist movement that were not open to compromise.',
          lang: 'en',
          cite: {
            source: 'loc-turkey-country-study-1995',
            loc: { section: 'Atatürk and the Turkish Nation', para: '9' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/turkey/13.htm' }
        },
        {
          id: 'q6',
          text: 'Military action between Turks and Greeks in Anatolia in 1920 was inconclusive, but the nationalist cause was strengthened the next year by a series of important victories. In January and again in April, Ismet Pasha defeated the Greek army at Inönü, blocking its advance into the interior of Anatolia. In July, in the face of a third offensive, the Turkish forces fell back in good order to the Sakarya River, eighty kilometers from Ankara, where Atatürk took personal command and decisively defeated the Greeks in a twenty-day battle.',
          lang: 'en',
          cite: {
            source: 'loc-turkey-country-study-1995',
            loc: { section: 'Atatürk and the Turkish Nation', para: '13' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/turkey/13.htm' }
        },
        {
          id: 'q7',
          text: 'Impressed by the viability of the nationalist forces, both France and Italy withdrew from Anatolia by October 1921. Treaties were signed that year with Soviet Russia, the first European power to recognize the nationalists, establishing the boundary between the two countries.',
          lang: 'en',
          cite: {
            source: 'loc-turkey-country-study-1995',
            loc: { section: 'Atatürk and the Turkish Nation', para: '14' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/turkey/13.htm' }
        },
        {
          id: 'q8',
          text: 'In September the Turks moved into Izmir, where thousands were killed during the ensuing fighting and in the disorder that followed the city\'s capture. Greek soldiers and refugees, who had crowded into Izmir, were rescued by Allied ships.',
          lang: 'en',
          cite: {
            source: 'loc-turkey-country-study-1995',
            loc: { section: 'Atatürk and the Turkish Nation', para: '15' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/turkey/13.htm' }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q9',
          text: 'In November 1922, the Grand National Assembly separated the offices of sultan and caliph and abolished the former.',
          lang: 'en',
          cite: {
            source: 'loc-turkey-country-study-1995',
            loc: { section: 'Atatürk and the Turkish Nation', para: '17' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/turkey/13.htm' }
        }
      ]
    }
  ],
  course: [
    {
      date: {
        alts: [
          {
            value: { d: '1919-05' },
            cites: [
              {
                source: 'eo1418-zurcher-kemal',
                loc: { section: 'World War I Years – Beyond the Gallipoli Narrative' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q10',
        text: 'On 16 May 1919 Mustafa Kemal left for Anatolia, landing at Samsun three days later.',
        lang: 'en',
        cite: {
          source: 'eo1418-zurcher-kemal',
          loc: { section: 'World War I Years – Beyond the Gallipoli Narrative' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-08',
          url: 'https://encyclopedia.1914-1918-online.net/article/kemal-mustafa-ataturk/'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1919-07' },
            cites: [
              {
                source: 'loc-turkey-country-study-1995',
                loc: { section: 'Atatürk and the Turkish Nation', para: '9' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q11',
        text: 'In July 1919, a nationalist congress met at Erzurum with Atatürk presiding to endorse a protocol calling for an independent Turkish state.',
        lang: 'en',
        cite: {
          source: 'loc-turkey-country-study-1995',
          loc: { section: 'Atatürk and the Turkish Nation', para: '9' }
        },
        provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/turkey/13.htm' }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1922-08' },
            cites: [
              {
                source: 'loc-turkey-country-study-1995',
                loc: { section: 'Atatürk and the Turkish Nation', para: '15' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q12',
        text: 'The final drive against the Greeks began in August 1922.',
        lang: 'en',
        cite: {
          source: 'loc-turkey-country-study-1995',
          loc: { section: 'Atatürk and the Turkish Nation', para: '15' }
        },
        provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/turkey/13.htm' }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1922-10' },
            cites: [
              {
                source: 'gov-uk-past-foreign-secretaries-george-curzon',
                loc: { section: 'George Nathaniel Curzon' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q13',
        text: 'In compliance with the Armistice of Mundanya, concluded in October, Greek troops withdrew beyond the Maritsa River, allowing the Turkish nationalists to occupy territory up to that boundary.',
        lang: 'en',
        cite: {
          source: 'loc-turkey-country-study-1995',
          loc: { section: 'Atatürk and the Turkish Nation', para: '16' }
        },
        provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/turkey/13.htm' }
      }
    }
  ],
  hero: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/3/35/Commanders_of_the_Turkish_War_of_Independence.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Commanders_of_the_Turkish_War_of_Independence.jpg',
    credit: { institution: 'Afyon Kocatepe University' },
    license: { id: 'public-domain' }
  },
  furtherReading: [
    { source: 'harp-tarihi-dairesi-1962-turk-istiklal-harbi', perspective: 'turkish' },
    { source: 'ataturk-1999-nutuk', perspective: 'turkish' }
  ]
})
