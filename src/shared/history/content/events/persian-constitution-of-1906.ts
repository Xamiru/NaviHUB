import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'persian-constitution-of-1906',
  names: [
    { text: 'Persian Constitution of 1906', lang: 'en', role: 'primary' },
    {
      text: 'qānun-e asāsi',
      lang: 'fa-Latn',
      role: 'alternative',
      cites: [
        {
          source: 'iranica-yarshater-iranian-history-islamic-period-5',
          loc: { section: 'IRAN ii. IRANIAN HISTORY (2) Islamic period, Qajar period' }
        }
      ]
    }
  ],
  researched: '2026-10-06',
  type: 'law',
  start: {
    alts: [
      {
        value: { d: '1906-12-30' },
        cites: [
          {
            source: 'loc-iran-country-study-1987',
            loc: { section: 'The Constitutional Revolution', para: '2' }
          }
        ]
      },
      {
        value: { d: '1907-01-01' },
        cites: [
          {
            source: 'iranica-martin-constitutional-revolution-events',
            loc: {
              section: 'CONSTITUTIONAL REVOLUTION ii. Events, Adoption of the Constitution and early debates',
              para: '10'
            }
          }
        ]
      }
    ]
  },
  regions: ['iran'],
  prominence: 2,
  partOf: [
    { ref: 'event:persian-constitutional-revolution' }
  ],
  participants: [
    {
      ref: 'person:mozaffar-al-din-shah',
      role: 'signatory',
      cites: [
        {
          source: 'loc-iran-country-study-1987',
          loc: { section: 'The Constitutional Revolution', para: '2' }
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
          text: 'The chief issue under discussion in the autumn of 1906 was the proposed constitution. It was agreed that the Majles, representing the people, would have the right to propose legislation and have final authority over the laws, the budget, and financial policy.',
          lang: 'en',
          cite: {
            source: 'iranica-martin-constitutional-revolution-events',
            loc: {
              section: 'CONSTITUTIONAL REVOLUTION ii. Events, Adoption of the Constitution and early debates',
              para: '10'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/constitutional-revolution-ii'
          }
        },
        {
          id: 'q2',
          text: 'The most contentious issue, the nomination of members of the senate, was resolved by allowing the shah and the Majles each to appoint half the members.',
          lang: 'en',
          cite: {
            source: 'iranica-martin-constitutional-revolution-events',
            loc: {
              section: 'CONSTITUTIONAL REVOLUTION ii. Events, Adoption of the Constitution and early debates',
              para: '10'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/constitutional-revolution-ii'
          }
        },
        {
          id: 'q3',
          text: 'In October an elected assembly convened and drew up a constitution that provided for strict limitations on royal power, an elected parliament, or Majlis, with wide powers to represent the people, and a government with a cabinet subject to confirmation by the Majlis.',
          lang: 'en',
          cite: {
            source: 'loc-iran-country-study-1987',
            loc: { section: 'The Constitutional Revolution', para: '2' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/iran/13.htm' }
        },
        {
          id: 'q4',
          text: 'ʿAyn al-Dawla was dismissed, and his successor, the liberal Naṣr-Allāh Khan Mošir al-Dawla, managed to secure the signature of the sickly shah on the Constitutional Charter, which included the Constitutional Law (qānun-e asāsi, lit. basic or foundational law), a few days before the latter’s passing.',
          lang: 'en',
          cite: {
            source: 'iranica-yarshater-iranian-history-islamic-period-5',
            loc: { section: 'IRAN ii. IRANIAN HISTORY (2) Islamic period, Qajar period' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/iran-ii2-islamic-period-page-5/'
          }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q5',
          text: 'The Supplementary Fundamental Laws approved in 1907 provided, within limits, for freedom of press, speech, and association, and for security of life and property.',
          lang: 'en',
          cite: {
            source: 'loc-iran-country-study-1987',
            loc: { section: 'The Constitutional Revolution', para: '2' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/iran/13.htm' }
        }
      ]
    }
  ]
})
