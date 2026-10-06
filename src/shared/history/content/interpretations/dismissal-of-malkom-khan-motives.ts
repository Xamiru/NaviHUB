import { defineInterpretation } from '../../schema'

export default defineInterpretation({
  id: 'dismissal-of-malkom-khan-motives',
  about: ['event:dismissal-of-malkom-khan', 'person:malkom-khan', 'person:amin-al-soltan'],
  topic: 'motives',
  researched: '2026-10-06',
  positions: [
    {
      id: 'lottery-as-pretext',
      category: 'scholarly',
      holders: [
        { kind: 'scholar', name: 'Hamid Algar' }
      ],
      statements: [
        {
          id: 'q1',
          text: 'Although it has been argued that the case of the lottery concession was for Amīn-al-solṭān a mere pretext to this dismissal (ibid., p. 65),',
          lang: 'en',
          cite: {
            source: 'iranica-calmard-atabak-e-azam',
            loc: { section: 'ATĀBAK-E AʿẒAM, AMĪN-AL-SOLṬĀN', para: '5' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/atabak-e-azam'
          }
        }
      ]
    },
    {
      id: 'strained-relations',
      category: 'scholarly',
      holders: [
        { kind: 'scholar', name: 'Jean Calmard' }
      ],
      statements: [
        {
          id: 'q2',
          text: 'This dismissal occurred after a long period of strained relations between Amīn-al-solṭān and Malkom (see Algar, Malkum Khān, pp. 164ff.).',
          lang: 'en',
          cite: {
            source: 'iranica-calmard-atabak-e-azam',
            loc: { section: 'ATĀBAK-E AʿẒAM, AMĪN-AL-SOLṬĀN', para: '5' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/atabak-e-azam'
          }
        },
        {
          id: 'q3',
          text: 'Malkom’s attitude toward him before and after this event ranged from full admiration to hostility and execration',
          lang: 'en',
          cite: {
            source: 'iranica-calmard-atabak-e-azam',
            loc: { section: 'ATĀBAK-E AʿẒAM, AMĪN-AL-SOLṬĀN', para: '5' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/atabak-e-azam'
          }
        }
      ]
    }
  ]
})
