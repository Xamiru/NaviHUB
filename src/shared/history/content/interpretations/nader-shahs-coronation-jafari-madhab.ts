import { defineInterpretation } from '../../schema'

export default defineInterpretation({
  id: 'nader-shahs-coronation-jafari-madhab',
  about: ['event:nader-shahs-coronation-1736'],
  topic: 'nature',
  framing: {
    id: 'q1',
    text: 'Nāder tried to redefine religious and political legitimacy in Persia at symbolic and substantive levels.',
    lang: 'en',
    cite: { source: 'iranica-tucker-nader-shah', loc: { section: 'NĀDER SHAH', para: '15' } },
    provenance: { via: 'web', at: '2026-10-13', url: 'https://www.iranicaonline.org/articles/nader-shah' }
  },
  positions: [
    {
      id: 'limit-conflict',
      category: 'scholarly',
      holders: [
        { kind: 'scholar', name: 'Ernest Tucker', discipline: 'historian' }
      ],
      statements: [
        {
          id: 'q2',
          text: 'Nāder departed substantially from Safavid precedent by redefining Shiʿism as the Jaʿfari maḏhab of Sunni Islam and promoting the common Turkmen descent of the contemporary Muslim rulers as a basis for international relations.',
          lang: 'en',
          cite: { source: 'iranica-tucker-nader-shah', loc: { section: 'NĀDER SHAH', para: '17' } },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/nader-shah'
          }
        },
        {
          id: 'q3',
          text: 'The Jaʿfari maḏhab proposal also seems intended as tool to smooth relations between the Sunni and Shiʿite components of his own army.',
          lang: 'en',
          cite: { source: 'iranica-tucker-nader-shah', loc: { section: 'NĀDER SHAH', para: '17' } },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/nader-shah'
          }
        },
        {
          id: 'q4',
          text: 'Nāder’s novel concepts regarding the Jaʿfari maḏhab and common “Turkmen” descent were directed primarily at the Ottomans and Mughals.',
          lang: 'en',
          cite: { source: 'iranica-tucker-nader-shah', loc: { section: 'NĀDER SHAH', para: '19' } },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/nader-shah'
          }
        }
      ]
    },
    {
      id: 'external-legitimacy',
      category: 'scholarly',
      holders: [
        { kind: 'scholar', name: 'Ernest Tucker', discipline: 'historian' }
      ],
      statements: [
        {
          id: 'q5',
          text: 'Nāder, on the other hand, wanted the most important ruler in the Sunni Muslim world, the Ottoman sultan, to grant external legitimacy to his attempt to overcome what he perceived as the burden imposed on Persia by its Safavid Shiʿite legacy.',
          lang: 'en',
          cite: {
            source: 'iranica-tucker-ottoman-persian-relations-afsharid-zand',
            loc: { section: 'OTTOMAN-PERSIAN RELATIONS ii. AFSHARID AND ZAND PERIODS', para: '11' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/ottoman-persian-relations-ii'
          }
        },
        {
          id: 'q6',
          text: 'The 1148/1736 talks thus began the transition from an Ottoman-Persian relationship which, although peaceful for many years, could never transcend certain basic religious disputes, to a more stable tie in which the common Muslim identity of Ottomans and Persians was formally recognized as more important than their sectarian differences.',
          lang: 'en',
          cite: {
            source: 'iranica-tucker-ottoman-persian-relations-afsharid-zand',
            loc: { section: 'OTTOMAN-PERSIAN RELATIONS ii. AFSHARID AND ZAND PERIODS', para: '14' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/ottoman-persian-relations-ii'
          }
        }
      ]
    }
  ],
  researched: '2026-10-13'
})
