import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'september-11-attacks',
  names: [
    { text: 'September 11 attacks', lang: 'en', role: 'primary' },
    {
      text: '9/11',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'millercenter-gregg-gw-bush-foreign-affairs',
          loc: { section: 'George W. Bush: Foreign Affairs', para: '10' }
        }
      ]
    }
  ],
  researched: '2026-10-12',
  type: 'other',
  start: {
    alts: [
      {
        value: { d: '2001-09-11' },
        cites: [
          {
            source: 'national-commission-2004-9-11-commission-report-executive-summary',
            loc: { section: 'Executive Summary', para: '4' }
          }
        ]
      }
    ]
  },
  regions: ['global'],
  prominence: 1,
  places: [
    {
      ref: 'place:new-york-city',
      cites: [
        {
          source: 'national-commission-2004-9-11-commission-report-chapter-1',
          loc: { section: '“We Have Some Planes”', para: '43' }
        }
      ]
    },
    {
      ref: 'place:washington-dc',
      cites: [
        {
          source: 'national-commission-2004-9-11-commission-report-executive-summary',
          loc: { section: 'Executive Summary', para: '6' }
        }
      ]
    }
  ],
  polities: [
    {
      ref: 'polity:united-states',
      cites: [
        {
          source: 'national-commission-2004-9-11-commission-report-executive-summary',
          loc: { section: 'Executive Summary', para: '1' }
        }
      ]
    }
  ],
  sides: [
    {
      key: 'al-qaeda',
      name: 'Al Qaeda',
      cites: [
        {
          source: 'national-commission-2004-9-11-commission-report-executive-summary',
          loc: { section: 'Executive Summary', para: '8' }
        }
      ]
    }
  ],
  participants: [
    {
      ref: 'person:osama-bin-laden',
      role: 'leader',
      side: 'al-qaeda',
      cites: [
        {
          source: 'national-commission-2004-9-11-commission-report-executive-summary',
          loc: { section: 'Executive Summary', para: '20' }
        }
      ]
    },
    {
      name: 'Khalid Sheikh Mohammed',
      role: 'organizer',
      side: 'al-qaeda',
      cites: [
        {
          source: 'national-commission-2004-9-11-commission-report-executive-summary',
          loc: { section: 'Executive Summary', para: '35' }
        }
      ]
    },
    {
      name: 'Mohamed Atta',
      role: 'perpetrator',
      side: 'al-qaeda',
      cites: [
        {
          source: 'national-commission-2004-9-11-commission-report-chapter-1',
          loc: { section: '“We Have Some Planes”', para: '5' }
        }
      ]
    },
    {
      ref: 'person:george-w-bush',
      role: 'head-of-state',
      cites: [
        {
          source: 'millercenter-gregg-gw-bush-foreign-affairs',
          loc: { section: 'George W. Bush: Foreign Affairs', para: '3' }
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
            value: { min: 3000, qualifier: 'nearly' },
            cites: [
              {
                source: 'european-union-history-of-the-european-union-2000-09',
                loc: { section: 'History of the European Union 2000-09', para: '5' }
              }
            ]
          }
        ]
      }
    }
  ],
  related: [
    {
      ref: 'event:war-in-afghanistan-2001',
      rel: 'led-to',
      cites: [
        {
          source: 'millercenter-gregg-gw-bush-foreign-affairs',
          loc: { section: 'George W. Bush: Foreign Affairs', para: '12' }
        }
      ]
    },
    {
      ref: 'event:iraq-war',
      rel: 'led-to',
      cites: [
        {
          source: 'millercenter-gregg-gw-bush-foreign-affairs',
          loc: { section: 'George W. Bush: Foreign Affairs', para: '25' }
        }
      ]
    },
    {
      ref: 'event:soviet-afghan-war',
      rel: 'contributed-to',
      cites: [
        {
          source: 'national-commission-2004-9-11-commission-report-executive-summary',
          loc: { section: 'Executive Summary', para: '21' }
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
          text: 'Hijacked airliners are flown into the twin towers of the World Trade Center in New York and the Pentagon building in Washington.',
          lang: 'en',
          cite: {
            source: 'european-union-history-of-the-european-union-2000-09',
            loc: { section: 'History of the European Union 2000-09', para: '5' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-12',
            url: 'https://european-union.europa.eu/principles-countries-history/history-eu/2000-09_en'
          }
        },
        {
          id: 'q2',
          text: 'An airliner traveling at hundreds of miles per hour and carrying some 10,000 gallons of jet fuel plowed into the North Tower of the World Trade Center in Lower Manhattan.',
          lang: 'en',
          cite: {
            source: 'national-commission-2004-9-11-commission-report-executive-summary',
            loc: { section: 'Executive Summary', para: '5' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-12',
            url: 'https://govinfo.library.unt.edu/911/report/911Report_Exec.htm'
          }
        },
        {
          id: 'q3',
          text: 'At 9:37 that same morning, a third airliner slammed into the western face of the Pentagon.',
          lang: 'en',
          cite: {
            source: 'national-commission-2004-9-11-commission-report-executive-summary',
            loc: { section: 'Executive Summary', para: '6' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-12',
            url: 'https://govinfo.library.unt.edu/911/report/911Report_Exec.htm'
          }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q4',
          text: 'The 9/11 attacks were a shock, but they should not have come as a surprise.',
          lang: 'en',
          cite: {
            source: 'national-commission-2004-9-11-commission-report-executive-summary',
            loc: { section: 'Executive Summary', para: '11' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-12',
            url: 'https://govinfo.library.unt.edu/911/report/911Report_Exec.htm'
          }
        },
        {
          id: 'q5',
          text: 'In the 1980s, young Muslims from around the world went to Afghanistan to join as volunteers in a jihad (or holy struggle) against the Soviet Union.',
          lang: 'en',
          cite: {
            source: 'national-commission-2004-9-11-commission-report-executive-summary',
            loc: { section: 'Executive Summary', para: '21' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-12',
            url: 'https://govinfo.library.unt.edu/911/report/911Report_Exec.htm'
          }
        },
        {
          id: 'q6',
          text: 'Twenty-three when he arrived in Afghanistan in 1980, Bin Ladin was the seventeenth of 57 children of a Saudi construction magnate.',
          lang: 'en',
          cite: {
            source: 'national-commission-2004-9-11-commission-report-chapter-2',
            loc: { section: 'The Foundation of the New Terrorism', para: '51' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-12',
            url: 'https://govinfo.library.unt.edu/911/report/911Report_Ch2.htm'
          }
        },
        {
          id: 'q7',
          text: 'Upon this political and ideological foundation, Bin Ladin built over the course of a decade a dynamic and lethal organization.',
          lang: 'en',
          cite: {
            source: 'national-commission-2004-9-11-commission-report-executive-summary',
            loc: { section: 'Executive Summary', para: '24' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-12',
            url: 'https://govinfo.library.unt.edu/911/report/911Report_Exec.htm'
          }
        },
        {
          id: 'q8',
          text: 'By late 1998 or early 1999, Bin Ladin and his advisers had agreed on an idea brought to them by Khalid Sheikh Mohammed (KSM) called the "planes operation."',
          lang: 'en',
          cite: {
            source: 'national-commission-2004-9-11-commission-report-executive-summary',
            loc: { section: 'Executive Summary', para: '35' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-12',
            url: 'https://govinfo.library.unt.edu/911/report/911Report_Exec.htm'
          }
        }
      ]
    },
    {
      kind: 'aftermath',
      quotes: [
        {
          id: 'q9',
          text: 'The secretary of defense directed the nation\'s armed forces to Defense Condition 3, an increased state of military readiness.',
          lang: 'en',
          cite: {
            source: 'national-commission-2004-9-11-commission-report-chapter-10',
            loc: { section: 'Wartime', para: '5' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-12',
            url: 'https://govinfo.library.unt.edu/911/report/911Report_Ch10.htm'
          }
        },
        {
          id: 'q10',
          text: 'In a written set of instructions slightly refined during the morning meeting, President Bush charged Ashcroft, Mueller, and Tenet to develop a plan for homeland defense.',
          lang: 'en',
          cite: {
            source: 'national-commission-2004-9-11-commission-report-chapter-10',
            loc: { section: 'Wartime', para: '51' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-12',
            url: 'https://govinfo.library.unt.edu/911/report/911Report_Ch10.htm'
          }
        },
        {
          id: 'q11',
          text: 'Nearly 3,000 Americans were killed on 9/11.',
          lang: 'en',
          cite: {
            source: 'millercenter-gregg-gw-bush-foreign-affairs',
            loc: { section: 'George W. Bush: Foreign Affairs', para: '10' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-12',
            url: 'https://millercenter.org/president/gwbush/foreign-affairs'
          }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q12',
          text: 'Bush declared that the United States considered any nation that supported terrorist groups a hostile regime.',
          lang: 'en',
          cite: {
            source: 'millercenter-gregg-gw-bush-foreign-affairs',
            loc: { section: 'George W. Bush: Foreign Affairs', para: '20' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-12',
            url: 'https://millercenter.org/president/gwbush/foreign-affairs'
          }
        },
        {
          id: 'q13',
          text: 'After the terrorist attacks of 9/11, the Bush administration felt its primary responsibility was to protect America from another attack.',
          lang: 'en',
          cite: {
            source: 'millercenter-gregg-gw-bush-foreign-affairs',
            loc: { section: 'George W. Bush: Foreign Affairs', para: '39' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-12',
            url: 'https://millercenter.org/president/gwbush/foreign-affairs'
          }
        },
        {
          id: 'q14',
          text: 'The Bush administration’s responses to the terrorist attacks of September 11, 2001, expanded presidential power in matters of national security.',
          lang: 'en',
          cite: {
            source: 'millercenter-gregg-gw-bush-foreign-affairs',
            loc: { section: 'George W. Bush: Foreign Affairs', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-12',
            url: 'https://millercenter.org/president/gwbush/foreign-affairs'
          }
        }
      ]
    },
    {
      kind: 'casualties',
      quotes: [
        {
          id: 'q15',
          text: 'More than 2,600 people died at the World Trade Center; 125 died at the Pentagon; 256 died on the four planes.',
          lang: 'en',
          cite: {
            source: 'national-commission-2004-9-11-commission-report-executive-summary',
            loc: { section: 'Executive Summary', para: '7' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-12',
            url: 'https://govinfo.library.unt.edu/911/report/911Report_Exec.htm'
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
            value: { d: '1998-02' },
            cites: [
              {
                source: 'national-commission-2004-9-11-commission-report-executive-summary',
                loc: { section: 'Executive Summary', para: '14' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q16',
        text: 'In February 1998, Usama Bin Ladin and four others issued a self-styled fatwa, publicly declaring that it was God\'s decree that every Muslim should try his utmost to kill any American, military or civilian, anywhere in the world, because of American "occupation" of Islam\'s holy places and aggression against Muslims.',
        lang: 'en',
        cite: {
          source: 'national-commission-2004-9-11-commission-report-executive-summary',
          loc: { section: 'Executive Summary', para: '14' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-12',
          url: 'https://govinfo.library.unt.edu/911/report/911Report_Exec.htm'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1998-08' },
            cites: [
              {
                source: 'national-commission-2004-9-11-commission-report-executive-summary',
                loc: { section: 'Executive Summary', para: '15' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q17',
        text: 'In August 1998, Bin Ladin\'s group, al Qaeda, carried out near-simultaneous truck bomb attacks on the U.S. embassies in Nairobi, Kenya, and Dar es Salaam, Tanzania.',
        lang: 'en',
        cite: {
          source: 'national-commission-2004-9-11-commission-report-executive-summary',
          loc: { section: 'Executive Summary', para: '15' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-12',
          url: 'https://govinfo.library.unt.edu/911/report/911Report_Exec.htm'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '2000-10' },
            cites: [
              {
                source: 'national-commission-2004-9-11-commission-report-executive-summary',
                loc: { section: 'Executive Summary', para: '17' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q18',
        text: 'In October 2000, an al Qaeda team in Aden, Yemen, used a motorboat filled with explosives to blow a hole in the side of a destroyer, the USS Cole, almost sinking the vessel and killing 17 American sailors.',
        lang: 'en',
        cite: {
          source: 'national-commission-2004-9-11-commission-report-executive-summary',
          loc: { section: 'Executive Summary', para: '17' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-12',
          url: 'https://govinfo.library.unt.edu/911/report/911Report_Exec.htm'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '2001-09-11' },
            cites: [
              {
                source: 'national-commission-2004-9-11-commission-report-chapter-1',
                loc: { section: '“We Have Some Planes”', para: '43' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q19',
        text: 'At 8:46:40, American 11 crashed into the North Tower of the World Trade Center in New York City.',
        lang: 'en',
        cite: {
          source: 'national-commission-2004-9-11-commission-report-chapter-1',
          loc: { section: '“We Have Some Planes”', para: '43' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-12',
          url: 'https://govinfo.library.unt.edu/911/report/911Report_Ch1.htm'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '2001-09-11' },
            cites: [
              {
                source: 'national-commission-2004-9-11-commission-report-chapter-1',
                loc: { section: '“We Have Some Planes”', para: '57' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q20',
        text: 'At 9:03:11, United Airlines Flight 175 struck the South Tower of the World Trade Center.',
        lang: 'en',
        cite: {
          source: 'national-commission-2004-9-11-commission-report-chapter-1',
          loc: { section: '“We Have Some Planes”', para: '57' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-12',
          url: 'https://govinfo.library.unt.edu/911/report/911Report_Ch1.htm'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '2001-09-11' },
            cites: [
              {
                source: 'national-commission-2004-9-11-commission-report-chapter-1',
                loc: { section: '“We Have Some Planes”', para: '68' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q21',
        text: 'At 9:37:46, American Airlines Flight 77 crashed into the Pentagon, traveling at approximately 530 miles per hour.',
        lang: 'en',
        cite: {
          source: 'national-commission-2004-9-11-commission-report-chapter-1',
          loc: { section: '“We Have Some Planes”', para: '68' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-12',
          url: 'https://govinfo.library.unt.edu/911/report/911Report_Ch1.htm'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '2001-09-11' },
            cites: [
              {
                source: 'national-commission-2004-9-11-commission-report-chapter-1',
                loc: { section: '“We Have Some Planes”', para: '248' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q22',
        text: 'United 93 crashed in Pennsylvania at 10:03:11, 125 miles from Washington, D.C.',
        lang: 'en',
        cite: {
          source: 'national-commission-2004-9-11-commission-report-chapter-1',
          loc: { section: '“We Have Some Planes”', para: '248' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-12',
          url: 'https://govinfo.library.unt.edu/911/report/911Report_Ch1.htm'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '2001-09-20' },
            cites: [
              {
                source: 'millercenter-gregg-gw-bush-foreign-affairs',
                loc: { section: 'George W. Bush: Foreign Affairs', para: '20' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q23',
        text: 'Before a joint session of Congress on September 20, 2001, President Bush declared a new approach to foreign policy in response to 9/11: “Our war on terror begins with al Qaeda, but it does not end there. It will not end until every terrorist group of global reach has been found, stopped, and defeated.”',
        lang: 'en',
        cite: {
          source: 'millercenter-gregg-gw-bush-foreign-affairs',
          loc: { section: 'George W. Bush: Foreign Affairs', para: '20' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-12',
          url: 'https://millercenter.org/president/gwbush/foreign-affairs'
        }
      }
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/0/01/Tribute_in_Light_in_2010.jpg/1280px-Tribute_in_Light_in_2010.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Tribute_in_Light_in_2010.jpg',
    credit: { institution: 'United States Navy', creator: 'Sgt. Randall A. Clinton' },
    license: { id: 'public-domain' }
  }
})
