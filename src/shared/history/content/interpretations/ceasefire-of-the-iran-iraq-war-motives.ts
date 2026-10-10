import { defineInterpretation } from '../../schema'

export default defineInterpretation({
  id: 'ceasefire-of-the-iran-iraq-war-motives',
  about: ['event:ceasefire-of-the-iran-iraq-war'],
  topic: 'motives',
  framing: {
    id: 'q1',
    text: 'Iran’s decision to end the war was based on a number of factors.',
    lang: 'en',
    cite: {
      source: 'iranica-gieling-iraq-vii-iran-iraq-war',
      loc: { section: 'IRAQ vii. IRAN-IRAQ WAR', para: '45' }
    },
    provenance: {
      via: 'web',
      at: '2026-10-10',
      url: 'https://www.iranicaonline.org/articles/iraq-vii-iran-iraq-war'
    }
  },
  positions: [
    {
      id: 'khomeini-chalice-of-poison',
      category: 'official',
      holders: [
        { kind: 'participant', name: 'Ruhollah Khomeini', ref: 'person:ruhollah-khomeini' },
        { kind: 'state', name: 'Islamic Republic of Iran' }
      ],
      statements: [
        {
          id: 'q2',
          text: '“draining a chalice full of poison.”',
          lang: 'en',
          cite: { source: 'iranica-algar-khomeini-life', loc: { section: 'KHOMEINI i. Life' } },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'https://www.iranicaonline.org/articles/khomeini-i-life/'
          }
        },
        {
          id: 'q3',
          text: 'Khomeini said he was embarrassed before the Iranian people to accept the ceasefire, although the national interest (maṣlaḥat) required that he do so.',
          lang: 'en',
          cite: { source: 'iranica-algar-khomeini-life', loc: { section: 'KHOMEINI i. Life' } },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'https://www.iranicaonline.org/articles/khomeini-i-life/'
          }
        }
      ],
      reception: [
        {
          id: 'q4',
          text: 'Chief among these were the recent military defeats caused by the shortage of arms, Iran’s international isolation, deteriorating economic conditions, American presence in the Persian Gulf, the war expenditure, and heavy casualties',
          lang: 'en',
          cite: {
            source: 'iranica-gieling-iraq-vii-iran-iraq-war',
            loc: { section: 'IRAQ vii. IRAN-IRAQ WAR', para: '45' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'https://www.iranicaonline.org/articles/iraq-vii-iran-iraq-war'
          }
        },
        {
          id: 'q5',
          text: 'Another major reason may also have been that the war no longer served the Islamic revolution and had actually become a threat to the very existence of the Islamic Republic.',
          lang: 'en',
          cite: {
            source: 'iranica-gieling-iraq-vii-iran-iraq-war',
            loc: { section: 'IRAQ vii. IRAN-IRAQ WAR', para: '45' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'https://www.iranicaonline.org/articles/iraq-vii-iran-iraq-war'
          }
        }
      ]
    },
    {
      id: 'economic-and-military-exhaustion',
      category: 'scholarly',
      holders: [
        { kind: 'scholar', name: 'Saskia M. Gieling', discipline: 'area-specialist' }
      ],
      statements: [
        {
          id: 'q6',
          text: 'This threat emanated from within Iran as well, with mounting criticism of the continuation of a war without the prospect of victory voiced, not only by the opponents of the regime, but also by a large segment of the population in general.',
          lang: 'en',
          cite: {
            source: 'iranica-gieling-iraq-vii-iran-iraq-war',
            loc: { section: 'IRAQ vii. IRAN-IRAQ WAR', para: '45' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'https://www.iranicaonline.org/articles/iraq-vii-iran-iraq-war'
          }
        },
        {
          id: 'q7',
          text: 'The initial zeal and patriotic support of the population for the war had been replaced by loss of morale among the public and at the front, especially after the intensive Iraqi attacks on Iranian cities and the growing fear that the Iraqis would use chemical weapons against Iranian cities',
          lang: 'en',
          cite: {
            source: 'iranica-gieling-iraq-vii-iran-iraq-war',
            loc: { section: 'IRAQ vii. IRAN-IRAQ WAR', para: '45' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'https://www.iranicaonline.org/articles/iraq-vii-iran-iraq-war'
          }
        }
      ]
    }
  ],
  researched: '2026-10-10'
})
