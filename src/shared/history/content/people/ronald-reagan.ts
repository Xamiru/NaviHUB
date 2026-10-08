import { definePerson } from '../../schema'

export default definePerson({
  id: 'ronald-reagan',
  names: [
    { text: 'Ronald Reagan', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-08',
  born: {
    alts: [
      {
        value: { d: '1911-02-06' },
        cites: [
          {
            source: 'white-house-archive-biography-of-ronald-reagan',
            loc: { section: 'Biography of Ronald Reagan', para: '2' }
          }
        ]
      }
    ]
  },
  died: {
    alts: [
      {
        value: { d: '2004-06-05' },
        cites: [
          {
            source: 'white-house-2004-06-06-announcing-the-death-of-ronald-reagan',
            loc: { section: 'Announcing the Death of Ronald Reagan', para: '1' }
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
            value: { d: '1981-01-20' },
            cites: [
              {
                source: 'white-house-archive-biography-of-ronald-reagan',
                loc: { section: 'Biography of Ronald Reagan', para: '10' }
              }
            ]
          }
        ]
      },
      end: {
        alts: [
          {
            value: { d: '1989-01' },
            cites: [
              {
                source: 'state-dept-milestones-1981-1988-foreword',
                loc: { section: '1981–1988: The Presidency of Ronald W. Reagan', para: '8' }
              }
            ]
          }
        ]
      },
      cites: [
        {
          source: 'white-house-archive-biography-of-ronald-reagan',
          loc: { section: 'Biography of Ronald Reagan', para: '10' }
        },
        {
          source: 'state-dept-milestones-1981-1988-foreword',
          loc: { section: '1981–1988: The Presidency of Ronald W. Reagan', para: '8' }
        }
      ]
    }
  ],
  portrait: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/1/16/Official_Portrait_of_President_Reagan_1981.jpg/1280px-Official_Portrait_of_President_Reagan_1981.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Official_Portrait_of_President_Reagan_1981.jpg',
    credit: {
      institution: 'The White House (official portrait, via U.S. Department of Defense)',
      creator: 'Michael Evans'
    },
    license: { id: 'public-domain' }
  },
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'At the end of his two terms in office, Ronald Reagan viewed with satisfaction the achievements of his innovative program known as the Reagan Revolution',
          lang: 'en',
          cite: {
            source: 'white-house-archive-biography-of-ronald-reagan',
            loc: { section: 'Biography of Ronald Reagan', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://georgewbush-whitehouse.archives.gov/history/presidents/rr40.html'
          }
        },
        {
          id: 'q2',
          text: 'there is no question that Ronald Reagan and his foreign policy advisers played key roles in this remarkable turn of events.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-1981-1988-foreword',
            loc: { section: '1981–1988: The Presidency of Ronald W. Reagan', para: '8' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://history.state.gov/milestones/1981-1988/foreword'
          }
        }
      ]
    },
    {
      kind: 'early-life',
      quotes: [
        {
          id: 'q3',
          text: 'On February 6, 1911, Ronald Wilson Reagan was born to Nelle and John Reagan in Tampico, Illinois. He attended high school in nearby Dixon and then worked his way through Eureka College. There, he studied economics and sociology, played on the football team, and acted in school plays. Upon graduation, he became a radio sports announcer. A screen test in 1937 won him a contract in Hollywood. During the next two decades he appeared in 53 films.',
          lang: 'en',
          cite: {
            source: 'white-house-archive-biography-of-ronald-reagan',
            loc: { section: 'Biography of Ronald Reagan', para: '2' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://georgewbush-whitehouse.archives.gov/history/presidents/rr40.html'
          }
        }
      ]
    },
    {
      kind: 'career',
      quotes: [
        {
          id: 'q4',
          text: 'As president of the Screen Actors Guild, Reagan became embroiled in disputes over the issue of Communism in the film industry; his political views shifted from liberal to conservative. He toured the country as a television host, becoming a spokesman for conservatism. In 1966 he was elected Governor of California by a margin of a million votes; he was re-elected in 1970.',
          lang: 'en',
          cite: {
            source: 'white-house-archive-biography-of-ronald-reagan',
            loc: { section: 'Biography of Ronald Reagan', para: '8' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://georgewbush-whitehouse.archives.gov/history/presidents/rr40.html'
          }
        },
        {
          id: 'q5',
          text: 'Ronald Reagan won the Republican Presidential nomination in 1980 and chose as his running mate former Texas Congressman and United Nations Ambassador George Bush. Voters troubled by inflation and by the year-long confinement of Americans in Iran swept the Republican ticket into office. Reagan won 489 electoral votes to 49 for President Jimmy Carter.',
          lang: 'en',
          cite: {
            source: 'white-house-archive-biography-of-ronald-reagan',
            loc: { section: 'Biography of Ronald Reagan', para: '9' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://georgewbush-whitehouse.archives.gov/history/presidents/rr40.html'
          }
        },
        {
          id: 'q6',
          text: 'On January 20, 1981, Reagan took office. Only 69 days later he was shot by a would-be assassin, but quickly recovered and returned to duty. His grace and wit during the dangerous incident caused his popularity to soar.',
          lang: 'en',
          cite: {
            source: 'white-house-archive-biography-of-ronald-reagan',
            loc: { section: 'Biography of Ronald Reagan', para: '10' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://georgewbush-whitehouse.archives.gov/history/presidents/rr40.html'
          }
        },
        {
          id: 'q7',
          text: 'The principal foreign policy framework for the Ronald Reagan administration rejected acquiescence in the Cold War status quo that had emerged during the Nixon, Ford, and Carter presidencies. Reagan objected to the implied moral equivalency of détente, insisting instead on the superiority of representative government, free-market capitalism, and freedom of conscience over what he viewed as godless, collectivist, Communism. This more confrontational approach eventually came to be labeled the “Reagan Doctrine,” which advocated opposition to Communist-supported regimes wherever they existed, as well as a willingness to directly challenge the Soviet Union on a variety of fronts.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-1981-1988-foreword',
            loc: { section: '1981–1988: The Presidency of Ronald W. Reagan', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://history.state.gov/milestones/1981-1988/foreword'
          }
        },
        {
          id: 'q8',
          text: 'The emergence of Mikhail Gorbachev as the principal Soviet leader provided Reagan with a partner willing to engage in substantive negotiations. A series of summit meetings ensued which reduced tensions and produced concrete results, such as the 1987 Intermediate-Range Nuclear Forces Treaty (INF) that eliminated the deployment of theater-level nuclear missiles in Europe.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-1981-1988-foreword',
            loc: { section: '1981–1988: The Presidency of Ronald W. Reagan', para: '5' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://history.state.gov/milestones/1981-1988/foreword'
          }
        },
        {
          id: 'q9',
          text: 'At Reykjavik in October 1986, Reagan and Gorbachev discussed the prospect of abolishing all nuclear weapons.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-us-soviet-relations-1981-1991',
            loc: { section: 'U.S.-Soviet Relations, 1981–1991', para: '7' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://history.state.gov/milestones/1981-1988/u.s.-soviet-relations'
          }
        }
      ]
    },
    {
      kind: 'death',
      quotes: [
        {
          id: 'q10',
          text: 'It is my sad duty to announce officially the death of Ronald Reagan, the fortieth President of the United States, on June 5, 2004.',
          lang: 'en',
          cite: {
            source: 'white-house-2004-06-06-announcing-the-death-of-ronald-reagan',
            loc: { section: 'Announcing the Death of Ronald Reagan', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://georgewbush-whitehouse.archives.gov/news/releases/2004/06/20040606-1.html'
          }
        }
      ]
    },
    {
      kind: 'in-their-words',
      quotes: [
        {
          id: 'q11',
          text: 'General Secretary Gorbachev, if you seek peace, if you seek prosperity for the Soviet Union and Eastern Europe, if you seek liberalization: Come here to this gate! Mr. Gorbachev, open this gate! Mr. Gorbachev, tear down this wall!',
          lang: 'en',
          cite: {
            source: 'reagan-lib-1987-06-12-remarks-at-the-brandenburg-gate',
            loc: { section: 'Remarks at the Brandenburg Gate', para: '12' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.reaganlibrary.gov/archives/speech/remarks-east-west-relations-brandenburg-gate-west-berlin'
          }
        },
        {
          id: 'q12',
          text: 'The maxim is: Dovorey no provorey -- trust, but verify.',
          lang: 'en',
          cite: {
            source: 'reagan-lib-1987-12-08-remarks-on-signing-the-inf-treaty',
            loc: {
              section: 'Remarks on Signing the Intermediate-Range Nuclear Forces Treaty',
              para: '5'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.reaganlibrary.gov/archives/speech/remarks-signing-intermediate-range-nuclear-forces-treaty'
          }
        }
      ]
    }
  ]
})
