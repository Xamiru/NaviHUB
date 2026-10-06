import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'canadian-confederation',
  names: [
    { text: 'Canadian Confederation', lang: 'en', role: 'primary' },
    {
      text: 'Dominion of Canada',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'parks-canada-charlottetown-and-quebec-conferences-of-1864',
          loc: { section: 'Charlottetown and Québec Conferences of 1864 National Historic Event' }
        }
      ]
    }
  ],
  researched: '2026-10-06',
  type: 'founding',
  start: {
    alts: [
      {
        value: { d: '1867-07-01' },
        cites: [
          {
            source: 'parks-canada-charlottetown-and-quebec-conferences-of-1864',
            loc: { section: 'Charlottetown and Québec Conferences of 1864 National Historic Event' }
          },
          {
            source: 'parks-canada-charlottetown-and-quebec-conferences-of-1864',
            loc: { section: 'Charlottetown and Québec Conferences of 1864 National Historic Event' }
          }
        ]
      }
    ]
  },
  regions: ['north-america'],
  prominence: 2,
  places: [
    {
      ref: 'place:charlottetown',
      cites: [
        {
          source: 'parks-canada-charlottetown-and-quebec-conferences-of-1864',
          loc: { section: 'Charlottetown and Québec Conferences of 1864 National Historic Event' }
        }
      ]
    },
    {
      ref: 'place:quebec-city',
      cites: [
        {
          source: 'parks-canada-charlottetown-and-quebec-conferences-of-1864',
          loc: { section: 'Charlottetown and Québec Conferences of 1864 National Historic Event' }
        }
      ]
    }
  ],
  participants: [
    {
      name: 'Queen Victoria',
      role: 'head-of-state',
      cites: [
        {
          source: 'parks-canada-charlottetown-and-quebec-conferences-of-1864',
          loc: { section: 'Charlottetown and Québec Conferences of 1864 National Historic Event' }
        }
      ]
    },
    {
      name: 'John MacDonald',
      role: 'head-of-government',
      cites: [
        {
          source: 'state-dept-milestones-consequences-of-union-victory',
          loc: { section: 'The Consequences of Union Victory, 1865', para: '5' }
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
          text: 'The Charlottetown and Québec conferences of 1864 were pivotal meetings that brought together influential political leaders of British North America and laid the groundwork for Canadian Confederation on 1 July 1867.',
          lang: 'en',
          cite: {
            source: 'parks-canada-charlottetown-and-quebec-conferences-of-1864',
            loc: { section: 'Charlottetown and Québec Conferences of 1864 National Historic Event' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://parks.canada.ca/culture/designation/evenement-event/conferences-charlottetown-quebec'
          }
        },
        {
          id: 'q2',
          text: 'An Act for the Union of Canada, Nova Scotia, and New Brunswick, and the Government thereof; and for Purposes connected therewith.',
          lang: 'en',
          cite: {
            source: 'british-north-america-act-1867',
            loc: { section: 'British North America Act, 1867 - Enactment no. 1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://justice.canada.ca/eng/rp-pr/csj-sjc/constitution/lawreg-loireg/p1t11.html'
          }
        },
        {
          id: 'q3',
          text: 'Whereas the Provinces of Canada, Nova Scotia, and New Brunswick have expressed their Desire to be federally united into One Dominion under the Crown of the United Kingdom of Great Britain and Ireland, with a Constitution similar in Principle to that of the United Kingdom:',
          lang: 'en',
          cite: {
            source: 'british-north-america-act-1867',
            loc: { section: 'British North America Act, 1867 - Enactment no. 1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://justice.canada.ca/eng/rp-pr/csj-sjc/constitution/lawreg-loireg/p1t11.html'
          }
        }
      ]
    },
    {
      kind: 'causes',
      quotes: [
        {
          id: 'q4',
          text: 'In the north, fears of a resurgent United States and calls by some U.S. politicians for the annexation of British North American territory allowed Canadian politicians to overcome their own sectional differences, while also spurring British parliamentary leaders to urge a stronger central government in British North America, especially after Irish-born civil war veterans launched several unsuccessful raids into Canada. This resulted in the British North America Act of 1867, which united Ontario, Quebec, Nova Scotia and New Brunswick.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-consequences-of-union-victory',
            loc: { section: 'The Consequences of Union Victory, 1865', para: '5' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://history.state.gov/milestones/1861-1865/victory'
          }
        },
        {
          id: 'q5',
          text: 'In the spring of 1864, the legislatures of New Brunswick, Nova Scotia, and Prince Edward Island expressed interest in meeting to discuss the possibility of a Maritime union. When the Province of Canada heard of the proposed conference, members of its combined legislature requested attendance at the colonial meeting to explore a broader political union.',
          lang: 'en',
          cite: {
            source: 'parks-canada-charlottetown-and-quebec-conferences-of-1864',
            loc: { section: 'Charlottetown and Québec Conferences of 1864 National Historic Event' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://parks.canada.ca/culture/designation/evenement-event/conferences-charlottetown-quebec'
          }
        }
      ]
    },
    {
      kind: 'course',
      quotes: [
        {
          id: 'q6',
          text: 'Some issues, such as the regional distribution of seats in the upper house (the Senate) and specifics relating to finances, created schisms between the delegates and ultimately led the legislatures of Prince Edward Island and Newfoundland to withdraw from the process.',
          lang: 'en',
          cite: {
            source: 'parks-canada-charlottetown-and-quebec-conferences-of-1864',
            loc: { section: 'Charlottetown and Québec Conferences of 1864 National Historic Event' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://parks.canada.ca/culture/designation/evenement-event/conferences-charlottetown-quebec'
          }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q7',
          text: 'Subsequently, in 1870, Canadian Prime Minister John MacDonald successfully convinced the British Government to cede the lands of the Hudson’s Bay Company to Canada, crushing the hopes of U.S. expansionists who hoped to acquire those lands for the United States.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-consequences-of-union-victory',
            loc: { section: 'The Consequences of Union Victory, 1865', para: '5' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://history.state.gov/milestones/1861-1865/victory'
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
            value: { d: '1864-09' },
            cites: [
              {
                source: 'parks-canada-charlottetown-and-quebec-conferences-of-1864',
                loc: {
                  section: 'Charlottetown and Québec Conferences of 1864 National Historic Event'
                }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q8',
        text: 'The Charlottetown Conference was held in September 1864 in the Legislative Council Chamber of the Colonial Building.',
        lang: 'en',
        cite: {
          source: 'parks-canada-charlottetown-and-quebec-conferences-of-1864',
          loc: { section: 'Charlottetown and Québec Conferences of 1864 National Historic Event' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://parks.canada.ca/culture/designation/evenement-event/conferences-charlottetown-quebec'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1864-10-10' },
            cites: [
              {
                source: 'parks-canada-charlottetown-and-quebec-conferences-of-1864',
                loc: {
                  section: 'Charlottetown and Québec Conferences of 1864 National Historic Event'
                }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q9',
        text: 'On 10 October 1864, the Québec Conference opened with a total of 33 delegates from the British North American colonies, including Newfoundland which had not previously participated.',
        lang: 'en',
        cite: {
          source: 'parks-canada-charlottetown-and-quebec-conferences-of-1864',
          loc: { section: 'Charlottetown and Québec Conferences of 1864 National Historic Event' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://parks.canada.ca/culture/designation/evenement-event/conferences-charlottetown-quebec'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1866-12' },
            cites: [
              {
                source: 'parks-canada-charlottetown-and-quebec-conferences-of-1864',
                loc: {
                  section: 'Charlottetown and Québec Conferences of 1864 National Historic Event'
                }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q10',
        text: 'In attendance for this conference in December 1866 were representatives from the Province of Canada, New Brunswick, and Nova Scotia.',
        lang: 'en',
        cite: {
          source: 'parks-canada-charlottetown-and-quebec-conferences-of-1864',
          loc: { section: 'Charlottetown and Québec Conferences of 1864 National Historic Event' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://parks.canada.ca/culture/designation/evenement-event/conferences-charlottetown-quebec'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1867-03-29' },
            cites: [
              {
                source: 'british-north-america-act-1867',
                loc: { section: 'British North America Act, 1867 - Enactment no. 1' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q11',
        text: 'In late March, Queen Victoria signed the British North America Act, setting the stage for Confederation on 1 July 1867.',
        lang: 'en',
        cite: {
          source: 'parks-canada-charlottetown-and-quebec-conferences-of-1864',
          loc: { section: 'Charlottetown and Québec Conferences of 1864 National Historic Event' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://parks.canada.ca/culture/designation/evenement-event/conferences-charlottetown-quebec'
        }
      }
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/7/7e/Peres_de_la_Confederation_No_62_%28HS85-10-16085%29.jpg/1280px-Peres_de_la_Confederation_No_62_%28HS85-10-16085%29.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Peres_de_la_Confederation_No_62_(HS85-10-16085).jpg',
    credit: { institution: 'British Library', creator: 'Joseph L. Pinsonneault' },
    license: { id: 'public-domain' }
  }
})
