import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'young-turk-revolution',
  names: [
    { text: 'Young Turk Revolution', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-08',
  type: 'revolution',
  start: {
    alts: [
      {
        value: { d: '1908-07' },
        cites: [
          {
            source: 'loc-turkey-country-study-1995',
            loc: { section: 'The Young Turks', para: '2' }
          }
        ]
      }
    ]
  },
  regions: ['mena', 'europe'],
  prominence: 1,
  places: [
    { ref: 'place:istanbul' }
  ],
  polities: [
    { ref: 'polity:ottoman-empire' }
  ],
  participants: [
    {
      ref: 'person:abdul-hamid-ii',
      role: 'head-of-state',
      cites: [
        {
          source: 'loc-turkey-country-study-1995',
          loc: { section: 'The Young Turks', para: '2' }
        }
      ]
    },
    {
      name: 'Committee of Union and Progress',
      role: 'organizer',
      cites: [
        {
          source: 'loc-turkey-country-study-1995',
          loc: { section: 'The Young Turks', para: '1' }
        },
        { source: 'britannica-1911-turkey', loc: { section: 'TURKEY', para: '1455' } }
      ]
    },
    {
      ref: 'person:mustafa-kemal-ataturk',
      role: 'participant',
      cites: [
        {
          source: 'loc-turkey-country-study-1995',
          loc: { section: 'The Young Turks', para: '1' }
        }
      ]
    },
    {
      ref: 'person:enver-pasha',
      role: 'organizer',
      cites: [
        { source: 'britannica-1911-turkey', loc: { section: 'TURKEY', para: '1453' } },
        { source: 'britannica-1911-turkey', loc: { section: 'TURKEY', para: '1455' } }
      ]
    },
    {
      name: 'Niazi Bey',
      role: 'commander',
      cites: [
        { source: 'britannica-1911-turkey', loc: { section: 'TURKEY', para: '1453' } }
      ]
    },
    {
      name: 'Mahmud Shevket Pasha',
      role: 'commander',
      cites: [
        { source: 'britannica-1911-turkey', loc: { section: 'TURKEY', para: '1458' } },
        { source: 'britannica-1911-turkey', loc: { section: 'TURKEY', para: '1459' } }
      ]
    },
    {
      name: 'Mehmed V',
      role: 'head-of-state',
      cites: [
        { source: 'britannica-1911-turkey', loc: { section: 'TURKEY', para: '1459' } }
      ]
    }
  ],
  related: [
    {
      ref: 'event:bosnian-annexation-crisis',
      rel: 'contributed-to',
      cites: [
        {
          source: 'loc-turkey-country-study-1995',
          loc: { section: 'The Young Turks', para: '2' }
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
          text: 'In July 1908, army units in Macedonia revolted and demanded a return to constitutional government. Appearing to yield, Abdül Hamid II approved parliamentary elections in November in which the CUP won all but one of the Turkish seats under a system that allowed proportional representation of all millets .',
          lang: 'en',
          cite: {
            source: 'loc-turkey-country-study-1995',
            loc: { section: 'The Young Turks', para: '2' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/turkey/11.htm' }
        },
        {
          id: 'q3',
          text: 'The Young Turk government was weakened by splits between nationalist and liberal reformers, however, and was threatened by traditionalist Muslims and by demands from non-Turkish communities for greater autonomy.',
          lang: 'en',
          cite: {
            source: 'loc-turkey-country-study-1995',
            loc: { section: 'The Young Turks', para: '2' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/turkey/11.htm' }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q1',
          text: 'Atatürk\'s group merged with other nationalist reform organizations in 1907 to form the Committee of Union and Progress (CUP). Also known as the Young Turks, this group sought to restore the 1876 constitution and unify the diverse elements of the empire into a homogeneous nation through greater government centralization under a parliamentary regime.',
          lang: 'en',
          cite: {
            source: 'loc-turkey-country-study-1995',
            loc: { section: 'The Young Turks', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/turkey/11.htm' }
        },
        {
          id: 'q7',
          text: 'In these circumstances the headquarters of the Young Turks were transferred from Paris to Salonica, where a central body, known as the committee of union and progress, was established (1908) to organize the revolution. Most of its members were military officers, prominent among them being Majors Enver Bey and Niazi Bey, who directed the propaganda in Albania and Macedonia.',
          lang: 'en',
          cite: { source: 'britannica-1911-turkey', loc: { section: 'TURKEY', para: '1453' } },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Turkey'
          }
        }
      ]
    },
    {
      kind: 'causes',
      quotes: [
        {
          id: 'q6',
          text: 'At the beginning of 1908 a favourable opportunity for action arrived. The Ottoman troops in Arabia were mutinous and unpaid; the Albanians, long the mainstay of Turkish military power in the west, had been irritated by unpopular taxes and by the repressive edicts which deprived them of schools and a printing-press; foreign interference in Crete and Macedonia was resented by patriotic Moslems throughout the empire.',
          lang: 'en',
          cite: { source: 'britannica-1911-turkey', loc: { section: 'TURKEY', para: '1453' } },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Turkey'
          }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q4',
          text: 'Foreign powers took advantage of the political instability in Istanbul to seize portions of the empire. Austria annexed Bosnia and Herzegovina immediately after the 1908 revolution, and Bulgaria proclaimed its complete independence.',
          lang: 'en',
          cite: {
            source: 'loc-turkey-country-study-1995',
            loc: { section: 'The Young Turks', para: '2' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/turkey/11.htm' }
        }
      ]
    }
  ],
  course: [
    {
      date: {
        alts: [
          {
            value: { d: '1908-07-23' },
            cites: [
              { source: 'britannica-1911-turkey', loc: { section: 'TURKEY', para: '1455' } }
            ]
          }
        ]
      },
      quote: {
        id: 'q8',
        text: 'On the 23rd the committee of union and progress, under the presidency of Enver Bey, proclaimed the constitution in Salonica, while the second and third army corps threatened to march on Constantinople if the sultan refused to obey the proclamation.',
        lang: 'en',
        cite: { source: 'britannica-1911-turkey', loc: { section: 'TURKEY', para: '1455' } },
        provenance: {
          via: 'web',
          at: '2026-10-08',
          url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Turkey'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1908-07-24' },
            cites: [
              { source: 'britannica-1911-turkey', loc: { section: 'TURKEY', para: '1455' } }
            ]
          }
        ]
      },
      quote: {
        id: 'q9',
        text: 'On the 24th the sultan yielded, and issued an iradē, restoring the constitution of 1876, and ordering the election of a chamber of deputies.',
        lang: 'en',
        cite: { source: 'britannica-1911-turkey', loc: { section: 'TURKEY', para: '1455' } },
        provenance: {
          via: 'web',
          at: '2026-10-08',
          url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Turkey'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1909-04' },
            cites: [
              { source: 'britannica-1911-turkey', loc: { section: 'TURKEY', para: '1458' } }
            ]
          }
        ]
      },
      quote: {
        id: 'q10',
        text: 'Mutinous troops seized the parliament house and the telegraph offices; the grand vizier resigned and was succeeded by Tewfik Pasha (April 14); and delegates were sent by the Liberal Union, the association of Ulema and other bodies to discuss terms with the committee.',
        lang: 'en',
        cite: { source: 'britannica-1911-turkey', loc: { section: 'TURKEY', para: '1458' } },
        provenance: {
          via: 'web',
          at: '2026-10-08',
          url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Turkey'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1909-04-25' },
            cites: [
              { source: 'britannica-1911-turkey', loc: { section: 'TURKEY', para: '1459' } }
            ]
          }
        ]
      },
      quote: {
        id: 'q11',
        text: 'Part of the garrison remained loyal to the sultan, but after five hours of severe fighting Shevket Pasha was able to occupy the capital (April 25). The National Assembly met in secret session two days later, voted unanimously for the deposition of Abd-ul-Hamid II., and chose his younger brother Mahommed Reshad Effendi (b. Nov. 3, 1844) as his successor, with the style of Mahommed V.',
        lang: 'en',
        cite: { source: 'britannica-1911-turkey', loc: { section: 'TURKEY', para: '1459' } },
        provenance: {
          via: 'web',
          at: '2026-10-08',
          url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Turkey'
        }
      }
    }
  ],
  hero: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/d/dc/Greek_lithograph_celebrating_the_Ottoman_Constitution.png',
    page: 'https://commons.wikimedia.org/wiki/File:Greek_lithograph_celebrating_the_Ottoman_Constitution.png',
    credit: { creator: 'Sotiris Christidis' },
    license: { id: 'public-domain' }
  },
  furtherReading: [
    { source: 'hanioglu-2001-preparation-for-a-revolution', perspective: 'turkish' },
    { source: 'bayur-1940-turk-inkilabi-tarihi', perspective: 'turkish' },
    { source: 'tanor-2020-osmanli-turk-anayasal-gelismeleri', perspective: 'turkish' }
  ]
})
