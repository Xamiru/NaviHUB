import { defineInterpretation } from '../../schema'

export default defineInterpretation({
  id: 'haji-mirza-aqasi-reputation',
  about: ['person:haji-mirza-aqasi'],
  topic: 'character',
  researched: '2026-10-06',
  framing: {
    id: 'q1',
    text: 'Unfortunate in being placed chronologically in between two statesmen of great reputations, Qāʾem-maqām and Amīr Kabīr, his own personal weaknesses helped to highlight this negative image.',
    lang: 'en',
    cite: { source: 'iranica-amanat-aqasi', loc: { section: 'ĀQĀSĪ, ḤĀJJĪ MĪRZĀ', para: '20' } },
    provenance: {
      via: 'web',
      at: '2026-10-06',
      url: 'https://www.iranicaonline.org/articles/aqasff-ujuli-mnsz-adras-ivxni-ca'
    }
  },
  positions: [
    {
      id: 'incompetent-rascal',
      category: 'popular',
      holders: [
        { kind: 'public', name: 'Contemporaries and modern accounts' }
      ],
      statements: [
        {
          id: 'q2',
          text: 'Āqāsī is often portrayed both by his contemporaries and in modern accounts as an incompetent rascal with a career blistered by sheer ignorance and political blunders.',
          lang: 'en',
          cite: {
            source: 'iranica-amanat-aqasi',
            loc: { section: 'ĀQĀSĪ, ḤĀJJĪ MĪRZĀ', para: '20' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/aqasff-ujuli-mnsz-adras-ivxni-ca'
          }
        }
      ]
    },
    {
      id: 'satire',
      category: 'contemporary',
      holders: [
        { kind: 'public', name: 'A contemporary satirist' }
      ],
      statements: [
        {
          id: 'q3',
          text: '“Not a farthing did Ḥāǰǰī (Āqāsī) leave in the Shah’s coffers; all was spent on guns and the irrigation of qanāts. Neither did the friend’s crop see a drop of that water, nor was the enemy bothered by that gun”',
          lang: 'en',
          cite: {
            source: 'iranica-amanat-aqasi',
            loc: { section: 'ĀQĀSĪ, ḤĀJJĪ MĪRZĀ', para: '16' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/aqasff-ujuli-mnsz-adras-ivxni-ca'
          }
        }
      ]
    },
    {
      id: 'russian-cipher',
      category: 'contemporary',
      holders: [
        { kind: 'state', name: 'British Foreign Office' }
      ],
      statements: [
        {
          id: 'q4',
          text: 'Desperate moves by the embattled premier to ingratiate himself with the bellicose Russians, infuriated the Foreign Office who viewed him as a Russian cipher and refused to offer his administration any backing even before the Herat campaign of 1838.',
          lang: 'en',
          cite: {
            source: 'iranica-amanat-great-britain-ii',
            loc: {
              section: 'GREAT BRITAIN ii. British influence in Persia in the 19th century',
              para: '11'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/great-britain-ii/'
          }
        }
      ]
    },
    {
      id: 'administrative-failure',
      category: 'scholarly',
      holders: [
        { kind: 'scholar', name: 'Jean Calmard' }
      ],
      statements: [
        {
          id: 'q5',
          text: 'Totally lacking any administrative experience, he brought the state on the verge of bankruptcy.',
          lang: 'en',
          cite: {
            source: 'iranica-calmard-mohammad-shah',
            loc: { section: 'MOḤAMMAD SHAH QĀJĀR', para: '17' }
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
      id: 'better-than-reputation',
      category: 'scholarly',
      holders: [
        { kind: 'scholar', name: 'Abbas Amanat', discipline: 'historian' }
      ],
      statements: [
        {
          id: 'q6',
          text: 'On both these accounts, though he failed to achieve any enduring results, Āqāsī’s record was better than his reputation.',
          lang: 'en',
          cite: { source: 'iranica-amanat-aqasi', loc: { section: 'ĀQĀSĪ, ḤĀJJĪ MĪRZĀ', para: '8' } },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/aqasff-ujuli-mnsz-adras-ivxni-ca'
          }
        },
        {
          id: 'q7',
          text: 'He is often blamed for losses and failures out of proportion with the capability of any statesman in a position similar to his, when foreign aggression, domestic turbulence, public discontent and court intrigues left little room for more noble aspirations.',
          lang: 'en',
          cite: {
            source: 'iranica-amanat-aqasi',
            loc: { section: 'ĀQĀSĪ, ḤĀJJĪ MĪRZĀ', para: '20' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/aqasff-ujuli-mnsz-adras-ivxni-ca'
          }
        },
        {
          id: 'q8',
          text: 'Perhaps a more admirable quality was Āqāsī’s relative tolerance and impunity towards his adversaries once he was assured of their harmlessness.',
          lang: 'en',
          cite: {
            source: 'iranica-amanat-aqasi',
            loc: { section: 'ĀQĀSĪ, ḤĀJJĪ MĪRZĀ', para: '22' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/aqasff-ujuli-mnsz-adras-ivxni-ca'
          }
        }
      ]
    }
  ]
})
