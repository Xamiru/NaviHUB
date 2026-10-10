import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'kargil-war',
  names: [
    { text: 'Kargil War', lang: 'en', role: 'primary' },
    {
      text: 'Kargil conflict',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'acronym-1999-06-the-kashmir-crisis',
          loc: { section: 'The Kashmir Crisis', para: '1' }
        }
      ]
    },
    {
      text: 'Operation Vijay',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'india-mea-1999-07-12-press-release-on-the-success-of-kargil-operations',
          loc: { section: 'Press Release on the success of Kargil Operations', para: '-103' }
        }
      ],
      usedBy: [
        { kind: 'state', name: 'India' }
      ]
    }
  ],
  researched: '2026-10-10',
  type: 'war',
  start: {
    alts: [
      {
        value: { d: '1999-05' },
        cites: [
          {
            source: 'hrw-2000-world-report-india',
            loc: { section: 'Human Rights Watch World Report 2000: India', para: '4' }
          },
          {
            source: 'acronym-1999-07-the-kashmir-dispute',
            loc: { section: 'The Kashmir Dispute', para: '1' }
          }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1999-07' },
        cites: [
          {
            source: 'acronym-1999-07-the-kashmir-dispute',
            loc: { section: 'The Kashmir Dispute', para: '1' }
          }
        ]
      }
    ]
  },
  regions: ['south-asia'],
  prominence: 2,
  places: [
    {
      ref: 'place:kashmir',
      cites: [
        {
          source: 'hrw-2000-world-report-india',
          loc: { section: 'Human Rights Watch World Report 2000: India', para: '4' }
        }
      ]
    },
    {
      ref: 'place:kargil',
      cites: [
        {
          source: 'hrw-2000-world-report-india',
          loc: { section: 'Human Rights Watch World Report 2000: India', para: '4' }
        }
      ]
    }
  ],
  polities: [
    { ref: 'polity:india' },
    { ref: 'polity:pakistan' }
  ],
  sides: [
    {
      key: 'india',
      name: 'India',
      polity: 'polity:india',
      cites: [
        {
          source: 'hrw-2000-world-report-india',
          loc: { section: 'Human Rights Watch World Report 2000: India', para: '4' }
        }
      ]
    },
    {
      key: 'pakistan',
      name: 'Pakistan',
      polity: 'polity:pakistan',
      cites: [
        {
          source: 'hrw-2000-world-report-pakistan',
          loc: { section: 'Human Rights Watch World Report 2000: Pakistan', para: '2' }
        }
      ]
    }
  ],
  participants: [
    {
      name: 'Nawaz Sharif',
      role: 'head-of-government',
      side: 'pakistan',
      cites: [
        {
          source: 'hrw-2000-world-report-pakistan',
          loc: { section: 'Human Rights Watch World Report 2000: Pakistan', para: '2' }
        }
      ]
    },
    {
      name: 'Atal Bihari Vajpayee',
      role: 'head-of-government',
      side: 'india',
      cites: [
        {
          source: 'hrw-2000-world-report-india',
          loc: { section: 'Human Rights Watch World Report 2000: India', para: '4' }
        }
      ]
    },
    {
      name: 'Pervez Musharraf',
      role: 'commander',
      side: 'pakistan',
      cites: [
        {
          source: 'hrw-2000-world-report-pakistan',
          loc: { section: 'Human Rights Watch World Report 2000: Pakistan', para: '1' }
        }
      ]
    }
  ],
  related: [
    {
      ref: 'event:1998-nuclear-tests-in-india-and-pakistan',
      rel: 'preceded-by',
      cites: [
        {
          source: 'hrw-2000-world-report-india',
          loc: { section: 'Human Rights Watch World Report 2000: India', para: '4' }
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
          text: 'In May, after Islamic militants crossed from Pakistan into Indian Kashmir near the town of Kargil, India responded with military operations against the militants and their Pakistani backers.',
          lang: 'en',
          cite: {
            source: 'hrw-2000-world-report-india',
            loc: { section: 'Human Rights Watch World Report 2000: India', para: '4' }
          },
          provenance: { via: 'web', at: '2026-10-10', url: 'https://www.hrw.org/legacy/wr2k/Asia-04.htm' }
        },
        {
          id: 'q2',
          text: 'Pakistan consistently denied the involvement of any of its regular armed personnel in the fighting in Kargil.',
          lang: 'en',
          cite: {
            source: 'acronym-1999-07-the-kashmir-dispute',
            loc: { section: 'The Kashmir Dispute', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'http://www.acronym.org.uk/old/archive/dd/dd39/39kash.htm'
          }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q3',
          text: 'In February, Indian Prime Minister Atal Behari Vajpayee\'s bus trip across the Indo-Pakistan border to meet with Pakistani Prime Minister Nawaz Sharif seemed to signal the beginnings of a reconciliation and hopes for a resolution of the Kashmir conflict.',
          lang: 'en',
          cite: {
            source: 'hrw-2000-world-report-india',
            loc: { section: 'Human Rights Watch World Report 2000: India', para: '4' }
          },
          provenance: { via: 'web', at: '2026-10-10', url: 'https://www.hrw.org/legacy/wr2k/Asia-04.htm' }
        },
        {
          id: 'q4',
          text: 'In April India tested ballistic missiles and Pakistan followed suit.',
          lang: 'en',
          cite: {
            source: 'hrw-2000-world-report-india',
            loc: { section: 'Human Rights Watch World Report 2000: India', para: '4' }
          },
          provenance: { via: 'web', at: '2026-10-10', url: 'https://www.hrw.org/legacy/wr2k/Asia-04.htm' }
        }
      ]
    },
    {
      kind: 'course',
      quotes: [
        {
          id: 'q5',
          text: 'Armed clashes between India and Pakistan continued for the next eight weeks, until Pakistan agreed to withdraw the militants, and both countries agreed on a process of "disengagement."',
          lang: 'en',
          cite: {
            source: 'hrw-2000-world-report-india',
            loc: { section: 'Human Rights Watch World Report 2000: India', para: '4' }
          },
          provenance: { via: 'web', at: '2026-10-10', url: 'https://www.hrw.org/legacy/wr2k/Asia-04.htm' }
        },
        {
          id: 'q6',
          text: 'Despite this significant de-escalation of tension between the two States, however, serious incidents continued throughout the period under review in this issue - see News Review for more coverage.',
          lang: 'en',
          cite: {
            source: 'acronym-1999-07-the-kashmir-dispute',
            loc: { section: 'The Kashmir Dispute', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'http://www.acronym.org.uk/old/archive/dd/dd39/39kash.htm'
          }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q7',
          text: 'As 1999 drew to a close, the government of Prime Minister Nawaz Sharif confronted mounting sectarian violence, a unified opposition demanding new elections, and escalating tension with the military.',
          lang: 'en',
          cite: {
            source: 'hrw-2000-world-report-pakistan',
            loc: { section: 'Human Rights Watch World Report 2000: Pakistan', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-10', url: 'https://www.hrw.org/legacy/wr2k/Asia-07.htm' }
        },
        {
          id: 'q8',
          text: 'The most dramatic development during the year was the bloodless coup on October 12.',
          lang: 'en',
          cite: {
            source: 'hrw-2000-world-report-pakistan',
            loc: { section: 'Human Rights Watch World Report 2000: Pakistan', para: '4' }
          },
          provenance: { via: 'web', at: '2026-10-10', url: 'https://www.hrw.org/legacy/wr2k/Asia-07.htm' }
        }
      ]
    }
  ],
  course: [
    {
      date: {
        alts: [
          {
            value: { d: '1999-07-09' },
            cites: [
              {
                source: 'acronym-1999-07-the-kashmir-dispute',
                loc: { section: 'The Kashmir Dispute', para: '1' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q9',
        text: 'On 9 July, India and Pakistan agreed a deadline of 16 July for the completion of the withdrawal of insurgent forces.',
        lang: 'en',
        cite: {
          source: 'acronym-1999-07-the-kashmir-dispute',
          loc: { section: 'The Kashmir Dispute', para: '1' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-10',
          url: 'http://www.acronym.org.uk/old/archive/dd/dd39/39kash.htm'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1999-07-12' },
            cites: [
              {
                source: 'acronym-1999-07-the-kashmir-dispute',
                loc: { section: 'The Kashmir Dispute', para: '1' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q10',
        text: 'On 12 July, India announced that all Pakistan regular forces had withdrawn.',
        lang: 'en',
        cite: {
          source: 'acronym-1999-07-the-kashmir-dispute',
          loc: { section: 'The Kashmir Dispute', para: '1' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-10',
          url: 'http://www.acronym.org.uk/old/archive/dd/dd39/39kash.htm'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1999-10-12' },
            cites: [
              {
                source: 'hrw-2000-world-report-pakistan',
                loc: { section: 'Human Rights Watch World Report 2000: Pakistan', para: '4' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q11',
        text: 'Prime Minister Sharif dismissed General Parvez Musharraf as army chief, then tried to prevent the general\'s plane, en route from Sri Lanka, from landing in Karachi.',
        lang: 'en',
        cite: {
          source: 'hrw-2000-world-report-pakistan',
          loc: { section: 'Human Rights Watch World Report 2000: Pakistan', para: '4' }
        },
        provenance: { via: 'web', at: '2026-10-10', url: 'https://www.hrw.org/legacy/wr2k/Asia-07.htm' }
      }
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/f/f3/Kargil_War_Memorial_Drass.jpg/1280px-Kargil_War_Memorial_Drass.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Kargil_War_Memorial_Drass.jpg',
    credit: { creator: 'Lalitgupta isgec' },
    license: { id: 'cc-by-sa', version: '4.0', url: 'https://creativecommons.org/licenses/by-sa/4.0' }
  }
})
