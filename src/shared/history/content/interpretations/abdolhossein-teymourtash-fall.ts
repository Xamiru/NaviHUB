import { defineInterpretation } from '../../schema'

export default defineInterpretation({
  id: 'abdolhossein-teymourtash-fall',
  about: ['person:abdolhossein-teymourtash'],
  topic: 'motives',
  researched: '2026-10-06',
  positions: [
    {
      id: 'royal-suspicion',
      category: 'scholarly',
      holders: [
        { kind: 'scholar', name: 'Miron Rezun' },
        { kind: 'scholar', name: 'Alireza Sheikholeslami' }
      ],
      statements: [
        {
          id: 'q1',
          text: 'Nevertheless, in 1311 Š./1932, when Teymūrtāš, on his way home from a mission to negotiate with the Anglo-Persian Oil Company, stopped off in Moscow, he apparently aroused the shah’s suspicion.',
          lang: 'en',
          cite: {
            source: 'iranica-sheikholeslami-courts-and-courtiers-reza-shah',
            loc: {
              section: 'COURTS AND COURTIERS viii. In the reign of Reżā Shah Pahlavī',
              para: '4'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/courts-and-courtiers-viii'
          }
        },
        {
          id: 'q2',
          text: '“To Reżā Shah he was simply gathering immense prestige as the result of his successful diplomacy and internal reform, and the ruler most probably regarded this as a manifestation of an unbounded ambition where his Court Minister was concerned”',
          lang: 'en',
          cite: {
            source: 'iranica-sheikholeslami-courts-and-courtiers-reza-shah',
            loc: {
              section: 'COURTS AND COURTIERS viii. In the reign of Reżā Shah Pahlavī',
              para: '4'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/courts-and-courtiers-viii'
          }
        }
      ]
    },
    {
      id: 'failed-foreign-policy',
      category: 'scholarly',
      holders: [
        { kind: 'scholar', name: 'Oliver Bast' }
      ],
      statements: [
        {
          id: 'q3',
          text: 'Teymūrtāš, who not only misjudged the diplomatic balance of power in the region but also the degree of Germany’s willingness to support him, believed that Persian diplomacy could take advantage of this situation. Thus, instead of continuing to use prudently the diplomacy of a third power, whose significance lay in its economic strength and its good relations with both Britain and the Soviet Union, Teymūrtāš hoped to be able to increase Persia’s diplomatic options by playing off Germany against the other powers.',
          lang: 'en',
          cite: {
            source: 'iranica-bast-germany-diplomatic-relations',
            loc: { section: 'GERMANY i. German-Persian diplomatic relations', para: '35' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/germany-i'
          }
        },
        {
          id: 'q4',
          text: 'It is possible that the failure of this policy played a role in his sudden dismissal by Reżā Shah on 24 December 1932, although there are also other explanations for that move.',
          lang: 'en',
          cite: {
            source: 'iranica-bast-germany-diplomatic-relations',
            loc: { section: 'GERMANY i. German-Persian diplomatic relations', para: '36' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/germany-i'
          }
        }
      ]
    }
  ]
})
