import { defineInterpretation } from '../../schema'

export default defineInterpretation({
  id: '1973-oil-crisis-causes',
  about: ['event:1973-oil-crisis'],
  topic: 'causes',
  positions: [
    {
      id: 'arab-political-protest',
      category: 'scholarly',
      holders: [
        { kind: 'organization', name: 'Library of Congress, Federal Research Division' }
      ],
      statements: [
        {
          id: 'q1',
          text: 'The embargo was a political protest aimed at obtaining Israeli withdrawal from occupied Arab territory and recognition of the rights of the Palestinian people.',
          lang: 'en',
          cite: {
            source: 'loc-saudi-arabia-country-study-1992',
            loc: { section: 'The Reigns of Saud and Faisal', para: '27' }
          },
          provenance: { via: 'web', at: '2026-10-09', url: 'http://countrystudies.us/saudi-arabia/11.htm' }
        }
      ]
    },
    {
      id: 'shah-oil-price-rationale',
      category: 'contemporary',
      holders: [
        {
          kind: 'participant',
          name: 'Mohammad Reza Pahlavi',
          ref: 'person:mohammad-reza-pahlavi'
        }
      ],
      statements: [
        {
          id: 'q2',
          text: 'Oil had been underpriced for far too long. It was time to move firmly and with dispatch.',
          lang: 'en',
          cite: {
            source: 'pahlavi-1980-answer-to-history',
            loc: { page: '97', section: 'From the Age of Petroleum to the Atomic Age' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://archive.org/download/answer-to-history-by-shah-mohammad-reza-pahlavi/Answer%20to%20History%20by%20Shah%20Mohammad%20Reza%20Pahlavi_djvu.txt'
          }
        },
        {
          id: 'q3',
          text: 'Far from being the OPEC price hawk depicted in the West, within the cartel I counseled moderation towards an ordered and rational growth. After 1975-76 I repeatedly attempted to keep oil prices in check and to persuade my partners that price advances should be gradual and fitted to world economic conditions.',
          lang: 'en',
          cite: {
            source: 'pahlavi-1980-answer-to-history',
            loc: { page: '98', section: 'From the Age of Petroleum to the Atomic Age' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://archive.org/download/answer-to-history-by-shah-mohammad-reza-pahlavi/Answer%20to%20History%20by%20Shah%20Mohammad%20Reza%20Pahlavi_djvu.txt'
          }
        }
      ]
    },
    {
      id: 'market-and-structural-factors',
      category: 'scholarly',
      holders: [
        { kind: 'organization', name: 'Office of the Historian, U.S. Department of State' }
      ],
      statements: [
        {
          id: 'q4',
          text: 'The full impact of the embargo, including high inflation and stagnation in oil importers, resulted from a complex set of factors beyond the proximate actions taken by the Arab members of OPEC. The declining leverage of the U.S. and European oil corporations (the “Seven Sisters”) that had hitherto stabilized the global oil market, the erosion of excess capacity of East Texas oil fields, and the recent decision to allow the U.S. dollar to float freely in the international exchange all played a role in exacerbating the crisis.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-oil-embargo',
            loc: { section: 'Oil Embargo, 1973–1974', para: '9' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://history.state.gov/milestones/1969-1976/oil-embargo'
          }
        },
        {
          id: 'q5',
          text: 'Several years of negotiations between oil-producing nations and oil companies had already destabilized a decades-old pricing system, which exacerbated the embargo’s effects.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-oil-embargo',
            loc: { section: 'Oil Embargo, 1973–1974', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://history.state.gov/milestones/1969-1976/oil-embargo'
          }
        }
      ]
    }
  ],
  researched: '2026-10-09'
})
