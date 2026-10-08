import { defineInterpretation } from '../../schema'

export default defineInterpretation({
  id: 'oil-agreement-of-1933-assessment',
  about: ['event:cancellation-of-the-darcy-concession'],
  topic: 'outcome',
  researched: '2026-10-07',
  framing: {
    id: 'q1',
    text: 'There were a number of provisions in the 1933 Agreement, which planted the seeds of future controversies and disputes between the two parties.',
    lang: 'en',
    cite: {
      source: 'iranica-mina-oil-agreements',
      loc: { section: 'OIL AGREEMENTS IN IRAN', para: '16' }
    },
    provenance: {
      via: 'web',
      at: '2026-10-06',
      url: 'https://www.iranicaonline.org/articles/oil-agreements-in-iran/'
    }
  },
  positions: [
    {
      id: 'better-than-darcy',
      category: 'scholarly',
      holders: [
        { kind: 'scholar', name: 'Parviz Mina' }
      ],
      statements: [
        {
          id: 'q2',
          text: 'Despite the above shortcomings, the terms of 1933 agreement were considerably better than those entailed in the D’Arcy concession and there were no known concession agreements with better terms at that time, particularly since Iran did not give up its title to the totality of APOC’s petroleum activities throughout the world.',
          lang: 'en',
          cite: {
            source: 'iranica-mina-oil-agreements',
            loc: { section: 'OIL AGREEMENTS IN IRAN', para: '17' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/oil-agreements-in-iran/'
          }
        }
      ]
    },
    {
      id: 'plucked',
      category: 'contemporary',
      holders: [
        { kind: 'participant', name: 'Sir John Cadman' }
      ],
      statements: [
        {
          id: 'q3',
          text: 'I felt that we had been pretty well plucked',
          lang: 'en',
          cite: {
            source: 'iranica-mina-oil-agreements',
            loc: { section: 'OIL AGREEMENTS IN IRAN', para: '17' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://www.iranicaonline.org/articles/oil-agreements-in-iran/'
          }
        }
      ]
    },
    {
      id: 'not-in-iran-s-favor',
      category: 'scholarly',
      holders: [
        { kind: 'scholar', name: 'Farhad Kazemi' }
      ],
      statements: [
        {
          id: 'q4',
          text: 'Although these provisions appeared to be important gains for Iran, as a whole the new concession was not in its favor.',
          lang: 'en',
          cite: {
            source: 'iranica-kazemi-anglo-persian-oil-company',
            loc: { section: 'ANGLO-PERSIAN OIL COMPANY', para: '8' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/anglo-persian-oil-company/'
          }
        },
        {
          id: 'q5',
          text: 'It extended the life of the original D’Arcy concession by another thirty-two years and allowed the APOC to select the best 100,000 square miles; the minimum guaranteed royalty was far too low, and the company was exempted from any import or customs duties; disputes were to be settled through an elaborate arbitration procedure, and Iran gave up its right to annul the agreement either through legislation or by administrative measures',
          lang: 'en',
          cite: {
            source: 'iranica-kazemi-anglo-persian-oil-company',
            loc: { section: 'ANGLO-PERSIAN OIL COMPANY', para: '8' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/anglo-persian-oil-company/'
          }
        }
      ]
    },
    {
      id: 'yielded-under-threat',
      category: 'scholarly',
      holders: [
        { kind: 'scholar', name: 'Ehsan Yarshater' }
      ],
      statements: [
        {
          id: 'q6',
          text: 'Threatened by the British, Reżā Shah, who had stood firm in demanding the abolishment of the D’Arcy oil concession, suddenly acquieces to British demands, much to the chagrin and disappointment of his Cabinet. A new agreement with the Anglo-Persian Oil Company is signed, with Persia abandoning many of its claims.',
          lang: 'en',
          cite: {
            source: 'iranica-yarshater-chronology-part-3',
            loc: { section: 'Chronology of Iranian History Part 3, 1933' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/chronology-of-iranian-history-part-3/'
          }
        }
      ]
    },
    {
      id: 'sell-out',
      category: 'popular',
      holders: [
        { kind: 'public', name: 'Iranian politicians after Reza Shah’s abdication' }
      ],
      statements: [
        {
          id: 'q7',
          text: 'However, in later years and after Reza Shah’s abdication, this extension was strongly condemned by Iranian politicians as a sell-out of Iranian interests.',
          lang: 'en',
          cite: {
            source: 'iranica-mina-oil-agreements',
            loc: { section: 'OIL AGREEMENTS IN IRAN', para: '16' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/oil-agreements-in-iran/'
          }
        }
      ]
    }
  ]
})
