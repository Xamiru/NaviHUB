import { defineInterpretation } from '../../schema'

export default defineInterpretation({
  id: 'fath-ali-shah-character',
  about: ['person:fath-ali-shah-qajar'],
  topic: 'character',
  researched: '2026-10-06',
  framing: {
    id: 'q1',
    text: 'Despite his posthumous image of carnal debauchery and irresponsible pleasure-seeking, in his own time Fatḥ-ʿAli Shah was regarded as a man of “elegant manners and many accomplishments” who was “very regular in the execution of his public duties.”',
    lang: 'en',
    cite: {
      source: 'iranica-amanat-fath-ali-shah',
      loc: { section: 'FATḤ-ʿALĪ SHAH QĀJĀR', para: '32' }
    },
    provenance: {
      via: 'web',
      at: '2026-10-06',
      url: 'https://www.iranicaonline.org/articles/fath-ali-shah'
    }
  },
  positions: [
    {
      id: 'malcolm-1800',
      category: 'contemporary',
      holders: [
        { kind: 'participant', name: 'John Malcolm', ref: 'person:john-malcolm' }
      ],
      statements: [
        {
          id: 'q2',
          text: 'He described him as “above the middle size, his age little more than thirty, his complexion rather fair, his features regular and fine, with an expression denoting quickness and intelligence.”',
          lang: 'en',
          cite: {
            source: 'iranica-amanat-fath-ali-shah',
            loc: { section: 'FATḤ-ʿALĪ SHAH QĀJĀR', para: '21' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/fath-ali-shah'
          }
        }
      ]
    },
    {
      id: 'jones-amiable-mind',
      category: 'contemporary',
      holders: [
        {
          kind: 'participant',
          name: 'Harford Jones Brydges',
          ref: 'person:harford-jones-brydges'
        }
      ],
      statements: [
        {
          id: 'q3',
          text: 'the shah possessed “not only a very strong, but a very amiable mind; and the remarks which he made, and the inferences he drew from time to time, manifested very considerable power of reflection.”',
          lang: 'en',
          cite: {
            source: 'iranica-amanat-fath-ali-shah',
            loc: { section: 'FATḤ-ʿALĪ SHAH QĀJĀR', para: '21' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/fath-ali-shah'
          }
        }
      ]
    },
    {
      id: 'fraser-1830s',
      category: 'contemporary',
      holders: [
        { kind: 'participant', name: 'James Baillie Fraser' }
      ],
      statements: [
        {
          id: 'q4',
          text: 'He is “by nature unwarlike,” and “by no means remarkable for personal courage,” wrote Fraser.',
          lang: 'en',
          cite: {
            source: 'iranica-amanat-fath-ali-shah',
            loc: { section: 'FATḤ-ʿALĪ SHAH QĀJĀR', para: '23' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/fath-ali-shah'
          }
        }
      ]
    },
    {
      id: 'amanat-changing-image',
      category: 'scholarly',
      holders: [
        { kind: 'scholar', name: 'Abbas Amanat' }
      ],
      statements: [
        {
          id: 'q5',
          text: 'Yet in the 1820s and early 1830s the shah’s image in the eyes of Westerners was gradually transformed as his country sustained defeat in the war with Russia and in turn relied more heavily on Britain for peace and support.',
          lang: 'en',
          cite: {
            source: 'iranica-amanat-fath-ali-shah',
            loc: { section: 'FATḤ-ʿALĪ SHAH QĀJĀR', para: '23' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/fath-ali-shah'
          }
        }
      ]
    }
  ]
})
