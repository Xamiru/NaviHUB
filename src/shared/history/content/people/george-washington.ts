import { definePerson } from '../../schema'

export default definePerson({
  id: 'george-washington',
  names: [
    { text: 'George Washington', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-13',
  born: {
    alts: [
      {
        value: { d: '1732-02-22', julian: true },
        cites: [
          {
            source: 'britannica-1911-washington-george',
            loc: { section: 'Washington, George', para: '1' }
          }
        ]
      }
    ]
  },
  died: {
    alts: [
      {
        value: { d: '1799-12-14' },
        cites: [
          {
            source: 'britannica-1911-washington-george',
            loc: { section: 'Washington, George', para: '10' }
          }
        ]
      }
    ]
  },
  bornIn: {
    ref: 'place:bridges-creek',
    cites: [
      {
        source: 'britannica-1911-washington-george',
        loc: { section: 'Washington, George', para: '1' }
      }
    ]
  },
  diedIn: {
    ref: 'place:mount-vernon',
    cites: [
      {
        source: 'britannica-1911-washington-george',
        loc: { section: 'Washington, George', para: '10' }
      }
    ]
  },
  regions: ['north-america'],
  roles: ['military', 'head-of-state', 'politician'],
  offices: [
    {
      title: 'commander-in-chief of the Continental Army',
      polity: 'polity:united-states',
      start: {
        alts: [
          {
            value: { d: '1775-06-15' },
            cites: [
              {
                source: 'britannica-1911-washington-george',
                loc: { section: 'Washington, George', para: '5' }
              }
            ]
          }
        ]
      },
      end: {
        alts: [
          {
            value: { d: '1783-12-23' },
            cites: [
              {
                source: 'britannica-1911-washington-george',
                loc: { section: 'Washington, George', para: '6' }
              }
            ]
          }
        ]
      },
      cites: [
        {
          source: 'britannica-1911-washington-george',
          loc: { section: 'Washington, George', para: '5' }
        },
        {
          source: 'britannica-1911-washington-george',
          loc: { section: 'Washington, George', para: '6' }
        }
      ]
    },
    {
      title: 'president of the United States',
      polity: 'polity:united-states',
      start: {
        alts: [
          {
            value: { d: '1789-04-30' },
            cites: [
              {
                source: 'millercenter-chervinsky-washington-life-in-brief',
                loc: { section: 'George Washington: Life in Brief', para: '12' }
              }
            ]
          }
        ]
      },
      end: {
        alts: [
          {
            value: { d: '1797' },
            cites: [
              {
                source: 'britannica-1911-washington-george',
                loc: { section: 'Washington, George', para: '10' }
              }
            ]
          }
        ]
      },
      cites: [
        {
          source: 'millercenter-chervinsky-washington-life-in-brief',
          loc: { section: 'George Washington: Life in Brief', para: '12' }
        },
        {
          source: 'britannica-1911-washington-george',
          loc: { section: 'Washington, George', para: '10' }
        }
      ]
    }
  ],
  portrait: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/2/24/Gilbert_Stuart_1796_portrait_of_Washington.jpg/1280px-Gilbert_Stuart_1796_portrait_of_Washington.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Gilbert_Stuart_1796_portrait_of_Washington.jpg',
    credit: { institution: 'National Gallery of Art', creator: 'Gilbert Stuart' },
    license: { id: 'public-domain' }
  },
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'WASHINGTON, GEORGE (1732-1799), the first president of the United States, was born at Bridges Creek, Westmoreland county, Virginia, on the 22nd (Old Style 11th) of February 1732.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-washington-george',
            loc: { section: 'Washington, George', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Washington,_George'
          }
        }
      ]
    },
    {
      kind: 'early-life',
      quotes: [
        {
          id: 'q2',
          text: 'A series of personal losses changed the course of George’s life.',
          lang: 'en',
          cite: {
            source: 'millercenter-chervinsky-washington-life-in-brief',
            loc: { section: 'George Washington: Life in Brief', para: '2' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://millercenter.org/president/washington/life-in-brief'
          }
        },
        {
          id: 'q3',
          text: 'In October 1753, on the eve of the last French and Indian war, Washington was chosen by Governor Robert Dinwiddie as the agent to warn the French away from their new posts on the Ohio, in western Pennsylvania.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-washington-george',
            loc: { section: 'Washington, George', para: '3' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Washington,_George'
          }
        }
      ]
    },
    {
      kind: 'career',
      quotes: [
        {
          id: 'q4',
          text: 'Washington supported the protest measures in the House of Burgesses, and in 1774, he accepted appointment as a Virginia delegate to the First Continental Congress, where he voted for non-importation measures, such as abstaining from purchasing British goods.',
          lang: 'en',
          cite: {
            source: 'millercenter-chervinsky-washington-life-in-brief',
            loc: { section: 'George Washington: Life in Brief', para: '7' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://millercenter.org/president/washington/life-in-brief'
          }
        },
        {
          id: 'q5',
          text: 'When Congress, after the fights at Lexington and Concord, resolved that the colonies ought to be put in a position of defence, the first practical step was the unanimous selection (June 15), on motion of John Adams of Massachusetts, of Washington as commander-in-chief of the armed forces of the United Colonies.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-washington-george',
            loc: { section: 'Washington, George', para: '5' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Washington,_George'
          }
        },
        {
          id: 'q6',
          text: 'At the end of the war, Washington returned his commission to the Confederation Congress and resumed life as a private citizen in Virginia.',
          lang: 'en',
          cite: {
            source: 'millercenter-chervinsky-washington-life-in-brief',
            loc: { section: 'George Washington: Life in Brief', para: '10' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://millercenter.org/president/washington/life-in-brief'
          }
        },
        {
          id: 'q7',
          text: 'In 1786, the Virginia legislature nominated a slate of delegates to represent the state at the Constitutional Convention.',
          lang: 'en',
          cite: {
            source: 'millercenter-chervinsky-washington-life-in-brief',
            loc: { section: 'George Washington: Life in Brief', para: '11' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://millercenter.org/president/washington/life-in-brief'
          }
        },
        {
          id: 'q8',
          text: 'On June 21, 1788, New Hampshire became the ninth and requisite state to ratify the new Constitution of the United States, forcing each state to schedule elections for the new federal offices.',
          lang: 'en',
          cite: {
            source: 'millercenter-chervinsky-washington-life-in-brief',
            loc: { section: 'George Washington: Life in Brief', para: '12' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://millercenter.org/president/washington/life-in-brief'
          }
        },
        {
          id: 'q9',
          text: 'Washington also left an inveterate imprint on the political process, especially through his formation of the cabinet.',
          lang: 'en',
          cite: {
            source: 'millercenter-chervinsky-washington-impact-and-legacy',
            loc: { section: 'George Washington: Impact and Legacy', para: '5' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://millercenter.org/president/washington/impact-and-legacy'
          }
        },
        {
          id: 'q10',
          text: 'To announce his decision not to seek a third term as President, George Washington presented his Farewell Address in a newspaper article September 17, 1796.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-washington-farewell',
            loc: { section: 'Washington’s Farewell Address, 1796', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://history.state.gov/milestones/1784-1800/washington-farewell'
          }
        }
      ]
    },
    {
      kind: 'later-life',
      quotes: [
        {
          id: 'q11',
          text: 'Washington’s decision to step away from power, again, solidified his legacy and had a powerful impact on the future of the presidency.',
          lang: 'en',
          cite: {
            source: 'millercenter-chervinsky-washington-impact-and-legacy',
            loc: { section: 'George Washington: Impact and Legacy', para: '6' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://millercenter.org/president/washington/impact-and-legacy'
          }
        }
      ]
    },
    {
      kind: 'death',
      quotes: [
        {
          id: 'q12',
          text: 'In the midst of these military preparations he was struck down by sudden illness, which lasted but for a day, and died at Mount Vernon on the 14th of December 1799.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-washington-george',
            loc: { section: 'Washington, George', para: '10' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Washington,_George'
          }
        }
      ]
    },
    {
      kind: 'legacy',
      quotes: [
        {
          id: 'q13',
          text: 'The trust and confidence Washington inspired made possible the creation of the presidency and helped establish the executive branch.',
          lang: 'en',
          cite: {
            source: 'millercenter-chervinsky-washington-impact-and-legacy',
            loc: { section: 'George Washington: Impact and Legacy', para: '4' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://millercenter.org/president/washington/impact-and-legacy'
          }
        },
        {
          id: 'q14',
          text: 'However, Washington’s ownership of enslaved humans is by far the most challenging part of his legacy.',
          lang: 'en',
          cite: {
            source: 'millercenter-chervinsky-washington-impact-and-legacy',
            loc: { section: 'George Washington: Impact and Legacy', para: '9' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://millercenter.org/president/washington/impact-and-legacy'
          }
        }
      ]
    }
  ]
})
