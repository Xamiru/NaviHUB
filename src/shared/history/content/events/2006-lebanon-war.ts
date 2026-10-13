import { defineEvent } from '../../schema'

export default defineEvent({
  id: '2006-lebanon-war',
  names: [
    { text: '2006 Lebanon war', lang: 'en', role: 'primary' },
    { text: 'Israel–Hezbollah war', lang: 'en', role: 'alternative' },
    { text: 'Second Lebanon War', lang: 'en', role: 'alternative' }
  ],
  researched: '2026-10-13',
  type: 'war',
  start: {
    alts: [
      {
        value: { d: '2006-07-12' },
        cites: [
          {
            source: 'hrw-2007-09-05-why-they-died-civilian-casualties-in-lebanon-during-the-2006-war',
            loc: { section: 'Why They Died: Civilian Casualties in Lebanon during the 2006 War' }
          }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '2006-08-14' },
        cites: [
          {
            source: 'hrw-2007-09-05-why-they-died-civilian-casualties-in-lebanon-during-the-2006-war',
            loc: { section: 'Why They Died: Civilian Casualties in Lebanon during the 2006 War' }
          }
        ]
      }
    ]
  },
  regions: ['mena'],
  prominence: 2,
  places: [
    {
      ref: 'place:beirut',
      cites: [
        {
          source: 'hrw-2007-09-05-why-they-died-civilian-casualties-in-lebanon-during-the-2006-war',
          loc: { section: 'Why They Died: Civilian Casualties in Lebanon during the 2006 War' }
        }
      ]
    }
  ],
  polities: [
    {
      ref: 'polity:state-of-israel',
      cites: [
        {
          source: 'hrw-2007-09-05-why-they-died-civilian-casualties-in-lebanon-during-the-2006-war',
          loc: { section: 'Why They Died: Civilian Casualties in Lebanon during the 2006 War' }
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
          source: 'hrw-2007-09-05-why-they-died-civilian-casualties-in-lebanon-during-the-2006-war',
          loc: { section: 'Why They Died: Civilian Casualties in Lebanon during the 2006 War' }
        }
      ]
    },
    {
      key: 'hezbollah',
      name: 'Hezbollah',
      cites: [
        {
          source: 'hrw-2007-09-05-why-they-died-civilian-casualties-in-lebanon-during-the-2006-war',
          loc: { section: 'Why They Died: Civilian Casualties in Lebanon during the 2006 War' }
        }
      ]
    }
  ],
  participants: [
    {
      ref: 'person:hassan-nasrallah',
      role: 'leader',
      side: 'hezbollah',
      cites: [
        {
          source: 'hrw-2007-09-05-why-they-died-civilian-casualties-in-lebanon-during-the-2006-war',
          loc: { section: 'Why They Died: Civilian Casualties in Lebanon during the 2006 War' }
        }
      ]
    },
    {
      name: 'Ehud Olmert',
      role: 'head-of-government',
      side: 'israel',
      cites: [
        {
          source: 'hrw-2007-09-05-why-they-died-civilian-casualties-in-lebanon-during-the-2006-war',
          loc: { section: 'Why They Died: Civilian Casualties in Lebanon during the 2006 War' }
        }
      ]
    },
    {
      name: 'Amir Peretz',
      role: 'participant',
      side: 'israel',
      cites: [
        {
          source: 'hrw-2007-09-05-why-they-died-civilian-casualties-in-lebanon-during-the-2006-war',
          loc: { section: 'Why They Died: Civilian Casualties in Lebanon during the 2006 War' }
        }
      ]
    },
    {
      name: 'Dan Halutz',
      role: 'commander',
      side: 'israel',
      cites: [
        {
          source: 'hrw-2007-09-05-why-they-died-civilian-casualties-in-lebanon-during-the-2006-war',
          loc: { section: 'Why They Died: Civilian Casualties in Lebanon during the 2006 War' }
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
            value: { min: 1109 },
            cites: [
              {
                source: 'hrw-2007-09-05-why-they-died-civilian-casualties-in-lebanon-during-the-2006-war',
                loc: {
                  section: 'Why They Died: Civilian Casualties in Lebanon during the 2006 War'
                }
              }
            ],
            heldBy: [
              { kind: 'organization', name: 'Human Rights Watch' }
            ]
          },
          {
            value: { min: 1189 },
            cites: [
              {
                source: 'hrw-2007-world-report-lebanon',
                loc: { section: 'World Report 2007: Lebanon', para: '5' }
              }
            ],
            heldBy: [
              { kind: 'state', name: 'Government of Lebanon' }
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
            value: { min: 43 },
            cites: [
              {
                source: 'hrw-2007-09-05-why-they-died-civilian-casualties-in-lebanon-during-the-2006-war',
                loc: {
                  section: 'Why They Died: Civilian Casualties in Lebanon during the 2006 War'
                }
              }
            ],
            heldBy: [
              { kind: 'organization', name: 'Human Rights Watch' }
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
            value: { min: 1000000, qualifier: 'about' },
            cites: [
              {
                source: 'hrw-2007-09-05-why-they-died-civilian-casualties-in-lebanon-during-the-2006-war',
                loc: {
                  section: 'Why They Died: Civilian Casualties in Lebanon during the 2006 War'
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
      ref: 'event:assassination-of-rafik-hariri',
      rel: 'followed-by',
      cites: [
        {
          source: 'hrw-2007-world-report-lebanon',
          loc: { section: 'World Report 2007: Lebanon', para: '1' }
        }
      ]
    },
    {
      ref: 'event:israeli-invasion-of-lebanon-1982',
      rel: 'response-to',
      cites: [
        {
          source: 'iranica-menashri-parsi-israel-i-relations-with-iran',
          loc: { section: 'ISRAEL i. RELATIONS WITH IRAN', para: '86' }
        }
      ]
    },
    {
      ref: 'event:iranian-nuclear-program-crisis',
      rel: 'related',
      cites: [
        {
          source: 'iranica-menashri-parsi-israel-i-relations-with-iran',
          loc: { section: 'ISRAEL i. RELATIONS WITH IRAN', para: '89' }
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
          text: 'Lebanon\'s tentative steps towards reform and stability following the assassination of former Prime Minister Rafiq Hariri and the subsequent withdrawal of Syrian troops came to a halt after war broke out between Hezbollah and Israel on July 12. The 34-day conflict devastated the country and killed an estimated 1,000 civilians.',
          lang: 'en',
          cite: {
            source: 'hrw-2007-world-report-lebanon',
            loc: { section: 'World Report 2007: Lebanon', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.hrw.org/world-report/2007/country-chapters-3'
          }
        },
        {
          id: 'q2',
          text: 'In this report, Human Rights Watch examines military operations by Israeli and Hezbollah forces in Lebanon during the armed conflict that lasted from July 12 until August 14, 2006.',
          lang: 'en',
          cite: {
            source: 'hrw-2007-09-05-why-they-died-civilian-casualties-in-lebanon-during-the-2006-war',
            loc: { section: 'Why They Died: Civilian Casualties in Lebanon during the 2006 War' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.hrw.org/report/2007/09/05/why-they-died/civilian-casualties-lebanon-during-2006-war'
          }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q3',
          text: 'The Israeli withdrawal from southern Lebanon in May 2000 was followed by the break-up of the Army of Southern Lebanon, which was a victory for the Hezbollah, whose active resistance was mainly responsible for the withdrawal.',
          lang: 'en',
          cite: {
            source: 'iranica-mervin-shiites-in-lebanon',
            loc: { section: 'SHIʿITES IN LEBANON' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/shiites-in-lebanon'
          }
        },
        {
          id: 'q4',
          text: 'Out of the Israeli invasion emerged a new and invigorated Shiʿite movement, inspired by Iran’s Islamic Revolution.',
          lang: 'en',
          cite: {
            source: 'iranica-menashri-parsi-israel-i-relations-with-iran',
            loc: { section: 'ISRAEL i. RELATIONS WITH IRAN', para: '86' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/israel-i-relations-with-iran/'
          }
        }
      ]
    },
    {
      kind: 'course',
      quotes: [
        {
          id: 'q5',
          text: 'Almost immediately after the abductions of the soldiers, IDF warplanes began bombing bridges, roads, and suspected Hezbollah positions.',
          lang: 'en',
          cite: {
            source: 'hrw-2007-09-05-why-they-died-civilian-casualties-in-lebanon-during-the-2006-war',
            loc: { section: 'Why They Died: Civilian Casualties in Lebanon during the 2006 War' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.hrw.org/report/2007/09/05/why-they-died/civilian-casualties-lebanon-during-2006-war'
          }
        },
        {
          id: 'q6',
          text: 'According to Halutz, the Israeli offensive in Lebanon had four major objectives: obtaining the release of the two kidnapped soldiers, "to remodel the security situation along the [Israeli-Lebanese] border and to prevent the Hezbollah from reaching Israeli territory," "to weaken the Hezbollah organization," and to get the "Lebanese government to exercise its sovereignty over its own [territory] and activities that emanate from its territory."',
          lang: 'en',
          cite: {
            source: 'hrw-2007-09-05-why-they-died-civilian-casualties-in-lebanon-during-the-2006-war',
            loc: { section: 'Why They Died: Civilian Casualties in Lebanon during the 2006 War' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.hrw.org/report/2007/09/05/why-they-died/civilian-casualties-lebanon-during-2006-war'
          }
        },
        {
          id: 'q7',
          text: 'As it became increasingly likely that Israel would fail to debilitate Hezbollah quickly through its massive air campaign, Washington and London provided for it the political support and cover to continue the war, in spite of the international protests and calls for an immediate ceasefire.',
          lang: 'en',
          cite: {
            source: 'iranica-menashri-parsi-israel-i-relations-with-iran',
            loc: { section: 'ISRAEL i. RELATIONS WITH IRAN', para: '91' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/israel-i-relations-with-iran/'
          }
        },
        {
          id: 'q8',
          text: 'For its part, Hezbollah launched thousands of rockets on cities, towns, and villages in northern Israel, using a variety of unguided surface-to-surface rockets.',
          lang: 'en',
          cite: {
            source: 'hrw-2007-world-report-lebanon',
            loc: { section: 'World Report 2007: Lebanon', para: '8' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.hrw.org/world-report/2007/country-chapters-3'
          }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q9',
          text: 'Israeli warplanes launched some 7,000 bomb and missile strikes in Lebanon, which were supplemented by numerous artillery attacks and naval bombardment.',
          lang: 'en',
          cite: {
            source: 'hrw-2007-09-05-why-they-died-civilian-casualties-in-lebanon-during-the-2006-war',
            loc: { section: 'Why They Died: Civilian Casualties in Lebanon during the 2006 War' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.hrw.org/report/2007/09/05/why-they-died/civilian-casualties-lebanon-during-2006-war'
          }
        },
        {
          id: 'q10',
          text: 'According to the Lebanese government, the Israel-Hezbollah war resulted in 1,189 killed (mostly civilians), 4,399 injured, and an estimated one million displaced.',
          lang: 'en',
          cite: {
            source: 'hrw-2007-world-report-lebanon',
            loc: { section: 'World Report 2007: Lebanon', para: '5' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.hrw.org/world-report/2007/country-chapters-3'
          }
        },
        {
          id: 'q11',
          text: 'Israel\'s extensive use of cluster munitions also continues to be a pressing concern.',
          lang: 'en',
          cite: {
            source: 'hrw-2007-world-report-lebanon',
            loc: { section: 'World Report 2007: Lebanon', para: '7' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.hrw.org/world-report/2007/country-chapters-3'
          }
        }
      ]
    },
    {
      kind: 'casualties',
      quotes: [
        {
          id: 'q12',
          text: 'According to this new research, the conflict resulted in at least 1,109 Lebanese deaths, the vast majority of whom were civilians, 4,399 injured, and an estimated 1 million displaced.',
          lang: 'en',
          cite: {
            source: 'hrw-2007-09-05-why-they-died-civilian-casualties-in-lebanon-during-the-2006-war',
            loc: { section: 'Why They Died: Civilian Casualties in Lebanon during the 2006 War' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.hrw.org/report/2007/09/05/why-they-died/civilian-casualties-lebanon-during-2006-war'
          }
        },
        {
          id: 'q13',
          text: 'To answer these three questions, Human Rights Watch investigated over 94 separate incidents of IDF air, artillery, and ground attacks that claimed 510 civilian lives and those of 51 Hezbollah combatants, or almost half of the Lebanese deaths in the conflict.',
          lang: 'en',
          cite: {
            source: 'hrw-2007-09-05-why-they-died-civilian-casualties-in-lebanon-during-the-2006-war',
            loc: { section: 'Why They Died: Civilian Casualties in Lebanon during the 2006 War' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.hrw.org/report/2007/09/05/why-they-died/civilian-casualties-lebanon-during-2006-war'
          }
        }
      ]
    },
    {
      kind: 'in-their-words',
      quotes: [
        {
          id: 'q14',
          text: '1. Calls for a full cessation of hostilities based upon, in particular, the immediate cessation by Hizbollah of all attacks and the immediate cessation by Israel of all offensive military operations;',
          lang: 'en',
          cite: { source: 'unsc-resolution-1701-2006', loc: { section: 'Resolution 1701 (2006)' } },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://en.wikisource.org/wiki/United_Nations_Security_Council_Resolution_1701'
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
            value: { d: '2006-07-12' },
            cites: [
              {
                source: 'hrw-2007-09-05-why-they-died-civilian-casualties-in-lebanon-during-the-2006-war',
                loc: {
                  section: 'Why They Died: Civilian Casualties in Lebanon during the 2006 War'
                }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q15',
        text: 'At about 9 a.m. on July 12, 2006, Hezbollah fighters crossed into Israeli territory and attacked an IDF convoy patrolling the border, killing three IDF soldiers and taking two captured IDF soldiers back into Lebanon.',
        lang: 'en',
        cite: {
          source: 'hrw-2007-09-05-why-they-died-civilian-casualties-in-lebanon-during-the-2006-war',
          loc: { section: 'Why They Died: Civilian Casualties in Lebanon during the 2006 War' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-13',
          url: 'https://www.hrw.org/report/2007/09/05/why-they-died/civilian-casualties-lebanon-during-2006-war'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '2006-07-13' },
            cites: [
              {
                source: 'hrw-2007-09-05-why-they-died-civilian-casualties-in-lebanon-during-the-2006-war',
                loc: {
                  section: 'Why They Died: Civilian Casualties in Lebanon during the 2006 War'
                }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q16',
        text: 'On July 13, Israel imposed a total land, sea, and air blockade on Lebanon that would continue until September, well after the ceasefire began on August 14, 2006.',
        lang: 'en',
        cite: {
          source: 'hrw-2007-09-05-why-they-died-civilian-casualties-in-lebanon-during-the-2006-war',
          loc: { section: 'Why They Died: Civilian Casualties in Lebanon during the 2006 War' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-13',
          url: 'https://www.hrw.org/report/2007/09/05/why-they-died/civilian-casualties-lebanon-during-2006-war'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '2006-07-30' },
            cites: [
              {
                source: 'hrw-2007-09-05-why-they-died-civilian-casualties-in-lebanon-during-the-2006-war',
                loc: {
                  section: 'Why They Died: Civilian Casualties in Lebanon during the 2006 War'
                }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q17',
        text: 'Around 1 a.m. on July 30, Israeli warplanes fired missiles at the village of Qana.',
        lang: 'en',
        cite: {
          source: 'hrw-2007-09-05-why-they-died-civilian-casualties-in-lebanon-during-the-2006-war',
          loc: { section: 'Why They Died: Civilian Casualties in Lebanon during the 2006 War' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-13',
          url: 'https://www.hrw.org/report/2007/09/05/why-they-died/civilian-casualties-lebanon-during-2006-war'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '2006-08-13' },
            cites: [
              {
                source: 'hrw-2007-09-05-why-they-died-civilian-casualties-in-lebanon-during-the-2006-war',
                loc: {
                  section: 'Why They Died: Civilian Casualties in Lebanon during the 2006 War'
                }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q18',
        text: 'The most devastating example of a failure to take adequate precautions was the attack on the last night of the war on the Imam Hassan building complex, in the Rweiss neighborhood of southern Beirut.',
        lang: 'en',
        cite: {
          source: 'hrw-2007-09-05-why-they-died-civilian-casualties-in-lebanon-during-the-2006-war',
          loc: { section: 'Why They Died: Civilian Casualties in Lebanon during the 2006 War' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-13',
          url: 'https://www.hrw.org/report/2007/09/05/why-they-died/civilian-casualties-lebanon-during-2006-war'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '2006-07-23' },
            cites: [
              {
                source: 'hrw-2007-09-05-why-they-died-civilian-casualties-in-lebanon-during-the-2006-war',
                loc: {
                  section: 'Why They Died: Civilian Casualties in Lebanon during the 2006 War'
                }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q19',
        text: 'During the first stage of the war, from July 12 to July 23, Israeli forces relied almost exclusively on a massive aerial, naval, and artillery bombardment campaign, attempting to degrade Hezbollah\'s military capacity by targeting its forces, facilities, and rockets, while at the same time pressuring non-Hezbollah elements of Lebanese society to "turn against" and neutralize Hezbollah.',
        lang: 'en',
        cite: {
          source: 'hrw-2007-09-05-why-they-died-civilian-casualties-in-lebanon-during-the-2006-war',
          loc: { section: 'Why They Died: Civilian Casualties in Lebanon during the 2006 War' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-13',
          url: 'https://www.hrw.org/report/2007/09/05/why-they-died/civilian-casualties-lebanon-during-2006-war'
        }
      }
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/b/bb/2006_Lebanon_War._CI.jpg/1280px-2006_Lebanon_War._CI.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:2006_Lebanon_War._CI.jpg',
    credit: { institution: 'IDF Spokesperson\'s Unit', creator: 'Avir Sultan' },
    license: { id: 'cc-by-sa', version: '3.0', url: 'https://creativecommons.org/licenses/by-sa/3.0' }
  }
})
