import { defineInterpretation } from '../../schema'

export default defineInterpretation({
  id: 'treaty-of-paris-1898-payment',
  about: ['event:spanish-american-war'],
  topic: 'nature',
  researched: '2026-10-09',
  positions: [
    {
      id: 'treaty-text',
      category: 'official',
      holders: [
        { kind: 'state', name: 'United States' },
        { kind: 'state', name: 'Kingdom of Spain' }
      ],
      statements: [
        {
          id: 'q5',
          text: 'The United States will pay to Spain the sum of twenty million dollars ($20,000,000) within three months after the exchange of the ratifications of the present treaty.',
          lang: 'en',
          cite: { source: 'avalon-treaty-of-paris-1898', loc: { section: 'Article III' } },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://avalon.law.yale.edu/19th_century/sp1898.asp'
          }
        }
      ],
      reception: [
        {
          id: 'q6',
          text: 'Among its conditions was the cession of the Philippines, Guam, and Puerto Rico to the United States (Cuba was granted its independence); in return, the United States would pay Spain the sum of US$20 million.',
          lang: 'en',
          cite: {
            source: 'loc-philippines-country-study-1991',
            loc: { section: 'The Malolos Constitution and the Treaty of Paris', para: '4' }
          },
          provenance: { via: 'web', at: '2026-10-09', url: 'http://countrystudies.us/philippines/14.htm' }
        }
      ]
    },
    {
      id: 'a-sale',
      category: 'scholarly',
      holders: [
        { kind: 'organization', name: 'Office of the Historian, U.S. Department of State' }
      ],
      statements: [
        {
          id: 'q1',
          text: 'Spain also agreed to sell the Philippines to the United States for the sum of $20 million.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-spanish-american-war',
            loc: { section: 'The Spanish-American War, 1898', para: '8' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://history.state.gov/milestones/1866-1898/spanish-american-war'
          }
        }
      ]
    },
    {
      id: 'neither-purchase-nor-indemnity',
      category: 'scholarly',
      holders: [
        { kind: 'organization', name: 'Library of Congress, Federal Research Division' },
        { kind: 'scholar', name: 'Leon Wolff', discipline: 'historian' }
      ],
      statements: [
        {
          id: 'q2',
          text: 'The nature of this payment is rather difficult to define; it was paid neither to purchase Spanish territories nor as a war indemnity.',
          lang: 'en',
          cite: {
            source: 'loc-philippines-country-study-1991',
            loc: { section: 'The Malolos Constitution and the Treaty of Paris', para: '4' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/philippines/14.htm' }
        },
        {
          id: 'q3',
          text: 'In the words of historian Leon Wolff, "it was . . . a gift. Spain accepted it. Quite irrelevantly she handed us the Philippines. No question of honor or conquest was involved. The Filipino people had nothing to say about it, although their rebellion was thrown in (so to speak) free of charge."',
          lang: 'en',
          cite: {
            source: 'loc-philippines-country-study-1991',
            loc: { section: 'The Malolos Constitution and the Treaty of Paris', para: '4' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/philippines/14.htm' }
        }
      ]
    },
    {
      id: 'people-not-for-sale',
      category: 'contemporary',
      holders: [
        { kind: 'media', name: 'La Independencia' },
        { kind: 'participant', name: 'Antonio Luna' }
      ],
      statements: [
        {
          id: 'q4',
          text: 'Reacting to the US$20 million sum paid to Spain, La Independencia (Independence), a newspaper published in Manila by a revolutionary, General Antonio Luna, stated that "people are not to be bought and sold like horses and houses. If the aim has been to abolish the traffic in Negroes because it meant the sale of persons, why is there still maintained the sale of countries with inhabitants?"',
          lang: 'en',
          cite: {
            source: 'loc-philippines-country-study-1991',
            loc: { section: 'The Malolos Constitution and the Treaty of Paris', para: '5' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/philippines/14.htm' }
        }
      ]
    }
  ]
})
