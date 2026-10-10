import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'ceasefire-of-the-iran-iraq-war',
  names: [
    { text: 'Ceasefire of the Iran–Iraq War', lang: 'en', role: 'primary' },
    { text: 'آتش‌بس جنگ ایران و عراق', lang: 'fa', role: 'native' },
    { text: 'وقف إطلاق النار بين العراق وإيران', lang: 'ar', role: 'native' },
    {
      text: 'Resolution 598',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'iranica-gieling-iraq-vii-iran-iraq-war',
          loc: { section: 'IRAQ vii. IRAN-IRAQ WAR', para: '41' }
        }
      ]
    }
  ],
  researched: '2026-10-10',
  type: 'other',
  start: {
    alts: [
      {
        value: { d: '1988-07-18' },
        cites: [
          {
            source: 'iranica-gieling-iraq-vii-iran-iraq-war',
            loc: { section: 'IRAQ vii. IRAN-IRAQ WAR', para: '45' }
          }
        ],
        heldBy: [
          { kind: 'scholar', name: 'Saskia M. Gieling' }
        ]
      },
      {
        value: { d: '1988-07-20' },
        cites: [
          { source: 'iranica-algar-khomeini-life', loc: { section: 'KHOMEINI i. Life' } }
        ],
        heldBy: [
          { kind: 'scholar', name: 'Hamid Algar' }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1988-08-20' },
        cites: [
          {
            source: 'iranica-kechichian-boundaries-iraq',
            loc: { section: 'BOUNDARIES iv. With Iraq', para: '3' }
          }
        ]
      },
      {
        value: { d: '1988-09-20' },
        cites: [
          {
            source: 'iranica-gieling-iraq-vii-iran-iraq-war',
            loc: { section: 'IRAQ vii. IRAN-IRAQ WAR', para: '46' }
          }
        ]
      }
    ]
  },
  regions: ['iran', 'mena'],
  prominence: 2,
  polities: [
    {
      ref: 'polity:islamic-republic-of-iran',
      cites: [
        {
          source: 'iranica-gieling-iraq-vii-iran-iraq-war',
          loc: { section: 'IRAQ vii. IRAN-IRAQ WAR', para: '45' }
        }
      ]
    },
    {
      ref: 'polity:republic-of-iraq',
      cites: [
        {
          source: 'iranica-gieling-iraq-vii-iran-iraq-war',
          loc: { section: 'IRAQ vii. IRAN-IRAQ WAR', para: '46' }
        }
      ]
    },
    {
      ref: 'polity:united-states',
      cites: [
        {
          source: 'loc-iraq-country-study-1988',
          loc: { section: 'The Tanker War, 1984-87', para: '4' }
        }
      ]
    }
  ],
  sides: [
    {
      key: 'iran',
      name: 'Iran',
      polity: 'polity:islamic-republic-of-iran',
      cites: [
        {
          source: 'iranica-gieling-iraq-vii-iran-iraq-war',
          loc: { section: 'IRAQ vii. IRAN-IRAQ WAR', para: '45' }
        }
      ]
    },
    {
      key: 'iraq',
      name: 'Iraq',
      polity: 'polity:republic-of-iraq',
      cites: [
        {
          source: 'iranica-gieling-iraq-vii-iran-iraq-war',
          loc: { section: 'IRAQ vii. IRAN-IRAQ WAR', para: '46' }
        }
      ]
    }
  ],
  participants: [
    {
      ref: 'person:ruhollah-khomeini',
      role: 'leader',
      side: 'iran',
      cites: [
        {
          source: 'iranica-gieling-iraq-vii-iran-iraq-war',
          loc: { section: 'IRAQ vii. IRAN-IRAQ WAR', para: '45' }
        }
      ]
    },
    {
      ref: 'person:ali-khamenei',
      role: 'head-of-state',
      side: 'iran',
      cites: [
        {
          source: 'iranica-gieling-iraq-vii-iran-iraq-war',
          loc: { section: 'IRAQ vii. IRAN-IRAQ WAR', para: '45' }
        }
      ]
    },
    {
      ref: 'person:saddam-hussein',
      role: 'leader',
      side: 'iraq',
      cites: [
        {
          source: 'iranica-gieling-iraq-vii-iran-iraq-war',
          loc: { section: 'IRAQ vii. IRAN-IRAQ WAR', para: '46' }
        }
      ]
    },
    {
      name: 'Javier Pérez de Cuéllar',
      role: 'diplomat',
      cites: [
        {
          source: 'iranica-gieling-iraq-vii-iran-iraq-war',
          loc: { section: 'IRAQ vii. IRAN-IRAQ WAR', para: '45' }
        }
      ]
    }
  ],
  related: [
    {
      ref: 'event:iran-iraq-war',
      rel: 'response-to',
      cites: [
        {
          source: 'iranica-gieling-iraq-vii-iran-iraq-war',
          loc: { section: 'IRAQ vii. IRAN-IRAQ WAR', para: '45' }
        }
      ]
    },
    {
      ref: 'event:tanker-war',
      rel: 'preceded-by',
      cites: [
        {
          source: 'iranica-gieling-iraq-vii-iran-iraq-war',
          loc: { section: 'IRAQ vii. IRAN-IRAQ WAR', para: '45' }
        }
      ]
    },
    {
      ref: 'event:iran-air-flight-655',
      rel: 'contributed-to',
      cites: [
        {
          source: 'iranica-gieling-iraq-vii-iran-iraq-war',
          loc: { section: 'IRAQ vii. IRAN-IRAQ WAR', para: '45' }
        }
      ]
    },
    {
      ref: 'event:gulf-war',
      rel: 'followed-by',
      cites: [
        {
          source: 'iranica-potter-gulf-war-and-persia',
          loc: { section: 'GULF WAR and PERSIA', para: '5' }
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
          text: 'After eight years of war Iran and Iraq agreed to cease-fire on 29 Mordād 1367 Š./20 August 1988 and met under United Nations auspices to settle their border disputes.',
          lang: 'en',
          cite: {
            source: 'iranica-kechichian-boundaries-iraq',
            loc: { section: 'BOUNDARIES iv. With Iraq', para: '3' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'https://www.iranicaonline.org/articles/boundaries-iv/'
          }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q2',
          text: 'While the war continued on all fronts and other countries became more and more involved, the United Nations Security Council on 20 July 1987 unanimously accepted Resolution 598.',
          lang: 'en',
          cite: {
            source: 'iranica-gieling-iraq-vii-iran-iraq-war',
            loc: { section: 'IRAQ vii. IRAN-IRAQ WAR', para: '41' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'https://www.iranicaonline.org/articles/iraq-vii-iran-iraq-war'
          }
        },
        {
          id: 'q3',
          text: 'Iran neither accepted nor rejected the resolution; rather, it demanded that the sequence of the articles in the resolution be changed. Instead of article 1, which demanded an immediate cease-fire, Iran wanted the resolution to begin with article 6, which authorized the appointment of a commission to inquire into responsibility for the conflict.',
          lang: 'en',
          cite: {
            source: 'iranica-gieling-iraq-vii-iran-iraq-war',
            loc: { section: 'IRAQ vii. IRAN-IRAQ WAR', para: '41' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'https://www.iranicaonline.org/articles/iraq-vii-iran-iraq-war'
          }
        },
        {
          id: 'q4',
          text: 'Demands that, as a first step towards a negotiated settlement, Iran and Iraq observe an immediate cease-fire, discontinue all military actions on land, at sea and in the air, and withdraw all forces to the internationally recognized boundaries without delay;',
          lang: 'en',
          cite: { source: 'unsc-resolution-598-1987', loc: { section: 'Resolution 598 (1987)' } },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'https://en.wikisource.org/wiki/United_Nations_Security_Council_Resolution_598'
          }
        }
      ]
    },
    {
      kind: 'course',
      quotes: [
        {
          id: 'q5',
          text: 'Iraq reacted skeptically to Iran’s acceptance of the UN resolution.',
          lang: 'en',
          cite: {
            source: 'iranica-gieling-iraq-vii-iran-iraq-war',
            loc: { section: 'IRAQ vii. IRAN-IRAQ WAR', para: '46' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'https://www.iranicaonline.org/articles/iraq-vii-iran-iraq-war'
          }
        },
        {
          id: 'q6',
          text: 'On 6 August, Saddam Hussein again declared that he was amenable to a settlement if Iran accepted direct talks after the truce. Iran accepted this proposal a few days later.',
          lang: 'en',
          cite: {
            source: 'iranica-gieling-iraq-vii-iran-iraq-war',
            loc: { section: 'IRAQ vii. IRAN-IRAQ WAR', para: '46' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'https://www.iranicaonline.org/articles/iraq-vii-iran-iraq-war'
          }
        },
        {
          id: 'q7',
          text: 'Requests the Secretary-General to dispatch a team of United Nations Observers to verify, confirm and supervise the cease-fire and withdrawal and further requests the Secretary-General to make the necessary arrangements in consultation with the Parties and to submit a report thereon to the Security Council;',
          lang: 'en',
          cite: { source: 'unsc-resolution-598-1987', loc: { section: 'Resolution 598 (1987)' } },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'https://en.wikisource.org/wiki/United_Nations_Security_Council_Resolution_598'
          }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q8',
          text: 'The negotiations, which started five days later under the auspices of the United Nations in Geneva, soon became deadlocked over the question of the Shatt al-Arab. Both parties refused to make concessions on this point and some other issues, such as the continued occupation of Iranian territory by the Iraqi forces. As a result, further rounds of negotiations in September and November 1988, and in the spring of 1989, failed to yield any constructive result.',
          lang: 'en',
          cite: {
            source: 'iranica-gieling-iraq-vii-iran-iraq-war',
            loc: { section: 'IRAQ vii. IRAN-IRAQ WAR', para: '46' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'https://www.iranicaonline.org/articles/iraq-vii-iran-iraq-war'
          }
        },
        {
          id: 'q9',
          text: 'Two years later, on 15 July 1990, two weeks after the Iraqi invasion of Kuwait, Saddam Hussein finally offered a permanent settlement to the war, which technically had not yet ended. He announced that Iraq would accept the Algiers Protocol of 1975, accept joint sovereignty over the Shatt-al-Arab waterway',
          lang: 'en',
          cite: {
            source: 'iranica-gieling-iraq-vii-iran-iraq-war',
            loc: { section: 'IRAQ vii. IRAN-IRAQ WAR', para: '47' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'https://www.iranicaonline.org/articles/iraq-vii-iran-iraq-war'
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
            value: { d: '1987-07-20' },
            cites: [
              { source: 'unsc-resolution-598-1987', loc: { section: 'Resolution 598 (1987)' } }
            ]
          }
        ]
      },
      quote: {
        id: 'q10',
        text: 'Adopted unanimously by the Security Council at its 2750th meeting on 20 July 1987',
        lang: 'en',
        cite: { source: 'unsc-resolution-598-1987', loc: { section: 'Resolution 598 (1987)' } },
        provenance: {
          via: 'web',
          at: '2026-10-10',
          url: 'https://en.wikisource.org/wiki/United_Nations_Security_Council_Resolution_598'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1988-07-18' },
            cites: [
              {
                source: 'iranica-gieling-iraq-vii-iran-iraq-war',
                loc: { section: 'IRAQ vii. IRAN-IRAQ WAR', para: '45' }
              }
            ],
            heldBy: [
              { kind: 'scholar', name: 'Saskia M. Gieling' }
            ]
          },
          {
            value: { d: '1988-07-20' },
            cites: [
              { source: 'iranica-algar-khomeini-life', loc: { section: 'KHOMEINI i. Life' } }
            ],
            heldBy: [
              { kind: 'scholar', name: 'Hamid Algar' }
            ]
          }
        ]
      },
      quote: {
        id: 'q11',
        text: 'On 18 July 1988, President Khamene’i in a letter to Secretary-General Pérez de Cuéllar announced that Iran had accepted United Nations Security Council Resolution 598, which called for an immediate cease-fire.',
        lang: 'en',
        cite: {
          source: 'iranica-gieling-iraq-vii-iran-iraq-war',
          loc: { section: 'IRAQ vii. IRAN-IRAQ WAR', para: '45' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-10',
          url: 'https://www.iranicaonline.org/articles/iraq-vii-iran-iraq-war'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1988-08-20' },
            cites: [
              {
                source: 'iranica-kechichian-boundaries-iraq',
                loc: { section: 'BOUNDARIES iv. With Iraq', para: '3' }
              }
            ]
          },
          {
            value: { d: '1988-09-20' },
            cites: [
              {
                source: 'iranica-gieling-iraq-vii-iran-iraq-war',
                loc: { section: 'IRAQ vii. IRAN-IRAQ WAR', para: '46' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q12',
        text: 'After two weeks, on 20 September, the cease-fire between the two countries formally commenced.',
        lang: 'en',
        cite: {
          source: 'iranica-gieling-iraq-vii-iran-iraq-war',
          loc: { section: 'IRAQ vii. IRAN-IRAQ WAR', para: '46' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-10',
          url: 'https://www.iranicaonline.org/articles/iraq-vii-iran-iraq-war'
        }
      }
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/7/78/VN-secretaris-generaal_Perez_de_Cuellar_%2C_kop%2C_Bestanddeelnr_934-3065.jpg/1280px-VN-secretaris-generaal_Perez_de_Cuellar_%2C_kop%2C_Bestanddeelnr_934-3065.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:VN-secretaris-generaal_Perez_de_Cuellar_,_kop,_Bestanddeelnr_934-3065.jpg',
    credit: { institution: 'Nationaal Archief', creator: 'Rob Croes / Anefo' },
    license: { id: 'cc0' }
  }
})
