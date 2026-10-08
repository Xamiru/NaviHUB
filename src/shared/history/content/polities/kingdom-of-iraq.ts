import { definePolity } from '../../schema'

export default definePolity({
  id: 'kingdom-of-iraq',
  names: [
    { text: 'Kingdom of Iraq', lang: 'en', role: 'primary' },
    { text: 'المملكة العراقية', lang: 'ar', role: 'native' }
  ],
  researched: '2026-10-08',
  polityType: 'kingdom',
  start: {
    alts: [
      {
        value: { d: '1932-10-13' },
        cites: [
          {
            source: 'loc-iraq-country-study-1988',
            loc: { section: 'IRAQ AS AN INDEPENDENT MONARCHY', para: '1' }
          }
        ]
      }
    ]
  },
  end: {
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
      ref: 'polity:mandatory-iraq',
      cites: [
        {
          source: 'loc-iraq-country-study-1988',
          loc: { section: 'IRAQ AS AN INDEPENDENT MONARCHY', para: '1' }
        }
      ]
    }
  ],
  cshapes: [
    { set: 'world', code: 645, from: 1932.78, to: 1958.53 }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/a/ad/Faisal_I%2C_King_of_Iraq%2C_1885-1933%2C_head-and-shoulders_portrait%2C_facing_front_LCCN2005688199.tif/lossy-page1-960px-Faisal_I%2C_King_of_Iraq%2C_1885-1933%2C_head-and-shoulders_portrait%2C_facing_front_LCCN2005688199.tif.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Faisal_I,_King_of_Iraq,_1885-1933,_head-and-shoulders_portrait,_facing_front_LCCN2005688199.tif',
    credit: { institution: 'Library of Congress' },
    license: { id: 'public-domain' }
  },
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'On October 13, 1932, Iraq became a sovereign state, and it was admitted to the League of Nations.',
          lang: 'en',
          cite: {
            source: 'loc-iraq-country-study-1988',
            loc: { section: 'IRAQ AS AN INDEPENDENT MONARCHY', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/iraq/20.htm' }
        },
        {
          id: 'q2',
          text: 'Ultimately, lacking legitimacy and unable to establish deep roots, the British-imposed political system was overwhelmed by these conflicting demands.',
          lang: 'en',
          cite: {
            source: 'loc-iraq-country-study-1988',
            loc: { section: 'IRAQ AS AN INDEPENDENT MONARCHY', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/iraq/20.htm' }
        }
      ]
    },
    {
      kind: 'aftermath',
      quotes: [
        {
          id: 'q3',
          text: 'The Hashimite monarchy was overthrown on July 14, 1958, in a swift, predawn coup executed by officers of the Nineteenth Brigade under the leadership of Brigadier Abd al Karim Qasim and Colonel Abd as Salaam Arif.',
          lang: 'en',
          cite: {
            source: 'loc-iraq-country-study-1988',
            loc: { section: 'REPUBLICAN IRAQ', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/iraq/21.htm' }
        }
      ]
    }
  ]
})
