import { defineInterpretation } from '../../schema'

export default defineInterpretation({
  id: 'armenian-genocide-causes',
  about: ['event:armenian-genocide'],
  topic: 'causes',
  researched: '2026-10-06',
  positions: [
    {
      id: 'contingent-radicalisation',
      category: 'scholarly',
      holders: [
        { kind: 'scholar', name: 'Ronald Grigor Suny' }
      ],
      statements: [
        {
          id: 'q1',
          text: 'The Armenian genocide was not planned long in advance, but was a contingent reaction to a moment of crisis that grew more radical over time.',
          lang: 'en',
          cite: {
            source: 'eo1418-suny-armenian-genocide',
            loc: { section: 'Genocide as Response to Crisis', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://encyclopedia.1914-1918-online.net/article/armenian-genocide/'
          }
        },
        {
          id: 'q2',
          text: 'Had there been no World War there would have been no genocide, not only because there would have been no “fog of war” to cover up the events but because the radical sense of endangerment among Turks would not have been as acute.',
          lang: 'en',
          cite: {
            source: 'eo1418-suny-armenian-genocide',
            loc: { section: 'Genocide as Response to Crisis', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://encyclopedia.1914-1918-online.net/article/armenian-genocide/'
          }
        }
      ]
    },
    {
      id: 'national-homogenisation',
      category: 'scholarly',
      holders: [
        { kind: 'scholar', name: 'Boris Adjemian' }
      ],
      statements: [
        {
          id: 'q3',
          text: 'The purpose of the violence was the homogenization of a cleansed, or purified Turkish national space.',
          lang: 'en',
          cite: {
            source: 'ehne-adjemian-armenian-genocide',
            loc: { section: 'The Armenian Genocide', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://ehne.fr/en/encyclopedia/themes/wars-and-memories/violence-war/armenian-genocide'
          }
        }
      ]
    },
    {
      id: 'plotted-elimination',
      category: 'scholarly',
      holders: [
        { kind: 'organization', name: 'Library of Congress, Federal Research Division' }
      ],
      statements: [
        {
          id: 'q4',
          text: 'However, after its revolution succeeded, the Young Turk government plotted elimination of the Armenians, who were a significant obstacle to the regime\'s evolving nationalist agenda.',
          lang: 'en',
          cite: {
            source: 'loc-armenia-country-study-1995',
            loc: { section: 'The Young Turks', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/armenia/9.htm' }
        }
      ]
    },
    {
      id: 'suppression-of-rebellion',
      category: 'contemporary',
      holders: [
        { kind: 'participant', name: 'Mehmed Talat Pasha', ref: 'person:talaat-pasha' },
        { kind: 'participant', name: 'Ismail Enver Pasha', ref: 'person:enver-pasha' }
      ],
      statements: [
        {
          id: 'q5',
          text: 'Enver claimed that an Armenian conspiracy existed and that a generalized revolt by the Armenians was imminent.',
          lang: 'en',
          cite: {
            source: 'loc-turkey-country-study-1995',
            loc: { section: 'World War I', para: '3' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/turkey/12.htm' }
        },
        {
          id: 'q6',
          text: 'The deportations of Armenians and Assyrians were rationalized at the time and later as a military necessity, framed by the imperial ambitions and distorted perceptions of the Ottoman leaders, though the government refused to take responsibility for the massacres, claiming that they were caused by local officials and excessive hatred of Armenians by common people.',
          lang: 'en',
          cite: {
            source: 'eo1418-suny-armenian-genocide',
            loc: { section: 'Mass Deportation, Forced Marches, and Death Camps', para: '3' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://encyclopedia.1914-1918-online.net/article/armenian-genocide/'
          }
        }
      ]
    }
  ]
})
