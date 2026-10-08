import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'non-cooperation-movement',
  names: [
    { text: 'Non-cooperation movement', lang: 'en', role: 'primary' },
    {
      text: 'first nationwide satyagraha',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'loc-india-country-study-1995',
          loc: { section: 'Mahatma Gandhi', para: '2' }
        }
      ]
    }
  ],
  researched: '2026-10-08',
  type: 'movement',
  start: {
    alts: [
      {
        value: { d: '1920-09-08' },
        cites: [
          { source: 'lemo-chronik-1920', loc: { section: 'Chronik 1920', para: '224' } }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1922' },
        cites: [
          {
            source: 'loc-india-country-study-1995',
            loc: { section: 'Mahatma Gandhi', para: '3' }
          }
        ]
      }
    ]
  },
  regions: ['south-asia'],
  prominence: 2,
  polities: [
    { ref: 'polity:british-raj' }
  ],
  participants: [
    {
      ref: 'person:mahatma-gandhi',
      role: 'leader',
      cites: [
        {
          source: 'loc-india-country-study-1995',
          loc: { section: 'Mahatma Gandhi', para: '2' }
        }
      ]
    }
  ],
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q2',
          text: 'During his first nationwide satyagraha, Gandhi urged the people to boycott British education institutions, law courts, and products (in favor of swadeshi ); to resign from government employment; to refuse to pay taxes; and to forsake British titles and honors.',
          lang: 'en',
          cite: {
            source: 'loc-india-country-study-1995',
            loc: { section: 'Mahatma Gandhi', para: '2' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/india/20.htm' }
        },
        {
          id: 'q3',
          text: 'In 1920, under Gandhi\'s leadership, the Congress was reorganized and given a new constitution, whose goal was swaraj .',
          lang: 'en',
          cite: {
            source: 'loc-india-country-study-1995',
            loc: { section: 'Mahatma Gandhi', para: '2' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/india/20.htm' }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q4',
          text: 'The party was transformed from an elite organization to one of mass national appeal.',
          lang: 'en',
          cite: {
            source: 'loc-india-country-study-1995',
            loc: { section: 'Mahatma Gandhi', para: '2' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/india/20.htm' }
        },
        {
          id: 'q5',
          text: 'Gandhi was forced to call off the campaign in 1922 because of atrocities committed against police. However, the abortive campaign marked a milestone in India\'s political development.',
          lang: 'en',
          cite: {
            source: 'loc-india-country-study-1995',
            loc: { section: 'Mahatma Gandhi', para: '3' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/india/20.htm' }
        }
      ]
    }
  ],
  course: [
    {
      date: {
        alts: [
          {
            value: { d: '1922-03-10' },
            cites: [
              { source: 'lemo-chronik-1922', loc: { section: 'Chronik 1922', para: '38' } },
              {
                source: 'loc-india-country-study-1995',
                loc: { section: 'Mahatma Gandhi', para: '3' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q7',
        text: 'For his efforts, Gandhi was imprisoned until 1924.',
        lang: 'en',
        cite: {
          source: 'loc-india-country-study-1995',
          loc: { section: 'Mahatma Gandhi', para: '3' }
        },
        provenance: { via: 'web', at: '2026-10-07', url: 'http://countrystudies.us/india/20.htm' }
      }
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/2/24/Gandhi_and_Indira_1924.jpg/1280px-Gandhi_and_Indira_1924.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Gandhi_and_Indira_1924.jpg',
    credit: { institution: 'Gujarat Vidyapith' },
    license: { id: 'public-domain' }
  },
  archive: [
    {
      id: 'andrews-non-co-operation',
      mediaKind: 'document',
      title: 'Non-co-operation',
      url: 'https://archive.org/download/noncooperation00andruoft/noncooperation00andruoft.pdf',
      page: 'https://archive.org/details/noncooperation00andruoft',
      credit: {
        institution: 'Robarts - University of Toronto (Internet Archive)',
        creator: 'Andrews, C. F. (Charles Freer), 1871-1940'
      },
      license: { id: 'public-domain' },
      bytes: 2135652
    }
  ],
  furtherReading: [
    { source: 'chandra-1989-indias-struggle-for-independence', perspective: 'south-asian' },
    { source: 'sarkar-1983-modern-india', perspective: 'south-asian' }
  ]
})
