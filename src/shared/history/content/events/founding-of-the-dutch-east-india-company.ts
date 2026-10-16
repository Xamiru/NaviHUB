import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'founding-of-the-dutch-east-india-company',
  names: [
    { text: 'Founding of the Dutch East India Company', lang: 'en', role: 'primary' },
    {
      text: 'United East India Company',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'loc-indonesia-country-study-1992',
          loc: { section: 'The United East India Company', para: '2' }
        }
      ]
    },
    {
      text: 'Oostindische Vereenigde Maatschappij',
      lang: 'nl',
      role: 'alternative',
      cites: [
        {
          source: 'britannica-1911-dutch-east-india-company-the',
          loc: { section: 'Dutch East India Company, The', para: '1' }
        }
      ]
    }
  ],
  researched: '2026-10-13',
  type: 'founding',
  start: {
    alts: [
      {
        value: { d: '1602-03-20' },
        cites: [
          {
            source: 'britannica-1911-dutch-east-india-company-the',
            loc: { section: 'Dutch East India Company, The', para: '1' }
          },
          {
            source: 'loc-indonesia-country-study-1992',
            loc: { section: 'The United East India Company', para: '2' }
          }
        ]
      }
    ]
  },
  regions: ['europe', 'southeast-asia'],
  prominence: 2,
  polities: [
    {
      ref: 'polity:dutch-republic',
      cites: [
        {
          source: 'loc-indonesia-country-study-1992',
          loc: { section: 'The United East India Company', para: '1' }
        }
      ]
    }
  ],
  participants: [
    {
      name: 'Jan van Oldenbarneveldt',
      role: 'organizer',
      cites: [
        {
          source: 'britannica-1911-dutch-east-india-company-the',
          loc: { section: 'Dutch East India Company, The', para: '2' }
        }
      ]
    }
  ],
  related: [
    {
      ref: 'event:voyages-of-vasco-da-gama-and-the-portuguese-in-the-indian-ocean',
      rel: 'response-to',
      cites: [
        {
          source: 'britannica-1911-dutch-east-india-company-the',
          loc: { section: 'Dutch East India Company, The', para: '1' }
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
          text: 'In 1602, however, these companies merged to form the United East India Company (VOC) under a charter issued by the Dutch parliament, the Staten-Generaal.',
          lang: 'en',
          cite: {
            source: 'loc-indonesia-country-study-1992',
            loc: { section: 'The United East India Company', para: '2' }
          },
          provenance: { via: 'web', at: '2026-10-13', url: 'http://countrystudies.us/indonesia/7.htm' }
        },
        {
          id: 'q1',
          text: 'Largely at the suggestion of Jan van Oldenbarneveldt, and in full accordance with the economic principles of the time, the states-general decided to combine the existing separate companies into one united Dutch East India Company, which could discharge the functions of a government in those remote seas, prosecute the war with Spain and Portugal, and regulate the trade.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-dutch-east-india-company-the',
            loc: { section: 'Dutch East India Company, The', para: '2' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Dutch_East_India_Company,_The'
          }
        },
        {
          id: 'q3',
          text: 'Although its directors, the Heeren Zeventien (Seventeen Gentlemen), were motivated solely by profit, the VOC was not simply a trading company in the modern sense of the word.',
          lang: 'en',
          cite: {
            source: 'loc-indonesia-country-study-1992',
            loc: { section: 'The United East India Company', para: '3' }
          },
          provenance: { via: 'web', at: '2026-10-13', url: 'http://countrystudies.us/indonesia/7.htm' }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q4',
          text: 'When they were shut out from the Portuguese trade by the Spanish king they were driven to sail to the East in order to make good their loss.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-dutch-east-india-company-the',
            loc: { section: 'Dutch East India Company, The', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Dutch_East_India_Company,_The'
          }
        },
        {
          id: 'q5',
          text: 'Companies described as “Van Ferne”—that is, of the distant seas—were formed, and by 1602 from sixty to seventy Dutch vessels had sailed to Hindustan and the Indian Archipelago.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-dutch-east-india-company-the',
            loc: { section: 'Dutch East India Company, The', para: '2' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Dutch_East_India_Company,_The'
          }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q6',
          text: 'The real governing authority was the “Collegium,” or board of control of 17 members, of whom 16 were chosen from the general directorate in proportion to the share which each local branch had contributed to the capital or joint stock.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-dutch-east-india-company-the',
            loc: { section: 'Dutch East India Company, The', para: '2' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Dutch_East_India_Company,_The'
          }
        },
        {
          id: 'q7',
          text: 'The Dutch traders considered that they had prior rights in the Far East, and their ascendancy in the Indian Archipelago was indeed firmly established on the basis of territorial dominion and authority.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-east-india-company',
            loc: { section: 'East India Company', para: '3' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/East_India_Company'
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
            value: { d: '1595-04-02' },
            cites: [
              {
                source: 'britannica-1911-dutch-east-india-company-the',
                loc: { section: 'Dutch East India Company, The', para: '1' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q8',
        text: 'A first expedition, commanded by Cornelius Houtman, a merchant long resident at Lisbon, sailed on the 2nd of April 1595.',
        lang: 'en',
        cite: {
          source: 'britannica-1911-dutch-east-india-company-the',
          loc: { section: 'Dutch East India Company, The', para: '1' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-13',
          url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Dutch_East_India_Company,_The'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1596' },
            cites: [
              {
                source: 'loc-indonesia-country-study-1992',
                loc: { section: 'The United East India Company', para: '2' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q9',
        text: 'A four-ship Dutch fleet entered Indonesian waters in 1596, visiting Banten on the western tip of Java as well as north-coast Javanese ports and returning home with a profitable cargo of spices.',
        lang: 'en',
        cite: {
          source: 'loc-indonesia-country-study-1992',
          loc: { section: 'The United East India Company', para: '2' }
        },
        provenance: { via: 'web', at: '2026-10-13', url: 'http://countrystudies.us/indonesia/7.htm' }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1602-03-20' },
            cites: [
              {
                source: 'britannica-1911-dutch-east-india-company-the',
                loc: { section: 'Dutch East India Company, The', para: '1' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q10',
        text: 'A capital estimated variously at a little above and a little under 6,500,000 florins, was raised by national subscription in shares of 3000 florins.',
        lang: 'en',
        cite: {
          source: 'britannica-1911-dutch-east-india-company-the',
          loc: { section: 'Dutch East India Company, The', para: '2' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-13',
          url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Dutch_East_India_Company,_The'
        }
      }
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/5/57/Allegorische_voorstelling_van_de_Amsterdamse_Kamer_van_de_Verenigde_Oost-Indische_Compagnie%2C_SK-A-4290.jpg/1280px-Allegorische_voorstelling_van_de_Amsterdamse_Kamer_van_de_Verenigde_Oost-Indische_Compagnie%2C_SK-A-4290.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Allegorische_voorstelling_van_de_Amsterdamse_Kamer_van_de_Verenigde_Oost-Indische_Compagnie,_SK-A-4290.jpg',
    credit: { institution: 'Rijksmuseum', creator: 'Rijksmuseum' },
    license: { id: 'cc0' }
  },
  places: [
    {
      ref: 'place:amsterdam',
      cites: [
        {
          source: 'britannica-1911-dutch-east-india-company-the',
          loc: { section: 'Dutch East India Company, The', para: '2' }
        }
      ]
    }
  ]
})
