import { defineInterpretation } from '../../schema'

export default defineInterpretation({
  id: 'subjugation-of-sheikh-khazal-british-role',
  about: ['event:subjugation-of-sheikh-khazal', 'person:sheikh-khazal'],
  topic: 'foreign-role',
  researched: '2026-10-06',
  positions: [
    {
      id: 'against-british-opposition',
      category: 'scholarly',
      holders: [
        { kind: 'scholar', name: 'Ehsan Yarshater' },
        { kind: 'scholar', name: 'Shahbaz Shahnavaz' }
      ],
      statements: [
        {
          id: 'q1',
          text: 'His crowning achievement in this respect was his elimination in 1924 of Shaikh Ḵazʿal, the virtual sovereign of Khuzestan, in spite of the opposition of the British, who protected him as a safeguard for their oil interests in the region.',
          lang: 'en',
          cite: {
            source: 'iranica-yarshater-iranian-history-islamic-period-5',
            loc: {
              section: 'IRAN ii. IRANIAN HISTORY (2) Islamic period, Reza Shah Pahlavi (1925-41)'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/iran-ii2-islamic-period-page-5/'
          }
        },
        {
          id: 'q2',
          text: 'The British tried to force him to change his mind, and the legation in Tehran even gave the Iranian Foreign Ministry two harsh notes, which contained veiled threats and ultimatum.',
          lang: 'en',
          cite: {
            source: 'iranica-shahnavaz-kazal-khan',
            loc: { section: 'ḴAZʿAL KHAN', para: '33' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/kazal-khan/'
          }
        }
      ]
    },
    {
      id: 'british-non-intervention',
      category: 'scholarly',
      holders: [
        { kind: 'scholar', name: 'Ronald W. Ferrier' }
      ],
      statements: [
        {
          id: 'q3',
          text: 'Shaikh Ḵaẓʿal was more obstinate and eventually had to be warned by the British Prime Minister, Ramsay MacDonald, that “in the regrettable event of hostilities, you must expect no sympathy whatever from me” (Waterfield. op. cit., p. 85), an attitude which dismayed some British consular officials.',
          lang: 'en',
          cite: {
            source: 'iranica-ferrier-anglo-iranian-relations-pahlavi',
            loc: { section: 'ANGLO-IRANIAN RELATIONS iii. Pahlavi period', para: '10' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/anglo-iranian-relations-iii/'
          }
        },
        {
          id: 'q4',
          text: 'It was however, a recognition of political realities and was in accordance with a policy of non-intervention in Iranian affairs, which Loraine was adopting, but which most Iranians found hardly credible.',
          lang: 'en',
          cite: {
            source: 'iranica-ferrier-anglo-iranian-relations-pahlavi',
            loc: { section: 'ANGLO-IRANIAN RELATIONS iii. Pahlavi period', para: '10' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/anglo-iranian-relations-iii/'
          }
        },
        {
          id: 'q5',
          text: 'Loraine was under no doubt that “the cohesion of the Persian Empire as a whole is far more important to British interests generally and in the long run than the local supremacy of any one of our particular protégés”',
          lang: 'en',
          cite: {
            source: 'iranica-ferrier-anglo-iranian-relations-pahlavi',
            loc: { section: 'ANGLO-IRANIAN RELATIONS iii. Pahlavi period', para: '9' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/anglo-iranian-relations-iii/'
          }
        }
      ]
    }
  ]
})
