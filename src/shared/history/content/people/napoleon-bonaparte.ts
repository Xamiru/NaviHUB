import { definePerson } from '../../schema'

export default definePerson({
  id: 'napoleon-bonaparte',
  names: [
    { text: 'Napoleon Bonaparte', lang: 'en', role: 'primary' },
    { text: 'Napoléon Bonaparte', lang: 'fr', role: 'native' },
    { text: 'Napoleon I', lang: 'en', role: 'alternative' }
  ],
  researched: '2026-10-08',
  born: {
    alts: [
      {
        value: { d: '1769-08-15' },
        cites: [
          {
            source: 'fondation-napoleon-timeline-consulate-first-empire',
            loc: {
              section: 'Timeline: Consulate/1st French Empire, 1769 – THE BIRTH OF NAPOLEON BONAPARTE'
            }
          }
        ]
      }
    ]
  },
  died: {
    alts: [
      {
        value: { d: '1821-05-05' },
        cites: [
          {
            source: 'fondation-napoleon-timeline-consulate-first-empire',
            loc: {
              section: 'Timeline: Consulate/1st French Empire, 1821 – THE DEATH OF NAPOLEON AT ST HELENA'
            }
          }
        ]
      }
    ]
  },
  regions: ['europe'],
  roles: ['monarch', 'head-of-state', 'military'],
  offices: [
    {
      title: 'Emperor of the French',
      polity: 'polity:first-french-empire',
      start: {
        alts: [
          {
            value: { d: '1804-05-18' },
            cites: [
              {
                source: 'fondation-napoleon-timeline-consulate-first-empire',
                loc: {
                  section: 'Timeline: Consulate/1st French Empire, 1804 – A YEAR OF CONTRASTS'
                }
              }
            ]
          }
        ]
      },
      end: {
        alts: [
          {
            value: { d: '1814-04-06' },
            cites: [
              {
                source: 'fondation-napoleon-timeline-consulate-first-empire',
                loc: {
                  section: 'Timeline: Consulate/1st French Empire, 1814 – THE FRENCH CAMPAIGN'
                }
              }
            ]
          }
        ]
      },
      cites: [
        {
          source: 'fondation-napoleon-timeline-consulate-first-empire',
          loc: { section: 'Timeline: Consulate/1st French Empire, 1804 – A YEAR OF CONTRASTS' }
        }
      ]
    }
  ],
  sections: [
    {
      kind: 'early-life',
      quotes: [
        {
          id: 'q1',
          text: 'On 15 August 1769, Napoleon Bonaparte was born in Ajaccio, in Corsica.',
          lang: 'en',
          cite: {
            source: 'fondation-napoleon-timeline-consulate-first-empire',
            loc: {
              section: 'Timeline: Consulate/1st French Empire, 1769 – THE BIRTH OF NAPOLEON BONAPARTE'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.napoleon.org/en/young-historians/napodoc/timeline-consulate1st-french-empire/'
          }
        }
      ]
    },
    {
      kind: 'career',
      quotes: [
        {
          id: 'q2',
          text: 'This situation was threatened by Napoleon Bonaparte’s plans to revive the French empire in the New World.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-louisiana-purchase',
            loc: { section: 'Louisiana Purchase, 1803', para: '4' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://history.state.gov/milestones/1801-1829/louisiana-purchase'
          }
        },
        {
          id: 'q3',
          text: 'French first consul Napoléon Bonaparte resented the temerity of the former slaves who planned to govern a nation on their own.',
          lang: 'en',
          cite: {
            source: 'loc-haiti-country-study-1989',
            loc: { section: 'Toussaint Louverture', para: '12' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/haiti/10.htm' }
        }
      ]
    },
    {
      kind: 'later-life',
      quotes: [
        {
          id: 'q4',
          text: 'On 22 June 1815, four days after the defeat at Waterloo, Napoleon abdicated for the second time in his reign.',
          lang: 'en',
          cite: {
            source: 'fondation-napoleon-timeline-consulate-first-empire',
            loc: {
              section: 'Timeline: Consulate/1st French Empire, 1821 – THE DEATH OF NAPOLEON AT ST HELENA'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.napoleon.org/en/young-historians/napodoc/timeline-consulate1st-french-empire/'
          }
        }
      ]
    },
    {
      kind: 'death',
      quotes: [
        {
          id: 'q5',
          text: 'Napoleon’s moods swung between bouts of depression, during which time he would refuse to leave Longwood, and periods of intense activity, including the conception of a new garden. His final words before his death on 5 May 1821 were of Josephine and the army.',
          lang: 'en',
          cite: {
            source: 'fondation-napoleon-timeline-consulate-first-empire',
            loc: {
              section: 'Timeline: Consulate/1st French Empire, 1821 – THE DEATH OF NAPOLEON AT ST HELENA'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://www.napoleon.org/en/young-historians/napodoc/timeline-consulate1st-french-empire/'
          }
        }
      ]
    }
  ],
  portrait: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/b/bd/The_Emperor_Napoleon_in_His_Study_at_the_Tuileries%2C_by_Jacques-Louis_David_%281812%29_-_National_Gallery_of_Art_%28Samuel_H._Kress_Foundation%29.jpg/1280px-The_Emperor_Napoleon_in_His_Study_at_the_Tuileries%2C_by_Jacques-Louis_David_%281812%29_-_National_Gallery_of_Art_%28Samuel_H._Kress_Foundation%29.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:The_Emperor_Napoleon_in_His_Study_at_the_Tuileries,_by_Jacques-Louis_David_(1812)_-_National_Gallery_of_Art_(Samuel_H._Kress_Foundation).jpg',
    credit: { institution: 'National Gallery of Art, Washington', creator: 'Jacques-Louis David' },
    license: { id: 'public-domain' }
  }
})
