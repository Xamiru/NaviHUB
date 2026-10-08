import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'bangladesh-liberation-war',
  names: [
    { text: 'Bangladesh Liberation War', lang: 'en', role: 'primary' },
    {
      text: 'বাংলাদেশের মুক্তিযুদ্ধ',
      lang: 'bn',
      role: 'native',
      translit: 'Bangladesher Muktijuddho'
    },
    {
      text: 'War for Bangladeshi Independence',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'loc-bangladesh-country-study-1989',
          loc: { section: 'The War for Bangladeshi Independence, 1971', para: '-1' }
        }
      ]
    },
    {
      text: 'South Asia Crisis',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'state-dept-milestones-south-asia-crisis-1971',
          loc: { section: 'The South Asia Crisis and the Founding of Bangladesh, 1971', para: '0' }
        }
      ]
    }
  ],
  researched: '2026-10-09',
  type: 'war',
  start: {
    alts: [
      {
        value: { d: '1971-03-25' },
        cites: [
          {
            source: 'loc-bangladesh-country-study-1989',
            loc: { section: 'The War for Bangladeshi Independence, 1971', para: '1' }
          }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1971-12-16' },
        cites: [
          {
            source: 'loc-bangladesh-country-study-1989',
            loc: { section: 'Early Independence Period, 1971-72', para: '2' }
          }
        ]
      }
    ]
  },
  regions: ['south-asia'],
  prominence: 2,
  places: [
    {
      ref: 'place:dhaka',
      cites: [
        {
          source: 'loc-bangladesh-country-study-1989',
          loc: { section: 'The War for Bangladeshi Independence, 1971', para: '1' }
        }
      ]
    }
  ],
  partOf: [
    { ref: 'period:cold-war' }
  ],
  sides: [
    {
      key: 'pakistan',
      name: 'Pakistan',
      cites: [
        {
          source: 'loc-bangladesh-country-study-1989',
          loc: { section: 'The War for Bangladeshi Independence, 1971', para: '5' }
        }
      ],
      polity: 'polity:pakistan'
    },
    {
      key: 'bangladesh',
      name: 'Provisional government of Bangladesh and the Mukti Bahini',
      cites: [
        {
          source: 'loc-bangladesh-country-study-1989',
          loc: { section: 'Early Independence Period, 1971-72', para: '2' }
        },
        {
          source: 'loc-bangladesh-country-study-1989',
          loc: { section: 'The War for Bangladeshi Independence, 1971', para: '6' }
        }
      ],
      polity: 'polity:bangladesh'
    },
    {
      key: 'india',
      name: 'India',
      cites: [
        {
          source: 'loc-bangladesh-country-study-1989',
          loc: { section: 'The War for Bangladeshi Independence, 1971', para: '6' }
        }
      ],
      polity: 'polity:india'
    }
  ],
  participants: [
    {
      ref: 'person:sheikh-mujibur-rahman',
      role: 'leader',
      side: 'bangladesh',
      cites: [
        {
          source: 'loc-bangladesh-country-study-1989',
          loc: { section: 'Early Independence Period, 1971-72', para: '3' }
        },
        {
          source: 'loc-bangladesh-country-study-1989',
          loc: { section: 'The War for Bangladeshi Independence, 1971', para: '1' }
        }
      ]
    },
    {
      name: 'Agha Muhammad Yahya Khan',
      role: 'head-of-state',
      side: 'pakistan',
      cites: [
        {
          source: 'loc-bangladesh-country-study-1989',
          loc: { section: 'The War for Bangladeshi Independence, 1971', para: '5' }
        }
      ]
    },
    {
      name: 'Tikka Khan',
      role: 'commander',
      side: 'pakistan',
      cites: [
        {
          source: 'loc-bangladesh-country-study-1989',
          loc: { section: 'The War for Bangladeshi Independence, 1971', para: '5' }
        }
      ]
    },
    {
      name: 'A.A.K. Niazi',
      role: 'commander',
      side: 'pakistan',
      cites: [
        {
          source: 'loc-bangladesh-country-study-1989',
          loc: { section: 'The War for Bangladeshi Independence, 1971', para: '5' }
        }
      ]
    },
    {
      name: 'Zulfikar Ali Bhutto',
      role: 'head-of-state',
      side: 'pakistan',
      cites: [
        {
          source: 'loc-bangladesh-country-study-1989',
          loc: { section: 'Early Independence Period, 1971-72', para: '3' }
        }
      ]
    },
    {
      name: 'Indira Gandhi',
      role: 'head-of-government',
      side: 'india',
      cites: [
        {
          source: 'loc-bangladesh-country-study-1989',
          loc: { section: 'The War for Bangladeshi Independence, 1971', para: '4' }
        }
      ]
    },
    {
      name: 'Ziaur Rahman',
      role: 'commander',
      side: 'bangladesh',
      cites: [
        {
          source: 'loc-bangladesh-country-study-1989',
          loc: { section: 'Early Independence Period, 1971-72', para: '2' }
        }
      ]
    },
    {
      ref: 'person:richard-nixon',
      role: 'head-of-state',
      cites: [
        {
          source: 'state-dept-milestones-south-asia-crisis-1971',
          loc: { section: 'The South Asia Crisis and the Founding of Bangladesh, 1971', para: '4' }
        }
      ]
    },
    {
      name: 'Archer K. Blood',
      role: 'diplomat',
      cites: [
        {
          source: 'frus1969-76ve07-doc-125',
          loc: { section: 'Document 125, “Selective Genocide”' }
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
            value: { min: 1000000, qualifier: 'over' },
            cites: [
              {
                source: 'loc-bangladesh-country-study-1989',
                loc: { section: 'The War for Bangladeshi Independence, 1971', para: '2' }
              }
            ],
            heldBy: [
              { kind: 'scholar', name: 'Anthony Mascarenhas', discipline: 'journalist' }
            ]
          },
          {
            value: { min: 3000000, qualifier: 'about' },
            cites: [
              {
                source: 'bd-govt-portal-the-independent-day',
                loc: { section: 'The Independent Day' }
              }
            ],
            heldBy: [
              { kind: 'party', name: 'Awami League' },
              { kind: 'state', name: 'India' }
            ]
          }
        ]
      }
    },
    {
      key: 'displaced',
      value: {
        alts: [
          {
            value: { min: 8000000, max: 10000000 },
            cites: [
              {
                source: 'loc-bangladesh-country-study-1989',
                loc: { section: 'The War for Bangladeshi Independence, 1971', para: '4' }
              }
            ]
          }
        ]
      }
    }
  ],
  related: [
    {
      ref: 'event:nixons-visit-to-china',
      rel: 'related',
      cites: [
        {
          source: 'state-dept-milestones-south-asia-crisis-1971',
          loc: { section: 'The South Asia Crisis and the Founding of Bangladesh, 1971', para: '4' }
        }
      ]
    }
  ],
  hero: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/9/9d/Pakistan_Instrument_of_Surrender_signed_by_A_A_K_Niazi_and_Jagjit_Singh_Aurora_at_Ramna_Race_Course_Maidan_1971-12-16_%28PID-h0029%29.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Pakistan_Instrument_of_Surrender_signed_by_A_A_K_Niazi_and_Jagjit_Singh_Aurora_at_Ramna_Race_Course_Maidan_1971-12-16_(PID-h0029).jpg',
    credit: {
      institution: 'Press Information Department, Government of Bangladesh (pressinform.gov.bd archive)'
    },
    license: { id: 'public-domain' }
  },
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'In 1971, an internal crisis in Pakistan resulted in a third war between India and Pakistan and the secession of East Pakistan, creating the independent state of Bangladesh.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-south-asia-crisis-1971',
            loc: {
              section: 'The South Asia Crisis and the Founding of Bangladesh, 1971',
              para: '1'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://history.state.gov/milestones/1969-1976/south-asia'
          }
        },
        {
          id: 'q2',
          text: 'On March 25, the Pakistan Army launched a terror campaign calculated to intimidate the Bengalis into submission. Within hours a wholesale slaughter had commenced in Dhaka, with the heaviest attacks concentrated on the University of Dhaka and the Hindu area of the old town.',
          lang: 'en',
          cite: {
            source: 'loc-bangladesh-country-study-1989',
            loc: { section: 'The War for Bangladeshi Independence, 1971', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-09', url: 'http://countrystudies.us/bangladesh/17.htm' }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q3',
          text: 'The partition of India in 1947 created West and East Pakistan, two noncontiguous territories that shared a dominant religion of Islam but were very different in terms of language, ethnicity and culture. In the 1970 parliamentary elections, an overwhelming number of East Pakistanis voted for a political party that advocated autonomy for the East, but it was blocked from governing by the Army and the existing Pakistani government, and its leader was jailed.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-south-asia-crisis-1971',
            loc: {
              section: 'The South Asia Crisis and the Founding of Bangladesh, 1971',
              para: '3'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://history.state.gov/milestones/1969-1976/south-asia'
          }
        }
      ]
    },
    {
      kind: 'course',
      quotes: [
        {
          id: 'q4',
          text: 'To conceal what they were doing, the Pakistan Army corralled the corps of foreign journalists at the International Hotel in Dhaka, seized their notes, and expelled them the next day.',
          lang: 'en',
          cite: {
            source: 'loc-bangladesh-country-study-1989',
            loc: { section: 'The War for Bangladeshi Independence, 1971', para: '2' }
          },
          provenance: { via: 'web', at: '2026-10-09', url: 'http://countrystudies.us/bangladesh/17.htm' }
        },
        {
          id: 'q5',
          text: 'In April an Indian parliamentary resolution demanded that Prime Minister Indira Gandhi supply aid to the rebels in East Pakistan. She complied but declined to recognize the provisional government of independent Bangladesh.',
          lang: 'en',
          cite: {
            source: 'loc-bangladesh-country-study-1989',
            loc: { section: 'The War for Bangladeshi Independence, 1971', para: '4' }
          },
          provenance: { via: 'web', at: '2026-10-09', url: 'http://countrystudies.us/bangladesh/17.htm' }
        },
        {
          id: 'q6',
          text: 'East Pakistani guerilla forces, supported by India, fought with the Pakistani Army in the late autumn of 1971.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-south-asia-crisis-1971',
            loc: {
              section: 'The South Asia Crisis and the Founding of Bangladesh, 1971',
              para: '3'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://history.state.gov/milestones/1969-1976/south-asia'
          }
        },
        {
          id: 'q7',
          text: 'On December 4, 1971, the Indian Army, far superior in numbers and equipment to that of Pakistan, executed a 3-pronged pincer movement on Dhaka launched from the Indian states of West Bengal, Assam, and Tripura, taking only 12 days to defeat the 90,000 Pakistani defenders.',
          lang: 'en',
          cite: {
            source: 'loc-bangladesh-country-study-1989',
            loc: { section: 'The War for Bangladeshi Independence, 1971', para: '6' }
          },
          provenance: { via: 'web', at: '2026-10-09', url: 'http://countrystudies.us/bangladesh/17.htm' }
        },
        {
          id: 'q8',
          text: 'In the end, the United States acted in a somewhat ambiguous manner during the brief 1971 war. The U.S.S. Enterprise carrier group from Vietnam moved toward the Bay of Bengal, stopping in Singapore and eventually reaching Sri Lanka.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-south-asia-crisis-1971',
            loc: {
              section: 'The South Asia Crisis and the Founding of Bangladesh, 1971',
              para: '5'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://history.state.gov/milestones/1969-1976/south-asia'
          }
        }
      ]
    },
    {
      kind: 'casualties',
      quotes: [
        {
          id: 'q9',
          text: 'Various informants, including missionaries and foreign journalists who clandestinely returned to East Pakistan during the war, estimated that by March 28 the loss of life reached 15,000.',
          lang: 'en',
          cite: {
            source: 'loc-bangladesh-country-study-1989',
            loc: { section: 'The War for Bangladeshi Independence, 1971', para: '2' }
          },
          provenance: { via: 'web', at: '2026-10-09', url: 'http://countrystudies.us/bangladesh/17.htm' }
        },
        {
          id: 'q10',
          text: 'Anthony Mascarenhas in Bangladesh: A Legacy of Blood estimates that during the entire nine-month liberation struggle more than 1 million Bengalis may have died at the hands of the Pakistan Army.',
          lang: 'en',
          cite: {
            source: 'loc-bangladesh-country-study-1989',
            loc: { section: 'The War for Bangladeshi Independence, 1971', para: '2' }
          },
          provenance: { via: 'web', at: '2026-10-09', url: 'http://countrystudies.us/bangladesh/17.htm' }
        },
        {
          id: 'q11',
          text: 'An immense flood of East Pakistani refugees, between 8 and 10 million according to various estimates, fled across the border into the Indian state of West Bengal.',
          lang: 'en',
          cite: {
            source: 'loc-bangladesh-country-study-1989',
            loc: { section: 'The War for Bangladeshi Independence, 1971', para: '4' }
          },
          provenance: { via: 'web', at: '2026-10-09', url: 'http://countrystudies.us/bangladesh/17.htm' }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q12',
          text: 'India’s relationship with the Soviet Union ensured that the United Nations would not intervene, and helped deter China from opening a second conflict on India’s northern border. Defeated on both fronts, Pakistan was forced to accede to the establishment of an independent Bangladesh in place of East Pakistan.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-south-asia-crisis-1971',
            loc: {
              section: 'The South Asia Crisis and the Founding of Bangladesh, 1971',
              para: '6'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://history.state.gov/milestones/1969-1976/south-asia'
          }
        },
        {
          id: 'q13',
          text: 'Mujib pushed through a new constitution that was modeled on the Indian Constitution. The Constitution--adopted on November 4, 1972--stated that the new nation was to have a prime minister appointed by the president and approved by a single-house parliament.',
          lang: 'en',
          cite: {
            source: 'loc-bangladesh-country-study-1989',
            loc: { section: 'Early Independence Period, 1971-72', para: '4' }
          },
          provenance: { via: 'web', at: '2026-10-09', url: 'http://countrystudies.us/bangladesh/18.htm' }
        },
        {
          id: 'q14',
          text: 'These developments resulted in a decline in U.S. influence in South Asia and India’s emergence as the most significant power on the subcontinent. U.S. prestige was damaged in both nations, in Pakistan for failing to help prevent the loss of East Pakistan and in India for supporting the brutality of the Pakistani regime’s actions in what became Bangladesh.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-south-asia-crisis-1971',
            loc: {
              section: 'The South Asia Crisis and the Founding of Bangladesh, 1971',
              para: '7'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://history.state.gov/milestones/1969-1976/south-asia'
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
            value: { d: '1971-03-25' },
            cites: [
              {
                source: 'loc-bangladesh-country-study-1989',
                loc: { section: 'The War for Bangladeshi Independence, 1971', para: '1' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q15',
        text: 'Bangladeshis remember the date as a day of infamy and liberation. The Pakistan Army came with hit lists and systematically killed several hundred Bengalis. Mujib was captured and flown to West Pakistan for incarceration.',
        lang: 'en',
        cite: {
          source: 'loc-bangladesh-country-study-1989',
          loc: { section: 'The War for Bangladeshi Independence, 1971', para: '1' }
        },
        provenance: { via: 'web', at: '2026-10-09', url: 'http://countrystudies.us/bangladesh/17.htm' }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1971-03-26' },
            cites: [
              {
                source: 'loc-bangladesh-country-study-1989',
                loc: { section: 'Early Independence Period, 1971-72', para: '2' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q16',
        text: 'The "independent, sovereign republic of Bangladesh" was first proclaimed in a radio message broadcast from a captured station in Chittagong on March 26, 1971.',
        lang: 'en',
        cite: {
          source: 'loc-bangladesh-country-study-1989',
          loc: { section: 'Early Independence Period, 1971-72', para: '2' }
        },
        provenance: { via: 'web', at: '2026-10-09', url: 'http://countrystudies.us/bangladesh/18.htm' }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1971-04-17' },
            cites: [
              {
                source: 'loc-bangladesh-country-study-1989',
                loc: { section: 'Early Independence Period, 1971-72', para: '2' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q17',
        text: 'The following month a provisional government was established in Calcutta by a number of leading Awami League members who had escaped from East Pakistan. On April 17, the "Mujibnagar" government formally proclaimed independence and named Mujib as its president.',
        lang: 'en',
        cite: {
          source: 'loc-bangladesh-country-study-1989',
          loc: { section: 'Early Independence Period, 1971-72', para: '2' }
        },
        provenance: { via: 'web', at: '2026-10-09', url: 'http://countrystudies.us/bangladesh/18.htm' }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1971-12-03' },
            cites: [
              {
                source: 'state-dept-milestones-south-asia-crisis-1971',
                loc: {
                  section: 'The South Asia Crisis and the Founding of Bangladesh, 1971',
                  para: '3'
                }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q18',
        text: 'West Pakistan responded with air attacks on India, resulting in open war between the two powers beginning on December 3.',
        lang: 'en',
        cite: {
          source: 'state-dept-milestones-south-asia-crisis-1971',
          loc: { section: 'The South Asia Crisis and the Founding of Bangladesh, 1971', para: '3' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-09',
          url: 'https://history.state.gov/milestones/1969-1976/south-asia'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1971-12-06' },
            cites: [
              {
                source: 'loc-bangladesh-country-study-1989',
                loc: { section: 'Early Independence Period, 1971-72', para: '2' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q19',
        text: 'On December 6, India became the first nation to recognize the new Bangladeshi government.',
        lang: 'en',
        cite: {
          source: 'loc-bangladesh-country-study-1989',
          loc: { section: 'Early Independence Period, 1971-72', para: '2' }
        },
        provenance: { via: 'web', at: '2026-10-09', url: 'http://countrystudies.us/bangladesh/18.htm' }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1971-12-16' },
            cites: [
              {
                source: 'loc-bangladesh-country-study-1989',
                loc: { section: 'Early Independence Period, 1971-72', para: '2' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q20',
        text: 'Representatives of the Bangladeshi government and the Mukti Bahini were absent from the ceremony of surrender of the Pakistan Army to the Indian Army on December 16. Bangladeshis considered this ceremony insulting, and it did much to sour relations between Bangladesh and India.',
        lang: 'en',
        cite: {
          source: 'loc-bangladesh-country-study-1989',
          loc: { section: 'Early Independence Period, 1971-72', para: '2' }
        },
        provenance: { via: 'web', at: '2026-10-09', url: 'http://countrystudies.us/bangladesh/18.htm' }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1972-01-10' },
            cites: [
              {
                source: 'loc-bangladesh-country-study-1989',
                loc: { section: 'Early Independence Period, 1971-72', para: '4' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q21',
        text: 'On January 10, 1972, Mujib arrived in Dhaka to a tumultuous welcome. Mujib first assumed the title of president but vacated that office two days later to become the prime minister.',
        lang: 'en',
        cite: {
          source: 'loc-bangladesh-country-study-1989',
          loc: { section: 'Early Independence Period, 1971-72', para: '4' }
        },
        provenance: { via: 'web', at: '2026-10-09', url: 'http://countrystudies.us/bangladesh/18.htm' }
      }
    }
  ],
  polities: [
    {
      ref: 'polity:soviet-union',
      cites: [
        {
          source: 'state-dept-milestones-south-asia-crisis-1971',
          loc: { section: 'The South Asia Crisis and the Founding of Bangladesh, 1971', para: '4' }
        }
      ]
    },
    {
      ref: 'polity:peoples-republic-of-china',
      cites: [
        {
          source: 'state-dept-milestones-south-asia-crisis-1971',
          loc: { section: 'The South Asia Crisis and the Founding of Bangladesh, 1971', para: '4' }
        }
      ]
    },
    {
      ref: 'polity:united-states',
      cites: [
        {
          source: 'state-dept-milestones-south-asia-crisis-1971',
          loc: { section: 'The South Asia Crisis and the Founding of Bangladesh, 1971', para: '4' }
        }
      ]
    }
  ],
  furtherReading: [
    { source: 'imam-2013', perspective: 'south-asian' },
    { source: 'bose-2011-dead-reckoning', perspective: 'south-asian' },
    { source: 'raghavan-2013-1971', perspective: 'south-asian' },
    { source: 'bass-2014-blood-telegram', perspective: 'american' }
  ]
})
