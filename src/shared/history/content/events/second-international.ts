import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'second-international',
  names: [
    { text: 'Second International', lang: 'en', role: 'primary' },
    {
      text: 'Socialist International',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'ehne-marcobelli-socialists-and-peace',
          loc: { section: 'The Socialists and Peace', para: '4' }
        }
      ]
    },
    {
      text: 'II. Internationale',
      lang: 'de',
      role: 'alternative',
      cites: [
        { source: 'lemo-chronik-1889', loc: { section: 'Chronik 1889', para: '44' } }
      ]
    }
  ],
  researched: '2026-10-08',
  type: 'founding',
  start: {
    alts: [
      {
        value: { d: '1889-07-14' },
        cites: [
          {
            source: 'ehne-marcobelli-socialists-and-peace',
            loc: { section: 'The Socialists and Peace', para: '6' }
          },
          { source: 'lemo-chronik-1889', loc: { section: 'Chronik 1889', para: '43' } },
          { source: 'lemo-chronik-1889', loc: { section: 'Chronik 1889', para: '44' } }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1889-07-21' },
        cites: [
          {
            source: 'ehne-marcobelli-socialists-and-peace',
            loc: { section: 'The Socialists and Peace', para: '6' }
          },
          { source: 'lemo-chronik-1889', loc: { section: 'Chronik 1889', para: '43' } },
          { source: 'lemo-chronik-1889', loc: { section: 'Chronik 1889', para: '44' } }
        ]
      }
    ]
  },
  regions: ['europe', 'global'],
  prominence: 2,
  places: [
    {
      ref: 'place:paris',
      cites: [
        {
          source: 'ehne-marcobelli-socialists-and-peace',
          loc: { section: 'The Socialists and Peace', para: '6' }
        },
        { source: 'lemo-chronik-1889', loc: { section: 'Chronik 1889', para: '44' } }
      ]
    }
  ],
  related: [
    { ref: 'event:haymarket-affair', rel: 'related' }
  ],
  participants: [
    {
      name: 'Friedrich Engels',
      role: 'organizer',
      cites: [
        { source: 'lemo-chronik-1889', loc: { section: 'Chronik 1889', para: '44' } }
      ]
    }
  ],
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q2',
          text: 'European socialism’s interest in peace awakened primarily with the emergence of the Second International, or the Socialist International, which was founded in 1889.',
          lang: 'en',
          cite: {
            source: 'ehne-marcobelli-socialists-and-peace',
            loc: { section: 'The Socialists and Peace', para: '4' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://ehne.fr/en/encyclopedia/themes/international-relations/cultures-peace/socialists-and-peace'
          }
        }
      ]
    },
    {
      kind: 'course',
      quotes: [
        {
          id: 'q3',
          text: 'During the early years of the Second International, debates regarding the stance to take toward the threat of a possible war—despite being on the agenda for its constitutive congress in Paris on July 14-21, 1889—were quickly brought to an end, and resulted in highly general resolutions.',
          lang: 'en',
          cite: {
            source: 'ehne-marcobelli-socialists-and-peace',
            loc: { section: 'The Socialists and Peace', para: '6' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://ehne.fr/en/encyclopedia/themes/international-relations/cultures-peace/socialists-and-peace'
          }
        },
        {
          id: 'q4',
          text: '1889 nimmt der internationale Arbeiterkongress in Paris diese Vorgänge zum Anlass für den Beschluss, den 1. Mai zum internationalen Kampftag für den Achtstundentag zu machen.',
          lang: 'de',
          cite: { source: 'lemo-chronik-1886', loc: { section: 'Chronik 1886', para: '27' } },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.dhm.de/lemo/jahreschronik/1886.html'
          }
        }
      ]
    },
    {
      kind: 'legacy',
      quotes: [
        {
          id: 'q5',
          text: 'It was the issue of war that ultimately led to the permanent disintegration of the Second International,',
          lang: 'en',
          cite: {
            source: 'ehne-marcobelli-socialists-and-peace',
            loc: { section: 'The Socialists and Peace', para: '9' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://ehne.fr/en/encyclopedia/themes/international-relations/cultures-peace/socialists-and-peace'
          }
        }
      ]
    }
  ],
  hero: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/a/ad/Congresso_Socialdem_1910.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Congresso_Socialdem_1910.jpg',
    credit: { institution: 'Den Store Danske' },
    license: { id: 'public-domain' }
  },
  furtherReading: [
    { source: 'haupt-1964-la-deuxieme-internationale', perspective: 'european' },
    { source: 'zubok-1965-istoriya-vtorogo-internatsionala', perspective: 'russian-soviet' }
  ]
})
