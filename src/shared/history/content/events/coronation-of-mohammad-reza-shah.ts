import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'coronation-of-mohammad-reza-shah',
  names: [
    { text: 'Coronation of Mohammad Reza Shah', lang: 'en', role: 'primary' },
    { text: 'تاجگذاری محمدرضا شاه', lang: 'fa', role: 'native' }
  ],
  researched: '2026-10-08',
  type: 'other',
  start: {
    alts: [
      {
        value: { d: '1967-10' },
        cites: [
          {
            source: 'loc-iran-country-study-1987',
            loc: { section: 'State and Society, 1964-74', para: '11' }
          }
        ]
      }
    ]
  },
  regions: ['iran'],
  prominence: 3,
  places: [
    { ref: 'place:tehran' }
  ],
  partOf: [
    { ref: 'period:reign-of-mohammad-reza-shah' }
  ],
  polities: [
    { ref: 'polity:pahlavi-iran' }
  ],
  participants: [
    {
      ref: 'person:mohammad-reza-pahlavi',
      role: 'head-of-state',
      cites: [
        {
          source: 'loc-iran-country-study-1987',
          loc: { section: 'State and Society, 1964-74', para: '11' }
        }
      ]
    },
    {
      ref: 'person:farah-pahlavi',
      role: 'participant',
      cites: [
        {
          source: 'loc-iran-country-study-1987',
          loc: { section: 'State and Society, 1964-74', para: '11' }
        }
      ]
    }
  ],
  hero: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/8/8a/Famille_Pahlavi_1967.png',
    page: 'https://commons.wikimedia.org/wiki/File:Famille_Pahlavi_1967.png',
    credit: { institution: 'mashruteh.org' },
    license: { id: 'public-domain' }
  },
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'In October 1967, believing his achievements finally justified such a step, the shah celebrated his long-postponed coronation. Like his father, he placed the crown on his own head. To mark the occasion, the Majlis conferred on the shah the title of Arya-Mehr, or "Light of the Aryans." This glorification of the monarchy and the monarch, however, was not universally popular with the Iranians.',
          lang: 'en',
          cite: {
            source: 'loc-iran-country-study-1987',
            loc: { section: 'State and Society, 1964-74', para: '11' }
          },
          provenance: { via: 'web', at: '2026-10-07', url: 'http://countrystudies.us/iran/19.htm' }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q2',
          text: 'In 1967, because the crown prince was still very young, steps were taken to regularize the procedure for the succession. Under the constitution, if the shah were to die before the crown prince had come of age, the Majlis would meet to appoint a regent. There might be a delay in the appointment of a regent, especially if the Majlis was not in session. A constituent assembly, convened in September 1967, amended the constitution, providing for the queen automatically to act as regent unless the shah in his lifetime designated another individual.',
          lang: 'en',
          cite: {
            source: 'loc-iran-country-study-1987',
            loc: { section: 'State and Society, 1964-74', para: '11' }
          },
          provenance: { via: 'web', at: '2026-10-07', url: 'http://countrystudies.us/iran/19.htm' }
        }
      ]
    }
  ]
})
