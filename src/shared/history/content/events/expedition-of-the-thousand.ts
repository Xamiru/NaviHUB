import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'expedition-of-the-thousand',
  names: [
    { text: 'Expedition of the Thousand', lang: 'en', role: 'primary' },
    { text: 'Spedizione dei Mille', lang: 'it', role: 'native' }
  ],
  researched: '2026-10-08',
  type: 'expedition',
  start: {
    alts: [
      {
        value: { d: '1860-05-05' },
        cites: [
          {
            source: 'britannica-1911-garibaldi-giuseppe',
            loc: { section: 'GARIBALDI, GIUSEPPE', para: '3' }
          },
          { source: 'britannica-1911-italy', loc: { section: 'ITALY', para: '1558' } }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1860-11-07' },
        cites: [
          {
            source: 'britannica-1911-garibaldi-giuseppe',
            loc: { section: 'GARIBALDI, GIUSEPPE', para: '3' }
          }
        ]
      }
    ]
  },
  regions: ['europe'],
  prominence: 2,
  places: [
    {
      ref: 'place:marsala',
      cites: [
        {
          source: 'britannica-1911-garibaldi-giuseppe',
          loc: { section: 'GARIBALDI, GIUSEPPE', para: '3' }
        },
        { source: 'britannica-1911-italy', loc: { section: 'ITALY', para: '1558' } }
      ]
    },
    {
      ref: 'place:palermo',
      cites: [
        {
          source: 'britannica-1911-garibaldi-giuseppe',
          loc: { section: 'GARIBALDI, GIUSEPPE', para: '3' }
        },
        { source: 'britannica-1911-italy', loc: { section: 'ITALY', para: '1558' } }
      ]
    },
    {
      ref: 'place:naples',
      cites: [
        {
          source: 'britannica-1911-garibaldi-giuseppe',
          loc: { section: 'GARIBALDI, GIUSEPPE', para: '3' }
        }
      ]
    }
  ],
  related: [
    { ref: 'event:second-italian-war-of-independence', rel: 'preceded-by' },
    {
      ref: 'event:proclamation-of-the-kingdom-of-italy',
      rel: 'led-to',
      cites: [
        {
          source: 'britannica-1911-garibaldi-giuseppe',
          loc: { section: 'GARIBALDI, GIUSEPPE', para: '3' }
        }
      ]
    }
  ],
  participants: [
    {
      ref: 'person:giuseppe-garibaldi',
      role: 'commander',
      cites: [
        {
          source: 'britannica-1911-garibaldi-giuseppe',
          loc: { section: 'GARIBALDI, GIUSEPPE', para: '3' }
        },
        { source: 'britannica-1911-italy', loc: { section: 'ITALY', para: '1558' } }
      ]
    },
    {
      name: 'Francesco Crispi',
      role: 'organizer',
      cites: [
        {
          source: 'britannica-1911-garibaldi-giuseppe',
          loc: { section: 'GARIBALDI, GIUSEPPE', para: '3' }
        }
      ]
    },
    {
      name: 'Nino Bixio',
      role: 'commander',
      cites: [
        { source: 'britannica-1911-italy', loc: { section: 'ITALY', para: '1558' } }
      ]
    },
    {
      name: 'Cavour',
      role: 'head-of-government',
      cites: [
        { source: 'britannica-1911-italy', loc: { section: 'ITALY', para: '1558' } }
      ]
    },
    {
      name: 'Victor Emmanuel II',
      role: 'head-of-state',
      cites: [
        {
          source: 'britannica-1911-garibaldi-giuseppe',
          loc: { section: 'GARIBALDI, GIUSEPPE', para: '3' }
        }
      ]
    },
    {
      name: 'Francis II of the Two Sicilies',
      role: 'head-of-state',
      cites: [
        { source: 'britannica-1911-italy', loc: { section: 'ITALY', para: '1558' } }
      ]
    }
  ],
  figures: [
    {
      key: 'combatants',
      value: {
        alts: [
          {
            value: { min: 1070 },
            cites: [
              {
                source: 'britannica-1911-garibaldi-giuseppe',
                loc: { section: 'GARIBALDI, GIUSEPPE', para: '3' }
              }
            ]
          }
        ]
      }
    }
  ],
  hero: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/5/5b/Lo_sbarco_a_Marsala_-_George_Macaulay_Trevelyan.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Lo_sbarco_a_Marsala_-_George_Macaulay_Trevelyan.jpg',
    credit: { institution: 'G. M. Trevelyan, Garibaldi e i Mille (Italian edition)' },
    license: { id: 'public-domain' }
  },
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'An invitation had been sent Garibaldi to put himself at the head of the movement; at first he had refused, but reports of the progress of the insurrection soon determined him to risk all on a bold stroke, and on the 5th of May he embarked at Quarto, near Genoa, with Bixio, the Hungarian Türr and some 1000 picked followers, on two steamers.',
          lang: 'en',
          cite: { source: 'britannica-1911-italy', loc: { section: 'ITALY', para: '1558' } },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Italy'
          }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q2',
          text: 'In May 1859 Ferdinand of Naples was succeeded by his son Francis II., who gave no signs of any intention to change his father’s policy, and, in spite of Napoleon’s advice, refused to grant a constitution or to enter into an alliance with Sardinia.',
          lang: 'en',
          cite: { source: 'britannica-1911-italy', loc: { section: 'ITALY', para: '1558' } },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Italy'
          }
        },
        {
          id: 'q3',
          text: 'Forbidden to invade the Romagna, he returned indignantly to Caprera, where with Crispi and Bertani he planned the invasion of Sicily.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-garibaldi-giuseppe',
            loc: { section: 'GARIBALDI, GIUSEPPE', para: '3' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Garibaldi,_Giuseppe'
          }
        }
      ]
    },
    {
      kind: 'course',
      quotes: [
        {
          id: 'q4',
          text: 'The preparations for the expedition, openly made, were viewed by Cavour with mixed feelings.',
          lang: 'en',
          cite: { source: 'britannica-1911-italy', loc: { section: 'ITALY', para: '1558' } },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Italy'
          }
        },
        {
          id: 'q5',
          text: 'He accordingly directed the Sardinian admiral Persano only to arrest the expedition should it touch at a Sardinian port; while in reply to the indignant protests of the continental powers he disclaimed all knowledge of the affair.',
          lang: 'en',
          cite: { source: 'britannica-1911-italy', loc: { section: 'ITALY', para: '1558' } },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Italy'
          }
        },
        {
          id: 'q6',
          text: 'Once established at Palermo, Garibaldi organized an army to liberate Naples and march upon Rome, a plan opposed by the emissaries of Cavour, who desired the immediate annexation of Sicily to the Italian kingdom.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-garibaldi-giuseppe',
            loc: { section: 'GARIBALDI, GIUSEPPE', para: '3' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Garibaldi,_Giuseppe'
          }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q7',
          text: 'Their presence put an end to the plan for the invasion of the papal states, and Garibaldi unwillingly issued a decree for the plébiscite which was to sanction the incorporation of the Two Sicilies in the Italian realm.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-garibaldi-giuseppe',
            loc: { section: 'GARIBALDI, GIUSEPPE', para: '3' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Garibaldi,_Giuseppe'
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
            value: { d: '1860-05-05' },
            cites: [
              {
                source: 'britannica-1911-garibaldi-giuseppe',
                loc: { section: 'GARIBALDI, GIUSEPPE', para: '3' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q8',
        text: 'At the last moment he hesitated, but Crispi succeeded in persuading him to sail from Genoa on the 5th of May 1860 with two vessels carrying a volunteer corps of 1070 strong.',
        lang: 'en',
        cite: {
          source: 'britannica-1911-garibaldi-giuseppe',
          loc: { section: 'GARIBALDI, GIUSEPPE', para: '3' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-08',
          url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Garibaldi,_Giuseppe'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1860-05-11' },
            cites: [
              {
                source: 'britannica-1911-garibaldi-giuseppe',
                loc: { section: 'GARIBALDI, GIUSEPPE', para: '3' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q9',
        text: 'Calling at Talamone to embark arms and money, he reached Marsala on the 11th of May, and landed under the protection of the British vessels “Intrepid” and “Argus.”',
        lang: 'en',
        cite: {
          source: 'britannica-1911-garibaldi-giuseppe',
          loc: { section: 'GARIBALDI, GIUSEPPE', para: '3' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-08',
          url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Garibaldi,_Giuseppe'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1860-05-12' },
            cites: [
              {
                source: 'britannica-1911-garibaldi-giuseppe',
                loc: { section: 'GARIBALDI, GIUSEPPE', para: '3' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q10',
        text: 'On the 12th of May the dictatorship of Garibaldi was proclaimed at Salemi, on the 15th of May the Neapolitan troops were routed at Calatafimi, on the 25th of May Palermo was taken, and on the 6th of June 20,000 Neapolitan regulars, supported by nine frigates and protected by two forts, were compelled to capitulate.',
        lang: 'en',
        cite: {
          source: 'britannica-1911-garibaldi-giuseppe',
          loc: { section: 'GARIBALDI, GIUSEPPE', para: '3' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-08',
          url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Garibaldi,_Giuseppe'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1860-07-20' },
            cites: [
              {
                source: 'britannica-1911-garibaldi-giuseppe',
                loc: { section: 'GARIBALDI, GIUSEPPE', para: '3' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q11',
        text: 'Expelling Lafarina and driving out Depretis, who represented Cavour, Garibaldi routed the Neapolitans at Milazzo on the 20th of July.',
        lang: 'en',
        cite: {
          source: 'britannica-1911-garibaldi-giuseppe',
          loc: { section: 'GARIBALDI, GIUSEPPE', para: '3' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-08',
          url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Garibaldi,_Giuseppe'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1860-08-21' },
            cites: [
              {
                source: 'britannica-1911-garibaldi-giuseppe',
                loc: { section: 'GARIBALDI, GIUSEPPE', para: '3' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q12',
        text: 'Next day he crossed the Strait, won the battle of Reggio on the 21st of August, accepted the capitulation of 9000 Neapolitan troops at San Giovanni and of 11,000 more at Soveria.',
        lang: 'en',
        cite: {
          source: 'britannica-1911-garibaldi-giuseppe',
          loc: { section: 'GARIBALDI, GIUSEPPE', para: '3' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-08',
          url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Garibaldi,_Giuseppe'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1860-09-07' },
            cites: [
              {
                source: 'britannica-1911-garibaldi-giuseppe',
                loc: { section: 'GARIBALDI, GIUSEPPE', para: '3' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q13',
        text: 'On the 7th of September Garibaldi entered Naples, while Francesco fled to Gaeta.',
        lang: 'en',
        cite: {
          source: 'britannica-1911-garibaldi-giuseppe',
          loc: { section: 'GARIBALDI, GIUSEPPE', para: '3' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-08',
          url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Garibaldi,_Giuseppe'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1860-10-01' },
            cites: [
              {
                source: 'britannica-1911-garibaldi-giuseppe',
                loc: { section: 'GARIBALDI, GIUSEPPE', para: '3' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q14',
        text: 'On the 1st of October he routed the remnant of the Bourbon army 40,000 strong on the Volturno.',
        lang: 'en',
        cite: {
          source: 'britannica-1911-garibaldi-giuseppe',
          loc: { section: 'GARIBALDI, GIUSEPPE', para: '3' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-08',
          url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Garibaldi,_Giuseppe'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1860-11-07' },
            cites: [
              {
                source: 'britannica-1911-garibaldi-giuseppe',
                loc: { section: 'GARIBALDI, GIUSEPPE', para: '3' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q15',
        text: 'On the 7th of November Garibaldi accompanied Victor Emmanuel during his solemn entry into Naples, and on the morrow returned to Caprera, after disbanding his volunteers and recommending their enrolment in the regular army.',
        lang: 'en',
        cite: {
          source: 'britannica-1911-garibaldi-giuseppe',
          loc: { section: 'GARIBALDI, GIUSEPPE', para: '3' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-08',
          url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Garibaldi,_Giuseppe'
        }
      }
    }
  ],
  furtherReading: [
    { source: 'scirocco-2001-garibaldi', perspective: 'european' }
  ]
})
