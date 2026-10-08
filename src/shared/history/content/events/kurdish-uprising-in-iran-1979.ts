import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'kurdish-uprising-in-iran-1979',
  names: [
    { text: 'Kurdish uprising in Iran (1979)', lang: 'en', role: 'primary' },
    {
      text: 'قیام کردستان ۱۳۵۸',
      lang: 'fa',
      role: 'native',
      translit: 'Qiyām-e Kordestān-e 1358'
    },
    {
      text: 'Three-Month War',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'iranica-prunhuber-qasemlu',
          loc: { section: 'QĀSEMLU, ʿABD-AL-RAḤMĀN', para: '17' }
        }
      ]
    }
  ],
  researched: '2026-10-09',
  type: 'uprising',
  start: {
    alts: [
      {
        value: { d: '1979-03' },
        cites: [
          {
            source: 'loc-iran-country-study-1987',
            loc: { section: 'THE REVOLUTION', para: '11' }
          }
        ]
      }
    ]
  },
  regions: ['iran'],
  prominence: 2,
  places: [
    {
      ref: 'place:mahabad',
      cites: [
        {
          source: 'iranica-prunhuber-qasemlu',
          loc: { section: 'QĀSEMLU, ʿABD-AL-RAḤMĀN', para: '13' }
        }
      ]
    },
    {
      ref: 'place:sanandaj',
      cites: [
        {
          source: 'loc-iran-country-study-1987',
          loc: { section: 'THE REVOLUTION', para: '11' }
        }
      ]
    }
  ],
  partOf: [
    { ref: 'event:iranian-revolution' }
  ],
  sides: [
    {
      key: 'kurds',
      name: 'Kurdish forces',
      cites: [
        {
          source: 'loc-iran-country-study-1987',
          loc: { section: 'THE REVOLUTION', para: '11' }
        },
        {
          source: 'iranica-prunhuber-qasemlu',
          loc: { section: 'QĀSEMLU, ʿABD-AL-RAḤMĀN', para: '16' }
        }
      ]
    },
    {
      key: 'government',
      name: 'Government forces',
      cites: [
        {
          source: 'loc-iran-country-study-1987',
          loc: { section: 'THE REVOLUTION', para: '11' }
        },
        {
          source: 'iranica-prunhuber-qasemlu',
          loc: { section: 'QĀSEMLU, ʿABD-AL-RAḤMĀN', para: '17' }
        }
      ],
      polity: 'polity:islamic-republic-of-iran'
    }
  ],
  participants: [
    {
      ref: 'person:abdul-rahman-ghassemlou',
      role: 'leader',
      side: 'kurds',
      cites: [
        {
          source: 'iranica-prunhuber-qasemlu',
          loc: { section: 'QĀSEMLU, ʿABD-AL-RAḤMĀN', para: '13' }
        },
        {
          source: 'loc-iran-country-study-1987',
          loc: { section: 'THE REVOLUTION', para: '11' }
        }
      ]
    },
    {
      name: 'Ezz ad-Din Husaini',
      role: 'leader',
      side: 'kurds',
      cites: [
        {
          source: 'loc-iran-country-study-1987',
          loc: { section: 'THE REVOLUTION', para: '11' }
        }
      ]
    },
    {
      name: 'Ahmad Muftizadeh',
      role: 'negotiator',
      side: 'kurds',
      cites: [
        {
          source: 'loc-iran-country-study-1987',
          loc: { section: 'THE REVOLUTION', para: '11' }
        }
      ]
    },
    {
      ref: 'person:ruhollah-khomeini',
      role: 'commander',
      side: 'government',
      cites: [
        {
          source: 'loc-iran-country-study-1987',
          loc: { section: 'THE REVOLUTION', para: '11' }
        },
        {
          source: 'iranica-prunhuber-qasemlu',
          loc: { section: 'QĀSEMLU, ʿABD-AL-RAḤMĀN', para: '16' }
        }
      ]
    },
    {
      ref: 'person:mehdi-bazargan',
      role: 'head-of-government',
      side: 'government',
      cites: [
        {
          source: 'loc-iran-country-study-1987',
          loc: { section: 'THE REVOLUTION', para: '11' }
        }
      ]
    }
  ],
  related: [
    {
      ref: 'event:iranian-revolution',
      rel: 'followed-by',
      cites: [
        {
          source: 'loc-iran-country-study-1987',
          loc: { section: 'THE REVOLUTION', para: '11' }
        },
        {
          source: 'iranica-gieling-iraq-iran-iraq-war',
          loc: { section: 'IRAQ vii. IRAN-IRAQ WAR', para: '16' }
        }
      ]
    },
    {
      ref: 'event:algiers-agreement-1975',
      rel: 'related',
      cites: [
        {
          source: 'iranica-kechichian-boundaries-iraq',
          loc: { section: 'BOUNDARIES iv. With Iraq', para: '3' }
        }
      ]
    }
  ],
  polities: [
    { ref: 'polity:islamic-republic-of-iran' }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/5/57/Fonds_Christian_Bromberger_-_Affiches_de_la_p%C3%A9riode_de_la_R%C3%A9volution_islamique_%28Iran%2C_1978-1979%29_-_Deux_combattants_kurdes_posent_avec_leurs_fusils_%28M%C3%A9diHAL_1789701%29.jpg/1280px-thumbnail.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Fonds_Christian_Bromberger_-_Affiches_de_la_p%C3%A9riode_de_la_R%C3%A9volution_islamique_(Iran,_1978-1979)_-_Deux_combattants_kurdes_posent_avec_leurs_fusils_(M%C3%A9diHAL_1789701).jpg',
    credit: {
      institution: 'Fonds Christian Bromberger, MédiHAL (Affiches de la période de la Révolution islamique, Iran, 1978-1979)'
    },
    license: { id: 'open-government', url: 'https://www.etalab.gouv.fr/licence-ouverte-open-licence' }
  },
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'The Kurds have manifested an independent spirit throughout modern Iranian history, rebelling against central government efforts to restrict their autonomy during the Safavid, Qajar, and Pahlavi periods. The most recent Kurdish uprising took place in 1979 following the Revolution. Mahabad, which has been a center of Kurdish resistance against Persian authority since the time of the Safavid monarch Shah Abbas (1587-1629), was again at the forefront of the Kurdish autonomy struggle. Intense fighting between government forces and Kurdish guerrillas occurred from 1979 to 1982, but since 1983 the government has asserted its control over most of the Kurdish area.',
          lang: 'en',
          cite: { source: 'loc-iran-country-study-1987', loc: { section: 'Kurds', para: '6' } },
          provenance: { via: 'web', at: '2026-10-09', url: 'http://countrystudies.us/iran/40.htm' }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q11',
          text: 'During the turbulent early 1979, Qāsemlu was building the armed resistance of the pešmergas (Kurdish fighters; lit. “those who face death”) and, at the same time, working to reach an agreement with the central government.',
          lang: 'en',
          cite: {
            source: 'iranica-prunhuber-qasemlu',
            loc: { section: 'QĀSEMLU, ʿABD-AL-RAḤMĀN', para: '14' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://www.iranicaonline.org/articles/qasemlu/'
          }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q20',
          text: 'Between 1981 and 1982, the Kurds controlled a major portion of Iranian Kurdistan, excluding the towns.',
          lang: 'en',
          cite: {
            source: 'iranica-prunhuber-qasemlu',
            loc: { section: 'QĀSEMLU, ʿABD-AL-RAḤMĀN', para: '18' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://www.iranicaonline.org/articles/qasemlu/'
          }
        },
        {
          id: 'q21',
          text: 'Eventually the KDPI settled in Kurdish territory on the Iraqi side of the border, where they have remained since 1984',
          lang: 'en',
          cite: {
            source: 'iranica-prunhuber-qasemlu',
            loc: { section: 'QĀSEMLU, ʿABD-AL-RAḤMĀN', para: '18' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://www.iranicaonline.org/articles/qasemlu/'
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
            value: { d: '1979-03' },
            cites: [
              {
                source: 'loc-iran-country-study-1987',
                loc: { section: 'THE REVOLUTION', para: '11' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q12',
        text: 'Scattered fighting began in March 1979 between government and Kurdish forces and continued after a brief cease-fire; attempts at negotiation proved abortive.',
        lang: 'en',
        cite: {
          source: 'loc-iran-country-study-1987',
          loc: { section: 'THE REVOLUTION', para: '11' }
        },
        provenance: { via: 'web', at: '2026-10-09', url: 'http://countrystudies.us/iran/23.htm' }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1979-03' },
            cites: [
              {
                source: 'iranica-prunhuber-qasemlu',
                loc: { section: 'QĀSEMLU, ʿABD-AL-RAḤMĀN', para: '13' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q13',
        text: 'In March 1979, the KDP (Iran) officially announced the resumption of its political activities, putting an end to thirty years of clandestine functions.',
        lang: 'en',
        cite: {
          source: 'iranica-prunhuber-qasemlu',
          loc: { section: 'QĀSEMLU, ʿABD-AL-RAḤMĀN', para: '13' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-09',
          url: 'https://www.iranicaonline.org/articles/qasemlu/'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1979' },
            cites: [
              {
                source: 'loc-iran-country-study-1987',
                loc: { section: 'THE REVOLUTION', para: '11' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q14',
        text: 'One faction, led by Ahmad Muftizadeh, the Friday prayer leader in Sanandaj, was ready to accept the limited concessions offered by the government, but the Kurdish Democratic Party, led by Abdol-Rahman Qasemlu, and a more radical group led by Shaykh Ezz ad Din Husaini issued demands that the authorities in Tehran did not feel they could accept. These included the enlargement of the Kordestan region to include all Kurdish-speaking areas in Iran, a specified share of the national revenue for expenditure in the province, and complete autonomy in provincial administration. Kurdish was to be recognized as an official language for local use and for correspondence with the central government. Kurds were to fill all local government posts and to be in charge of local security forces.',
        lang: 'en',
        cite: {
          source: 'loc-iran-country-study-1987',
          loc: { section: 'THE REVOLUTION', para: '11' }
        },
        provenance: { via: 'web', at: '2026-10-09', url: 'http://countrystudies.us/iran/23.htm' }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1979-08' },
            cites: [
              {
                source: 'loc-iran-country-study-1987',
                loc: { section: 'THE REVOLUTION', para: '11' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q15',
        text: 'With the rejection of these demands, serious fighting broke out in August 1979. Khomeini, invoking his powers as commander in chief, used the army against other Iranians for the first time since the Revolution.',
        lang: 'en',
        cite: {
          source: 'loc-iran-country-study-1987',
          loc: { section: 'THE REVOLUTION', para: '11' }
        },
        provenance: { via: 'web', at: '2026-10-09', url: 'http://countrystudies.us/iran/23.htm' }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1979-08' },
            cites: [
              {
                source: 'iranica-prunhuber-qasemlu',
                loc: { section: 'QĀSEMLU, ʿABD-AL-RAḤMĀN', para: '17' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q16',
        text: 'Several delegations of the KDP (Iran) met with Iranian authorities, trying to avoid armed conflict, but the regime launched a fierce offensive and, by the end of August, almost all the Kurdish cities held by the rebels were controlled by the government forces.',
        lang: 'en',
        cite: {
          source: 'iranica-prunhuber-qasemlu',
          loc: { section: 'QĀSEMLU, ʿABD-AL-RAḤMĀN', para: '17' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-09',
          url: 'https://www.iranicaonline.org/articles/qasemlu/'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1979-10-20' },
            cites: [
              {
                source: 'iranica-prunhuber-qasemlu',
                loc: { section: 'QĀSEMLU, ʿABD-AL-RAḤMĀN', para: '17' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q17',
        text: 'After what is known as “Three-Month War,” Qāsemlu returned to Mahabad on 20 October 1979 and declared that the revolt would continue as a guerrilla campaign',
        lang: 'en',
        cite: {
          source: 'iranica-prunhuber-qasemlu',
          loc: { section: 'QĀSEMLU, ʿABD-AL-RAḤMĀN', para: '17' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-09',
          url: 'https://www.iranicaonline.org/articles/qasemlu/'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1979-12' },
            cites: [
              {
                source: 'iranica-prunhuber-qasemlu',
                loc: { section: 'QĀSEMLU, ʿABD-AL-RAḤMĀN', para: '18' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q18',
        text: 'By December, the Iranian Revolutionary Guards had strengthened their military presence and retaken Kurdistan',
        lang: 'en',
        cite: {
          source: 'iranica-prunhuber-qasemlu',
          loc: { section: 'QĀSEMLU, ʿABD-AL-RAḤMĀN', para: '18' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-09',
          url: 'https://www.iranicaonline.org/articles/qasemlu/'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1980-04' },
            cites: [
              {
                source: 'loc-iran-country-study-1987',
                loc: { section: 'The Bani Sadr Presidency', para: '5' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q19',
        text: 'The Kurdish problem also proved intractable. The rebellion continued, and the Kurdish leadership refused to compromise on its demands for local autonomy. Fighting broke out again in April 1980, followed by another cease-fire on April 29. Kurdish leaders and the government negotiated both in Mahabad and in Tehran, but, although Bani Sadr announced he was prepared to accept the Kurdish demands with "modifications," the discussions broke down and fighting resumed.',
        lang: 'en',
        cite: {
          source: 'loc-iran-country-study-1987',
          loc: { section: 'The Bani Sadr Presidency', para: '5' }
        },
        provenance: { via: 'web', at: '2026-10-09', url: 'http://countrystudies.us/iran/25.htm' }
      }
    }
  ],
  end: {
    alts: [
      {
        value: { d: '1982' },
        cites: [
          { source: 'loc-iran-country-study-1987', loc: { section: 'Kurds', para: '6' } }
        ],
        heldBy: [
          { kind: 'organization', name: 'Library of Congress, Federal Research Division' }
        ]
      }
    ]
  }
})
