import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'introduction-of-the-euro',
  names: [
    { text: 'Introduction of the euro', lang: 'en', role: 'primary' },
    {
      text: 'Euro cash changeover',
      lang: 'en',
      role: 'alternative',
      cites: [
        { source: 'ecb-our-money', loc: { section: 'Our money', para: '1' } }
      ]
    }
  ],
  researched: '2026-10-12',
  type: 'economic',
  start: {
    alts: [
      {
        value: { d: '2002-01-01' },
        cites: [
          { source: 'ecb-our-money', loc: { section: 'Our money', para: '1' } },
          {
            source: 'european-union-history-of-the-european-union-2000-09',
            loc: { section: 'History of the European Union 2000-09', para: '6' }
          }
        ]
      }
    ]
  },
  regions: ['europe'],
  prominence: 2,
  participants: [
    {
      name: 'Jacques Delors',
      role: 'negotiator',
      cites: [
        {
          source: 'ecb-economic-and-monetary-union-emu',
          loc: { section: 'Economic and Monetary Union (EMU)', para: '1' }
        }
      ]
    }
  ],
  related: [
    {
      ref: 'event:maastricht-treaty',
      rel: 'caused-by',
      cites: [
        {
          source: 'ecb-economic-and-monetary-union-emu',
          loc: { section: 'Economic and Monetary Union (EMU)', para: '35' }
        }
      ]
    },
    {
      ref: 'event:2004-enlargement-of-the-european-union',
      rel: 'related',
      cites: [
        {
          source: 'european-union-history-of-the-european-union-2000-09',
          loc: { section: 'History of the European Union 2000-09', para: '11' }
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
          text: 'Euro notes and coins become the legal currency in 12 EU countries (Greece joined the euro zone in 2001 and more follow after 2002).',
          lang: 'en',
          cite: {
            source: 'european-union-history-of-the-european-union-2000-09',
            loc: { section: 'History of the European Union 2000-09', para: '7' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-12',
            url: 'https://european-union.europa.eu/principles-countries-history/history-eu/2000-09_en'
          }
        },
        {
          id: 'q2',
          text: 'The euro was launched on 1 January 1999, when it became the currency of more than 300 million people in Europe.',
          lang: 'en',
          cite: { source: 'ecb-our-money', loc: { section: 'Our money', para: '1' } },
          provenance: {
            via: 'web',
            at: '2026-10-12',
            url: 'https://www.ecb.europa.eu/euro/intro/html/index.en.html'
          }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q3',
          text: 'In June 1988 the European Council confirmed the objective of the progressive realisation of Economic and Monetary Union (EMU).',
          lang: 'en',
          cite: {
            source: 'ecb-economic-and-monetary-union-emu',
            loc: { section: 'Economic and Monetary Union (EMU)', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-12',
            url: 'https://www.ecb.europa.eu/ecb/history/emu/html/index.en.html'
          }
        },
        {
          id: 'q4',
          text: 'The resulting Delors Report proposed that economic and monetary union should be achieved in three discrete but evolutionary steps.',
          lang: 'en',
          cite: {
            source: 'ecb-economic-and-monetary-union-emu',
            loc: { section: 'Economic and Monetary Union (EMU)', para: '3' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-12',
            url: 'https://www.ecb.europa.eu/ecb/history/emu/html/index.en.html'
          }
        },
        {
          id: 'q5',
          text: 'The negotiations resulted in the Treaty on European Union which was agreed in December 1991 and signed in Maastricht on 7 February 1992.',
          lang: 'en',
          cite: {
            source: 'ecb-economic-and-monetary-union-emu',
            loc: { section: 'Economic and Monetary Union (EMU)', para: '35' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-12',
            url: 'https://www.ecb.europa.eu/ecb/history/emu/html/index.en.html'
          }
        }
      ]
    },
    {
      kind: 'aftermath',
      quotes: [
        {
          id: 'q6',
          text: 'Printing, minting and distributing them is a major logistical operation.',
          lang: 'en',
          cite: {
            source: 'european-union-history-of-the-european-union-2000-09',
            loc: { section: 'History of the European Union 2000-09', para: '7' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-12',
            url: 'https://european-union.europa.eu/principles-countries-history/history-eu/2000-09_en'
          }
        },
        {
          id: 'q7',
          text: 'Coins have one standard side, while the other carries a national emblem.',
          lang: 'en',
          cite: {
            source: 'european-union-history-of-the-european-union-2000-09',
            loc: { section: 'History of the European Union 2000-09', para: '7' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-12',
            url: 'https://european-union.europa.eu/principles-countries-history/history-eu/2000-09_en'
          }
        },
        {
          id: 'q8',
          text: 'Today, euro banknotes and coins are legal tender in 21 of the 27 Member States of the European Union, including the overseas departments, territories and islands which are either part of, or associated with, euro area countries.',
          lang: 'en',
          cite: { source: 'ecb-our-money', loc: { section: 'Our money', para: '2' } },
          provenance: {
            via: 'web',
            at: '2026-10-12',
            url: 'https://www.ecb.europa.eu/euro/intro/html/index.en.html'
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
            value: { d: '1989-06' },
            cites: [
              {
                source: 'ecb-economic-and-monetary-union-emu',
                loc: { section: 'Economic and Monetary Union (EMU)', para: '29' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q9',
        text: 'On the basis of the Delors Report, the European Council decided in June 1989 that the first stage of economic and monetary union should begin on 1 July 1990.',
        lang: 'en',
        cite: {
          source: 'ecb-economic-and-monetary-union-emu',
          loc: { section: 'Economic and Monetary Union (EMU)', para: '29' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-12',
          url: 'https://www.ecb.europa.eu/ecb/history/emu/html/index.en.html'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1995-12' },
            cites: [
              {
                source: 'ecb-economic-and-monetary-union-emu',
                loc: { section: 'Economic and Monetary Union (EMU)', para: '46' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q10',
        text: 'In December 1995 the European Council agreed to name the European currency unit to be introduced at the start of Stage Three, the ‘euro\', and confirmed that Stage Three of EMU would start on 1 January 1999.',
        lang: 'en',
        cite: {
          source: 'ecb-economic-and-monetary-union-emu',
          loc: { section: 'Economic and Monetary Union (EMU)', para: '46' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-12',
          url: 'https://www.ecb.europa.eu/ecb/history/emu/html/index.en.html'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1998-05-02' },
            cites: [
              {
                source: 'ecb-economic-and-monetary-union-emu',
                loc: { section: 'Economic and Monetary Union (EMU)', para: '54' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q11',
        text: 'On 2 May 1998 the Council of the European Union – in the composition of Heads of State or Government – unanimously decided that 11 Member States had fulfilled the conditions necessary for the participation in the third stage of EMU and the adoption of the single currency on 1 January 1999.',
        lang: 'en',
        cite: {
          source: 'ecb-economic-and-monetary-union-emu',
          loc: { section: 'Economic and Monetary Union (EMU)', para: '54' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-12',
          url: 'https://www.ecb.europa.eu/ecb/history/emu/html/index.en.html'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1998-05-25' },
            cites: [
              {
                source: 'ecb-economic-and-monetary-union-emu',
                loc: { section: 'Economic and Monetary Union (EMU)', para: '58' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q12',
        text: 'On 25 May 1998 the governments of the 11 participating Member States appointed the President, the Vice-President and the four other members of the Executive Board of the ECB.',
        lang: 'en',
        cite: {
          source: 'ecb-economic-and-monetary-union-emu',
          loc: { section: 'Economic and Monetary Union (EMU)', para: '58' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-12',
          url: 'https://www.ecb.europa.eu/ecb/history/emu/html/index.en.html'
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
                source: 'ecb-economic-and-monetary-union-emu',
                loc: { section: 'Economic and Monetary Union (EMU)', para: '63' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q13',
        text: 'On 1 January 1999 the third and final stage of EMU commenced with the irrevocable fixing of the exchange rates of the currencies of the 11 Member States initially participating in Monetary Union and with the conduct of a single monetary policy under the responsibility of the ECB.',
        lang: 'en',
        cite: {
          source: 'ecb-economic-and-monetary-union-emu',
          loc: { section: 'Economic and Monetary Union (EMU)', para: '63' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-12',
          url: 'https://www.ecb.europa.eu/ecb/history/emu/html/index.en.html'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '2001-01-01' },
            cites: [
              {
                source: 'ecb-economic-and-monetary-union-emu',
                loc: { section: 'Economic and Monetary Union (EMU)', para: '64' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q14',
        text: 'The number of participating Member States increased to 12 on 1 January 2001, when Greece entered the third stage of EMU.',
        lang: 'en',
        cite: {
          source: 'ecb-economic-and-monetary-union-emu',
          loc: { section: 'Economic and Monetary Union (EMU)', para: '64' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-12',
          url: 'https://www.ecb.europa.eu/ecb/history/emu/html/index.en.html'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '2002-01-01' },
            cites: [
              { source: 'ecb-our-money', loc: { section: 'Our money', para: '1' } }
            ]
          }
        ]
      },
      quote: {
        id: 'q15',
        text: 'Euro cash was not introduced until 1 January 2002, when it replaced, at fixed conversion rates, the banknotes and coins of the national currencies like the Belgian franc and the Deutsche Mark.',
        lang: 'en',
        cite: { source: 'ecb-our-money', loc: { section: 'Our money', para: '1' } },
        provenance: {
          via: 'web',
          at: '2026-10-12',
          url: 'https://www.ecb.europa.eu/euro/intro/html/index.en.html'
        }
      }
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/6/65/Euro_coins_and_banknotes.jpg/1280px-Euro_coins_and_banknotes.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Euro_coins_and_banknotes.jpg',
    credit: { creator: 'Avij' },
    license: { id: 'public-domain' }
  },
  places: [
    {
      ref: 'place:maastricht',
      cites: [
        {
          source: 'ecb-economic-and-monetary-union-emu',
          loc: { section: 'Economic and Monetary Union (EMU)', para: '35' }
        }
      ]
    }
  ]
})
