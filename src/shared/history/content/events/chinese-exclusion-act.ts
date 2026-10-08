import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'chinese-exclusion-act',
  names: [
    { text: 'Chinese Exclusion Act', lang: 'en', role: 'primary' },
    {
      text: 'An Act to execute certain treaty stipulations relating to Chinese',
      lang: 'en',
      role: 'official',
      cites: [
        {
          source: 'nara-milestone-chinese-exclusion-act',
          loc: { section: 'Chinese Exclusion Act (1882)', para: '15' }
        }
      ]
    }
  ],
  researched: '2026-10-08',
  type: 'law',
  start: {
    alts: [
      {
        value: { d: '1882-05-06' },
        cites: [
          {
            source: 'nara-milestone-chinese-exclusion-act',
            loc: { section: 'Chinese Exclusion Act (1882)', para: '1' }
          },
          { source: 'lemo-chronik-1882', loc: { section: 'Chronik 1882', para: '25' } },
          { source: 'lemo-chronik-1882', loc: { section: 'Chronik 1882', para: '26' } }
        ]
      }
    ]
  },
  regions: ['north-america', 'east-asia'],
  prominence: 2,
  places: [
    {
      ref: 'place:washington-dc',
      cites: [
        { source: 'lemo-chronik-1882', loc: { section: 'Chronik 1882', para: '26' } }
      ]
    }
  ],
  polities: [
    { ref: 'polity:united-states' }
  ],
  participants: [
    {
      name: 'Chester A. Arthur',
      role: 'head-of-state',
      cites: [
        {
          source: 'nara-milestone-chinese-exclusion-act',
          loc: { section: 'Chinese Exclusion Act (1882)', para: '2' }
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
          text: 'The Chinese Exclusion Act was approved on May 6, 1882. It was the first significant law restricting immigration into the United States.',
          lang: 'en',
          cite: {
            source: 'nara-milestone-chinese-exclusion-act',
            loc: { section: 'Chinese Exclusion Act (1882)', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.archives.gov/milestone-documents/chinese-exclusion-act'
          }
        },
        {
          id: 'q2',
          text: 'This act provided an absolute 10-year ban on Chinese laborers immigrating to the United States.',
          lang: 'en',
          cite: {
            source: 'nara-milestone-chinese-exclusion-act',
            loc: { section: 'Chinese Exclusion Act (1882)', para: '2' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.archives.gov/milestone-documents/chinese-exclusion-act'
          }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q3',
          text: 'In the 1850s, Chinese workers migrated to the United States, first to work in the gold mines, but also to take agricultural jobs, and factory work, especially in the garment industry.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-chinese-immigration',
            loc: { section: 'Chinese Immigration and the Chinese Exclusion Acts', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://history.state.gov/milestones/1866-1898/chinese-immigration'
          }
        },
        {
          id: 'q4',
          text: 'In 1879, advocates of immigration restriction succeeded in introducing and passing legislation in Congress to limit the number of Chinese arriving to fifteen per ship or vessel. Republican President Rutherford B. Hayes vetoed the bill because it violated U.S. treaty agreements with China.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-chinese-immigration',
            loc: { section: 'Chinese Immigration and the Chinese Exclusion Acts', para: '5' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://history.state.gov/milestones/1866-1898/chinese-immigration'
          }
        },
        {
          id: 'q5',
          text: 'The resulting Angell Treaty permitted the United States to restrict, but not completely prohibit, Chinese immigration.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-chinese-immigration',
            loc: { section: 'Chinese Immigration and the Chinese Exclusion Acts', para: '7' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://history.state.gov/milestones/1866-1898/chinese-immigration'
          }
        }
      ]
    },
    {
      kind: 'in-their-words',
      quotes: [
        {
          id: 'q6',
          text: 'Be it enacted by the Senate and House of Representatives of the United States of America in Congress assembled, That from and after the expiration of ninety days next after the passage of this act, and until the expiration of ten years next after the passage of this act, the coming of Chinese laborers to the United States be, and the same is hereby, suspended;',
          lang: 'en',
          cite: {
            source: 'nara-milestone-chinese-exclusion-act',
            loc: { section: 'Chinese Exclusion Act (1882)', para: '17' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.archives.gov/milestone-documents/chinese-exclusion-act'
          }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q7',
          text: 'When the exclusion act expired in 1892, Congress extended it for 10 years in the form of the Geary Act.',
          lang: 'en',
          cite: {
            source: 'nara-milestone-chinese-exclusion-act',
            loc: { section: 'Chinese Exclusion Act (1882)', para: '5' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.archives.gov/milestone-documents/chinese-exclusion-act'
          }
        },
        {
          id: 'q8',
          text: 'In 1888, Congress took exclusion even further and passed the Scott Act, which made reentry to the United States after a visit to China impossible, even for long-term legal residents.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-chinese-immigration',
            loc: { section: 'Chinese Immigration and the Chinese Exclusion Acts', para: '8' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://history.state.gov/milestones/1866-1898/chinese-immigration'
          }
        },
        {
          id: 'q9',
          text: 'In China, merchants responded to the humiliation of the exclusion acts by organizing an anti-American boycott in 1905.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-chinese-immigration',
            loc: { section: 'Chinese Immigration and the Chinese Exclusion Acts', para: '9' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://history.state.gov/milestones/1866-1898/chinese-immigration'
          }
        }
      ]
    },
    {
      kind: 'legacy',
      quotes: [
        {
          id: 'q10',
          text: 'In 1943, when China was a member of the Allied Nations during World War II, Congress repealed all the exclusion acts.',
          lang: 'en',
          cite: {
            source: 'nara-milestone-chinese-exclusion-act',
            loc: { section: 'Chinese Exclusion Act (1882)', para: '7' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.archives.gov/milestone-documents/chinese-exclusion-act'
          }
        }
      ]
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/9/97/Chineseexclusionact.JPG/1280px-Chineseexclusionact.JPG',
    page: 'https://commons.wikimedia.org/wiki/File:Chineseexclusionact.JPG',
    credit: { institution: 'National Archives and Records Administration' },
    license: { id: 'public-domain' }
  },
  furtherReading: [
    { source: 'chen-1985-huagong-chuguo-shiliao-huibian', perspective: 'chinese' }
  ]
})
