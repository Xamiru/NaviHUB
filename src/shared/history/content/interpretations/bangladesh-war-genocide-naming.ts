import { defineInterpretation } from '../../schema'

export default defineInterpretation({
  id: 'bangladesh-war-genocide-naming',
  about: ['event:bangladesh-liberation-war'],
  topic: 'naming',
  positions: [
    {
      id: 'us-consulate-dacca',
      category: 'contemporary',
      holders: [
        {
          kind: 'participant',
          name: 'Archer K. Blood and the staff of the U.S. Consulate General in Dacca'
        }
      ],
      statements: [
        {
          id: 'q1',
          text: 'Selective Genocide',
          lang: 'en',
          cite: {
            source: 'frus1969-76ve07-doc-125',
            loc: { section: 'Document 125, “Selective Genocide”' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://history.state.gov/historicaldocuments/frus1969-76ve07/d125'
          }
        },
        {
          id: 'q2',
          text: 'Here in Dacca we are mute and horrified witnesses to a reign of terror by the Pak military.',
          lang: 'en',
          cite: {
            source: 'frus1969-76ve07-doc-125',
            loc: { section: 'Document 125, “Selective Genocide”' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://history.state.gov/historicaldocuments/frus1969-76ve07/d125'
          }
        },
        {
          id: 'q3',
          text: 'Full horror of Pak military atrocities will come to light sooner or later.',
          lang: 'en',
          cite: {
            source: 'frus1969-76ve07-doc-125',
            loc: { section: 'Document 125, “Selective Genocide”' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://history.state.gov/historicaldocuments/frus1969-76ve07/d125'
          }
        }
      ]
    },
    {
      id: 'pakistan-yahya',
      category: 'official',
      holders: [
        { kind: 'state', name: 'Pakistan' }
      ],
      statements: [
        {
          id: 'q4',
          text: 'No one is more pained than I am, Mr President, about the events leading to the breakdown of law and order in East Pakistan.',
          lang: 'en',
          cite: { source: 'frus1969-76v11-doc-29', loc: { section: 'Document 29' } },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://history.state.gov/historicaldocuments/frus1969-76v11/d29'
          }
        },
        {
          id: 'q5',
          text: 'It is indeed tragic that my efforts were thwarted by a group of unpatriotic elements.',
          lang: 'en',
          cite: { source: 'frus1969-76v11-doc-29', loc: { section: 'Document 29' } },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://history.state.gov/historicaldocuments/frus1969-76v11/d29'
          }
        },
        {
          id: 'q6',
          text: 'At this time of painful and anguished crisis in Pakistan, I am deeply gratified that your Government has made it clear, to all those who have raised the question, that the United States recognises the current events in East Pakistan as an internal affair, for whose solution the responsibility rests with the Government of Pakistan.',
          lang: 'en',
          cite: { source: 'frus1969-76v11-doc-29', loc: { section: 'Document 29' } },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://history.state.gov/historicaldocuments/frus1969-76v11/d29'
          }
        }
      ],
      reception: [
        {
          id: 'q12',
          text: 'One paper, the Morning News, even editorialized that the armed forces were saving East Pakistanis from eventual Hindu enslavement.',
          lang: 'en',
          cite: {
            source: 'loc-bangladesh-country-study-1989',
            loc: { section: 'The War for Bangladeshi Independence, 1971', para: '3' }
          },
          provenance: { via: 'web', at: '2026-10-09', url: 'http://countrystudies.us/bangladesh/17.htm' }
        }
      ]
    },
    {
      id: 'india-gandhi',
      category: 'official',
      holders: [
        { kind: 'state', name: 'India' }
      ],
      statements: [
        {
          id: 'q7',
          text: 'I do not wish to write about the barbarities which have been committed across our eastern border.',
          lang: 'en',
          cite: { source: 'frus1969-76v11-doc-46', loc: { section: 'Document 46' } },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://history.state.gov/historicaldocuments/frus1969-76v11/d46'
          }
        },
        {
          id: 'q8',
          text: 'The carnage in East Bengal has naturally disturbed the Indian people deeply.',
          lang: 'en',
          cite: { source: 'frus1969-76v11-doc-46', loc: { section: 'Document 46' } },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://history.state.gov/historicaldocuments/frus1969-76v11/d46'
          }
        },
        {
          id: 'q9',
          text: 'Apparently, Pakistan is trying to solve its internal problems by cutting down the size of its population in East Bengal and changing its communal composition through an organised and selective programme of eviction; but it is India that has to take the brunt of this.',
          lang: 'en',
          cite: { source: 'frus1969-76v11-doc-46', loc: { section: 'Document 46' } },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://history.state.gov/historicaldocuments/frus1969-76v11/d46'
          }
        }
      ],
      reception: [
        {
          id: 'q13',
          text: 'A propaganda war between Pakistan and India ensued in which Yahya threatened war against India if that country made an attempt to seize any part of Pakistan.',
          lang: 'en',
          cite: {
            source: 'loc-bangladesh-country-study-1989',
            loc: { section: 'The War for Bangladeshi Independence, 1971', para: '5' }
          },
          provenance: { via: 'web', at: '2026-10-09', url: 'http://countrystudies.us/bangladesh/17.htm' }
        }
      ]
    },
    {
      id: 'bangladesh-government',
      category: 'official',
      holders: [
        { kind: 'state', name: 'Bangladesh' }
      ],
      statements: [
        {
          id: 'q10',
          text: '26 March is celebrated as the Independent Day of Bangladesh because of this day, the Father of the Nation Bangabandhu Sheikh Mujibur Rahman officially declared the independence of Bangladesh after the Pakistan Army launched a brutal and barbaric and killed thousands of civilians on the night of 25 March 1971.',
          lang: 'en',
          cite: {
            source: 'bd-govt-portal-the-independent-day',
            loc: { section: 'The Independent Day' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://beautifulbangladesh.gov.bd/district-event/dhaka/events/157'
          }
        },
        {
          id: 'q11',
          text: 'This is a public holiday which is celebrated paying tribute to the millions of martyrs at the National Memorial at Savar.',
          lang: 'en',
          cite: {
            source: 'bd-govt-portal-the-independent-day',
            loc: { section: 'The Independent Day' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://beautifulbangladesh.gov.bd/district-event/dhaka/events/157'
          }
        }
      ],
      reception: [
        {
          id: 'q14',
          text: 'The resulting mass protests in the East were brutally suppressed by the Pakistani Army, which caused a massive refugee movement into neighboring India.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-south-asia-crisis-1971',
            loc: {
              section: 'The South Asia Crisis and the Founding of Bangladesh, 1971',
              para: '3'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://history.state.gov/milestones/1969-1976/south-asia'
          }
        }
      ]
    }
  ],
  researched: '2026-10-09'
})
