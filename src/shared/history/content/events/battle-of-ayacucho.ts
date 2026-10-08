import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'battle-of-ayacucho',
  names: [
    { text: 'Battle of Ayacucho', lang: 'en', role: 'primary' },
    { text: 'Batalla de Ayacucho', lang: 'es', role: 'native' }
  ],
  researched: '2026-10-08',
  type: 'battle',
  start: {
    alts: [
      {
        value: { d: '1824-12-09' },
        cites: [
          {
            source: 'loc-peru-country-study-1992',
            loc: { section: 'INDEPENDENCE IMPOSED FROM WITHOUT', para: '6' }
          }
        ]
      }
    ]
  },
  regions: ['latin-america'],
  prominence: 1,
  places: [
    {
      ref: 'place:ayacucho',
      cites: [
        {
          source: 'loc-peru-country-study-1992',
          loc: { section: 'INDEPENDENCE IMPOSED FROM WITHOUT', para: '6' }
        }
      ]
    }
  ],
  polities: [
    { ref: 'polity:gran-colombia' },
    { ref: 'polity:kingdom-of-spain' }
  ],
  participants: [
    {
      ref: 'person:antonio-jose-de-sucre',
      role: 'commander',
      cites: [
        {
          source: 'loc-peru-country-study-1992',
          loc: { section: 'INDEPENDENCE IMPOSED FROM WITHOUT', para: '6' }
        }
      ]
    },
    {
      ref: 'person:simon-bolivar',
      role: 'leader',
      cites: [
        {
          source: 'loc-peru-country-study-1992',
          loc: { section: 'INDEPENDENCE IMPOSED FROM WITHOUT', para: '6' }
        }
      ]
    },
    {
      ref: 'person:jose-de-san-martin',
      role: 'participant',
      cites: [
        {
          source: 'loc-peru-country-study-1992',
          loc: { section: 'INDEPENDENCE IMPOSED FROM WITHOUT', para: '6' }
        }
      ]
    },
    {
      name: 'Pedro Antonio de Olañeta',
      role: 'commander',
      cites: [
        {
          source: 'loc-bolivia-country-study-1989',
          loc: { section: 'INDEPENDENCE FROM SPAIN, 1809-39', para: '6' }
        }
      ]
    }
  ],
  sections: [
    {
      kind: 'background',
      quotes: [
        {
          id: 'q1',
          text: 'Thus, when independence finally did come in 1824, it was largely a foreign imposition rather than a truly popular, indigenous, and nationalist movement.',
          lang: 'en',
          cite: {
            source: 'loc-peru-country-study-1992',
            loc: { section: 'INDEPENDENCE IMPOSED FROM WITHOUT', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/peru/11.htm' }
        },
        {
          id: 'q2',
          text: 'As historian David P. Werlich has aptly put it, "Peru\'s role in the drama of Latin American independence was largely that of an interested spectator until the final act."',
          lang: 'en',
          cite: {
            source: 'loc-peru-country-study-1992',
            loc: { section: 'INDEPENDENCE IMPOSED FROM WITHOUT', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/peru/11.htm' }
        }
      ]
    },
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q3',
          text: 'But it remained for his trusted lieutenant, thirty-one-year-old General Antonio José de Sucre Alcalá, to complete the task of Peruvian independence by defeating royalist forces at the hacienda of Ayacucho near Huamanga (a city later renamed Ayacucho) on December 9, 1824.',
          lang: 'en',
          cite: {
            source: 'loc-peru-country-study-1992',
            loc: { section: 'INDEPENDENCE IMPOSED FROM WITHOUT', para: '6' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/peru/11.htm' }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q4',
          text: 'This battle in the remote southern highlands effectively ended the long era of Spanish colonial rule in South America.',
          lang: 'en',
          cite: {
            source: 'loc-peru-country-study-1992',
            loc: { section: 'INDEPENDENCE IMPOSED FROM WITHOUT', para: '6' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/peru/11.htm' }
        },
        {
          id: 'q5',
          text: 'Olañeta did not relinquish his command even after the Peruvian royalists included him and his forces in the capitulation agreement following their defeat in the Battle of Ayacucho in 1824, the final battle of the wars of independence in Latin America.',
          lang: 'en',
          cite: {
            source: 'loc-bolivia-country-study-1989',
            loc: { section: 'INDEPENDENCE FROM SPAIN, 1809-39', para: '6' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/bolivia/8.htm' }
        },
        {
          id: 'q6',
          text: 'Independence did little to alter the fundamental structures of inequality and underdevelopment based on colonialism and Andean neofeudalism.',
          lang: 'en',
          cite: {
            source: 'loc-peru-country-study-1992',
            loc: { section: 'INDEPENDENCE IMPOSED FROM WITHOUT', para: '8' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/peru/11.htm' }
        }
      ]
    }
  ],
  course: [
    {
      date: {
        alts: [
          {
            value: { d: '1821-07-28' },
            cites: [
              {
                source: 'loc-peru-country-study-1992',
                loc: { section: 'INDEPENDENCE IMPOSED FROM WITHOUT', para: '5' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q7',
        text: 'Shortly thereafter, on July 28, 1821, San Martín proclaimed Peru independent and then was named protector by an assembly of notables.',
        lang: 'en',
        cite: {
          source: 'loc-peru-country-study-1992',
          loc: { section: 'INDEPENDENCE IMPOSED FROM WITHOUT', para: '5' }
        },
        provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/peru/11.htm' }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1822' },
            cites: [
              {
                source: 'loc-peru-country-study-1992',
                loc: { section: 'INDEPENDENCE IMPOSED FROM WITHOUT', para: '6' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q8',
        text: 'The two liberators met in a historic meeting in Guayaquil in mid-1822 to arrange the terms of a joint effort to complete the liberation of Peru.',
        lang: 'en',
        cite: {
          source: 'loc-peru-country-study-1992',
          loc: { section: 'INDEPENDENCE IMPOSED FROM WITHOUT', para: '6' }
        },
        provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/peru/11.htm' }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1824-08' },
            cites: [
              {
                source: 'loc-peru-country-study-1992',
                loc: { section: 'INDEPENDENCE IMPOSED FROM WITHOUT', para: '6' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q9',
        text: 'With significant help from San Martín\'s forces, Bolívar then proceeded to invade Peru, where he won the Battle of Junín in August 1824.',
        lang: 'en',
        cite: {
          source: 'loc-peru-country-study-1992',
          loc: { section: 'INDEPENDENCE IMPOSED FROM WITHOUT', para: '6' }
        },
        provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/peru/11.htm' }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1825-04-01' },
            cites: [
              {
                source: 'loc-bolivia-country-study-1989',
                loc: { section: 'INDEPENDENCE FROM SPAIN, 1809-39', para: '6' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q10',
        text: 'Olañeta continued a quixotic war until Sucre\'s forces defeated his forces, and he was killed by his own men on April 1, 1825, in a battle that effectively ended Spanish rule in Upper Peru.',
        lang: 'en',
        cite: {
          source: 'loc-bolivia-country-study-1989',
          loc: { section: 'INDEPENDENCE FROM SPAIN, 1809-39', para: '6' }
        },
        provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/bolivia/8.htm' }
      }
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/d/df/Batalla_de_Ayacucho_by_Mart%C3%ADn_Tovar_y_Tovar_%281827_-_1902%29.jpg/1280px-Batalla_de_Ayacucho_by_Mart%C3%ADn_Tovar_y_Tovar_%281827_-_1902%29.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Batalla_de_Ayacucho_by_Mart%C3%ADn_Tovar_y_Tovar_(1827_-_1902).jpg',
    credit: { creator: 'Martín Tovar y Tovar' },
    license: { id: 'public-domain' }
  },
  furtherReading: [
    { source: 'bonilla-1972-la-independencia-en-el-peru', perspective: 'latin-american' },
    {
      source: 'montoya-2002-la-independencia-del-peru-y-el-fantasma-de-la-revolucion',
      perspective: 'latin-american'
    }
  ]
})
