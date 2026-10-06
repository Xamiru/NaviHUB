import { defineInterpretation } from '../../schema'

export default defineInterpretation({
  id: 'republican-movement-of-1924-motives',
  about: ['event:republican-movement-of-1924'],
  topic: 'motives',
  researched: '2026-10-06',
  positions: [
    {
      id: 'impatience-with-the-majles',
      category: 'scholarly',
      holders: [
        { kind: 'scholar', name: 'Ehsan Yarshater' }
      ],
      statements: [
        {
          id: 'q1',
          text: 'In 1924 Reza Khan, disgusted with the Majles and convinced of the necessity of establishing his authority unhindered by a multi-voiced and bothersome Majles, and with an eye on the developments in Mustefa Kemal’s Turkey, advocated a republican regime, which was opposed by the clergy.',
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
      id: 'presidency-for-himself',
      category: 'scholarly',
      holders: [
        { kind: 'scholar', name: 'Shahbaz Shahnavaz' }
      ],
      statements: [
        {
          id: 'q2',
          text: 'Meanwhile, he toyed with the idea of turning Iran’s political system from a constitutional monarchy into a republic, which meant that Reżā Khan himself would be the first president of the new republic.',
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
        }
      ]
    },
    {
      id: 'turkish-model',
      category: 'scholarly',
      holders: [
        { kind: 'organization', name: 'Library of Congress, Federal Research Division' },
        { kind: 'scholar', name: 'Ehsan Yarshater' }
      ],
      statements: [
        {
          id: 'q3',
          text: 'Reza Khan seriously considered establishing a republic, as Atatürk had done in Turkey, but abandoned the idea as a result of clerical opposition.',
          lang: 'en',
          cite: {
            source: 'loc-iran-country-study-1987',
            loc: { section: 'THE ERA OF REZA SHAH', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/iran/15.htm' }
        },
        {
          id: 'q4',
          text: 'Inspired by regime change in Turkey, a movement is set in motion for the abolition of the monarchy and formation of a Republic with Reżā Khan as its president.',
          lang: 'en',
          cite: {
            source: 'iranica-yarshater-chronology-part-2',
            loc: { section: 'Chronology of Iranian History Part 2, 1924' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/chronology-of-iranian-history-part-2/'
          }
        }
      ]
    }
  ]
})
