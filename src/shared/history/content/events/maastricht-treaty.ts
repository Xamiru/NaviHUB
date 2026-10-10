import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'maastricht-treaty',
  names: [
    { text: 'Maastricht Treaty', lang: 'en', role: 'primary' },
    { text: 'Verdrag van Maastricht', lang: 'nl', role: 'native' },
    {
      text: 'Treaty on European Union',
      lang: 'en',
      role: 'official',
      cites: [
        {
          source: 'european-union-history-of-the-european-union-1990-99',
          loc: { section: 'History of the European Union 1990-99', para: '5' }
        }
      ]
    }
  ],
  researched: '2026-10-10',
  type: 'treaty',
  start: {
    alts: [
      {
        value: { d: '1992-02-07' },
        cites: [
          {
            source: 'european-union-history-of-the-european-union-1990-99',
            loc: { section: 'History of the European Union 1990-99', para: '4' }
          },
          {
            source: 'eur-lex-summary-treaty-of-maastricht-on-european-union',
            loc: { section: 'Treaty of Maastricht on European Union', para: '77' }
          }
        ]
      }
    ]
  },
  regions: ['europe'],
  prominence: 2,
  places: [
    {
      ref: 'place:maastricht',
      cites: [
        {
          source: 'european-union-history-of-the-european-union-1990-99',
          loc: { section: 'History of the European Union 1990-99', para: '5' }
        }
      ]
    }
  ],
  polities: [
    { ref: 'polity:federal-republic-of-germany' },
    { ref: 'polity:united-kingdom' }
  ],
  participants: [
    {
      ref: 'person:helmut-kohl',
      role: 'negotiator',
      cites: [
        {
          source: 'bundeskanzler-de-helmut-kohl-1982-1998',
          loc: { section: 'Helmut Kohl’s era (1982–98)', para: '23' }
        }
      ]
    }
  ],
  related: [
    {
      ref: 'event:german-reunification',
      rel: 'preceded-by',
      cites: [
        {
          source: 'bundeskanzler-de-helmut-kohl-1982-1998',
          loc: { section: 'Helmut Kohl’s era (1982–98)', para: '15' }
        }
      ]
    },
    {
      ref: 'event:treaty-of-rome',
      rel: 'preceded-by',
      cites: [
        {
          source: 'eur-lex-summary-treaty-of-maastricht-on-european-union',
          loc: { section: 'Treaty of Maastricht on European Union', para: '79' }
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
          text: 'Maastricht is an ambitious treaty. It creates the European Union.',
          lang: 'en',
          cite: {
            source: 'eur-lex-summary-treaty-of-maastricht-on-european-union',
            loc: { section: 'Treaty of Maastricht on European Union', para: '4' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'https://eur-lex.europa.eu/EN/legal-content/summary/treaty-of-maastricht-on-european-union.html'
          }
        },
        {
          id: 'q2',
          text: 'Officially known as the Treaty on European Union, the Maastricht Treaty marked the beginning of ‘a new stage in the process of creating an ever-closer union among the peoples of Europe’ by giving the previous communities a political dimension.',
          lang: 'en',
          cite: {
            source: 'eur-lex-summary-treaty-of-maastricht-on-european-union',
            loc: { section: 'Treaty of Maastricht on European Union', para: '79' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'https://eur-lex.europa.eu/EN/legal-content/summary/treaty-of-maastricht-on-european-union.html'
          }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q3',
          text: 'Although customs duties disappeared in 1968, trade is not flowing freely across the borders between member countries.',
          lang: 'en',
          cite: {
            source: 'european-union-history-of-the-european-union-1980-89',
            loc: { section: 'History of the European Union 1980-89', para: '13' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'https://european-union.europa.eu/principles-countries-history/history-eu/1980-89_en'
          }
        },
        {
          id: 'q4',
          text: 'The Single European Act launches a vast 6-year programme to sort these out and thus create a single market.',
          lang: 'en',
          cite: {
            source: 'european-union-history-of-the-european-union-1980-89',
            loc: { section: 'History of the European Union 1980-89', para: '13' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'https://european-union.europa.eu/principles-countries-history/history-eu/1980-89_en'
          }
        },
        {
          id: 'q5',
          text: 'But Kohl made it clear that in his eyes a unified Germany could only be firmly embedded within the European Union.',
          lang: 'en',
          cite: {
            source: 'bundeskanzler-de-helmut-kohl-1982-1998',
            loc: { section: 'Helmut Kohl’s era (1982–98)', para: '15' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'https://www.bundeskanzler.de/bk-en/federal-chancellery/federal-chancellors-since-1949/helmut-kohl'
          }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q6',
          text: 'The ‘European Union’ is officially created by the treaty, which enters into force on 1 November 1993.',
          lang: 'en',
          cite: {
            source: 'european-union-history-of-the-european-union-1990-99',
            loc: { section: 'History of the European Union 1990-99', para: '5' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'https://european-union.europa.eu/principles-countries-history/history-eu/1990-99_en'
          }
        },
        {
          id: 'q7',
          text: 'It is a major milestone, setting clear rules for the future single currency as well as for foreign and security policy and closer cooperation in justice and home affairs.',
          lang: 'en',
          cite: {
            source: 'european-union-history-of-the-european-union-1990-99',
            loc: { section: 'History of the European Union 1990-99', para: '5' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'https://european-union.europa.eu/principles-countries-history/history-eu/1990-99_en'
          }
        },
        {
          id: 'q8',
          text: 'The euro is introduced in 11 countries for commercial and financial transactions only.',
          lang: 'en',
          cite: {
            source: 'european-union-history-of-the-european-union-1990-99',
            loc: { section: 'History of the European Union 1990-99', para: '19' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'https://european-union.europa.eu/principles-countries-history/history-eu/1990-99_en'
          }
        },
        {
          id: 'q9',
          text: 'Denmark, Sweden and the United Kingdom decide to stay out for the time being.',
          lang: 'en',
          cite: {
            source: 'european-union-history-of-the-european-union-1990-99',
            loc: { section: 'History of the European Union 1990-99', para: '19' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'https://european-union.europa.eu/principles-countries-history/history-eu/1990-99_en'
          }
        }
      ]
    },
    {
      kind: 'legacy',
      quotes: [
        {
          id: 'q10',
          text: 'In the 1990s Helmut Kohl worked hard to ensure the European Union expanded and deepened.',
          lang: 'en',
          cite: {
            source: 'bundeskanzler-de-helmut-kohl-1982-1998',
            loc: { section: 'Helmut Kohl’s era (1982–98)', para: '23' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'https://www.bundeskanzler.de/bk-en/federal-chancellery/federal-chancellors-since-1949/helmut-kohl'
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
            value: { d: '1992-02-07' },
            cites: [
              {
                source: 'european-union-history-of-the-european-union-1990-99',
                loc: { section: 'History of the European Union 1990-99', para: '4' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q11',
        text: 'The Treaty on European Union is signed in Maastricht in the Netherlands.',
        lang: 'en',
        cite: {
          source: 'european-union-history-of-the-european-union-1990-99',
          loc: { section: 'History of the European Union 1990-99', para: '5' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-10',
          url: 'https://european-union.europa.eu/principles-countries-history/history-eu/1990-99_en'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1993-01-01' },
            cites: [
              {
                source: 'european-union-history-of-the-european-union-1990-99',
                loc: { section: 'History of the European Union 1990-99', para: '7' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q13',
        text: 'The single market and its 4 freedoms are established – the free movement of people, goods, services and money.',
        lang: 'en',
        cite: {
          source: 'european-union-history-of-the-european-union-1990-99',
          loc: { section: 'History of the European Union 1990-99', para: '8' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-10',
          url: 'https://european-union.europa.eu/principles-countries-history/history-eu/1990-99_en'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1993-11-01' },
            cites: [
              {
                source: 'eur-lex-summary-treaty-of-maastricht-on-european-union',
                loc: { section: 'Treaty of Maastricht on European Union', para: '77' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q12',
        text: 'It was signed on 7 February 1992 and entered into force on 1 November 1993.',
        lang: 'en',
        cite: {
          source: 'eur-lex-summary-treaty-of-maastricht-on-european-union',
          loc: { section: 'Treaty of Maastricht on European Union', para: '77' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-10',
          url: 'https://eur-lex.europa.eu/EN/legal-content/summary/treaty-of-maastricht-on-european-union.html'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1995-01-01' },
            cites: [
              {
                source: 'european-union-history-of-the-european-union-1990-99',
                loc: { section: 'History of the European Union 1990-99', para: '11' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q14',
        text: 'Austria, Finland and Sweden join the EU.',
        lang: 'en',
        cite: {
          source: 'european-union-history-of-the-european-union-1990-99',
          loc: { section: 'History of the European Union 1990-99', para: '12' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-10',
          url: 'https://european-union.europa.eu/principles-countries-history/history-eu/1990-99_en'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1999-01-01' },
            cites: [
              {
                source: 'european-union-history-of-the-european-union-1990-99',
                loc: { section: 'History of the European Union 1990-99', para: '18' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q15',
        text: 'The first euro countries are Austria, Belgium, Finland, France, Germany, Ireland, Italy, Luxembourg, the Netherlands, Portugal and Spain.',
        lang: 'en',
        cite: {
          source: 'european-union-history-of-the-european-union-1990-99',
          loc: { section: 'History of the European Union 1990-99', para: '19' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-10',
          url: 'https://european-union.europa.eu/principles-countries-history/history-eu/1990-99_en'
        }
      }
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/b/b9/Stone_memorial_in_front_of_the_entry_to_the_Limburg_Province_government_building_in_Maastricht%2C_Netherlands%2C_commemorating_the_signing_of_the_Maastricht_Treaty_in_February_1992.jpg/1280px-thumbnail.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Stone_memorial_in_front_of_the_entry_to_the_Limburg_Province_government_building_in_Maastricht,_Netherlands,_commemorating_the_signing_of_the_Maastricht_Treaty_in_February_1992.jpg',
    credit: { creator: 'Dozura' },
    license: { id: 'cc-by-sa', version: '4.0', url: 'https://creativecommons.org/licenses/by-sa/4.0' }
  }
})
