import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'first-taranaki-war',
  names: [
    { text: 'First Taranaki War', lang: 'en', role: 'primary' },
    {
      text: 'Taranaki War',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'cowan-1922-new-zealand-wars-vol-1',
          loc: { section: 'Chapter XVII. The Waitara Purchase' }
        }
      ]
    },
    {
      text: 'Waitara war',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'cowan-1922-new-zealand-wars-vol-1',
          loc: { section: 'Chapter XXIV. Pratt\'s Long Sap' }
        }
      ]
    }
  ],
  researched: '2026-10-08',
  type: 'war',
  start: {
    alts: [
      {
        value: { d: '1860-03-17' },
        cites: [
          {
            source: 'cowan-1922-new-zealand-wars-vol-1',
            loc: { section: 'Chapter XVIII. The First Taranaki War' }
          }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1861-03-19' },
        cites: [
          {
            source: 'cowan-1922-new-zealand-wars-vol-1',
            loc: { section: 'Chapter XXIV. Pratt\'s Long Sap' }
          }
        ]
      }
    ]
  },
  regions: ['oceania'],
  prominence: 2,
  places: [
    {
      ref: 'place:waitara',
      cites: [
        {
          source: 'cowan-1922-new-zealand-wars-vol-1',
          loc: { section: 'Chapter XVII. The Waitara Purchase' }
        }
      ]
    },
    {
      ref: 'place:new-plymouth',
      cites: [
        {
          source: 'cowan-1922-new-zealand-wars-vol-1',
          loc: { section: 'Chapter XVIII. The First Taranaki War' }
        }
      ]
    }
  ],
  polities: [
    { ref: 'polity:british-empire' }
  ],
  related: [
    { ref: 'event:treaty-of-waitangi', rel: 'related' }
  ],
  participants: [
    {
      name: 'Wiremu Kingi te Rangitaake',
      role: 'leader',
      cites: [
        {
          source: 'cowan-1922-new-zealand-wars-vol-1',
          loc: { section: 'Chapter XVII. The Waitara Purchase' }
        }
      ]
    },
    {
      name: 'Teira',
      role: 'participant',
      cites: [
        {
          source: 'cowan-1922-new-zealand-wars-vol-1',
          loc: { section: 'Chapter XVII. The Waitara Purchase' }
        }
      ]
    },
    {
      name: 'Hapurona',
      role: 'commander',
      cites: [
        {
          source: 'cowan-1922-new-zealand-wars-vol-1',
          loc: { section: 'Chapter XVIII. The First Taranaki War' }
        }
      ]
    },
    {
      name: 'Governor Gore Browne',
      role: 'head-of-government',
      cites: [
        {
          source: 'cowan-1922-new-zealand-wars-vol-1',
          loc: { section: 'Chapter XVII. The Waitara Purchase' }
        }
      ]
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/9/99/New_Zealand_settlers_and_soldiers%3B_or_The_war_in_Taranaki-_being_incidents_in_the_life_of_a_settler_%281861%29_%2814588045738%29.jpg/1280px-New_Zealand_settlers_and_soldiers%3B_or_The_war_in_Taranaki-_being_incidents_in_the_life_of_a_settler_%281861%29_%2814588045738%29.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:New_Zealand_settlers_and_soldiers;_or_The_war_in_Taranaki-_being_incidents_in_the_life_of_a_settler_(1861)_(14588045738).jpg',
    credit: { institution: 'Internet Archive Book Images' },
    license: { id: 'public-domain' }
  },
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'It was the dispute over the defective purchase of this land by the Government that caused the Taranaki War.',
          lang: 'en',
          cite: {
            source: 'cowan-1922-new-zealand-wars-vol-1',
            loc: { section: 'Chapter XVII. The Waitara Purchase' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://archive.org/download/newzealandwarshi01cowa/newzealandwarshi01cowa_djvu.txt'
          }
        },
        {
          id: 'q2',
          text: 'The other prolonged contest was racial—the conflict between settler and Maori.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-new-zealand',
            loc: { section: 'NEW ZEALAND', para: '83' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/New_Zealand'
          }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q3',
          text: 'Teira, a minor chief of the Atiawa, living with his fellow-tribesmen on the ancestral lands on the Waitara, was persuaded to offer 600 acres of the land to the Government, at a price of £1 per acre.',
          lang: 'en',
          cite: {
            source: 'cowan-1922-new-zealand-wars-vol-1',
            loc: { section: 'Chapter XVII. The Waitara Purchase' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://archive.org/download/newzealandwarshi01cowa/newzealandwarshi01cowa_djvu.txt'
          }
        },
        {
          id: 'q4',
          text: 'A number of Teira\'s people supported him, but the majority of the Atiawa, headed by Wiremu Kingi te Rangitaake, opposed the transaction, and made vehement and repeated protest.',
          lang: 'en',
          cite: {
            source: 'cowan-1922-new-zealand-wars-vol-1',
            loc: { section: 'Chapter XVII. The Waitara Purchase' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://archive.org/download/newzealandwarshi01cowa/newzealandwarshi01cowa_djvu.txt'
          }
        },
        {
          id: 'q5',
          text: 'The case for the opponents of the sale was that while individual cultivation rights existed no one had a right to part with the tribal estate without general consent.',
          lang: 'en',
          cite: {
            source: 'cowan-1922-new-zealand-wars-vol-1',
            loc: { section: 'Chapter XVII. The Waitara Purchase' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://archive.org/download/newzealandwarshi01cowa/newzealandwarshi01cowa_djvu.txt'
          }
        },
        {
          id: 'q6',
          text: 'The case for the European settlers of Taranaki lay in the necessity for obtaining more land for the extension of the settlements.',
          lang: 'en',
          cite: {
            source: 'cowan-1922-new-zealand-wars-vol-1',
            loc: { section: 'Chapter XVII. The Waitara Purchase' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://archive.org/download/newzealandwarshi01cowa/newzealandwarshi01cowa_djvu.txt'
          }
        },
        {
          id: 'q7',
          text: 'The native tribes, brave, intelligent and fairly well armed, tried, by means of a league against land-selling and the election of a king, to retain their hold over at least the central North Island.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-new-zealand',
            loc: { section: 'NEW ZEALAND', para: '83' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/New_Zealand'
          }
        }
      ]
    },
    {
      kind: 'in-their-words',
      quotes: [
        {
          id: 'q8',
          text: 'Our troubles which led to war began when our people lived in their pa called Karaponia (California), on the left (west) side of the Waitara River, at the mouth.',
          lang: 'en',
          cite: {
            source: 'cowan-1922-new-zealand-wars-vol-1',
            loc: { section: 'Chapter XVII. The Waitara Purchase' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://archive.org/download/newzealandwarshi01cowa/newzealandwarshi01cowa_djvu.txt'
          }
        },
        {
          id: 'q9',
          text: 'The land was seized upon because of the woman, At Karaponia it all began.',
          lang: 'en',
          cite: {
            source: 'cowan-1922-new-zealand-wars-vol-1',
            loc: { section: 'Chapter XVII. The Waitara Purchase' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://archive.org/download/newzealandwarshi01cowa/newzealandwarshi01cowa_djvu.txt'
          }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q10',
          text: 'Had Sir George Grey been Governor in 1857 both the Waitara blunder and the Waikato War would probably have been avoided.',
          lang: 'en',
          cite: {
            source: 'cowan-1922-new-zealand-wars-vol-1',
            loc: { section: 'Chapter XVI. The Maori King' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://archive.org/download/newzealandwarshi01cowa/newzealandwarshi01cowa_djvu.txt'
          }
        },
        {
          id: 'q11',
          text: 'During ten years of intermittent marching and fighting between 1861 and 1871 the Maori did no more than prove that they had in them the stuff to stand up against fearful odds and not always to be worsted.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-new-zealand',
            loc: { section: 'NEW ZEALAND', para: '83' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/New_Zealand'
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
            value: { d: '1860-02-20' },
            cites: [
              {
                source: 'cowan-1922-new-zealand-wars-vol-1',
                loc: { section: 'Chapter XVIII. The First Taranaki War' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q12',
        text: 'The old chief replied that he did not desire war, that he loved the white people very much, but that he intended to hold the land.',
        lang: 'en',
        cite: {
          source: 'cowan-1922-new-zealand-wars-vol-1',
          loc: { section: 'Chapter XVIII. The First Taranaki War' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-08',
          url: 'https://archive.org/download/newzealandwarshi01cowa/newzealandwarshi01cowa_djvu.txt'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1860-03-17' },
            cites: [
              {
                source: 'cowan-1922-new-zealand-wars-vol-1',
                loc: { section: 'Chapter XVIII. The First Taranaki War' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q13',
        text: 'Wiremu Kingi and his Atiawa followers, with the fiery chief Hapurona as the war-leader, determined to maintain their right to their tribal lands.',
        lang: 'en',
        cite: {
          source: 'cowan-1922-new-zealand-wars-vol-1',
          loc: { section: 'Chapter XVIII. The First Taranaki War' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-08',
          url: 'https://archive.org/download/newzealandwarshi01cowa/newzealandwarshi01cowa_djvu.txt'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1861-03-19' },
            cites: [
              {
                source: 'cowan-1922-new-zealand-wars-vol-1',
                loc: { section: 'Chapter XXIV. Pratt\'s Long Sap' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q14',
        text: 'The Maori white flag went up about 6 o\'clock. The working and covering parties were then withdrawn and hostilities ceased.',
        lang: 'en',
        cite: {
          source: 'cowan-1922-new-zealand-wars-vol-1',
          loc: { section: 'Chapter XXIV. Pratt\'s Long Sap' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-08',
          url: 'https://archive.org/download/newzealandwarshi01cowa/newzealandwarshi01cowa_djvu.txt'
        }
      }
    }
  ],
  furtherReading: [
    { source: 'walker-1990-ka-whawhai-tonu-matou', perspective: 'pacific' }
  ]
})
