import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'gaza-war-2008-2009',
  names: [
    { text: 'Gaza War (2008–2009)', lang: 'en', role: 'primary' },
    { text: 'حرب غزة', lang: 'ar', role: 'native' },
    {
      text: 'Operation Cast Lead',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'hrw-2010-world-report-israel-and-the-occupied-palestinian-territories',
          loc: { section: 'World Report 2010: Israel / Occupied Palestinian Territories (OPT)' }
        }
      ]
    },
    { text: 'מבצע עופרת יצוקה', lang: 'he', role: 'alternative' }
  ],
  researched: '2026-10-13',
  type: 'war',
  start: {
    alts: [
      {
        value: { d: '2008-12-27' },
        cites: [
          {
            source: 'hrw-2010-world-report-israel-and-the-occupied-palestinian-territories',
            loc: { section: 'World Report 2010: Israel / Occupied Palestinian Territories (OPT)' }
          }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '2009-01-18' },
        cites: [
          {
            source: 'hrw-2010-world-report-israel-and-the-occupied-palestinian-territories',
            loc: { section: 'World Report 2010: Israel / Occupied Palestinian Territories (OPT)' }
          }
        ]
      }
    ]
  },
  regions: ['mena'],
  prominence: 2,
  places: [
    {
      ref: 'place:gaza-strip',
      cites: [
        {
          source: 'hrw-2010-world-report-israel-and-the-occupied-palestinian-territories',
          loc: { section: 'World Report 2010: Israel / Occupied Palestinian Territories (OPT)' }
        }
      ]
    }
  ],
  polities: [
    {
      ref: 'polity:state-of-israel',
      cites: [
        {
          source: 'hrw-2010-world-report-israel-and-the-occupied-palestinian-territories',
          loc: { section: 'World Report 2010: Israel / Occupied Palestinian Territories (OPT)' }
        }
      ]
    }
  ],
  sides: [
    {
      key: 'israel',
      name: 'Israel',
      polity: 'polity:state-of-israel',
      cites: [
        {
          source: 'hrw-2010-world-report-israel-and-the-occupied-palestinian-territories',
          loc: { section: 'World Report 2010: Israel / Occupied Palestinian Territories (OPT)' }
        }
      ]
    },
    {
      key: 'palestinian-armed-groups',
      name: 'Hamas, Islamic Jihad and other Palestinian armed groups in Gaza',
      cites: [
        {
          source: 'hrw-2010-world-report-israel-and-the-occupied-palestinian-territories',
          loc: { section: 'World Report 2010: Israel / Occupied Palestinian Territories (OPT)' }
        }
      ]
    }
  ],
  figures: [
    {
      key: 'civilian-deaths',
      value: {
        alts: [
          {
            value: { min: 773 },
            cites: [
              {
                source: 'hrw-2010-world-report-israel-and-the-occupied-palestinian-territories',
                loc: {
                  section: 'World Report 2010: Israel / Occupied Palestinian Territories (OPT)'
                }
              }
            ],
            heldBy: [
              { kind: 'organization', name: 'B\'Tselem' }
            ]
          }
        ]
      }
    },
    {
      key: 'civilian-deaths',
      side: 'israel',
      value: {
        alts: [
          {
            value: { min: 3 },
            cites: [
              {
                source: 'hrw-2010-world-report-israel-and-the-occupied-palestinian-territories',
                loc: {
                  section: 'World Report 2010: Israel / Occupied Palestinian Territories (OPT)'
                }
              }
            ],
            heldBy: [
              { kind: 'organization', name: 'Human Rights Watch' }
            ]
          }
        ]
      }
    }
  ],
  related: [
    {
      ref: 'event:israeli-disengagement-from-gaza',
      rel: 'preceded-by',
      cites: [
        {
          source: 'hrw-2010-world-report-israel-and-the-occupied-palestinian-territories',
          loc: { section: 'World Report 2010: Israel / Occupied Palestinian Territories (OPT)' }
        }
      ]
    },
    {
      ref: 'event:second-intifada',
      rel: 'related',
      cites: [
        {
          source: 'hrw-2009-world-report-israel-and-the-occupied-palestinian-territories',
          loc: { section: 'World Report 2009: Israel/Occupied Palestinian Territories (OPT)' }
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
          text: 'The human rights crisis in the Israeli-occupied Palestinian territories worsened in 2009, particularly in Gaza, where Israeli forces killed hundreds of Palestinian civilians and destroyed civilian homes and infrastructure during Operation Cast Lead, a major military offensive that began on December 27, 2008 and ended on January 18, 2009.',
          lang: 'en',
          cite: {
            source: 'hrw-2010-world-report-israel-and-the-occupied-palestinian-territories',
            loc: { section: 'World Report 2010: Israel / Occupied Palestinian Territories (OPT)' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.hrw.org/world-report/2010/country-chapters/israel/palestine'
          }
        },
        {
          id: 'q2',
          text: 'Israel\'s continued blockade of Gaza denied basic goods to Gaza\'s 1.5 million residents and prevented post-war reconstruction.',
          lang: 'en',
          cite: {
            source: 'hrw-2010-world-report-israel-and-the-occupied-palestinian-territories',
            loc: { section: 'World Report 2010: Israel / Occupied Palestinian Territories (OPT)' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.hrw.org/world-report/2010/country-chapters/israel/palestine'
          }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q3',
          text: 'Palestinian civilians accounted for around half of those killed in Israeli military operations in Gaza prior to a June ceasefire between Hamas and Israel.',
          lang: 'en',
          cite: {
            source: 'hrw-2009-world-report-israel-and-the-occupied-palestinian-territories',
            loc: { section: 'World Report 2009: Israel/Occupied Palestinian Territories (OPT)' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.hrw.org/world-report/2009/country-chapters/israel/palestine'
          }
        },
        {
          id: 'q4',
          text: 'Israel\'s comprehensive blockade of the Gaza Strip has severe humanitarian and economic consequences for the civilian population.',
          lang: 'en',
          cite: {
            source: 'hrw-2009-world-report-israel-and-the-occupied-palestinian-territories',
            loc: { section: 'World Report 2009: Israel/Occupied Palestinian Territories (OPT)' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.hrw.org/world-report/2009/country-chapters/israel/palestine'
          }
        },
        {
          id: 'q5',
          text: 'Palestinian armed groups fired rockets and mortars indiscriminately into Israeli towns, particularly Sderot, killing four civilians and wounding others.',
          lang: 'en',
          cite: {
            source: 'hrw-2009-world-report-israel-and-the-occupied-palestinian-territories',
            loc: { section: 'World Report 2009: Israel/Occupied Palestinian Territories (OPT)' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.hrw.org/world-report/2009/country-chapters/israel/palestine'
          }
        }
      ]
    },
    {
      kind: 'course',
      quotes: [
        {
          id: 'q6',
          text: 'Hamas, Islamic Jihad and other Palestinian armed groups in Gaza fired rockets indiscriminately at Israeli cities and towns.',
          lang: 'en',
          cite: {
            source: 'hrw-2010-world-report-israel-and-the-occupied-palestinian-territories',
            loc: { section: 'World Report 2010: Israel / Occupied Palestinian Territories (OPT)' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.hrw.org/world-report/2010/country-chapters/israel/palestine'
          }
        },
        {
          id: 'q7',
          text: 'Israeli forces shelled densely populated areas with heavy artillery, including 155mm high explosive, and white phosphorous obscurant munitions, which are inherently indiscriminate when used in densely-populated areas.',
          lang: 'en',
          cite: {
            source: 'hrw-2010-world-report-israel-and-the-occupied-palestinian-territories',
            loc: { section: 'World Report 2010: Israel / Occupied Palestinian Territories (OPT)' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.hrw.org/world-report/2010/country-chapters/israel/palestine'
          }
        },
        {
          id: 'q8',
          text: 'Israeli soldiers unlawfully shot and killed at least 11 Palestinian civilians, including five women and four children, who were in groups waving white flags to convey their civilian status.',
          lang: 'en',
          cite: {
            source: 'hrw-2010-world-report-israel-and-the-occupied-palestinian-territories',
            loc: { section: 'World Report 2010: Israel / Occupied Palestinian Territories (OPT)' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.hrw.org/world-report/2010/country-chapters/israel/palestine'
          }
        },
        {
          id: 'q9',
          text: 'The unlawful use of white phosphorus was neither incidental nor accidental.',
          lang: 'en',
          cite: {
            source: 'hrw-2009-03-25-rain-of-fire-israels-unlawful-use-of-white-phosphorus-in-gaza',
            loc: { section: 'Rain of Fire: Israel\'s Unlawful Use of White Phosphorus in Gaza' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.hrw.org/report/2009/03/25/rain-fire/israels-unlawful-use-white-phosphorus-gaza'
          }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q10',
          text: 'During and after the war, Hamas forces in Gaza killed alleged collaborators with Israel and shot and maimed scores of political rivals.',
          lang: 'en',
          cite: {
            source: 'hrw-2010-world-report-israel-and-the-occupied-palestinian-territories',
            loc: { section: 'World Report 2010: Israel / Occupied Palestinian Territories (OPT)' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.hrw.org/world-report/2010/country-chapters/israel/palestine'
          }
        },
        {
          id: 'q11',
          text: 'From late December 2008 to at least March 2009, masked gunmen apparently affiliated with Hamas, killed at least 32 alleged collaborators with Israel-including men in custody or who posed no threat at the time-and shot or severely beat scores of other Palestinians, primarily members of the rival Fatah party.',
          lang: 'en',
          cite: {
            source: 'hrw-2010-world-report-israel-and-the-occupied-palestinian-territories',
            loc: { section: 'World Report 2010: Israel / Occupied Palestinian Territories (OPT)' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.hrw.org/world-report/2010/country-chapters/israel/palestine'
          }
        }
      ]
    },
    {
      kind: 'casualties',
      quotes: [
        {
          id: 'q12',
          text: 'Civilians suffered tremendously during the conflict in Gaza.',
          lang: 'en',
          cite: {
            source: 'hrw-2010-world-report-israel-and-the-occupied-palestinian-territories',
            loc: { section: 'World Report 2010: Israel / Occupied Palestinian Territories (OPT)' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.hrw.org/world-report/2010/country-chapters/israel/palestine'
          }
        },
        {
          id: 'q13',
          text: 'White phosphorus munitions did not kill the most civilians in Gaza – many more died from missiles, bombs, heavy artillery, tank shells, and small arms fire – but their use in densely populated neighborhoods, including downtown Gaza City, violated international humanitarian law (the laws of war), which requires taking all feasible precautions to avoid civilian harm and prohibits indiscriminate attacks.',
          lang: 'en',
          cite: {
            source: 'hrw-2009-03-25-rain-of-fire-israels-unlawful-use-of-white-phosphorus-in-gaza',
            loc: { section: 'Rain of Fire: Israel\'s Unlawful Use of White Phosphorus in Gaza' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.hrw.org/report/2009/03/25/rain-fire/israels-unlawful-use-white-phosphorus-gaza'
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
            value: { d: '2008-06' },
            cites: [
              {
                source: 'hrw-2009-world-report-israel-and-the-occupied-palestinian-territories',
                loc: { section: 'World Report 2009: Israel/Occupied Palestinian Territories (OPT)' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q14',
        text: 'More Palestinians were killed in Gaza by the Israel Defense Forces (IDF) in the first half of the year than in all of 2007 in both the West Bank and Gaza.',
        lang: 'en',
        cite: {
          source: 'hrw-2009-world-report-israel-and-the-occupied-palestinian-territories',
          loc: { section: 'World Report 2009: Israel/Occupied Palestinian Territories (OPT)' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-13',
          url: 'https://www.hrw.org/world-report/2009/country-chapters/israel/palestine'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '2008-11' },
            cites: [
              {
                source: 'hrw-2009-world-report-israel-and-the-occupied-palestinian-territories',
                loc: { section: 'World Report 2009: Israel/Occupied Palestinian Territories (OPT)' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q15',
        text: 'Israel reintroduced a complete blockade in November in retaliation for a wave of Palestinian rocket attacks.',
        lang: 'en',
        cite: {
          source: 'hrw-2009-world-report-israel-and-the-occupied-palestinian-territories',
          loc: { section: 'World Report 2009: Israel/Occupied Palestinian Territories (OPT)' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-13',
          url: 'https://www.hrw.org/world-report/2009/country-chapters/israel/palestine'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '2008-12-27' },
            cites: [
              {
                source: 'hrw-2009-03-25-rain-of-fire-israels-unlawful-use-of-white-phosphorus-in-gaza',
                loc: { section: 'Rain of Fire: Israel\'s Unlawful Use of White Phosphorus in Gaza' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q16',
        text: 'This report documents Israel\'s extensive use of white phosphorus munitions during its 22-day military operations in Gaza, from December 27, 2008 to January 18, 2009, named Operation Cast Lead.',
        lang: 'en',
        cite: {
          source: 'hrw-2009-03-25-rain-of-fire-israels-unlawful-use-of-white-phosphorus-in-gaza',
          loc: { section: 'Rain of Fire: Israel\'s Unlawful Use of White Phosphorus in Gaza' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-13',
          url: 'https://www.hrw.org/report/2009/03/25/rain-fire/israels-unlawful-use-white-phosphorus-gaza'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '2009-01-15' },
            cites: [
              {
                source: 'hrw-2009-03-25-rain-of-fire-israels-unlawful-use-of-white-phosphorus-in-gaza',
                loc: { section: 'Rain of Fire: Israel\'s Unlawful Use of White Phosphorus in Gaza' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q17',
        text: 'In the crowded Gaza City neighborhood of Tel al-Hawa, for example, Israeli forces on January 15 fired air-burst white phosphorus directly over homes and apartment buildings where civilians were living or taking shelter, killing at least four civilians from one family.',
        lang: 'en',
        cite: {
          source: 'hrw-2009-03-25-rain-of-fire-israels-unlawful-use-of-white-phosphorus-in-gaza',
          loc: { section: 'Rain of Fire: Israel\'s Unlawful Use of White Phosphorus in Gaza' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-13',
          url: 'https://www.hrw.org/report/2009/03/25/rain-fire/israels-unlawful-use-white-phosphorus-gaza'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '2009-01-17' },
            cites: [
              {
                source: 'hrw-2009-03-25-rain-of-fire-israels-unlawful-use-of-white-phosphorus-in-gaza',
                loc: { section: 'Rain of Fire: Israel\'s Unlawful Use of White Phosphorus in Gaza' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q18',
        text: 'At another well-marked UN facility – a school in Beit Lahiya sheltering roughly 1,600 displaced persons – the IDF air-burst at least three white phosphorus shells on January 17, the day before the cessation of major hostilities.',
        lang: 'en',
        cite: {
          source: 'hrw-2009-03-25-rain-of-fire-israels-unlawful-use-of-white-phosphorus-in-gaza',
          loc: { section: 'Rain of Fire: Israel\'s Unlawful Use of White Phosphorus in Gaza' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-13',
          url: 'https://www.hrw.org/report/2009/03/25/rain-fire/israels-unlawful-use-white-phosphorus-gaza'
        }
      }
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/0/08/Destruction_during_the_Gaza_War_in_2008.jpg/1280px-Destruction_during_the_Gaza_War_in_2008.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Destruction_during_the_Gaza_War_in_2008.jpg',
    credit: { creator: 'DYKT Mohigan' },
    license: { id: 'cc-by', version: '2.0', url: 'https://creativecommons.org/licenses/by/2.0' }
  }
})
