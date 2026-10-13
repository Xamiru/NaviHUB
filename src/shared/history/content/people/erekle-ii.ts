import { definePerson } from '../../schema'

export default definePerson({
  id: 'erekle-ii',
  names: [
    { text: 'Erekle II', lang: 'en', role: 'primary' },
    { text: 'ერეკლე II', lang: 'ka', role: 'native', translit: 'Erekle II' },
    {
      text: 'Heraclius II',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'lc-names-no88006246',
          loc: { section: 'Erekle II, King of Georgia, 1720-1798' }
        }
      ]
    },
    {
      text: 'Erekli II',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'iranica-perry-aga-mohammad-khan-qajar',
          loc: { section: 'ĀḠĀ MOḤAMMAD KHAN QĀJĀR', para: '6' }
        }
      ]
    },
    {
      text: 'Ereklī Khan',
      lang: 'fa-Latn',
      role: 'alternative',
      cites: [
        { source: 'iranica-hitchins-erekle-ii', loc: { section: 'EREKLE II', para: '1' } }
      ]
    }
  ],
  researched: '2026-10-13',
  born: {
    alts: [
      {
        value: { d: '1720' },
        cites: [
          { source: 'iranica-hitchins-erekle-ii', loc: { section: 'EREKLE II', para: '1' } },
          {
            source: 'lc-names-no88006246',
            loc: { section: 'Erekle II, King of Georgia, 1720-1798' }
          }
        ]
      },
      {
        value: { d: '1721-10-07' },
        cites: [
          { source: 'iranica-hitchins-erekle-ii', loc: { section: 'EREKLE II', para: '1' } }
        ],
        heldBy: [
          { kind: 'scholar', name: 'Cyril Toumanoff', discipline: 'historian' }
        ]
      }
    ]
  },
  died: {
    alts: [
      {
        value: { d: '1798-01-11' },
        cites: [
          { source: 'iranica-hitchins-erekle-ii', loc: { section: 'EREKLE II', para: '1' } }
        ]
      }
    ]
  },
  regions: ['russia-central-asia', 'iran'],
  roles: ['monarch'],
  portrait: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/6/63/Heraclius_II_of_Georgia%2C_copy_by_Grigory_Gagarin.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Heraclius_II_of_Georgia,_copy_by_Grigory_Gagarin.jpg',
    credit: { creator: 'Grigory Gagarin' },
    license: { id: 'cc0' }
  },
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'Erekle succeeded his father as King of Kartli in 1762, and thus he united eastern Georgia politically for the first time in three centuries.',
          lang: 'en',
          cite: { source: 'iranica-hitchins-erekle-ii', loc: { section: 'EREKLE II', para: '4' } },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/erekle-ii'
          }
        }
      ]
    },
    {
      kind: 'career',
      quotes: [
        {
          id: 'q2',
          text: 'Erekle spent his early years in the service of Nāder Shah, who ended the temporary Ottoman hold on eastern Georgia in two campaigns in 1734 and 1735.',
          lang: 'en',
          cite: { source: 'iranica-hitchins-erekle-ii', loc: { section: 'EREKLE II', para: '2' } },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/erekle-ii'
          }
        },
        {
          id: 'q3',
          text: 'Erekle took advantage of political instability in Persia after Nāder’s death to assert his independence.',
          lang: 'en',
          cite: { source: 'iranica-hitchins-erekle-ii', loc: { section: 'EREKLE II', para: '3' } },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/erekle-ii'
          }
        },
        {
          id: 'q4',
          text: 'Erekle finally obtained the guarantees he had sought from Russia when he and Catherine II concluded the Treaty of Georgievsk in 1783',
          lang: 'en',
          cite: { source: 'iranica-hitchins-erekle-ii', loc: { section: 'EREKLE II', para: '7' } },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/erekle-ii'
          }
        },
        {
          id: 'q5',
          text: 'Āḡā Moḥammad Khan Qājār, who had become master of the central Iranian plateau by 1794, was determined to recover provinces in the north that had once belonged to the Safavid empire.',
          lang: 'en',
          cite: { source: 'iranica-hitchins-erekle-ii', loc: { section: 'EREKLE II', para: '8' } },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/erekle-ii'
          }
        }
      ]
    },
    {
      kind: 'death',
      quotes: [
        {
          id: 'q6',
          text: 'Erekle died in 1798 convinced that only Russian protection could ensure the continued existence of his country.',
          lang: 'en',
          cite: { source: 'iranica-hitchins-erekle-ii', loc: { section: 'EREKLE II', para: '9' } },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/erekle-ii'
          }
        }
      ]
    }
  ]
})
