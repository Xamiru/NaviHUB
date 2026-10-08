import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'anglo-dutch-treaty-of-1824',
  names: [
    { text: 'Anglo-Dutch Treaty of 1824', lang: 'en', role: 'primary' },
    {
      text: 'Treaty of London',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'loc-singapore-country-study-1989',
          loc: { section: 'Founding and Early Years', para: '16' }
        }
      ]
    }
  ],
  researched: '2026-10-08',
  type: 'treaty',
  start: {
    alts: [
      {
        value: { d: '1824-03-17' },
        cites: [
          {
            source: 'loc-singapore-country-study-1989',
            loc: { section: 'Founding and Early Years', para: '16' }
          }
        ]
      }
    ]
  },
  regions: ['southeast-asia', 'europe'],
  prominence: 3,
  places: [
    { ref: 'place:london' }
  ],
  polities: [
    { ref: 'polity:united-kingdom' }
  ],
  related: [
    { ref: 'event:founding-of-singapore', rel: 'related' }
  ],
  sections: [
    {
      kind: 'background',
      quotes: [
        {
          id: 'q1',
          text: 'Because the Dutch still contested the British presence in Singapore, Raffles did not dare push the issue further.',
          lang: 'en',
          cite: {
            source: 'loc-singapore-country-study-1989',
            loc: { section: 'Founding and Early Years', para: '16' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/singapore/4.htm' }
        }
      ]
    },
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q2',
          text: 'On March 17, 1824, however, the AngloDutch Treaty of London was signed, dividing the East Indies into two spheres of influence.',
          lang: 'en',
          cite: {
            source: 'loc-singapore-country-study-1989',
            loc: { section: 'Founding and Early Years', para: '16' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/singapore/4.htm' }
        },
        {
          id: 'q3',
          text: 'The British would have hegemony north of a line drawn through the Strait of Malacca, and the Dutch would control the area south of the line.',
          lang: 'en',
          cite: {
            source: 'loc-singapore-country-study-1989',
            loc: { section: 'Founding and Early Years', para: '16' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/singapore/4.htm' }
        },
        {
          id: 'q4',
          text: 'As a result, the Dutch recognized the British claim to Singapore and relinquished power over Malacca in exchange for the British post at Bencoolen.',
          lang: 'en',
          cite: {
            source: 'loc-singapore-country-study-1989',
            loc: { section: 'Founding and Early Years', para: '16' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/singapore/4.htm' }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q5',
          text: 'On August 3, with their claim to Singapore secure, the British negotiated a new treaty with the sultan and the temenggong, by which the Malay rulers were forced to cede Singapore and the neighboring islands to the British East India Company for cash payments and increased pensions.',
          lang: 'en',
          cite: {
            source: 'loc-singapore-country-study-1989',
            loc: { section: 'Founding and Early Years', para: '16' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/singapore/4.htm' }
        }
      ]
    }
  ],
  hero: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/b/bb/Bencoleen_Sumatra.png',
    page: 'https://commons.wikimedia.org/wiki/File:Bencoleen_Sumatra.png',
    credit: { institution: 'Leiden University Library' },
    license: { id: 'public-domain' }
  }
})
