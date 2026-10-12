import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'iraq-war',
  names: [
    { text: 'Iraq War', lang: 'en', role: 'primary' },
    { text: 'حرب العراق', lang: 'ar', role: 'native' },
    { text: '2003 invasion of Iraq', lang: 'en', role: 'alternative' },
    { text: 'Second Gulf War', lang: 'en', role: 'alternative' },
    { text: 'Occupation of Iraq', lang: 'en', role: 'alternative' }
  ],
  researched: '2026-10-13',
  type: 'war',
  start: {
    alts: [
      {
        value: { d: '2003-03-19' },
        cites: [
          {
            source: 'millercenter-gregg-george-w-bush-foreign-affairs',
            loc: { section: 'George W. Bush: Foreign Affairs', para: '8' }
          }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '2011' },
        cites: [
          { source: 'hrw-2011-world-report-iraq', loc: { section: 'World Report 2011: Iraq' } }
        ]
      }
    ]
  },
  regions: ['mena', 'global'],
  prominence: 1,
  places: [
    {
      ref: 'place:baghdad',
      cites: [
        {
          source: 'millercenter-gregg-george-w-bush-foreign-affairs',
          loc: { section: 'George W. Bush: Foreign Affairs', para: '8' }
        }
      ]
    },
    {
      ref: 'place:basra',
      cites: [
        {
          source: 'iraq-inquiry-2016-07-06-chilcot-public-statement',
          loc: { section: 'Sir John Chilcot\'s public statement, 6 July 2016', para: '73' }
        }
      ]
    },
    {
      ref: 'place:samarra',
      cites: [
        {
          source: 'hrw-2007-world-report-iraq',
          loc: { section: 'World Report 2007: Iraq', para: '2' }
        }
      ]
    }
  ],
  polities: [
    {
      ref: 'polity:republic-of-iraq',
      cites: [
        {
          source: 'millercenter-gregg-george-w-bush-foreign-affairs',
          loc: { section: 'George W. Bush: Foreign Affairs', para: '8' }
        }
      ]
    },
    {
      ref: 'polity:united-states',
      cites: [
        {
          source: 'millercenter-gregg-george-w-bush-foreign-affairs',
          loc: { section: 'George W. Bush: Foreign Affairs', para: '8' }
        }
      ]
    },
    {
      ref: 'polity:united-kingdom',
      cites: [
        {
          source: 'iraq-inquiry-2016-07-06-chilcot-public-statement',
          loc: { section: 'Sir John Chilcot\'s public statement, 6 July 2016', para: '2' }
        }
      ]
    }
  ],
  sides: [
    {
      key: 'coalition',
      name: 'The United States, the United Kingdom and their allies',
      cites: [
        {
          source: 'millercenter-gregg-george-w-bush-foreign-affairs',
          loc: { section: 'George W. Bush: Foreign Affairs', para: '8' }
        }
      ]
    },
    {
      key: 'iraqi-government',
      name: 'The Iraqi government of Saddam Hussein',
      polity: 'polity:republic-of-iraq',
      cites: [
        {
          source: 'millercenter-gregg-george-w-bush-foreign-affairs',
          loc: { section: 'George W. Bush: Foreign Affairs', para: '8' }
        }
      ]
    }
  ],
  participants: [
    {
      ref: 'person:saddam-hussein',
      role: 'head-of-state',
      side: 'iraqi-government',
      cites: [
        {
          source: 'millercenter-gregg-george-w-bush-foreign-affairs',
          loc: { section: 'George W. Bush: Foreign Affairs', para: '8' }
        }
      ]
    },
    {
      ref: 'person:george-w-bush',
      role: 'head-of-state',
      side: 'coalition',
      cites: [
        {
          source: 'millercenter-gregg-george-w-bush-foreign-affairs',
          loc: { section: 'George W. Bush: Foreign Affairs', para: '5' }
        }
      ]
    },
    {
      ref: 'person:tony-blair',
      role: 'head-of-government',
      side: 'coalition',
      cites: [
        {
          source: 'iraq-inquiry-2016-07-06-chilcot-public-statement',
          loc: { section: 'Sir John Chilcot\'s public statement, 6 July 2016', para: '14' }
        }
      ]
    },
    {
      name: 'David Petraeus',
      role: 'commander',
      side: 'coalition',
      cites: [
        {
          source: 'millercenter-gregg-george-w-bush-foreign-affairs',
          loc: { section: 'George W. Bush: Foreign Affairs', para: '12' }
        }
      ]
    },
    {
      name: 'Nouri al-Maliki',
      role: 'head-of-government',
      cites: [
        {
          source: 'hrw-2007-world-report-iraq',
          loc: { section: 'World Report 2007: Iraq', para: '6' }
        }
      ]
    },
    {
      name: 'Ayad Allawi',
      role: 'head-of-government',
      cites: [
        {
          source: 'hrw-2005-world-report-iraq',
          loc: { section: 'World Report 2005: Iraq', para: '10' }
        }
      ]
    }
  ],
  figures: [
    {
      key: 'displaced',
      value: {
        alts: [
          {
            value: { min: 1000000, qualifier: 'over' },
            cites: [
              {
                source: 'iraq-inquiry-2016-07-06-chilcot-public-statement',
                loc: { section: 'Sir John Chilcot\'s public statement, 6 July 2016', para: '76' }
              }
            ],
            heldBy: [
              { kind: 'organization', name: 'The Iraq Inquiry' }
            ]
          }
        ]
      }
    }
  ],
  related: [
    {
      ref: 'event:gulf-war',
      rel: 'preceded-by',
      cites: [
        {
          source: 'millercenter-gregg-george-w-bush-foreign-affairs',
          loc: { section: 'George W. Bush: Foreign Affairs', para: '1' }
        }
      ]
    },
    {
      ref: 'event:iranian-nuclear-program-crisis',
      rel: 'related',
      cites: [
        {
          source: 'acronym-2005-dd80-irans-nuclear-programme-eu-3-snubbed',
          loc: {
            section: 'Iran\'s Nuclear Programme: EU-3 Snubbed as Iran begins Uranium Conversion at Isfahan',
            para: '11'
          }
        }
      ]
    },
    {
      ref: 'event:anfal-campaign',
      rel: 'related',
      cites: [
        {
          source: 'hrw-2007-world-report-iraq',
          loc: { section: 'World Report 2007: Iraq', para: '19' }
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
          text: 'On March 19, British and U.S. forces launched a bombing campaign of military and government offices in Baghdad.',
          lang: 'en',
          cite: {
            source: 'millercenter-gregg-george-w-bush-foreign-affairs',
            loc: { section: 'George W. Bush: Foreign Affairs', para: '8' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://millercenter.org/president/gwbush/foreign-affairs'
          }
        },
        {
          id: 'q2',
          text: 'Although the United States and its allies quickly overthrew Saddam Hussein and defeated his forces, the situation in Iraq became increasingly unstable over time.',
          lang: 'en',
          cite: {
            source: 'millercenter-gregg-george-w-bush-foreign-affairs',
            loc: { section: 'George W. Bush: Foreign Affairs', para: '10' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://millercenter.org/president/gwbush/foreign-affairs'
          }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q3',
          text: 'The Bush administration inherited a policy toward Iraq that was shaped by the country’s refusal to abide by the ceasefire agreement that went into effect in the early 1990s after the Persian Gulf War.',
          lang: 'en',
          cite: {
            source: 'millercenter-gregg-george-w-bush-foreign-affairs',
            loc: { section: 'George W. Bush: Foreign Affairs', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://millercenter.org/president/gwbush/foreign-affairs'
          }
        },
        {
          id: 'q4',
          text: 'On 8 November, resolution 1441 was adopted unanimously by the Security Council.',
          lang: 'en',
          cite: {
            source: 'iraq-inquiry-2016-07-06-chilcot-public-statement',
            loc: { section: 'Sir John Chilcot\'s public statement, 6 July 2016', para: '27' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://web.archive.org/web/20160706180903/http://www.iraqinquiry.org.uk/the-inquiry/sir-john-chilcots-public-statement/'
          }
        },
        {
          id: 'q5',
          text: 'The President went to Congress with his case to have the power to go to war if he found it necessary.',
          lang: 'en',
          cite: {
            source: 'millercenter-gregg-george-w-bush-foreign-affairs',
            loc: { section: 'George W. Bush: Foreign Affairs', para: '7' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://millercenter.org/president/gwbush/foreign-affairs'
          }
        }
      ]
    },
    {
      kind: 'course',
      quotes: [
        {
          id: 'q6',
          text: 'The Armed Forces fought a successful military campaign, which took Basra and helped to achieve the departure of Saddam Hussein and the fall of Baghdad in less than a month.',
          lang: 'en',
          cite: {
            source: 'iraq-inquiry-2016-07-06-chilcot-public-statement',
            loc: { section: 'Sir John Chilcot\'s public statement, 6 July 2016', para: '73' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://web.archive.org/web/20160706180903/http://www.iraqinquiry.org.uk/the-inquiry/sir-john-chilcots-public-statement/'
          }
        },
        {
          id: 'q7',
          text: 'U.S. forces have also been responsible for violations of the laws of war.',
          lang: 'en',
          cite: {
            source: 'hrw-2005-world-report-iraq',
            loc: { section: 'World Report 2005: Iraq', para: '3' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.hrw.org/world-report/2005/country-chapters/iraq'
          }
        },
        {
          id: 'q8',
          text: 'The human rights situation worsened significantly in 2006.',
          lang: 'en',
          cite: {
            source: 'hrw-2007-world-report-iraq',
            loc: { section: 'World Report 2007: Iraq', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.hrw.org/world-report/2007/country-chapters-6'
          }
        },
        {
          id: 'q9',
          text: 'After the United States toppled the government, Iraq soon began to descend into chaos with increasing instability and violence from suicide attacks, car bombs, kidnappings, and beheadings.',
          lang: 'en',
          cite: {
            source: 'millercenter-gregg-george-w-bush-foreign-affairs',
            loc: { section: 'George W. Bush: Foreign Affairs', para: '11' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://millercenter.org/president/gwbush/foreign-affairs'
          }
        },
        {
          id: 'q10',
          text: 'To counter the deteriorating situation in Iraq, the Bush administration developed a plan for a troop surge to increase the number of U.S. troops in order to stabilize Iraqi society and secure the civilian population.',
          lang: 'en',
          cite: {
            source: 'millercenter-gregg-george-w-bush-foreign-affairs',
            loc: { section: 'George W. Bush: Foreign Affairs', para: '12' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://millercenter.org/president/gwbush/foreign-affairs'
          }
        },
        {
          id: 'q11',
          text: 'An agreement between the US and Iraq in 2008 calls for a complete US withdrawal-including non-combat military forces-from Iraq by the end of 2011.',
          lang: 'en',
          cite: { source: 'hrw-2011-world-report-iraq', loc: { section: 'World Report 2011: Iraq' } },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.hrw.org/world-report/2011/country-chapters/iraq'
          }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q12',
          text: 'The invasion and subsequent instability in Iraq had, by July 2009, also resulted in the deaths of at least one hundred and fifty thousand Iraqis – and probably many more – most of them civilians.',
          lang: 'en',
          cite: {
            source: 'iraq-inquiry-2016-07-06-chilcot-public-statement',
            loc: { section: 'Sir John Chilcot\'s public statement, 6 July 2016', para: '76' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://web.archive.org/web/20160706180903/http://www.iraqinquiry.org.uk/the-inquiry/sir-john-chilcots-public-statement/'
          }
        },
        {
          id: 'q13',
          text: 'Despite explicit warnings, the consequences of the invasion were underestimated.',
          lang: 'en',
          cite: {
            source: 'iraq-inquiry-2016-07-06-chilcot-public-statement',
            loc: { section: 'Sir John Chilcot\'s public statement, 6 July 2016', para: '9' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://web.archive.org/web/20160706180903/http://www.iraqinquiry.org.uk/the-inquiry/sir-john-chilcots-public-statement/'
          }
        },
        {
          id: 'q14',
          text: 'Human rights conditions in Iraq deteriorated for much of 2007 with sectarian violence swelling the ranks of Iraq’s displaced to some 4.4 million, half of them outside the country.',
          lang: 'en',
          cite: {
            source: 'hrw-2008-essential-background-iraq',
            loc: { section: 'Essential Background: Overview of human rights issues in Iraq' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.hrw.org/legacy/englishwr2k8/docs/2008/01/31/iraq17598.htm'
          }
        }
      ]
    },
    {
      kind: 'casualties',
      quotes: [
        {
          id: 'q15',
          text: 'More than 200 British citizens died as a result of the conflict in Iraq.',
          lang: 'en',
          cite: {
            source: 'iraq-inquiry-2016-07-06-chilcot-public-statement',
            loc: { section: 'Sir John Chilcot\'s public statement, 6 July 2016', para: '75' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://web.archive.org/web/20160706180903/http://www.iraqinquiry.org.uk/the-inquiry/sir-john-chilcots-public-statement/'
          }
        }
      ]
    },
    {
      kind: 'in-their-words',
      quotes: [
        {
          id: 'q16',
          text: '2. Decides, while acknowledging paragraph 1 above, to afford Iraq, by this resolution, a final opportunity to comply with its disarmament obligations under relevant resolutions of the Council; and accordingly decides to set up an enhanced inspection regime with the aim of bringing to full and verified completion the disarmament process established by resolution 687 (1991) and subsequent resolutions of the Council;',
          lang: 'en',
          cite: { source: 'unsc-resolution-1441-2002', loc: { section: 'Resolution 1441 (2002)' } },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://en.wikisource.org/wiki/United_Nations_Security_Council_Resolution_1441'
          }
        },
        {
          id: 'q17',
          text: 'The President is authorized to use the Armed Forces of the United States as he determines to be necessary and appropriate in order to—',
          lang: 'en',
          cite: {
            source: 'us-congress-2002-aumf-against-iraq-resolution',
            loc: {
              section: 'Authorization for Use of Military Force Against Iraq Resolution of 2002'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://en.wikisource.org/wiki/Authorization_for_Use_of_Military_Force_Against_Iraq_Resolution_of_2002'
          }
        },
        {
          id: 'q18',
          text: '2. Welcomes that, also by 30 June 2004, the occupation will end and the Coalition Provisional Authority will cease to exist, and that Iraq will reassert its full sovereignty;',
          lang: 'en',
          cite: { source: 'unsc-resolution-1546-2004', loc: { section: 'Resolution 1546 (2004)' } },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://en.wikisource.org/wiki/United_Nations_Security_Council_Resolution_1546'
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
            value: { d: '2003-03-17' },
            cites: [
              {
                source: 'iraq-inquiry-2016-07-06-chilcot-public-statement',
                loc: { section: 'Sir John Chilcot\'s public statement, 6 July 2016', para: '12' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q19',
        text: 'First, the formal decision to invade Iraq, if Saddam Hussein did not accept the US ultimatum to leave within 48 hours, was taken by Cabinet on 17 March 2003.',
        lang: 'en',
        cite: {
          source: 'iraq-inquiry-2016-07-06-chilcot-public-statement',
          loc: { section: 'Sir John Chilcot\'s public statement, 6 July 2016', para: '12' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-13',
          url: 'https://web.archive.org/web/20160706180903/http://www.iraqinquiry.org.uk/the-inquiry/sir-john-chilcots-public-statement/'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '2003-03-19' },
            cites: [
              {
                source: 'millercenter-gregg-george-w-bush-foreign-affairs',
                loc: { section: 'George W. Bush: Foreign Affairs', para: '8' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q20',
        text: 'Characteristically, Saddam Hussein chose confrontation.',
        lang: 'en',
        cite: {
          source: 'millercenter-gregg-george-w-bush-foreign-affairs',
          loc: { section: 'George W. Bush: Foreign Affairs', para: '8' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-13',
          url: 'https://millercenter.org/president/gwbush/foreign-affairs'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '2003-04' },
            cites: [
              {
                source: 'hrw-2005-world-report-iraq',
                loc: { section: 'World Report 2005: Iraq', para: '4' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q21',
        text: 'In the aftermath of the U.S.-led invasion of Iraq and the overthrow of the Ba’athist government in April 2003, the occupying power and interim government have worked to dismantle the repressive apparatus erected under Saddam Hussein.',
        lang: 'en',
        cite: {
          source: 'hrw-2005-world-report-iraq',
          loc: { section: 'World Report 2005: Iraq', para: '4' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-13',
          url: 'https://www.hrw.org/world-report/2005/country-chapters/iraq'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '2004-04' },
            cites: [
              {
                source: 'hrw-2005-world-report-iraq',
                loc: { section: 'World Report 2005: Iraq', para: '3' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q22',
        text: 'The photographs from Abu Ghraib prison of torture and other mistreatment of detainees, made public in April 2004, provided the most graphic evidence of abuse; further investigations revealed that abuses against detainees were not limited to Abu Ghraib.',
        lang: 'en',
        cite: {
          source: 'hrw-2005-world-report-iraq',
          loc: { section: 'World Report 2005: Iraq', para: '3' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-13',
          url: 'https://www.hrw.org/world-report/2005/country-chapters/iraq'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '2004-06-28' },
            cites: [
              {
                source: 'hrw-2005-world-report-iraq',
                loc: { section: 'World Report 2005: Iraq', para: '7' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q23',
        text: 'Following the declared end of occupation by U.S.-led coalition forces and the dissolution of the Coalition Provisional Authority (CPA) on June 28, 2004, the U.S.-led coalition transferred sovereignty to the Interim Iraqi Government.',
        lang: 'en',
        cite: {
          source: 'hrw-2005-world-report-iraq',
          loc: { section: 'World Report 2005: Iraq', para: '7' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-13',
          url: 'https://www.hrw.org/world-report/2005/country-chapters/iraq'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '2005-12-15' },
            cites: [
              {
                source: 'hrw-2007-world-report-iraq',
                loc: { section: 'World Report 2007: Iraq', para: '5' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q24',
        text: 'Elections were held on December 15, 2005, for a new 275-seat National Assembly.',
        lang: 'en',
        cite: {
          source: 'hrw-2007-world-report-iraq',
          loc: { section: 'World Report 2007: Iraq', para: '5' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-13',
          url: 'https://www.hrw.org/world-report/2007/country-chapters-6'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '2006-02-22' },
            cites: [
              {
                source: 'hrw-2007-world-report-iraq',
                loc: { section: 'World Report 2007: Iraq', para: '2' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q25',
        text: 'The bombing on February 22 of two Shia holy sites in Samarra\' catalyzed an unprecedented level of violent attacks, primarily against civilians.',
        lang: 'en',
        cite: {
          source: 'hrw-2007-world-report-iraq',
          loc: { section: 'World Report 2007: Iraq', para: '2' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-13',
          url: 'https://www.hrw.org/world-report/2007/country-chapters-6'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '2006-12-30' },
            cites: [
              {
                source: 'hrw-2008-essential-background-iraq',
                loc: { section: 'Essential Background: Overview of human rights issues in Iraq' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q26',
        text: 'The Iraqi government executed Saddam Hussein on December 30, 2006, following his conviction by the Iraqi High Tribunal (IHT) for crimes against humanity in Dujail in 1982.',
        lang: 'en',
        cite: {
          source: 'hrw-2008-essential-background-iraq',
          loc: { section: 'Essential Background: Overview of human rights issues in Iraq' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-13',
          url: 'https://www.hrw.org/legacy/englishwr2k8/docs/2008/01/31/iraq17598.htm'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '2007-01' },
            cites: [
              {
                source: 'millercenter-gregg-george-w-bush-foreign-affairs',
                loc: { section: 'George W. Bush: Foreign Affairs', para: '12' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q27',
        text: 'General David Petraeus was appointed to oversee a “surge” of 20,000 troops in January 2007.',
        lang: 'en',
        cite: {
          source: 'millercenter-gregg-george-w-bush-foreign-affairs',
          loc: { section: 'George W. Bush: Foreign Affairs', para: '12' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-13',
          url: 'https://millercenter.org/president/gwbush/foreign-affairs'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '2008' },
            cites: [
              {
                source: 'millercenter-gregg-george-w-bush-foreign-affairs',
                loc: { section: 'George W. Bush: Foreign Affairs', para: '14' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q28',
        text: 'In 2008, the Bush administration entered into the Strategic Framework Agreement, which established a political, economic, and security relationship with the new government of Iraq; the agreement encouraged Iraqi sovereignty and created a normalized diplomatic relationship with it.',
        lang: 'en',
        cite: {
          source: 'millercenter-gregg-george-w-bush-foreign-affairs',
          loc: { section: 'George W. Bush: Foreign Affairs', para: '14' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-13',
          url: 'https://millercenter.org/president/gwbush/foreign-affairs'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '2010-08' },
            cites: [
              {
                source: 'hrw-2011-world-report-iraq',
                loc: { section: 'World Report 2011: Iraq' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q29',
        text: 'The United States officially ended its seven-year combat operations in August 2010, reducing the number of troops to about 49,700.',
        lang: 'en',
        cite: { source: 'hrw-2011-world-report-iraq', loc: { section: 'World Report 2011: Iraq' } },
        provenance: {
          via: 'web',
          at: '2026-10-13',
          url: 'https://www.hrw.org/world-report/2011/country-chapters/iraq'
        }
      }
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/c/c1/SaddamStatue.jpg/1280px-SaddamStatue.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:SaddamStatue.jpg',
    credit: { institution: 'U.S. Department of Defense' },
    license: { id: 'public-domain' }
  },
  archive: [
    {
      id: 'a1',
      mediaKind: 'video',
      title: 'THE WAY FORWARD IN IRAQ',
      date: { d: '2007-01-11' },
      url: 'https://archive.org/download/house.hbs.mars.hrs04A_S2118_070111/hrs04A_S2118_070111.mp4',
      page: 'https://archive.org/details/house.hbs.mars.hrs04A_S2118_070111',
      credit: {
        institution: 'Committee on Armed Services, U.S. House of Representatives (Internet Archive)'
      },
      license: { id: 'public-domain' },
      bytes: 1777997726,
      durationSec: 17091
    }
  ]
})
