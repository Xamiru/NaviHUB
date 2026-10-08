import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'berlin-conference',
  names: [
    { text: 'Berlin Conference', lang: 'en', role: 'primary' },
    {
      text: 'Kongo-Konferenz',
      lang: 'de',
      role: 'alternative',
      cites: [
        { source: 'lemo-chronik-1884', loc: { section: 'Chronik 1884', para: '50' } }
      ]
    },
    {
      text: 'West African Conference',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'britannica-1911-congo-free-state',
          loc: { section: 'CONGO FREE STATE', para: '70' }
        }
      ]
    }
  ],
  researched: '2026-10-08',
  type: 'conference',
  start: {
    alts: [
      {
        value: { d: '1884-11-15' },
        cites: [
          {
            source: 'britannica-1911-africa',
            loc: { section: 'AFRICA, V. Partition among European Powers', para: '26' }
          },
          { source: 'lemo-chronik-1884', loc: { section: 'Chronik 1884', para: '49' } },
          { source: 'lemo-chronik-1884', loc: { section: 'Chronik 1884', para: '50' } }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1885-02-26' },
        cites: [
          {
            source: 'britannica-1911-africa',
            loc: { section: 'AFRICA, V. Partition among European Powers', para: '26' }
          },
          { source: 'lemo-chronik-1885', loc: { section: 'Chronik 1885', para: '11' } },
          { source: 'lemo-chronik-1885', loc: { section: 'Chronik 1885', para: '12' } }
        ]
      }
    ]
  },
  regions: ['subsaharan-africa', 'europe'],
  prominence: 1,
  places: [
    {
      ref: 'place:berlin',
      cites: [
        {
          source: 'britannica-1911-africa',
          loc: { section: 'AFRICA, V. Partition among European Powers', para: '26' }
        }
      ]
    }
  ],
  polities: [
    { ref: 'polity:german-empire' },
    { ref: 'polity:united-kingdom' },
    { ref: 'polity:french-third-republic' },
    { ref: 'polity:congo-free-state' },
    { ref: 'polity:ottoman-empire' },
    { ref: 'polity:russian-empire' }
  ],
  related: [
    {
      ref: 'polity:congo-free-state',
      rel: 'led-to',
      cites: [
        {
          source: 'britannica-1911-africa',
          loc: { section: 'AFRICA, V. Partition among European Powers', para: '27' }
        }
      ]
    }
  ],
  participants: [
    {
      ref: 'person:otto-von-bismarck',
      role: 'organizer',
      cites: [
        { source: 'lemo-chronik-1884', loc: { section: 'Chronik 1884', para: '50' } }
      ]
    },
    {
      ref: 'person:leopold-ii-of-belgium',
      role: 'participant',
      cites: [
        {
          source: 'britannica-1911-africa',
          loc: { section: 'AFRICA, V. Partition among European Powers', para: '27' }
        }
      ]
    },
    {
      name: 'Colonel M. Strauch',
      role: 'diplomat',
      cites: [
        {
          source: 'britannica-1911-africa',
          loc: { section: 'AFRICA, V. Partition among European Powers', para: '27' }
        }
      ]
    }
  ],
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q13',
          text: 'The Berlin Conference of 1884-1885 defined the rules of the game that presided over the colonization of Africa.',
          lang: 'en',
          cite: {
            source: 'ehne-jeannesson-concert-of-europe',
            loc: { section: 'The Concert of Europe', para: '8' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://ehne.fr/en/article/europe-europeans-and-world/organizing-international-system/concert-europe'
          }
        },
        {
          id: 'q14',
          text: 'The powers represented were Germany, Austria-Hungary, Belgium, […] Denmark, Spain, the United States, France, Great Britain, Italy, Holland, Portugal, Russia, Sweden and Norway, and Turkey, to name them in the alphabetical order adopted in the preamble to the French text of the General Act.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-africa',
            loc: { section: 'AFRICA, V. Partition among European Powers', para: '26' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Africa'
          }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q4',
          text: 'In the last quarter of the 19th century the map of Africa was transformed. After the discovery of the Congo the story of exploration takes second place; the continent becomes the theatre of European expansion. Lines of partition, drawn often through trackless wildernesses, marked out the possessions of Germany, France, Great Britain and other powers.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-africa',
            loc: { section: 'AFRICA, V. Partition among European Powers', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Africa'
          }
        },
        {
          id: 'q5',
          text: 'For some time before 1884 there had been growing up a general conviction that it would be desirable for the powers who were interesting themselves in Africa to come to some agreement as to “the rules of the game,” and to define their respective interests so far as that was practicable. Lord Granville’s ill-fated treaty brought this sentiment to a head, and it was agreed to hold an international conference on African affairs.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-africa',
            loc: { section: 'AFRICA, V. Partition among European Powers', para: '18' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Africa'
          }
        },
        {
          id: 'q6',
          text: 'Yet the idea of colonial expansion was of slow growth in Germany, and when Prince Bismarck at length acted Africa was the only field left to exploit, South America being protected from interference by the known determination of the United States to enforce the Monroe Doctrine, while Great Britain, France, the Netherlands, Portugal and Spain already held most of the other regions of the world where colonization was possible.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-africa',
            loc: { section: 'AFRICA, V. Partition among European Powers', para: '9' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Africa'
          }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q10',
          text: 'From 1885 the scramble among the powers went on with renewed vigour, and in the fifteen years that remained of the century the work of partition, so far as international agreements were concerned, was practically completed.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-africa',
            loc: { section: 'AFRICA, V. Partition among European Powers', para: '28' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Africa'
          }
        },
        {
          id: 'q15',
          text: 'The Congo Free State owed its existence to the ambition and force of character of a single individual. It dated its formal inclusion among the independent states of the world from 1885, when its founder, Leopold II., king of the Belgians, became its head.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-congo-free-state',
            loc: { section: 'CONGO FREE STATE', para: '3' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Congo_Free_State'
          }
        },
        {
          id: 'q12',
          text: 'The first five years of the existence of the state were greatly hampered by the provision of the Berlin Act prohibiting the imposition of any duties on goods imported into the Congo region,',
          lang: 'en',
          cite: {
            source: 'britannica-1911-congo-free-state',
            loc: { section: 'CONGO FREE STATE', para: '67' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Congo_Free_State'
          }
        },
        {
          id: 'q19',
          text: 'It was not, however, until two months later, in April 1885, that King Leopold, with the sanction of the Belgian legislature, formally assumed the headship of the new state; and on the 1st of August in the same year His Majesty notified the powers that from that date the “Independent State of the Congo” declared that “it shall be perpetually neutral” in conformity with the provisions of the Berlin Act.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-africa',
            loc: { section: 'AFRICA, V. Partition among European Powers', para: '27' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Africa'
          }
        }
      ]
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/6/6b/Kongokonferenz.jpg/1280px-Kongokonferenz.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Kongokonferenz.jpg',
    credit: { creator: 'Adalbert von Rößler' },
    license: { id: 'public-domain' }
  },
  archive: [
    {
      id: 'general-act-of-the-conference-of-berlin-1909',
      mediaKind: 'document',
      title: 'General Act of the Conference of Berlin Concerning the Congo',
      date: { d: '1909' },
      url: 'https://archive.org/download/jstor-2212022/2212022.pdf',
      page: 'https://archive.org/details/jstor-2212022',
      credit: { institution: 'JSTOR (Internet Archive)' },
      license: { id: 'public-domain' },
      bytes: 1236952
    }
  ],
  course: [
    {
      date: {
        alts: [
          {
            value: { d: '1884-11-15' },
            cites: [
              {
                source: 'britannica-1911-africa',
                loc: { section: 'AFRICA, V. Partition among European Powers', para: '26' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q16',
        text: 'The conference assembled at Berlin on the 15th of November 1884, and after protracted deliberations the “General Act of the Berlin Conference” was signed by the representatives of all the powers attending the conference, on the 26th of February 1885.',
        lang: 'en',
        cite: {
          source: 'britannica-1911-africa',
          loc: { section: 'AFRICA, V. Partition among European Powers', para: '26' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Africa'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1885-02-26' },
            cites: [
              {
                source: 'britannica-1911-africa',
                loc: { section: 'AFRICA, V. Partition among European Powers', para: '26' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q17',
        text: 'The General Act dealt with six specific subjects: (1) freedom of trade in the basin of the Congo, (2) the slave trade, (3) neutrality of territories in the basin of the Congo, (4) navigation of the Congo, (5) navigation of the Niger, (6) rules for future occupation on the coasts of the African continent.',
        lang: 'en',
        cite: {
          source: 'britannica-1911-africa',
          loc: { section: 'AFRICA, V. Partition among European Powers', para: '26' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Africa'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1885-02-26' },
            cites: [
              {
                source: 'britannica-1911-africa',
                loc: { section: 'AFRICA, V. Partition among European Powers', para: '26' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q18',
        text: 'The signatory powers undertook that any fresh act of taking possession on any portion of the African coast must be notified by the power taking possession, or assuming a protectorate, to the other signatory powers. It was further provided that any such occupation to be valid must be effective.',
        lang: 'en',
        cite: {
          source: 'britannica-1911-africa',
          loc: { section: 'AFRICA, V. Partition among European Powers', para: '26' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Africa'
        }
      }
    }
  ],
  furtherReading: [
    { source: 'boahen-1987-african-perspectives-on-colonialism', perspective: 'african' },
    { source: 'uzoigwe-1974-britain-and-the-conquest-of-africa', perspective: 'african' },
    { source: 'forster-1988-bismarck-europe-and-africa', perspective: 'european' }
  ]
})
