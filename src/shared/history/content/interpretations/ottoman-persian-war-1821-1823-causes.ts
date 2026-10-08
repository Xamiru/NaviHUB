import { defineInterpretation } from '../../schema'

export default defineInterpretation({
  id: 'ottoman-persian-war-1821-1823-causes',
  about: ['event:ottoman-persian-war-1821-1823'],
  topic: 'causes',
  researched: '2026-10-08',
  positions: [
    {
      id: 'border-tensions-and-europe',
      category: 'scholarly',
      holders: [
        { kind: 'scholar', name: 'Ernest Tucker', discipline: 'historian' }
      ],
      statements: [
        {
          id: 'q1',
          text: 'It erupted, as had previous confrontations, due to tension that arose among groups living on the Persia-Iraq border and as an indirect consequence of increased European presence in the area.',
          lang: 'en',
          cite: {
            source: 'iranica-tucker-iraq-afsharids-to-qajars',
            loc: { section: 'IRAQ v. AFSHARIDS TO THE END OF THE QAJARS', para: '12' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/iraq-v-afsharids-to-the-end-of-the-qajars/'
          }
        },
        {
          id: 'q2',
          text: 'In contrast to previous hostilities, Ottoman clerics issued no anti-Shiʿite fatwās at all to justify the conflict.',
          lang: 'en',
          cite: {
            source: 'iranica-tucker-iraq-afsharids-to-qajars',
            loc: { section: 'IRAQ v. AFSHARIDS TO THE END OF THE QAJARS', para: '12' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/iraq-v-afsharids-to-the-end-of-the-qajars/'
          }
        }
      ]
    },
    {
      id: 'princely-rivalry',
      category: 'scholarly',
      holders: [
        { kind: 'scholar', name: 'Abbas Amanat', discipline: 'historian' }
      ],
      statements: [
        {
          id: 'q3',
          text: 'Dawlatšāh’s military ventures were partly motivated by intense competition with ʿAbbās Mīrzā.',
          lang: 'en',
          cite: {
            source: 'iranica-amanat-dawlatshah',
            loc: { section: 'DAWLATŠĀH, MOḤAMMAD-ʿALĪ MĪRZĀ', para: '5' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/dawlatsah-mohammad-ali-mirza/'
          }
        },
        {
          id: 'q4',
          text: 'Although this rapprochement brought no concrete results, it may have influenced Moḥammad-ʿAlī Mīrzā’s aggressive policy toward Ottoman Iraq.',
          lang: 'en',
          cite: {
            source: 'iranica-amanat-dawlatshah',
            loc: { section: 'DAWLATŠĀH, MOḤAMMAD-ʿALĪ MĪRZĀ', para: '5' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/dawlatsah-mohammad-ali-mirza/'
          }
        }
      ]
    },
    {
      id: 'greek-war-opportunity',
      category: 'scholarly',
      holders: [
        { kind: 'scholar', name: 'Heribert Busse' }
      ],
      statements: [
        {
          id: 'q5',
          text: 'When the Greek war of independence broke out in 1821, Moḥammad-ʿAlī Mīrzā (governor of Kermānšāh, brother and rival of the crown prince) seized the opportunity to invade Mesopotamia and reached the very walls of Baghdad.',
          lang: 'en',
          cite: {
            source: 'iranica-busse-abbas-mirza',
            loc: { section: 'ʿABBĀS MĪRZĀ QAJAR', para: '5' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/abbas-mirza'
          }
        },
        {
          id: 'q6',
          text: 'Jealous of his brother’s success (so Fraser maintains, Caspian Sea, p. 312), he campaigned in the Kurdish territory of Bitlīs and Mūš, west of Lake Van.',
          lang: 'en',
          cite: {
            source: 'iranica-busse-abbas-mirza',
            loc: { section: 'ʿABBĀS MĪRZĀ QAJAR', para: '5' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/abbas-mirza'
          }
        }
      ]
    }
  ]
})
