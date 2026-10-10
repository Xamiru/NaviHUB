import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'rwandan-genocide',
  names: [
    { text: 'Rwandan genocide', lang: 'en', role: 'primary' },
    { text: 'Jenoside yakorewe Abatutsi', lang: 'rw', role: 'native' },
    {
      text: 'Genocide against the Tutsi',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'hrw-1999-leave-none-to-tell-the-story-introduction',
          loc: { section: 'Introduction', para: '3' }
        }
      ]
    }
  ],
  researched: '2026-10-10',
  type: 'genocide',
  start: {
    alts: [
      {
        value: { d: '1994-04-06' },
        cites: [
          {
            source: 'hrw-1999-leave-none-to-tell-the-story-introduction',
            loc: { section: 'Introduction', para: '3' }
          },
          {
            source: 'hrw-1999-leave-none-to-tell-the-story-the-genocide',
            loc: { section: 'The Genocide', para: '14' }
          }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1994-07' },
        cites: [
          {
            source: 'hrw-2004-leave-none-to-tell-the-story-ten-years-later',
            loc: { section: 'Ten Years Later', para: '11' }
          }
        ]
      }
    ]
  },
  regions: ['subsaharan-africa'],
  prominence: 1,
  places: [
    {
      ref: 'place:kigali',
      cites: [
        {
          source: 'hrw-1999-leave-none-to-tell-the-story-the-genocide',
          loc: { section: 'The Genocide', para: '30' }
        }
      ]
    }
  ],
  sides: [
    {
      key: 'interim',
      name: 'Interim government and Hutu Power',
      cites: [
        {
          source: 'hrw-1999-leave-none-to-tell-the-story-the-genocide',
          loc: { section: 'The Genocide', para: '13' }
        }
      ]
    },
    {
      key: 'rpf',
      name: 'Rwandan Patriotic Front',
      cites: [
        {
          source: 'hrw-1999-leave-none-to-tell-the-story-the-rwandan-patriotic-front',
          loc: { section: 'The Rwandan Patriotic Front', para: '1' }
        }
      ]
    }
  ],
  participants: [
    {
      name: 'Juvénal Habyarimana',
      role: 'victim',
      side: 'interim',
      cites: [
        {
          source: 'hrw-1999-leave-none-to-tell-the-story-the-genocide',
          loc: { section: 'The Genocide', para: '14' }
        }
      ]
    },
    {
      name: 'Théoneste Bagosora',
      role: 'perpetrator',
      side: 'interim',
      cites: [
        {
          source: 'hrw-1999-leave-none-to-tell-the-story-the-genocide',
          loc: { section: 'The Genocide', para: '14' }
        }
      ]
    },
    {
      name: 'Paul Kagame',
      role: 'commander',
      side: 'rpf',
      cites: [
        {
          source: 'hrw-1999-leave-none-to-tell-the-story-the-rwandan-patriotic-front',
          loc: { section: 'The Rwandan Patriotic Front', para: '5' }
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
            value: { min: 500000 },
            cites: [
              {
                source: 'hrw-1999-leave-none-to-tell-the-story-introduction',
                loc: { section: 'Introduction', para: '3' }
              }
            ],
            heldBy: [
              { kind: 'organization', name: 'Human Rights Watch' }
            ]
          },
          {
            value: { min: 800000, qualifier: 'about' },
            cites: [
              {
                source: 'millercenter-riley-clinton-foreign-affairs',
                loc: { section: 'Bill Clinton: Foreign Affairs', para: '4' }
              }
            ],
            heldBy: [
              {
                kind: 'organization',
                name: 'Miller Center of Public Affairs, University of Virginia'
              }
            ]
          }
        ]
      }
    }
  ],
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'In the thirteen weeks after April 6, 1994, at least half a million people perished in the Rwandan genocide, perhaps as many as three quarters of the Tutsi population.',
          lang: 'en',
          cite: {
            source: 'hrw-1999-leave-none-to-tell-the-story-introduction',
            loc: { section: 'Introduction', para: '3' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'https://www.hrw.org/legacy/reports/1999/rwanda/Geno1-3-01.htm'
          }
        },
        {
          id: 'q2',
          text: 'An estimated 800,000 Tutsi and their defenders were murdered in a government-sponsored genocide.',
          lang: 'en',
          cite: {
            source: 'millercenter-riley-clinton-foreign-affairs',
            loc: { section: 'Bill Clinton: Foreign Affairs', para: '4' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'https://millercenter.org/president/clinton/foreign-affairs'
          }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q3',
          text: 'President Juvenal Habyarimana, nearing the end of two decades in power, was losing popularity among Rwandans when the RPF attacked from Uganda on October 1, 1990.',
          lang: 'en',
          cite: {
            source: 'hrw-1999-leave-none-to-tell-the-story-the-genocide',
            loc: { section: 'The Genocide', para: '2' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'https://www.hrw.org/legacy/reports/1999/rwanda/Geno1-3-02.htm'
          }
        },
        {
          id: 'q4',
          text: 'By early 1992, Habyarimana had begun providing military training to the youth of his party, who were thus transformed into the militia known as the Interahamwe (Those Who Stand Together or Those Who Attack Together).',
          lang: 'en',
          cite: {
            source: 'hrw-1999-leave-none-to-tell-the-story-the-genocide',
            loc: { section: 'The Genocide', para: '6' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'https://www.hrw.org/legacy/reports/1999/rwanda/Geno1-3-02.htm'
          }
        },
        {
          id: 'q5',
          text: 'During 1993 a dramatic military advance by the RPF and a peace settlement favorable to them—which also stipulated that officials, including the president, could be prosecuted for past abuses—confronted Habyarimana and his supporters with the imminent loss of power.',
          lang: 'en',
          cite: {
            source: 'hrw-1999-leave-none-to-tell-the-story-the-genocide',
            loc: { section: 'The Genocide', para: '8' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'https://www.hrw.org/legacy/reports/1999/rwanda/Geno1-3-02.htm'
          }
        }
      ]
    },
    {
      kind: 'causes',
      quotes: [
        {
          id: 'q6',
          text: 'In the campaign to create hatred and fear of the Tutsi, the Habyarimana circle played upon memories of past domination by the minority and on the legacy of the revolution that overthrew their rule and drove many into exile in 1959.',
          lang: 'en',
          cite: {
            source: 'hrw-1999-leave-none-to-tell-the-story-the-genocide',
            loc: { section: 'The Genocide', para: '3' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'https://www.hrw.org/legacy/reports/1999/rwanda/Geno1-3-02.htm'
          }
        },
        {
          id: 'q7',
          text: 'This genocide resulted from the deliberate choice of a modern elite to foster hatred and fear to keep itself in power.',
          lang: 'en',
          cite: {
            source: 'hrw-1999-leave-none-to-tell-the-story-introduction',
            loc: { section: 'Introduction', para: '6' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'https://www.hrw.org/legacy/reports/1999/rwanda/Geno1-3-01.htm'
          }
        },
        {
          id: 'q8',
          text: 'But this genocide was not an uncontrollable outburst of rage by a people consumed by “ancient tribal hatreds.”',
          lang: 'en',
          cite: {
            source: 'hrw-1999-leave-none-to-tell-the-story-introduction',
            loc: { section: 'Introduction', para: '5' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'https://www.hrw.org/legacy/reports/1999/rwanda/Geno1-3-01.htm'
          }
        }
      ]
    },
    {
      kind: 'course',
      quotes: [
        {
          id: 'q9',
          text: 'By late March 1994, Hutu Power leaders were determined to slaughter massive numbers of Tutsi and Hutu opposed to Habyarimana, both to rid themselves of these “accomplices” and to shatter the peace agreement.',
          lang: 'en',
          cite: {
            source: 'hrw-1999-leave-none-to-tell-the-story-the-genocide',
            loc: { section: 'The Genocide', para: '13' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'https://www.hrw.org/legacy/reports/1999/rwanda/Geno1-3-02.htm'
          }
        },
        {
          id: 'q10',
          text: 'By appropriating the well-established hierarchies of the military, administrative and political systems, leaders of the genocide were able to exterminate Tutsi with astonishing speed and thoroughness.',
          lang: 'en',
          cite: {
            source: 'hrw-1999-leave-none-to-tell-the-story-the-genocide',
            loc: { section: 'The Genocide', para: '23' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'https://www.hrw.org/legacy/reports/1999/rwanda/Geno1-3-02.htm'
          }
        },
        {
          id: 'q11',
          text: 'In the first days of killing in Kigali, assailants sought out and murdered targeted individuals and also went systematically from house to house in certain neighborhoods, killing Tutsi and Hutu opposed to Habyarimana.',
          lang: 'en',
          cite: {
            source: 'hrw-1999-leave-none-to-tell-the-story-the-genocide',
            loc: { section: 'The Genocide', para: '30' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'https://www.hrw.org/legacy/reports/1999/rwanda/Geno1-3-02.htm'
          }
        },
        {
          id: 'q12',
          text: 'In defeating the interim government and its army, the RPF ended the genocide.',
          lang: 'en',
          cite: {
            source: 'hrw-1999-leave-none-to-tell-the-story-the-rwandan-patriotic-front',
            loc: { section: 'The Rwandan Patriotic Front', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'https://www.hrw.org/legacy/reports/1999/rwanda/Geno1-3-03.htm'
          }
        }
      ]
    },
    {
      kind: 'casualties',
      quotes: [
        {
          id: 'q13',
          text: 'Establishing a reliable toll of those killed in the genocide and its aftermath is important to counter denials, exaggerations, and lies.',
          lang: 'en',
          cite: {
            source: 'hrw-1999-leave-none-to-tell-the-story-numbers',
            loc: { section: 'Numbers', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'https://www.hrw.org/legacy/reports/1999/rwanda/Geno1-3-04.htm'
          }
        },
        {
          id: 'q14',
          text: 'A U.N. expert evaluating population loss in Rwanda estimated that 800,000 Rwandans had died between April and July 1994, but this figure included those who had died from causes other than the genocide.',
          lang: 'en',
          cite: {
            source: 'hrw-1999-leave-none-to-tell-the-story-numbers',
            loc: { section: 'Numbers', para: '5' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'https://www.hrw.org/legacy/reports/1999/rwanda/Geno1-3-04.htm'
          }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q15',
          text: 'In mid-1994 officials of the former government, soldiers, and militia fled to the Congo, leading more than a million Rwandans into exile.',
          lang: 'en',
          cite: {
            source: 'hrw-2004-leave-none-to-tell-the-story-ten-years-later',
            loc: { section: 'Ten Years Later', para: '13' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'https://www.hrw.org/legacy/reports/1999/rwanda/10years.htm'
          }
        },
        {
          id: 'q16',
          text: 'In 1994, the United Nations Security Council established the International Criminal Tribunal for Rwanda to judge those who had once been permitted to kill without hindrance.',
          lang: 'en',
          cite: {
            source: 'hrw-2004-leave-none-to-tell-the-story-ten-years-later',
            loc: { section: 'Ten Years Later', para: '5' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'https://www.hrw.org/legacy/reports/1999/rwanda/10years.htm'
          }
        },
        {
          id: 'q17',
          text: 'If the Rwanda genocide had positive consequences elsewhere in spurring action to avert genocide, its impact in Rwanda and the surrounding region has been devastatingly negative.',
          lang: 'en',
          cite: {
            source: 'hrw-2004-leave-none-to-tell-the-story-ten-years-later',
            loc: { section: 'Ten Years Later', para: '10' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'https://www.hrw.org/legacy/reports/1999/rwanda/10years.htm'
          }
        }
      ]
    },
    {
      kind: 'legacy',
      quotes: [
        {
          id: 'q18',
          text: 'The Rwandan genocide of 1994 was one of the defining events of the twentieth century.',
          lang: 'en',
          cite: {
            source: 'hrw-2004-leave-none-to-tell-the-story-ten-years-later',
            loc: { section: 'Ten Years Later', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'https://www.hrw.org/legacy/reports/1999/rwanda/10years.htm'
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
            value: { d: '1994-04' },
            cites: [
              {
                source: 'hrw-1999-leave-none-to-tell-the-story-the-genocide',
                loc: { section: 'The Genocide', para: '32' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q22',
        text: 'Towards the end of April, authorities declared a campaign of “pacification,” which meant not an end to killing, but greater control over killing.',
        lang: 'en',
        cite: {
          source: 'hrw-1999-leave-none-to-tell-the-story-the-genocide',
          loc: { section: 'The Genocide', para: '32' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-10',
          url: 'https://www.hrw.org/legacy/reports/1999/rwanda/Geno1-3-02.htm'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1994-04-06' },
            cites: [
              {
                source: 'hrw-1999-leave-none-to-tell-the-story-the-genocide',
                loc: { section: 'The Genocide', para: '14' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q19',
        text: 'On April 6, the plane carrying President Habyarimana was shot down, a crime for which the responsibility has never been established.',
        lang: 'en',
        cite: {
          source: 'hrw-1999-leave-none-to-tell-the-story-the-genocide',
          loc: { section: 'The Genocide', para: '14' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-10',
          url: 'https://www.hrw.org/legacy/reports/1999/rwanda/Geno1-3-02.htm'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1994-04-15' },
            cites: [
              {
                source: 'hrw-1999-leave-none-to-tell-the-story-the-genocide',
                loc: { section: 'The Genocide', para: '20' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q20',
        text: 'By April 15, it was clear that the U.N. Security Council would not order the peacekeepers to try to stop the violence and might even withdraw them completely.',
        lang: 'en',
        cite: {
          source: 'hrw-1999-leave-none-to-tell-the-story-the-genocide',
          loc: { section: 'The Genocide', para: '20' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-10',
          url: 'https://www.hrw.org/legacy/reports/1999/rwanda/Geno1-3-02.htm'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1994-04-20' },
            cites: [
              {
                source: 'hrw-1999-leave-none-to-tell-the-story-the-genocide',
                loc: { section: 'The Genocide', para: '22' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q21',
        text: 'By April 20, two weeks after the plane crash, the organizers of the genocide had substantial, although not yet complete, control of the highly centralized state.',
        lang: 'en',
        cite: {
          source: 'hrw-1999-leave-none-to-tell-the-story-the-genocide',
          loc: { section: 'The Genocide', para: '22' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-10',
          url: 'https://www.hrw.org/legacy/reports/1999/rwanda/Geno1-3-02.htm'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1994-05' },
            cites: [
              {
                source: 'hrw-1999-leave-none-to-tell-the-story-the-genocide',
                loc: { section: 'The Genocide', para: '33' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q23',
        text: 'By mid-May, the authorities ordered the final phase, that of tracking down the last surviving Tutsi.',
        lang: 'en',
        cite: {
          source: 'hrw-1999-leave-none-to-tell-the-story-the-genocide',
          loc: { section: 'The Genocide', para: '33' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-10',
          url: 'https://www.hrw.org/legacy/reports/1999/rwanda/Geno1-3-02.htm'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1994-07' },
            cites: [
              {
                source: 'hrw-2004-leave-none-to-tell-the-story-ten-years-later',
                loc: { section: 'Ten Years Later', para: '11' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q24',
        text: 'The Rwandan genocide was intertwined with the war between the government and the Rwandan Patriotic Front (RPF).',
        lang: 'en',
        cite: {
          source: 'hrw-2004-leave-none-to-tell-the-story-ten-years-later',
          loc: { section: 'Ten Years Later', para: '11' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-10',
          url: 'https://www.hrw.org/legacy/reports/1999/rwanda/10years.htm'
        }
      }
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/3/33/Grounds_of_Kigali_Genocide_Memorial_with_City_in_the_Distance_-_Kigali_-_Rwanda.jpg/1280px-Grounds_of_Kigali_Genocide_Memorial_with_City_in_the_Distance_-_Kigali_-_Rwanda.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Grounds_of_Kigali_Genocide_Memorial_with_City_in_the_Distance_-_Kigali_-_Rwanda.jpg',
    credit: { creator: 'Adam Jones' },
    license: { id: 'cc-by-sa', version: '3.0', url: 'https://creativecommons.org/licenses/by-sa/3.0' }
  }
})
