import { defineInterpretation } from '../../schema'

export default defineInterpretation({
  id: 'amir-kabir-legacy',
  about: ['person:amir-kabir', 'event:reforms-of-amir-kabir'],
  topic: 'legacy',
  researched: '2026-10-06',
  positions: [
    {
      id: 'european-observers',
      category: 'contemporary',
      holders: [
        { kind: 'public', name: 'contemporary and near-contemporary European observers' }
      ],
      statements: [
        {
          id: 'q1',
          text: 'Contemporary and near-contemporary European observers all formed favorable impressions of Amīr Kabīr, seeing in him a unique embodiment of honesty, patriotism, and efficiency.',
          lang: 'en',
          cite: {
            source: 'iranica-algar-amir-kabir',
            loc: { section: 'AMĪR KABĪR, MĪRZĀ TAQĪ KHAN', para: '15' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/amir-e-kabir-mirza-taqi-khan'
          }
        }
      ]
    },
    {
      id: 'qajar-neglect',
      category: 'contemporary',
      holders: [
        { kind: 'public', name: 'his Iranian contemporaries' }
      ],
      statements: [
        {
          id: 'q2',
          text: 'Among his Iranian contemporaries Amīr Kabīr received praise from several poets of the age, notably Sorūš and Qāʾānī, but his services to Iran remained generally unappreciated in the Qajar period.',
          lang: 'en',
          cite: {
            source: 'iranica-algar-amir-kabir',
            loc: { section: 'AMĪR KABĪR, MĪRZĀ TAQĪ KHAN', para: '15' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/amir-e-kabir-mirza-taqi-khan'
          }
        }
      ]
    },
    {
      id: 'progenitor-of-change',
      category: 'scholarly',
      holders: [
        { kind: 'school', name: 'modern Iranian historiography' }
      ],
      statements: [
        {
          id: 'q3',
          text: 'Modern Iranian historiography has done him more justice, depicting him as one of the few capable and honest statesmen to emerge in the Qajar period and the progenitor of various political and social changes that came about half a century later.',
          lang: 'en',
          cite: {
            source: 'iranica-algar-amir-kabir',
            loc: { section: 'AMĪR KABĪR, MĪRZĀ TAQĪ KHAN', para: '15' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/amir-e-kabir-mirza-taqi-khan'
          }
        }
      ]
    },
    {
      id: 'servant-of-the-state',
      category: 'scholarly',
      holders: [
        { kind: 'scholar', name: 'Hamid Algar' }
      ],
      statements: [
        {
          id: 'q4',
          text: 'Amīr Kabīr should be seen primarily, however, as an unusually loyal and effective servant of the traditional state whose primary objective was the strengthening of the central government.',
          lang: 'en',
          cite: {
            source: 'iranica-algar-amir-kabir',
            loc: { section: 'AMĪR KABĪR, MĪRZĀ TAQĪ KHAN', para: '15' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/amir-e-kabir-mirza-taqi-khan'
          }
        },
        {
          id: 'q5',
          text: 'He was only incidentally an agent of modernization and westernization, themes that were elaborated later by men of an ideological disposition alien to the great administrator and man of affairs that was Amīr Kabīr.',
          lang: 'en',
          cite: {
            source: 'iranica-algar-amir-kabir',
            loc: { section: 'AMĪR KABĪR, MĪRZĀ TAQĪ KHAN', para: '15' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/amir-e-kabir-mirza-taqi-khan'
          }
        }
      ]
    }
  ]
})
