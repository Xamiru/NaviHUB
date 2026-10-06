import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'conscription-law-of-1925',
  names: [
    { text: 'Conscription law of 1925', lang: 'en', role: 'primary' },
    { text: 'قانون نظام وظیفه عمومی', lang: 'fa', role: 'native' }
  ],
  researched: '2026-10-06',
  type: 'law',
  start: {
    alts: [
      {
        value: { d: '1925-06-06' },
        cites: [
          {
            source: 'iranica-yarshater-iranian-history-islamic-period-5',
            loc: {
              section: 'IRAN ii. IRANIAN HISTORY (2) Islamic period, Reza Shah Pahlavi (1925-41)'
            }
          }
        ]
      },
      {
        value: { d: '1926' },
        cites: [
          {
            source: 'loc-iran-country-study-1987',
            loc: { section: 'THE ERA OF REZA SHAH', para: '2' }
          }
        ]
      }
    ]
  },
  regions: ['iran'],
  prominence: 3,
  partOf: [
    { ref: 'period:qajar-dynasty' }
  ],
  participants: [
    {
      ref: 'person:reza-shah-pahlavi',
      role: 'organizer',
      cites: [
        {
          source: 'iranica-yarshater-iranian-history-islamic-period-5',
          loc: {
            section: 'IRAN ii. IRANIAN HISTORY (2) Islamic period, Reza Shah Pahlavi (1925-41)'
          }
        },
        {
          source: 'loc-iran-country-study-1987',
          loc: { section: 'THE ERA OF REZA SHAH', para: '2' }
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
          text: 'Reza Shah was the first monarch since Achaemenid times to organize a standing army.',
          lang: 'en',
          cite: {
            source: 'iranica-yarshater-iranian-history-islamic-period-5',
            loc: {
              section: 'IRAN ii. IRANIAN HISTORY (2) Islamic period, Reza Shah Pahlavi (1925-41)'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/iran-ii2-islamic-period-page-5/'
          }
        },
        {
          id: 'q2',
          text: 'On 6 June 1925 the Majles passed the law of compulsory military conscription. It provided for two years of military service at the age of 21.',
          lang: 'en',
          cite: {
            source: 'iranica-yarshater-iranian-history-islamic-period-5',
            loc: {
              section: 'IRAN ii. IRANIAN HISTORY (2) Islamic period, Reza Shah Pahlavi (1925-41)'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/iran-ii2-islamic-period-page-5/'
          }
        },
        {
          id: 'q3',
          text: 'Majles ratifies the compulsory conscription law, widely opposed by the ulema who view it as a sign of the increased influence of a secular society.',
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
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q4',
          text: 'Conscription begins, with each soldier required to serve two full years.',
          lang: 'en',
          cite: {
            source: 'iranica-yarshater-chronology-part-2',
            loc: { section: 'Chronology of Iranian History Part 2, 1926' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/chronology-of-iranian-history-part-2/'
          }
        },
        {
          id: 'q5',
          text: 'Reza Shah used the army not only to bolster his own power but also to pacify the country and to bring the tribes under control.',
          lang: 'en',
          cite: {
            source: 'loc-iran-country-study-1987',
            loc: { section: 'THE ERA OF REZA SHAH', para: '2' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/iran/15.htm' }
        }
      ]
    }
  ]
})
