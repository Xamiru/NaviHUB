import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'atlantic-slave-trade',
  names: [
    { text: 'Atlantic slave trade', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-13',
  type: 'economic',
  start: {
    alts: [
      {
        value: { d: '1502' },
        cites: [
          { source: 'britannica-1911-slavery', loc: { section: 'Slavery', para: '30' } }
        ]
      }
    ]
  },
  regions: ['global', 'subsaharan-africa', 'latin-america'],
  prominence: 2,
  polities: [
    {
      ref: 'polity:portuguese-empire',
      cites: [
        { source: 'britannica-1911-slavery', loc: { section: 'Slavery', para: '30' } }
      ]
    },
    {
      ref: 'polity:spanish-empire',
      cites: [
        { source: 'britannica-1911-slavery', loc: { section: 'Slavery', para: '32' } }
      ]
    },
    {
      ref: 'polity:kingdom-of-england',
      cites: [
        { source: 'britannica-1911-slavery', loc: { section: 'Slavery', para: '33' } }
      ]
    }
  ],
  participants: [
    {
      name: 'Sir John Hawkins',
      role: 'participant',
      cites: [
        { source: 'britannica-1911-slavery', loc: { section: 'Slavery', para: '33' } }
      ]
    },
    {
      name: 'Afonso, manikongo of Kongo',
      role: 'victim',
      cites: [
        {
          source: 'loc-angola-country-study-1989',
          loc: { section: 'Kongo Kingdom', para: '4' }
        }
      ]
    }
  ],
  related: [
    {
      ref: 'event:jamestown',
      rel: 'related',
      cites: [
        {
          source: 'nps-historic-jamestowne-history-and-culture',
          loc: { section: 'History & Culture', para: '6' }
        }
      ]
    },
    {
      ref: 'event:voyages-of-vasco-da-gama-and-the-portuguese-in-the-indian-ocean',
      rel: 'related'
    }
  ],
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'With the opening of European plantations in the New World during the 1500s, which suddenly expanded the demand for slaves in the Americas, trade in slaves soon overshadowed gold as the principal export of the area.',
          lang: 'en',
          cite: {
            source: 'loc-ghana-country-study-1994',
            loc: { section: 'Arrival of the Europeans', para: '4' }
          },
          provenance: { via: 'web', at: '2026-10-13', url: 'http://countrystudies.us/ghana/6.htm' }
        },
        {
          id: 'q2',
          text: 'Indeed, the west coast of Africa became the principal source of slaves for the New World.',
          lang: 'en',
          cite: {
            source: 'loc-ghana-country-study-1994',
            loc: { section: 'Arrival of the Europeans', para: '4' }
          },
          provenance: { via: 'web', at: '2026-10-13', url: 'http://countrystudies.us/ghana/6.htm' }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q3',
          text: 'To be sure, slavery and slave trading were already firmly entrenched in many African societies before their contact with Europe.',
          lang: 'en',
          cite: {
            source: 'loc-ghana-country-study-1994',
            loc: { section: 'Arrival of the Europeans', para: '8' }
          },
          provenance: { via: 'web', at: '2026-10-13', url: 'http://countrystudies.us/ghana/6.htm' }
        },
        {
          id: 'q4',
          text: 'During that time, Lisbon leased the right to establish trading posts to individuals or companies that sought to align themselves with the local chiefs and to exchange trade goods both for rights to conduct commerce and for slaves whom the chiefs could provide.',
          lang: 'en',
          cite: {
            source: 'loc-ghana-country-study-1994',
            loc: { section: 'Arrival of the Europeans', para: '5' }
          },
          provenance: { via: 'web', at: '2026-10-13', url: 'http://countrystudies.us/ghana/6.htm' }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q5',
          text: 'Over time, the Portuguese crown came to view Kongo primarily as a source of slaves.',
          lang: 'en',
          cite: {
            source: 'loc-angola-country-study-1989',
            loc: { section: 'Kongo Kingdom', para: '4' }
          },
          provenance: { via: 'web', at: '2026-10-13', url: 'http://countrystudies.us/angola/5.htm' }
        },
        {
          id: 'q6',
          text: 'Afonso\'s complaints to the Portuguese crown about the effects of the trade in his lands were largely ignored.',
          lang: 'en',
          cite: {
            source: 'loc-angola-country-study-1989',
            loc: { section: 'Kongo Kingdom', para: '4' }
          },
          provenance: { via: 'web', at: '2026-10-13', url: 'http://countrystudies.us/angola/5.htm' }
        },
        {
          id: 'q7',
          text: 'Much of the conflict that arose among European groups on the coast and among competing African kingdoms was the result of rivalry for control of this trade.',
          lang: 'en',
          cite: {
            source: 'loc-ghana-country-study-1994',
            loc: { section: 'Arrival of the Europeans', para: '4' }
          },
          provenance: { via: 'web', at: '2026-10-13', url: 'http://countrystudies.us/ghana/6.htm' }
        },
        {
          id: 'q8',
          text: 'Thus, out of every lot of 100 shipped from Africa 17 died in about 9 weeks, and not more than 50 lived to be effective labourers in the islands.',
          lang: 'en',
          cite: { source: 'britannica-1911-slavery', loc: { section: 'Slavery', para: '36' } },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Slavery'
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
            value: { d: '1471' },
            cites: [
              {
                source: 'loc-portugal-country-study-1993',
                loc: { section: 'Sea Route to India', para: '2' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q9',
        text: 'In 1471 Portuguese sailors reached Mina de Ouro on the Gold Coast (present-day Ghana) and explored Cape St. Catherine, two degrees south of the equator.',
        lang: 'en',
        cite: {
          source: 'loc-portugal-country-study-1993',
          loc: { section: 'Sea Route to India', para: '2' }
        },
        provenance: { via: 'web', at: '2026-10-13', url: 'http://countrystudies.us/portugal/23.htm' }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1482' },
            cites: [
              {
                source: 'loc-ghana-country-study-1994',
                loc: { section: 'Arrival of the Europeans', para: '3' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q10',
        text: 'The initial Portuguese interest in trading for gold, ivory, and pepper so increased that in 1482 the Portuguese built their first permanent trading post on the western coast of present-day Ghana.',
        lang: 'en',
        cite: {
          source: 'loc-ghana-country-study-1994',
          loc: { section: 'Arrival of the Europeans', para: '3' }
        },
        provenance: { via: 'web', at: '2026-10-13', url: 'http://countrystudies.us/ghana/6.htm' }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1517' },
            cites: [
              { source: 'britannica-1911-slavery', loc: { section: 'Slavery', para: '32' } }
            ]
          }
        ]
      },
      quote: {
        id: 'q11',
        text: '“The favourite sold his patent to some Genoese merchants for 25,000 ducats”; these merchants obtained the slaves from the Portuguese; and thus was first systematized the slave trade between Africa and America.',
        lang: 'en',
        cite: { source: 'britannica-1911-slavery', loc: { section: 'Slavery', para: '32' } },
        provenance: {
          via: 'web',
          at: '2026-10-13',
          url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Slavery'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1619' },
            cites: [
              {
                source: 'nps-historic-jamestowne-history-and-culture',
                loc: { section: 'History & Culture', para: '6' }
              },
              {
                source: 'britannica-1911-jamestown-virginia',
                loc: { section: 'Jamestown (Virginia)', para: '1' }
              }
            ],
            heldBy: [
              { kind: 'organization', name: 'National Park Service, Historic Jamestowne' }
            ]
          },
          {
            value: { d: '1620' },
            cites: [
              { source: 'britannica-1911-slavery', loc: { section: 'Slavery', para: '33' } }
            ],
            heldBy: [
              {
                kind: 'organization',
                name: 'Encyclopædia Britannica, 11th edition (article on Slavery)'
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q12',
        text: 'In 1619, onboard an English privateer ship, “20 and odd” Africans arrived and were traded to the English for “victuals,” or food stores.',
        lang: 'en',
        cite: {
          source: 'nps-historic-jamestowne-history-and-culture',
          loc: { section: 'History & Culture', para: '6' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-13',
          url: 'https://www.nps.gov/jame/learn/historyculture/index.htm'
        }
      }
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/6/69/2_views_of_the_Gold_Coast_of_Africa-_%22Prospect_of_the_Coast_from_Elmina_to_Mowri%22%2C_showing_slaves_being_loaded_on_ship_in_foreground%3B_%22Prospect_of_St._Georges_Castle_at_Elmina%22_LCCN2007677174.jpg/1280px-thumbnail.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:2_views_of_the_Gold_Coast_of_Africa-_%22Prospect_of_the_Coast_from_Elmina_to_Mowri%22,_showing_slaves_being_loaded_on_ship_in_foreground;_%22Prospect_of_St._Georges_Castle_at_Elmina%22_LCCN2007677174.jpg',
    credit: { institution: 'Library of Congress' },
    license: { id: 'public-domain' }
  }
})
