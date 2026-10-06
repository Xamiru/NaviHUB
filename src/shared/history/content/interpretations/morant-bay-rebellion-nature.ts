import { defineInterpretation } from '../../schema'

export default defineInterpretation({
  id: 'morant-bay-rebellion-nature',
  about: ['event:morant-bay-rebellion'],
  topic: 'nature',
  researched: '2026-10-06',
  positions: [
    {
      id: 'rebellion-against-whites',
      category: 'contemporary',
      holders: [
        { kind: 'participant', name: 'Mr. Baillie Cochrane' }
      ],
      statements: [
        {
          id: 'q1',
          text: 'was surprised that during this debate he had heard no sympathy expressed on the opposite Benches for the whites who were the first victims of this rebellion.',
          lang: 'en',
          cite: {
            source: 'hansard-commons-1866-07-31-disturbances-in-jamaica',
            loc: { section: 'HC Deb 31 July 1866 vol 184 cc1763-840' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://api.parliament.uk/historic-hansard/commons/1866/jul/31/resolution'
          }
        }
      ]
    },
    {
      id: 'local-outbreak-not-conspiracy',
      category: 'contemporary',
      holders: [
        { kind: 'participant', name: 'Mr. Buxton' }
      ],
      statements: [
        {
          id: 'q2',
          text: 'The main plea that had been put forward was that the outbreak at Morant Bay had its origin in a deep, dark, widespread conspiracy to massacre the whole white population of Jamaica, to overthrow the authority of the Queen, and to establish a Republic after the model of that of Hayti.',
          lang: 'en',
          cite: {
            source: 'hansard-commons-1866-07-31-disturbances-in-jamaica',
            loc: { section: 'HC Deb 31 July 1866 vol 184 cc1763-840' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://api.parliament.uk/historic-hansard/commons/1866/jul/31/resolution'
          }
        },
        {
          id: 'q3',
          text: 'The conclusion at which they had arrived was decisive as to the non-existence of any such widespread conspiracy.',
          lang: 'en',
          cite: {
            source: 'hansard-commons-1866-07-31-disturbances-in-jamaica',
            loc: { section: 'HC Deb 31 July 1866 vol 184 cc1763-840' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://api.parliament.uk/historic-hansard/commons/1866/jul/31/resolution'
          }
        },
        {
          id: 'q4',
          text: 'said he had candidly admitted that the rioters who went to Morant Bay intended mischief, and perhaps murder, and that expressions were used which seemed to indicate an intention to massacre the whites, but he had shown from what occurred that such a design could have been entertained by only a few negroes.',
          lang: 'en',
          cite: {
            source: 'hansard-commons-1866-07-31-disturbances-in-jamaica',
            loc: { section: 'HC Deb 31 July 1866 vol 184 cc1763-840' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://api.parliament.uk/historic-hansard/commons/1866/jul/31/resolution'
          }
        }
      ]
    },
    {
      id: 'peasant-protest',
      category: 'scholarly',
      holders: [
        { kind: 'organization', name: 'Library of Congress, Federal Research Division' }
      ],
      statements: [
        {
          id: 'q5',
          text: 'The "rebellion" was really a protest of rural black peasants in the southeastern parish of St. Thomas.',
          lang: 'en',
          cite: {
            source: 'loc-caribbean-islands-country-study-1987',
            loc: { section: 'POLITICAL TRADITIONS', para: '8' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'http://countrystudies.us/caribbean-islands/10.htm'
          }
        },
        {
          id: 'q6',
          text: 'The conflict had unmistakable racial and religious overtones, pitting George William Gordon and Paul Bogle, who were black Baptists, against the custos (the senior vestryman), a German immigrant named Baron Maximilian von Ketelholdt; the rector of the established church, the Reverend S.H. Cooke; and the governor of the island, Edward John Frye, a hostile incompetent with limited intelligence but long service in minor colonial posts.',
          lang: 'en',
          cite: {
            source: 'loc-caribbean-islands-country-study-1987',
            loc: { section: 'POLITICAL TRADITIONS', para: '8' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'http://countrystudies.us/caribbean-islands/10.htm'
          }
        }
      ]
    },
    {
      id: 'revolt-against-oppression',
      category: 'official',
      holders: [
        { kind: 'organization', name: 'National Library of Jamaica' }
      ],
      statements: [
        {
          id: 'q7',
          text: 'During this period of oppression on the part of the Negroes, Paul Bogle was very active in revolting against the system of government.',
          lang: 'en',
          cite: { source: 'nlj-national-heroes', loc: { section: 'National Heroes' } },
          provenance: { via: 'web', at: '2026-10-06', url: 'https://nlj.gov.jm/qcontentnational-heroes/' }
        }
      ]
    }
  ]
})
