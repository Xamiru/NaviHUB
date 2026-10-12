import { definePerson } from '../../schema'

export default definePerson({
  id: 'barack-obama',
  names: [
    { text: 'Barack Obama', lang: 'en', role: 'primary' },
    {
      text: 'Barack Hussein Obama II',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'millercenter-nelson-obama-life-before-the-presidency',
          loc: { section: 'Barack Obama: Life Before the Presidency', para: '2' }
        }
      ]
    },
    {
      text: 'Barry',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'millercenter-nelson-obama-overview',
          loc: { section: 'Barack Obama', para: '28' }
        }
      ]
    }
  ],
  researched: '2026-10-12',
  born: {
    alts: [
      {
        value: { d: '1961-08-04' },
        cites: [
          {
            source: 'millercenter-nelson-obama-life-before-the-presidency',
            loc: { section: 'Barack Obama: Life Before the Presidency', para: '2' }
          },
          {
            source: 'millercenter-nelson-obama-overview',
            loc: { section: 'Barack Obama', para: '16' }
          },
          { source: 'lc-names-obama-barack-n94112934', loc: { section: 'Obama, Barack' } }
        ]
      }
    ]
  },
  bornIn: {
    ref: 'place:honolulu',
    cites: [
      {
        source: 'millercenter-nelson-obama-overview',
        loc: { section: 'Barack Obama', para: '18' }
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
            value: { d: '2009-01-20' },
            cites: [
              {
                source: 'millercenter-nelson-obama-life-in-brief',
                loc: { section: 'Barack Obama: Life in Brief', para: '2' }
              },
              {
                source: 'millercenter-nelson-obama-overview',
                loc: { section: 'Barack Obama', para: '34' }
              }
            ]
          }
        ]
      },
      end: {
        alts: [
          {
            value: { d: '2017-01-20' },
            cites: [
              {
                source: 'millercenter-nelson-obama-life-in-brief',
                loc: { section: 'Barack Obama: Life in Brief', para: '6' }
              },
              {
                source: 'millercenter-nelson-obama-overview',
                loc: { section: 'Barack Obama', para: '36' }
              }
            ]
          }
        ]
      },
      cites: [
        {
          source: 'millercenter-nelson-obama-life-in-brief',
          loc: { section: 'Barack Obama: Life in Brief', para: '2' }
        },
        {
          source: 'millercenter-nelson-obama-life-in-brief',
          loc: { section: 'Barack Obama: Life in Brief', para: '6' }
        }
      ]
    }
  ],
  portrait: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/2/2b/Barack_Obama_2012_%284x5%29.png/1280px-Barack_Obama_2012_%284x5%29.png',
    page: 'https://commons.wikimedia.org/wiki/File:Barack_Obama_2012_(4x5).png',
    credit: { institution: 'The White House', creator: 'Pete Souza' },
    license: { id: 'public-domain' }
  },
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'Barack Obama was inaugurated as the 44th president of the United States—becoming the first African American to serve in that office—on January 20, 2009.',
          lang: 'en',
          cite: {
            source: 'millercenter-nelson-obama-life-in-brief',
            loc: { section: 'Barack Obama: Life in Brief', para: '2' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-12',
            url: 'https://millercenter.org/president/obama/life-in-brief'
          }
        }
      ]
    },
    {
      kind: 'early-life',
      quotes: [
        {
          id: 'q2',
          text: 'Barack Hussein Obama II was born on August 4, 1961, in Hawaii.',
          lang: 'en',
          cite: {
            source: 'millercenter-nelson-obama-life-before-the-presidency',
            loc: { section: 'Barack Obama: Life Before the Presidency', para: '2' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-12',
            url: 'https://millercenter.org/president/obama/life-before-the-presidency'
          }
        },
        {
          id: 'q3',
          text: 'Obama left Hawaii for college, enrolling first at Occidental College in Los Angeles for his freshman and sophomore years, and then at Columbia University in New York City.',
          lang: 'en',
          cite: {
            source: 'millercenter-nelson-obama-life-before-the-presidency',
            loc: { section: 'Barack Obama: Life Before the Presidency', para: '5' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-12',
            url: 'https://millercenter.org/president/obama/life-before-the-presidency'
          }
        },
        {
          id: 'q4',
          text: 'In 1988, Obama enrolled at Harvard Law School, where he excelled as a student, graduating magna cum laude and winning election as president of the prestigious Harvard Law Review for the academic year 1990-1991.',
          lang: 'en',
          cite: {
            source: 'millercenter-nelson-obama-life-before-the-presidency',
            loc: { section: 'Barack Obama: Life Before the Presidency', para: '7' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-12',
            url: 'https://millercenter.org/president/obama/life-before-the-presidency'
          }
        }
      ]
    },
    {
      kind: 'career',
      quotes: [
        {
          id: 'q5',
          text: 'Obama\'s main assignment as an organizer was to launch the church-funded Developing Communities Project and, in particular, to organize residents of Altgeld Gardens to pressure Chicago\'s city hall to improve conditions in the poorly maintained public housing project.',
          lang: 'en',
          cite: {
            source: 'millercenter-nelson-obama-life-before-the-presidency',
            loc: { section: 'Barack Obama: Life Before the Presidency', para: '6' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-12',
            url: 'https://millercenter.org/president/obama/life-before-the-presidency'
          }
        },
        {
          id: 'q6',
          text: 'After directing Illinois Project Vote, a voter registration drive aimed at increasing black turnout in the 1992 election, Obama accepted positions as an attorney with the civil rights law firm of Miner, Barnhill and Galland and as a lecturer at the University of Chicago Law School.',
          lang: 'en',
          cite: {
            source: 'millercenter-nelson-obama-life-before-the-presidency',
            loc: { section: 'Barack Obama: Life Before the Presidency', para: '9' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-12',
            url: 'https://millercenter.org/president/obama/life-before-the-presidency'
          }
        },
        {
          id: 'q7',
          text: 'Advised by political consultant David Axelrod, who had a strong record of helping black candidates succeed in majority-white constituencies, Obama assembled a coalition of African Americans and white liberals to win the Democratic Senate primary with 53 percent of the vote, more than all five of his opponents combined.',
          lang: 'en',
          cite: {
            source: 'millercenter-nelson-obama-life-before-the-presidency',
            loc: { section: 'Barack Obama: Life Before the Presidency', para: '13' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-12',
            url: 'https://millercenter.org/president/obama/life-before-the-presidency'
          }
        },
        {
          id: 'q8',
          text: 'Obama was elected handily on November 4, 2008.',
          lang: 'en',
          cite: {
            source: 'millercenter-nelson-obama-campaigns-and-elections',
            loc: { section: 'Barack Obama: Campaigns and Elections', para: '11' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-12',
            url: 'https://millercenter.org/president/obama/campaigns-and-elections'
          }
        },
        {
          id: 'q9',
          text: 'When President Obama took office, he faced very significant challenges.',
          lang: 'en',
          cite: {
            source: 'millercenter-nelson-obama-life-in-brief',
            loc: { section: 'Barack Obama: Life in Brief', para: '4' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-12',
            url: 'https://millercenter.org/president/obama/life-in-brief'
          }
        },
        {
          id: 'q10',
          text: 'During the first two years of his first term, President Obama was able to work with the Democratic-controlled Congress to improve the economy, pass health-care reform legislation, and withdraw most US troops from Iraq.',
          lang: 'en',
          cite: {
            source: 'millercenter-nelson-obama-life-in-brief',
            loc: { section: 'Barack Obama: Life in Brief', para: '5' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-12',
            url: 'https://millercenter.org/president/obama/life-in-brief'
          }
        },
        {
          id: 'q11',
          text: 'Buttressing Obama’s credentials on military matters was the May 2, 2011, killing of al Qaeda’s leader, Osama bin Laden, by a team of Navy SEALS.',
          lang: 'en',
          cite: {
            source: 'millercenter-nelson-obama-foreign-affairs',
            loc: { section: 'Barack Obama: Foreign Affairs', para: '6' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-12',
            url: 'https://millercenter.org/president/obama/foreign-affairs'
          }
        },
        {
          id: 'q12',
          text: 'Obama left the presidency, at age fifty-five, after his constitutionally limited two terms ended on January 20, 2017.',
          lang: 'en',
          cite: {
            source: 'millercenter-nelson-obama-life-in-brief',
            loc: { section: 'Barack Obama: Life in Brief', para: '6' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-12',
            url: 'https://millercenter.org/president/obama/life-in-brief'
          }
        }
      ]
    },
    {
      kind: 'legacy',
      quotes: [
        {
          id: 'q13',
          text: 'When President Obama left office on January 20, 2017, his impact and legacy were unclear.',
          lang: 'en',
          cite: {
            source: 'millercenter-nelson-obama-impact-and-legacy',
            loc: { section: 'Barack Obama: Impact and Legacy', para: '2' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-12',
            url: 'https://millercenter.org/president/obama/impact-and-legacy'
          }
        },
        {
          id: 'q14',
          text: 'Obama’s lasting impact on American life may turn out to have been greatest in terms of the crises that did not happen.',
          lang: 'en',
          cite: {
            source: 'millercenter-nelson-obama-impact-and-legacy',
            loc: { section: 'Barack Obama: Impact and Legacy', para: '3' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-12',
            url: 'https://millercenter.org/president/obama/impact-and-legacy'
          }
        }
      ]
    }
  ]
})
