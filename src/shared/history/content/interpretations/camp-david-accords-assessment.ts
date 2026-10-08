import { defineInterpretation } from '../../schema'

export default defineInterpretation({
  id: 'camp-david-accords-assessment',
  about: ['event:camp-david-accords'],
  topic: 'significance',
  positions: [
    {
      id: 'signatories-framework-for-peace',
      category: 'official',
      holders: [
        { kind: 'state', name: 'Arab Republic of Egypt' },
        { kind: 'state', name: 'State of Israel' },
        { kind: 'state', name: 'United States of America' }
      ],
      statements: [
        {
          id: 'q1',
          text: 'After four wars during 30 years, despite intensive human efforts, the Middle East, which is the cradle of civilization and the birthplace of three great religions, does not enjoy the blessings of peace.',
          lang: 'en',
          cite: {
            source: 'avalon-camp-david-accords-1978',
            loc: { section: 'The Framework for Peace in the Middle East', para: '7' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://avalon.law.yale.edu/20th_century/campdav.asp'
          }
        },
        {
          id: 'q2',
          text: 'Taking these factors into account, the parties are determined to reach a just, comprehensive, and durable settlement of the Middle East conflict through the conclusion of peace treaties based on Security Council resolutions 242 and 338 in all their parts.',
          lang: 'en',
          cite: {
            source: 'avalon-camp-david-accords-1978',
            loc: { section: 'The Framework for Peace in the Middle East', para: '13' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://avalon.law.yale.edu/20th_century/campdav.asp'
          }
        }
      ],
      reception: [
        {
          id: 'q7',
          text: 'While the conclusion of the Camp David Accords represented significant progress, the process of translating the Framework documents into a formal peace treaty proved daunting.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-camp-david',
            loc: { section: 'Camp David Accords and the Arab-Israeli Peace Process', para: '9' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://history.state.gov/milestones/1977-1980/camp-david'
          }
        }
      ]
    },
    {
      id: 'arab-rejection-of-a-separate-peace',
      category: 'scholarly',
      holders: [
        { kind: 'organization', name: 'Library of Congress, Federal Research Division' }
      ],
      statements: [
        {
          id: 'q3',
          text: 'The basis for Arab rejection was opposition to Egypt\'s separate peace with Israel. Although Sadat insisted that the treaty provided for a comprehensive settlement of the Arab-Israeli conflict, the Arab states and the PLO saw it as a separate peace, which Sadat had vowed he would not sign.',
          lang: 'en',
          cite: {
            source: 'loc-egypt-country-study-1990',
            loc: { section: 'Peace with Israel', para: '6' }
          },
          provenance: { via: 'web', at: '2026-10-09', url: 'http://countrystudies.us/egypt/44.htm' }
        },
        {
          id: 'q4',
          text: 'Without Egypt\'s military power, the threat of force evaporated because no single Arab state was strong enough militarily to confront Israel alone.',
          lang: 'en',
          cite: {
            source: 'loc-egypt-country-study-1990',
            loc: { section: 'Peace with Israel', para: '6' }
          },
          provenance: { via: 'web', at: '2026-10-09', url: 'http://countrystudies.us/egypt/44.htm' }
        }
      ]
    },
    {
      id: 'israeli-limits-on-autonomy',
      category: 'scholarly',
      holders: [
        { kind: 'organization', name: 'Library of Congress, Federal Research Division' }
      ],
      statements: [
        {
          id: 'q5',
          text: 'No Arab leader could accept Begin\'s truncated version of autonomy.',
          lang: 'en',
          cite: {
            source: 'loc-israel-country-study-1988',
            loc: { section: 'The Peace Process', para: '7' }
          },
          provenance: { via: 'web', at: '2026-10-09', url: 'http://countrystudies.us/israel/31.htm' }
        }
      ]
    },
    {
      id: 'high-water-mark-of-us-peacemaking',
      category: 'scholarly',
      holders: [
        { kind: 'organization', name: 'Office of the Historian, U.S. Department of State' }
      ],
      statements: [
        {
          id: 'q6',
          text: 'Although a landmark event, the successful conclusion of the Egyptian-Israeli Treaty represented the high-water mark for the Peace Process during the Carter Presidency.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-camp-david',
            loc: { section: 'Camp David Accords and the Arab-Israeli Peace Process', para: '10' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://history.state.gov/milestones/1977-1980/camp-david'
          }
        }
      ]
    }
  ],
  researched: '2026-10-09'
})
