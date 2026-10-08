import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'first-intifada',
  names: [
    { text: 'First Intifada', lang: 'en', role: 'primary' },
    { text: 'الانتفاضة الأولى', lang: 'ar', role: 'native' },
    { text: 'האינתיפאדה הראשונה', lang: 'he', role: 'native' },
    {
      text: 'Palestinian uprising',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'loc-israel-country-study-1988',
          loc: { section: 'Civilian Administration in the West Bank and the Gaza Strip', para: '1' }
        }
      ]
    }
  ],
  researched: '2026-10-08',
  type: 'uprising',
  start: {
    alts: [
      {
        value: { d: '1987-12' },
        cites: [
          {
            source: 'loc-israel-country-study-1988',
            loc: {
              section: 'Civilian Administration in the West Bank and the Gaza Strip',
              para: '1'
            }
          },
          {
            source: 'state-dept-milestones-madrid-conference',
            loc: { section: 'The Madrid Conference, 1991', para: '5' }
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
          source: 'loc-israel-country-study-1988',
          loc: { section: 'Civilian Administration in the West Bank and the Gaza Strip', para: '1' }
        }
      ]
    },
    {
      ref: 'place:west-bank',
      cites: [
        {
          source: 'loc-israel-country-study-1988',
          loc: { section: 'Civilian Administration in the West Bank and the Gaza Strip', para: '1' }
        }
      ]
    }
  ],
  partOf: [
    { ref: 'period:cold-war' }
  ],
  polities: [
    { ref: 'polity:state-of-israel' }
  ],
  sides: [
    {
      key: 'palestinians',
      name: 'Palestinians of the West Bank and the Gaza Strip',
      cites: [
        {
          source: 'state-dept-milestones-madrid-conference',
          loc: { section: 'The Madrid Conference, 1991', para: '5' }
        }
      ]
    },
    {
      key: 'israel',
      name: 'Israel Defense Forces',
      polity: 'polity:state-of-israel',
      cites: [
        {
          source: 'hrw-1990-the-israeli-army-and-the-intifada-introduction',
          loc: { section: 'Introduction', para: '2' }
        }
      ]
    }
  ],
  participants: [
    {
      name: 'George Shultz',
      role: 'negotiator',
      cites: [
        {
          source: 'state-dept-milestones-madrid-conference',
          loc: { section: 'The Madrid Conference, 1991', para: '5' }
        }
      ]
    },
    {
      name: 'Yitzhak Shamir',
      role: 'head-of-government',
      side: 'israel',
      cites: [
        {
          source: 'state-dept-milestones-madrid-conference',
          loc: { section: 'The Madrid Conference, 1991', para: '6' }
        }
      ]
    },
    {
      name: 'Yasir Arafat',
      role: 'leader',
      side: 'palestinians',
      cites: [
        {
          source: 'state-dept-milestones-madrid-conference',
          loc: { section: 'The Madrid Conference, 1991', para: '6' }
        }
      ]
    },
    {
      name: 'King Hussein of Jordan',
      role: 'head-of-state',
      cites: [
        {
          source: 'state-dept-milestones-madrid-conference',
          loc: { section: 'The Madrid Conference, 1991', para: '5' }
        }
      ]
    }
  ],
  figures: [
    {
      key: 'deaths',
      side: 'palestinians',
      value: {
        alts: [
          {
            value: { min: 670, qualifier: 'over' },
            cites: [
              {
                source: 'hrw-1990-the-israeli-army-and-the-intifada-introduction',
                loc: { section: 'Introduction', para: '2' }
              }
            ],
            heldBy: [
              { kind: 'organization', name: 'Middle East Watch (Human Rights Watch)' }
            ]
          }
        ]
      }
    }
  ],
  related: [
    {
      ref: 'event:six-day-war',
      rel: 'related',
      cites: [
        {
          source: 'loc-israel-country-study-1988',
          loc: { section: 'Civilian Administration in the West Bank and the Gaza Strip', para: '1' }
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
          text: 'In December 1987, the Palestinians of the West Bank and the Gaza Strip had risen up against Israeli military rule.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-madrid-conference',
            loc: { section: 'The Madrid Conference, 1991', para: '5' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://history.state.gov/milestones/1989-1992/madrid-conference'
          }
        },
        {
          id: 'q2',
          text: 'The Palestinian uprising (intifadah) in the West Bank and the Gaza Strip that began in December 1987, however, had a profound impact on the relationship between the civilian administration and the Palestinian inhabitants of the occupied territories.',
          lang: 'en',
          cite: {
            source: 'loc-israel-country-study-1988',
            loc: {
              section: 'Civilian Administration in the West Bank and the Gaza Strip',
              para: '1'
            }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/israel/86.htm' }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q3',
          text: 'A civilian administration has been set up in the West Bank and the Gaza Strip as an interim measure pending final resolution of the political future of these two areas, which are not part of Israel proper.',
          lang: 'en',
          cite: {
            source: 'loc-israel-country-study-1988',
            loc: {
              section: 'Civilian Administration in the West Bank and the Gaza Strip',
              para: '1'
            }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/israel/86.htm' }
        }
      ]
    },
    {
      kind: 'course',
      quotes: [
        {
          id: 'q4',
          text: 'During the first 31 months of the intifada, Israeli security forces(1) killed over 670 Palestinians and injured many thousands more.',
          lang: 'en',
          cite: {
            source: 'hrw-1990-the-israeli-army-and-the-intifada-introduction',
            loc: { section: 'Introduction', para: '2' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.hrw.org/legacy/campaigns/israel/intifada-intro.htm'
          }
        },
        {
          id: 'q5',
          text: 'Israeli authorities lay the blame for these casualties on the Palestinians, arguing that their violent resistance to Israeli troops has necessitated a forceful response to restore and maintain order.',
          lang: 'en',
          cite: {
            source: 'hrw-1990-the-israeli-army-and-the-intifada-introduction',
            loc: { section: 'Introduction', para: '2' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.hrw.org/legacy/campaigns/israel/intifada-intro.htm'
          }
        },
        {
          id: 'q6',
          text: 'Of the approximately 450 killings by security forces through the end of June 1989 -- a date chosen to allow the IDF over one year to have completed an investigation and brought a case to trial -- there were no more than 16 cases in which soldiers were court-martialed for causing death',
          lang: 'en',
          cite: {
            source: 'hrw-1990-the-israeli-army-and-the-intifada-introduction',
            loc: { section: 'Introduction', para: '7' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.hrw.org/legacy/campaigns/israel/intifada-intro.htm'
          }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q7',
          text: 'Hoping to stop the violence and address Palestinian grievances, Secretary of State George Shultz called for an international convention that would serve as a prelude to direct negotiations between Israel, Jordan, and local Palestinians on interim autonomy for the occupied territories',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-madrid-conference',
            loc: { section: 'The Madrid Conference, 1991', para: '5' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://history.state.gov/milestones/1989-1992/madrid-conference'
          }
        },
        {
          id: 'q8',
          text: 'In the view of Middle East Watch, these policies -- the permissive rules of engagement, the deficiencies in the investigative process, and the obstacles placed in the way of independent monitors -- reflect a lack of political will on the part of Israeli authorities to establish a meaningful system of accountability for unjustified killings of Palestinians.',
          lang: 'en',
          cite: {
            source: 'hrw-1990-the-israeli-army-and-the-intifada-introduction',
            loc: { section: 'Introduction', para: '15' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.hrw.org/legacy/campaigns/israel/intifada-intro.htm'
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
            value: { d: '1987-12' },
            cites: [
              {
                source: 'loc-israel-country-study-1988',
                loc: { section: 'EDUCATION', para: '7' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q9',
        text: 'After the outbreak of the intifadah (uprising) in December 1987, frequent school closings occurred so that students attended school only infrequently.',
        lang: 'en',
        cite: { source: 'loc-israel-country-study-1988', loc: { section: 'EDUCATION', para: '7' } },
        provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/israel/59.htm' }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1988-02' },
            cites: [
              {
                source: 'hrw-1990-the-israeli-army-and-the-intifada-introduction',
                loc: { section: 'Introduction', para: '12' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q10',
        text: 'One vivid example of this external pressure occurred in February 1988, when a CBS News crew outside Nablus used a telephoto lens to film four soldiers holding down two Palestinians and systematically pounding their arms with rocks.',
        lang: 'en',
        cite: {
          source: 'hrw-1990-the-israeli-army-and-the-intifada-introduction',
          loc: { section: 'Introduction', para: '12' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-08',
          url: 'https://www.hrw.org/legacy/campaigns/israel/intifada-intro.htm'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1988-07' },
            cites: [
              {
                source: 'state-dept-milestones-madrid-conference',
                loc: { section: 'The Madrid Conference, 1991', para: '5' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q11',
        text: 'In July 1988, Jordan’s King Hussein rendered the Shultz Plan unworkable when he renounced his kingdom’s links to the West Bank.',
        lang: 'en',
        cite: {
          source: 'state-dept-milestones-madrid-conference',
          loc: { section: 'The Madrid Conference, 1991', para: '5' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-08',
          url: 'https://history.state.gov/milestones/1989-1992/madrid-conference'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1988-11' },
            cites: [
              {
                source: 'state-dept-milestones-madrid-conference',
                loc: { section: 'The Madrid Conference, 1991', para: '6' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q12',
        text: 'In November 1988, the PLO finally met U.S. demand that it renounce terrorism and accept U.N. Security Council Resolutions 242 and 338, which called for Arab-Israeli peace and mutual recognition accompanied by Israeli withdrawal from “territories” it had occupied in 1967.',
        lang: 'en',
        cite: {
          source: 'state-dept-milestones-madrid-conference',
          loc: { section: 'The Madrid Conference, 1991', para: '6' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-08',
          url: 'https://history.state.gov/milestones/1989-1992/madrid-conference'
        }
      }
    }
  ],
  hero: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/b/b1/School_girls_wait_in_line_to_collect_UNRWA_prepared_food_parcels_during_the_first_intifada_in_1988.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:School_girls_wait_in_line_to_collect_UNRWA_prepared_food_parcels_during_the_first_intifada_in_1988.jpg',
    credit: {
      institution: 'UNRWA Archive (United Nations Relief and Works Agency for Palestine Refugees in the Near East)',
      creator: 'Zaven Mazakian'
    },
    license: {
      id: 'cc-by-sa',
      version: '3.0',
      url: 'https://creativecommons.org/licenses/by-sa/3.0/igo/deed.en'
    }
  }
})
