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
  researched: '2026-10-06',
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
          id: 'q1',
          text: 'Das Komitee des indischen Nationalkongresses beschließt, das gegen die britische Kolonialmacht gerichtete Konzept zur Erlangung der Unabhängigkeit des Freiheitskämpfers "Mahatma" Gandhi (1869-1948) zu unterstützen.',
          lang: 'de',
          cite: { source: 'lemo-chronik-1920', loc: { section: 'Chronik 1920', para: '227' } },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.dhm.de/lemo/jahreschronik/1920.html'
          }
        },
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
              { source: 'lemo-chronik-1922', loc: { section: 'Chronik 1922', para: '38' } }
            ]
          }
        ]
      },
      quote: {
        id: 'q6',
        text: 'Verhaftung des indischen Freiheitskämpfers Mahatma Gandhi (1869-1948) durch die britische Kolonialregierung. Eine Woche später wird er zu sechs Jahren Haft verurteilt.',
        lang: 'de',
        cite: { source: 'lemo-chronik-1922', loc: { section: 'Chronik 1922', para: '40' } },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://www.dhm.de/lemo/jahreschronik/1922.html'
        }
      }
    }
  ],
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
  ]
})
