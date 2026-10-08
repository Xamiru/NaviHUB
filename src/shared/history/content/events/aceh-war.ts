import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'aceh-war',
  names: [
    { text: 'Aceh War', lang: 'en', role: 'primary' },
    { text: 'Perang Aceh', lang: 'id', role: 'native' },
    { text: 'Atjeh-oorlog', lang: 'nl', role: 'alternative' }
  ],
  researched: '2026-10-08',
  type: 'war',
  start: {
    alts: [
      {
        value: { d: '1873-03' },
        cites: [
          { source: 'britannica-1911-achin', loc: { section: 'ACHIN', para: '7' } }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1903' },
        cites: [
          {
            source: 'loc-indonesia-country-study-1993',
            loc: { section: 'Dutch Expansion in Sumatra', para: '3' }
          }
        ]
      }
    ]
  },
  regions: ['southeast-asia', 'europe'],
  prominence: 2,
  places: [
    {
      ref: 'place:banda-aceh',
      cites: [
        {
          source: 'loc-indonesia-country-study-1993',
          loc: { section: 'Dutch Expansion in Sumatra', para: '3' }
        }
      ]
    }
  ],
  related: [
    {
      ref: 'event:anglo-dutch-treaty-of-1824',
      rel: 'related',
      cites: [
        {
          source: 'loc-indonesia-country-study-1993',
          loc: { section: 'Dutch Expansion in Sumatra', para: '3' }
        },
        { source: 'britannica-1911-achin', loc: { section: 'ACHIN', para: '6' } }
      ]
    }
  ],
  polities: [
    { ref: 'polity:dutch-east-indies' }
  ],
  participants: [
    {
      name: 'General Köhler',
      role: 'commander',
      cites: [
        { source: 'britannica-1911-achin', loc: { section: 'ACHIN', para: '7' } }
      ]
    },
    {
      name: 'General van der Heyden',
      role: 'commander',
      cites: [
        { source: 'britannica-1911-achin', loc: { section: 'ACHIN', para: '7' } }
      ]
    },
    {
      name: 'Taku Umar',
      role: 'leader',
      cites: [
        { source: 'britannica-1911-achin', loc: { section: 'ACHIN', para: '7' } }
      ]
    },
    {
      name: 'Christiaan Snouck Hurgronje',
      role: 'participant',
      cites: [
        {
          source: 'loc-indonesia-country-study-1993',
          loc: { section: 'Dutch Expansion in Sumatra', para: '5' }
        }
      ]
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/f/f3/Atjeh-Oorlog%2C_Soldaten_met_mortieren%2C_1873%2C_KITLV_502731.tiff/lossy-page1-1280px-Atjeh-Oorlog%2C_Soldaten_met_mortieren%2C_1873%2C_KITLV_502731.tiff.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Atjeh-Oorlog,_Soldaten_met_mortieren,_1873,_KITLV_502731.tiff',
    credit: { institution: 'Leiden University Libraries, KITLV collection' },
    license: { id: 'cc-by', version: '4.0', url: 'https://creativecommons.org/licenses/by/4.0' }
  },
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'The Aceh War (1873-1903) was one of the longest and bloodiest in DutchIndonesian history.',
          lang: 'en',
          cite: {
            source: 'loc-indonesia-country-study-1993',
            loc: { section: 'Dutch Expansion in Sumatra', para: '3' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/indonesia/12.htm' }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q2',
          text: 'One provision of the Treaty of London was the independence of the north Sumatran state of Aceh.',
          lang: 'en',
          cite: {
            source: 'loc-indonesia-country-study-1993',
            loc: { section: 'Dutch Expansion in Sumatra', para: '3' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/indonesia/12.htm' }
        },
        {
          id: 'q3',
          text: 'But Aceh controlled a large portion of the pepper trade and alarmed the Dutch by actively seeking relations with other Western countries.',
          lang: 'en',
          cite: {
            source: 'loc-indonesia-country-study-1993',
            loc: { section: 'Dutch Expansion in Sumatra', para: '3' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/indonesia/12.htm' }
        },
        {
          id: 'q4',
          text: 'The Acehnese, the most rigorously fundamentalist of Indonesian Muslims, also had close contacts with Mecca.',
          lang: 'en',
          cite: {
            source: 'loc-indonesia-country-study-1993',
            loc: { section: 'Dutch Expansion in Sumatra', para: '4' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/indonesia/12.htm' }
        }
      ]
    },
    {
      kind: 'causes',
      quotes: [
        {
          id: 'q5',
          text: 'Two years later, talks between the United States consul in Singapore and Acehnese representatives gave Batavia the pretext for opening hostilities.',
          lang: 'en',
          cite: {
            source: 'loc-indonesia-country-study-1993',
            loc: { section: 'Dutch Expansion in Sumatra', para: '3' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/indonesia/12.htm' }
        },
        {
          id: 'q6',
          text: 'Doubtless there was provocation, for the sultan of Achin had not kept to the understanding that he was to guarantee immunity from piracy to foreign traders; but the necessity for war was greatly doubted, even in Holland.',
          lang: 'en',
          cite: { source: 'britannica-1911-achin', loc: { section: 'ACHIN', para: '7' } },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Achin'
          }
        }
      ]
    },
    {
      kind: 'course',
      quotes: [
        {
          id: 'q7',
          text: 'The natives, however, maintained themselves in the interior, inaccessible to the Dutch troops, and carried on a guerilla warfare.',
          lang: 'en',
          cite: { source: 'britannica-1911-achin', loc: { section: 'ACHIN', para: '7' } },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Achin'
          }
        },
        {
          id: 'q8',
          text: 'General van der Heyden appeared to have subdued them in 1878-81, but they broke out again in 1896 under the traitor Taku Umar, who had been in alliance with the Dutch.',
          lang: 'en',
          cite: { source: 'britannica-1911-achin', loc: { section: 'ACHIN', para: '7' } },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Achin'
          }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q9',
          text: 'The principal architect of colonial Islamic policy was Christiaan Snouck Hurgronje, a scholar of Arabic who had gone to Mecca to study Indonesian pilgrims and served as adviser to the Netherlands Indies government from 1891 to 1904.',
          lang: 'en',
          cite: {
            source: 'loc-indonesia-country-study-1993',
            loc: { section: 'Dutch Expansion in Sumatra', para: '5' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/indonesia/12.htm' }
        },
        {
          id: 'q10',
          text: 'Local Acehnese chiefs, the uleebalang, were given much the same role as the priyayi on Java.',
          lang: 'en',
          cite: {
            source: 'loc-indonesia-country-study-1993',
            loc: { section: 'Dutch Expansion in Sumatra', para: '5' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/indonesia/12.htm' }
        }
      ]
    }
  ],
  course: [
    {
      date: {
        alts: [
          {
            value: { d: '1871-11-02' },
            cites: [
              { source: 'britannica-1911-achin', loc: { section: 'ACHIN', para: '7' } }
            ]
          }
        ]
      },
      quote: {
        id: 'q11',
        text: 'A new Anglo-Dutch treaty, signed in 1871, gave the Dutch a free hand in Sumatra concerning Aceh.',
        lang: 'en',
        cite: {
          source: 'loc-indonesia-country-study-1993',
          loc: { section: 'Dutch Expansion in Sumatra', para: '3' }
        },
        provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/indonesia/12.htm' }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1873-03' },
            cites: [
              { source: 'britannica-1911-achin', loc: { section: 'ACHIN', para: '7' } }
            ]
          }
        ]
      },
      quote: {
        id: 'q12',
        text: 'This reservation was formally abandoned by the British government in a convention signed at the Hague on the 2nd of November 1871; and in March 1873 the government of Batavia declared war upon Achin.',
        lang: 'en',
        cite: { source: 'britannica-1911-achin', loc: { section: 'ACHIN', para: '7' } },
        provenance: {
          via: 'web',
          at: '2026-10-08',
          url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Achin'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1873-04' },
            cites: [
              { source: 'britannica-1911-achin', loc: { section: 'ACHIN', para: '7' } }
            ]
          }
        ]
      },
      quote: {
        id: 'q13',
        text: 'A Dutch force landed at Achin in April 1873, and attacked the palace.',
        lang: 'en',
        cite: { source: 'britannica-1911-achin', loc: { section: 'ACHIN', para: '7' } },
        provenance: {
          via: 'web',
          at: '2026-10-08',
          url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Achin'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1874-01' },
            cites: [
              { source: 'britannica-1911-achin', loc: { section: 'ACHIN', para: '7' } }
            ]
          }
        ]
      },
      quote: {
        id: 'q14',
        text: 'The approach of the south-west monsoon precluded the immediate renewal of the attempt; but hostilities were resumed, and Achin fell in January 1874.',
        lang: 'en',
        cite: { source: 'britannica-1911-achin', loc: { section: 'ACHIN', para: '7' } },
        provenance: {
          via: 'web',
          at: '2026-10-08',
          url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Achin'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1901' },
            cites: [
              { source: 'britannica-1911-achin', loc: { section: 'ACHIN', para: '7' } }
            ]
          }
        ]
      },
      quote: {
        id: 'q15',
        text: 'General van Hentsz carried on a successful campaign in 1898 seq., but in 1901, the principal Achinese chiefs on the north coast having surrendered, the pretender-sultan fled to the Gajoes, a neighbouring inland people.',
        lang: 'en',
        cite: { source: 'britannica-1911-achin', loc: { section: 'ACHIN', para: '7' } },
        provenance: {
          via: 'web',
          at: '2026-10-08',
          url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Achin'
        }
      }
    }
  ],
  furtherReading: [
    { source: 'van-t-veer-1969-de-atjeh-oorlog', perspective: 'european' }
  ]
})
