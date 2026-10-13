import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'partitions-of-poland',
  names: [
    { text: 'Partitions of Poland', lang: 'en', role: 'primary' },
    {
      text: 'partition of Poland',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'loc-poland-country-study-1992',
          loc: { section: 'The Three Partitions, 1764-95', para: '1' }
        }
      ]
    }
  ],
  researched: '2026-10-13',
  type: 'partition',
  start: {
    alts: [
      {
        value: { d: '1772' },
        cites: [
          {
            source: 'loc-poland-country-study-1992',
            loc: { section: 'The Three Partitions, 1764-95', para: '4' }
          },
          { source: 'britannica-1911-russia', loc: { section: 'Russia', para: '1170' } }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1795-10-24' },
        cites: [
          { source: 'britannica-1911-poland', loc: { section: 'Poland', para: '89' } }
        ]
      }
    ]
  },
  regions: ['europe', 'russia-central-asia'],
  prominence: 2,
  places: [
    {
      ref: 'place:warsaw',
      cites: [
        { source: 'britannica-1911-poland', loc: { section: 'Poland', para: '89' } }
      ]
    },
    {
      ref: 'place:saint-petersburg',
      cites: [
        { source: 'britannica-1911-poland', loc: { section: 'Poland', para: '83' } }
      ]
    }
  ],
  polities: [
    {
      ref: 'polity:polish-lithuanian-commonwealth',
      cites: [
        {
          source: 'loc-poland-country-study-1992',
          loc: { section: 'The Three Partitions, 1764-95', para: '1' }
        }
      ]
    },
    {
      ref: 'polity:russian-empire',
      cites: [
        {
          source: 'loc-poland-country-study-1992',
          loc: { section: 'The Three Partitions, 1764-95', para: '1' }
        }
      ]
    },
    {
      ref: 'polity:kingdom-of-prussia',
      cites: [
        {
          source: 'loc-poland-country-study-1992',
          loc: { section: 'The Three Partitions, 1764-95', para: '1' }
        }
      ]
    }
  ],
  sides: [
    {
      key: 'commonwealth',
      name: 'Polish-Lithuanian Commonwealth',
      polity: 'polity:polish-lithuanian-commonwealth',
      cites: [
        {
          source: 'loc-poland-country-study-1992',
          loc: { section: 'The Three Partitions, 1764-95', para: '1' }
        }
      ]
    },
    {
      key: 'russia',
      name: 'Russia',
      polity: 'polity:russian-empire',
      cites: [
        {
          source: 'loc-poland-country-study-1992',
          loc: { section: 'The Three Partitions, 1764-95', para: '1' }
        }
      ]
    },
    {
      key: 'prussia',
      name: 'Prussia',
      polity: 'polity:kingdom-of-prussia',
      cites: [
        {
          source: 'loc-poland-country-study-1992',
          loc: { section: 'The Three Partitions, 1764-95', para: '1' }
        }
      ]
    },
    {
      key: 'austria',
      name: 'Austria',
      cites: [
        {
          source: 'loc-poland-country-study-1992',
          loc: { section: 'The Three Partitions, 1764-95', para: '1' }
        }
      ]
    }
  ],
  participants: [
    {
      ref: 'person:catherine-the-great',
      role: 'leader',
      side: 'russia',
      cites: [
        {
          source: 'loc-poland-country-study-1992',
          loc: { section: 'The Three Partitions, 1764-95', para: '1' }
        }
      ]
    },
    {
      ref: 'person:frederick-the-great',
      role: 'leader',
      side: 'prussia',
      cites: [
        {
          source: 'loc-poland-country-study-1992',
          loc: { section: 'The Three Partitions, 1764-95', para: '4' }
        }
      ]
    },
    {
      name: 'Stanisław August Poniatowski',
      role: 'head-of-state',
      side: 'commonwealth',
      cites: [
        {
          source: 'loc-poland-country-study-1992',
          loc: { section: 'The Three Partitions, 1764-95', para: '3' }
        }
      ]
    },
    {
      name: 'Tadeusz Kościuszko',
      role: 'commander',
      side: 'commonwealth',
      cites: [
        { source: 'britannica-1911-poland', loc: { section: 'Poland', para: '89' } }
      ]
    }
  ],
  related: [
    {
      ref: 'event:french-revolution',
      rel: 'related',
      cites: [
        {
          source: 'loc-poland-country-study-1992',
          loc: { section: 'The Three Partitions, 1764-95', para: '9' }
        }
      ]
    },
    {
      ref: 'event:pugachevs-rebellion',
      rel: 'related',
      cites: [
        { source: 'britannica-1911-russia', loc: { section: 'Russia', para: '1169' } }
      ]
    }
  ],
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'During the reign of Empress Catherine the Great (1762-96), Russia intensified its manipulation in Polish affairs. Prussia and Austria, the other powers surrounding the republic, also took advantage of internal religious and political bickering to divide up the country in three partition stages. The third partition in 1795 wiped Poland-Lithuania from the map of Europe.',
          lang: 'en',
          cite: {
            source: 'loc-poland-country-study-1992',
            loc: { section: 'The Three Partitions, 1764-95', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-13', url: 'http://countrystudies.us/poland/11.htm' }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q2',
          text: 'All political authority was in the hands of turbulent nobles who quarrelled among themselves, who were always inclined to submit the questions at issue to the arbitrament of arms, and who did not scruple to invite foreign powers to intervene on their behalf.',
          lang: 'en',
          cite: { source: 'britannica-1911-russia', loc: { section: 'Russia', para: '1170' } },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Russia'
          }
        },
        {
          id: 'q3',
          text: 'Because of the chaos sown by the veto provision, under Augustus III (1733-63) only one of thirteen Sejm sessions ran to an orderly adjournment.',
          lang: 'en',
          cite: {
            source: 'loc-poland-country-study-1992',
            loc: { section: 'Decay of the Commonwealth', para: '2' }
          },
          provenance: { via: 'web', at: '2026-10-13', url: 'http://countrystudies.us/poland/10.htm' }
        },
        {
          id: 'q4',
          text: 'The next country to feel the expansive tendencies of Russia was Poland, which had now very little power of resistance.',
          lang: 'en',
          cite: { source: 'britannica-1911-russia', loc: { section: 'Russia', para: '1170' } },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Russia'
          }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q5',
          text: 'The immediate result of the third partition was an immense emigration of the more high-spirited Poles who, during the next ten years, fought the battles of the French Republic and of Napoleon all over Europe, but principally against their own enemies, the partitioning powers.',
          lang: 'en',
          cite: { source: 'britannica-1911-poland', loc: { section: 'Poland', para: '90' } },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Poland'
          }
        },
        {
          id: 'q6',
          text: 'Thus Poland disappeared for a time from the map of Europe.',
          lang: 'en',
          cite: { source: 'britannica-1911-russia', loc: { section: 'Russia', para: '1170' } },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Russia'
          }
        }
      ]
    }
  ],
  course: [
    {
      date: {
        alts: [
          {
            value: { d: '1772-02-17', julian: true },
            cites: [
              { source: 'britannica-1911-poland', loc: { section: 'Poland', para: '83' } }
            ]
          }
        ]
      },
      quote: {
        id: 'q7',
        text: 'The first treaty of partition was signed at St Petersburg between Prussia and Russia on the 6–17th of February 1772; the second treaty, which admitted Austria also to a share of the spoil, on the 5–16th of August the same year.',
        lang: 'en',
        cite: { source: 'britannica-1911-poland', loc: { section: 'Poland', para: '83' } },
        provenance: {
          via: 'web',
          at: '2026-10-13',
          url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Poland'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1791-05-03' },
            cites: [
              {
                source: 'loc-poland-country-study-1992',
                loc: { section: 'The Three Partitions, 1764-95', para: '7' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q8',
        text: 'Stanislaw August\'s process of renovation reached its climax on May 3, 1791, when, after three years of intense debate, the "Four Years\' Sejm" produced Europe\'s first written constitution.',
        lang: 'en',
        cite: {
          source: 'loc-poland-country-study-1992',
          loc: { section: 'The Three Partitions, 1764-95', para: '7' }
        },
        provenance: { via: 'web', at: '2026-10-13', url: 'http://countrystudies.us/poland/11.htm' }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1793' },
            cites: [
              {
                source: 'loc-poland-country-study-1992',
                loc: { section: 'The Three Partitions, 1764-95', para: '9' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q9',
        text: 'Arguing that Poland had fallen prey to the radical Jacobinism then at high tide in France, Russia and Prussia abrogated the Constitution of May 3, carried out a second partition of Poland in 1793, and placed the remainder of the country under occupation by Russian troops.',
        lang: 'en',
        cite: {
          source: 'loc-poland-country-study-1992',
          loc: { section: 'The Three Partitions, 1764-95', para: '9' }
        },
        provenance: { via: 'web', at: '2026-10-13', url: 'http://countrystudies.us/poland/11.htm' }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1795-10-24' },
            cites: [
              { source: 'britannica-1911-poland', loc: { section: 'Poland', para: '89' } }
            ]
          }
        ]
      },
      quote: {
        id: 'q10',
        text: 'By the third treaty of partition Austria had to be content with Western Galicia and Southern Masovia; Prussia took Podlachia, and the rest of Masovia, with Warsaw; and Russia all the rest.',
        lang: 'en',
        cite: { source: 'britannica-1911-poland', loc: { section: 'Poland', para: '89' } },
        provenance: {
          via: 'web',
          at: '2026-10-13',
          url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Poland'
        }
      }
    }
  ],
  hero: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/4/40/Poland_in_1770s-1790s_%28partitions%29.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Poland_in_1770s-1790s_(partitions).jpg',
    credit: { creator: 'Józef Nowina Sroczyński' },
    license: { id: 'public-domain' }
  },
  furtherReading: [
    { source: 'lukowski-1999-partitions-of-poland', perspective: 'european' },
    { source: 'cegielski-1990-rozbiory-polski', perspective: 'european' }
  ]
})
