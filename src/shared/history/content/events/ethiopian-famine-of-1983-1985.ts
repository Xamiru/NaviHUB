import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'ethiopian-famine-of-1983-1985',
  names: [
    { text: 'Ethiopian famine of 1983–1985', lang: 'en', role: 'primary' },
    { text: 'የኢትዮጵያ ረሃብ', lang: 'am', role: 'native' }
  ],
  researched: '2026-10-08',
  type: 'famine',
  start: {
    alts: [
      {
        value: { d: '1983' },
        cites: [
          {
            source: 'loc-ethiopia-country-study-1991',
            loc: { section: 'The Politics of Drought and Famine', para: '1' }
          }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1985' },
        cites: [
          {
            source: 'loc-ethiopia-country-study-1991',
            loc: { section: 'Ethiopia in Crisis: Famine and Its Aftermath, 1984-88', para: '5' }
          }
        ]
      }
    ]
  },
  regions: ['subsaharan-africa'],
  prominence: 2,
  places: [
    {
      ref: 'place:addis-ababa',
      cites: [
        {
          source: 'loc-ethiopia-country-study-1991',
          loc: { section: 'The Politics of Drought and Famine', para: '2' }
        }
      ]
    }
  ],
  sides: [
    {
      key: 'derg',
      name: 'The Derg',
      cites: [
        {
          source: 'loc-ethiopia-country-study-1991',
          loc: { section: 'The Politics of Drought and Famine', para: '1' }
        }
      ]
    }
  ],
  participants: [
    {
      name: 'Mengistu Haile Mariam',
      role: 'head-of-state',
      side: 'derg',
      cites: [
        {
          source: 'loc-ethiopia-country-study-1991',
          loc: { section: 'The Politics of Drought and Famine', para: '2' }
        }
      ]
    },
    {
      name: 'Dawit Wolde Giorgis',
      role: 'negotiator',
      cites: [
        {
          source: 'loc-ethiopia-country-study-1991',
          loc: { section: 'The Politics of Drought and Famine', para: '2' }
        }
      ]
    }
  ],
  figures: [
    {
      key: 'deaths',
      value: {
        alts: [
          {
            value: { min: 1000000 },
            cites: [
              {
                source: 'loc-ethiopia-country-study-1991',
                loc: { section: 'The Politics of Drought and Famine', para: '1' }
              }
            ]
          }
        ]
      }
    }
  ],
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'By mid-1984 it was evident that another drought and resulting famine of major proportions had begun to affect large parts of northern Ethiopia.',
          lang: 'en',
          cite: {
            source: 'loc-ethiopia-country-study-1991',
            loc: { section: 'Ethiopia in Crisis: Famine and Its Aftermath, 1984-88', para: '4' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/ethiopia/35.htm' }
        },
        {
          id: 'q2',
          text: 'By 1983 armed conflict between the government and opposition movements in the north had combined with drought to contribute to mass starvation in Eritrea, Tigray, and Welo.',
          lang: 'en',
          cite: {
            source: 'loc-ethiopia-country-study-1991',
            loc: { section: 'The Politics of Drought and Famine', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/ethiopia/120.htm' }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q3',
          text: 'Ethiopia had never recovered from the previous great famine of the early 1970s, which was the result of a drought that affected most of the countries of the African Sahel. The late 1970s again brought signs of intensifying drought. By the early 1980s, large numbers of people in central Eritrea, Tigray, Welo, and parts of Gonder and Shewa were beginning to feel the effects of renewed famine.',
          lang: 'en',
          cite: {
            source: 'loc-ethiopia-country-study-1991',
            loc: { section: 'Ethiopia in Crisis: Famine and Its Aftermath, 1984-88', para: '3' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/ethiopia/35.htm' }
        }
      ]
    },
    {
      kind: 'causes',
      quotes: [
        {
          id: 'q4',
          text: 'The almost total failure of crops in the north was compounded by fighting in and around Eritrea, which hindered the passage of relief supplies.',
          lang: 'en',
          cite: {
            source: 'loc-ethiopia-country-study-1991',
            loc: { section: 'Ethiopia in Crisis: Famine and Its Aftermath, 1984-88', para: '4' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/ethiopia/35.htm' }
        },
        {
          id: 'q5',
          text: 'The government\'s inability or unwillingness to deal with the 1984-85 famine provoked universal condemnation by the international community. Even many supporters of the Ethiopian regime opposed its policy of withholding food shipments to rebel areas.',
          lang: 'en',
          cite: {
            source: 'loc-ethiopia-country-study-1991',
            loc: { section: 'Ethiopia in Crisis: Famine and Its Aftermath, 1984-88', para: '5' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/ethiopia/35.htm' }
        }
      ]
    },
    {
      kind: 'course',
      quotes: [
        {
          id: 'q6',
          text: 'As it had in the past, in the mid-1980s the international community responded generously to Ethiopia\'s tragedy once the dimensions of the crisis became understood. Bilateral, multilateral, and private donations of food and other relief supplies poured into the country by late 1984.',
          lang: 'en',
          cite: {
            source: 'loc-ethiopia-country-study-1991',
            loc: { section: 'The Politics of Drought and Famine', para: '2' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/ethiopia/120.htm' }
        },
        {
          id: 'q7',
          text: 'The primary government response to the drought and famine was the decision to uproot large numbers of peasants who lived in the affected areas in the north and to resettle them in the southern part of the country.',
          lang: 'en',
          cite: {
            source: 'loc-ethiopia-country-study-1991',
            loc: { section: 'Ethiopia in Crisis: Famine and Its Aftermath, 1984-88', para: '6' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/ethiopia/35.htm' }
        }
      ]
    },
    {
      kind: 'casualties',
      quotes: [
        {
          id: 'q8',
          text: 'By early 1985, some 7.7 million people were suffering from drought and food shortages. Of that number, 2.5 million were at immediate risk of starving. More than 300,000 died in 1984 alone, more than twice the number that died in the drought a decade before. Before the worst was over, 1 million Ethiopians had died from drought and famine in the 1980s.',
          lang: 'en',
          cite: {
            source: 'loc-ethiopia-country-study-1991',
            loc: { section: 'The Politics of Drought and Famine', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/ethiopia/120.htm' }
        },
        {
          id: 'q9',
          text: 'Several human rights organizations claimed that tens of thousands of peasants died as a result of forced resettlement.',
          lang: 'en',
          cite: {
            source: 'loc-ethiopia-country-study-1991',
            loc: { section: 'Ethiopia in Crisis: Famine and Its Aftermath, 1984-88', para: '6' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/ethiopia/35.htm' }
        }
      ]
    },
    {
      kind: 'aftermath',
      quotes: [
        {
          id: 'q10',
          text: 'The 1984-85 famine resulted in the death or displacement of hundreds of thousands of people within Ethiopia and forced about 100,000 into Somalia, 10,000 into Djibouti, and more than 300,000 into Sudan.',
          lang: 'en',
          cite: {
            source: 'loc-ethiopia-country-study-1991',
            loc: { section: 'Refugees, Drought, and Famine', para: '8' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/ethiopia/46.htm' }
        },
        {
          id: 'q11',
          text: 'Despite drought and famine of unprecedented proportions in modern Ethiopian history, the Derg persisted on its controversial political course.',
          lang: 'en',
          cite: {
            source: 'loc-ethiopia-country-study-1991',
            loc: { section: 'The Politics of Drought and Famine', para: '4' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/ethiopia/120.htm' }
        },
        {
          id: 'q14',
          text: 'In late 1985, another year of drought was forecast, and by early 1986 the famine had spread to parts of the southern highlands, with an estimated 5.8 million people dependent on relief food.',
          lang: 'en',
          cite: {
            source: 'loc-ethiopia-country-study-1991',
            loc: { section: 'Ethiopia in Crisis: Famine and Its Aftermath, 1984-88', para: '4' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/ethiopia/35.htm' }
        }
      ]
    }
  ],
  course: [
    {
      date: {
        alts: [
          {
            value: { d: '1984' },
            cites: [
              {
                source: 'loc-ethiopia-country-study-1991',
                loc: { section: 'Ethiopia in Crisis: Famine and Its Aftermath, 1984-88', para: '4' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q12',
        text: 'Although international relief organizations made a major effort to provide food to the affected areas, the persistence of drought and poor security conditions in the north resulted in continuing need as well as hazards for famine relief workers.',
        lang: 'en',
        cite: {
          source: 'loc-ethiopia-country-study-1991',
          loc: { section: 'Ethiopia in Crisis: Famine and Its Aftermath, 1984-88', para: '4' }
        },
        provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/ethiopia/35.htm' }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1985' },
            cites: [
              {
                source: 'loc-ethiopia-country-study-1991',
                loc: { section: 'Ethiopia in Crisis: Famine and Its Aftermath, 1984-88', para: '6' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q13',
        text: 'In 1985 and 1986, about 600,000 people were moved, many forcibly, from their home villages and farms by the military and transported to various regions in the south.',
        lang: 'en',
        cite: {
          source: 'loc-ethiopia-country-study-1991',
          loc: { section: 'Ethiopia in Crisis: Famine and Its Aftermath, 1984-88', para: '6' }
        },
        provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/ethiopia/35.htm' }
      }
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/b/bf/MASTER_SGT._Edward_Barnes%2C_loadmaster_from_the_6th_Military_Airlift_Squadron%2C_directs_the_loading_of_one_of_11_pallets_of_supplies_onto_a_waiting_truck_during_Ethiopian_relief_opera_-_DPLA_-_bc5b8b02657a68af0c663e43cc117927.jpeg/1280px-thumbnail.jpeg',
    page: 'https://commons.wikimedia.org/wiki/File:MASTER_SGT._Edward_Barnes,_loadmaster_from_the_6th_Military_Airlift_Squadron,_directs_the_loading_of_one_of_11_pallets_of_supplies_onto_a_waiting_truck_during_Ethiopian_relief_opera_-_DPLA_-_bc5b8b02657a68af0c663e43cc117927.jpeg',
    credit: {
      institution: 'U.S. Department of Defense, American Forces Information Service (National Archives at College Park)',
      creator: 'Tech. Sgt. James R. Pearson'
    },
    license: { id: 'public-domain' }
  },
  furtherReading: [
    { source: 'dawit-1988-red-tears', perspective: 'african' }
  ]
})
