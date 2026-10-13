import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'united-states-declaration-of-independence',
  names: [
    { text: 'United States Declaration of Independence', lang: 'en', role: 'primary' },
    {
      text: 'Declaration of Independence',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'state-dept-milestones-declaration-of-independence',
          loc: { section: 'The Declaration of Independence, 1776', para: '1' }
        }
      ]
    }
  ],
  researched: '2026-10-13',
  type: 'independence',
  start: {
    alts: [
      {
        value: { d: '1776-07-04' },
        cites: [
          {
            source: 'state-dept-milestones-declaration-of-independence',
            loc: { section: 'The Declaration of Independence, 1776', para: '1' }
          },
          {
            source: 'state-dept-milestones-declaration-of-independence',
            loc: { section: 'The Declaration of Independence, 1776', para: '7' }
          }
        ]
      }
    ]
  },
  regions: ['north-america'],
  prominence: 2,
  places: [
    {
      ref: 'place:philadelphia',
      cites: [
        {
          source: 'state-dept-milestones-continental-congress',
          loc: { section: 'Continental Congress, 1774–1781', para: '4' }
        }
      ]
    }
  ],
  polities: [
    {
      ref: 'polity:united-states',
      cites: [
        {
          source: 'state-dept-milestones-declaration-of-independence',
          loc: { section: 'The Declaration of Independence, 1776', para: '1' }
        }
      ]
    }
  ],
  participants: [
    {
      ref: 'person:thomas-jefferson',
      role: 'negotiator',
      cites: [
        {
          source: 'state-dept-milestones-declaration-of-independence',
          loc: { section: 'The Declaration of Independence, 1776', para: '5' }
        }
      ]
    },
    {
      name: 'Benjamin Franklin',
      role: 'negotiator',
      cites: [
        {
          source: 'state-dept-milestones-declaration-of-independence',
          loc: { section: 'The Declaration of Independence, 1776', para: '7' }
        }
      ]
    },
    {
      name: 'John Adams',
      role: 'negotiator',
      cites: [
        {
          source: 'state-dept-milestones-declaration-of-independence',
          loc: { section: 'The Declaration of Independence, 1776', para: '7' }
        }
      ]
    }
  ],
  related: [
    {
      ref: 'event:american-revolutionary-war',
      rel: 'led-to',
      cites: [
        {
          source: 'state-dept-milestones-declaration-of-independence',
          loc: { section: 'The Declaration of Independence, 1776', para: '9' }
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
          text: 'By issuing the Declaration of Independence, adopted by the Continental Congress on July 4, 1776, the 13 American colonies severed their political connections to Great Britain.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-declaration-of-independence',
            loc: { section: 'The Declaration of Independence, 1776', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://history.state.gov/milestones/1776-1783/declaration'
          }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q2',
          text: 'Throughout the 1760s and early 1770s, the North American colonists found themselves increasingly at odds with British imperial policies regarding taxation and frontier policy.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-declaration-of-independence',
            loc: { section: 'The Declaration of Independence, 1776', para: '3' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://history.state.gov/milestones/1776-1783/declaration'
          }
        },
        {
          id: 'q3',
          text: 'Throughout the winter of 1775–1776, the members of the Continental Congress came to view reconciliation with Britain as unlikely, and independence the only course of action available to them.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-declaration-of-independence',
            loc: { section: 'The Declaration of Independence, 1776', para: '5' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://history.state.gov/milestones/1776-1783/declaration'
          }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q4',
          text: 'The Declaration’s most important diplomatic effect was to allow for recognition of the United States by friendly foreign governments.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-declaration-of-independence',
            loc: { section: 'The Declaration of Independence, 1776', para: '9' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://history.state.gov/milestones/1776-1783/declaration'
          }
        },
        {
          id: 'q5',
          text: 'The British Government did its best to dismiss the Declaration as a trivial document issued by disgruntled colonists.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-declaration-of-independence',
            loc: { section: 'The Declaration of Independence, 1776', para: '8' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://history.state.gov/milestones/1776-1783/declaration'
          }
        }
      ]
    },
    {
      kind: 'in-their-words',
      quotes: [
        {
          id: 'q6',
          text: 'When in the course of human events, it becomes necessary for one people to dissolve the political bands which have connected them with another, and to assume among the powers of the earth, the separate and equal station to which the laws of nature and of nature\'s God entitle them, a decent respect to the opinions of mankind requires that they should declare the causes which impel them to the separation.',
          lang: 'en',
          cite: {
            source: 'avalon-declaration-of-independence-1776',
            loc: { section: 'Declaration of Independence, July 4, 1776', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://avalon.law.yale.edu/18th_century/declare.asp'
          }
        },
        {
          id: 'q7',
          text: 'We, therefore, the representatives of the United States of America, in General Congress assembled, appealing to the Supreme Judge of the world for the rectitude of our intentions, do, in the name and by the authority of the good people of these colonies solemnly publish and declare, That these United Colonies are, and of right ought to be, FREE AND INDEPENDENT STATES; that they are absolved from all allegiance to the British crown and that all political connection between them and the state of Great Britain is, and ought to be, totally dissolved; and that, as free and independent states, they have full power to levy war, conclude peace, contract alliances, establish commerce, and do all other acts and things which independent states may of right do. And for the support of this declaration, with a firm reliance on the protection of Divine Providence, we mutually pledge to each other our lives, our fortunes, and our sacred honor.',
          lang: 'en',
          cite: {
            source: 'avalon-declaration-of-independence-1776',
            loc: { section: 'Declaration of Independence, July 4, 1776', para: '33' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://avalon.law.yale.edu/18th_century/declare.asp'
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
            value: { d: '1775-12-22' },
            cites: [
              {
                source: 'state-dept-milestones-declaration-of-independence',
                loc: { section: 'The Declaration of Independence, 1776', para: '5' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q8',
        text: 'When on December 22, 1775, the British Parliament prohibited trade with the colonies, Congress responded in April of 1776 by opening colonial ports—this was a major step towards severing ties with Britain.',
        lang: 'en',
        cite: {
          source: 'state-dept-milestones-declaration-of-independence',
          loc: { section: 'The Declaration of Independence, 1776', para: '5' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-13',
          url: 'https://history.state.gov/milestones/1776-1783/declaration'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1776-06-07' },
            cites: [
              {
                source: 'state-dept-milestones-declaration-of-independence',
                loc: { section: 'The Declaration of Independence, 1776', para: '5' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q9',
        text: 'On June 7, 1776, Richard Henry Lee introduced a motion in Congress to declare independence.',
        lang: 'en',
        cite: {
          source: 'state-dept-milestones-declaration-of-independence',
          loc: { section: 'The Declaration of Independence, 1776', para: '5' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-13',
          url: 'https://history.state.gov/milestones/1776-1783/declaration'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1776-07-04' },
            cites: [
              {
                source: 'state-dept-milestones-declaration-of-independence',
                loc: { section: 'The Declaration of Independence, 1776', para: '7' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q10',
        text: 'The committee presented the final draft before Congress on June 28, 1776, and Congress adopted the final text of the Declaration of Independence on July 4.',
        lang: 'en',
        cite: {
          source: 'state-dept-milestones-declaration-of-independence',
          loc: { section: 'The Declaration of Independence, 1776', para: '7' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-13',
          url: 'https://history.state.gov/milestones/1776-1783/declaration'
        }
      }
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/d/d2/John_Trumbull_-_The_Declaration_of_Independence%2C_July_4%2C_1776_-_1832.3_-_Yale_University_Art_Gallery.jpg/1280px-John_Trumbull_-_The_Declaration_of_Independence%2C_July_4%2C_1776_-_1832.3_-_Yale_University_Art_Gallery.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:John_Trumbull_-_The_Declaration_of_Independence,_July_4,_1776_-_1832.3_-_Yale_University_Art_Gallery.jpg',
    credit: { institution: 'Yale University Art Gallery', creator: 'John Trumbull' },
    license: { id: 'public-domain' }
  }
})
