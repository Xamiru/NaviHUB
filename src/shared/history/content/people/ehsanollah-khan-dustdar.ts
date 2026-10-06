import { definePerson } from '../../schema'

export default definePerson({
  id: 'ehsanollah-khan-dustdar',
  names: [
    { text: 'Ehsanollah Khan Dustdar', lang: 'en', role: 'primary' },
    { text: 'احسان‌الله خان دوستدار', lang: 'fa', role: 'native' }
  ],
  researched: '2026-10-06',
  born: {
    alts: [
      {
        value: { d: '1883' },
        cites: [
          {
            source: 'iranica-chaqueri-ehsan-allah-khan',
            loc: { section: 'EḤSĀN-ALLĀH KHAN DŪSTDĀR', para: '1' }
          }
        ]
      }
    ]
  },
  died: {
    alts: [
      {
        value: { d: '1938', approx: true },
        cites: [
          {
            source: 'iranica-chaqueri-ehsan-allah-khan',
            loc: { section: 'EḤSĀN-ALLĀH KHAN DŪSTDĀR', para: '1' }
          }
        ]
      }
    ]
  },
  diedIn: {
    ref: 'place:baku',
    cites: [
      {
        source: 'iranica-chaqueri-ehsan-allah-khan',
        loc: { section: 'EḤSĀN-ALLĀH KHAN DŪSTDĀR', para: '1' }
      }
    ]
  },
  regions: ['iran', 'russia-central-asia'],
  roles: ['revolutionary'],
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'second most prominent figure in the the Soviet Socialist Republic of Iran (Ḥokūmat-e jomhūrī-e šūrawī-e Īrān), the radicalized second phase of the Jangalī movement in the years 1920-21',
          lang: 'en',
          cite: {
            source: 'iranica-chaqueri-ehsan-allah-khan',
            loc: { section: 'EḤSĀN-ALLĀH KHAN DŪSTDĀR', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/ehsan-allah-khan/'
          }
        },
        {
          id: 'q2',
          text: 'Contrary to the common belief based on his own claim, Eḥsān-Allāh was not among the founders of the Jangalī movement but joined it in 1917',
          lang: 'en',
          cite: {
            source: 'iranica-chaqueri-ehsan-allah-khan',
            loc: { section: 'EḤSĀN-ALLĀH KHAN DŪSTDĀR', para: '2' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/ehsan-allah-khan/'
          }
        }
      ]
    },
    {
      kind: 'later-life',
      quotes: [
        {
          id: 'q3',
          text: 'In 1927, encouraged by revolts against the newly established Pahlavi dynasty in Gīlān, Khorasan, and Azarbaijan in 1926, Eḥsān-Allāh sought Soviet help in returning to Persia and relaunching revolutionary activity for the overthrow of the new monarchy. Help was refused, and his appeals to Josef Stalin and Nikolai Bukharin went unheeded.',
          lang: 'en',
          cite: {
            source: 'iranica-chaqueri-ehsan-allah-khan',
            loc: { section: 'EḤSĀN-ALLĀH KHAN DŪSTDĀR', para: '5' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/ehsan-allah-khan/'
          }
        }
      ]
    },
    {
      kind: 'death',
      quotes: [
        {
          id: 'q4',
          text: 'According to his youngest son, Kāva, Eḥsān-Allāh and his eldest son, Bahman, were arrested in 1937 and killed during the Soviet purges; the exact dates of their deaths have not been made public.',
          lang: 'en',
          cite: {
            source: 'iranica-chaqueri-ehsan-allah-khan',
            loc: { section: 'EḤSĀN-ALLĀH KHAN DŪSTDĀR', para: '6' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/ehsan-allah-khan/'
          }
        }
      ]
    }
  ]
})
