import { definePerson } from '../../schema'

export default definePerson({
  id: 'vladimir-putin',
  names: [
    { text: 'Vladimir Putin', lang: 'en', role: 'primary' },
    { text: 'Владимир Владимирович Путин', lang: 'ru', role: 'native' }
  ],
  researched: '2026-10-12',
  born: {
    alts: [
      {
        value: { d: '1952-10-07' },
        cites: [
          {
            source: 'lc-names-putin-vladimir-vladimirovich-n00093163',
            loc: { section: 'Putin, Vladimir Vladimirovich, 1952-' }
          }
        ]
      }
    ]
  },
  bornIn: {
    ref: 'place:saint-petersburg',
    cites: [
      {
        source: 'lc-names-putin-vladimir-vladimirovich-n00093163',
        loc: { section: 'Putin, Vladimir Vladimirovich, 1952-' }
      }
    ]
  },
  regions: ['russia-central-asia'],
  roles: ['head-of-state', 'politician'],
  offices: [
    {
      title: 'Acting President of Russia',
      start: {
        alts: [
          {
            value: { d: '1999-12-31' },
            cites: [
              {
                source: 'hrw-2001-world-report-russia',
                loc: { section: 'World Report 2001: Russia', para: '2' }
              }
            ]
          }
        ]
      },
      cites: [
        {
          source: 'hrw-2001-world-report-russia',
          loc: { section: 'World Report 2001: Russia', para: '2' }
        }
      ]
    },
    {
      title: 'President of Russia',
      end: {
        alts: [
          {
            value: { d: '2008-05-07' },
            cites: [
              {
                source: 'hrw-2009-world-report-russia',
                loc: { section: 'World Report 2009: Russia', para: '5' }
              }
            ]
          }
        ]
      },
      cites: [
        {
          source: 'hrw-2001-world-report-russia',
          loc: { section: 'World Report 2001: Russia', para: '2' }
        },
        {
          source: 'hrw-2009-world-report-russia',
          loc: { section: 'World Report 2009: Russia', para: '5' }
        }
      ]
    },
    {
      title: 'Prime Minister of Russia',
      start: {
        alts: [
          {
            value: { d: '2008-05-07' },
            cites: [
              {
                source: 'hrw-2009-world-report-russia',
                loc: { section: 'World Report 2009: Russia', para: '5' }
              }
            ]
          }
        ]
      },
      cites: [
        {
          source: 'hrw-2009-world-report-russia',
          loc: { section: 'World Report 2009: Russia', para: '5' }
        }
      ]
    }
  ],
  portrait: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/f/fa/Vladimir_Putin-5_edit.jpg/1280px-Vladimir_Putin-5_edit.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Vladimir_Putin-5_edit.jpg',
    credit: { institution: 'Presidential Press and Information Office of Russia' },
    license: { id: 'cc-by', version: '4.0', url: 'https://creativecommons.org/licenses/by/4.0' }
  },
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'Vladimir Putin, the acting president following Boris Yeltsin\'s surprise resignation on December 31, 1999, entered the March 26 presidential elections as a clear favorite and won in the first round with just over 50 percent of the vote-but not without widespread election fraud.',
          lang: 'en',
          cite: {
            source: 'hrw-2001-world-report-russia',
            loc: { section: 'World Report 2001: Russia', para: '2' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-12',
            url: 'https://web.archive.org/web/20230331165731/https://www.hrw.org/legacy/wr2k1/europe/russian.html'
          }
        }
      ]
    },
    {
      kind: 'career',
      quotes: [
        {
          id: 'q2',
          text: 'Putin quickly moved to solidify his power by reigning in powerful regional leaders and attacking the "oligarchs," Russia\'s very wealthy new economic elite.',
          lang: 'en',
          cite: {
            source: 'hrw-2001-world-report-russia',
            loc: { section: 'World Report 2001: Russia', para: '2' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-12',
            url: 'https://web.archive.org/web/20230331165731/https://www.hrw.org/legacy/wr2k1/europe/russian.html'
          }
        },
        {
          id: 'q3',
          text: 'Putin\'s background as a KGB official sparked fears of an impending crackdown on human rights.',
          lang: 'en',
          cite: {
            source: 'hrw-2001-world-report-russia',
            loc: { section: 'World Report 2001: Russia', para: '3' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-12',
            url: 'https://web.archive.org/web/20230331165731/https://www.hrw.org/legacy/wr2k1/europe/russian.html'
          }
        },
        {
          id: 'q4',
          text: 'Putin responded aggressively, accusing the media of "lying" and "ruining Russia\'s army and fleet."',
          lang: 'en',
          cite: {
            source: 'hrw-2001-world-report-russia',
            loc: { section: 'World Report 2001: Russia', para: '26' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-12',
            url: 'https://web.archive.org/web/20230331165731/https://www.hrw.org/legacy/wr2k1/europe/russian.html'
          }
        },
        {
          id: 'q5',
          text: 'Throughout his first term in office, Russian President Vladimir Putin kept Russia experts guessing about the role of democracy and human rights in his vision for Russia’s political development.',
          lang: 'en',
          cite: {
            source: 'hrw-2005-world-report-russia',
            loc: { section: 'World Report 2005: Russia', para: '3' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-12',
            url: 'https://web.archive.org/web/20240303050840/https://www.hrw.org/world-report/2005/country-chapters/russia'
          }
        },
        {
          id: 'q6',
          text: 'In 2005, the government pushed through a package of political changes that increased President Putin’s power.',
          lang: 'en',
          cite: {
            source: 'hrw-2006-world-report-russia',
            loc: { section: 'World Report 2006: Russia', para: '12' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-12',
            url: 'https://web.archive.org/web/20240407204303/https://www.hrw.org/world-report/2006/country-chapters/russia'
          }
        },
        {
          id: 'q7',
          text: 'Medvedev assumed the presidency on May 7 and immediately appointed Putin prime minister.',
          lang: 'en',
          cite: {
            source: 'hrw-2009-world-report-russia',
            loc: { section: 'World Report 2009: Russia', para: '5' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-12',
            url: 'https://web.archive.org/web/20240101165531/https://www.hrw.org/world-report/2009/country-chapters/russia'
          }
        }
      ]
    }
  ]
})
