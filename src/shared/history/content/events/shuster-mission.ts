import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'shuster-mission',
  names: [
    { text: 'Shuster mission', lang: 'en', role: 'primary' },
    { text: 'مأموریت مورگان شوستر', lang: 'fa', role: 'native' },
    {
      text: 'American financial mission',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'iranica-bonakdarian-great-britain-iii',
          loc: { section: 'GREAT BRITAIN iii. British influence in Persia, 1900-21', para: '36' }
        }
      ]
    }
  ],
  researched: '2026-10-06',
  type: 'reform',
  start: {
    alts: [
      {
        value: { d: '1911-05-12' },
        cites: [
          {
            source: 'iranica-bonakdarian-great-britain-iii',
            loc: { section: 'GREAT BRITAIN iii. British influence in Persia, 1900-21', para: '36' }
          },
          {
            source: 'iranica-martin-constitutional-revolution-events',
            loc: { section: 'CONSTITUTIONAL REVOLUTION ii. Events', para: '34' }
          }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1911-12-24' },
        cites: [
          {
            source: 'iranica-bonakdarian-great-britain-iii',
            loc: { section: 'GREAT BRITAIN iii. British influence in Persia, 1900-21', para: '42' }
          },
          {
            source: 'iranica-martin-constitutional-revolution-events',
            loc: { section: 'CONSTITUTIONAL REVOLUTION ii. Events', para: '34' }
          },
          {
            source: 'iranica-yarshater-chronology-part-2',
            loc: { section: 'Chronology of Iranian History Part 2, 1911' }
          }
        ],
        heldBy: [
          { kind: 'scholar', name: 'Mansour Bonakdarian' },
          { kind: 'scholar', name: 'Vanessa Martin' },
          { kind: 'scholar', name: 'Ehsan Yarshater' }
        ]
      },
      {
        value: { d: '1911-12-20' },
        cites: [
          {
            source: 'loc-iran-country-study-1987',
            loc: { section: 'The Constitutional Revolution', para: '4' }
          }
        ],
        heldBy: [
          { kind: 'organization', name: 'Library of Congress, Federal Research Division' }
        ]
      }
    ]
  },
  regions: ['iran', 'russia-central-asia'],
  prominence: 2,
  places: [
    {
      ref: 'place:tehran',
      cites: [
        {
          source: 'iranica-bonakdarian-great-britain-iii',
          loc: { section: 'GREAT BRITAIN iii. British influence in Persia, 1900-21', para: '36' }
        }
      ]
    },
    {
      ref: 'place:tabriz',
      cites: [
        {
          source: 'iranica-bonakdarian-great-britain-iii',
          loc: { section: 'GREAT BRITAIN iii. British influence in Persia, 1900-21', para: '42' }
        }
      ]
    }
  ],
  partOf: [
    { ref: 'period:reign-of-ahmad-shah-qajar' },
    { ref: 'period:qajar-dynasty' }
  ],
  participants: [
    {
      ref: 'person:morgan-shuster',
      role: 'leader',
      cites: [
        {
          source: 'iranica-bonakdarian-great-britain-iii',
          loc: { section: 'GREAT BRITAIN iii. British influence in Persia, 1900-21', para: '36' }
        },
        {
          source: 'iranica-martin-constitutional-revolution-events',
          loc: { section: 'CONSTITUTIONAL REVOLUTION ii. Events', para: '34' }
        }
      ]
    },
    {
      name: 'Claude B. Stokes',
      role: 'participant',
      cites: [
        {
          source: 'iranica-bonakdarian-great-britain-iii',
          loc: { section: 'GREAT BRITAIN iii. British influence in Persia, 1900-21', para: '37' }
        }
      ]
    },
    {
      name: 'Joseph Mornard',
      role: 'participant',
      cites: [
        {
          source: 'iranica-bonakdarian-great-britain-iii',
          loc: { section: 'GREAT BRITAIN iii. British influence in Persia, 1900-21', para: '36' }
        }
      ]
    },
    {
      name: 'Ṣamṣām-al-Salṭana',
      role: 'head-of-government',
      cites: [
        {
          source: 'iranica-martin-constitutional-revolution-events',
          loc: { section: 'CONSTITUTIONAL REVOLUTION ii. Events', para: '34' }
        }
      ]
    },
    {
      name: 'Sir Edward Grey',
      role: 'diplomat',
      cites: [
        {
          source: 'iranica-bonakdarian-great-britain-iii',
          loc: { section: 'GREAT BRITAIN iii. British influence in Persia, 1900-21', para: '40' }
        }
      ]
    }
  ],
  related: [
    { ref: 'event:persian-constitutional-revolution', rel: 'related' },
    { ref: 'event:anglo-russian-convention-of-1907', rel: 'related' },
    { ref: 'event:russian-bombardment-of-the-imam-reza-shrine', rel: 'followed-by' }
  ],
  sections: [
    {
      kind: 'background',
      quotes: [
        {
          id: 'q4',
          text: 'The attempts by the Persian government to remedy the country’s desperate financial situation which, among other things, was contributing to the lack of security on the southern roads, would generate a major showdown between Russia and the Persian Majles before the end of the year, eventually resulting in occupation of the country by the Tsarist forces and the termination of the Constitutional Revolution in Persia.',
          lang: 'en',
          cite: {
            source: 'iranica-bonakdarian-great-britain-iii',
            loc: { section: 'GREAT BRITAIN iii. British influence in Persia, 1900-21', para: '36' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/great-britain-iii'
          }
        }
      ]
    },
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q5',
          text: 'The American financial adviser Morgan Shuster, who arrived in Tehran on 13 Jomādā I/12 May 1911, made a determined effort to salvage the Persian financial situation.',
          lang: 'en',
          cite: {
            source: 'iranica-martin-constitutional-revolution-events',
            loc: { section: 'CONSTITUTIONAL REVOLUTION ii. Events', para: '34' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/constitutional-revolution-ii'
          }
        },
        {
          id: 'q6',
          text: 'During 1911 he had begun to organize a gendarmerie to be under his own direct orders which was to assist the civilian officers of the Treasury in the collection of revenue throughout the country (Shuster, pp. 69-70).',
          lang: 'en',
          cite: { source: 'iranica-cronin-gendarmerie', loc: { section: 'GENDARMERIE', para: '3' } },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/gendarmerie'
          }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q7',
          text: 'In December 1911, Baḵtiāri khans and conservative ministers dissolved the Majles and dismissed Shuster, an event often viewed as the end of the Constitutional Revolution (Shuster, pp. 214-15; Kasravi, pp. 234-39).',
          lang: 'en',
          cite: {
            source: 'iranica-andreeva-russia-relations',
            loc: {
              section: 'RUSSIA i. Russo-Iranian Relations up to the Bolshevik Revolution',
              para: '47'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/russia-i-relations/'
          }
        },
        {
          id: 'q8',
          text: 'When, on Shuster’s dismissal, the Treasury Gendarmerie was dissolved, its officers and men were transferred to the Government Gendarmerie, giving the latter force much impetus and stamping it indelibly with a pro-Democrat, nationalist and anti-Russian character.',
          lang: 'en',
          cite: { source: 'iranica-cronin-gendarmerie', loc: { section: 'GENDARMERIE', para: '3' } },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/gendarmerie'
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
            value: { d: '1910-08' },
            cites: [
              {
                source: 'iranica-andreeva-russia-relations',
                loc: {
                  section: 'RUSSIA i. Russo-Iranian Relations up to the Bolshevik Revolution',
                  para: '46'
                }
              }
            ],
            heldBy: [
              { kind: 'scholar', name: 'Elena Andreeva' }
            ]
          },
          {
            value: { d: '1911-01' },
            cites: [
              {
                source: 'iranica-bonakdarian-great-britain-iii',
                loc: {
                  section: 'GREAT BRITAIN iii. British influence in Persia, 1900-21',
                  para: '36'
                }
              }
            ],
            heldBy: [
              { kind: 'scholar', name: 'Mansour Bonakdarian' }
            ]
          }
        ]
      },
      quote: {
        id: 'q9',
        text: 'In August 1910, the Majles employed an American, William Morgan Shuster, as its economic adviser to help solve the financial crisis in Iran.',
        lang: 'en',
        cite: {
          source: 'iranica-andreeva-russia-relations',
          loc: {
            section: 'RUSSIA i. Russo-Iranian Relations up to the Bolshevik Revolution',
            para: '46'
          }
        },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://www.iranicaonline.org/articles/russia-i-relations/'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1911' },
            cites: [
              {
                source: 'iranica-yarshater-chronology-part-2',
                loc: { section: 'Chronology of Iranian History Part 2, 1911' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q14',
        text: 'Majles rejects the ultimatum under pressure from the Social Democrats. Russian forces invade Persia from Azarbaijan and Gilan and march toward Qazvin. There are large popular demonstrations against the Russians and in support of Schuster, with the leading ulema of Najaf siding with popular demand.',
        lang: 'en',
        cite: {
          source: 'iranica-yarshater-chronology-part-2',
          loc: { section: 'Chronology of Iranian History Part 2, 1911' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://www.iranicaonline.org/articles/chronology-of-iranian-history-part-2/'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1911-05-12' },
            cites: [
              {
                source: 'iranica-bonakdarian-great-britain-iii',
                loc: {
                  section: 'GREAT BRITAIN iii. British influence in Persia, 1900-21',
                  para: '36'
                }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q10',
        text: 'The American team reached Tehran on 13 Jomāda/12 May, headed by William Morgan Shuster, who was determined to fulfill his mission without regard to Russian and British objectives in Persia.',
        lang: 'en',
        cite: {
          source: 'iranica-bonakdarian-great-britain-iii',
          loc: { section: 'GREAT BRITAIN iii. British influence in Persia, 1900-21', para: '36' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://www.iranicaonline.org/articles/great-britain-iii'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1911-10-09' },
            cites: [
              {
                source: 'iranica-bonakdarian-great-britain-iii',
                loc: {
                  section: 'GREAT BRITAIN iii. British influence in Persia, 1900-21',
                  para: '39'
                }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q11',
        text: 'On 9 October 1911, a standoff occurred between the Persian treasury gendarmes and the Russian consular Cossacks in Tehran.',
        lang: 'en',
        cite: {
          source: 'iranica-bonakdarian-great-britain-iii',
          loc: { section: 'GREAT BRITAIN iii. British influence in Persia, 1900-21', para: '39' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://www.iranicaonline.org/articles/great-britain-iii'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1911-11-11' },
            cites: [
              {
                source: 'iranica-bonakdarian-great-britain-iii',
                loc: {
                  section: 'GREAT BRITAIN iii. British influence in Persia, 1900-21',
                  para: '40'
                }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q12',
        text: 'This request was renewed as an ultimatum on 11 November, backed by the threat of military action, rupturing of diplomatic ties, and the added demand for withdrawal of treasury forces from Šoʿāʿ-al-Salṭana’s property. Tehran was given 48 hours to comply with this ultimatum. In reaction, the entire Persian cabinet resigned rather than submit to Russian demands.',
        lang: 'en',
        cite: {
          source: 'iranica-bonakdarian-great-britain-iii',
          loc: { section: 'GREAT BRITAIN iii. British influence in Persia, 1900-21', para: '40' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://www.iranicaonline.org/articles/great-britain-iii'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1911-11-29' },
            cites: [
              {
                source: 'iranica-bonakdarian-great-britain-iii',
                loc: {
                  section: 'GREAT BRITAIN iii. British influence in Persia, 1900-21',
                  para: '40'
                }
              },
              {
                source: 'iranica-martin-constitutional-revolution-events',
                loc: { section: 'CONSTITUTIONAL REVOLUTION ii. Events', para: '34' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q13',
        text: 'On 29 November, Russia issued a new ultimatum to Tehran, this time requesting the dismissal of the American financial adviser and the cancellation of Lecoffre’s appointment.',
        lang: 'en',
        cite: {
          source: 'iranica-bonakdarian-great-britain-iii',
          loc: { section: 'GREAT BRITAIN iii. British influence in Persia, 1900-21', para: '40' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://www.iranicaonline.org/articles/great-britain-iii'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1911-12-24' },
            cites: [
              {
                source: 'iranica-bonakdarian-great-britain-iii',
                loc: {
                  section: 'GREAT BRITAIN iii. British influence in Persia, 1900-21',
                  para: '42'
                }
              },
              {
                source: 'iranica-yarshater-chronology-part-2',
                loc: { section: 'Chronology of Iranian History Part 2, 1911' }
              }
            ],
            heldBy: [
              { kind: 'scholar', name: 'Mansour Bonakdarian' },
              { kind: 'scholar', name: 'Ehsan Yarshater' }
            ]
          },
          {
            value: { d: '1911-12-20' },
            cites: [
              {
                source: 'loc-iran-country-study-1987',
                loc: { section: 'The Constitutional Revolution', para: '4' }
              }
            ],
            heldBy: [
              { kind: 'organization', name: 'Library of Congress, Federal Research Division' }
            ]
          }
        ]
      },
      quote: {
        id: 'q15',
        text: 'After canceling Lecoffre’s appointment, on 2 Moḥarram 1330/24 December 1911 the Baḵtiāri-led cabinet took matters into its own hands, closing down the Majles premises, and announcing Shuster’s dismissal.',
        lang: 'en',
        cite: {
          source: 'iranica-bonakdarian-great-britain-iii',
          loc: { section: 'GREAT BRITAIN iii. British influence in Persia, 1900-21', para: '42' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://www.iranicaonline.org/articles/great-britain-iii'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1911-12-25' },
            cites: [
              {
                source: 'iranica-bonakdarian-great-britain-iii',
                loc: {
                  section: 'GREAT BRITAIN iii. British influence in Persia, 1900-21',
                  para: '42'
                }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q16',
        text: 'The summary execution of a number of prominent Persian constitutionalists, including the highest ranking cleric, Ṯeqat-al-Eslām, in the city of Tabriz on Christmas Day 1911 by Russian forces and their Persian henchmen loyal to the ex-shah, further amplified the “Grey must go” campaign in Britain, which got underway in early 1912 due to a broad array of objections to Grey’s over-all handling of foreign affairs (Steiner, 1977, pp. 142-43; Browne, 1912b, pp. 3-15).',
        lang: 'en',
        cite: {
          source: 'iranica-bonakdarian-great-britain-iii',
          loc: { section: 'GREAT BRITAIN iii. British influence in Persia, 1900-21', para: '42' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://www.iranicaonline.org/articles/great-britain-iii'
        }
      }
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/1/1a/SHUSTER%2C_W.M._HONORABLE_LCCN2016856902.jpg/1280px-SHUSTER%2C_W.M._HONORABLE_LCCN2016856902.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:SHUSTER,_W.M._HONORABLE_LCCN2016856902.jpg',
    credit: { institution: 'Library of Congress', creator: 'Harris & Ewing' },
    license: { id: 'public-domain' }
  },
  archive: [
    {
      id: 'shuster-strangling-of-persia-1912',
      mediaKind: 'document',
      title: 'The strangling of Persia; a story of the European diplomacy and oriental intrigue that resulted in the denationalization of twelve million Mohammedans, a personal narrative',
      date: { d: '1912' },
      url: 'https://archive.org/download/stranglingpersi00shusgoog/stranglingpersi00shusgoog.pdf',
      page: 'https://archive.org/details/stranglingpersi00shusgoog',
      credit: {
        institution: 'Harvard University (Internet Archive)',
        creator: 'Shuster, W. Morgan (William Morgan), 1877-1960'
      },
      license: { id: 'public-domain' },
      bytes: 17327586
    }
  ]
})
