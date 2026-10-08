import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'iran-iraq-war',
  names: [
    { text: 'Iran–Iraq War', lang: 'en', role: 'primary' },
    { text: 'جنگ ایران و عراق', lang: 'fa', role: 'native' },
    { text: 'الحرب العراقية الإيرانية', lang: 'ar', role: 'native' },
    {
      text: 'Imposed War',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'iranica-gieling-iraq-vii-iran-iraq-war',
          loc: { section: 'IRAQ vii. IRAN-IRAQ WAR', para: '2' }
        }
      ]
    },
    {
      text: 'جنگ تحمیلی',
      lang: 'fa',
      role: 'alternative',
      translit: 'jang-e taḥmili',
      cites: [
        {
          source: 'iranica-gieling-iraq-vii-iran-iraq-war',
          loc: { section: 'IRAQ vii. IRAN-IRAQ WAR', para: '2' }
        }
      ]
    }
  ],
  researched: '2026-10-08',
  type: 'war',
  start: {
    alts: [
      {
        value: { d: '1980-09-22' },
        cites: [
          {
            source: 'iranica-gieling-iraq-vii-iran-iraq-war',
            loc: { section: 'IRAQ vii. IRAN-IRAQ WAR', para: '2' }
          },
          {
            source: 'iranica-gieling-iraq-vii-iran-iraq-war',
            loc: { section: 'IRAQ vii. IRAN-IRAQ WAR', para: '3' }
          },
          {
            source: 'loc-iraq-country-study-1988',
            loc: { section: 'Iraqi Offensives, 1980-82', para: '1' }
          }
        ]
      },
      {
        value: { d: '1980-09-23' },
        cites: [
          {
            source: 'loc-iraq-country-study-1988',
            loc: { section: 'THE IRAN-IRAQ CONFLICT', para: '6' }
          }
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
            source: 'iranica-kechichian-boundaries-iv-with-iraq',
            loc: { section: 'BOUNDARIES iv. With Iraq', para: '5' }
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
  prominence: 1,
  places: [
    {
      ref: 'place:shatt-al-arab',
      cites: [
        {
          source: 'iranica-gieling-iraq-vii-iran-iraq-war',
          loc: { section: 'IRAQ vii. IRAN-IRAQ WAR', para: '8' }
        }
      ]
    },
    {
      ref: 'place:khorramshahr',
      cites: [
        {
          source: 'iranica-gieling-iraq-vii-iran-iraq-war',
          loc: { section: 'IRAQ vii. IRAN-IRAQ WAR', para: '23' }
        }
      ]
    },
    {
      ref: 'place:abadan',
      cites: [
        {
          source: 'iranica-gieling-iraq-vii-iran-iraq-war',
          loc: { section: 'IRAQ vii. IRAN-IRAQ WAR', para: '23' }
        }
      ]
    },
    {
      ref: 'place:kharg-island',
      cites: [
        {
          source: 'iranica-gieling-iraq-vii-iran-iraq-war',
          loc: { section: 'IRAQ vii. IRAN-IRAQ WAR', para: '35' }
        }
      ]
    },
    {
      ref: 'place:basra',
      cites: [
        {
          source: 'iranica-gieling-iraq-vii-iran-iraq-war',
          loc: { section: 'IRAQ vii. IRAN-IRAQ WAR', para: '30' }
        }
      ]
    },
    {
      ref: 'place:persian-gulf',
      cites: [
        {
          source: 'iranica-gieling-iraq-vii-iran-iraq-war',
          loc: { section: 'IRAQ vii. IRAN-IRAQ WAR', para: '35' }
        }
      ]
    }
  ],
  partOf: [
    { ref: 'period:cold-war' }
  ],
  polities: [
    {
      ref: 'polity:united-states',
      cites: [
        {
          source: 'iranica-gieling-iraq-vii-iran-iraq-war',
          loc: { section: 'IRAQ vii. IRAN-IRAQ WAR', para: '20' }
        }
      ]
    },
    {
      ref: 'polity:soviet-union',
      cites: [
        {
          source: 'iranica-gieling-iraq-vii-iran-iraq-war',
          loc: { section: 'IRAQ vii. IRAN-IRAQ WAR', para: '20' }
        }
      ]
    },
    {
      ref: 'polity:french-fifth-republic',
      cites: [
        {
          source: 'iranica-gieling-iraq-vii-iran-iraq-war',
          loc: { section: 'IRAQ vii. IRAN-IRAQ WAR', para: '20' }
        }
      ]
    },
    {
      ref: 'polity:state-of-israel',
      cites: [
        {
          source: 'iranica-gieling-iraq-vii-iran-iraq-war',
          loc: { section: 'IRAQ vii. IRAN-IRAQ WAR', para: '20' }
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
          loc: { section: 'IRAQ vii. IRAN-IRAQ WAR', para: '2' }
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
          loc: { section: 'IRAQ vii. IRAN-IRAQ WAR', para: '2' }
        }
      ]
    }
  ],
  participants: [
    {
      ref: 'person:saddam-hussein',
      role: 'leader',
      side: 'iraq',
      cites: [
        {
          source: 'loc-iraq-country-study-1988',
          loc: { section: 'THE IRAN-IRAQ WAR', para: '1' }
        },
        {
          source: 'iranica-gieling-iraq-vii-iran-iraq-war',
          loc: { section: 'IRAQ vii. IRAN-IRAQ WAR', para: '11' }
        }
      ]
    },
    {
      ref: 'person:ruhollah-khomeini',
      role: 'leader',
      side: 'iran',
      cites: [
        {
          source: 'iranica-gieling-iraq-vii-iran-iraq-war',
          loc: { section: 'IRAQ vii. IRAN-IRAQ WAR', para: '45' }
        },
        {
          source: 'loc-iran-country-study-1987',
          loc: { section: 'The Bani Sadr Presidency', para: '12' }
        }
      ]
    },
    {
      ref: 'person:abolhassan-banisadr',
      role: 'commander',
      side: 'iran',
      cites: [
        {
          source: 'iranica-gieling-iraq-vii-iran-iraq-war',
          loc: { section: 'IRAQ vii. IRAN-IRAQ WAR', para: '27' }
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
      name: 'Tariq Aziz',
      role: 'diplomat',
      side: 'iraq',
      cites: [
        {
          source: 'iranica-gieling-iraq-vii-iran-iraq-war',
          loc: { section: 'IRAQ vii. IRAN-IRAQ WAR', para: '4' }
        }
      ]
    }
  ],
  figures: [
    {
      key: 'casualties',
      value: {
        alts: [
          {
            value: { min: 1000000 },
            cites: [
              {
                source: 'iranica-gieling-iraq-vii-iran-iraq-war',
                loc: { section: 'IRAQ vii. IRAN-IRAQ WAR', para: '2' }
              }
            ],
            heldBy: [
              { kind: 'scholar', name: 'Dilip Hiro' }
            ]
          }
        ]
      }
    }
  ],
  related: [
    {
      ref: 'event:iran-hostage-crisis',
      rel: 'preceded-by',
      cites: [
        {
          source: 'loc-iran-country-study-1987',
          loc: { section: 'The Bani Sadr Presidency', para: '11' }
        }
      ]
    },
    {
      ref: 'event:iran-contra-affair',
      rel: 'related',
      cites: [
        {
          source: 'iranica-gieling-iraq-vii-iran-iraq-war',
          loc: { section: 'IRAQ vii. IRAN-IRAQ WAR', para: '20' }
        }
      ]
    },
    {
      ref: 'event:halabja-chemical-attack',
      rel: 'contributed-to',
      cites: [
        {
          source: 'iranica-gieling-iraq-vii-iran-iraq-war',
          loc: { section: 'IRAQ vii. IRAN-IRAQ WAR', para: '42' }
        }
      ]
    },
    {
      ref: 'event:iran-air-flight-655',
      rel: 'related',
      cites: [
        {
          source: 'iranica-gieling-iraq-vii-iran-iraq-war',
          loc: { section: 'IRAQ vii. IRAN-IRAQ WAR', para: '43' }
        }
      ]
    },
    {
      ref: 'event:iran-iraq-boundary-treaty-of-1937',
      rel: 'preceded-by',
      cites: [
        {
          source: 'iranica-gieling-iraq-vii-iran-iraq-war',
          loc: { section: 'IRAQ vii. IRAN-IRAQ WAR', para: '9' }
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
          text: 'The war between Iran and Iraq, lasting nearly eight years, commenced with the Iraqi invasion of Iran on 22 September 1980, and ended with the bilateral acceptance of the UN Security Council Resolution 598 on 20 July 1988.',
          lang: 'en',
          cite: {
            source: 'iranica-gieling-iraq-vii-iran-iraq-war',
            loc: { section: 'IRAQ vii. IRAN-IRAQ WAR', para: '2' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.iranicaonline.org/articles/iraq-vii-iran-iraq-war'
          }
        },
        {
          id: 'q2',
          text: 'Considered by Iranians as “imposed war” (jang-e taḥmili), the Iran-Iraq War has been called “the longest conventional war of the 20th century,” and cost 1 million casualties and $1.19 trillion',
          lang: 'en',
          cite: {
            source: 'iranica-gieling-iraq-vii-iran-iraq-war',
            loc: { section: 'IRAQ vii. IRAN-IRAQ WAR', para: '2' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.iranicaonline.org/articles/iraq-vii-iran-iraq-war'
          }
        },
        {
          id: 'q3',
          text: 'The Iran-Iraq War was multifaceted and included religious schisms, border disputes, and political differences.',
          lang: 'en',
          cite: {
            source: 'loc-iraq-country-study-1988',
            loc: { section: 'THE IRAN-IRAQ WAR', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/iraq/101.htm' }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q4',
          text: 'The main dispute revolved around the demarcation of the boundary in the Shatt al-Arab waterway and the Iraqi claim to the Iranian province of Khuzestan.',
          lang: 'en',
          cite: {
            source: 'iranica-gieling-iraq-vii-iran-iraq-war',
            loc: { section: 'IRAQ vii. IRAN-IRAQ WAR', para: '8' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.iranicaonline.org/articles/iraq-vii-iran-iraq-war'
          }
        },
        {
          id: 'q5',
          text: 'The final 55 miles of the 130-mile Shatt al-Arab waterway form the frontier between Iraq and Iran. The Shatt al-Arab is of economic and strategic importance to both countries. Basra, the only Iraqi port with an outlet to the Persian Gulf, lies 47 miles upstream, and large oil installations in both countries are located near the Shatt al-Arab',
          lang: 'en',
          cite: {
            source: 'iranica-gieling-iraq-vii-iran-iraq-war',
            loc: { section: 'IRAQ vii. IRAN-IRAQ WAR', para: '8' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.iranicaonline.org/articles/iraq-vii-iran-iraq-war'
          }
        },
        {
          id: 'q6',
          text: 'Iraq and Iran had engaged in border clashes for many years and had revived the dormant Shatt al Arab waterway dispute in 1979. Iraq claimed the 200-kilometer channel up to the Iranian shore as its territory, while Iran insisted that the thalweg--a line running down the middle of the waterway--negotiated last in 1975, was the official border. The Iraqis, especially the Baath leadership, regarded the 1975 treaty as merely a truce, not a definitive settlement.',
          lang: 'en',
          cite: {
            source: 'loc-iraq-country-study-1988',
            loc: { section: 'THE IRAN-IRAQ WAR', para: '2' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/iraq/101.htm' }
        },
        {
          id: 'q7',
          text: 'The friction between Iran and Iraq led to border incidents, beginning in April 1980. The Iraqi government feared the disturbed situation in Iran would undo the 1975 Algiers Agreement concluded with the shah',
          lang: 'en',
          cite: {
            source: 'loc-iran-country-study-1987',
            loc: { section: 'The Bani Sadr Presidency', para: '12' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/iran/25.htm' }
        }
      ]
    },
    {
      kind: 'causes',
      quotes: [
        {
          id: 'q8',
          text: 'The ideology of the Islamic Republic of Iran, and especially the attempt to export the Islamic revolution to other Muslim countries, was seen by Iraqi leaders as a threat to the secular ideology of their Ba’th party and as a danger to the stability of the country.',
          lang: 'en',
          cite: {
            source: 'iranica-gieling-iraq-vii-iran-iraq-war',
            loc: { section: 'IRAQ vii. IRAN-IRAQ WAR', para: '12' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.iranicaonline.org/articles/iraq-vii-iran-iraq-war'
          }
        },
        {
          id: 'q9',
          text: 'The Iraqis also perceived revolutionary Iran\'s Islamic agenda as threatening to their pan-Arabism.',
          lang: 'en',
          cite: {
            source: 'loc-iraq-country-study-1988',
            loc: { section: 'THE IRAN-IRAQ WAR', para: '3' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/iraq/101.htm' }
        },
        {
          id: 'q10',
          text: 'The deterioration of Iran’s economy may also have been a factor in the Iraqi invasion.',
          lang: 'en',
          cite: {
            source: 'iranica-gieling-iraq-vii-iran-iraq-war',
            loc: { section: 'IRAQ vii. IRAN-IRAQ WAR', para: '16' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.iranicaonline.org/articles/iraq-vii-iran-iraq-war'
          }
        }
      ]
    },
    {
      kind: 'course',
      quotes: [
        {
          id: 'q11',
          text: 'Concurrently with its air attack, Iraq ordered six of its divisions across the border into Iran, where they drove as far as eight kilometers inland and occupied 1,000 square kilometers of Iranian territory.',
          lang: 'en',
          cite: {
            source: 'loc-iraq-country-study-1988',
            loc: { section: 'Iraqi Offensives, 1980-82', para: '2' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/iraq/102.htm' }
        },
        {
          id: 'q12',
          text: 'The second offensive, which consisted of two separate attacks, was a major turning point in the war.',
          lang: 'en',
          cite: {
            source: 'iranica-gieling-iraq-vii-iran-iraq-war',
            loc: { section: 'IRAQ vii. IRAN-IRAQ WAR', para: '27' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.iranicaonline.org/articles/iraq-vii-iran-iraq-war'
          }
        },
        {
          id: 'q13',
          text: 'In late June 1982, Baghdad stated its willingness to negotiate a settlement of the war and to withdraw its forces from Iran. Iran refused, and in July 1982 Iran launched Operation Ramadan on Iraqi territory, near Basra.',
          lang: 'en',
          cite: {
            source: 'loc-iraq-country-study-1988',
            loc: { section: 'Iraqi Retreats, 1982-84', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/iraq/103.htm' }
        },
        {
          id: 'q14',
          text: 'The Iranian offensive seemed to be a repetition of the Iraqi invasion in September 1980.',
          lang: 'en',
          cite: {
            source: 'iranica-gieling-iraq-vii-iran-iraq-war',
            loc: { section: 'IRAQ vii. IRAN-IRAQ WAR', para: '32' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.iranicaonline.org/articles/iraq-vii-iran-iraq-war'
          }
        },
        {
          id: 'q15',
          text: 'In March 1984, Iraq initiated sustained naval operations in its self-declared 1,126-kilometer maritime exclusion zone, extending from the mouth of the Shatt al Arab to Iran\'s port of Bushehr.',
          lang: 'en',
          cite: {
            source: 'loc-iraq-country-study-1988',
            loc: { section: 'The Tanker War, 1984-87', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/iraq/105.htm' }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q16',
          text: 'Iran’s decision to end the war was based on a number of factors. Chief among these were the recent military defeats caused by the shortage of arms, Iran’s international isolation, deteriorating economic conditions, American presence in the Persian Gulf, the war expenditure, and heavy casualties',
          lang: 'en',
          cite: {
            source: 'iranica-gieling-iraq-vii-iran-iraq-war',
            loc: { section: 'IRAQ vii. IRAN-IRAQ WAR', para: '45' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.iranicaonline.org/articles/iraq-vii-iran-iraq-war'
          }
        },
        {
          id: 'q17',
          text: 'The war created economic dislocation, decreased industrial and petroleum development, and caused further deterioration of the agricultural sector, which had already suffered from the flight of landlords in 1979 and 1980.',
          lang: 'en',
          cite: {
            source: 'loc-iran-country-study-1987',
            loc: { section: 'THE IRAQ WAR', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/iran/64.htm' }
        },
        {
          id: 'q18',
          text: 'Two years later, on 15 July 1990, two weeks after the Iraqi invasion of Kuwait, Saddam Hussein finally offered a permanent settlement to the war, which technically had not yet ended. He announced that Iraq would accept the Algiers Protocol of 1975, accept joint sovereignty over the Shatt-al-Arab waterway',
          lang: 'en',
          cite: {
            source: 'iranica-gieling-iraq-vii-iran-iraq-war',
            loc: { section: 'IRAQ vii. IRAN-IRAQ WAR', para: '47' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
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
            value: { d: '1980-09-22' },
            cites: [
              {
                source: 'iranica-gieling-iraq-vii-iran-iraq-war',
                loc: { section: 'IRAQ vii. IRAN-IRAQ WAR', para: '23' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q19',
        text: 'The war began on 22 September 1980, when Iraq launched air raids against ten major Iranian airports and invaded Iranian territory on the ground along three fronts.',
        lang: 'en',
        cite: {
          source: 'iranica-gieling-iraq-vii-iran-iraq-war',
          loc: { section: 'IRAQ vii. IRAN-IRAQ WAR', para: '23' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-08',
          url: 'https://www.iranicaonline.org/articles/iraq-vii-iran-iraq-war'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1980-10-24' },
            cites: [
              {
                source: 'iranica-gieling-iraq-vii-iran-iraq-war',
                loc: { section: 'IRAQ vii. IRAN-IRAQ WAR', para: '23' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q20',
        text: 'On 24 October, at the cost of heavy losses, only Khorramshahr was occupied by the Iraqis; Abadan was also besieged but held out.',
        lang: 'en',
        cite: {
          source: 'iranica-gieling-iraq-vii-iran-iraq-war',
          loc: { section: 'IRAQ vii. IRAN-IRAQ WAR', para: '23' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-08',
          url: 'https://www.iranicaonline.org/articles/iraq-vii-iran-iraq-war'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1981-01-05' },
            cites: [
              {
                source: 'iranica-gieling-iraq-vii-iran-iraq-war',
                loc: { section: 'IRAQ vii. IRAN-IRAQ WAR', para: '26' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q21',
        text: 'On 5 January 1981, the Iranians for the first time launched a counteroffensive.',
        lang: 'en',
        cite: {
          source: 'iranica-gieling-iraq-vii-iran-iraq-war',
          loc: { section: 'IRAQ vii. IRAN-IRAQ WAR', para: '26' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-08',
          url: 'https://www.iranicaonline.org/articles/iraq-vii-iran-iraq-war'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1982-03-22' },
            cites: [
              {
                source: 'iranica-gieling-iraq-vii-iran-iraq-war',
                loc: { section: 'IRAQ vii. IRAN-IRAQ WAR', para: '26' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q22',
        text: 'These offensives were followed by an even more successful attack on 22 March 1982.',
        lang: 'en',
        cite: {
          source: 'iranica-gieling-iraq-vii-iran-iraq-war',
          loc: { section: 'IRAQ vii. IRAN-IRAQ WAR', para: '26' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-08',
          url: 'https://www.iranicaonline.org/articles/iraq-vii-iran-iraq-war'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1982-05-24' },
            cites: [
              {
                source: 'iranica-gieling-iraq-vii-iran-iraq-war',
                loc: { section: 'IRAQ vii. IRAN-IRAQ WAR', para: '27' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q23',
        text: 'Although the Iraqi forces expected the attack and had fortified the city, they were not able to defend it against the Iranian forces, who entered the city on 24-25 May',
        lang: 'en',
        cite: {
          source: 'iranica-gieling-iraq-vii-iran-iraq-war',
          loc: { section: 'IRAQ vii. IRAN-IRAQ WAR', para: '27' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-08',
          url: 'https://www.iranicaonline.org/articles/iraq-vii-iran-iraq-war'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1982-06-20' },
            cites: [
              {
                source: 'iranica-gieling-iraq-vii-iran-iraq-war',
                loc: { section: 'IRAQ vii. IRAN-IRAQ WAR', para: '28' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q24',
        text: 'Saddam Hussein announced on 20 June 1982 that all Iraqi troops had started to withdraw from Iranian soil.',
        lang: 'en',
        cite: {
          source: 'iranica-gieling-iraq-vii-iran-iraq-war',
          loc: { section: 'IRAQ vii. IRAN-IRAQ WAR', para: '28' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-08',
          url: 'https://www.iranicaonline.org/articles/iraq-vii-iran-iraq-war'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1982-07-13' },
            cites: [
              {
                source: 'iranica-gieling-iraq-vii-iran-iraq-war',
                loc: { section: 'IRAQ vii. IRAN-IRAQ WAR', para: '30' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q25',
        text: 'On 13 July, the first day of Ramażān, it was clear that the decision had gone against the military.',
        lang: 'en',
        cite: {
          source: 'iranica-gieling-iraq-vii-iran-iraq-war',
          loc: { section: 'IRAQ vii. IRAN-IRAQ WAR', para: '30' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-08',
          url: 'https://www.iranicaonline.org/articles/iraq-vii-iran-iraq-war'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1984-03-30' },
            cites: [
              {
                source: 'iranica-gieling-iraq-vii-iran-iraq-war',
                loc: { section: 'IRAQ vii. IRAN-IRAQ WAR', para: '34' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q26',
        text: 'On 30 March 1984, after allegations by Iran that Iraq had used chemical weapons, the President of the UN Security Council stated there was unanimous agreement among UN-appointed experts that chemical weapons had been used in the war.',
        lang: 'en',
        cite: {
          source: 'iranica-gieling-iraq-vii-iran-iraq-war',
          loc: { section: 'IRAQ vii. IRAN-IRAQ WAR', para: '34' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-08',
          url: 'https://www.iranicaonline.org/articles/iraq-vii-iran-iraq-war'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1984-03' },
            cites: [
              {
                source: 'iranica-gieling-iraq-vii-iran-iraq-war',
                loc: { section: 'IRAQ vii. IRAN-IRAQ WAR', para: '36' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q27',
        text: 'In March 1984, Iraq for the first time used the Super Etendards in an attack on a Greek tanker in the Persian Gulf.',
        lang: 'en',
        cite: {
          source: 'iranica-gieling-iraq-vii-iran-iraq-war',
          loc: { section: 'IRAQ vii. IRAN-IRAQ WAR', para: '36' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-08',
          url: 'https://www.iranicaonline.org/articles/iraq-vii-iran-iraq-war'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1986-02' },
            cites: [
              {
                source: 'iranica-gieling-iraq-vii-iran-iraq-war',
                loc: { section: 'IRAQ vii. IRAN-IRAQ WAR', para: '38' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q28',
        text: 'In February 1986, Iran launched Wa’l-fajr VIII, which, with the occupation of Fāʾu peninsula, turned out to be its greatest success since the liberation of Khorramshahr.',
        lang: 'en',
        cite: {
          source: 'iranica-gieling-iraq-vii-iran-iraq-war',
          loc: { section: 'IRAQ vii. IRAN-IRAQ WAR', para: '38' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-08',
          url: 'https://www.iranicaonline.org/articles/iraq-vii-iran-iraq-war'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1987-07-20' },
            cites: [
              {
                source: 'iranica-gieling-iraq-vii-iran-iraq-war',
                loc: { section: 'IRAQ vii. IRAN-IRAQ WAR', para: '41' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q29',
        text: 'While the war continued on all fronts and other countries became more and more involved, the United Nations Security Council on 20 July 1987 unanimously accepted Resolution 598.',
        lang: 'en',
        cite: {
          source: 'iranica-gieling-iraq-vii-iran-iraq-war',
          loc: { section: 'IRAQ vii. IRAN-IRAQ WAR', para: '41' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-08',
          url: 'https://www.iranicaonline.org/articles/iraq-vii-iran-iraq-war'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1988-03-16' },
            cites: [
              {
                source: 'iranica-gieling-iraq-vii-iran-iraq-war',
                loc: { section: 'IRAQ vii. IRAN-IRAQ WAR', para: '42' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q30',
        text: 'On 16 March, the Iraqi air force used poison gas to attack Ḥalabja, an Iraqi town which had been captured by Iranian forces and their Iraqi Kurdish allies the day before.',
        lang: 'en',
        cite: {
          source: 'iranica-gieling-iraq-vii-iran-iraq-war',
          loc: { section: 'IRAQ vii. IRAN-IRAQ WAR', para: '42' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-08',
          url: 'https://www.iranicaonline.org/articles/iraq-vii-iran-iraq-war'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1988-07-03' },
            cites: [
              {
                source: 'iranica-gieling-iraq-vii-iran-iraq-war',
                loc: { section: 'IRAQ vii. IRAN-IRAQ WAR', para: '43' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q31',
        text: 'This was presumably the reason for the USS Vincennes’ downing of the Iran Air Airbus over the Strait of Hormuz on 3 July 1988 by a missile. The civilian airbus was on a regular flight from Bandar Abbas to Dubai, carrying 290 passengers.',
        lang: 'en',
        cite: {
          source: 'iranica-gieling-iraq-vii-iran-iraq-war',
          loc: { section: 'IRAQ vii. IRAN-IRAQ WAR', para: '43' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-08',
          url: 'https://www.iranicaonline.org/articles/iraq-vii-iran-iraq-war'
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
            ]
          }
        ]
      },
      quote: {
        id: 'q32',
        text: 'On 18 July 1988, President Khamene’i in a letter to Secretary-General Pérez de Cuéllar announced that Iran had accepted United Nations Security Council Resolution 598, which called for an immediate cease-fire.',
        lang: 'en',
        cite: {
          source: 'iranica-gieling-iraq-vii-iran-iraq-war',
          loc: { section: 'IRAQ vii. IRAN-IRAQ WAR', para: '45' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-08',
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
                source: 'iranica-kechichian-boundaries-iv-with-iraq',
                loc: { section: 'BOUNDARIES iv. With Iraq', para: '5' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q33',
        text: 'After eight years of war Iran and Iraq agreed to cease-fire on 29 Mordād 1367 Š./20 August 1988 and met under United Nations auspices to settle their border disputes.',
        lang: 'en',
        cite: {
          source: 'iranica-kechichian-boundaries-iv-with-iraq',
          loc: { section: 'BOUNDARIES iv. With Iraq', para: '5' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-08',
          url: 'https://www.iranicaonline.org/articles/boundaries-iv/'
        }
      }
    }
  ],
  hero: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/b/b4/Liberation_of_Khorramshahr_-_May_1982.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Liberation_of_Khorramshahr_-_May_1982.jpg',
    credit: { institution: 'BBC Persian' },
    license: { id: 'public-domain' }
  },
  furtherReading: [
    {
      source: 'velayati-2010-tarikh-siyasi-va-nezami-jang-e-iraq-ba-iran',
      perspective: 'iranian'
    },
    { source: 'alayi-2017-tarikh-tahlili-jang-e-iran-va-iraq', perspective: 'iranian' },
    {
      source: 'al-khazraji-2014-al-harb-al-iraqiyya-al-iraniyya-1980-1988-mudhakkirat-muqatil',
      perspective: 'arab'
    }
  ]
})
