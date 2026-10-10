import { definePerson } from '../../schema'

export default definePerson({
  id: 'slobodan-milosevic',
  names: [
    { text: 'Slobodan Milošević', lang: 'en', role: 'primary' },
    { text: 'Слободан Милошевић', lang: 'sr', role: 'native', translit: 'Slobodan Milošević' }
  ],
  researched: '2026-10-10',
  born: {
    alts: [
      {
        value: { d: '1941' },
        cites: [
          {
            source: 'lc-names-milosevic-slobodan-n88221123',
            loc: { section: 'Milošević, Slobodan, 1941-2006' }
          }
        ]
      }
    ]
  },
  died: {
    alts: [
      {
        value: { d: '2006-03-11' },
        cites: [
          {
            source: 'hrw-2006-weighing-the-evidence-lessons-from-the-milosevic-trial',
            loc: { section: 'Weighing the Evidence', para: '59' }
          }
        ]
      }
    ]
  },
  regions: ['europe'],
  roles: ['head-of-state', 'politician'],
  offices: [
    {
      title: 'President of Serbia',
      start: {
        alts: [
          {
            value: { d: '1989-05-08' },
            cites: [
              {
                source: 'hrw-2001-under-orders-background',
                loc: { section: 'Background', para: '39' }
              }
            ]
          }
        ]
      },
      end: {
        alts: [
          {
            value: { d: '1997-07-23' },
            cites: [
              {
                source: 'hrw-2001-under-orders-background',
                loc: { section: 'Background', para: '39' }
              }
            ]
          }
        ]
      },
      cites: [
        {
          source: 'hrw-2001-under-orders-background',
          loc: { section: 'Background', para: '39' }
        }
      ]
    },
    {
      title: 'President of the Federal Republic of Yugoslavia',
      start: {
        alts: [
          {
            value: { d: '1997-07-23' },
            cites: [
              {
                source: 'hrw-2001-under-orders-background',
                loc: { section: 'Background', para: '39' }
              }
            ]
          }
        ]
      },
      end: {
        alts: [
          {
            value: { d: '2000-10' },
            cites: [
              {
                source: 'hrw-2001-under-orders-background',
                loc: { section: 'Background', para: '39' }
              }
            ]
          }
        ]
      },
      cites: [
        {
          source: 'hrw-2001-under-orders-background',
          loc: { section: 'Background', para: '39' }
        }
      ]
    }
  ],
  portrait: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/b/b3/Slobodan_Milo%C5%A1evi%C4%87_1995.png',
    page: 'https://commons.wikimedia.org/wiki/File:Slobodan_Milo%C5%A1evi%C4%87_1995.png',
    credit: { institution: 'NATO' },
    license: { id: 'public-domain' }
  },
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'Slobodan Milosevic, Serbia’s president from 1989, took advantage of the vacuum created by a progressively weakening central state and brutally deployed the use of Serbian ultra-nationalism to fan the flames of conflict in the other republics and gain legitimacy at home.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-the-breakup-of-yugoslavia-1990-1992',
            loc: { section: 'The Breakup of Yugoslavia, 1990–1992', para: '7' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'https://history.state.gov/milestones/1989-1992/breakup-yugoslavia'
          }
        }
      ]
    },
    {
      kind: 'early-life',
      quotes: [
        {
          id: 'q2',
          text: 'Milosevic started as a banker in Belgrade and became involved in politics in the mid-1980s.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-the-breakup-of-yugoslavia-1990-1992',
            loc: { section: 'The Breakup of Yugoslavia, 1990–1992', para: '7' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'https://history.state.gov/milestones/1989-1992/breakup-yugoslavia'
          }
        },
        {
          id: 'q3',
          text: 'He rose quickly through the ranks to become head of the Serbian Communist Party in 1986.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-the-breakup-of-yugoslavia-1990-1992',
            loc: { section: 'The Breakup of Yugoslavia, 1990–1992', para: '7' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'https://history.state.gov/milestones/1989-1992/breakup-yugoslavia'
          }
        }
      ]
    },
    {
      kind: 'career',
      quotes: [
        {
          id: 'q4',
          text: 'While attending a party meeting in the Albanian-dominated province of Kosovo in May 1987, Serbians in the province rioted outside the meeting hall. Milosevic spoke with the rioters and listened to their complaints of mistreatment by the Albanian majority.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-the-breakup-of-yugoslavia-1990-1992',
            loc: { section: 'The Breakup of Yugoslavia, 1990–1992', para: '7' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'https://history.state.gov/milestones/1989-1992/breakup-yugoslavia'
          }
        },
        {
          id: 'q5',
          text: 'Riding an ever stronger wave of nationalism, Slobodan Milosevic was elected president of Serbia on May 8, 1989, a post he held for the next eight years, until he was elected president of Yugoslavia on July 23, 1997-the position he held until October 2000.',
          lang: 'en',
          cite: {
            source: 'hrw-2001-under-orders-background',
            loc: { section: 'Background', para: '39' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'https://www.hrw.org/reports/2001/kosovo/undword-01.htm'
          }
        },
        {
          id: 'q6',
          text: 'He moved to strip the two autonomous provinces of Kosovo and Vojvodina of their constitutionally-guaranteed autonomy within Serbia by using mass rallies to force the local leaderships to resign in favor of his own preferred candidates.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-the-breakup-of-yugoslavia-1990-1992',
            loc: { section: 'The Breakup of Yugoslavia, 1990–1992', para: '7' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'https://history.state.gov/milestones/1989-1992/breakup-yugoslavia'
          }
        },
        {
          id: 'q7',
          text: 'According to Yugoslav law, in a declared state of war, the Yugoslav Army has jurisdiction over the Serbian police, thereby making Slobodan Milosevic the de facto and de jure commander of the police during the period of NATO bombing.',
          lang: 'en',
          cite: {
            source: 'hrw-2001-under-orders-executive-summary',
            loc: { section: 'Executive Summary', para: '35' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'https://www.hrw.org/reports/2001/kosovo/undword.htm'
          }
        },
        {
          id: 'q8',
          text: 'Local authorities arrested Slobodan Milosevic in Belgrade on April 1, 2001, six months after his fall from power.',
          lang: 'en',
          cite: {
            source: 'hrw-2006-weighing-the-evidence-lessons-from-the-milosevic-trial',
            loc: { section: 'Weighing the Evidence', para: '78' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'https://www.hrw.org/reports/2006/milosevic1206/milosevic1206.htm'
          }
        }
      ]
    },
    {
      kind: 'death',
      quotes: [
        {
          id: 'q9',
          text: 'Slobodan Milosevic’s death on March 11, 2006, shortly before the conclusion of the defense case, ended the “trial of the century,” depriving the many victims of a final judgment in the most comprehensive proceedings regarding the events in the region.',
          lang: 'en',
          cite: {
            source: 'hrw-2006-weighing-the-evidence-lessons-from-the-milosevic-trial',
            loc: { section: 'Weighing the Evidence', para: '59' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'https://www.hrw.org/reports/2006/milosevic1206/milosevic1206.htm'
          }
        }
      ]
    }
  ]
})
