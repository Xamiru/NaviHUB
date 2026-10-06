import { defineInterpretation } from '../../schema'

export default defineInterpretation({
  id: 'siege-of-herat-1837-1838-motives',
  about: ['event:siege-of-herat-1837-1838'],
  topic: 'motives',
  researched: '2026-10-06',
  framing: {
    id: 'q1',
    text: 'The Herat campaign (1837-38) illustrates Anglo-Russian rivalry over Persia and Afghanistan, which were considered as buffer-states.',
    lang: 'en',
    cite: {
      source: 'iranica-calmard-mohammad-shah',
      loc: { section: 'MOḤAMMAD SHAH QĀJĀR', para: '11' }
    },
    provenance: {
      via: 'web',
      at: '2026-10-06',
      url: 'https://www.iranicaonline.org/articles/mohammad-shah'
    }
  },
  positions: [
    {
      id: 'shah-and-aqasi',
      category: 'scholarly',
      holders: [
        { kind: 'scholar', name: 'Jean Calmard' }
      ],
      statements: [
        {
          id: 'q2',
          text: 'Despite the growing Russian influence in Persia, and particularly the encouragements given to the shah by Simonich and his assistant Goutte to attack Herat (Yapp, p. 294), the inspiration behind the Herat campaign came from the shah himself and Āqāsi.',
          lang: 'en',
          cite: {
            source: 'iranica-calmard-mohammad-shah',
            loc: { section: 'MOḤAMMAD SHAH QĀJĀR', para: '12' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/mohammad-shah'
          }
        }
      ]
    },
    {
      id: 'throne-and-russian-favour',
      category: 'scholarly',
      holders: [
        { kind: 'scholar', name: 'Abbas Amanat', discipline: 'historian' }
      ],
      statements: [
        {
          id: 'q3',
          text: 'He viewed military victory over Herat necessary not only for the consolidation of his throne, but also to please the Russian representative at his court, the energetic Comte Simonitch.',
          lang: 'en',
          cite: {
            source: 'iranica-amanat-herat-vi',
            loc: { section: 'HERAT vi. THE HERAT QUESTION', para: '10' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/herat-vi'
          }
        },
        {
          id: 'q4',
          text: 'Moreover, Moḥammad Shah could not afford to overlook the Afghan and Turkman ravaging sorties in the east, backed by Kāmrān Mirzā and Yār-Moḥammad Khan.',
          lang: 'en',
          cite: {
            source: 'iranica-amanat-herat-vi',
            loc: { section: 'HERAT vi. THE HERAT QUESTION', para: '10' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/herat-vi'
          }
        },
        {
          id: 'q5',
          text: 'The increasing hardship suffered by the Shiʿites of Herat at the hands of the Sunni tribesmen, a major motivation for the Herat campaign, forced many of them to take refuge in the towns and cities of Khorasan.',
          lang: 'en',
          cite: {
            source: 'iranica-amanat-herat-vi',
            loc: { section: 'HERAT vi. THE HERAT QUESTION', para: '14' }
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
      id: 'frontier-pacification',
      category: 'contemporary',
      holders: [
        { kind: 'participant', name: 'Sayyed Moḥammad-Bāqer Šafti' }
      ],
      statements: [
        {
          id: 'q6',
          text: 'Yet he refuted McNeill’s charges and defended the shah’s campaign on the grounds that it was aimed to pacify the eastern frontiers against Turkman and Afghan raids and stop the abduction and enslavement of the Shiʿite inhabitants of Khorasan.',
          lang: 'en',
          cite: {
            source: 'iranica-amanat-herat-vi',
            loc: { section: 'HERAT vi. THE HERAT QUESTION', para: '12' }
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
      id: 'russian-instigation',
      category: 'contemporary',
      holders: [
        { kind: 'participant', name: 'Lord Palmerston' },
        { kind: 'state', name: 'British Foreign Office' }
      ],
      statements: [
        {
          id: 'q7',
          text: 'Palmerston viewed the Persian effort as an expansionist move instigated by Russia.',
          lang: 'en',
          cite: {
            source: 'iranica-amanat-great-britain-ii',
            loc: {
              section: 'GREAT BRITAIN ii. British influence in Persia in the 19th century',
              para: '12'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/great-britain-ii/'
          }
        },
        {
          id: 'q8',
          text: 'Yet the Russophobes in the British establishment, headed by Lord Palmerston, viewed with alarm the growing Russian influence in Tehran.',
          lang: 'en',
          cite: {
            source: 'iranica-amanat-herat-vi',
            loc: { section: 'HERAT vi. THE HERAT QUESTION', para: '10' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/herat-vi'
          }
        },
        {
          id: 'q9',
          text: 'In their eyes, Persian control of Herat was a sure license for Russians to foment tribal anti-British agitation in Afghanistan.',
          lang: 'en',
          cite: {
            source: 'iranica-amanat-herat-vi',
            loc: { section: 'HERAT vi. THE HERAT QUESTION', para: '10' }
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
