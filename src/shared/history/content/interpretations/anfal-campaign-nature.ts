import { defineInterpretation } from '../../schema'

export default defineInterpretation({
  id: 'anfal-campaign-nature',
  about: ['event:anfal-campaign'],
  topic: 'nature',
  positions: [
    {
      id: 'ali-hassan-al-majid-slaughter-the-saboteurs',
      category: 'official',
      holders: [
        { kind: 'participant', name: 'Ali Hassan al-Majid' },
        { kind: 'state', name: 'Republic of Iraq' }
      ],
      statements: [
        {
          id: 'q1',
          text: '"to solve the Kurdish problem and slaughter the saboteurs."',
          lang: 'en',
          cite: {
            source: 'hrw-1993-genocide-in-iraq-the-anfal-campaign-against-the-kurds',
            loc: { section: 'Introduction' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'https://www.hrw.org/reports/1993/iraqanfal/ANFALINT.htm'
          }
        }
      ],
      reception: [
        {
          id: 'q2',
          text: 'But beneath the euphemisms, Iraq\'s crimes against the Kurds amount to genocide, the "intent to destroy, in whole or in part, a national, ethnical, racial or religious group, as such."',
          lang: 'en',
          cite: {
            source: 'hrw-1993-genocide-in-iraq-the-anfal-campaign-against-the-kurds',
            loc: { section: 'Introduction' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'https://www.hrw.org/reports/1993/iraqanfal/ANFALINT.htm'
          }
        }
      ]
    },
    {
      id: 'hrw-genocide',
      category: 'contemporary',
      holders: [
        { kind: 'organization', name: 'Middle East Watch (Human Rights Watch)' }
      ],
      statements: [
        {
          id: 'q3',
          text: 'This report is a narrative account of a campaign of extermination against the Kurds of northern Iraq.',
          lang: 'en',
          cite: {
            source: 'hrw-1993-genocide-in-iraq-the-anfal-campaign-against-the-kurds',
            loc: { section: 'Introduction' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'https://www.hrw.org/reports/1993/iraqanfal/ANFALINT.htm'
          }
        },
        {
          id: 'q4',
          text: 'It concludes that in that year the Iraqi regime committed the crime of genocide.',
          lang: 'en',
          cite: {
            source: 'hrw-1993-genocide-in-iraq-the-anfal-campaign-against-the-kurds',
            loc: { section: 'Introduction' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'https://www.hrw.org/reports/1993/iraqanfal/ANFALINT.htm'
          }
        }
      ]
    }
  ],
  researched: '2026-10-10'
})
