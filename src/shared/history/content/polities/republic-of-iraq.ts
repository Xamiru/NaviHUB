import { definePolity } from '../../schema'

export default definePolity({
  id: 'republic-of-iraq',
  names: [
    { text: 'Republic of Iraq', lang: 'en', role: 'primary' },
    { text: 'الجمهورية العراقية', lang: 'ar', role: 'native' }
  ],
  researched: '2026-10-08',
  polityType: 'republic',
  start: {
    alts: [
      {
        value: { d: '1958-07-14' },
        cites: [
          {
            source: 'loc-iraq-country-study-1988',
            loc: { section: 'REPUBLICAN IRAQ', para: '1' }
          }
        ]
      }
    ]
  },
  regions: ['mena'],
  prominence: 2,
  capitals: [
    {
      ref: 'place:baghdad',
      cites: [
        { source: 'cshapes-2-dataset', loc: { section: 'Iraq (code 645), capital Baghdad' } }
      ]
    }
  ],
  predecessors: [
    {
      ref: 'polity:kingdom-of-iraq',
      cites: [
        {
          source: 'loc-iraq-country-study-1988',
          loc: { section: 'REPUBLICAN IRAQ', para: '1' }
        }
      ]
    }
  ],
  cshapes: [
    { set: 'world', code: 645, from: 1958.53 }
  ],
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'The Hashimite monarchy was overthrown on July 14, 1958, in a swift, predawn coup executed by officers of the Nineteenth Brigade under the leadership of Brigadier Abd al Karim Qasim and Colonel Abd as Salaam Arif.',
          lang: 'en',
          cite: {
            source: 'loc-iraq-country-study-1988',
            loc: { section: 'REPUBLICAN IRAQ', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/iraq/21.htm' }
        },
        {
          id: 'q2',
          text: 'Instead of moving toward Jordan, however, Colonel Arif led a battalion into Baghdad and immediately proclaimed a new republic and the end of the old regime.',
          lang: 'en',
          cite: {
            source: 'loc-iraq-country-study-1988',
            loc: { section: 'REPUBLICAN IRAQ', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/iraq/21.htm' }
        }
      ]
    },
    {
      kind: 'course',
      quotes: [
        {
          id: 'q3',
          text: 'The revolution radically altered Iraq\'s social structure, destroying the power of the landed shaykhs and the absentee landlords while enhancing the position of the urban workers, the peasants, and the middle class.',
          lang: 'en',
          cite: {
            source: 'loc-iraq-country-study-1988',
            loc: { section: 'REPUBLICAN IRAQ', para: '2' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/iraq/21.htm' }
        }
      ]
    }
  ]
})
