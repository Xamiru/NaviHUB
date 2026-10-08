import { defineInterpretation } from '../../schema'

export default defineInterpretation({
  id: 'yom-kippur-war-outcome',
  about: ['event:yom-kippur-war'],
  topic: 'outcome',
  positions: [
    {
      id: 'israeli-military-victory-at-high-cost',
      category: 'scholarly',
      holders: [
        { kind: 'organization', name: 'Office of the Historian, U.S. Department of State' }
      ],
      statements: [
        {
          id: 'q1',
          text: 'The 1973 war thus ended in an Israeli victory, but at great cost to the United States. Though the war did not scuttle détente, it nevertheless brought the United States closer to a nuclear confrontation with the Soviet Union than at any point since the Cuban missile crisis.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-arab-israeli-war-1973',
            loc: { section: 'The 1973 Arab-Israeli War', para: '11' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://history.state.gov/milestones/1969-1976/arab-israeli-war-1973'
          }
        }
      ]
    },
    {
      id: 'egyptian-victory-narrative',
      category: 'scholarly',
      holders: [
        { kind: 'organization', name: 'Library of Congress, Federal Research Division' }
      ],
      statements: [
        {
          id: 'q2',
          text: 'Neither side had won a clear-cut victory, but for the Egyptians, it was a victory nonetheless. The Arabs had taken the initiative in attacking the Israelis and had shown that Israel was not invincible. The stinging defeats of 1948, 1956, and 1967 seemed to be avenged.',
          lang: 'en',
          cite: {
            source: 'loc-egypt-country-study-1990',
            loc: { section: 'October 1973 War', para: '9' }
          },
          provenance: { via: 'web', at: '2026-10-09', url: 'http://countrystudies.us/egypt/41.htm' }
        }
      ]
    },
    {
      id: 'israeli-loss-of-invincibility',
      category: 'scholarly',
      holders: [
        { kind: 'organization', name: 'Library of Congress, Federal Research Division' }
      ],
      statements: [
        {
          id: 'q3',
          text: 'Most important, the image of an invincible Israel that had prevailed since the June 1967 War was destroyed forever.',
          lang: 'en',
          cite: {
            source: 'loc-israel-country-study-1988',
            loc: { section: 'The October 1973 War', para: '2' }
          },
          provenance: { via: 'web', at: '2026-10-09', url: 'http://countrystudies.us/israel/27.htm' }
        },
        {
          id: 'q4',
          text: 'A war-weary public was especially critical of Minister of Defense Dayan, who nonetheless escaped criticism in the report of the Agranat Commission, a body established after the war to determine responsibility for Israel\'s military unpreparedness.',
          lang: 'en',
          cite: {
            source: 'loc-israel-country-study-1988',
            loc: { section: 'The October 1973 War', para: '2' }
          },
          provenance: { via: 'web', at: '2026-10-09', url: 'http://countrystudies.us/israel/27.htm' }
        }
      ]
    }
  ],
  researched: '2026-10-09'
})
