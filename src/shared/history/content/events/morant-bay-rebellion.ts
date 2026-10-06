import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'morant-bay-rebellion',
  names: [
    { text: 'Morant Bay rebellion', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-06',
  type: 'uprising',
  start: {
    alts: [
      {
        value: { d: '1865-10-11' },
        cites: [
          { source: 'nlj-national-heroes', loc: { section: 'National Heroes' } },
          { source: 'nlj-national-heroes', loc: { section: 'National Heroes' } }
        ]
      }
    ]
  },
  regions: ['latin-america'],
  prominence: 3,
  places: [
    {
      ref: 'place:morant-bay',
      cites: [
        {
          source: 'loc-caribbean-islands-country-study-1987',
          loc: { section: 'POLITICAL TRADITIONS', para: '8' }
        },
        { source: 'nlj-national-heroes', loc: { section: 'National Heroes' } }
      ]
    }
  ],
  participants: [
    {
      ref: 'person:paul-bogle',
      role: 'leader',
      cites: [
        { source: 'nlj-national-heroes', loc: { section: 'National Heroes' } }
      ]
    },
    {
      name: 'George William Gordon',
      role: 'leader',
      cites: [
        {
          source: 'loc-caribbean-islands-country-study-1987',
          loc: { section: 'POLITICAL TRADITIONS', para: '8' }
        }
      ]
    },
    {
      name: 'Edward John Eyre',
      role: 'head-of-government',
      cites: [
        { source: 'nlj-national-heroes', loc: { section: 'National Heroes' } }
      ]
    },
    {
      name: 'Baron von Ketelhodt',
      role: 'victim',
      cites: [
        { source: 'nlj-national-heroes', loc: { section: 'National Heroes' } }
      ]
    }
  ],
  figures: [
    {
      key: 'executed',
      value: {
        alts: [
          {
            value: { min: 500, qualifier: 'nearly' },
            cites: [
              {
                source: 'loc-caribbean-islands-country-study-1987',
                loc: { section: 'POLITICAL TRADITIONS', para: '8' }
              }
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
          text: 'The Morant Bay Rebellion of October 1865 brought about the end of the old representative assemblies.',
          lang: 'en',
          cite: {
            source: 'loc-caribbean-islands-country-study-1987',
            loc: { section: 'POLITICAL TRADITIONS', para: '8' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'http://countrystudies.us/caribbean-islands/10.htm'
          }
        },
        {
          id: 'q2',
          text: 'On Wednesday, October 11, Bogle and about 300 men marched into Morant Bay and raided the police station and took some old guns. They then marched to the Court House where the Custos was having a meeting. They killed the Custos, Baron von Ketelhodt and fifteen vestrymen and set 51 prisoners free.',
          lang: 'en',
          cite: { source: 'nlj-national-heroes', loc: { section: 'National Heroes' } },
          provenance: { via: 'web', at: '2026-10-06', url: 'https://nlj.gov.jm/qcontentnational-heroes/' }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q3',
          text: 'In 1865, the economic situation in Jamaica began to worsen.',
          lang: 'en',
          cite: { source: 'nlj-national-heroes', loc: { section: 'National Heroes' } },
          provenance: { via: 'web', at: '2026-10-06', url: 'https://nlj.gov.jm/qcontentnational-heroes/' }
        },
        {
          id: 'q4',
          text: 'There were increases in unemployment and taxes, but a reduction in wages.',
          lang: 'en',
          cite: { source: 'nlj-national-heroes', loc: { section: 'National Heroes' } },
          provenance: { via: 'web', at: '2026-10-06', url: 'https://nlj.gov.jm/qcontentnational-heroes/' }
        },
        {
          id: 'q5',
          text: 'In Jamaica, just before the collapse of the system in 1865, the assembly had 49 members representing 28 constituencies elected by 1,457 voters. Only 1,903 registered voters existed in a population of 400,000--nearly half of whom were adult males.',
          lang: 'en',
          cite: {
            source: 'loc-caribbean-islands-country-study-1987',
            loc: { section: 'POLITICAL TRADITIONS', para: '7' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'http://countrystudies.us/caribbean-islands/10.htm'
          }
        }
      ]
    },
    {
      kind: 'course',
      quotes: [
        {
          id: 'q6',
          text: 'The original demonstrators were protesting what they believed to be unjust arrests at the courthouse in Morant Bay when, failing to obey an order to disperse, they were fired on by the militia, and seven protesters were killed. The crowd then rioted, burning the courthouse and killing fourteen vestrymen, one of whom was black.',
          lang: 'en',
          cite: {
            source: 'loc-caribbean-islands-country-study-1987',
            loc: { section: 'POLITICAL TRADITIONS', para: '8' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'http://countrystudies.us/caribbean-islands/10.htm'
          }
        },
        {
          id: 'q7',
          text: 'The soldiers killed hundreds of innocent people.',
          lang: 'en',
          cite: { source: 'nlj-national-heroes', loc: { section: 'National Heroes' } },
          provenance: { via: 'web', at: '2026-10-06', url: 'https://nlj.gov.jm/qcontentnational-heroes/' }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q8',
          text: 'Altogether, Governor Eyre ordered nearly 500 peasants executed, 600 brutally flogged, and 1,000 houses burned by the troops and the Maroons, descendants of former runaway slaves with whom the government had a legal treaty.',
          lang: 'en',
          cite: {
            source: 'loc-caribbean-islands-country-study-1987',
            loc: { section: 'POLITICAL TRADITIONS', para: '8' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'http://countrystudies.us/caribbean-islands/10.htm'
          }
        },
        {
          id: 'q9',
          text: 'The act was the final gesture of the old planter oligarchy, symbolizing that it did not wish to share political power in a democratic way with the new groups.',
          lang: 'en',
          cite: {
            source: 'loc-caribbean-islands-country-study-1987',
            loc: { section: 'POLITICAL TRADITIONS', para: '8' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'http://countrystudies.us/caribbean-islands/10.htm'
          }
        },
        {
          id: 'q10',
          text: 'Crown colony rule was soon established in other colonies.',
          lang: 'en',
          cite: {
            source: 'loc-caribbean-islands-country-study-1987',
            loc: { section: 'POLITICAL TRADITIONS', para: '9' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'http://countrystudies.us/caribbean-islands/10.htm'
          }
        },
        {
          id: 'q11',
          text: 'rose to call attention to the concluding paragraph of the Report of the Royal Jamaica Commission, namely— That the punishments inflicted were excessive; that the punishment of death was unnecessarily frequent; that the floggings were reckless, and at Bath positively barbarous; that the burning of 1,000 houses was wanton and cruel;',
          lang: 'en',
          cite: {
            source: 'hansard-commons-1866-07-31-disturbances-in-jamaica',
            loc: { section: 'HC Deb 31 July 1866 vol 184 cc1763-840' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://api.parliament.uk/historic-hansard/commons/1866/jul/31/resolution'
          }
        }
      ]
    },
    {
      kind: 'memory',
      quotes: [
        {
          id: 'q12',
          text: 'After independence Gordon was given the nation’s highest honor, Order of National Hero.',
          lang: 'en',
          cite: { source: 'nlj-national-heroes', loc: { section: 'National Heroes' } },
          provenance: { via: 'web', at: '2026-10-06', url: 'https://nlj.gov.jm/qcontentnational-heroes/' }
        }
      ]
    }
  ],
  course: [
    {
      date: {
        alts: [
          {
            value: { d: '1865-10-13' },
            cites: [
              { source: 'nlj-national-heroes', loc: { section: 'National Heroes' } },
              { source: 'nlj-national-heroes', loc: { section: 'National Heroes' } }
            ]
          }
        ]
      },
      quote: {
        id: 'q13',
        text: 'The parish was put under Martial Law on October 13, and General Forbes-Jackson was dispatched from Kingston with orders to crush the rebellion.',
        lang: 'en',
        cite: { source: 'nlj-national-heroes', loc: { section: 'National Heroes' } },
        provenance: { via: 'web', at: '2026-10-06', url: 'https://nlj.gov.jm/qcontentnational-heroes/' }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1865-10-21' },
            cites: [
              { source: 'nlj-national-heroes', loc: { section: 'National Heroes' } }
            ]
          }
        ]
      },
      quote: {
        id: 'q14',
        text: 'On October 21, 1865 he was sentenced to death.',
        lang: 'en',
        cite: { source: 'nlj-national-heroes', loc: { section: 'National Heroes' } },
        provenance: { via: 'web', at: '2026-10-06', url: 'https://nlj.gov.jm/qcontentnational-heroes/' }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1865-10-24' },
            cites: [
              { source: 'nlj-national-heroes', loc: { section: 'National Heroes' } }
            ]
          }
        ]
      },
      quote: {
        id: 'q15',
        text: 'He and his brother Moses were hanged from the burnt out Court House on October 24, 1865.',
        lang: 'en',
        cite: { source: 'nlj-national-heroes', loc: { section: 'National Heroes' } },
        provenance: { via: 'web', at: '2026-10-06', url: 'https://nlj.gov.jm/qcontentnational-heroes/' }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1865-12' },
            cites: [
              {
                source: 'loc-caribbean-islands-country-study-1987',
                loc: { section: 'POLITICAL TRADITIONS', para: '8' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q16',
        text: 'In December the Jamaica Assembly abolished itself, making way for crown colony government.',
        lang: 'en',
        cite: {
          source: 'loc-caribbean-islands-country-study-1987',
          loc: { section: 'POLITICAL TRADITIONS', para: '8' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'http://countrystudies.us/caribbean-islands/10.htm'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1866-07-31' },
            cites: [
              {
                source: 'hansard-commons-1866-07-31-disturbances-in-jamaica',
                loc: { section: 'HC Deb 31 July 1866 vol 184 cc1763-840' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q17',
        text: '1. "That this House deplores the excessive punishments which followed the suppression of the disturbances of October last in the parish of St. Thomas, Jamaica, and especially the unnecessary frequency with which the punishment of death was inflicted.',
        lang: 'en',
        cite: {
          source: 'hansard-commons-1866-07-31-disturbances-in-jamaica',
          loc: { section: 'HC Deb 31 July 1866 vol 184 cc1763-840' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://api.parliament.uk/historic-hansard/commons/1866/jul/31/resolution'
        }
      }
    }
  ],
  archive: [
    {
      id: 'bleby-reign-of-terror-1868',
      mediaKind: 'document',
      title: 'The reign of terror: a narrative of facts concerning ex-Governor Eyre, George William Gordon, and the Jamaica atrocities',
      date: { d: '1868' },
      url: 'https://archive.org/download/reignterroranar00blebgoog/reignterroranar00blebgoog.pdf',
      page: 'https://archive.org/details/reignterroranar00blebgoog',
      credit: { institution: 'Oxford University (Internet Archive)', creator: 'Henry Bleby' },
      license: { id: 'public-domain' },
      bytes: 4226688
    }
  ]
})
