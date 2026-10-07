import { definePeriod } from '../../schema'

export default definePeriod({
  id: 'pahlavi-dynasty',
  names: [
    { text: 'Pahlavi dynasty', lang: 'en', role: 'primary' },
    { text: 'دودمان پهلوی', lang: 'fa', role: 'native' }
  ],
  researched: '2026-10-07',
  periodType: 'dynasty',
  start: {
    alts: [
      {
        value: { d: '1925' },
        cites: [
          {
            source: 'iranica-yarshater-chronology-part-2',
            loc: { section: 'Chronology of Iranian History Part 2, 1925' }
          }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1979' },
        cites: [
          {
            source: 'iranica-yarshater-iranian-history-islamic-period-6',
            loc: {
              section: 'IRAN ii. IRANIAN HISTORY (2) Islamic period, Moḥammad Reza Shah (1941-79)'
            }
          }
        ]
      }
    ]
  },
  regions: ['iran'],
  prominence: 1,
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'Reżā Khan is elected Shah by the Constitutional Assembly and chooses the dynastic name of Pahlavi.',
          lang: 'en',
          cite: {
            source: 'iranica-yarshater-chronology-part-2',
            loc: { section: 'Chronology of Iranian History Part 2, 1925' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/chronology-of-iranian-history-part-2/'
          }
        },
        {
          id: 'q2',
          text: 'Damit endet die Herrschaft der seit 1794 regierenden Kadscharen. Es beginnt die Herrschaft der Pahlawis.',
          lang: 'de',
          cite: { source: 'lemo-chronik-1925', loc: { section: 'Chronik 1925', para: '181' } },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.dhm.de/lemo/jahreschronik/1925.html'
          }
        }
      ]
    },
    {
      kind: 'aftermath',
      quotes: [
        {
          id: 'q3',
          text: 'In 1979 a referendum abolished the age-old monarchical regime in Persia, and the “Islamic Republic of Iran” was established.',
          lang: 'en',
          cite: {
            source: 'iranica-yarshater-iranian-history-islamic-period-6',
            loc: {
              section: 'IRAN ii. IRANIAN HISTORY (2) Islamic period, Moḥammad Reza Shah (1941-79)'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/iran-ii2-islamic-period-page-6/'
          }
        }
      ]
    }
  ],
  hero: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/4/48/Reza_shah_coronation.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Reza_shah_coronation.jpg',
    credit: {
      institution: 'Tajgozari-ye shahanshahan-e Iran (Central Council of the Imperial Celebrations, 1967)'
    },
    license: { id: 'public-domain' }
  }
})
