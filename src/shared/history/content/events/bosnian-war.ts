import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'bosnian-war',
  names: [
    { text: 'Bosnian war', lang: 'en', role: 'primary' },
    { text: 'Rat u Bosni i Hercegovini', lang: 'bs', role: 'native' },
    {
      text: 'War in Bosnia and Herzegovina',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'state-dept-milestones-the-breakup-of-yugoslavia-1990-1992',
          loc: { section: 'The Breakup of Yugoslavia, 1990–1992', para: '10' }
        }
      ]
    }
  ],
  researched: '2026-10-10',
  type: 'war',
  start: {
    alts: [
      {
        value: { d: '1992-04' },
        cites: [
          {
            source: 'hrw-1995-the-fall-of-srebrenica-and-the-failure-of-un-peacekeeping',
            loc: {
              section: 'The Fall of Srebrenica and the Failure of UN Peacekeeping',
              para: '31'
            }
          }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1995-12-14' },
        cites: [
          {
            source: 'ohr-general-framework-agreement-for-peace-in-bosnia-and-herzegovina',
            loc: { section: 'The General Framework Agreement for Peace in Bosnia and Herzegovina' }
          }
        ]
      }
    ]
  },
  regions: ['europe'],
  prominence: 2,
  places: [
    {
      ref: 'place:bosnia-and-herzegovina',
      cites: [
        {
          source: 'state-dept-milestones-the-breakup-of-yugoslavia-1990-1992',
          loc: { section: 'The Breakup of Yugoslavia, 1990–1992', para: '10' }
        }
      ]
    },
    {
      ref: 'place:sarajevo',
      cites: [
        {
          source: 'state-dept-1995-11-30-summary-of-the-general-framework-agreement',
          loc: { section: 'Summary of the General Framework Agreement', para: '31' }
        }
      ]
    },
    {
      ref: 'place:srebrenica',
      cites: [
        {
          source: 'hrw-1995-the-fall-of-srebrenica-and-the-failure-of-un-peacekeeping',
          loc: { section: 'The Fall of Srebrenica and the Failure of UN Peacekeeping', para: '2' }
        }
      ]
    }
  ],
  sides: [
    {
      key: 'vrs',
      name: 'Bosnian Serb forces',
      cites: [
        {
          source: 'hrw-1995-the-fall-of-srebrenica-and-the-failure-of-un-peacekeeping',
          loc: { section: 'The Fall of Srebrenica and the Failure of UN Peacekeeping', para: '31' }
        }
      ]
    },
    {
      key: 'government',
      name: 'Bosnian government forces',
      cites: [
        {
          source: 'hrw-1995-the-fall-of-srebrenica-and-the-failure-of-un-peacekeeping',
          loc: { section: 'The Fall of Srebrenica and the Failure of UN Peacekeeping', para: '32' }
        }
      ]
    }
  ],
  participants: [
    {
      ref: 'person:slobodan-milosevic',
      role: 'leader',
      side: 'vrs',
      cites: [
        {
          source: 'state-dept-milestones-the-breakup-of-yugoslavia-1990-1992',
          loc: { section: 'The Breakup of Yugoslavia, 1990–1992', para: '7' }
        }
      ]
    },
    {
      name: 'Ratko Mladić',
      role: 'commander',
      side: 'vrs',
      cites: [
        {
          source: 'hrw-1995-the-fall-of-srebrenica-and-the-failure-of-un-peacekeeping',
          loc: { section: 'The Fall of Srebrenica and the Failure of UN Peacekeeping', para: '41' }
        }
      ]
    },
    {
      name: 'James Baker',
      role: 'diplomat',
      cites: [
        {
          source: 'state-dept-milestones-the-breakup-of-yugoslavia-1990-1992',
          loc: { section: 'The Breakup of Yugoslavia, 1990–1992', para: '8' }
        }
      ]
    },
    {
      name: 'Naser Orić',
      role: 'commander',
      side: 'government',
      cites: [
        {
          source: 'hrw-1995-the-fall-of-srebrenica-and-the-failure-of-un-peacekeeping',
          loc: { section: 'The Fall of Srebrenica and the Failure of UN Peacekeeping', para: '34' }
        }
      ]
    }
  ],
  related: [
    {
      ref: 'event:kosovo-war',
      rel: 'followed-by',
      cites: [
        {
          source: 'state-dept-milestones-the-breakup-of-yugoslavia-1990-1992',
          loc: { section: 'The Breakup of Yugoslavia, 1990–1992', para: '10' }
        }
      ]
    },
    {
      ref: 'event:dissolution-of-the-soviet-union',
      rel: 'contributed-to',
      cites: [
        {
          source: 'state-dept-milestones-the-breakup-of-yugoslavia-1990-1992',
          loc: { section: 'The Breakup of Yugoslavia, 1990–1992', para: '6' }
        }
      ]
    },
    {
      ref: 'event:german-reunification',
      rel: 'contributed-to',
      cites: [
        {
          source: 'state-dept-milestones-the-breakup-of-yugoslavia-1990-1992',
          loc: { section: 'The Breakup of Yugoslavia, 1990–1992', para: '6' }
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
          text: 'Serbia and Montenegro formed a new Federal Republic of Yugoslavia as a successor state to old Yugoslavia, but the international community did not recognize its successor claim. Over the next three years, the war in Bosnia and Herzegovina claimed hundreds of thousands of lives and displaced millions from their homes, as Europe witnessed the most horrific fighting on its territory since the end of World War II.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-the-breakup-of-yugoslavia-1990-1992',
            loc: { section: 'The Breakup of Yugoslavia, 1990–1992', para: '10' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'https://history.state.gov/milestones/1989-1992/breakup-yugoslavia'
          }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q2',
          text: 'Yugoslavia—the land of South (i.e. Yugo) Slavs—was created at the end of World War I when Croat, Slovenian, and Bosnian territories that had been part of the Austro-Hungarian Empire united with the Serbian Kingdom.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-the-breakup-of-yugoslavia-1990-1992',
            loc: { section: 'The Breakup of Yugoslavia, 1990–1992', para: '5' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'https://history.state.gov/milestones/1989-1992/breakup-yugoslavia'
          }
        },
        {
          id: 'q3',
          text: 'The varied reasons for the country’s breakup ranged from the cultural and religious divisions between the ethnic groups making up the nation, to the memories of WWII atrocities committed by all sides, to centrifugal nationalist forces.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-the-breakup-of-yugoslavia-1990-1992',
            loc: { section: 'The Breakup of Yugoslavia, 1990–1992', para: '6' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'https://history.state.gov/milestones/1989-1992/breakup-yugoslavia'
          }
        },
        {
          id: 'q4',
          text: 'Slovenia and Croatia both declared formal independence on June 25, 1991.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-the-breakup-of-yugoslavia-1990-1992',
            loc: { section: 'The Breakup of Yugoslavia, 1990–1992', para: '8' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'https://history.state.gov/milestones/1989-1992/breakup-yugoslavia'
          }
        },
        {
          id: 'q5',
          text: 'In Bosnia-Herzegovina, a referendum on independence took place in March 1992, but was boycotted by the Serb minority.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-the-breakup-of-yugoslavia-1990-1992',
            loc: { section: 'The Breakup of Yugoslavia, 1990–1992', para: '9' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'https://history.state.gov/milestones/1989-1992/breakup-yugoslavia'
          }
        }
      ]
    },
    {
      kind: 'course',
      quotes: [
        {
          id: 'q6',
          text: 'Thousands of mostly Muslim refugees from other areas of eastern Bosnia flocked to places like Cepa, Gorazde and Srebrenica, where territorial defense units had succeeded in fending off the Bosnian Serb attacks.',
          lang: 'en',
          cite: {
            source: 'hrw-1995-the-fall-of-srebrenica-and-the-failure-of-un-peacekeeping',
            loc: {
              section: 'The Fall of Srebrenica and the Failure of UN Peacekeeping',
              para: '33'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'https://www.hrw.org/report/1995/10/15/fall-srebrenica-and-failure-un-peacekeeping/bosnia-and-herzegovina'
          }
        },
        {
          id: 'q7',
          text: 'In late June and the days leading up to July 6, the number of shells landing within 200 meters of U.N. observation posts inside the enclave had increased substantially, concentrated mainly in the southern part of the enclave.',
          lang: 'en',
          cite: {
            source: 'hrw-1995-the-fall-of-srebrenica-and-the-failure-of-un-peacekeeping',
            loc: {
              section: 'The Fall of Srebrenica and the Failure of UN Peacekeeping',
              para: '54'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'https://www.hrw.org/report/1995/10/15/fall-srebrenica-and-failure-un-peacekeeping/bosnia-and-herzegovina'
          }
        },
        {
          id: 'q8',
          text: 'By the time the air strikes occurred on July 11, much of the enclave was already in Bosnian Serb hands and most of the civilian population had already begun to retreat toward the Dutch battalion’s U.N. base in the village of Potocari.',
          lang: 'en',
          cite: {
            source: 'hrw-1995-the-fall-of-srebrenica-and-the-failure-of-un-peacekeeping',
            loc: {
              section: 'The Fall of Srebrenica and the Failure of UN Peacekeeping',
              para: '73'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'https://www.hrw.org/report/1995/10/15/fall-srebrenica-and-failure-un-peacekeeping/bosnia-and-herzegovina'
          }
        }
      ]
    },
    {
      kind: 'aftermath',
      quotes: [
        {
          id: 'q9',
          text: 'Bosnia and Herzegovina will continue as a sovereign state within its present internationally-recognized borders.',
          lang: 'en',
          cite: {
            source: 'state-dept-1995-11-30-summary-of-the-general-framework-agreement',
            loc: { section: 'Summary of the General Framework Agreement', para: '44' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'https://en.wikisource.org/wiki/Summary_of_the_General_Framework_Agreement'
          }
        },
        {
          id: 'q10',
          text: 'The agreement invites into Bosnia and Herzegovina a multinational military Implementation Force, the IFOR, under the command of NATO, with a grant of authority from the UN.',
          lang: 'en',
          cite: {
            source: 'state-dept-1995-11-30-summary-of-the-general-framework-agreement',
            loc: { section: 'Summary of the General Framework Agreement', para: '16' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'https://en.wikisource.org/wiki/Summary_of_the_General_Framework_Agreement'
          }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q11',
          text: 'The U.N. General Assembly, the U.N. Commission on Human Rights, the World Conference on Human Rights, and the International Criminal Tribunal for the Former Yugoslavia have all decried the atrocities in Bosnia and Herzegovina as genocide.',
          lang: 'en',
          cite: {
            source: 'hrw-1995-the-fall-of-srebrenica-and-the-failure-of-un-peacekeeping',
            loc: { section: 'The Fall of Srebrenica and the Failure of UN Peacekeeping', para: '7' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'https://www.hrw.org/report/1995/10/15/fall-srebrenica-and-failure-un-peacekeeping/bosnia-and-herzegovina'
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
            value: { d: '1992-04' },
            cites: [
              {
                source: 'hrw-1995-the-fall-of-srebrenica-and-the-failure-of-un-peacekeeping',
                loc: {
                  section: 'The Fall of Srebrenica and the Failure of UN Peacekeeping',
                  para: '31'
                }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q12',
        text: 'When Bosnian Serb forces began their brutal campaign of “ethnic cleansing” in eastern Bosnia and Herzegovina in April and May 1992, most areas quickly fell under Bosnian Serb control.',
        lang: 'en',
        cite: {
          source: 'hrw-1995-the-fall-of-srebrenica-and-the-failure-of-un-peacekeeping',
          loc: { section: 'The Fall of Srebrenica and the Failure of UN Peacekeeping', para: '32' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-10',
          url: 'https://www.hrw.org/report/1995/10/15/fall-srebrenica-and-failure-un-peacekeeping/bosnia-and-herzegovina'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1992-05' },
            cites: [
              {
                source: 'state-dept-milestones-the-breakup-of-yugoslavia-1990-1992',
                loc: { section: 'The Breakup of Yugoslavia, 1990–1992', para: '9' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q13',
        text: 'The republic declared its independence from Yugoslavia in May 1992, while the Serbs in Bosnia declared their own areas an independent republic.',
        lang: 'en',
        cite: {
          source: 'state-dept-milestones-the-breakup-of-yugoslavia-1990-1992',
          loc: { section: 'The Breakup of Yugoslavia, 1990–1992', para: '9' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-10',
          url: 'https://history.state.gov/milestones/1989-1992/breakup-yugoslavia'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1993-04-16' },
            cites: [
              {
                source: 'hrw-1995-the-fall-of-srebrenica-and-the-failure-of-un-peacekeeping',
                loc: {
                  section: 'The Fall of Srebrenica and the Failure of UN Peacekeeping',
                  para: '36'
                }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q14',
        text: 'On April 16, 1993, the U.N. Security Council adopted Resolution 819 declaring Srebrenica a "safe area,” and a cease-fire was signed on April 17.',
        lang: 'en',
        cite: {
          source: 'hrw-1995-the-fall-of-srebrenica-and-the-failure-of-un-peacekeeping',
          loc: { section: 'The Fall of Srebrenica and the Failure of UN Peacekeeping', para: '36' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-10',
          url: 'https://www.hrw.org/report/1995/10/15/fall-srebrenica-and-failure-un-peacekeeping/bosnia-and-herzegovina'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1995-07-06' },
            cites: [
              {
                source: 'hrw-1995-the-fall-of-srebrenica-and-the-failure-of-un-peacekeeping',
                loc: {
                  section: 'The Fall of Srebrenica and the Failure of UN Peacekeeping',
                  para: '56'
                }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q15',
        text: 'Bosnian Serb forces, already less than two kilometers from the center of the city, began to shell civilian targets within the enclave.',
        lang: 'en',
        cite: {
          source: 'hrw-1995-the-fall-of-srebrenica-and-the-failure-of-un-peacekeeping',
          loc: { section: 'The Fall of Srebrenica and the Failure of UN Peacekeeping', para: '56' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-10',
          url: 'https://www.hrw.org/report/1995/10/15/fall-srebrenica-and-failure-un-peacekeeping/bosnia-and-herzegovina'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1995-11-21' },
            cites: [
              {
                source: 'ohr-general-framework-agreement-for-peace-in-bosnia-and-herzegovina',
                loc: {
                  section: 'The General Framework Agreement for Peace in Bosnia and Herzegovina'
                }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q16',
        text: 'The Dayton Proximity Talks culminated in the initialing of a General Framework Agreement for Peace in Bosnia and Herzegovina.',
        lang: 'en',
        cite: {
          source: 'state-dept-1995-11-30-summary-of-the-general-framework-agreement',
          loc: { section: 'Summary of the General Framework Agreement', para: '2' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-10',
          url: 'https://en.wikisource.org/wiki/Summary_of_the_General_Framework_Agreement'
        }
      }
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/9/96/Photograph_of_the_Balkan_Peace_Agreement_Signing_-_DPLA_-_e498109ba0508d829248e3133d890705.jpg/1280px-Photograph_of_the_Balkan_Peace_Agreement_Signing_-_DPLA_-_e498109ba0508d829248e3133d890705.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Photograph_of_the_Balkan_Peace_Agreement_Signing_-_DPLA_-_e498109ba0508d829248e3133d890705.jpg',
    credit: { institution: 'William J. Clinton Presidential Library (via DPLA)' },
    license: { id: 'public-domain' }
  }
})
