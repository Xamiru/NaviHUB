import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'second-italo-ethiopian-war',
  names: [
    { text: 'Second Italo-Ethiopian War', lang: 'en', role: 'primary' },
    { text: 'Abessinienkrieg', lang: 'de', role: 'alternative' }
  ],
  researched: '2026-10-06',
  type: 'war',
  start: {
    alts: [
      {
        value: { d: '1935-10-03' },
        cites: [
          {
            source: 'loc-ethiopia-country-study-1991',
            loc: { section: 'Mussolini\'s Invasion and the Italian Occupation', para: '3' }
          },
          { source: 'lemo-chronik-1935', loc: { section: 'Chronik 1935', para: '177' } }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1936-05-05' },
        cites: [
          {
            source: 'loc-ethiopia-country-study-1991',
            loc: { section: 'Mussolini\'s Invasion and the Italian Occupation', para: '4' }
          },
          { source: 'lemo-chronik-1936', loc: { section: 'Chronik 1936', para: '69' } }
        ]
      }
    ]
  },
  regions: ['subsaharan-africa', 'europe'],
  prominence: 2,
  places: [
    {
      ref: 'place:addis-ababa',
      cites: [
        {
          source: 'loc-ethiopia-country-study-1991',
          loc: { section: 'Mussolini\'s Invasion and the Italian Occupation', para: '4' }
        }
      ]
    }
  ],
  participants: [
    {
      ref: 'person:benito-mussolini',
      role: 'leader',
      side: 'italy',
      cites: [
        {
          source: 'loc-ethiopia-country-study-1991',
          loc: { section: 'Mussolini\'s Invasion and the Italian Occupation', para: '1' }
        }
      ]
    },
    {
      ref: 'person:haile-selassie',
      role: 'head-of-state',
      side: 'ethiopia',
      cites: [
        {
          source: 'loc-ethiopia-country-study-1991',
          loc: { section: 'Mussolini\'s Invasion and the Italian Occupation', para: '4' }
        }
      ]
    },
    {
      name: 'Pietro Badoglio',
      role: 'commander',
      side: 'italy',
      cites: [
        {
          source: 'loc-ethiopia-country-study-1991',
          loc: { section: 'Mussolini\'s Invasion and the Italian Occupation', para: '6' }
        }
      ]
    },
    {
      name: 'Rodolfo Graziani',
      role: 'commander',
      side: 'italy',
      cites: [
        {
          source: 'loc-ethiopia-country-study-1991',
          loc: { section: 'Mussolini\'s Invasion and the Italian Occupation', para: '6' }
        }
      ]
    }
  ],
  sides: [
    {
      key: 'italy',
      name: 'Italy',
      cites: [
        {
          source: 'loc-ethiopia-country-study-1991',
          loc: { section: 'Mussolini\'s Invasion and the Italian Occupation', para: '3' }
        }
      ]
    },
    {
      key: 'ethiopia',
      name: 'Ethiopia',
      cites: [
        {
          source: 'loc-ethiopia-country-study-1991',
          loc: { section: 'Mussolini\'s Invasion and the Italian Occupation', para: '3' }
        }
      ]
    }
  ],
  figures: [
    {
      key: 'executed',
      side: 'ethiopia',
      value: {
        alts: [
          {
            value: { min: 30000 },
            cites: [
              {
                source: 'loc-ethiopia-country-study-1991',
                loc: { section: 'Mussolini\'s Invasion and the Italian Occupation', para: '7' }
              }
            ]
          }
        ]
      }
    }
  ],
  sections: [
    {
      kind: 'causes',
      quotes: [
        {
          id: 'q1',
          text: 'Nonetheless, it became clear that Italy wished to expand and link its holdings in the Horn of Africa. Moreover, the international climate of the mid-1930s provided Italy with the expectation that aggression could be undertaken with impunity. Determined to provoke a casus belli, the Mussolini regime began deliberately exploiting the minor provocations that arose in its relations with Ethiopia.',
          lang: 'en',
          cite: {
            source: 'loc-ethiopia-country-study-1991',
            loc: { section: 'Mussolini\'s Invasion and the Italian Occupation', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/ethiopia/19.htm' }
        }
      ]
    },
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q2',
          text: 'On October 3, 1935, Italy attacked Ethiopia from Eritrea and Italian Somaliland without a declaration of war.',
          lang: 'en',
          cite: {
            source: 'loc-ethiopia-country-study-1991',
            loc: { section: 'Mussolini\'s Invasion and the Italian Occupation', para: '3' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/ethiopia/19.htm' }
        },
        {
          id: 'q3',
          text: 'In a war that lasted seven months, Ethiopia was outmatched by Italy in armaments--a situation exacerbated by the fact that a League of Nations arms embargo was not enforced against Italy.',
          lang: 'en',
          cite: {
            source: 'loc-ethiopia-country-study-1991',
            loc: { section: 'Mussolini\'s Invasion and the Italian Occupation', para: '4' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/ethiopia/19.htm' }
        },
        {
          id: 'q4',
          text: 'Moreover, the Italians made widespread use of chemical weapons and air power.',
          lang: 'en',
          cite: {
            source: 'loc-ethiopia-country-study-1991',
            loc: { section: 'Mussolini\'s Invasion and the Italian Occupation', para: '4' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/ethiopia/19.htm' }
        }
      ]
    },
    {
      kind: 'aftermath',
      quotes: [
        {
          id: 'q5',
          text: 'On June 30, Haile Selassie made a powerful speech before the League of Nations in Geneva in which he set forth two choices--support for collective security or international lawlessness.',
          lang: 'en',
          cite: {
            source: 'loc-ethiopia-country-study-1991',
            loc: { section: 'Mussolini\'s Invasion and the Italian Occupation', para: '5' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/ethiopia/19.htm' }
        },
        {
          id: 'q6',
          text: 'Britain and France, however, soon recognized Italy\'s control of Ethiopia. Among the major powers, the United States and the Soviet Union refused to do so.',
          lang: 'en',
          cite: {
            source: 'loc-ethiopia-country-study-1991',
            loc: { section: 'Mussolini\'s Invasion and the Italian Occupation', para: '5' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/ethiopia/19.htm' }
        },
        {
          id: 'q7',
          text: 'After a failed assassination attempt against Graziani on February 19, 1937, the colonial authorities executed 30,000 persons, including about half of the younger, educated Ethiopian population.',
          lang: 'en',
          cite: {
            source: 'loc-ethiopia-country-study-1991',
            loc: { section: 'Mussolini\'s Invasion and the Italian Occupation', para: '7' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/ethiopia/19.htm' }
        }
      ]
    }
  ],
  course: [
    {
      date: {
        alts: [
          {
            value: { d: '1934-12' },
            cites: [
              {
                source: 'loc-ethiopia-country-study-1991',
                loc: { section: 'Mussolini\'s Invasion and the Italian Occupation', para: '2' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q8',
        text: 'In December 1934, an incident took place at Welwel in the Ogaden, a site of wells used by Somali nomads regularly traversing the borders between Ethiopia and British Somaliland and Italian Somaliland.',
        lang: 'en',
        cite: {
          source: 'loc-ethiopia-country-study-1991',
          loc: { section: 'Mussolini\'s Invasion and the Italian Occupation', para: '2' }
        },
        provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/ethiopia/19.htm' }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1935-10-07' },
            cites: [
              {
                source: 'loc-ethiopia-country-study-1991',
                loc: { section: 'Mussolini\'s Invasion and the Italian Occupation', para: '3' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q9',
        text: 'On October 7, the League of Nations unanimously declared Italy an aggressor but took no effective action.',
        lang: 'en',
        cite: {
          source: 'loc-ethiopia-country-study-1991',
          loc: { section: 'Mussolini\'s Invasion and the Italian Occupation', para: '3' }
        },
        provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/ethiopia/19.htm' }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1935-12-09' },
            cites: [
              { source: 'lemo-chronik-1935', loc: { section: 'Chronik 1935', para: '220' } }
            ]
          }
        ]
      },
      quote: {
        id: 'q10',
        text: 'Mit dem Beschluss, italienische Annexionen in Abessinien zu dulden, rufen die Regierungen Frankreichs und Großbritanniens Empörung in der eigenen Presse und im Völkerbund gegen ihre Appeasement-Politik hervor.',
        lang: 'de',
        cite: { source: 'lemo-chronik-1935', loc: { section: 'Chronik 1935', para: '221' } },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://www.dhm.de/lemo/jahreschronik/1935.html'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1936-01-01' },
            cites: [
              { source: 'lemo-chronik-1936', loc: { section: 'Chronik 1936', para: '2' } }
            ]
          }
        ]
      },
      quote: {
        id: 'q11',
        text: 'Abessinien protestiert beim Völkerbund gegen den Einsatz von Giftgas durch die italienische Armee, deren Vormarsch ins Stocken geraten ist.',
        lang: 'de',
        cite: { source: 'lemo-chronik-1936', loc: { section: 'Chronik 1936', para: '3' } },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://www.dhm.de/lemo/jahreschronik/1936.html'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1936-03-31' },
            cites: [
              {
                source: 'loc-ethiopia-country-study-1991',
                loc: { section: 'Mussolini\'s Invasion and the Italian Occupation', para: '4' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q12',
        text: 'On March 31, 1936, the Ethiopians counterattacked the main Italian force at Maychew but were defeated.',
        lang: 'en',
        cite: {
          source: 'loc-ethiopia-country-study-1991',
          loc: { section: 'Mussolini\'s Invasion and the Italian Occupation', para: '4' }
        },
        provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/ethiopia/19.htm' }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1936-05-05' },
            cites: [
              {
                source: 'loc-ethiopia-country-study-1991',
                loc: { section: 'Mussolini\'s Invasion and the Italian Occupation', para: '4' }
              },
              { source: 'lemo-chronik-1936', loc: { section: 'Chronik 1936', para: '69' } }
            ]
          }
        ]
      },
      quote: {
        id: 'q13',
        text: 'Mit der Eroberung der Hauptstadt Addis Abeba erklärt Benito Mussolini den Krieg in Abessinien für beendet. Er ruft das "neue italienische Imperium" aus.',
        lang: 'de',
        cite: { source: 'lemo-chronik-1936', loc: { section: 'Chronik 1936', para: '70' } },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://www.dhm.de/lemo/jahreschronik/1936.html'
        }
      }
    }
  ]
})
