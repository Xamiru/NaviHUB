import { definePolity } from '../../schema'

export default definePolity({
  id: 'india',
  names: [
    { text: 'India', lang: 'en', role: 'primary' },
    { text: 'भारत', lang: 'hi', role: 'native', translit: 'Bhārat' },
    {
      text: 'Dominion of India',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'legislation-gov-uk-indian-independence-act-1947',
          loc: { section: 'Section 1' }
        }
      ]
    }
  ],
  researched: '2026-10-08',
  polityType: 'republic',
  start: {
    alts: [
      {
        value: { d: '1947-08-15' },
        cites: [
          {
            source: 'loc-india-country-study-1995',
            loc: { section: 'Political Impasse and Independence', para: '4' }
          }
        ]
      }
    ]
  },
  regions: ['south-asia'],
  prominence: 2,
  capitals: [
    {
      ref: 'place:delhi',
      cites: [
        {
          source: 'cshapes-2-dataset',
          loc: { section: 'India (code 750), capital New Delhi (Delhi)' }
        }
      ]
    }
  ],
  predecessors: [
    {
      ref: 'polity:british-raj',
      cites: [
        {
          source: 'loc-india-country-study-1995',
          loc: { section: 'Political Impasse and Independence', para: '4' }
        }
      ]
    }
  ],
  cshapes: [
    { set: 'world', code: 750, from: 1947.62 }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/b/b9/Nehru_in_the_Netherlands_1957%2C_Bestanddeelnr_908-7533.jpg/1280px-Nehru_in_the_Netherlands_1957%2C_Bestanddeelnr_908-7533.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Nehru_in_the_Netherlands_1957,_Bestanddeelnr_908-7533.jpg',
    credit: { institution: 'Nationaal Archief (Anefo collection)', creator: 'Wim van Rossem' },
    license: { id: 'cc0' }
  },
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'At midnight, on August 15, 1947, India strode to freedom amidst ecstatic shouting of "Jai Hind" (roughly, Long Live India), when Nehru delivered a memorable and moving speech on India\'s "tryst with destiny."',
          lang: 'en',
          cite: {
            source: 'loc-india-country-study-1995',
            loc: { section: 'Political Impasse and Independence', para: '4' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/india/21.htm' }
        },
        {
          id: 'q2',
          text: 'Adopted after some two and one-half years of deliberation by the Constituent Assembly that also acted as India\'s first legislature, the constitution was put into effect on January 26, 1950.',
          lang: 'en',
          cite: {
            source: 'loc-india-country-study-1995',
            loc: { section: 'The Constitution', para: '2' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/india/109.htm' }
        }
      ]
    },
    {
      kind: 'course',
      quotes: [
        {
          id: 'q3',
          text: 'Jawaharlal Nehru (1889-1964), India\'s first prime minister, was the chief architect of domestic and foreign policies between 1947 and 1964.',
          lang: 'en',
          cite: {
            source: 'loc-india-country-study-1995',
            loc: { section: 'Jawaharlal Nehru', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/india/23.htm' }
        },
        {
          id: 'q4',
          text: 'The structure of India\'s federal--or union--system not only creates a strong central government but also has facilitated the concentration of power in the central government in general and in particular in the Office of the Prime Minister.',
          lang: 'en',
          cite: {
            source: 'loc-india-country-study-1995',
            loc: { section: 'Government and Politics', para: '2' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/india/108.htm' }
        }
      ]
    }
  ],
  furtherReading: [
    { source: 'guha-2007-india-after-gandhi', perspective: 'south-asian' },
    { source: 'chandra-mukherjee-1999-india-after-independence', perspective: 'south-asian' }
  ]
})
