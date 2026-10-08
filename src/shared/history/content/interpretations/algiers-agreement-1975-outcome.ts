import { defineInterpretation } from '../../schema'

export default defineInterpretation({
  id: 'algiers-agreement-1975-outcome',
  about: ['event:algiers-agreement-1975'],
  topic: 'outcome',
  positions: [
    {
      id: 'ending-misunderstandings-and-fixing-the-river',
      category: 'official',
      holders: [
        {
          kind: 'participant',
          name: 'Mohammad Reza Pahlavi',
          ref: 'person:mohammad-reza-pahlavi'
        },
        { kind: 'state', name: 'Imperial State of Iran' }
      ],
      statements: [
        {
          id: 'q1',
          text: 'President Hussein agreed to negotiate the question of the River Chatt-El-Arab according to international law.',
          lang: 'en',
          cite: {
            source: 'pahlavi-1980-answer-to-history',
            loc: { section: 'The White Revolution' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://archive.org/download/answer-to-history-by-shah-mohammad-reza-pahlavi/Answer%20to%20History%20by%20Shah%20Mohammad%20Reza%20Pahlavi_djvu.txt'
          }
        },
        {
          id: 'q2',
          text: 'As in the case of the Arax River, the waters were divided midway between Iraq and Iran.',
          lang: 'en',
          cite: { source: 'pahlavi-1980-answer-to-history', loc: { section: 'Foreign Policy' } },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://archive.org/download/answer-to-history-by-shah-mohammad-reza-pahlavi/Answer%20to%20History%20by%20Shah%20Mohammad%20Reza%20Pahlavi_djvu.txt'
          }
        },
        {
          id: 'q3',
          text: 'The shah frankly admitted that, “without our support they [Kurds] wouldn’t last ten days against the Iraqis. I spent four and a half hours with Saddam Hossein, and he admitted several times that the presence of our troops and artillery had been the only factor to stand between the Iraqis and total victory”',
          lang: 'en',
          cite: {
            source: 'iranica-milani-iraq-pahlavi',
            loc: { section: 'IRAQ vi. PAHLAVI PERIOD, 1921-79', para: '41' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://www.iranicaonline.org/articles/iraq-vi-pahlavi-period-1921-79/'
          }
        }
      ],
      reception: [
        {
          id: 'q7',
          text: 'Iraq was obliged to give in to Iranian demands concerning the Shatt al-Arab, in exchange for an Iranian promise to end its support of Kurdish rebels',
          lang: 'en',
          cite: {
            source: 'iranica-gieling-iraq-iran-iraq-war',
            loc: { section: 'IRAQ vii. IRAN-IRAQ WAR', para: '9' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://www.iranicaonline.org/articles/iraq-vii-iran-iraq-war/'
          }
        }
      ]
    },
    {
      id: 'iran-failed-to-abide-by-the-protocol',
      category: 'official',
      holders: [
        { kind: 'state', name: 'Iraq' }
      ],
      statements: [
        {
          id: 'q4',
          text: 'Iraq claimed it was engaged in a defensive war and was “obliged to exercise its legitimate right to self-defense of sovereignty and territorial integrity and to recover its territories by force, considering that the Iranian Government had barred the way to all legally recognized ways to resolve the issues emanating from its obligations”',
          lang: 'en',
          cite: {
            source: 'iranica-gieling-iraq-iran-iraq-war',
            loc: { section: 'IRAQ vii. IRAN-IRAQ WAR', para: '5' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://www.iranicaonline.org/articles/iraq-vii-iran-iraq-war/'
          }
        }
      ],
      reception: [
        {
          id: 'q8',
          text: 'The war between Iran and Iraq, lasting nearly eight years, commenced with the Iraqi invasion of Iran on 22 September 1980',
          lang: 'en',
          cite: {
            source: 'iranica-gieling-iraq-iran-iraq-war',
            loc: { section: 'IRAQ vii. IRAN-IRAQ WAR', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://www.iranicaonline.org/articles/iraq-vii-iran-iraq-war/'
          }
        }
      ]
    },
    {
      id: 'recognition-of-iranian-power',
      category: 'scholarly',
      holders: [
        { kind: 'scholar', name: 'Mohsen M. Milani' }
      ],
      statements: [
        {
          id: 'q5',
          text: 'Iraq signed the treaty because it recognized Iran’s superior regional standing and its own inability to score a decisive victory against the Kurds. Iraq recognized that Iran held the key to ending the Kurdish rebellion, and therefore it wisely chose the path of reconciliation with the shah.',
          lang: 'en',
          cite: {
            source: 'iranica-milani-iraq-pahlavi',
            loc: { section: 'IRAQ vi. PAHLAVI PERIOD, 1921-79', para: '41' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://www.iranicaonline.org/articles/iraq-vi-pahlavi-period-1921-79/'
          }
        },
        {
          id: 'q6',
          text: 'Relations became so cordial that the shah relied on Saddam Hossein for assistance when his survival was threatened by a popular revolutionary movement in 1978.',
          lang: 'en',
          cite: {
            source: 'iranica-milani-iraq-pahlavi',
            loc: { section: 'IRAQ vi. PAHLAVI PERIOD, 1921-79', para: '44' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://www.iranicaonline.org/articles/iraq-vi-pahlavi-period-1921-79/'
          }
        }
      ]
    }
  ],
  researched: '2026-10-09'
})
