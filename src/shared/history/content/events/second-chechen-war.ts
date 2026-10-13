import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'second-chechen-war',
  names: [
    { text: 'Second Chechen War', lang: 'en', role: 'primary' },
    {
      text: 'Counter-terrorist operation in the North Caucasus',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'hrw-2004-world-report-glad-to-be-deceived-chechnya',
          loc: {
            section: '“Glad to be Deceived”: the International Community and Chechnya',
            para: '9'
          }
        }
      ]
    }
  ],
  researched: '2026-10-12',
  type: 'war',
  start: {
    alts: [
      {
        value: { d: '1999-09' },
        cites: [
          {
            source: 'hrw-2004-world-report-glad-to-be-deceived-chechnya',
            loc: {
              section: '“Glad to be Deceived”: the International Community and Chechnya',
              para: '13'
            }
          }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '2009-04-16' },
        cites: [
          {
            source: 'hrw-2010-world-report-russia',
            loc: { section: 'World Report 2010: Russia', para: '16' }
          }
        ]
      }
    ]
  },
  regions: ['russia-central-asia'],
  prominence: 2,
  places: [
    {
      ref: 'place:chechnya',
      cites: [
        {
          source: 'hrw-2004-world-report-glad-to-be-deceived-chechnya',
          loc: {
            section: '“Glad to be Deceived”: the International Community and Chechnya',
            para: '13'
          }
        }
      ]
    },
    {
      ref: 'place:grozny',
      cites: [
        {
          source: 'hrw-2001-world-report-russia',
          loc: { section: 'World Report 2001: Russia', para: '4' }
        }
      ]
    }
  ],
  sides: [
    {
      key: 'russian-federal-forces',
      name: 'Russian federal forces',
      cites: [
        {
          source: 'hrw-2001-world-report-russia',
          loc: { section: 'World Report 2001: Russia', para: '4' }
        }
      ]
    },
    {
      key: 'chechen-rebels',
      name: 'Chechen rebel forces',
      cites: [
        {
          source: 'hrw-2001-world-report-russia',
          loc: { section: 'World Report 2001: Russia', para: '4' }
        }
      ]
    }
  ],
  participants: [
    {
      ref: 'person:vladimir-putin',
      role: 'head-of-state',
      side: 'russian-federal-forces',
      cites: [
        {
          source: 'hrw-2001-world-report-russia',
          loc: { section: 'World Report 2001: Russia', para: '2' }
        }
      ]
    },
    {
      name: 'Akhmad Kadyrov',
      role: 'leader',
      side: 'russian-federal-forces',
      cites: [
        {
          source: 'hrw-2005-world-report-russia',
          loc: { section: 'World Report 2005: Russia', para: '13' }
        }
      ]
    },
    {
      name: 'Ramzan Kadyrov',
      role: 'leader',
      side: 'russian-federal-forces',
      cites: [
        {
          source: 'hrw-2010-world-report-russia',
          loc: { section: 'World Report 2010: Russia', para: '10' }
        }
      ]
    },
    {
      name: 'Shamil Basaev',
      role: 'commander',
      side: 'chechen-rebels',
      cites: [
        {
          source: 'hrw-2001-world-report-russia',
          loc: { section: 'World Report 2001: Russia', para: '7' }
        }
      ]
    }
  ],
  related: [
    {
      ref: 'event:first-chechen-war',
      rel: 'preceded-by',
      cites: [
        {
          source: 'hrw-2004-world-report-glad-to-be-deceived-chechnya',
          loc: {
            section: '“Glad to be Deceived”: the International Community and Chechnya',
            para: '13'
          }
        }
      ]
    },
    {
      ref: 'event:beslan-school-siege',
      rel: 'related',
      cites: [
        {
          source: 'hrw-2005-world-report-russia',
          loc: { section: 'World Report 2005: Russia', para: '1' }
        }
      ]
    },
    {
      ref: 'event:september-11-attacks',
      rel: 'related',
      cites: [
        {
          source: 'hrw-2004-world-report-glad-to-be-deceived-chechnya',
          loc: {
            section: '“Glad to be Deceived”: the International Community and Chechnya',
            para: '8'
          }
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
          text: 'Russia’s second armed conflict in Chechnya in the 1990s began in September 1999.',
          lang: 'en',
          cite: {
            source: 'hrw-2004-world-report-glad-to-be-deceived-chechnya',
            loc: {
              section: '“Glad to be Deceived”: the International Community and Chechnya',
              para: '13'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-12',
            url: 'https://web.archive.org/web/20230930192733/https://www.hrw.org/legacy/wr2k4/7.htm'
          }
        },
        {
          id: 'q2',
          text: 'Russia claimed it was a counter-terror operation, aimed at eliminating the chaos that had reined in Chechnya since the end of the 1994-1996 Chechen war and at liquidating terrorist groups that had found haven there.',
          lang: 'en',
          cite: {
            source: 'hrw-2004-world-report-glad-to-be-deceived-chechnya',
            loc: {
              section: '“Glad to be Deceived”: the International Community and Chechnya',
              para: '13'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-12',
            url: 'https://web.archive.org/web/20230930192733/https://www.hrw.org/legacy/wr2k4/7.htm'
          }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q3',
          text: 'Chechens in Moscow faced very serious abuses in the aftermath of the bombings of two Moscow apartment buildings in September 1999.',
          lang: 'en',
          cite: {
            source: 'hrw-2001-world-report-russia',
            loc: { section: 'World Report 2001: Russia', para: '21' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-12',
            url: 'https://web.archive.org/web/20230331165731/https://www.hrw.org/legacy/wr2k1/europe/russian.html'
          }
        }
      ]
    },
    {
      kind: 'course',
      quotes: [
        {
          id: 'q4',
          text: 'Both sides showed scant respect for international law, but the far larger force of Russian troops backed by air power and artillery committed the lion\'s share of violations.',
          lang: 'en',
          cite: {
            source: 'hrw-2001-world-report-russia',
            loc: { section: 'World Report 2001: Russia', para: '4' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-12',
            url: 'https://web.archive.org/web/20230331165731/https://www.hrw.org/legacy/wr2k1/europe/russian.html'
          }
        },
        {
          id: 'q5',
          text: 'In an attempt to limit casualties among its soldiers, Russia relied heavily on air attacks.',
          lang: 'en',
          cite: {
            source: 'hrw-2001-world-report-russia',
            loc: { section: 'World Report 2001: Russia', para: '5' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-12',
            url: 'https://web.archive.org/web/20230331165731/https://www.hrw.org/legacy/wr2k1/europe/russian.html'
          }
        },
        {
          id: 'q6',
          text: 'International disengagement on Chechnya became more marked after the September 11, 2001 attacks in the United States.',
          lang: 'en',
          cite: {
            source: 'hrw-2004-world-report-glad-to-be-deceived-chechnya',
            loc: {
              section: '“Glad to be Deceived”: the International Community and Chechnya',
              para: '8'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-12',
            url: 'https://web.archive.org/web/20230930192733/https://www.hrw.org/legacy/wr2k4/7.htm'
          }
        }
      ]
    },
    {
      kind: 'casualties',
      quotes: [
        {
          id: 'q7',
          text: 'The city of Grozny, bombed for three straight months, from November 1999 to early February 2000, was essentially treated as one enormous military target.',
          lang: 'en',
          cite: {
            source: 'hrw-2001-world-report-russia',
            loc: { section: 'World Report 2001: Russia', para: '6' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-12',
            url: 'https://web.archive.org/web/20230331165731/https://www.hrw.org/legacy/wr2k1/europe/russian.html'
          }
        },
        {
          id: 'q8',
          text: 'Just three such operations, in Alkhan Yurt, and in the Novye Aldy and Staropromyslovskii districts of Grozny, resulted in the confirmed summary executions of more than 130 civilians.',
          lang: 'en',
          cite: {
            source: 'hrw-2001-world-report-russia',
            loc: { section: 'World Report 2001: Russia', para: '9' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-12',
            url: 'https://web.archive.org/web/20230331165731/https://www.hrw.org/legacy/wr2k1/europe/russian.html'
          }
        },
        {
          id: 'q9',
          text: 'Chechen rebels also showed little respect for international humanitarian law.',
          lang: 'en',
          cite: {
            source: 'hrw-2001-world-report-russia',
            loc: { section: 'World Report 2001: Russia', para: '19' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-12',
            url: 'https://web.archive.org/web/20230331165731/https://www.hrw.org/legacy/wr2k1/europe/russian.html'
          }
        }
      ]
    },
    {
      kind: 'aftermath',
      quotes: [
        {
          id: 'q10',
          text: 'In Chechnya the armed conflict has subsided and significant reconstruction is ongoing in Grozny, the capital.',
          lang: 'en',
          cite: {
            source: 'hrw-2009-world-report-russia',
            loc: { section: 'World Report 2009: Russia', para: '21' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-12',
            url: 'https://web.archive.org/web/20240101165531/https://www.hrw.org/world-report/2009/country-chapters/russia'
          }
        },
        {
          id: 'q11',
          text: 'The Islamist insurgency in the North Caucasus republics of Chechnya, Dagestan, and Ingushetia appeared to intensify in 2009.',
          lang: 'en',
          cite: {
            source: 'hrw-2010-world-report-russia',
            loc: { section: 'World Report 2010: Russia', para: '15' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-12',
            url: 'https://web.archive.org/web/20240217171026/https://www.hrw.org/world-report/2010/country-chapters/russia'
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
            value: { d: '1999-09' },
            cites: [
              {
                source: 'hrw-2004-world-report-glad-to-be-deceived-chechnya',
                loc: {
                  section: '“Glad to be Deceived”: the International Community and Chechnya',
                  para: '13'
                }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q12',
        text: 'Five months of indiscriminate bombing and shelling in 1999 and early 2000 resulted in thousands of civilian deaths.',
        lang: 'en',
        cite: {
          source: 'hrw-2004-world-report-glad-to-be-deceived-chechnya',
          loc: {
            section: '“Glad to be Deceived”: the International Community and Chechnya',
            para: '13'
          }
        },
        provenance: {
          via: 'web',
          at: '2026-10-12',
          url: 'https://web.archive.org/web/20230930192733/https://www.hrw.org/legacy/wr2k4/7.htm'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '2000-02' },
            cites: [
              {
                source: 'hrw-2001-world-report-russia',
                loc: { section: 'World Report 2001: Russia', para: '4' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q13',
        text: 'After taking Chechnya\'s capital Grozny in early February, Russian troops exercised nominal control over most of the republic\'s territory.',
        lang: 'en',
        cite: {
          source: 'hrw-2001-world-report-russia',
          loc: { section: 'World Report 2001: Russia', para: '4' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-12',
          url: 'https://web.archive.org/web/20230331165731/https://www.hrw.org/legacy/wr2k1/europe/russian.html'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '2000-03-26' },
            cites: [
              {
                source: 'hrw-2001-world-report-russia',
                loc: { section: 'World Report 2001: Russia', para: '2' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q14',
        text: 'Vladimir Putin, the acting president following Boris Yeltsin\'s surprise resignation on December 31, 1999, entered the March 26 presidential elections as a clear favorite and won in the first round with just over 50 percent of the vote-but not without widespread election fraud.',
        lang: 'en',
        cite: {
          source: 'hrw-2001-world-report-russia',
          loc: { section: 'World Report 2001: Russia', para: '2' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-12',
          url: 'https://web.archive.org/web/20230331165731/https://www.hrw.org/legacy/wr2k1/europe/russian.html'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '2002-10' },
            cites: [
              {
                source: 'hrw-2004-world-report-glad-to-be-deceived-chechnya',
                loc: {
                  section: '“Glad to be Deceived”: the International Community and Chechnya',
                  para: '40'
                }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q15',
        text: 'The horrific hostage-taking by Chechen rebels on a Moscow theater in October 2002 caused revulsion in Russia and throughout the world, and lent credence to Putin’s assertions and, in the minds of some, seemed to confirm the existence of links between certain rebel groups and al-Qaeda.',
        lang: 'en',
        cite: {
          source: 'hrw-2004-world-report-glad-to-be-deceived-chechnya',
          loc: {
            section: '“Glad to be Deceived”: the International Community and Chechnya',
            para: '40'
          }
        },
        provenance: {
          via: 'web',
          at: '2026-10-12',
          url: 'https://web.archive.org/web/20230930192733/https://www.hrw.org/legacy/wr2k4/7.htm'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '2003-03' },
            cites: [
              {
                source: 'hrw-2004-world-report-glad-to-be-deceived-chechnya',
                loc: {
                  section: '“Glad to be Deceived”: the International Community and Chechnya',
                  para: '43'
                }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q16',
        text: 'The constitutional referendum held in Chechnya in March 2003, and the subsequent presidential elections in October, were widely advertised by the Russian government as a final stage of stabilization of conditions in the republic.',
        lang: 'en',
        cite: {
          source: 'hrw-2004-world-report-glad-to-be-deceived-chechnya',
          loc: {
            section: '“Glad to be Deceived”: the International Community and Chechnya',
            para: '43'
          }
        },
        provenance: {
          via: 'web',
          at: '2026-10-12',
          url: 'https://web.archive.org/web/20230930192733/https://www.hrw.org/legacy/wr2k4/7.htm'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '2009-04-16' },
            cites: [
              {
                source: 'hrw-2010-world-report-russia',
                loc: { section: 'World Report 2010: Russia', para: '16' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q17',
        text: 'On April 16, federal authorities announced that they had ended the counterterrorism operation in Chechnya, marking a formal end to the armed conflict.',
        lang: 'en',
        cite: {
          source: 'hrw-2010-world-report-russia',
          loc: { section: 'World Report 2010: Russia', para: '16' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-12',
          url: 'https://web.archive.org/web/20240217171026/https://www.hrw.org/world-report/2010/country-chapters/russia'
        }
      }
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/9/9f/War_in_Dagestan_and_Second_Chechen_War_1999-2009.png/1280px-War_in_Dagestan_and_Second_Chechen_War_1999-2009.png',
    page: 'https://commons.wikimedia.org/wiki/File:War_in_Dagestan_and_Second_Chechen_War_1999-2009.png',
    credit: { creator: 'Metallist-99' },
    license: { id: 'cc-by-sa', version: '3.0', url: 'https://creativecommons.org/licenses/by-sa/3.0' }
  }
})
