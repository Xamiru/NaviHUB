import { defineInterpretation } from '../../schema'

export default defineInterpretation({
  id: 'abbas-mirza-khorasan-campaign-motives',
  about: ['event:abbas-mirza-khorasan-campaign'],
  topic: 'motives',
  researched: '2026-10-08',
  positions: [
    {
      id: 'safavid-reconquest',
      category: 'scholarly',
      holders: [
        { kind: 'scholar', name: 'Heribert Busse' }
      ],
      statements: [
        {
          id: 'q1',
          text: 'The chroniclers assert that he planned the conquest of Ḵīva and Afghanistan, lands that had once formed part of the Safavid empire, and conducted negotiations with the vizier of Herat and the khan of Ḵoqand (Hedāyat, X, pp. 30-32).',
          lang: 'en',
          cite: {
            source: 'iranica-busse-abbas-mirza',
            loc: { section: 'ʿABBĀS MĪRZĀ QAJAR', para: '7' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/abbas-mirza'
          }
        }
      ]
    },
    {
      id: 'compensation-and-succession',
      category: 'scholarly',
      holders: [
        { kind: 'scholar', name: 'Heribert Busse' }
      ],
      statements: [
        {
          id: 'q2',
          text: 'In the eyes of more objective observers, however, the Khorasan expeditions were an attempt to compensate for the defeats in Azarbaijan by scoring victories over weaker enemies; he might thus reinforce his claim to the throne (Fraser, Koordistan II, pp. 25-29).',
          lang: 'en',
          cite: {
            source: 'iranica-busse-abbas-mirza',
            loc: { section: 'ʿABBĀS MĪRZĀ QAJAR', para: '7' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/abbas-mirza'
          }
        }
      ]
    },
    {
      id: 'russian-favour',
      category: 'scholarly',
      holders: [
        { kind: 'scholar', name: 'Abbas Amanat' }
      ],
      statements: [
        {
          id: 'q3',
          text: 'In the view of most British observers, the Turkmanchay treaty of 1828, which guaranteed the crown prince’s succession, had turned ʿAbbās Mirzā into a virtual captive of Russian favor if not an agent implementing their wishes.',
          lang: 'en',
          cite: {
            source: 'iranica-amanat-herat-vi',
            loc: { section: 'HERAT vi. THE HERAT QUESTION', para: '7' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/herat-vi'
          }
        }
      ]
    },
    {
      id: 'credibility-and-great-game',
      category: 'scholarly',
      holders: [
        { kind: 'scholar', name: 'Abbas Amanat', discipline: 'historian' }
      ],
      statements: [
        {
          id: 'q4',
          text: 'Campaigning in Khorasan would have allowed ʿAbbās to restore his military credibility and prove the worth of the New Army of Azarbaijan.',
          lang: 'en',
          cite: {
            source: 'iranica-amanat-herat-vi',
            loc: { section: 'HERAT vi. THE HERAT QUESTION', para: '7' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/herat-vi'
          }
        },
        {
          id: 'q5',
          text: 'ʿAbbās Mirzā’s Herat campaign was marred from the start by this Anglo-Russian clash of interests, which formed the first major episode of colonial power rivalry in Qajar history and the prelude to what came to be known as the Great Game (Ingram, pp. 249-55).',
          lang: 'en',
          cite: {
            source: 'iranica-amanat-herat-vi',
            loc: { section: 'HERAT vi. THE HERAT QUESTION', para: '9' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/herat-vi'
          }
        },
        {
          id: 'q6',
          text: 'From the start, Russia pressured the reluctant ʿAbbās Mirzā, whose judgement was impaired because of a grave illness, to take Herat.',
          lang: 'en',
          cite: {
            source: 'iranica-amanat-herat-vi',
            loc: { section: 'HERAT vi. THE HERAT QUESTION', para: '9' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/herat-vi'
          }
        }
      ]
    }
  ]
})
