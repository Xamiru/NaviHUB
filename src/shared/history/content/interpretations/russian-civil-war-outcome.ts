import { defineInterpretation } from '../../schema'

export default defineInterpretation({
  id: 'russian-civil-war-outcome',
  researched: '2026-10-09',
  about: ['event:russian-civil-war'],
  topic: 'outcome',
  positions: [
    {
      id: 'soviet-official',
      category: 'official',
      holders: [
        { kind: 'party', name: 'Communist Party of the Soviet Union (Bolsheviks)' }
      ],
      statements: [
        {
          id: 'q1',
          text: 'The war of the foreign interventionists and the Russian Whiteguards against the Soviets ended in a victory for the Soviets.',
          lang: 'en',
          cite: {
            source: 'cpsu-1939-short-course-chapter-8',
            loc: {
              section: 'Chapter Eight: The Bolshevik Party in the Period of Foreign Military Intervention and Civil War (1918-1920)'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.marxists.org/reference/archive/stalin/works/1939/x01/ch08.htm'
          }
        },
        {
          id: 'q2',
          text: 'The Bolsheviks knew that an army that fights for a wrong policy, for a policy that is not supported by the people, cannot win. The army of the interventionists and Whiteguards was such an army. It had everything: experienced commanders and first-class arms, ammunition, equipment and provisions. It lacked only one thing—the support and sympathy of the peoples of Russia; for the peoples of Russia could not and would not support the policy of the interventionists and Whiteguard "rulers" because it was a policy hostile to the people. And so the interventionist and Whiteguard army was defeated.',
          lang: 'en',
          cite: {
            source: 'cpsu-1939-short-course-chapter-8',
            loc: {
              section: 'Chapter Eight: The Bolshevik Party in the Period of Foreign Military Intervention and Civil War (1918-1920)'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.marxists.org/reference/archive/stalin/works/1939/x01/ch08.htm'
          }
        }
      ],
      reception: [
        {
          id: 'q4',
          text: 'The Allied governments, lacking support for intervention from their nations\' war-weary citizenry, withdrew most of their forces by 1920.',
          lang: 'en',
          cite: {
            source: 'loc-russia-country-study-1996',
            loc: { section: 'Revolutions and Civil War', para: '23' }
          },
          provenance: { via: 'web', at: '2026-10-09', url: 'http://countrystudies.us/russia/8.htm' }
        }
      ]
    },
    {
      id: 'sumpf',
      category: 'scholarly',
      holders: [
        { kind: 'scholar', name: 'Alexandre Sumpf', discipline: 'historian' }
      ],
      statements: [
        {
          id: 'q3',
          text: 'That is surely what the Whites were lacking to win: the unity provided by an ideology, an uncontested leader and a clearly defined project for a multiethnic nation in revolution.',
          lang: 'en',
          cite: { source: 'eo1418-sumpf-russian-civil-war', loc: { section: 'Russian Civil War' } },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://encyclopedia.1914-1918-online.net/article/russian-civil-war/'
          }
        }
      ]
    }
  ]
})
