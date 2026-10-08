import { defineInterpretation } from '../../schema'

export default defineInterpretation({
  id: 'siege-of-herat-1837-1838-motives',
  about: ['event:siege-of-herat-1837-1838'],
  topic: 'motives',
  researched: '2026-10-08',
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
      category: 'scholarly',
      holders: [
        { kind: 'scholar', name: 'Abbas Amanat' }
      ],
      statements: [
        {
          id: 'q6',
          text: 'McNeill, who after the break in relations headed towards Tabriz, on the way dispatched a letter to the celebrated senior jurist (mojtahed)of Isfahan, Sayyed Moḥammad-Bāqer Šafti, criticizing the Persian government for bringing about the break in relations and urging that “leader of the community,” as he referred to Šafti, to stay clear of the conflict between the two governments. This was a veiled warning to him not to declare jihad against Britain at the behest of the shah and his premier. The mojtahed’s rejoinder, which reached McNeill in September 1838, was conciliatory and showed his awareness of the futility of declaring jihad as had been done in the 1826 war against Russia. Yet he refuted McNeill’s charges and defended the shah’s campaign on the grounds that it was aimed to pacify the eastern frontiers against Turkman and Afghan raids and stop the abduction and enslavement of the Shiʿite inhabitants of Khorasan.',
          lang: 'en',
          cite: {
            source: 'iranica-amanat-herat-vi',
            loc: { section: 'HERAT vi. THE HERAT QUESTION', para: '12' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.iranicaonline.org/articles/herat-vi'
          }
        }
      ]
    },
    {
      id: 'russian-instigation',
      category: 'contemporary',
      holders: [
        { kind: 'participant', name: 'Viscount Palmerston' }
      ],
      statements: [
        {
          id: 'q9',
          text: 'Does the disavowal of Russia—does the recal of her agents—undo the effect that these agents had produced? What had they done with respect to Persia? Had they not negotiated and guaranteed treaties between Candahar and Cabul on the one hand, and Persia on the other—treaties offensive and defensive; and directed specially against the Government of British India? These facts are on record and undeniable.',
          lang: 'en',
          cite: {
            source: 'hansard-commons-1843-03-01-war-with-affghanistan',
            loc: { section: 'HC Deb 01 March 1843 vol 67 cc119-212', para: '13' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://api.parliament.uk/historic-hansard/commons/1843/mar/01/war-with-affghanistan'
          }
        },
        {
          id: 'q7',
          text: 'But it has not been of their seeking; and has been forced upon them by the conduct of the Shah, and by those evil advisers by whom he has allowed himself to be influenced.',
          lang: 'en',
          cite: {
            source: 'gb-foreign-office-1839-correspondence-relating-to-persia-and-affghanistan',
            loc: {
              section: 'No. 111. Viscount Palmerston to the Count Pozzo di Borgo, Foreign Office, December 20, 1838',
              page: '193'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://archive.org/download/india.history.resource.112471/112471_djvu.txt'
          }
        }
      ]
    }
  ]
})
