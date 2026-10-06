import { definePerson } from '../../schema'

export default definePerson({
  id: 'arthur-balfour',
  names: [
    { text: 'Arthur Balfour', lang: 'en', role: 'primary' },
    {
      text: 'Arthur James Balfour',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'eo1418-seikaly-balfour',
          loc: { section: 'Balfour, Arthur James Balfour, Earl of' }
        }
      ]
    },
    {
      text: '1st Earl of Balfour',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'eo1418-seikaly-balfour',
          loc: { section: 'Balfour, Arthur James Balfour, Earl of' }
        }
      ]
    }
  ],
  researched: '2026-10-06',
  born: {
    alts: [
      {
        value: { d: '1848-07-25' },
        cites: [
          {
            source: 'eo1418-seikaly-balfour',
            loc: { section: 'Balfour, Arthur James Balfour, Earl of' }
          }
        ]
      }
    ]
  },
  died: {
    alts: [
      {
        value: { d: '1930-03-19' },
        cites: [
          {
            source: 'eo1418-seikaly-balfour',
            loc: { section: 'Balfour, Arthur James Balfour, Earl of' }
          }
        ]
      }
    ]
  },
  regions: ['europe', 'mena'],
  roles: ['politician'],
  offices: [
    {
      title: 'Prime Minister',
      start: {
        alts: [
          {
            value: { d: '1902' },
            cites: [
              {
                source: 'eo1418-seikaly-balfour',
                loc: {
                  section: 'British Conservative Politician, Prime Minister, and Foreign Secretary',
                  para: '1'
                }
              }
            ]
          }
        ]
      },
      end: {
        alts: [
          {
            value: { d: '1905' },
            cites: [
              {
                source: 'eo1418-seikaly-balfour',
                loc: {
                  section: 'British Conservative Politician, Prime Minister, and Foreign Secretary',
                  para: '1'
                }
              }
            ]
          }
        ]
      },
      cites: [
        {
          source: 'eo1418-seikaly-balfour',
          loc: {
            section: 'British Conservative Politician, Prime Minister, and Foreign Secretary',
            para: '1'
          }
        }
      ]
    },
    {
      title: 'Secretary of State for Foreign Affairs',
      start: {
        alts: [
          {
            value: { d: '1916' },
            cites: [
              {
                source: 'eo1418-seikaly-balfour',
                loc: { section: 'During World War I', para: '1' }
              }
            ]
          }
        ]
      },
      cites: [
        { source: 'eo1418-seikaly-balfour', loc: { section: 'During World War I', para: '1' } }
      ]
    }
  ],
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'Arthur James Balfour was a British Conservative politician and statesman who served as Prime Minister of the United Kingdom and was later Foreign Secretary. In the latter post, he issued the Balfour Declaration of 1917 on behalf of the British government, which endorsed Zionist aspirations in Palestine. He received an earldom in 1922.',
          lang: 'en',
          cite: {
            source: 'eo1418-seikaly-balfour',
            loc: { section: 'Balfour, Arthur James Balfour, Earl of' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://encyclopedia.1914-1918-online.net/article/balfour-arthur-james-balfour-earl-of/'
          }
        }
      ]
    },
    {
      kind: 'career',
      quotes: [
        {
          id: 'q2',
          text: 'Despite his long tenure in Parliament, his role as statesman in British historiography tends to be either overlooked or under-rated, probably because his shortcomings as party leader and Prime Minister far outweighed his successes.',
          lang: 'en',
          cite: {
            source: 'eo1418-seikaly-balfour',
            loc: {
              section: 'British Conservative Politician, Prime Minister, and Foreign Secretary',
              para: '1'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://encyclopedia.1914-1918-online.net/article/balfour-arthur-james-balfour-earl-of/'
          }
        }
      ]
    }
  ]
})
