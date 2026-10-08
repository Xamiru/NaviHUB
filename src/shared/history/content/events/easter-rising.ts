import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'easter-rising',
  names: [
    { text: 'Easter Rising', lang: 'en', role: 'primary' },
    { text: 'Éirí Amach na Cásca', lang: 'ga', role: 'native' }
  ],
  researched: '2026-10-08',
  type: 'uprising',
  start: {
    alts: [
      {
        value: { d: '1916-04-24' },
        cites: [
          {
            source: 'eo1418-mcgarry-easter-rising',
            loc: { section: 'Introduction', para: '1' }
          }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1916-04-29', notAfter: '1916-04-30' },
        cites: [
          {
            source: 'eo1418-mcgarry-easter-rising',
            loc: { section: 'The Battle for Dublin', para: '2' }
          }
        ]
      }
    ]
  },
  regions: ['europe'],
  prominence: 2,
  places: [
    {
      ref: 'place:dublin',
      cites: [
        { source: 'eo1418-mcgarry-easter-rising', loc: { section: 'Introduction', para: '1' } }
      ]
    }
  ],
  sides: [
    {
      key: 'rebels',
      name: 'Irish separatists',
      cites: [
        { source: 'eo1418-mcgarry-easter-rising', loc: { section: 'Introduction', para: '1' } }
      ]
    },
    {
      key: 'british',
      name: 'British troops',
      polity: 'polity:united-kingdom',
      cites: [
        { source: 'eo1418-mcgarry-easter-rising', loc: { section: 'Introduction', para: '1' } }
      ]
    }
  ],
  participants: [
    {
      ref: 'person:patrick-pearse',
      role: 'leader',
      side: 'rebels',
      cites: [
        {
          source: 'eo1418-mcgarry-easter-rising',
          loc: { section: 'Rationale and Ideology', para: '4' }
        }
      ]
    },
    {
      name: 'Tom Clarke',
      role: 'organizer',
      side: 'rebels',
      cites: [
        {
          source: 'eo1418-mcgarry-easter-rising',
          loc: { section: 'Rationale and Ideology', para: '1' }
        }
      ]
    },
    {
      name: 'Seán MacDermott',
      role: 'organizer',
      side: 'rebels',
      cites: [
        {
          source: 'eo1418-mcgarry-easter-rising',
          loc: { section: 'Rationale and Ideology', para: '1' }
        }
      ]
    },
    {
      name: 'Eamonn Ceannt',
      role: 'signatory',
      side: 'rebels',
      cites: [
        {
          source: 'eo1418-mcgarry-easter-rising',
          loc: { section: 'Rationale and Ideology', para: '4' }
        }
      ]
    },
    {
      name: 'General Sir John Maxwell',
      role: 'commander',
      side: 'british',
      cites: [
        {
          source: 'eo1418-mcgarry-easter-rising',
          loc: { section: 'The Battle for Dublin', para: '8' }
        }
      ]
    }
  ],
  figures: [
    {
      key: 'deaths',
      value: {
        alts: [
          {
            value: { min: 500, qualifier: 'nearly' },
            cites: [
              {
                source: 'eo1418-mcgarry-easter-rising',
                loc: { section: 'Introduction', para: '1' }
              }
            ],
            heldBy: [
              { kind: 'scholar', name: 'Fearghal McGarry' }
            ]
          }
        ]
      }
    },
    {
      key: 'executed',
      value: {
        alts: [
          {
            value: { min: 15 },
            cites: [
              {
                source: 'eo1418-mcgarry-easter-rising',
                loc: { section: 'Introduction', para: '1' }
              }
            ],
            heldBy: [
              { kind: 'scholar', name: 'Fearghal McGarry' }
            ]
          }
        ]
      }
    },
    {
      key: 'prisoners',
      value: {
        alts: [
          {
            value: { min: 3000, qualifier: 'over' },
            cites: [
              {
                source: 'eo1418-mcgarry-easter-rising',
                loc: { section: 'Introduction', para: '1' }
              }
            ],
            heldBy: [
              { kind: 'scholar', name: 'Fearghal McGarry' }
            ]
          }
        ]
      }
    }
  ],
  related: [
    { ref: 'event:first-world-war', rel: 'related' }
  ],
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'On Easter Monday, 24 April 1916, over 1,000 poorly-armed Irish separatists occupied prominent buildings across the centre of Dublin, triggering a week-long battle for what was then one of the major cities of the United Kingdom.',
          lang: 'en',
          cite: {
            source: 'eo1418-mcgarry-easter-rising',
            loc: { section: 'Introduction', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://encyclopedia.1914-1918-online.net/article/easter-rising-great-britain-and-ireland/'
          }
        },
        {
          id: 'q2',
          text: 'Although a military failure, the 1916 rebellion transformed Ireland by destroying the possibility of a political settlement between Irish nationalists and the British state and by popularising a republican movement prepared to use violence to achieve independence.',
          lang: 'en',
          cite: {
            source: 'eo1418-mcgarry-easter-rising',
            loc: { section: 'Easter Rising (Great Britain and Ireland)' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://encyclopedia.1914-1918-online.net/article/easter-rising-great-britain-and-ireland/'
          }
        }
      ]
    },
    {
      kind: 'course',
      quotes: [
        {
          id: 'q3',
          text: 'Confronted by over 20,000 British troops, many of Irish nationality, the rebels had no chance of military success. The rebellion ended in six days, leaving almost 500 dead and much of the city centre in ruins. In response, the British authorities executed fifteen of the ringleaders and arrested over 3,000 suspects.',
          lang: 'en',
          cite: {
            source: 'eo1418-mcgarry-easter-rising',
            loc: { section: 'Introduction', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://encyclopedia.1914-1918-online.net/article/easter-rising-great-britain-and-ireland/'
          }
        },
        {
          id: 'q4',
          text: 'The importance of the former dimension of the rebellion was most clearly grasped by Patrick Pearse whose proclamation of an Irish republic on Easter Monday provided – for posterity if not the bemused onlookers who witnessed the event – the defining moment of Easter week.',
          lang: 'en',
          cite: {
            source: 'eo1418-mcgarry-easter-rising',
            loc: { section: 'The Battle for Dublin', para: '3' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://encyclopedia.1914-1918-online.net/article/easter-rising-great-britain-and-ireland/'
          }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q5',
          text: 'Although rebels were jeered, spat at and even attacked by Dubliners during the surrender, particularly in working-class neighbourhoods with high rates of army enlistment, public opinion shifted as the ringleaders were executed between 3 and 12 May.',
          lang: 'en',
          cite: { source: 'eo1418-mcgarry-easter-rising', loc: { section: 'Conclusion', para: '1' } },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://encyclopedia.1914-1918-online.net/article/easter-rising-great-britain-and-ireland/'
          }
        },
        {
          id: 'q6',
          text: 'The most important consequence of 1916 was its impact on Irish nationalism. The Rising brought the revolutionary tradition from the margins to the centre of Irish politics, reviving insurrection as a viable strategy.',
          lang: 'en',
          cite: { source: 'eo1418-mcgarry-easter-rising', loc: { section: 'Conclusion', para: '8' } },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://encyclopedia.1914-1918-online.net/article/easter-rising-great-britain-and-ireland/'
          }
        }
      ]
    },
    {
      kind: 'memory',
      quotes: [
        {
          id: 'q7',
          text: 'Despite controversies about the morality and legacy of the rebels’ actions, the Easter Rising is remembered as the pivotal event in the struggle for Irish independence.',
          lang: 'en',
          cite: {
            source: 'eo1418-mcgarry-easter-rising',
            loc: { section: 'Introduction', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://encyclopedia.1914-1918-online.net/article/easter-rising-great-britain-and-ireland/'
          }
        }
      ]
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/4/43/Sackville_Street_in_Ruins_P6129.jpg/1280px-Sackville_Street_in_Ruins_P6129.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Sackville_Street_in_Ruins_P6129.jpg',
    credit: { institution: 'National Gallery of Ireland', creator: 'Edmond Delrenne' },
    license: { id: 'public-domain' }
  },
  furtherReading: [
    { source: 'martin-1967-leaders-and-men-of-the-easter-rising', perspective: 'european' },
    { source: 'mcgarry-2010-the-rising', perspective: 'european' }
  ]
})
