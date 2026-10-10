import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'good-friday-agreement',
  names: [
    { text: 'Good Friday Agreement', lang: 'en', role: 'primary' },
    {
      text: 'Belfast Agreement',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'gov-uk-the-belfast-agreement',
          loc: { section: 'The Belfast Agreement', para: '1' }
        }
      ]
    },
    { text: 'Comhaontú Aoine an Chéasta', lang: 'ga', role: 'native' }
  ],
  researched: '2026-10-10',
  type: 'treaty',
  start: {
    alts: [
      {
        value: { d: '1998-04-10' },
        cites: [
          {
            source: 'gov-uk-the-belfast-agreement',
            loc: { section: 'The Belfast Agreement', para: '1' }
          },
          {
            source: 'ulster-museum-good-friday-agreement',
            loc: { section: 'Good Friday Agreement', para: '4' }
          }
        ]
      }
    ]
  },
  regions: ['europe'],
  prominence: 2,
  places: [
    {
      ref: 'place:belfast',
      cites: [
        {
          source: 'ulster-museum-good-friday-agreement',
          loc: { section: 'Good Friday Agreement', para: '4' }
        }
      ]
    }
  ],
  polities: [
    { ref: 'polity:united-kingdom' }
  ],
  participants: [
    {
      name: 'George Mitchell',
      role: 'negotiator',
      cites: [
        {
          source: 'ulster-museum-good-friday-agreement',
          loc: { section: 'Good Friday Agreement', para: '2' }
        }
      ]
    },
    {
      name: 'Tony Blair',
      role: 'head-of-government',
      cites: [
        {
          source: 'hrw-1999-world-report-united-kingdom',
          loc: { section: 'Human Rights Watch World Report 1999: United Kingdom', para: '16' }
        }
      ]
    },
    {
      name: 'Bertie Ahern',
      role: 'head-of-government',
      cites: [
        {
          source: 'national-archives-belfast-good-friday-agreement-1998-resource',
          loc: { section: 'Belfast (Good Friday) Agreement 1998: sources' }
        }
      ]
    },
    {
      name: 'David Trimble',
      role: 'negotiator',
      cites: [
        {
          source: 'national-archives-belfast-good-friday-agreement-1998-resource',
          loc: { section: 'Belfast (Good Friday) Agreement 1998: sources' }
        }
      ]
    },
    {
      name: 'John Hume',
      role: 'negotiator',
      cites: [
        {
          source: 'national-archives-belfast-good-friday-agreement-1998-resource',
          loc: { section: 'Belfast (Good Friday) Agreement 1998: sources' }
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
          text: 'The Belfast Agreement, also known as the Good Friday Agreement, was signed on 10 April 1998. It underpins Northern Ireland’s peace, its constitutional settlement, and its institutions.',
          lang: 'en',
          cite: {
            source: 'gov-uk-the-belfast-agreement',
            loc: { section: 'The Belfast Agreement', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'https://www.gov.uk/government/publications/the-belfast-agreement'
          }
        },
        {
          id: 'q2',
          text: 'The April 1998 Multi-Party Agreement, confirmed by a clear majority in a public referendum on May 20, established new political arrangements for Northern Ireland and dominated the news throughout the year.',
          lang: 'en',
          cite: {
            source: 'hrw-1999-world-report-united-kingdom',
            loc: { section: 'Human Rights Watch World Report 1999: United Kingdom', para: '4' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'https://www.hrw.org/legacy/worldreport99/europe/uk.html'
          }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q3',
          text: 'Since 1996, political representatives had been invited to multi-party talks in an effort to bring peace to Northern Ireland.',
          lang: 'en',
          cite: {
            source: 'ulster-museum-good-friday-agreement',
            loc: { section: 'Good Friday Agreement', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'https://www.ulstermuseum.org/digital-exhibitions/good-friday-agreement'
          }
        },
        {
          id: 'q4',
          text: 'Several parties left the talks after disagreements over the process of decommissioning weapons and the proposed release of political prisoners.',
          lang: 'en',
          cite: {
            source: 'ulster-museum-good-friday-agreement',
            loc: { section: 'Good Friday Agreement', para: '2' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'https://www.ulstermuseum.org/digital-exhibitions/good-friday-agreement'
          }
        },
        {
          id: 'q5',
          text: 'The Belfast Agreement was signed on 10 April 1998 following three decades of conflict known as the Troubles.',
          lang: 'en',
          cite: {
            source: 'gov-uk-the-belfast-agreement',
            loc: { section: 'The Belfast Agreement', para: '16' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'https://www.gov.uk/government/publications/the-belfast-agreement'
          }
        }
      ]
    },
    {
      kind: 'course',
      quotes: [
        {
          id: 'q6',
          text: 'Cease-fires called by the major paramilitary groups were broken intermittently throughout 1998 but the political wings of the major paramilitary organizations survived to participate in finalizing the Multi-Party Agreement.',
          lang: 'en',
          cite: {
            source: 'hrw-1999-world-report-united-kingdom',
            loc: { section: 'Human Rights Watch World Report 1999: United Kingdom', para: '15' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'https://www.hrw.org/legacy/worldreport99/europe/uk.html'
          }
        },
        {
          id: 'q7',
          text: 'Discussions continued past their original deadline, but on 10 April the Belfast Agreement was signed, consisting of a multi-party agreement signed by Northern Ireland political representatives and the British-Irish Agreement between the two governments.',
          lang: 'en',
          cite: {
            source: 'ulster-museum-good-friday-agreement',
            loc: { section: 'Good Friday Agreement', para: '4' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'https://www.ulstermuseum.org/digital-exhibitions/good-friday-agreement'
          }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q8',
          text: 'The agreement, steered to completion by former U.S. Senator George Mitchell as peace talks chairman, confirmed the principle of consent, requiring that any change in the constitutional status of Northern Ireland must be agreed upon by a majority of its people.',
          lang: 'en',
          cite: {
            source: 'hrw-1999-world-report-united-kingdom',
            loc: { section: 'Human Rights Watch World Report 1999: United Kingdom', para: '4' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'https://www.hrw.org/legacy/worldreport99/europe/uk.html'
          }
        },
        {
          id: 'q9',
          text: 'It provides for a Northern Ireland Assembly, cross-border bodies between Northern Ireland and the Republic of Ireland, and—at the urging of human rights groups—a series of initiatives aimed at the enhanced protection of human rights.',
          lang: 'en',
          cite: {
            source: 'hrw-1999-world-report-united-kingdom',
            loc: { section: 'Human Rights Watch World Report 1999: United Kingdom', para: '4' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'https://www.hrw.org/legacy/worldreport99/europe/uk.html'
          }
        },
        {
          id: 'q10',
          text: 'The agreement established the Independent Commission on Policing for Northern Ireland, chaired by former Hong Kong Governor Chris Patten, whose remit is to ensure that future policing arrangements result in a policing service that is “professional, effective and efficient, fair and impartial, [and] free from partisan control; accountable, . . . and operat[ing] within a coherent and co-operative criminal justice system, which conforms with human rights norms.”',
          lang: 'en',
          cite: {
            source: 'hrw-1999-world-report-united-kingdom',
            loc: { section: 'Human Rights Watch World Report 1999: United Kingdom', para: '9' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'https://www.hrw.org/legacy/worldreport99/europe/uk.html'
          }
        },
        {
          id: 'q11',
          text: 'Despite the agreement’s commitment to “normalize” security arrangements, the U.K. government immediately moved to strengthen existing emergency laws in Northern Ireland in the aftermath of the Omagh bombing.',
          lang: 'en',
          cite: {
            source: 'hrw-1999-world-report-united-kingdom',
            loc: { section: 'Human Rights Watch World Report 1999: United Kingdom', para: '6' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'https://www.hrw.org/legacy/worldreport99/europe/uk.html'
          }
        }
      ]
    },
    {
      kind: 'legacy',
      quotes: [
        {
          id: 'q12',
          text: 'Over 71% voted ‘Yes’ and the agreement was passed.',
          lang: 'en',
          cite: {
            source: 'ulster-museum-good-friday-agreement',
            loc: { section: 'Good Friday Agreement', para: '4' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'https://www.ulstermuseum.org/digital-exhibitions/good-friday-agreement'
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
            value: { d: '1998-04-09' },
            cites: [
              {
                source: 'ulster-museum-good-friday-agreement',
                loc: { section: 'Good Friday Agreement', para: '2' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q13',
        text: 'In 1998 Senator George Mitchell, who chaired the talks as US special envoy to Northern Ireland, proposed a deadline of 9 April.',
        lang: 'en',
        cite: {
          source: 'ulster-museum-good-friday-agreement',
          loc: { section: 'Good Friday Agreement', para: '2' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-10',
          url: 'https://www.ulstermuseum.org/digital-exhibitions/good-friday-agreement'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1998-05-22' },
            cites: [
              {
                source: 'ulster-museum-good-friday-agreement',
                loc: { section: 'Good Friday Agreement', para: '4' }
              }
            ]
          },
          {
            value: { d: '1998-05-20' },
            cites: [
              {
                source: 'hrw-1999-world-report-united-kingdom',
                loc: { section: 'Human Rights Watch World Report 1999: United Kingdom', para: '4' }
              }
            ],
            heldBy: [
              { kind: 'organization', name: 'Human Rights Watch' }
            ]
          }
        ]
      },
      quote: {
        id: 'q14',
        text: 'On 22 May 1998, a referendum was held to determine whether the public approved the proposed agreement.',
        lang: 'en',
        cite: {
          source: 'ulster-museum-good-friday-agreement',
          loc: { section: 'Good Friday Agreement', para: '4' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-10',
          url: 'https://www.ulstermuseum.org/digital-exhibitions/good-friday-agreement'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1998-08-15' },
            cites: [
              {
                source: 'hrw-1999-world-report-united-kingdom',
                loc: { section: 'Human Rights Watch World Report 1999: United Kingdom', para: '15' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q15',
        text: 'Dissident republican paramilitary groups opposing the agreement executed a number of bombings in the aftermath of the referendum, culminating with the car bomb explosion on August 15, 1998, in the town of Omagh (near the Irish border) that killed twenty-nine people and injured hundreds, both Catholic and Protestant.',
        lang: 'en',
        cite: {
          source: 'hrw-1999-world-report-united-kingdom',
          loc: { section: 'Human Rights Watch World Report 1999: United Kingdom', para: '15' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-10',
          url: 'https://www.hrw.org/legacy/worldreport99/europe/uk.html'
        }
      }
    }
  ],
  hero: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/9/97/Parliament_Buildings%2C_Stormont%2C_Belfast_%282013%29_-_geograph.org.uk_-_3471227.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Parliament_Buildings,_Stormont,_Belfast_(2013)_-_geograph.org.uk_-_3471227.jpg',
    credit: { institution: 'Geograph Britain and Ireland', creator: 'Albert Bridge' },
    license: { id: 'cc-by-sa', version: '2.0', url: 'https://creativecommons.org/licenses/by-sa/2.0' }
  }
})
