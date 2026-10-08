import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'reform-war',
  names: [
    { text: 'Reform War', lang: 'en', role: 'primary' },
    { text: 'Guerra de Reforma', lang: 'es', role: 'native' },
    {
      text: 'War of the Reform',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'loc-mexico-country-study-1996',
          loc: { section: 'Civil War and the French Intervention', para: '1' }
        }
      ]
    }
  ],
  researched: '2026-10-08',
  type: 'war',
  start: {
    alts: [
      {
        value: { d: '1858' },
        cites: [
          {
            source: 'loc-mexico-country-study-1996',
            loc: { section: 'Civil War and the French Intervention', para: '1' }
          }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1861-01-01' },
        cites: [
          {
            source: 'loc-mexico-country-study-1996',
            loc: { section: 'Civil War and the French Intervention', para: '1' }
          }
        ]
      }
    ]
  },
  regions: ['latin-america'],
  prominence: 2,
  places: [
    {
      ref: 'place:mexico-city',
      cites: [
        {
          source: 'loc-mexico-country-study-1996',
          loc: { section: 'Civil War and the French Intervention', para: '1' }
        }
      ]
    },
    {
      ref: 'place:veracruz',
      cites: [
        {
          source: 'loc-mexico-country-study-1996',
          loc: { section: 'Civil War and the French Intervention', para: '1' }
        }
      ]
    }
  ],
  polities: [
    { ref: 'polity:mexico' }
  ],
  sides: [
    {
      key: 'liberals',
      name: 'the liberals',
      cites: [
        {
          source: 'loc-mexico-country-study-1996',
          loc: { section: 'Civil War and the French Intervention', para: '1' }
        }
      ]
    },
    {
      key: 'conservatives',
      name: 'the conservatives',
      cites: [
        {
          source: 'loc-mexico-country-study-1996',
          loc: { section: 'Civil War and the French Intervention', para: '1' }
        }
      ]
    }
  ],
  participants: [
    {
      ref: 'person:benito-juarez',
      role: 'leader',
      side: 'liberals',
      cites: [
        {
          source: 'loc-mexico-country-study-1996',
          loc: { section: 'Civil War and the French Intervention', para: '1' }
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
          text: 'The Mexican reform movement was inspired by the liberal political philosophies of European intellectuals, such as Jean-Jacques Rousseau, John Stuart Mill, and Pierre Joseph Proudhon.',
          lang: 'en',
          cite: {
            source: 'loc-mexico-country-study-1996',
            loc: { section: 'The Revolution of Ayutla and the Reform Laws', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/mexico/20.htm' }
        },
        {
          id: 'q2',
          text: 'In August 1855, in response to growing opposition, Santa Anna resigned for the last time.',
          lang: 'en',
          cite: {
            source: 'loc-mexico-country-study-1996',
            loc: { section: 'The Revolution of Ayutla and the Reform Laws', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/mexico/20.htm' }
        },
        {
          id: 'q3',
          text: 'Several laws, known collectively as the Reform Laws, abolished the fueros , curtailed ecclesiastical property holdings, introduced a civil registry, and prohibited the church from charging exorbitant fees for administering the sacraments.',
          lang: 'en',
          cite: {
            source: 'loc-mexico-country-study-1996',
            loc: { section: 'The Revolution of Ayutla and the Reform Laws', para: '2' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/mexico/20.htm' }
        },
        {
          id: 'q4',
          text: 'The new constitution was derived from that of 1824, but it reflected a more liberal vision of society through its incorporation of the Reform Laws. It reaffirmed the abolition of slavery, secularized education, and guaranteed basic civil liberties for all Mexicans.',
          lang: 'en',
          cite: {
            source: 'loc-mexico-country-study-1996',
            loc: { section: 'The Revolution of Ayutla and the Reform Laws', para: '3' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/mexico/20.htm' }
        }
      ]
    },
    {
      kind: 'causes',
      quotes: [
        {
          id: 'q5',
          text: 'Both the Reform Laws and the constitution, however, divided the political classes and set the stage for a civil war.',
          lang: 'en',
          cite: {
            source: 'loc-mexico-country-study-1996',
            loc: { section: 'The Revolution of Ayutla and the Reform Laws', para: '3' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/mexico/20.htm' }
        }
      ]
    },
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q6',
          text: 'The civil war, commonly known as the War of the Reform, that engulfed Mexico between 1858 and 1861 brought to light the underlying conflicts that had been present in Mexican society since independence.',
          lang: 'en',
          cite: {
            source: 'loc-mexico-country-study-1996',
            loc: { section: 'Civil War and the French Intervention', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/mexico/21.htm' }
        },
        {
          id: 'q7',
          text: 'The conservative faction launched the Plan of Tacubaya and, with the support of the military and the clergy, dissolved congress and arrested Juárez. Juárez escaped and established a "government in exile" in Querétaro (the liberals later moved their capital to Veracruz).',
          lang: 'en',
          cite: {
            source: 'loc-mexico-country-study-1996',
            loc: { section: 'Civil War and the French Intervention', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/mexico/21.htm' }
        },
        {
          id: 'q8',
          text: 'The initial military advantage was held by the conservatives, who were better armed and had plentiful supplies, but by 1860 the situation was reversed.',
          lang: 'en',
          cite: {
            source: 'loc-mexico-country-study-1996',
            loc: { section: 'Civil War and the French Intervention', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/mexico/21.htm' }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q9',
          text: 'Trade was stagnant, and foreign creditors were demanding full repayment of Mexican debts.',
          lang: 'en',
          cite: {
            source: 'loc-mexico-country-study-1996',
            loc: { section: 'Civil War and the French Intervention', para: '2' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/mexico/21.htm' }
        },
        {
          id: 'q10',
          text: 'Juárez proceeded to declare a moratorium on all foreign debt repayments.',
          lang: 'en',
          cite: {
            source: 'loc-mexico-country-study-1996',
            loc: { section: 'Civil War and the French Intervention', para: '2' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/mexico/21.htm' }
        }
      ]
    }
  ],
  course: [
    {
      date: {
        alts: [
          {
            value: { d: '1860-12' },
            cites: [
              {
                source: 'loc-mexico-country-study-1996',
                loc: { section: 'Civil War and the French Intervention', para: '1' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q11',
        text: 'The final battle took place just before Christmas 1860.',
        lang: 'en',
        cite: {
          source: 'loc-mexico-country-study-1996',
          loc: { section: 'Civil War and the French Intervention', para: '1' }
        },
        provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/mexico/21.htm' }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1861-01-01' },
            cites: [
              {
                source: 'loc-mexico-country-study-1996',
                loc: { section: 'Civil War and the French Intervention', para: '1' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q12',
        text: 'The victorious liberal army entered Mexico City on January 1, 1861.',
        lang: 'en',
        cite: {
          source: 'loc-mexico-country-study-1996',
          loc: { section: 'Civil War and the French Intervention', para: '1' }
        },
        provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/mexico/21.htm' }
      }
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/2/25/Batalla_de_San_Miguel_Calpulalpan.jpg/1280px-Batalla_de_San_Miguel_Calpulalpan.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Batalla_de_San_Miguel_Calpulalpan.jpg',
    credit: { institution: 'University of Texas Libraries', creator: 'Casimiro Castro' },
    license: { id: 'public-domain' }
  },
  furtherReading: [
    { source: 'reyes-heroles-1982-el-liberalismo-mexicano', perspective: 'latin-american' }
  ]
})
