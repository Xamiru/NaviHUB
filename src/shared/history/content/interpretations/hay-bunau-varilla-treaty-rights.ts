import { defineInterpretation } from '../../schema'

export default defineInterpretation({
  id: 'hay-bunau-varilla-treaty-rights',
  about: ['event:separation-of-panama-from-colombia', 'event:construction-of-the-panama-canal'],
  topic: 'legitimacy',
  researched: '2026-10-09',
  framing: {
    id: 'q1',
    text: 'Major disagreements arose concerning the rights granted to the United States by the treaty of 1903 and the Panamanian constitution of 1904.',
    lang: 'en',
    cite: {
      source: 'loc-panama-country-study-1987',
      loc: { section: 'The 1903 Treaty and Qualified Independence', para: '8' }
    },
    provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/panama/8.htm' }
  },
  positions: [
    {
      id: 'united-states',
      category: 'official',
      holders: [
        { kind: 'state', name: 'United States' },
        { kind: 'participant', name: 'John Hay' }
      ],
      statements: [
        {
          id: 'q4',
          text: 'The United States acquired the right to exercise sovereign powers and jurisdiction over the canal zone by the convention of November 18, 1903, between the Republic of Panama and the United States.',
          lang: 'en',
          cite: { source: 'frus-1904-hay-to-obaldia-1904-10-24', loc: { para: '13' } },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://history.state.gov/historicaldocuments/frus1904/d574'
          }
        },
        {
          id: 'q5',
          text: 'Under the stipulations of Article III, if sovereign powers are to be exercised in and over the canal zone, they must be exercised by the United States.',
          lang: 'en',
          cite: { source: 'frus-1904-hay-to-obaldia-1904-10-24', loc: { para: '19' } },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://history.state.gov/historicaldocuments/frus1904/d574'
          }
        }
      ],
      reception: [
        {
          id: 'q8',
          text: 'Within this territory Washington gained "all the rights, power, and authority . . . which the United States would possess and exercise if it were the sovereign . . . to the entire exclusion" of Panama.',
          lang: 'en',
          cite: {
            source: 'loc-panama-country-study-1987',
            loc: { section: 'The 1903 Treaty and Qualified Independence', para: '6' }
          },
          provenance: { via: 'web', at: '2026-10-09', url: 'http://countrystudies.us/panama/8.htm' }
        }
      ]
    },
    {
      id: 'panama',
      category: 'official',
      holders: [
        { kind: 'state', name: 'Panama' },
        { kind: 'participant', name: 'José Domingo de Obaldía' }
      ],
      statements: [
        {
          id: 'q6',
          text: 'None of the stipulations which I have enumerated would have any raison d’être if the Republic of Panama had renounced the dominion over the zone and her rights of sovereignty absolutely; but her intention never was to renounce these rights, nor was it the purpose of the United States to acquire them, for the latter, quite to the contrary, has declared that it does not wish to increase its territory at the expense of Colombia or of any other republic of Central or South America,',
          lang: 'en',
          cite: { source: 'frus-1904-obaldia-to-hay-1904-08-11', loc: { para: '26' } },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://history.state.gov/historicaldocuments/frus1904/d565'
          }
        },
        {
          id: 'q7',
          text: 'My Government considers that the idea of the contracting parties is obscure in everything relating to these delicate questions of dominion and sovereignty; but after a careful study the conclusion may be arrived at that the two countries exercise conjointly the sovereignty over the territory of the canal zone, and that in the cases expressly specified in the Bunau-Varilla-Hay treaty the use of such right belongs to the United States by virtue of delegation from the Republic of Panama, but in all that concerning which the treaty is silent the rights of the Republic of Panama remain unalterable and complete.',
          lang: 'en',
          cite: { source: 'frus-1904-obaldia-to-hay-1904-08-11', loc: { para: '29' } },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://history.state.gov/historicaldocuments/frus1904/d565'
          }
        }
      ],
      reception: [
        {
          id: 'q9',
          text: 'Ironically, however, friction resulting from the events of 1903 was greatest between the United States and Panama.',
          lang: 'en',
          cite: {
            source: 'loc-panama-country-study-1987',
            loc: { section: 'The 1903 Treaty and Qualified Independence', para: '8' }
          },
          provenance: { via: 'web', at: '2026-10-09', url: 'http://countrystudies.us/panama/8.htm' }
        }
      ]
    }
  ]
})
