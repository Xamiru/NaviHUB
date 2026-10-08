import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'first-boer-war',
  names: [
    { text: 'First Boer War', lang: 'en', role: 'primary' },
    {
      text: 'Transvaal War',
      lang: 'en',
      role: 'alternative',
      cites: [
        { source: 'nam-transvaal-war', loc: { section: 'Transvaal War', para: '1' } }
      ]
    },
    {
      text: 'First War of Independence',
      lang: 'en',
      role: 'alternative',
      usedBy: [
        { kind: 'public', name: 'Boers' }
      ],
      cites: [
        {
          source: 'loc-south-africa-country-study-1996',
          loc: { section: 'British Imperialism and the Afrikaners', para: '1' }
        }
      ]
    }
  ],
  researched: '2026-10-08',
  type: 'war',
  start: {
    alts: [
      {
        value: { d: '1880-12-13' },
        cites: [
          { source: 'nam-transvaal-war', loc: { section: 'Transvaal War', para: '13' } }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1881-03-23' },
        cites: [
          { source: 'nam-transvaal-war', loc: { section: 'Transvaal War', para: '40' } }
        ]
      }
    ]
  },
  regions: ['subsaharan-africa', 'europe'],
  prominence: 2,
  places: [
    {
      ref: 'place:majuba-hill',
      cites: [
        { source: 'nam-transvaal-war', loc: { section: 'Transvaal War', para: '34' } }
      ]
    }
  ],
  polities: [
    { ref: 'polity:british-empire' }
  ],
  related: [
    { ref: 'event:south-african-war', rel: 'related' }
  ],
  sides: [
    {
      key: 'boers',
      name: 'Boers',
      cites: [
        { source: 'nam-transvaal-war', loc: { section: 'Transvaal War', para: '13' } }
      ]
    },
    {
      key: 'britain',
      name: 'British',
      polity: 'polity:united-kingdom',
      cites: [
        { source: 'nam-transvaal-war', loc: { section: 'Transvaal War', para: '14' } }
      ]
    }
  ],
  participants: [
    {
      name: 'Paulus "Ohm" Krüger',
      role: 'leader',
      side: 'boers',
      cites: [
        { source: 'lemo-chronik-1880', loc: { section: 'Chronik 1880', para: '53' } }
      ]
    },
    {
      name: 'Commandant-General Piet Joubert',
      role: 'commander',
      side: 'boers',
      cites: [
        { source: 'nam-transvaal-war', loc: { section: 'Transvaal War', para: '28' } }
      ]
    },
    {
      name: 'Major-General Sir George Pomeroy-Colley',
      role: 'commander',
      side: 'britain',
      cites: [
        { source: 'nam-transvaal-war', loc: { section: 'Transvaal War', para: '14' } }
      ]
    },
    {
      name: 'Major-General Sir Evelyn Wood',
      role: 'negotiator',
      side: 'britain',
      cites: [
        { source: 'nam-transvaal-war', loc: { section: 'Transvaal War', para: '40' } }
      ]
    }
  ],
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'In 1880-81, the British fought a brief war against the Transvaal Boers in South Africa. The Boers were resistant to Britain\'s annexation of their territory and went on to inflict several stinging defeats during their successful fight for independence.',
          lang: 'en',
          cite: { source: 'nam-transvaal-war', loc: { section: 'Transvaal War', para: '1' } },
          provenance: { via: 'web', at: '2026-10-06', url: 'https://www.nam.ac.uk/explore/transvaal-war' }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q2',
          text: 'In 1877, Lord Carnarvon, Secretary of State for the Colonies, wanted to extend British imperial influence in South Africa by creating a federation of British colonies and Boer territories. The Boers of the Transvaal, which was also known as the South African Republic, opposed this.',
          lang: 'en',
          cite: { source: 'nam-transvaal-war', loc: { section: 'Transvaal War', para: '7' } },
          provenance: { via: 'web', at: '2026-10-06', url: 'https://www.nam.ac.uk/explore/transvaal-war' }
        },
        {
          id: 'q3',
          text: 'In 1877, fearing a collapse of the South African Republic in the face of defeat by a Pedi army, the British had formally annexed the Boer state, as the Transvaal.',
          lang: 'en',
          cite: {
            source: 'loc-south-africa-country-study-1996',
            loc: { section: 'British Imperialism and the Afrikaners', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/south-africa/16.htm' }
        }
      ]
    },
    {
      kind: 'course',
      quotes: [
        {
          id: 'q4',
          text: 'The British commander, Major-General Sir George Pomeroy-Colley, gathered a force to relieve the surrounded forts. However, he completely underestimated his well-armed Boer opponents, most of whom were highly skilled marksmen and adept at using cover. A series of British defeats soon ensued.',
          lang: 'en',
          cite: { source: 'nam-transvaal-war', loc: { section: 'Transvaal War', para: '14' } },
          provenance: { via: 'web', at: '2026-10-09', url: 'https://www.nam.ac.uk/explore/transvaal-war' }
        },
        {
          id: 'q5',
          text: 'The next day, the Boers began their ascent. Their accurate shooting soon decimated the defenders, some of whom broke and fled down the hill. On the British side, 285 soldiers were killed or wounded. Colley, shot while attempting to rally his men, was among the dead. Boer losses were only two dead and four wounded.',
          lang: 'en',
          cite: { source: 'nam-transvaal-war', loc: { section: 'Transvaal War', para: '35' } },
          provenance: { via: 'web', at: '2026-10-06', url: 'https://www.nam.ac.uk/explore/transvaal-war' }
        },
        {
          id: 'q6',
          text: 'Although the British had sent General Sir Frederick Roberts and reinforcements to South Africa, they were reluctant to continue a conflict that could be costly, messy and protracted. Also, the conciliatory tone adopted by the Boer negotiators made a settlement possible.',
          lang: 'en',
          cite: { source: 'nam-transvaal-war', loc: { section: 'Transvaal War', para: '39' } },
          provenance: { via: 'web', at: '2026-10-06', url: 'https://www.nam.ac.uk/explore/transvaal-war' }
        }
      ]
    },
    {
      kind: 'aftermath',
      quotes: [
        {
          id: 'q7',
          text: 'Although the Transvaal regained its independence, Britain retained control of its foreign relations.',
          lang: 'en',
          cite: { source: 'nam-transvaal-war', loc: { section: 'Transvaal War', para: '43' } },
          provenance: { via: 'web', at: '2026-10-06', url: 'https://www.nam.ac.uk/explore/transvaal-war' }
        },
        {
          id: 'q8',
          text: 'This treaty of peace was followed by a convention, signed in August of the same year, under which complete self-government was guaranteed to the inhabitants of the Transvaal, subject to the suzerainty of Great Britain, upon certain terms and conditions and subject to certain reservations and limitations.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-africa',
            loc: { section: 'AFRICA, V. Partition among European Powers', para: '18' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Africa'
          }
        },
        {
          id: 'q9',
          text: 'The discovery of gold there in 1886 raised the tension further. This all culminated in the outbreak of the Boer War in 1899.',
          lang: 'en',
          cite: { source: 'nam-transvaal-war', loc: { section: 'Transvaal War', para: '45' } },
          provenance: { via: 'web', at: '2026-10-06', url: 'https://www.nam.ac.uk/explore/transvaal-war' }
        }
      ]
    },
    {
      kind: 'legacy',
      quotes: [
        {
          id: 'q10',
          text: 'In 1880, however, the Transvaalers rose, and at the Battle of Majuba Hill in 1881, they defeated a British army. The British then withdrew, leaving the Boers victorious in what they would later call their First War of Independence.',
          lang: 'en',
          cite: {
            source: 'loc-south-africa-country-study-1996',
            loc: { section: 'British Imperialism and the Afrikaners', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/south-africa/16.htm' }
        },
        {
          id: 'q11',
          text: 'This nationalistic identity had emerged clearly in the early 1880s, after the victory of Majuba Hill,',
          lang: 'en',
          cite: {
            source: 'loc-south-africa-country-study-1996',
            loc: { section: 'British Imperialism and the Afrikaners', para: '4' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/south-africa/16.htm' }
        }
      ]
    }
  ],
  course: [
    {
      date: {
        alts: [
          {
            value: { d: '1880-12-13' },
            cites: [
              { source: 'nam-transvaal-war', loc: { section: 'Transvaal War', para: '13' } }
            ]
          },
          {
            value: { d: '1880-10-13' },
            cites: [
              { source: 'lemo-chronik-1880', loc: { section: 'Chronik 1880', para: '52' } },
              { source: 'lemo-chronik-1880', loc: { section: 'Chronik 1880', para: '53' } }
            ]
          }
        ]
      },
      quote: {
        id: 'q12',
        text: 'On 13 December 1880, around 4,000 Boers proclaimed the re-constitution of the South African Republic and appointed a provisional government.',
        lang: 'en',
        cite: { source: 'nam-transvaal-war', loc: { section: 'Transvaal War', para: '13' } },
        provenance: { via: 'web', at: '2026-10-06', url: 'https://www.nam.ac.uk/explore/transvaal-war' }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1880-12-20' },
            cites: [
              { source: 'nam-transvaal-war', loc: { section: 'Transvaal War', para: '19' } }
            ]
          }
        ]
      },
      quote: {
        id: 'q13',
        text: 'On 20 December 1880, at Bronkhorstspruit, Lieutenant-Colonel Philip Anstruther and a column of 260 men from the 94th Regiment were halted by around 200 Boers while marching from Lydenburg towards Pretoria.',
        lang: 'en',
        cite: { source: 'nam-transvaal-war', loc: { section: 'Transvaal War', para: '19' } },
        provenance: { via: 'web', at: '2026-10-06', url: 'https://www.nam.ac.uk/explore/transvaal-war' }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1881-01-28' },
            cites: [
              { source: 'nam-transvaal-war', loc: { section: 'Transvaal War', para: '27' } },
              { source: 'nam-transvaal-war', loc: { section: 'Transvaal War', para: '28' } }
            ]
          }
        ]
      },
      quote: {
        id: 'q14',
        text: 'On 28 January, Colley attempted a frontal attack to break through the Boer positions but was beaten back by Commandant-General Piet Joubert’s sharpshooters. Of the 480 British troops who made the assault, 150 were killed.',
        lang: 'en',
        cite: { source: 'nam-transvaal-war', loc: { section: 'Transvaal War', para: '28' } },
        provenance: { via: 'web', at: '2026-10-06', url: 'https://www.nam.ac.uk/explore/transvaal-war' }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1881-02-27' },
            cites: [
              { source: 'lemo-chronik-1881', loc: { section: 'Chronik 1881', para: '15' } },
              { source: 'lemo-chronik-1881', loc: { section: 'Chronik 1881', para: '16' } }
            ]
          }
        ]
      },
      quote: {
        id: 'q18',
        text: 'On the night of 26 February 1881, he led a force to occupy the heights of Majuba Hill, which overlooked the nearby Boer positions around Laing’s Nek. His force did not bring any artillery, so could only observe the Boer positions as they were out of rifle range.',
        lang: 'en',
        cite: { source: 'nam-transvaal-war', loc: { section: 'Transvaal War', para: '34' } },
        provenance: { via: 'web', at: '2026-10-07', url: 'https://www.nam.ac.uk/explore/transvaal-war' }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1881-03-06' },
            cites: [
              { source: 'nam-transvaal-war', loc: { section: 'Transvaal War', para: '40' } }
            ]
          }
        ]
      },
      quote: {
        id: 'q16',
        text: 'Major-General Sir Evelyn Wood (Colley\'s replacement) signed an armistice on 6 March 1881.',
        lang: 'en',
        cite: { source: 'nam-transvaal-war', loc: { section: 'Transvaal War', para: '40' } },
        provenance: { via: 'web', at: '2026-10-06', url: 'https://www.nam.ac.uk/explore/transvaal-war' }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1881-08-03' },
            cites: [
              { source: 'lemo-chronik-1881', loc: { section: 'Chronik 1881', para: '50' } },
              { source: 'lemo-chronik-1881', loc: { section: 'Chronik 1881', para: '51' } }
            ]
          }
        ]
      },
      quote: {
        id: 'q17',
        text: 'In der Konvention von Pretoria garantiert Großbritannien die Unabhängigkeit der 1877 annektierten Südafrikanischen Republik Transvaal unter der Oberhoheit der britischen Königin.',
        lang: 'de',
        cite: { source: 'lemo-chronik-1881', loc: { section: 'Chronik 1881', para: '51' } },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://www.dhm.de/lemo/jahreschronik/1881.html'
        }
      }
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/2/21/Melton_Prior_-_Illustrated_London_News_-_The_Transvaal_War_-_General_Sir_George_Colley_at_the_Battle_of_Majuba_Mountain_Just_Before_He_Was_Killed.jpg/1280px-Melton_Prior_-_Illustrated_London_News_-_The_Transvaal_War_-_General_Sir_George_Colley_at_the_Battle_of_Majuba_Mountain_Just_Before_He_Was_Killed.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Melton_Prior_-_Illustrated_London_News_-_The_Transvaal_War_-_General_Sir_George_Colley_at_the_Battle_of_Majuba_Mountain_Just_Before_He_Was_Killed.jpg',
    credit: { institution: 'Library of Congress', creator: 'Melton Prior' },
    license: { id: 'public-domain' }
  },
  furtherReading: [
    { source: 'laband-2005-the-transvaal-rebellion', perspective: 'african' }
  ]
})
