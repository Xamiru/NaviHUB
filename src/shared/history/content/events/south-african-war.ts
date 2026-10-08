import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'south-african-war',
  names: [
    { text: 'South African War', lang: 'en', role: 'primary' },
    { text: 'Boer War', lang: 'en', role: 'alternative' },
    {
      text: 'Second War of Independence',
      lang: 'en',
      role: 'contested',
      usedBy: [
        { kind: 'public', name: 'Afrikaners' }
      ],
      cites: [
        {
          source: 'loc-south-africa-country-study-1996',
          loc: { section: 'British Imperialism and the Afrikaners', para: '16' }
        }
      ]
    }
  ],
  researched: '2026-10-08',
  type: 'war',
  start: {
    alts: [
      {
        value: { d: '1899-10-11' },
        cites: [
          { source: 'nam-boer-war', loc: { section: 'Boer War', para: '41' } }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1902-05-21' },
        cites: [
          {
            source: 'loc-south-africa-country-study-1996',
            loc: { section: 'British Imperialism and the Afrikaners', para: '9' }
          }
        ],
        heldBy: [
          { kind: 'organization', name: 'Library of Congress Federal Research Division' }
        ]
      },
      {
        value: { d: '1902-05-31' },
        cites: [
          { source: 'nam-boer-war', loc: { section: 'Boer War', para: '238' } }
        ],
        heldBy: [
          { kind: 'organization', name: 'National Army Museum' }
        ]
      }
    ]
  },
  regions: ['subsaharan-africa', 'europe'],
  prominence: 1,
  polities: [
    { ref: 'polity:british-empire' }
  ],
  related: [
    { ref: 'event:first-boer-war', rel: 'preceded-by' }
  ],
  sides: [
    {
      key: 'british',
      name: 'British',
      polity: 'polity:united-kingdom',
      cites: [
        {
          source: 'loc-south-africa-country-study-1996',
          loc: { section: 'British Imperialism and the Afrikaners', para: '8' }
        }
      ]
    },
    {
      key: 'afrikaners',
      name: 'Afrikaners',
      cites: [
        {
          source: 'loc-south-africa-country-study-1996',
          loc: { section: 'British Imperialism and the Afrikaners', para: '8' }
        }
      ]
    }
  ],
  figures: [
    {
      key: 'combatants',
      side: 'afrikaners',
      value: {
        alts: [
          {
            value: { min: 90000 },
            cites: [
              {
                source: 'loc-south-africa-country-study-1996',
                loc: { section: 'British Imperialism and the Afrikaners', para: '8' }
              }
            ],
            heldBy: [
              { kind: 'organization', name: 'Library of Congress Federal Research Division' }
            ]
          },
          {
            value: { min: 88000 },
            cites: [
              { source: 'nam-boer-war', loc: { section: 'Boer War', para: '68' } }
            ],
            heldBy: [
              { kind: 'organization', name: 'National Army Museum' }
            ]
          }
        ]
      }
    },
    {
      key: 'combatants',
      side: 'british',
      value: {
        alts: [
          {
            value: { min: 500000, qualifier: 'nearly' },
            cites: [
              {
                source: 'loc-south-africa-country-study-1996',
                loc: { section: 'British Imperialism and the Afrikaners', para: '8' }
              }
            ],
            heldBy: [
              { kind: 'organization', name: 'Library of Congress Federal Research Division' }
            ]
          },
          {
            value: { min: 400000, qualifier: 'over' },
            cites: [
              { source: 'nam-boer-war', loc: { section: 'Boer War', para: '74' } }
            ],
            heldBy: [
              { kind: 'organization', name: 'National Army Museum' }
            ]
          }
        ]
      }
    },
    {
      key: 'civilian-deaths',
      side: 'afrikaners',
      value: {
        alts: [
          {
            value: { min: 25000, qualifier: 'over' },
            cites: [
              {
                source: 'loc-south-africa-country-study-1996',
                loc: { section: 'British Imperialism and the Afrikaners', para: '8' }
              }
            ],
            heldBy: [
              { kind: 'organization', name: 'Library of Congress Federal Research Division' }
            ]
          },
          {
            value: { min: 28000 },
            cites: [
              { source: 'nam-boer-war', loc: { section: 'Boer War', para: '210' } }
            ],
            heldBy: [
              { kind: 'organization', name: 'National Army Museum' }
            ]
          }
        ]
      }
    },
    {
      key: 'military-deaths',
      side: 'british',
      value: {
        alts: [
          {
            value: { min: 22000 },
            cites: [
              { source: 'nam-boer-war', loc: { section: 'Boer War', para: '276' } }
            ]
          }
        ]
      }
    },
    {
      key: 'casualties',
      side: 'british',
      value: {
        alts: [
          {
            value: { min: 120000, qualifier: 'over' },
            cites: [
              { source: 'nam-boer-war', loc: { section: 'Boer War', para: '276' } }
            ]
          }
        ]
      }
    }
  ],
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'The South African War (1899-1902), fought by the British to establish their hegemony in South Africa and by the Afrikaners to defend their autonomy, lasted three years and caused enormous suffering.',
          lang: 'en',
          cite: {
            source: 'loc-south-africa-country-study-1996',
            loc: { section: 'British Imperialism and the Afrikaners', para: '8' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/south-africa/16.htm' }
        },
        {
          id: 'q2',
          text: 'Ninety thousand Afrikaners fought against a British army that eventually approached 500,000 men, most from Britain but including large numbers of volunteers also from Australia, New Zealand, and Canada.',
          lang: 'en',
          cite: {
            source: 'loc-south-africa-country-study-1996',
            loc: { section: 'British Imperialism and the Afrikaners', para: '8' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/south-africa/16.htm' }
        },
        {
          id: 'q3',
          text: 'Approximately 30,000 Africans were also employed as soldiers by the British, while thousands more labored as transport workers.',
          lang: 'en',
          cite: {
            source: 'loc-south-africa-country-study-1996',
            loc: { section: 'British Imperialism and the Afrikaners', para: '8' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/south-africa/16.htm' }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q9',
          text: 'The origins of the Boer War lay in Britain\'s desire to unite, or confederate, the British South African territories of the Cape Colony and Natal with the Boer republics of the Orange Free State and the South African Republic (also known as the Transvaal).',
          lang: 'en',
          cite: { source: 'nam-boer-war', loc: { section: 'Boer War', para: '7' } },
          provenance: { via: 'web', at: '2026-10-07', url: 'https://www.nam.ac.uk/explore/boer-war' }
        },
        {
          id: 'q10',
          text: 'The arrival of a large influx of English-speaking people attracted by the goldfields - known as Uitlanders (literally \'Outlanders\') by the Afrikaners - was a major worry for the Boers, who saw them as a threat to their way of life.',
          lang: 'en',
          cite: { source: 'nam-boer-war', loc: { section: 'Boer War', para: '11' } },
          provenance: { via: 'web', at: '2026-10-07', url: 'https://www.nam.ac.uk/explore/boer-war' }
        },
        {
          id: 'q11',
          text: 'The following year, Kruger offered an extension of the franchise to the Uitlanders in return for British agreement not to interfere in the SAR\'s internal affairs. He also demanded that Britain drop its claim to rule the SAR and allow external arbitration of other unresolved disputes between the two governments. However, Chamberlain rejected Kruger\'s proposals, confident that the Boers could be quickly defeated.',
          lang: 'en',
          cite: { source: 'nam-boer-war', loc: { section: 'Boer War', para: '24' } },
          provenance: { via: 'web', at: '2026-10-07', url: 'https://www.nam.ac.uk/explore/boer-war' }
        }
      ]
    },
    {
      kind: 'casualties',
      quotes: [
        {
          id: 'q19',
          text: 'Accommodation in the camps was poor. Water and food were in short supply, and medical and sanitary facilities almost non-existent. Sickness became widespread. In all, 28,000 Boers, mainly women and children, died in the camps. Around half that number of black Africans died in separate camps.',
          lang: 'en',
          cite: { source: 'nam-boer-war', loc: { section: 'Boer War', para: '210' } },
          provenance: { via: 'web', at: '2026-10-07', url: 'https://www.nam.ac.uk/explore/boer-war' }
        },
        {
          id: 'q20',
          text: 'The war mobilised the resources of the British Empire and cost the British government £210 million (over £25 billion today). It resulted in more than 120,000 British and Imperial casualties, including 22,000 dead. Two thirds of the deaths were caused by disease and inadequate medical provision.',
          lang: 'en',
          cite: { source: 'nam-boer-war', loc: { section: 'Boer War', para: '276' } },
          provenance: { via: 'web', at: '2026-10-07', url: 'https://www.nam.ac.uk/explore/boer-war' }
        }
      ]
    },
    {
      kind: 'aftermath',
      quotes: [
        {
          id: 'q6',
          text: 'Peace was finally concluded at the town of Vereeniging on May 21, 1902. Milner, who drew up the terms, intended that Afrikaner power should be broken forever. He required that the Boers hand over all their arms and agree to the incorporation of their territories into the British empire as the Orange River Colony and the Transvaal.',
          lang: 'en',
          cite: {
            source: 'loc-south-africa-country-study-1996',
            loc: { section: 'British Imperialism and the Afrikaners', para: '9' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/south-africa/16.htm' }
        },
        {
          id: 'q7',
          text: 'Indeed, Afrikaners, already imbued with a sense of collective suffering by their nineteenth-century experiences at the hands of British imperialists, were even more united after the South African War (which they termed the Second War of Independence).',
          lang: 'en',
          cite: {
            source: 'loc-south-africa-country-study-1996',
            loc: { section: 'British Imperialism and the Afrikaners', para: '16' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/south-africa/16.htm' }
        },
        {
          id: 'q8',
          text: 'The greatest blow to Milner\'s plans, however, came in 1905 with the victory of the Liberal Party in the British general election and the formation of a government led by men who had opposed the scorched-earth policy in the South African War as no more than "methods of barbarism."',
          lang: 'en',
          cite: {
            source: 'loc-south-africa-country-study-1996',
            loc: { section: 'British Imperialism and the Afrikaners', para: '16' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/south-africa/16.htm' }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q21',
          text: 'The Boer republics were fully integrated into the Union of South Africa in 1910.',
          lang: 'en',
          cite: { source: 'nam-boer-war', loc: { section: 'Boer War', para: '223' } },
          provenance: { via: 'web', at: '2026-10-07', url: 'https://www.nam.ac.uk/explore/boer-war' }
        },
        {
          id: 'q22',
          text: 'Reforms in tactics, equipment and administration were introduced in the years after the conflict. These changes meant that when the Army marched to war in 1914, it was the best equipped and trained force ever to leave British shores.',
          lang: 'en',
          cite: { source: 'nam-boer-war', loc: { section: 'Boer War', para: '283' } },
          provenance: { via: 'web', at: '2026-10-07', url: 'https://www.nam.ac.uk/explore/boer-war' }
        }
      ]
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/8/88/Battle_of_Belmont%2C_Boer_War_-_Kurz_%26_Allison.jpg/1280px-Battle_of_Belmont%2C_Boer_War_-_Kurz_%26_Allison.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Battle_of_Belmont,_Boer_War_-_Kurz_%26_Allison.jpg',
    credit: { institution: 'Library of Congress', creator: 'Kurz & Allison' },
    license: { id: 'public-domain' }
  },
  course: [
    {
      date: {
        alts: [
          {
            value: { d: '1899-10-12' },
            cites: [
              { source: 'nam-boer-war', loc: { section: 'Boer War', para: '29' } }
            ]
          }
        ]
      },
      quote: {
        id: 'q12',
        text: 'On 9 October, the SAR issued an ultimatum demanding the withdrawal not only of British troops from their borders, but of all reinforcements sent to South Africa since 1 June 1899. When this was rejected, the allied republics invaded the Cape Colony and Natal on 12 October.',
        lang: 'en',
        cite: { source: 'nam-boer-war', loc: { section: 'Boer War', para: '29' } },
        provenance: { via: 'web', at: '2026-10-07', url: 'https://www.nam.ac.uk/explore/boer-war' }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1899-12' },
            cites: [
              { source: 'nam-boer-war', loc: { section: 'Boer War', para: '33' } }
            ]
          }
        ]
      },
      quote: {
        id: 'q13',
        text: 'The Boers soon laid siege to the towns of Kimberley, Mafeking and Ladysmith and, in December 1899, defeated British attempts to relieve them in the battles of Stormberg, Magersfontein and Colenso.',
        lang: 'en',
        cite: { source: 'nam-boer-war', loc: { section: 'Boer War', para: '33' } },
        provenance: { via: 'web', at: '2026-10-07', url: 'https://www.nam.ac.uk/explore/boer-war' }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1900' },
            cites: [
              {
                source: 'loc-south-africa-country-study-1996',
                loc: { section: 'British Imperialism and the Afrikaners', para: '8' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q4',
        text: 'Kruger\'s forces, taking advantage of initial superiority in numbers (before the British regulars arrived) and of surprise, won a number of victories at the beginning of the war. In 1900, however, British forces overwhelmed the Boers, took Bloemfontein (capital of the Orange Free State), Johannesburg, and Pretoria (capital of the South African Republic), and forced Kruger into exile.',
        lang: 'en',
        cite: {
          source: 'loc-south-africa-country-study-1996',
          loc: { section: 'British Imperialism and the Afrikaners', para: '8' }
        },
        provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/south-africa/16.htm' }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1900-02-15' },
            cites: [
              { source: 'nam-boer-war', loc: { section: 'Boer War', para: '103' } }
            ]
          }
        ]
      },
      quote: {
        id: 'q14',
        text: 'After a four-month siege, Kimberley was relieved on 15 February 1900, when a patrol of the Australian Horse from Lieutenant-General John French\'s Cavalry Division entered the town.',
        lang: 'en',
        cite: { source: 'nam-boer-war', loc: { section: 'Boer War', para: '103' } },
        provenance: { via: 'web', at: '2026-10-07', url: 'https://www.nam.ac.uk/explore/boer-war' }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1900-11' },
            cites: [
              { source: 'nam-boer-war', loc: { section: 'Boer War', para: '188' } }
            ]
          }
        ]
      },
      quote: {
        id: 'q17',
        text: 'The British also confined Boer families and black Africans in a network of concentration camps. As well as removing a means of support for the guerrillas, it was believed the presence of Boer families in the camps would make soldiers in the field surrender.',
        lang: 'en',
        cite: { source: 'nam-boer-war', loc: { section: 'Boer War', para: '209' } },
        provenance: { via: 'web', at: '2026-10-07', url: 'https://www.nam.ac.uk/explore/boer-war' }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1901', notAfter: '1902' },
            cites: [
              {
                source: 'loc-south-africa-country-study-1996',
                loc: { section: 'British Imperialism and the Afrikaners', para: '8' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q5',
        text: 'Resistance continued, however, in the countryside, where the Boers fought a ferocious guerrilla war. The British ultimately succeeded in breaking this resistance, but only by adopting a scorched-earth policy. In 1901 and 1902, the British torched more than 30,000 farms in the South African Republic and the Orange Free State and placed all the Afrikaner women and children in concentration camps, where, because of overcrowding and unsanitary conditions, more than 25,000 perished.',
        lang: 'en',
        cite: {
          source: 'loc-south-africa-country-study-1996',
          loc: { section: 'British Imperialism and the Afrikaners', para: '8' }
        },
        provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/south-africa/16.htm' }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1902-05-31' },
            cites: [
              { source: 'nam-boer-war', loc: { section: 'Boer War', para: '223' } }
            ]
          }
        ]
      },
      quote: {
        id: 'q18',
        text: 'On 31 May 1902, the Treaty of Vereeniging was signed and the Boers accepted British sovereignty but with limited self-government.',
        lang: 'en',
        cite: { source: 'nam-boer-war', loc: { section: 'Boer War', para: '223' } },
        provenance: { via: 'web', at: '2026-10-07', url: 'https://www.nam.ac.uk/explore/boer-war' }
      }
    }
  ],
  participants: [
    {
      name: 'Paul Kruger',
      role: 'head-of-state',
      side: 'afrikaners',
      cites: [
        { source: 'nam-boer-war', loc: { section: 'Boer War', para: '22' } }
      ]
    },
    {
      name: 'Joseph Chamberlain',
      role: 'leader',
      side: 'british',
      cites: [
        { source: 'nam-boer-war', loc: { section: 'Boer War', para: '16' } }
      ]
    },
    {
      name: 'Sir Alfred Milner',
      role: 'leader',
      side: 'british',
      cites: [
        { source: 'nam-boer-war', loc: { section: 'Boer War', para: '16' } }
      ]
    },
    {
      name: 'Sir Redvers Buller',
      role: 'commander',
      side: 'british',
      cites: [
        { source: 'nam-boer-war', loc: { section: 'Boer War', para: '114' } }
      ]
    },
    {
      name: 'Lord Roberts',
      role: 'commander',
      side: 'british',
      cites: [
        { source: 'nam-boer-war', loc: { section: 'Boer War', para: '102' } }
      ]
    },
    {
      name: 'Lord Kitchener',
      role: 'commander',
      side: 'british',
      cites: [
        { source: 'nam-boer-war', loc: { section: 'Boer War', para: '216' } }
      ]
    },
    {
      name: 'Louis Botha',
      role: 'commander',
      side: 'afrikaners',
      cites: [
        { source: 'nam-boer-war', loc: { section: 'Boer War', para: '68' } }
      ]
    },
    {
      name: 'Jan Smuts',
      role: 'commander',
      side: 'afrikaners',
      cites: [
        { source: 'nam-boer-war', loc: { section: 'Boer War', para: '68' } }
      ]
    },
    {
      name: 'Christiaan de Wet',
      role: 'commander',
      side: 'afrikaners',
      cites: [
        { source: 'nam-boer-war', loc: { section: 'Boer War', para: '68' } }
      ]
    },
    {
      name: 'Robert Baden-Powell',
      role: 'commander',
      side: 'british',
      cites: [
        { source: 'nam-boer-war', loc: { section: 'Boer War', para: '137' } }
      ]
    },
    {
      name: 'Emily Hobhouse',
      role: 'participant',
      cites: [
        { source: 'nam-boer-war', loc: { section: 'Boer War', para: '214' } }
      ]
    },
    {
      ref: 'person:winston-churchill',
      role: 'journalist',
      cites: [
        { source: 'nam-boer-war', loc: { section: 'Boer War', para: '253' } }
      ]
    }
  ],
  places: [
    {
      ref: 'place:kimberley',
      cites: [
        { source: 'nam-boer-war', loc: { section: 'Boer War', para: '103' } }
      ]
    },
    {
      ref: 'place:ladysmith',
      cites: [
        { source: 'nam-boer-war', loc: { section: 'Boer War', para: '107' } }
      ]
    },
    {
      ref: 'place:mafeking',
      cites: [
        { source: 'nam-boer-war', loc: { section: 'Boer War', para: '145' } }
      ]
    },
    {
      ref: 'place:pretoria',
      cites: [
        { source: 'nam-boer-war', loc: { section: 'Boer War', para: '150' } }
      ]
    },
    {
      ref: 'place:vereeniging',
      cites: [
        { source: 'nam-boer-war', loc: { section: 'Boer War', para: '223' } }
      ]
    }
  ],
  furtherReading: [
    {
      source: 'breytenbach-1978-die-geskiedenis-van-die-tweede-vryheidsoorlog',
      perspective: 'african'
    },
    { source: 'pretorius-1991-kommandolewe', perspective: 'african' },
    { source: 'nasson-1999-the-south-african-war', perspective: 'african' }
  ]
})
