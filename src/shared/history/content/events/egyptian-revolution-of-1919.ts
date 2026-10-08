import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'egyptian-revolution-of-1919',
  names: [
    { text: 'Egyptian Revolution of 1919', lang: 'en', role: 'primary' },
    { text: 'ثورة 1919', lang: 'ar', role: 'native' },
    {
      text: '1919 Revolution',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'loc-egypt-country-study-1990',
          loc: { section: 'Egypt under the Protectorate and the 1919 Revolution', para: '1' }
        }
      ]
    }
  ],
  researched: '2026-10-08',
  type: 'revolution',
  start: {
    alts: [
      {
        value: { d: '1919-03-12' },
        cites: [
          {
            source: 'eo1418-rose-egypt',
            loc: { section: 'Increased Disease Rates and Neglect of Public Health', para: '5' }
          }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1919-04' },
        cites: [
          {
            source: 'loc-egypt-country-study-1990',
            loc: { section: 'Egypt under the Protectorate and the 1919 Revolution', para: '3' }
          }
        ],
        heldBy: [
          { kind: 'organization', name: 'Library of Congress, Federal Research Division' }
        ]
      },
      {
        value: { d: '1922' },
        cites: [
          {
            source: 'eo1418-sharp-paris-peace-conference',
            loc: { section: 'National Self-Determination', para: '2' }
          }
        ],
        heldBy: [
          { kind: 'scholar', name: 'Alan Sharp' }
        ]
      }
    ]
  },
  regions: ['mena'],
  prominence: 2,
  places: [
    {
      ref: 'place:cairo',
      cites: [
        {
          source: 'loc-egypt-country-study-1990',
          loc: { section: 'Egypt under the Protectorate and the 1919 Revolution', para: '3' }
        }
      ]
    }
  ],
  sides: [
    {
      key: 'egyptians',
      name: 'Egyptians',
      cites: [
        {
          source: 'loc-egypt-country-study-1990',
          loc: { section: 'Egypt under the Protectorate and the 1919 Revolution', para: '7' }
        }
      ]
    },
    {
      key: 'british',
      name: 'British soldiers',
      polity: 'polity:united-kingdom',
      cites: [
        {
          source: 'loc-egypt-country-study-1990',
          loc: { section: 'Egypt under the Protectorate and the 1919 Revolution', para: '7' }
        }
      ]
    },
    {
      key: 'europeans',
      name: 'Europeans',
      cites: [
        {
          source: 'loc-egypt-country-study-1990',
          loc: { section: 'Egypt under the Protectorate and the 1919 Revolution', para: '7' }
        }
      ]
    }
  ],
  participants: [
    {
      ref: 'person:saad-zaghlul',
      role: 'leader',
      cites: [
        {
          source: 'loc-egypt-country-study-1990',
          loc: { section: 'Egypt under the Protectorate and the 1919 Revolution', para: '3' }
        },
        {
          source: 'eo1418-rose-egypt',
          loc: { section: 'Increased Disease Rates and Neglect of Public Health', para: '5' }
        }
      ]
    },
    {
      name: 'Safia Zaghlul',
      role: 'leader',
      cites: [
        {
          source: 'loc-egypt-country-study-1990',
          loc: { section: 'Egypt under the Protectorate and the 1919 Revolution', para: '5' }
        }
      ]
    },
    {
      name: 'Huda Sharawi',
      role: 'organizer',
      cites: [
        {
          source: 'loc-egypt-country-study-1990',
          loc: { section: 'Egypt under the Protectorate and the 1919 Revolution', para: '5' }
        }
      ]
    },
    {
      name: 'Sir Reginald Wingate',
      role: 'diplomat',
      cites: [
        {
          source: 'loc-egypt-country-study-1990',
          loc: { section: 'Egypt under the Protectorate and the 1919 Revolution', para: '3' }
        }
      ]
    },
    {
      name: 'General Edmund Allenby',
      role: 'diplomat',
      cites: [
        {
          source: 'loc-egypt-country-study-1990',
          loc: { section: 'Egypt under the Protectorate and the 1919 Revolution', para: '9' }
        }
      ]
    }
  ],
  figures: [
    {
      key: 'deaths',
      side: 'egyptians',
      value: {
        alts: [
          {
            value: { min: 800, qualifier: 'over' },
            cites: [
              {
                source: 'loc-egypt-country-study-1990',
                loc: { section: 'Egypt under the Protectorate and the 1919 Revolution', para: '7' }
              },
              {
                source: 'eo1418-rose-egypt',
                loc: { section: 'Increased Disease Rates and Neglect of Public Health', para: '5' }
              }
            ],
            heldBy: [
              { kind: 'organization', name: 'Library of Congress, Federal Research Division' },
              { kind: 'scholar', name: 'Christopher S. Rose' }
            ]
          }
        ]
      }
    },
    {
      key: 'deaths',
      side: 'british',
      value: {
        alts: [
          {
            value: { min: 29 },
            cites: [
              {
                source: 'loc-egypt-country-study-1990',
                loc: { section: 'Egypt under the Protectorate and the 1919 Revolution', para: '7' }
              }
            ],
            heldBy: [
              { kind: 'organization', name: 'Library of Congress, Federal Research Division' }
            ]
          }
        ]
      }
    },
    {
      key: 'deaths',
      side: 'europeans',
      value: {
        alts: [
          {
            value: { min: 31 },
            cites: [
              {
                source: 'loc-egypt-country-study-1990',
                loc: { section: 'Egypt under the Protectorate and the 1919 Revolution', para: '7' }
              }
            ],
            heldBy: [
              { kind: 'organization', name: 'Library of Congress, Federal Research Division' }
            ]
          }
        ]
      }
    }
  ],
  related: [
    { ref: 'event:paris-peace-conference', rel: 'related' },
    { ref: 'event:urabi-revolt', rel: 'related' }
  ],
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q10',
          text: 'The strain on local agriculture and food resources resulted in widespread inflation, food scarcity, and increased disease, and the measures taken to deal with them resulted in widespread discontent with British rule that culminated in a national uprising which became known as the “Egyptian Revolution of 1919”.',
          lang: 'en',
          cite: { source: 'eo1418-rose-egypt', loc: { section: 'Egypt' } },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://encyclopedia.1914-1918-online.net/article/egypt/'
          }
        }
      ]
    },
    {
      kind: 'causes',
      quotes: [
        {
          id: 'q1',
          text: 'The immediate causes of what is known to Egyptians as the 1919 Revolution, however, were British actions during the war that caused widespread hardship and resentment.',
          lang: 'en',
          cite: {
            source: 'loc-egypt-country-study-1990',
            loc: { section: 'Egypt under the Protectorate and the 1919 Revolution', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/egypt/28.htm' }
        },
        {
          id: 'q2',
          text: 'In addition to their other reasons, the Egyptians were influenced by American president Woodrow Wilson, who was preaching self-determination for all nations.',
          lang: 'en',
          cite: {
            source: 'loc-egypt-country-study-1990',
            loc: { section: 'Egypt under the Protectorate and the 1919 Revolution', para: '2' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/egypt/28.htm' }
        }
      ]
    },
    {
      kind: 'course',
      quotes: [
        {
          id: 'q3',
          text: 'On March 16, between 150 and 300 upper-class Egyptian women in veils staged a demonstration against the British occupation, an event that marked the entrance of Egyptian women into public life.',
          lang: 'en',
          cite: {
            source: 'loc-egypt-country-study-1990',
            loc: { section: 'Egypt under the Protectorate and the 1919 Revolution', para: '5' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/egypt/28.htm' }
        },
        {
          id: 'q4',
          text: 'By the summer of 1919, more than 800 Egyptians had been killed, as well as 31 Europeans and 29 British soldiers.',
          lang: 'en',
          cite: {
            source: 'loc-egypt-country-study-1990',
            loc: { section: 'Egypt under the Protectorate and the 1919 Revolution', para: '7' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/egypt/28.htm' }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q5',
          text: 'On February 28, 1922, Britain unilaterally declared Egyptian independence without any negotiations with Egypt.',
          lang: 'en',
          cite: {
            source: 'loc-egypt-country-study-1990',
            loc: { section: 'Egypt under the Protectorate and the 1919 Revolution', para: '13' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/egypt/28.htm' }
        }
      ]
    }
  ],
  course: [
    {
      date: {
        alts: [
          {
            value: { d: '1918-11-13' },
            cites: [
              {
                source: 'loc-egypt-country-study-1990',
                loc: { section: 'Egypt under the Protectorate and the 1919 Revolution', para: '3' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q6',
        text: 'On November 13, 1918, thereafter celebrated in Egypt as Yawm al Jihad (Day of Struggle), Zaghlul, Fahmi, and Sharawi had an audience with Sir Reginald Wingate, the British high commissioner.',
        lang: 'en',
        cite: {
          source: 'loc-egypt-country-study-1990',
          loc: { section: 'Egypt under the Protectorate and the 1919 Revolution', para: '3' }
        },
        provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/egypt/28.htm' }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1919-03-08' },
            cites: [
              {
                source: 'loc-egypt-country-study-1990',
                loc: { section: 'Egypt under the Protectorate and the 1919 Revolution', para: '3' }
              },
              {
                source: 'eo1418-rose-egypt',
                loc: { section: 'Increased Disease Rates and Neglect of Public Health', para: '5' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q7',
        text: 'On March 8, Zaghlul and three other members of the Wafd were arrested and thrown into Qasr an Nil prison. The next day, they were deported to Malta, an action that sparked the popular uprising of MarchApril 1919 in which Egyptians of all social classes participated.',
        lang: 'en',
        cite: {
          source: 'loc-egypt-country-study-1990',
          loc: { section: 'Egypt under the Protectorate and the 1919 Revolution', para: '3' }
        },
        provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/egypt/28.htm' }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1919-03-12' },
            cites: [
              {
                source: 'eo1418-rose-egypt',
                loc: { section: 'Increased Disease Rates and Neglect of Public Health', para: '5' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q8',
        text: 'Beginning on 12 March, widespread protests and demonstrations, many of which turned violent, broke out across Egypt. Over the next two weeks, at least 800 people were killed, many villages burned, large rural estates looted, and railway and telegraph stations and lines burned and cut by mobs.',
        lang: 'en',
        cite: {
          source: 'eo1418-rose-egypt',
          loc: { section: 'Increased Disease Rates and Neglect of Public Health', para: '5' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://encyclopedia.1914-1918-online.net/article/egypt/'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1919-04-07' },
            cites: [
              {
                source: 'loc-egypt-country-study-1990',
                loc: { section: 'Egypt under the Protectorate and the 1919 Revolution', para: '9' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q9',
        text: 'On April 7, Zaghlul and his colleagues were released and set out for Paris.',
        lang: 'en',
        cite: {
          source: 'loc-egypt-country-study-1990',
          loc: { section: 'Egypt under the Protectorate and the 1919 Revolution', para: '9' }
        },
        provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/egypt/28.htm' }
      }
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/1/15/Zaghlul_Pacha_-_btv1b53119930j.jpg/1280px-Zaghlul_Pacha_-_btv1b53119930j.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Zaghlul_Pacha_-_btv1b53119930j.jpg',
    credit: { institution: 'Bibliothèque nationale de France', creator: 'Agence Rol' },
    license: { id: 'public-domain' }
  },
  furtherReading: [
    { source: 'rafii-1946-thawrat-sanat-1919', perspective: 'arab' }
  ]
})
