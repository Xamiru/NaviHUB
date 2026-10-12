import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'war-in-darfur',
  names: [
    { text: 'War in Darfur', lang: 'en', role: 'primary' },
    {
      text: 'Darfur conflict',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'hrw-2011-darfur-in-the-shadows',
          loc: { section: 'Darfur in the Shadows', para: '1' }
        }
      ]
    }
  ],
  researched: '2026-10-12',
  type: 'war',
  start: {
    alts: [
      {
        value: { d: '2003-02' },
        cites: [
          {
            source: 'hrw-2004-darfur-destroyed-summary',
            loc: { section: 'Summary', para: '3' }
          }
        ]
      }
    ]
  },
  regions: ['subsaharan-africa'],
  prominence: 2,
  places: [
    {
      ref: 'place:darfur',
      cites: [
        {
          source: 'hrw-2004-darfur-destroyed-background',
          loc: { section: 'Background', para: '1' }
        }
      ]
    },
    {
      ref: 'place:khartoum',
      cites: [
        {
          source: 'hrw-2005-world-report-sudan',
          loc: { section: 'World Report 2005: Sudan', para: '9' }
        }
      ]
    }
  ],
  sides: [
    {
      key: 'government-and-janjaweed',
      name: 'Government of Sudan and the Janjaweed militias',
      cites: [
        { source: 'hrw-2004-darfur-destroyed-summary', loc: { section: 'Summary', para: '1' } }
      ]
    },
    {
      key: 'rebels',
      name: 'Sudan Liberation Army/Movement and Justice and Equality Movement',
      cites: [
        { source: 'hrw-2004-darfur-destroyed-summary', loc: { section: 'Summary', para: '3' } }
      ]
    }
  ],
  participants: [
    {
      name: 'Omar al-Bashir',
      role: 'head-of-state',
      side: 'government-and-janjaweed',
      cites: [
        {
          source: 'hrw-2009-darfur-and-the-icc-myths-versus-reality',
          loc: { section: 'Darfur and the ICC: Myths versus Reality', para: '1' }
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
          text: 'The government of Sudan is responsible for “ethnic cleansing” and crimes against humanity in Darfur, one of the world’s poorest and most inaccessible regions, on Sudan’s western border with Chad.',
          lang: 'en',
          cite: {
            source: 'hrw-2004-darfur-destroyed-summary',
            loc: { section: 'Summary', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-12',
            url: 'https://web.archive.org/web/20230802123251/http://www.hrw.org/reports/2004/sudan0504/2.htm'
          }
        },
        {
          id: 'q2',
          text: 'As the people of Southern Sudan peacefully voted for secession from northern Sudan in January 2011, closing the book on a brutal civil war, the people of Darfur struggled to survive an armed conflict that now commands little international attention, despite renewed fighting in Darfur.',
          lang: 'en',
          cite: {
            source: 'hrw-2011-darfur-in-the-shadows',
            loc: { section: 'Darfur in the Shadows', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-12',
            url: 'https://web.archive.org/web/20231206033425/https://www.hrw.org/report/2011/06/05/darfur-shadows/sudanese-governments-ongoing-attacks-civilians-and-human-rights'
          }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q3',
          text: 'Darfur is Sudan’s largest region, on its western border with Libya, Chad, and the Central African Republic.',
          lang: 'en',
          cite: {
            source: 'hrw-2004-darfur-destroyed-background',
            loc: { section: 'Background', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-12',
            url: 'https://web.archive.org/web/20240211205703/https://www.hrw.org/reports/2004/sudan0504/4.htm'
          }
        },
        {
          id: 'q4',
          text: 'The Masalit, Fur, and other sedentary African farmers in Darfur have a history of clashes over land with pastoralists from Arab tribes, primarily the camel- and cattle-herding Beni Hussein from the Kabkabiya area of North Darfur and the Beni Halba of South Darfur.',
          lang: 'en',
          cite: {
            source: 'hrw-2004-darfur-destroyed-background',
            loc: { section: 'Background', para: '3' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-12',
            url: 'https://web.archive.org/web/20240211205703/https://www.hrw.org/reports/2004/sudan0504/4.htm'
          }
        },
        {
          id: 'q5',
          text: 'In recent decades, a combination of extended periods of drought; competition for dwindling resources; the lack of good governance and democracy; and easy availability of guns have made local clashes increasingly bloody and politicized.',
          lang: 'en',
          cite: {
            source: 'hrw-2004-darfur-destroyed-background',
            loc: { section: 'Background', para: '4' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-12',
            url: 'https://web.archive.org/web/20240211205703/https://www.hrw.org/reports/2004/sudan0504/4.htm'
          }
        }
      ]
    },
    {
      kind: 'causes',
      quotes: [
        {
          id: 'q6',
          text: 'The government has responded to this armed and political threat by targeting the civilian populations from which the rebels were drawn.',
          lang: 'en',
          cite: {
            source: 'hrw-2004-darfur-destroyed-summary',
            loc: { section: 'Summary', para: '4' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-12',
            url: 'https://web.archive.org/web/20230802123251/http://www.hrw.org/reports/2004/sudan0504/2.htm'
          }
        }
      ]
    },
    {
      kind: 'casualties',
      quotes: [
        {
          id: 'q7',
          text: 'By year’s end hundreds of villages were destroyed, an estimated 2 million civilians were forcibly displaced by the government of Sudan and its militias, and 70,000 died as a direct or indirect cause of this campaign.',
          lang: 'en',
          cite: {
            source: 'hrw-2005-world-report-sudan',
            loc: { section: 'World Report 2005: Sudan', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-12',
            url: 'https://web.archive.org/web/20240303050849/https://www.hrw.org/world-report/2005/country-chapters/sudan'
          }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q8',
          text: 'The 13 international organizations expelled employed 40 percent of all humanitarian staff working in Darfur.',
          lang: 'en',
          cite: {
            source: 'hrw-2009-darfur-and-the-icc-myths-versus-reality',
            loc: { section: 'Darfur and the ICC: Myths versus Reality', para: '6' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-12',
            url: 'https://web.archive.org/web/20231205030112/https://www.hrw.org/news/2009/03/27/darfur-and-icc-myths-versus-reality'
          }
        },
        {
          id: 'q9',
          text: 'The renewed fighting since December 2010, recalling earlier years of Darfur’s conflict, has resulted in scores of civilian casualties, destruction and looting of property, and the displacement of up to 70,000 people.',
          lang: 'en',
          cite: {
            source: 'hrw-2011-darfur-in-the-shadows',
            loc: { section: 'Darfur in the Shadows', para: '2' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-12',
            url: 'https://web.archive.org/web/20231206033425/https://www.hrw.org/report/2011/06/05/darfur-shadows/sudanese-governments-ongoing-attacks-civilians-and-human-rights'
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
            value: { d: '2003-02' },
            cites: [
              {
                source: 'hrw-2004-darfur-destroyed-summary',
                loc: { section: 'Summary', para: '3' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q10',
        text: 'This conflict has historical roots but escalated in February 2003, when two rebel groups, the Sudan Liberation Army/Movement (SLA/M) and the Justice and Equality Movement (JEM) drawn from members of the Fur, Masalit, and Zaghawa ethnic groups, demanded an end to chronic economic marginalization and sought power-sharing within the Arab-ruled Sudanese state.',
        lang: 'en',
        cite: { source: 'hrw-2004-darfur-destroyed-summary', loc: { section: 'Summary', para: '3' } },
        provenance: {
          via: 'web',
          at: '2026-10-12',
          url: 'https://web.archive.org/web/20230802123251/http://www.hrw.org/reports/2004/sudan0504/2.htm'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '2004-04-08' },
            cites: [
              {
                source: 'hrw-2005-world-report-sudan',
                loc: { section: 'World Report 2005: Sudan', para: '4' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q11',
        text: 'On April 8, a Humanitarian Ceasefire Agreement was signed in N’Djamena, Chad between the government of Sudan and the two Darfurian rebel movements under Chadian, African Union (A.U.), U.S. and E.U. auspices.',
        lang: 'en',
        cite: {
          source: 'hrw-2005-world-report-sudan',
          loc: { section: 'World Report 2005: Sudan', para: '4' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-12',
          url: 'https://web.archive.org/web/20240303050849/https://www.hrw.org/world-report/2005/country-chapters/sudan'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '2004-07-03' },
            cites: [
              {
                source: 'hrw-2005-world-report-sudan',
                loc: { section: 'World Report 2005: Sudan', para: '5' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q12',
        text: 'The government of Sudan again promised, this time signing a Joint Communiqué on July 3 with U.N. Secretary-General Kofi Annan, to disarm the Janjaweed, improve humanitarian access, human rights and security, and to seek a political resolution to the conflict.',
        lang: 'en',
        cite: {
          source: 'hrw-2005-world-report-sudan',
          loc: { section: 'World Report 2005: Sudan', para: '5' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-12',
          url: 'https://web.archive.org/web/20240303050849/https://www.hrw.org/world-report/2005/country-chapters/sudan'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '2004-07-30' },
            cites: [
              {
                source: 'hrw-2005-world-report-sudan',
                loc: { section: 'World Report 2005: Sudan', para: '5' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q13',
        text: 'Pressure increased with the adoption on July 30 of U.N. Security Council Resolution 1556 which reiterated the steps outlined in the Joint Communiqué, called for restrictions on arms transfers to all “non-governmental entities, including the Janjaweed,” and imposed a thirty-day deadline on the Sudanese government to disarm the Janjaweed militias.',
        lang: 'en',
        cite: {
          source: 'hrw-2005-world-report-sudan',
          loc: { section: 'World Report 2005: Sudan', para: '5' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-12',
          url: 'https://web.archive.org/web/20240303050849/https://www.hrw.org/world-report/2005/country-chapters/sudan'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '2004-09-18' },
            cites: [
              {
                source: 'hrw-2005-world-report-sudan',
                loc: { section: 'World Report 2005: Sudan', para: '6' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q14',
        text: 'The continued failure on the part of the government of Sudan to rein in the Janjaweed militias and halt all attacks by them and its other forces on civilians led the Security Council to pass resolution 1564 on September 18.',
        lang: 'en',
        cite: {
          source: 'hrw-2005-world-report-sudan',
          loc: { section: 'World Report 2005: Sudan', para: '6' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-12',
          url: 'https://web.archive.org/web/20240303050849/https://www.hrw.org/world-report/2005/country-chapters/sudan'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '2009-03-04' },
            cites: [
              {
                source: 'hrw-2009-darfur-and-the-icc-myths-versus-reality',
                loc: { section: 'Darfur and the ICC: Myths versus Reality', para: '1' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q15',
        text: 'On March 4, 2009, the International Criminal Court (ICC) issued an arrest warrant for President Omar al-Bashir of Sudan on charges of war crimes and crimes against humanity.',
        lang: 'en',
        cite: {
          source: 'hrw-2009-darfur-and-the-icc-myths-versus-reality',
          loc: { section: 'Darfur and the ICC: Myths versus Reality', para: '1' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-12',
          url: 'https://web.archive.org/web/20231205030112/https://www.hrw.org/news/2009/03/27/darfur-and-icc-myths-versus-reality'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '2009-03-05' },
            cites: [
              {
                source: 'hrw-2009-darfur-and-the-icc-myths-versus-reality',
                loc: { section: 'Darfur and the ICC: Myths versus Reality', para: '1' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q16',
        text: 'On March 5 the government of Sudan sought to divert attention from al-Bashir\'s alleged responsibility for widespread atrocities by announcing its intention to expel aid agencies from Darfur and blaming the ICC.',
        lang: 'en',
        cite: {
          source: 'hrw-2009-darfur-and-the-icc-myths-versus-reality',
          loc: { section: 'Darfur and the ICC: Myths versus Reality', para: '1' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-12',
          url: 'https://web.archive.org/web/20231205030112/https://www.hrw.org/news/2009/03/27/darfur-and-icc-myths-versus-reality'
        }
      }
    }
  ],
  hero: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/c/c1/Darfur_refugee_camp_in_Chad.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Darfur_refugee_camp_in_Chad.jpg',
    credit: { creator: 'Mark Knobil' },
    license: { id: 'cc-by', version: '2.0', url: 'https://creativecommons.org/licenses/by/2.0' }
  }
})
