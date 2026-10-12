import { defineEvent } from '../../schema'

export default defineEvent({
  id: '2003-bam-earthquake',
  names: [
    { text: '2003 Bam earthquake', lang: 'en', role: 'primary' },
    { text: 'زمین‌لرزه بم', lang: 'fa', role: 'native' },
    { text: 'زلزله بم ۱۳۸۲', lang: 'fa', role: 'alternative' },
    { text: 'Bam earthquake', lang: 'en', role: 'alternative' }
  ],
  researched: '2026-10-13',
  type: 'disaster',
  start: {
    alts: [
      {
        value: { d: '2003-12-26' },
        cites: [
          {
            source: 'iranica-berberian-bam-earthquake',
            loc: { section: 'BAM EARTHQUAKE', para: '1' }
          }
        ]
      }
    ]
  },
  regions: ['iran'],
  prominence: 2,
  places: [
    {
      ref: 'place:bam',
      cites: [
        {
          source: 'iranica-berberian-bam-earthquake',
          loc: { section: 'BAM EARTHQUAKE', para: '1' }
        }
      ]
    },
    {
      ref: 'place:kerman',
      cites: [
        {
          source: 'iranica-berberian-bam-earthquake',
          loc: { section: 'BAM EARTHQUAKE', para: '3' }
        }
      ]
    }
  ],
  polities: [
    {
      ref: 'polity:islamic-republic-of-iran',
      cites: [
        {
          source: 'iranica-berberian-bam-earthquake',
          loc: { section: 'BAM EARTHQUAKE', para: '5' }
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
            value: { min: 31824, max: 43000, qualifier: 'about' },
            cites: [
              {
                source: 'iranica-berberian-bam-earthquake',
                loc: { section: 'BAM EARTHQUAKE', para: '5' }
              }
            ],
            heldBy: [
              { kind: 'scholar', name: 'Manuel Berberian', discipline: 'area-specialist' }
            ]
          }
        ]
      }
    },
    {
      key: 'wounded',
      value: {
        alts: [
          {
            value: { min: 30000, qualifier: 'about' },
            cites: [
              {
                source: 'iranica-berberian-bam-earthquake',
                loc: { section: 'BAM EARTHQUAKE', para: '5' }
              }
            ],
            heldBy: [
              { kind: 'scholar', name: 'Manuel Berberian', discipline: 'area-specialist' }
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
            value: { min: 75000 },
            cites: [
              {
                source: 'iranica-berberian-bam-earthquake',
                loc: { section: 'BAM EARTHQUAKE', para: '5' }
              }
            ],
            heldBy: [
              { kind: 'scholar', name: 'Manuel Berberian', discipline: 'area-specialist' }
            ]
          }
        ]
      }
    }
  ],
  related: [
    {
      ref: 'event:buin-zahra-earthquake',
      rel: 'related',
      cites: [
        {
          source: 'iranica-berberian-bam-earthquake',
          loc: { section: 'BAM EARTHQUAKE', para: '24' }
        }
      ]
    },
    {
      ref: 'event:manjil-rudbar-earthquake',
      rel: 'related',
      cites: [
        {
          source: 'iranica-berberian-bam-earthquake',
          loc: { section: 'BAM EARTHQUAKE', para: '24' }
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
          text: 'A moderate-magnitude (Mw 6.6) earthquake struck the city of Bam and its surroundings in southeast Iran (29.10˚N-58.35˚E) at 05:26 AM local time (01:56 GMT) on Friday 26 December 2003/5 Dey 1382',
          lang: 'en',
          cite: {
            source: 'iranica-berberian-bam-earthquake',
            loc: { section: 'BAM EARTHQUAKE', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://web.archive.org/web/20260129211138/https://www.iranicaonline.org/articles/bam-earthquake-2003/'
          }
        },
        {
          id: 'q2',
          text: 'The earthquake, occurring at the early hours of the morning in winter when most people were in bed, resulted in the highest casualty rate and the most profound social impact in the recorded post-1900 history of devastating urban earthquakes in Iran',
          lang: 'en',
          cite: {
            source: 'iranica-berberian-bam-earthquake',
            loc: { section: 'BAM EARTHQUAKE', para: '2' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://web.archive.org/web/20260129211138/https://www.iranicaonline.org/articles/bam-earthquake-2003/'
          }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q3',
          text: 'Bam, an oasis town with date palms, orange trees, eucalyptus, and oleander, is located at the western edge of the Lut desert, on the eastern frontier of Kermān province in southeast Iran.',
          lang: 'en',
          cite: {
            source: 'iranica-berberian-bam-earthquake',
            loc: { section: 'BAM EARTHQUAKE', para: '3' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://web.archive.org/web/20260129211138/https://www.iranicaonline.org/articles/bam-earthquake-2003/'
          }
        },
        {
          id: 'q4',
          text: 'Prior to the 2003 earthquake, there were 102,087 people living in non-engineered or non-seismically resistant indigenous structures in the city of Bam (with 40% of population under the age of 20), approximately 16,000 in the town of Baravāt, and about 10,000 in the nearby villages.',
          lang: 'en',
          cite: {
            source: 'iranica-berberian-bam-earthquake',
            loc: { section: 'BAM EARTHQUAKE', para: '4' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://web.archive.org/web/20260129211138/https://www.iranicaonline.org/articles/bam-earthquake-2003/'
          }
        }
      ]
    },
    {
      kind: 'course',
      quotes: [
        {
          id: 'q5',
          text: 'As with previous earthquakes in Iran, nearly all the vernacular, conventional (amalgam of modern construction and local technology), and modern structures in Bam completely collapsed.',
          lang: 'en',
          cite: {
            source: 'iranica-berberian-bam-earthquake',
            loc: { section: 'BAM EARTHQUAKE', para: '9' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://web.archive.org/web/20260129211138/https://www.iranicaonline.org/articles/bam-earthquake-2003/'
          }
        },
        {
          id: 'q6',
          text: 'Almost all who died during the earthquake were killed in buildings less than 30 years old.',
          lang: 'en',
          cite: {
            source: 'iranica-berberian-bam-earthquake',
            loc: { section: 'BAM EARTHQUAKE', para: '8' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://web.archive.org/web/20260129211138/https://www.iranicaonline.org/articles/bam-earthquake-2003/'
          }
        },
        {
          id: 'q7',
          text: 'The destruction of the hospitals, medical care centers, pharmacies, the police department, schools, banks, the airport, fire stations, and municipal and communication buildings prevented local emergency response after the disaster.',
          lang: 'en',
          cite: {
            source: 'iranica-berberian-bam-earthquake',
            loc: { section: 'BAM EARTHQUAKE', para: '17' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://web.archive.org/web/20260129211138/https://www.iranicaonline.org/articles/bam-earthquake-2003/'
          }
        }
      ]
    },
    {
      kind: 'casualties',
      quotes: [
        {
          id: 'q8',
          text: 'Approximately 31,824 to 43,000 people lost their lives in the Bam sub-province (out of a total population of 142,376), between 17,500 to 20,000 people suffered injuries in the city of Bam (of which 9,500 were seriously injured) requiring hospitalization, yet all the functioning three hospitals (with 240 beds) and 122 health centers in the area were completely destroyed or badly damaged.',
          lang: 'en',
          cite: {
            source: 'iranica-berberian-bam-earthquake',
            loc: { section: 'BAM EARTHQUAKE', para: '5' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://web.archive.org/web/20260129211138/https://www.iranicaonline.org/articles/bam-earthquake-2003/'
          }
        },
        {
          id: 'q9',
          text: 'In total, about 30,000 people were injured in the Bam sub-province, 400 became permanently disabled, 75,000 were left homeless, 550 were unaccounted for, 5,054 children were put on the register as orphans, more than 230,000 people were affected in the region, and the psychological impact was severe in the entire area',
          lang: 'en',
          cite: {
            source: 'iranica-berberian-bam-earthquake',
            loc: { section: 'BAM EARTHQUAKE', para: '5' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://web.archive.org/web/20260129211138/https://www.iranicaonline.org/articles/bam-earthquake-2003/'
          }
        }
      ]
    },
    {
      kind: 'aftermath',
      quotes: [
        {
          id: 'q10',
          text: 'Forty countries sent aid to Iran soon after the earthquake, and the United Nations raised 7.0 million US dollars in aid for victims.',
          lang: 'en',
          cite: {
            source: 'iranica-berberian-bam-earthquake',
            loc: { section: 'BAM EARTHQUAKE', para: '14' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://web.archive.org/web/20260129211138/https://www.iranicaonline.org/articles/bam-earthquake-2003/'
          }
        },
        {
          id: 'q11',
          text: 'No organized rubble removal effort, and hence no local search-and-rescue team was present during the first twenty-four hours of the earthquake, and thus the local citizens were mainly responsible for clearing the rubble and engaging in rescue work as much as they could with their bare hands.',
          lang: 'en',
          cite: {
            source: 'iranica-berberian-bam-earthquake',
            loc: { section: 'BAM EARTHQUAKE', para: '16' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://web.archive.org/web/20260129211138/https://www.iranicaonline.org/articles/bam-earthquake-2003/'
          }
        },
        {
          id: 'q12',
          text: 'Several ministries, the Red Crescent Society, the Relief Committee, and the Revolutionary Guards, all issued orders without coordinating their efforts, and many lives were lost as a result of poor management.',
          lang: 'en',
          cite: {
            source: 'iranica-berberian-bam-earthquake',
            loc: { section: 'BAM EARTHQUAKE', para: '18' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://web.archive.org/web/20260129211138/https://www.iranicaonline.org/articles/bam-earthquake-2003/'
          }
        },
        {
          id: 'q13',
          text: 'The direct economic loss of the earthquake was estimated at 1,500 million dollars (in original values).',
          lang: 'en',
          cite: {
            source: 'iranica-berberian-bam-earthquake',
            loc: { section: 'BAM EARTHQUAKE', para: '13' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://web.archive.org/web/20260129211138/https://www.iranicaonline.org/articles/bam-earthquake-2003/'
          }
        }
      ]
    },
    {
      kind: 'legacy',
      quotes: [
        {
          id: 'q14',
          text: 'A seismic risk reduction backbone to protect citizens from deadly and economically disruptive effects of earthquakes is badly needed.',
          lang: 'en',
          cite: {
            source: 'iranica-berberian-bam-earthquake',
            loc: { section: 'BAM EARTHQUAKE', para: '25' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://web.archive.org/web/20260129211138/https://www.iranicaonline.org/articles/bam-earthquake-2003/'
          }
        },
        {
          id: 'q15',
          text: 'Natural disasters such as earthquakes are not preventable but their impacts can be minimized and mitigated.',
          lang: 'en',
          cite: {
            source: 'iranica-berberian-bam-earthquake',
            loc: { section: 'BAM EARTHQUAKE', para: '28' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://web.archive.org/web/20260129211138/https://www.iranicaonline.org/articles/bam-earthquake-2003/'
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
            value: { d: '2003-12-25' },
            cites: [
              {
                source: 'iranica-berberian-bam-earthquake',
                loc: { section: 'BAM EARTHQUAKE', para: '1' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q16',
        text: 'The night before the main shock (25 December), two strong foreshocks that caused considerable alarm and panic were felt at approximately 15:00 and 22:00 local time',
        lang: 'en',
        cite: {
          source: 'iranica-berberian-bam-earthquake',
          loc: { section: 'BAM EARTHQUAKE', para: '1' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-13',
          url: 'https://web.archive.org/web/20260129211138/https://www.iranicaonline.org/articles/bam-earthquake-2003/'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '2003-12-26' },
            cites: [
              {
                source: 'iranica-berberian-bam-earthquake',
                loc: { section: 'BAM EARTHQUAKE', para: '21' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q17',
        text: 'For hours the Iranian officials were unaware of the depth of the disaster.',
        lang: 'en',
        cite: {
          source: 'iranica-berberian-bam-earthquake',
          loc: { section: 'BAM EARTHQUAKE', para: '21' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-13',
          url: 'https://web.archive.org/web/20260129211138/https://www.iranicaonline.org/articles/bam-earthquake-2003/'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '2004-05' },
            cites: [
              {
                source: 'iranica-berberian-bam-earthquake',
                loc: { section: 'BAM EARTHQUAKE', para: '14' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q18',
        text: 'In May 2004, the World Bank provided a loan of 300 million dollars to help the Iranian government rebuild Bam’s shattered infrastructure.',
        lang: 'en',
        cite: {
          source: 'iranica-berberian-bam-earthquake',
          loc: { section: 'BAM EARTHQUAKE', para: '14' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-13',
          url: 'https://web.archive.org/web/20260129211138/https://www.iranicaonline.org/articles/bam-earthquake-2003/'
        }
      }
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/a/ab/FEMA_-_13322_-_Photograph_by_Marty_Bahamonde_taken_on_12-24-2003.jpg/1280px-FEMA_-_13322_-_Photograph_by_Marty_Bahamonde_taken_on_12-24-2003.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:FEMA_-_13322_-_Photograph_by_Marty_Bahamonde_taken_on_12-24-2003.jpg',
    credit: { institution: 'Federal Emergency Management Agency (FEMA)', creator: 'Marty Bahamonde' },
    license: { id: 'public-domain' }
  }
})
