import { definePerson } from '../../schema'

export default definePerson({
  id: 'charles-v',
  names: [
    { text: 'Charles V', lang: 'en', role: 'primary' },
    {
      text: 'Charles I of Spain',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'loc-spain-country-study-1988',
          loc: { section: 'Charles V and Philip II', para: '1' }
        }
      ]
    }
  ],
  researched: '2026-10-13',
  born: {
    alts: [
      {
        value: { d: '1500-02-24' },
        cites: [
          {
            source: 'britannica-1911-charles-v-roman-emperor',
            loc: { section: 'Charles V. (Roman Emperor)', para: '1' }
          }
        ]
      }
    ]
  },
  died: {
    alts: [
      {
        value: { d: '1558' },
        cites: [
          {
            source: 'britannica-1911-charles-v-roman-emperor',
            loc: { section: 'Charles V. (Roman Emperor)', para: '1' }
          }
        ]
      }
    ]
  },
  regions: ['europe', 'latin-america'],
  roles: ['monarch'],
  offices: [
    {
      title: 'King of Spain (as Charles I)',
      polity: 'polity:spanish-empire',
      start: {
        alts: [
          {
            value: { d: '1516' },
            cites: [
              {
                source: 'loc-spain-country-study-1988',
                loc: { section: 'Charles V and Philip II', para: '1' }
              }
            ]
          }
        ]
      },
      end: {
        alts: [
          {
            value: { d: '1556' },
            cites: [
              {
                source: 'loc-spain-country-study-1988',
                loc: { section: 'Charles V and Philip II', para: '1' }
              }
            ]
          }
        ]
      },
      cites: [
        {
          source: 'loc-spain-country-study-1988',
          loc: { section: 'Charles V and Philip II', para: '1' }
        }
      ]
    },
    {
      title: 'Holy Roman Emperor',
      polity: 'polity:holy-roman-empire',
      start: {
        alts: [
          {
            value: { d: '1519' },
            cites: [
              {
                source: 'loc-spain-country-study-1988',
                loc: { section: 'Charles V and Philip II', para: '1' }
              }
            ]
          }
        ]
      },
      end: {
        alts: [
          {
            value: { d: '1556' },
            cites: [
              {
                source: 'loc-spain-country-study-1988',
                loc: { section: 'Charles V and Philip II', para: '1' }
              }
            ]
          }
        ]
      },
      cites: [
        {
          source: 'loc-spain-country-study-1988',
          loc: { section: 'Charles V and Philip II', para: '1' }
        }
      ]
    }
  ],
  portrait: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/4/42/Charles_V_at_Muehlburg.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Charles_V_at_Muehlburg.jpg',
    credit: { creator: 'Titian' },
    license: { id: 'public-domain' }
  },
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'On Ferdinand\'s death in 1516, Charles of Ghent, the son of Juana and Philip, inherited Spain (which he ruled as Charles I, r. 1516-56), its colonies, and Naples.',
          lang: 'en',
          cite: {
            source: 'loc-spain-country-study-1988',
            loc: { section: 'Charles V and Philip II', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-13', url: 'http://countrystudies.us/spain/8.htm' }
        },
        {
          id: 'q2',
          text: 'Charles, in only a few years, was able to bring together the world\'s most diverse empire since Rome.',
          lang: 'en',
          cite: {
            source: 'loc-spain-country-study-1988',
            loc: { section: 'Charles V and Philip II', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-13', url: 'http://countrystudies.us/spain/8.htm' }
        }
      ]
    },
    {
      kind: 'career',
      quotes: [
        {
          id: 'q3',
          text: 'Shortly afterward he was selected Holy Roman emperor, a title that he had held as Charles V (r. 1519-56), to succeed his grandfather.',
          lang: 'en',
          cite: {
            source: 'loc-spain-country-study-1988',
            loc: { section: 'Charles V and Philip II', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-13', url: 'http://countrystudies.us/spain/8.htm' }
        },
        {
          id: 'q4',
          text: 'Charles had been out of Germany between 1521 and 1530, and when he returned he found that the new religion had won too many adherents to be easily uprooted.',
          lang: 'en',
          cite: {
            source: 'loc-germany-country-study-1995',
            loc: { section: 'Resistance to Lutheranism', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-13', url: 'http://countrystudies.us/germany/13.htm' }
        },
        {
          id: 'q5',
          text: 'Thus at Augsburg in 1530 the wide gulf between the Lutheran confession and the Catholic confutation led to the definite suspensive treaty granted to the Lutherans at Nuremberg (1532).',
          lang: 'en',
          cite: {
            source: 'britannica-1911-charles-v-roman-emperor',
            loc: { section: 'Charles V. (Roman Emperor)', para: '16' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Charles_V._(Roman_Emperor)'
          }
        }
      ]
    },
    {
      kind: 'later-life',
      quotes: [
        {
          id: 'q6',
          text: 'When he abdicated in 1556 to retire to a Spanish monastery, Charles divided his empire.',
          lang: 'en',
          cite: {
            source: 'loc-spain-country-study-1988',
            loc: { section: 'Charles V and Philip II', para: '3' }
          },
          provenance: { via: 'web', at: '2026-10-13', url: 'http://countrystudies.us/spain/8.htm' }
        },
        {
          id: 'q7',
          text: 'In the Hall of the Golden Fleece at Brussels on the 25th of October 1555 he formally resigned to Philip the sovereignty of his beloved Netherlands.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-charles-v-roman-emperor',
            loc: { section: 'Charles V. (Roman Emperor)', para: '17' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Charles_V._(Roman_Emperor)'
          }
        }
      ]
    }
  ]
})
