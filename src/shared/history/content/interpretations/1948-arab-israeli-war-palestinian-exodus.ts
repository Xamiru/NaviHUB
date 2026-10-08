import { defineInterpretation } from '../../schema'

export default defineInterpretation({
  id: '1948-arab-israeli-war-palestinian-exodus',
  about: ['event:1948-arab-israeli-war'],
  topic: 'causes',
  researched: '2026-10-09',
  positions: [
    {
      id: 'planned-expulsion',
      category: 'scholarly',
      holders: [
        { kind: 'scholar', name: 'Maher Charif' }
      ],
      statements: [
        {
          id: 'q1',
          text: 'The exodus of this large number of Palestinians occurred in four stages, according to a Zionist-Israeli plan that was driven by territorial and demographic considerations.',
          lang: 'en',
          cite: { source: 'palquest-charif-the-nakba', loc: { section: 'The Nakba', para: '2' } },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.palquest.org/en/highlight/160/nakba'
          }
        },
        {
          id: 'q2',
          text: 'The second stage of the forced displacement of the Palestinians began on 10 March 1948, when the Zionist leadership established a plan for ethnic cleansing known as “ Plan Dalet .”',
          lang: 'en',
          cite: { source: 'palquest-charif-the-nakba', loc: { section: 'The Nakba', para: '6' } },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.palquest.org/en/highlight/160/nakba'
          }
        }
      ]
    },
    {
      id: 'flight-after-dayr-yasin',
      category: 'scholarly',
      holders: [
        { kind: 'organization', name: 'Library of Congress, Federal Research Division' }
      ],
      statements: [
        {
          id: 'q3',
          text: 'The news of Dayr Yasin precipitated a flight of the Arab population from areas with large Jewish populations.',
          lang: 'en',
          cite: {
            source: 'loc-israel-country-study-1988',
            loc: { section: 'Prelude to Statehood', para: '6' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/israel/20.htm' }
        }
      ]
    },
    {
      id: 'appeal-to-arab-inhabitants',
      category: 'official',
      holders: [
        { kind: 'state', name: 'Israel' },
        { kind: 'organization', name: 'People\'s Council' }
      ],
      statements: [
        {
          id: 'q4',
          text: 'WE APPEAL - in the very midst of the onslaught launched against us now for months - to the Arab inhabitants of the State of Israel to preserve peace and participate in the upbuilding of the State on the basis of full and equal citizenship and due representation in all its provisional and permanent institutions.',
          lang: 'en',
          cite: {
            source: 'avalon-israeli-declaration-of-independence',
            loc: { section: 'Declaration of Israel\'s Independence 1948' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://avalon.law.yale.edu/20th_century/israel.asp'
          }
        }
      ],
      reception: [
        {
          id: 'q5',
          text: 'Tiberias, which had 5,000 Arab residents, was the first of these to fall; its inhabitants were expelled on 18 April.',
          lang: 'en',
          cite: { source: 'palquest-charif-the-nakba', loc: { section: 'The Nakba', para: '7' } },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://www.palquest.org/en/highlight/160/nakba'
          }
        }
      ]
    }
  ]
})
