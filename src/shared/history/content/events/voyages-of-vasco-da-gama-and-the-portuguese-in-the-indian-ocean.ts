import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'voyages-of-vasco-da-gama-and-the-portuguese-in-the-indian-ocean',
  names: [
    {
      text: 'Voyages of Vasco da Gama and the Portuguese in the Indian Ocean',
      lang: 'en',
      role: 'primary'
    },
    {
      text: 'Portuguese Empire in the East',
      lang: 'en',
      role: 'alternative',
      cites: [
        { source: 'britannica-1911-portugal', loc: { section: 'Portugal', para: '82' } }
      ]
    }
  ],
  researched: '2026-10-13',
  type: 'expedition',
  start: {
    alts: [
      {
        value: { d: '1497-07-09' },
        cites: [
          {
            source: 'britannica-1911-gama-vasco-da',
            loc: { section: 'Gama, Vasco da', para: '2' }
          }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1515' },
        cites: [
          { source: 'britannica-1911-portugal', loc: { section: 'Portugal', para: '82' } }
        ]
      },
      {
        value: { d: '1514' },
        cites: [
          { source: 'britannica-1911-hormuz', loc: { section: 'Hormuz', para: '5' } }
        ],
        heldBy: [
          {
            kind: 'organization',
            name: 'Encyclopædia Britannica, 11th edition (article on Hormuz)'
          }
        ]
      }
    ]
  },
  regions: ['south-asia', 'global'],
  prominence: 2,
  places: [
    {
      ref: 'place:calicut',
      cites: [
        {
          source: 'britannica-1911-gama-vasco-da',
          loc: { section: 'Gama, Vasco da', para: '2' }
        }
      ]
    },
    {
      ref: 'place:strait-of-hormuz',
      cites: [
        { source: 'britannica-1911-hormuz', loc: { section: 'Hormuz', para: '5' } }
      ]
    }
  ],
  polities: [
    {
      ref: 'polity:portuguese-empire',
      cites: [
        { source: 'britannica-1911-portugal', loc: { section: 'Portugal', para: '82' } }
      ]
    }
  ],
  participants: [
    {
      name: 'Vasco da Gama',
      role: 'commander',
      cites: [
        {
          source: 'britannica-1911-gama-vasco-da',
          loc: { section: 'Gama, Vasco da', para: '2' }
        }
      ]
    },
    {
      name: 'Alphonso d’Albuquerque',
      role: 'commander',
      cites: [
        { source: 'britannica-1911-portugal', loc: { section: 'Portugal', para: '85' } }
      ]
    },
    {
      name: 'Pedro Alvares Cabral',
      role: 'commander',
      cites: [
        {
          source: 'britannica-1911-gama-vasco-da',
          loc: { section: 'Gama, Vasco da', para: '2' }
        }
      ]
    }
  ],
  related: [
    { ref: 'event:first-battle-of-panipat', rel: 'related' }
  ],
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'The quest for wealth and power brought Europeans to Indian shores in 1498 when Vasco da Gama, the Portuguese voyager, arrived in Calicut (modern Kozhikode, Kerala) on the west coast.',
          lang: 'en',
          cite: {
            source: 'loc-india-country-study-1995',
            loc: { section: 'The Coming of the Europeans', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-13', url: 'http://countrystudies.us/india/15.htm' }
        },
        {
          id: 'q2',
          text: 'In their search for spices and Christian converts, the Portuguese challenged Arab supremacy in the Indian Ocean, and, with their galleons fitted with powerful cannons, set up a network of strategic trading posts along the Arabian Sea and the Persian Gulf.',
          lang: 'en',
          cite: {
            source: 'loc-india-country-study-1995',
            loc: { section: 'The Coming of the Europeans', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-13', url: 'http://countrystudies.us/india/15.htm' }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q3',
          text: 'Prince Henry placed at the disposal of his captains the vast resources of the Order of Christ, the best information and the most accurate instruments and maps which could be obtained.',
          lang: 'en',
          cite: { source: 'britannica-1911-portugal', loc: { section: 'Portugal', para: '80' } },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Portugal'
          }
        },
        {
          id: 'q4',
          text: '“We come to seek Christians and spices,” said the first of Vasco da Gama’s sailors who landed in India: and the combination of missionary ardour with commercial enterprise which had led to the exploration of the Atlantic led also to the establishment of a Portuguese Empire.',
          lang: 'en',
          cite: { source: 'britannica-1911-portugal', loc: { section: 'Portugal', para: '82' } },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Portugal'
          }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q5',
          text: 'Other seaports and islands were conquered or colonized in rapid succession, and by 1540 Portugal had acquired a line of scattered maritime possessions extending along the coasts of Brazil, East and West Africa, Malabar, Ceylon, Persia, Indo-China and the Malay Archipelago.',
          lang: 'en',
          cite: { source: 'britannica-1911-portugal', loc: { section: 'Portugal', para: '85' } },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Portugal'
          }
        },
        {
          id: 'q6',
          text: 'The empire in the East was rarely solvent.',
          lang: 'en',
          cite: { source: 'britannica-1911-portugal', loc: { section: 'Portugal', para: '89' } },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Portugal'
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
            value: { d: '1498-05-20' },
            cites: [
              {
                source: 'britannica-1911-gama-vasco-da',
                loc: { section: 'Gama, Vasco da', para: '2' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q7',
        text: 'Thence, steering eastward, under the direction of a pilot obtained from Indian merchants met with at this port, da Gama arrived at Calicut, on the Malabar coast, on the 20th May 1498, and set up, according to the custom of his country, a marble pillar as a mark of conquest and a proof of his discovery of India.',
        lang: 'en',
        cite: {
          source: 'britannica-1911-gama-vasco-da',
          loc: { section: 'Gama, Vasco da', para: '2' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-13',
          url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Gama,_Vasco_da'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1500' },
            cites: [
              { source: 'britannica-1911-portugal', loc: { section: 'Portugal', para: '82' } }
            ]
          }
        ]
      },
      quote: {
        id: 'q8',
        text: 'In prosecution of da Gama’s discoveries another fleet of thirteen ships was immediately sent out to India under Pedro Alvares Cabral, who, in sailing too far westward, by accident discovered Brazil, and on reaching his destination established a factory at Calicut.',
        lang: 'en',
        cite: {
          source: 'britannica-1911-gama-vasco-da',
          loc: { section: 'Gama, Vasco da', para: '2' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-13',
          url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Gama,_Vasco_da'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1507-09' },
            cites: [
              { source: 'britannica-1911-hormuz', loc: { section: 'Hormuz', para: '5' } }
            ]
          }
        ]
      },
      quote: {
        id: 'q9',
        text: 'In September 1507 the king of Hormuz, after for some time hearing of the terrible foe who was carrying fire and sword along the shores of Arabia, saw the squadron of Alphonso d’Albuquerque appear before his city, an appearance speedily followed by extravagant demands, by refusal of these from the ministers of the young king, and by deeds of matchless daring and cruelty on the part of the Portuguese, which speedily broke down resistance.',
        lang: 'en',
        cite: { source: 'britannica-1911-hormuz', loc: { section: 'Hormuz', para: '5' } },
        provenance: {
          via: 'web',
          at: '2026-10-13',
          url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Hormuz'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1510' },
            cites: [
              { source: 'britannica-1911-portugal', loc: { section: 'Portugal', para: '85' } }
            ]
          }
        ]
      },
      quote: {
        id: 'q10',
        text: 'In 1510 Albuquerque seized Goa, primarily as a naval base, and in so doing recognized the fact that his country was committed to a policy of territorial aggrandisement.',
        lang: 'en',
        cite: { source: 'britannica-1911-portugal', loc: { section: 'Portugal', para: '85' } },
        provenance: {
          via: 'web',
          at: '2026-10-13',
          url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Portugal'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1511' },
            cites: [
              { source: 'britannica-1911-portugal', loc: { section: 'Portugal', para: '82' } }
            ]
          }
        ]
      },
      quote: {
        id: 'q11',
        text: 'On the Asiatic mainland the first trading-stations were established by Cabral at Cochin and Calicut (1501); more important, however, were the conquest of Goa (1510) and Malacca (1511) by Albuquerque, and the acquisition of Diu (1535) by Martim Affonso de Sousa.',
        lang: 'en',
        cite: { source: 'britannica-1911-portugal', loc: { section: 'Portugal', para: '82' } },
        provenance: {
          via: 'web',
          at: '2026-10-13',
          url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Portugal'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1515' },
            cites: [
              { source: 'britannica-1911-portugal', loc: { section: 'Portugal', para: '82' } }
            ]
          },
          {
            value: { d: '1514' },
            cites: [
              { source: 'britannica-1911-hormuz', loc: { section: 'Hormuz', para: '5' } }
            ],
            heldBy: [
              {
                kind: 'organization',
                name: 'Encyclopædia Britannica, 11th edition (article on Hormuz)'
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q12',
        text: 'Hormuz, in the Persian Gulf, was seized by Alphonso d’Albuquerque (1515), who also entered into diplomatic relations with Persia.',
        lang: 'en',
        cite: { source: 'britannica-1911-portugal', loc: { section: 'Portugal', para: '82' } },
        provenance: {
          via: 'web',
          at: '2026-10-13',
          url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Portugal'
        }
      }
    }
  ],
  hero: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/2/2b/A_chegada_de_Vasco_da_Gama_a_Calicute_em_1498.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:A_chegada_de_Vasco_da_Gama_a_Calicute_em_1498.jpg',
    credit: { creator: 'Roque Gameiro' },
    license: { id: 'public-domain' }
  }
})
