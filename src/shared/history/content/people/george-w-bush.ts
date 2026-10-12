import { definePerson } from '../../schema'

export default definePerson({
  id: 'george-w-bush',
  names: [
    { text: 'George W. Bush', lang: 'en', role: 'primary' },
    {
      text: 'George Walker Bush',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'millercenter-gregg-gw-bush-overview',
          loc: { section: 'George W. Bush', para: '15' }
        }
      ]
    },
    {
      text: 'Dubya',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'millercenter-gregg-gw-bush-overview',
          loc: { section: 'George W. Bush', para: '29' }
        }
      ]
    }
  ],
  researched: '2026-10-12',
  born: {
    alts: [
      {
        value: { d: '1946-07-06' },
        cites: [
          {
            source: 'millercenter-gregg-gw-bush-life-in-brief',
            loc: { section: 'George W. Bush: Life in Brief', para: '3' }
          },
          {
            source: 'millercenter-gregg-gw-bush-overview',
            loc: { section: 'George W. Bush', para: '17' }
          },
          {
            source: 'lc-names-bush-george-w-no95049848',
            loc: { section: 'Bush, George W. (George Walker), 1946-' }
          }
        ]
      }
    ]
  },
  bornIn: {
    ref: 'place:new-haven',
    cites: [
      {
        source: 'millercenter-gregg-gw-bush-overview',
        loc: { section: 'George W. Bush', para: '19' }
      }
    ]
  },
  regions: ['north-america'],
  roles: ['head-of-state', 'politician'],
  offices: [
    {
      title: 'President of the United States',
      polity: 'polity:united-states',
      start: {
        alts: [
          {
            value: { d: '2001-01-20' },
            cites: [
              {
                source: 'millercenter-gregg-gw-bush-overview',
                loc: { section: 'George W. Bush', para: '35' }
              }
            ]
          }
        ]
      },
      end: {
        alts: [
          {
            value: { d: '2009-01-20' },
            cites: [
              {
                source: 'millercenter-gregg-gw-bush-overview',
                loc: { section: 'George W. Bush', para: '37' }
              }
            ]
          }
        ]
      },
      cites: [
        {
          source: 'millercenter-gregg-gw-bush-overview',
          loc: { section: 'George W. Bush', para: '35' }
        },
        {
          source: 'millercenter-gregg-gw-bush-overview',
          loc: { section: 'George W. Bush', para: '37' }
        }
      ]
    }
  ],
  portrait: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/c/c1/George_W._Bush_2003_%284x5%29.png/1280px-George_W._Bush_2003_%284x5%29.png',
    page: 'https://commons.wikimedia.org/wiki/File:George_W._Bush_2003_(4x5).png',
    credit: { institution: 'The White House', creator: 'Eric Draper' },
    license: { id: 'public-domain' }
  },
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'George W. Bush, the 43rd President of the United States, led the country during a time of great challenge and change.',
          lang: 'en',
          cite: {
            source: 'millercenter-gregg-gw-bush-life-in-brief',
            loc: { section: 'George W. Bush: Life in Brief', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-12',
            url: 'https://millercenter.org/president/gwbush/life-in-brief'
          }
        }
      ]
    },
    {
      kind: 'early-life',
      quotes: [
        {
          id: 'q2',
          text: 'George W. Bush was born on July 6, 1946, the first child of George Herbert Walker and Barbara Bush.',
          lang: 'en',
          cite: {
            source: 'millercenter-gregg-gw-bush-life-in-brief',
            loc: { section: 'George W. Bush: Life in Brief', para: '3' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-12',
            url: 'https://millercenter.org/president/gwbush/life-in-brief'
          }
        },
        {
          id: 'q3',
          text: 'For Bush, there was little question of where he would attend college.',
          lang: 'en',
          cite: {
            source: 'millercenter-gregg-gw-bush-life-before-the-presidency',
            loc: { section: 'George W. Bush: Life Before the Presidency', para: '6' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-12',
            url: 'https://millercenter.org/president/gwbush/life-before-the-presidency'
          }
        },
        {
          id: 'q4',
          text: 'Bush graduated from Yale in 1968, a year clouded by the assassinations of Martin Luther King, Jr., and Robert F. Kennedy, and the ongoing conflict in Vietnam.',
          lang: 'en',
          cite: {
            source: 'millercenter-gregg-gw-bush-life-before-the-presidency',
            loc: { section: 'George W. Bush: Life Before the Presidency', para: '8' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-12',
            url: 'https://millercenter.org/president/gwbush/life-before-the-presidency'
          }
        },
        {
          id: 'q5',
          text: 'Bush continued his education by pursuing a Master in Business Administration (MBA) at Harvard University with the hopes of starting a career in business.',
          lang: 'en',
          cite: {
            source: 'millercenter-gregg-gw-bush-life-before-the-presidency',
            loc: { section: 'George W. Bush: Life Before the Presidency', para: '9' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-12',
            url: 'https://millercenter.org/president/gwbush/life-before-the-presidency'
          }
        }
      ]
    },
    {
      kind: 'career',
      quotes: [
        {
          id: 'q6',
          text: 'Bush served as a pilot in the Texas Air National Guard during the Vietnam War, but remained in the United States and saw no combat.',
          lang: 'en',
          cite: {
            source: 'millercenter-gregg-gw-bush-life-in-brief',
            loc: { section: 'George W. Bush: Life in Brief', para: '4' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-12',
            url: 'https://millercenter.org/president/gwbush/life-in-brief'
          }
        },
        {
          id: 'q7',
          text: 'Bush made his first run for public office in 1978, but failed to win the congressional seat he sought.',
          lang: 'en',
          cite: {
            source: 'millercenter-gregg-gw-bush-life-in-brief',
            loc: { section: 'George W. Bush: Life in Brief', para: '5' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-12',
            url: 'https://millercenter.org/president/gwbush/life-in-brief'
          }
        },
        {
          id: 'q8',
          text: 'After Bush won reelection as governor of Texas in 1998 with a resounding victory, many national political figures urged him to run for the presidency.',
          lang: 'en',
          cite: {
            source: 'millercenter-gregg-gw-bush-campaigns-and-elections',
            loc: { section: 'George W. Bush: Campaigns and Elections', para: '2' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-12',
            url: 'https://millercenter.org/president/gwbush/campaigns-and-elections'
          }
        },
        {
          id: 'q9',
          text: 'George W. Bush launched his administration against one of the most polarized political landscapes in recent memory.',
          lang: 'en',
          cite: {
            source: 'millercenter-gregg-gw-bush-life-in-brief',
            loc: { section: 'George W. Bush: Life in Brief', para: '6' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-12',
            url: 'https://millercenter.org/president/gwbush/life-in-brief'
          }
        },
        {
          id: 'q10',
          text: 'The most transformative event of the Bush presidency occurred on September 11, 2001.',
          lang: 'en',
          cite: {
            source: 'millercenter-gregg-gw-bush-life-in-brief',
            loc: { section: 'George W. Bush: Life in Brief', para: '10' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-12',
            url: 'https://millercenter.org/president/gwbush/life-in-brief'
          }
        },
        {
          id: 'q11',
          text: 'The Bush presidency began with conservative reform goals, such as lowering taxes, but became better known as the presidency that prosecuted America’s war on terror.',
          lang: 'en',
          cite: {
            source: 'millercenter-gregg-gw-bush-life-in-brief',
            loc: { section: 'George W. Bush: Life in Brief', para: '16' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-12',
            url: 'https://millercenter.org/president/gwbush/life-in-brief'
          }
        }
      ]
    },
    {
      kind: 'legacy',
      quotes: [
        {
          id: 'q12',
          text: 'The legacy of George W. Bush remains, much like his 2000 election, a subject of profound controversy, and any truly objective evaluation will likely be years in the future.',
          lang: 'en',
          cite: {
            source: 'millercenter-gregg-gw-bush-impact-and-legacy',
            loc: { section: 'George W. Bush: Impact and Legacy', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-12',
            url: 'https://millercenter.org/president/gwbush/impact-and-legacy'
          }
        },
        {
          id: 'q13',
          text: 'The Bush presidency transformed American politics, its economy, and its place in the world, but not in ways that could have been predicted when the governor of Texas declared his candidacy for America’s highest office.',
          lang: 'en',
          cite: {
            source: 'millercenter-gregg-gw-bush-impact-and-legacy',
            loc: { section: 'George W. Bush: Impact and Legacy', para: '7' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-12',
            url: 'https://millercenter.org/president/gwbush/impact-and-legacy'
          }
        }
      ]
    }
  ]
})
