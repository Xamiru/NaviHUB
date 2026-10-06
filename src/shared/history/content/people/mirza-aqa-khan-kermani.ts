import { definePerson } from '../../schema'

export default definePerson({
  id: 'mirza-aqa-khan-kermani',
  names: [
    { text: 'Mirza Aqa Khan Kermani', lang: 'en', role: 'primary' },
    { text: 'میرزا آقاخان کرمانی', lang: 'fa', role: 'native' },
    {
      text: 'Mīrzā ʿAbd-al-Ḥosayn Āqā Khan Kermāni',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'iranica-gustafson-kerman-qajar',
          loc: { section: 'KERMAN ix. History in the Qajar Period', para: '18' }
        }
      ]
    }
  ],
  researched: '2026-10-06',
  born: {
    alts: [
      {
        value: { d: '1854' },
        cites: [
          {
            source: 'iranica-amanat-constitutional-revolution-intellectual-background',
            loc: { section: 'CONSTITUTIONAL REVOLUTION i. Intellectual background', para: '8' }
          },
          {
            source: 'iranica-yarshater-iranian-history-islamic-period-5',
            loc: { section: 'IRAN ii. IRANIAN HISTORY (2) Islamic period, Qajar period' }
          },
          {
            source: 'iranica-gustafson-kerman-qajar',
            loc: { section: 'KERMAN ix. History in the Qajar Period', para: '18' }
          }
        ],
        heldBy: [
          { kind: 'scholar', name: 'Abbas Amanat' },
          { kind: 'scholar', name: 'Ehsan Yarshater' },
          { kind: 'scholar', name: 'James M. Gustafson' }
        ]
      },
      {
        value: { d: '1853' },
        cites: [
          {
            source: 'iranica-yarshater-chronology-part-2',
            loc: { section: 'Chronology of Iranian History Part 2, 1896' }
          }
        ],
        heldBy: [
          { kind: 'scholar', name: 'Ehsan Yarshater' }
        ]
      }
    ]
  },
  died: {
    alts: [
      {
        value: { d: '1896-07' },
        cites: [
          {
            source: 'iranica-gustafson-kerman-qajar',
            loc: { section: 'KERMAN ix. History in the Qajar Period', para: '18' }
          },
          {
            source: 'iranica-bayat-aqa-khan-kermani',
            loc: { section: 'ĀQĀ KHAN KERMĀNĪ, MĪRZĀ ʿABD-AL-ḤOSAYN', para: '2' }
          }
        ]
      }
    ]
  },
  diedIn: {
    ref: 'place:tabriz',
    cites: [
      {
        source: 'iranica-gustafson-kerman-qajar',
        loc: { section: 'KERMAN ix. History in the Qajar Period', para: '18' }
      }
    ]
  },
  regions: ['iran', 'mena'],
  roles: ['writer', 'revolutionary'],
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'ĀQĀ KHAN KERMĀNĪ, MĪRZĀ ʿABD-AL-ḤOSAYN (1270-1314/1854-55 to 1896), Iranian writer and intellectual, and an outstanding example of a first-generation secular nationalist.',
          lang: 'en',
          cite: {
            source: 'iranica-bayat-aqa-khan-kermani',
            loc: { section: 'ĀQĀ KHAN KERMĀNĪ, MĪRZĀ ʿABD-AL-ḤOSAYN', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/aqa-khan-kermani'
          }
        },
        {
          id: 'q2',
          text: 'Kermānī (1270-1314/1854-96), a writer and activist in the Istanbul expatriate circle with socialist leanings, also advocated the need for a constitutional regime and a secular culture and even anticipated the occurrence of a popular revolution.',
          lang: 'en',
          cite: {
            source: 'iranica-amanat-constitutional-revolution-intellectual-background',
            loc: { section: 'CONSTITUTIONAL REVOLUTION i. Intellectual background', para: '8' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/constitutional-revolution-i'
          }
        }
      ]
    },
    {
      kind: 'career',
      quotes: [
        {
          id: 'q3',
          text: 'His most productive years were spent in Istanbul, where he established a close relationship with the famous ideologue and political activist Jamāl-al-Din Afḡāni.',
          lang: 'en',
          cite: {
            source: 'iranica-gustafson-kerman-qajar',
            loc: { section: 'KERMAN ix. History in the Qajar Period', para: '18' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/kerman-09-qajar-period'
          }
        }
      ]
    },
    {
      kind: 'ideas',
      quotes: [
        {
          id: 'q4',
          text: 'Mīrzā Āqā Khan genuinely wished to see Iran modernize, so that its people would enjoy better living conditions and a better intellectual environment. He was one of the first Iranians to judge Iran by European standards and thus to perceive intellectual and social backwardness in the country. Unlike some of his contemporary statesmen and fellow revolutionaries in the 1880s and 1890s, he openly denounced Muslim institutions, the political regime, and the educational system as the real causes of national stagnation. At that point, very few were prepared to agree with him; a quarter-century later, his words found an echo in the works of Aḥmad Kasravī.',
          lang: 'en',
          cite: {
            source: 'iranica-bayat-aqa-khan-kermani',
            loc: { section: 'ĀQĀ KHAN KERMĀNĪ, MĪRZĀ ʿABD-AL-ḤOSAYN', para: '4' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/aqa-khan-kermani'
          }
        }
      ]
    },
    {
      kind: 'death',
      quotes: [
        {
          id: 'q5',
          text: 'A few months later, following the assassination of Nāṣer-al-dīn Shah (1313/1896) at the hand of an alleged Bābī closely associated with Afḡānī, the three men were also charged with murder; in Ḏu’l-ḥeǰǰa, 1313/May, 1896, they were extradited to Iran and executed in Tabrīz in Ṣafar, 1314/July, 1896.',
          lang: 'en',
          cite: {
            source: 'iranica-bayat-aqa-khan-kermani',
            loc: { section: 'ĀQĀ KHAN KERMĀNĪ, MĪRZĀ ʿABD-AL-ḤOSAYN', para: '2' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/aqa-khan-kermani'
          }
        }
      ]
    }
  ]
})
