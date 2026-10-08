import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'chilean-war-of-independence',
  names: [
    { text: 'Chilean War of Independence', lang: 'en', role: 'primary' },
    { text: 'Guerra de la Independencia de Chile', lang: 'es', role: 'native' }
  ],
  researched: '2026-10-08',
  type: 'war',
  start: {
    alts: [
      {
        value: { d: '1810-09-18' },
        cites: [
          {
            source: 'loc-chile-country-study-1994',
            loc: { section: 'WARS OF INDEPENDENCE, 1810-18', para: '1' }
          }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1818-04-05' },
        cites: [
          {
            source: 'loc-chile-country-study-1994',
            loc: { section: 'WARS OF INDEPENDENCE, 1810-18', para: '5' }
          }
        ]
      }
    ]
  },
  regions: ['latin-america'],
  prominence: 2,
  places: [
    {
      ref: 'place:santiago-de-chile',
      cites: [
        {
          source: 'loc-chile-country-study-1994',
          loc: { section: 'WARS OF INDEPENDENCE, 1810-18', para: '1' }
        }
      ]
    }
  ],
  participants: [
    {
      ref: 'person:bernardo-ohiggins',
      role: 'leader',
      cites: [
        {
          source: 'loc-chile-country-study-1994',
          loc: { section: 'WARS OF INDEPENDENCE, 1810-18', para: '2' }
        }
      ]
    },
    {
      ref: 'person:jose-de-san-martin',
      role: 'commander',
      cites: [
        {
          source: 'loc-chile-country-study-1994',
          loc: { section: 'WARS OF INDEPENDENCE, 1810-18', para: '5' }
        }
      ]
    },
    {
      name: 'José Miguel Carrera Verdugo',
      role: 'leader',
      cites: [
        {
          source: 'loc-chile-country-study-1994',
          loc: { section: 'WARS OF INDEPENDENCE, 1810-18', para: '2' }
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
          text: 'Aristocratic Chileans began considering independence only when the authority and legitimacy of the crown were cast in doubt by Napoleon Bonaparte\'s invasion of Spain in 1807. Napoleon replaced the Spanish king with his brother, Joseph Bonaparte. On the peninsula, Spanish loyalists formed juntas that claimed they would govern both the motherland and the colonies until the rightful king was restored. Thus, Chileans, like other Spanish Americans, had to confront the dilemma of who was in charge in the absence of the divine monarch: the French pretender to the throne, the Spanish rebels, or local leaders. The latter option was tried on September 18, 1810, a date whose anniversary is celebrated as Chile\'s independence day.',
          lang: 'en',
          cite: {
            source: 'loc-chile-country-study-1994',
            loc: { section: 'WARS OF INDEPENDENCE, 1810-18', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-07', url: 'http://countrystudies.us/chile/8.htm' }
        },
        {
          id: 'q3',
          text: 'As commander of the 5,500-man Army of the Andes, half of which was composed of former black slaves, San Martín, in a spectacular military operation, crossed the Andes and liberated Chile in 1817.',
          lang: 'en',
          cite: {
            source: 'loc-peru-country-study-1992',
            loc: { section: 'INDEPENDENCE IMPOSED FROM WITHOUT', para: '3' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/peru/11.htm' }
        },
        {
          id: 'q4',
          text: 'In that sense, the struggle for independence was a war within the upper class, although the majority of troops on both sides consisted of conscripted mestizos and native Americans.',
          lang: 'en',
          cite: {
            source: 'loc-chile-country-study-1994',
            loc: { section: 'WARS OF INDEPENDENCE, 1810-18', para: '4' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/chile/8.htm' }
        }
      ]
    },
    {
      kind: 'aftermath',
      quotes: [
        {
          id: 'q5',
          text: 'San Martín then led his Argentine and Chilean followers north to liberate Peru; and fighting continued in Chile\'s southern provinces, the bastion of the royalists, until 1826.',
          lang: 'en',
          cite: {
            source: 'loc-chile-country-study-1994',
            loc: { section: 'WARS OF INDEPENDENCE, 1810-18', para: '5' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/chile/8.htm' }
        }
      ]
    }
  ],
  course: [
    {
      date: {
        alts: [
          {
            value: { d: '1814-10-12' },
            cites: [
              {
                source: 'loc-chile-country-study-1994',
                loc: { section: 'WARS OF INDEPENDENCE, 1810-18', para: '2' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q6',
        text: 'After several efforts, Spanish troops from Peru took advantage of the internecine strife to reconquer Chile in 1814, when they reasserted control by winning the Battle of Rancagua on October 12.',
        lang: 'en',
        cite: {
          source: 'loc-chile-country-study-1994',
          loc: { section: 'WARS OF INDEPENDENCE, 1810-18', para: '2' }
        },
        provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/chile/8.htm' }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1817-02-12' },
            cites: [
              {
                source: 'loc-chile-country-study-1994',
                loc: { section: 'WARS OF INDEPENDENCE, 1810-18', para: '5' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q7',
        text: 'In exile in Argentina, O\'Higgins joined forces with José de San Martín, whose army freed Chile with a daring assault over the Andes in 1817, defeating the Spaniards at the Battle of Chacabuco on February 12.',
        lang: 'en',
        cite: {
          source: 'loc-chile-country-study-1994',
          loc: { section: 'WARS OF INDEPENDENCE, 1810-18', para: '5' }
        },
        provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/chile/8.htm' }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1818-04-05' },
            cites: [
              {
                source: 'loc-chile-country-study-1994',
                loc: { section: 'WARS OF INDEPENDENCE, 1810-18', para: '5' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q8',
        text: 'Chile won its formal independence when San Martín defeated the last large Spanish force on Chilean soil at the Battle of Maipú on April 5, 1818.',
        lang: 'en',
        cite: {
          source: 'loc-chile-country-study-1994',
          loc: { section: 'WARS OF INDEPENDENCE, 1810-18', para: '5' }
        },
        provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/chile/8.htm' }
      }
    }
  ],
  hero: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/8/80/Abrazo_de_Maip%C3%BA_Pedro_Subercaseaux.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Abrazo_de_Maip%C3%BA_Pedro_Subercaseaux.jpg',
    credit: { creator: 'Pedro Subercaseaux' },
    license: { id: 'public-domain' }
  },
  furtherReading: [
    { source: 'villalobos-1961-tradicion-y-reforma-en-1810', perspective: 'latin-american' },
    { source: 'jocelyn-holt-1999-la-independencia-de-chile', perspective: 'latin-american' }
  ]
})
