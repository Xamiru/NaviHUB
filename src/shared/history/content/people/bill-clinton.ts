import { definePerson } from '../../schema'

export default definePerson({
  id: 'bill-clinton',
  names: [
    { text: 'Bill Clinton', lang: 'en', role: 'primary' },
    {
      text: 'William Jefferson Clinton',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'millercenter-riley-clinton-life-before-the-presidency',
          loc: { section: 'Bill Clinton: Life Before the Presidency', para: '1' }
        }
      ]
    }
  ],
  researched: '2026-10-10',
  born: {
    alts: [
      {
        value: { d: '1946-08-19' },
        cites: [
          {
            source: 'millercenter-riley-clinton-life-before-the-presidency',
            loc: { section: 'Bill Clinton: Life Before the Presidency', para: '1' }
          },
          {
            source: 'lc-names-clinton-bill-n82029644',
            loc: { section: 'Clinton, Bill, 1946-' }
          }
        ]
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
            value: { d: '1993-01' },
            cites: [
              {
                source: 'state-dept-milestones-bill-clinton-boris-yeltsin-and-us-russian-relations',
                loc: {
                  section: 'Bill Clinton, Boris Yeltsin, and U.S.-Russian Relations',
                  para: '1'
                }
              }
            ]
          }
        ]
      },
      cites: [
        {
          source: 'state-dept-milestones-bill-clinton-boris-yeltsin-and-us-russian-relations',
          loc: { section: 'Bill Clinton, Boris Yeltsin, and U.S.-Russian Relations', para: '1' }
        }
      ]
    }
  ],
  portrait: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/b/b8/Official_Portrait_of_President_William_Jefferson_Clinton_-_DPLA_-_4697184146b3b6e2d6791b8f3c297476.jpg/1280px-Official_Portrait_of_President_William_Jefferson_Clinton_-_DPLA_-_4697184146b3b6e2d6791b8f3c297476.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Official_Portrait_of_President_William_Jefferson_Clinton_-_DPLA_-_4697184146b3b6e2d6791b8f3c297476.jpg',
    credit: { institution: 'William J. Clinton Presidential Library (via DPLA)' },
    license: { id: 'public-domain' }
  },
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'William Jefferson Clinton, the young President from Hope, Arkansas, succeeded where no other Democrat had since Franklin Roosevelt: he was reelected to a second term.',
          lang: 'en',
          cite: {
            source: 'millercenter-riley-clinton-life-in-brief',
            loc: { section: 'Bill Clinton: Life in Brief', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'https://millercenter.org/president/clinton/life-in-brief'
          }
        }
      ]
    },
    {
      kind: 'early-life',
      quotes: [
        {
          id: 'q2',
          text: 'William Jefferson Clinton spent the first six years of his life in Hope, Arkansas, where he was born on August 19, 1946.',
          lang: 'en',
          cite: {
            source: 'millercenter-riley-clinton-life-before-the-presidency',
            loc: { section: 'Bill Clinton: Life Before the Presidency', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'https://millercenter.org/president/clinton/life-before-the-presidency'
          }
        },
        {
          id: 'q3',
          text: 'In 1970, Clinton entered Yale Law School, earning his degree in 1973 and meeting his future wife, Hillary Rodham, whom he married in 1975.',
          lang: 'en',
          cite: {
            source: 'millercenter-riley-clinton-life-before-the-presidency',
            loc: { section: 'Bill Clinton: Life Before the Presidency', para: '10' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'https://millercenter.org/president/clinton/life-before-the-presidency'
          }
        }
      ]
    },
    {
      kind: 'career',
      quotes: [
        {
          id: 'q4',
          text: 'After graduation, Clinton moved back to Arkansas with a job teaching law at the University of Arkansas in Fayetteville.',
          lang: 'en',
          cite: {
            source: 'millercenter-riley-clinton-life-before-the-presidency',
            loc: { section: 'Bill Clinton: Life Before the Presidency', para: '10' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'https://millercenter.org/president/clinton/life-before-the-presidency'
          }
        },
        {
          id: 'q5',
          text: 'Almost as soon as he arrived home, Clinton threw himself into politics, running for a seat in the U.S. House of Representatives against incumbent Republican John Paul Hammerschmidt.',
          lang: 'en',
          cite: {
            source: 'millercenter-riley-clinton-life-before-the-presidency',
            loc: { section: 'Bill Clinton: Life Before the Presidency', para: '10' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'https://millercenter.org/president/clinton/life-before-the-presidency'
          }
        },
        {
          id: 'q6',
          text: 'Then in 1978, at age thirty-two, Clinton ran for governor, winning an easy victory and becoming one of the nation\'s youngest governors ever.',
          lang: 'en',
          cite: {
            source: 'millercenter-riley-clinton-life-before-the-presidency',
            loc: { section: 'Bill Clinton: Life Before the Presidency', para: '11' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'https://millercenter.org/president/clinton/life-before-the-presidency'
          }
        },
        {
          id: 'q7',
          text: 'In the 1982 race, Clinton admitted his mistakes and used his incredible charm and well-honed TV ads to convince the voters to give him another chance.',
          lang: 'en',
          cite: {
            source: 'millercenter-riley-clinton-life-before-the-presidency',
            loc: { section: 'Bill Clinton: Life Before the Presidency', para: '12' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'https://millercenter.org/president/clinton/life-before-the-presidency'
          }
        },
        {
          id: 'q8',
          text: 'As governor, Clinton championed centrist issues.',
          lang: 'en',
          cite: {
            source: 'millercenter-riley-clinton-life-before-the-presidency',
            loc: { section: 'Bill Clinton: Life Before the Presidency', para: '13' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'https://millercenter.org/president/clinton/life-before-the-presidency'
          }
        },
        {
          id: 'q9',
          text: 'Bill Clinton easily defeated the leading Democratic contenders in the 1992 primaries, despite charges about having avoided the Vietnam draft and his rumored affairs with women.',
          lang: 'en',
          cite: {
            source: 'millercenter-riley-clinton-campaigns-and-elections',
            loc: { section: 'Bill Clinton: Campaigns and Elections', para: '2' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'https://millercenter.org/president/clinton/campaigns-and-elections'
          }
        },
        {
          id: 'q10',
          text: 'On November 3, Clinton received more than twice the number of Electoral College votes than did Bush.',
          lang: 'en',
          cite: {
            source: 'millercenter-riley-clinton-campaigns-and-elections',
            loc: { section: 'Bill Clinton: Campaigns and Elections', para: '5' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'https://millercenter.org/president/clinton/campaigns-and-elections'
          }
        },
        {
          id: 'q11',
          text: 'Upon his inauguration in January 1993, President Bill Clinton became the first president since Franklin Roosevelt who did not need a strategy for the Cold War—and the first since William Howard Taft who did not need a policy for the Soviet Union.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-bill-clinton-boris-yeltsin-and-us-russian-relations',
            loc: { section: 'Bill Clinton, Boris Yeltsin, and U.S.-Russian Relations', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'https://history.state.gov/milestones/1993-2000/clinton-yeltsin'
          }
        },
        {
          id: 'q12',
          text: 'After two years of keeping U.S. involvement in the conflict to a minimum, Clinton was eventually moved by Serbian atrocities against Bosnian civilians.',
          lang: 'en',
          cite: {
            source: 'millercenter-riley-clinton-foreign-affairs',
            loc: { section: 'Bill Clinton: Foreign Affairs', para: '9' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'https://millercenter.org/president/clinton/foreign-affairs'
          }
        },
        {
          id: 'q13',
          text: 'In 1999, Clinton moved with NATO to begin a massive bombing campaign against the Serbian government to end its "ethnic cleansing" of Albanians in the Kosovo region.',
          lang: 'en',
          cite: {
            source: 'millercenter-riley-clinton-foreign-affairs',
            loc: { section: 'Bill Clinton: Foreign Affairs', para: '10' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'https://millercenter.org/president/clinton/foreign-affairs'
          }
        },
        {
          id: 'q14',
          text: 'Additionally, the Clinton presidency will certainly be studied and evaluated in terms of its major domestic success: eliminating the federal deficit and overseeing the strongest economy in recent memory.',
          lang: 'en',
          cite: {
            source: 'millercenter-riley-clinton-impact-and-legacy',
            loc: { section: 'Bill Clinton: Impact and Legacy', para: '3' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'https://millercenter.org/president/clinton/impact-and-legacy'
          }
        }
      ]
    }
  ]
})
