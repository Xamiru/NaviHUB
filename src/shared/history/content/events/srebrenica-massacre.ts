import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'srebrenica-massacre',
  names: [
    { text: 'Srebrenica massacre', lang: 'en', role: 'primary' },
    { text: 'Masakr u Srebrenici', lang: 'bs', role: 'native' },
    {
      text: 'Srebrenica genocide',
      lang: 'en',
      role: 'contested',
      cites: [
        {
          source: 'european-parliament-2015-07-09-resolution-on-the-srebrenica-commemoration',
          loc: { section: 'Resolution on the Srebrenica Commemoration', para: '5' }
        }
      ],
      usedBy: [
        { kind: 'organization', name: 'European Parliament' }
      ]
    },
    {
      text: 'Srebrenica-Potočari genocide',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'european-parliament-2009-01-15-resolution-on-srebrenica',
          loc: { section: 'Resolution on Srebrenica', para: '10' }
        }
      ]
    }
  ],
  researched: '2026-10-12',
  type: 'massacre',
  start: {
    alts: [
      {
        value: { d: '1995-07-11' },
        cites: [
          {
            source: 'european-parliament-2015-07-09-resolution-on-the-srebrenica-commemoration',
            loc: { section: 'Resolution on the Srebrenica Commemoration', para: '2' }
          },
          {
            source: 'hrw-1995-the-fall-of-srebrenica-and-the-failure-of-un-peacekeeping',
            loc: {
              section: 'The Fall of Srebrenica and the Failure of UN Peacekeeping',
              para: '73'
            }
          }
        ]
      }
    ]
  },
  regions: ['europe'],
  prominence: 2,
  places: [
    {
      ref: 'place:srebrenica',
      cites: [
        {
          source: 'european-parliament-2015-07-09-resolution-on-the-srebrenica-commemoration',
          loc: { section: 'Resolution on the Srebrenica Commemoration', para: '2' }
        }
      ]
    }
  ],
  partOf: [
    {
      ref: 'event:bosnian-war',
      cites: [
        {
          source: 'hrw-1995-the-fall-of-srebrenica-and-the-failure-of-un-peacekeeping',
          loc: { section: 'The Fall of Srebrenica and the Failure of UN Peacekeeping', para: '32' }
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
          source: 'european-parliament-2015-07-09-resolution-on-the-srebrenica-commemoration',
          loc: { section: 'Resolution on the Srebrenica Commemoration', para: '2' }
        }
      ]
    },
    {
      key: 'srebrenica-enclave',
      name: 'Srebrenica enclave and its civilian population',
      cites: [
        {
          source: 'hrw-1995-the-fall-of-srebrenica-and-the-failure-of-un-peacekeeping',
          loc: { section: 'The Fall of Srebrenica and the Failure of UN Peacekeeping', para: '73' }
        }
      ]
    }
  ],
  participants: [
    {
      name: 'Ratko Mladić',
      role: 'commander',
      side: 'vrs',
      cites: [
        {
          source: 'european-parliament-2009-01-15-resolution-on-srebrenica',
          loc: { section: 'Resolution on Srebrenica', para: '1' }
        }
      ]
    },
    {
      name: 'Radovan Karadžić',
      role: 'leader',
      side: 'vrs',
      cites: [
        {
          source: 'european-parliament-2009-01-15-resolution-on-srebrenica',
          loc: { section: 'Resolution on Srebrenica', para: '1' }
        }
      ]
    },
    {
      name: 'Radislav Krstić',
      role: 'commander',
      side: 'vrs',
      cites: [
        {
          source: 'european-parliament-2009-01-15-resolution-on-srebrenica',
          loc: { section: 'Resolution on Srebrenica', para: '7' }
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
            value: { min: 8000, qualifier: 'over' },
            cites: [
              {
                source: 'european-parliament-2009-01-15-resolution-on-srebrenica',
                loc: { section: 'Resolution on Srebrenica', para: '2' }
              }
            ],
            heldBy: [
              { kind: 'organization', name: 'European Parliament' }
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
            value: { min: 25000, qualifier: 'nearly' },
            cites: [
              {
                source: 'european-parliament-2009-01-15-resolution-on-srebrenica',
                loc: { section: 'Resolution on Srebrenica', para: '2' }
              }
            ],
            heldBy: [
              { kind: 'organization', name: 'European Parliament (resolution of 2009)' }
            ]
          },
          {
            value: { min: 30000, qualifier: 'nearly' },
            cites: [
              {
                source: 'european-parliament-2015-07-09-resolution-on-the-srebrenica-commemoration',
                loc: { section: 'Resolution on the Srebrenica Commemoration', para: '3' }
              }
            ],
            heldBy: [
              { kind: 'organization', name: 'European Parliament (resolution of 2015)' }
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
          text: 'As this report documents, possibly thousands of civilians were killed by Bosnian Serb forces during and immediately after the offensive on Srebrenica.',
          lang: 'en',
          cite: {
            source: 'hrw-1995-the-fall-of-srebrenica-and-the-failure-of-un-peacekeeping',
            loc: { section: 'The Fall of Srebrenica and the Failure of UN Peacekeeping', para: '8' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-12',
            url: 'https://www.hrw.org/report/1995/10/15/fall-srebrenica-and-failure-un-peacekeeping/bosnia-and-herzegovina'
          }
        },
        {
          id: 'q2',
          text: 'Abuses attending the occupation of the “safe area” included the terrorization of women, children and the elderly and the premeditated mass executions of men and boys.',
          lang: 'en',
          cite: {
            source: 'hrw-1995-the-fall-of-srebrenica-and-the-failure-of-un-peacekeeping',
            loc: { section: 'The Fall of Srebrenica and the Failure of UN Peacekeeping', para: '3' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-12',
            url: 'https://www.hrw.org/report/1995/10/15/fall-srebrenica-and-failure-un-peacekeeping/bosnia-and-herzegovina'
          }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q3',
          text: 'Before the war, approximately 37,000 people — 72.5 percent Muslims and 25.5 percent Serbs — lived in the Srebrenica municipality.',
          lang: 'en',
          cite: {
            source: 'hrw-1995-the-fall-of-srebrenica-and-the-failure-of-un-peacekeeping',
            loc: {
              section: 'The Fall of Srebrenica and the Failure of UN Peacekeeping',
              para: '32'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-12',
            url: 'https://www.hrw.org/report/1995/10/15/fall-srebrenica-and-failure-un-peacekeeping/bosnia-and-herzegovina'
          }
        },
        {
          id: 'q4',
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
            at: '2026-10-12',
            url: 'https://www.hrw.org/report/1995/10/15/fall-srebrenica-and-failure-un-peacekeeping/bosnia-and-herzegovina'
          }
        },
        {
          id: 'q5',
          text: 'On April 16, 1993, the U.N. Security Council adopted Resolution 819 declaring Srebrenica a "safe area,” and a cease-fire was signed on April 17.',
          lang: 'en',
          cite: {
            source: 'hrw-1995-the-fall-of-srebrenica-and-the-failure-of-un-peacekeeping',
            loc: {
              section: 'The Fall of Srebrenica and the Failure of UN Peacekeeping',
              para: '36'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-12',
            url: 'https://www.hrw.org/report/1995/10/15/fall-srebrenica-and-failure-un-peacekeeping/bosnia-and-herzegovina'
          }
        }
      ]
    },
    {
      kind: 'casualties',
      quotes: [
        {
          id: 'q6',
          text: 'United Nations peacekeeping officials were unwilling to heed requests for support from their own forces stationed within the enclave, thus allowing Bosnian Serb forces to easily overrun it and — without interference from U.N. soldiers — to carry out systematic, mass executions of hundreds, possibly thousands, of civilian men and boys and to terrorize, rape, beat, execute, rob and otherwise abuse civilians being deported from the area.',
          lang: 'en',
          cite: {
            source: 'hrw-1995-the-fall-of-srebrenica-and-the-failure-of-un-peacekeeping',
            loc: { section: 'The Fall of Srebrenica and the Failure of UN Peacekeeping', para: '2' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-12',
            url: 'https://www.hrw.org/report/1995/10/15/fall-srebrenica-and-failure-un-peacekeeping/bosnia-and-herzegovina'
          }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q7',
          text: 'In response to viewing the public proceedings, insider witnesses came forward voluntarily and other new material, including a video that showed members of the notorious “Scorpion” unit executing men and boys from Srebrenica, became public for the first time.',
          lang: 'en',
          cite: {
            source: 'hrw-2006-weighing-the-evidence-lessons-from-the-milosevic-trial',
            loc: { section: 'Weighing the Evidence', para: '42' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-12',
            url: 'https://www.hrw.org/reports/2006/milosevic1206/milosevic1206.htm'
          }
        },
        {
          id: 'q8',
          text: 'The withholding of the aforementioned list and the destruction of video footage of certain atrocities, that were carried out in the presence of United Nations peacekeepers, deprived the International Criminal Tribunal for the Former Yugoslavia of valuable evidence linking possibly identifiable perpetrators to their war crimes and denied Muslim families the opportunity to identify and possibly discover the fate of their missing relatives.',
          lang: 'en',
          cite: {
            source: 'hrw-1995-the-fall-of-srebrenica-and-the-failure-of-un-peacekeeping',
            loc: {
              section: 'The Fall of Srebrenica and the Failure of UN Peacekeeping',
              para: '117'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-12',
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
        id: 'q9',
        text: 'Bosnian Serb forces, already less than two kilometers from the center of the city, began to shell civilian targets within the enclave.',
        lang: 'en',
        cite: {
          source: 'hrw-1995-the-fall-of-srebrenica-and-the-failure-of-un-peacekeeping',
          loc: { section: 'The Fall of Srebrenica and the Failure of UN Peacekeeping', para: '56' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-12',
          url: 'https://www.hrw.org/report/1995/10/15/fall-srebrenica-and-failure-un-peacekeeping/bosnia-and-herzegovina'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1995-07-11' },
            cites: [
              {
                source: 'hrw-1995-the-fall-of-srebrenica-and-the-failure-of-un-peacekeeping',
                loc: {
                  section: 'The Fall of Srebrenica and the Failure of UN Peacekeeping',
                  para: '73'
                }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q10',
        text: 'By the time the air strikes occurred on July 11, much of the enclave was already in Bosnian Serb hands and most of the civilian population had already begun to retreat toward the Dutch battalion’s U.N. base in the village of Potocari.',
        lang: 'en',
        cite: {
          source: 'hrw-1995-the-fall-of-srebrenica-and-the-failure-of-un-peacekeeping',
          loc: { section: 'The Fall of Srebrenica and the Failure of UN Peacekeeping', para: '73' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-12',
          url: 'https://www.hrw.org/report/1995/10/15/fall-srebrenica-and-failure-un-peacekeeping/bosnia-and-herzegovina'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1995-07-23' },
            cites: [
              {
                source: 'hrw-1995-the-fall-of-srebrenica-and-the-failure-of-un-peacekeeping',
                loc: {
                  section: 'The Fall of Srebrenica and the Failure of UN Peacekeeping',
                  para: '109'
                }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q11',
        text: 'Dutch peacekeeping troops evacuated from Srebrenica said on July 23 in Zagreb that Bosnian Serb soldiers executed at least ten Muslim defenders and abducted between 150 and 300 men between the ages of sixteen and sixty, of whom nine were executed in the house, shot in the back.',
        lang: 'en',
        cite: {
          source: 'hrw-1995-the-fall-of-srebrenica-and-the-failure-of-un-peacekeeping',
          loc: { section: 'The Fall of Srebrenica and the Failure of UN Peacekeeping', para: '109' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-12',
          url: 'https://www.hrw.org/report/1995/10/15/fall-srebrenica-and-failure-un-peacekeeping/bosnia-and-herzegovina'
        }
      }
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/4/46/Srebrenica_massacre_memorial_wall_of_names_2009_2.jpg/1280px-Srebrenica_massacre_memorial_wall_of_names_2009_2.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Srebrenica_massacre_memorial_wall_of_names_2009_2.jpg',
    credit: { creator: 'Michael Büker' },
    license: { id: 'cc-by-sa', version: '3.0', url: 'https://creativecommons.org/licenses/by-sa/3.0' }
  }
})
