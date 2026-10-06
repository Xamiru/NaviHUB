import { defineInterpretation } from '../../schema'

export default defineInterpretation({
  id: 'deposition-of-the-qajar-dynasty-legitimacy',
  about: ['event:deposition-of-the-qajar-dynasty'],
  topic: 'legitimacy',
  researched: '2026-10-06',
  positions: [
    {
      id: 'unconstitutional',
      category: 'contemporary',
      holders: [
        { kind: 'participant', name: 'Sayyed Ḥasan Taqizādeh' },
        { kind: 'participant', name: 'Moḥammad Moṣaddeq' },
        { kind: 'participant', name: 'Ḥosayn ʿAlā' },
        { kind: 'participant', name: 'Sayyed Ḥasan Modarres' }
      ],
      statements: [
        {
          id: 'q1',
          text: 'Those who oppose this move as unconstitutional include Sayyed Ḥasan Taqizādeh, Moḥammad Moṣaddeq, Ḥosayn ʿAlā, and Sayyed Ḥasan Modarres.',
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
      id: 'stage-managed',
      category: 'scholarly',
      holders: [
        { kind: 'scholar', name: 'Shahbaz Shahnavaz' },
        { kind: 'organization', name: 'Library of Congress, Federal Research Division' }
      ],
      statements: [
        {
          id: 'q2',
          text: 'after plenty of political maneuvering, intimidation, and even use of force against his opponents in the Majles, he stage-managed the approval of the constituent assembly for the demise of the Qajars and the establishment of a new ruling dynasty (Pahlavi) under himself',
          lang: 'en',
          cite: {
            source: 'iranica-shahnavaz-kazal-khan',
            loc: { section: 'ḴAZʿAL KHAN', para: '28' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/kazal-khan/'
          }
        },
        {
          id: 'q3',
          text: 'In October 1925, a Majlis dominated by Reza Khan\'s men deposed the Qajar dynasty;',
          lang: 'en',
          cite: {
            source: 'loc-iran-country-study-1987',
            loc: { section: 'THE ERA OF REZA SHAH', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/iran/15.htm' }
        }
      ]
    },
    {
      id: 'desire-for-strong-government',
      category: 'scholarly',
      holders: [
        { kind: 'scholar', name: 'Ehsan Yarshater' }
      ],
      statements: [
        {
          id: 'q4',
          text: 'The country was now thoroughly disappointed with the results of the hard won freedom, the incompetence of the successive cabinets, the inefficacy of the Shahs, and the corruption of the bureaucracy.',
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
        },
        {
          id: 'q5',
          text: 'The desire for a strong and stable government became a desideratum of the people.',
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
        },
        {
          id: 'q6',
          text: 'After a series of smart maneuvers on his part, the Majles, considering Reza Khan’s popularity and power, declared on 31 October 1925 the end of the Qajar monarchy and bestowed the governmental authority on Reza Khan.',
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
    }
  ]
})
