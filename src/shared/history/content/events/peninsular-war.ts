import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'peninsular-war',
  names: [
    { text: 'Peninsular War', lang: 'en', role: 'primary' },
    {
      text: 'War of Independence',
      lang: 'en',
      role: 'alternative',
      usedBy: [
        { kind: 'school', name: 'Spanish historiography' }
      ],
      cites: [
        {
          source: 'loc-spain-country-study-1988',
          loc: { section: 'The Napoleonic Era', para: '2' }
        }
      ]
    }
  ],
  researched: '2026-10-06',
  type: 'war',
  start: {
    alts: [
      {
        value: { d: '1808' },
        cites: [
          {
            source: 'loc-spain-country-study-1988',
            loc: { section: 'The Napoleonic Era', para: '2' }
          }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1814' },
        cites: [
          {
            source: 'loc-spain-country-study-1988',
            loc: { section: 'The Napoleonic Era', para: '2' }
          }
        ]
      }
    ]
  },
  regions: ['europe'],
  prominence: 2,
  places: [
    { ref: 'place:madrid' }
  ],
  partOf: [
    { ref: 'period:napoleonic-wars' }
  ],
  participants: [
    {
      ref: 'person:napoleon-bonaparte',
      role: 'commander',
      cites: [
        {
          source: 'fondation-napoleon-timeline-consulate-first-empire',
          loc: { section: 'Timeline: Consulate/1st French Empire, 1808 – THE SPANISH CAMPAIGN' }
        }
      ]
    },
    {
      name: 'Joseph Bonaparte',
      role: 'head-of-state',
      cites: [
        {
          source: 'loc-spain-country-study-1988',
          loc: { section: 'The Napoleonic Era', para: '1' }
        }
      ]
    },
    {
      name: 'Arthur Wellesley',
      role: 'commander',
      cites: [
        {
          source: 'loc-spain-country-study-1988',
          loc: { section: 'The Napoleonic Era', para: '3' }
        }
      ]
    }
  ],
  related: [
    {
      ref: 'event:la-paz-revolution-of-1809',
      rel: 'contributed-to',
      cites: [
        {
          source: 'loc-bolivia-country-study-1989',
          loc: { section: 'INDEPENDENCE FROM SPAIN, 1809-39: Struggle for Independence', para: '1' }
        }
      ]
    }
  ],
  sections: [
    {
      kind: 'background',
      quotes: [
        {
          id: 'q1',
          text: 'Military reverses and economic misery caused a popular uprising in March 1808 that forced the desmissal of Godoy and the abdiction of Charles IV. The king was succeeded by his son, Ferdinand VII (r. 1808; 1814-33). The French forced Ferdinand to abdicate almost immediately, however, and Joseph Bonaparte, Napoleon\'s brother, was named king of Spain.',
          lang: 'en',
          cite: {
            source: 'loc-spain-country-study-1988',
            loc: { section: 'The Napoleonic Era', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/spain/13.htm' }
        }
      ]
    },
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q2',
          text: 'The War of Independence (1808-14), as the Iberian phase of the Napoleonic wars is known in Spanish historiography, attained the status of a popular crusade that united all classes, parties, and regions in a common struggle. It was a war fought without rules or regular battlelines.',
          lang: 'en',
          cite: {
            source: 'loc-spain-country-study-1988',
            loc: { section: 'The Napoleonic Era', para: '2' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/spain/13.htm' }
        },
        {
          id: 'q3',
          text: 'French occupation eventually sparked rebellions among the populace, and provisional juntas were organized in several cities.',
          lang: 'en',
          cite: {
            source: 'loc-portugal-country-study-1993',
            loc: { section: 'Peninsular Wars', para: '5' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/portugal/33.htm' }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q4',
          text: 'The conflict, a real war of independence for the Spanish, also contributed to the weakening of the Napoleonic army and served to demonstrate to the whole of Europe that it was no longer invincible.',
          lang: 'en',
          cite: {
            source: 'fondation-napoleon-timeline-consulate-first-empire',
            loc: { section: 'Timeline: Consulate/1st French Empire, 1808 – THE SPANISH CAMPAIGN' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.napoleon.org/en/young-historians/napodoc/timeline-consulate1st-french-empire/'
          }
        }
      ]
    }
  ],
  course: [
    {
      date: {
        alts: [
          {
            value: { d: '1808-05-02' },
            cites: [
              {
                source: 'fondation-napoleon-timeline-consulate-first-empire',
                loc: {
                  section: 'Timeline: Consulate/1st French Empire, 1808 – THE SPANISH CAMPAIGN'
                }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q5',
        text: 'The new king was poorly received by the people in Madrid and there was an uprising on 2 May.',
        lang: 'en',
        cite: {
          source: 'fondation-napoleon-timeline-consulate-first-empire',
          loc: { section: 'Timeline: Consulate/1st French Empire, 1808 – THE SPANISH CAMPAIGN' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://www.napoleon.org/en/young-historians/napodoc/timeline-consulate1st-french-empire/'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1808-08-21' },
            cites: [
              {
                source: 'loc-portugal-country-study-1993',
                loc: { section: 'Peninsular Wars', para: '5' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q6',
        text: 'The junta in Porto, to which other local juntas finally pledged obedience, organized an army and, with British help, was able to defeat a strong French force at Lourinhã on August 21, 1808.',
        lang: 'en',
        cite: {
          source: 'loc-portugal-country-study-1993',
          loc: { section: 'Peninsular Wars', para: '5' }
        },
        provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/portugal/33.htm' }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1808-12-04' },
            cites: [
              {
                source: 'fondation-napoleon-timeline-consulate-first-empire',
                loc: {
                  section: 'Timeline: Consulate/1st French Empire, 1808 – THE SPANISH CAMPAIGN'
                }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q7',
        text: 'Napoleon was victorious at Somosierra on 30 November and Madrid capitulated on 4 December, but he was soon obliged to return to Paris due to the Austrian threat.',
        lang: 'en',
        cite: {
          source: 'fondation-napoleon-timeline-consulate-first-empire',
          loc: { section: 'Timeline: Consulate/1st French Empire, 1808 – THE SPANISH CAMPAIGN' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://www.napoleon.org/en/young-historians/napodoc/timeline-consulate1st-french-empire/'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1809-03' },
            cites: [
              {
                source: 'loc-portugal-country-study-1993',
                loc: { section: 'Peninsular Wars', para: '6' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q8',
        text: 'In March 1809, French troops under the command of General Nicholas Soult invaded Portugal once again.',
        lang: 'en',
        cite: {
          source: 'loc-portugal-country-study-1993',
          loc: { section: 'Peninsular Wars', para: '6' }
        },
        provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/portugal/33.htm' }
      }
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/5/53/El_Tres_de_Mayo%2C_by_Francisco_de_Goya%2C_from_Prado_%28cropped%29.jpg/1280px-El_Tres_de_Mayo%2C_by_Francisco_de_Goya%2C_from_Prado_%28cropped%29.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:El_Tres_de_Mayo,_by_Francisco_de_Goya,_from_Prado_(cropped).jpg',
    credit: { institution: 'Museo del Prado', creator: 'Francisco Goya' },
    license: { id: 'public-domain' }
  }
})
