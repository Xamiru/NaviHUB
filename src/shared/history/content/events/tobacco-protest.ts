import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'tobacco-protest',
  names: [
    { text: 'Tobacco Protest', lang: 'en', role: 'primary' },
    { text: 'جنبش تنباکو', lang: 'fa', role: 'native' },
    {
      text: 'tobacco protest movement',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'iranica-gilbar-qajar-big-merchants',
          loc: {
            section: 'QAJAR DYNASTY viii. “Big Merchants” in the Late Qajar Period',
            para: '21'
          }
        }
      ]
    }
  ],
  researched: '2026-10-06',
  type: 'protest',
  start: {
    alts: [
      {
        value: { d: '1891' },
        cites: [
          {
            source: 'iranica-yarshater-chronology-part-2',
            loc: { section: 'Chronology of Iranian History Part 2, 1891' }
          },
          {
            source: 'iranica-amanat-constitutional-revolution-intellectual-background',
            loc: { section: 'CONSTITUTIONAL REVOLUTION i. Intellectual background', para: '2' }
          },
          {
            source: 'iranica-kazemzadeh-anglo-iranian-relations-qajar',
            loc: { section: 'ANGLO-IRANIAN RELATIONS ii. The Qajar Period', para: '35' }
          }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1892' },
        cites: [
          {
            source: 'iranica-yarshater-chronology-part-2',
            loc: { section: 'Chronology of Iranian History Part 2, 1892' }
          },
          {
            source: 'iranica-amanat-constitutional-revolution-intellectual-background',
            loc: { section: 'CONSTITUTIONAL REVOLUTION i. Intellectual background', para: '2' }
          },
          {
            source: 'iranica-kazemzadeh-anglo-iranian-relations-qajar',
            loc: { section: 'ANGLO-IRANIAN RELATIONS ii. The Qajar Period', para: '35' }
          }
        ]
      }
    ]
  },
  regions: ['iran'],
  prominence: 1,
  places: [
    {
      ref: 'place:tehran',
      cites: [
        { source: 'iranica-algar-fatwa', loc: { section: 'FATWĀ', para: '12' } }
      ]
    },
    {
      ref: 'place:tabriz',
      cites: [
        {
          source: 'iranica-calmard-atabak-e-azam',
          loc: { section: 'ATĀBAK-E AʿẒAM, AMĪN-AL-SOLṬĀN', para: '7' }
        }
      ]
    },
    {
      ref: 'place:isfahan',
      cites: [
        {
          source: 'iranica-gilbar-qajar-big-merchants',
          loc: {
            section: 'QAJAR DYNASTY viii. “Big Merchants” in the Late Qajar Period',
            para: '21'
          }
        }
      ]
    }
  ],
  partOf: [
    { ref: 'period:reign-of-naser-al-din-shah-qajar' },
    { ref: 'period:qajar-dynasty' }
  ],
  participants: [
    {
      ref: 'person:mirza-hasan-shirazi',
      role: 'leader',
      cites: [
        { source: 'iranica-algar-fatwa', loc: { section: 'FATWĀ', para: '12' } }
      ]
    },
    {
      name: 'Mīrzā Ḥasan Āštīānī',
      role: 'leader',
      cites: [
        { source: 'iranica-algar-fatwa', loc: { section: 'FATWĀ', para: '12' } }
      ]
    },
    {
      name: 'Āqā Najafī',
      role: 'leader',
      cites: [
        { source: 'iranica-algar-fatwa', loc: { section: 'FATWĀ', para: '12' } },
        {
          source: 'iranica-yarshater-chronology-part-2',
          loc: { section: 'Chronology of Iranian History Part 2, 1891' }
        }
      ]
    },
    {
      name: 'Ḥāji Moḥammad-Ḥasan Amin-al-Żarb',
      role: 'victim',
      cites: [
        {
          source: 'iranica-gilbar-qajar-big-merchants',
          loc: {
            section: 'QAJAR DYNASTY viii. “Big Merchants” in the Late Qajar Period',
            para: '21'
          }
        }
      ]
    },
    {
      ref: 'person:naser-al-din-shah-qajar',
      role: 'head-of-state',
      cites: [
        {
          source: 'iranica-gilbar-qajar-big-merchants',
          loc: {
            section: 'QAJAR DYNASTY viii. “Big Merchants” in the Late Qajar Period',
            para: '21'
          }
        }
      ]
    },
    {
      ref: 'person:amin-al-soltan',
      role: 'head-of-government',
      cites: [
        {
          source: 'iranica-calmard-atabak-e-azam',
          loc: { section: 'ATĀBAK-E AʿẒAM, AMĪN-AL-SOLṬĀN', para: '7' }
        }
      ]
    },
    {
      ref: 'person:jamal-al-din-afghani',
      role: 'ideologue',
      cites: [
        {
          source: 'iranica-keddie-afgani-jamal-al-din',
          loc: { section: 'AFḠĀNĪ, JAMĀL-AL-DĪN', para: '16' }
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
            value: { min: 7 },
            cites: [
              { source: 'browne-1910-persian-revolution', loc: { page: '54' } }
            ],
            heldBy: [
              { kind: 'scholar', name: 'Edward Granville Browne' }
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
            value: { min: 20, qualifier: 'about' },
            cites: [
              { source: 'browne-1910-persian-revolution', loc: { page: '54' } }
            ],
            heldBy: [
              { kind: 'scholar', name: 'Edward Granville Browne' }
            ]
          }
        ]
      }
    }
  ],
  related: [
    {
      ref: 'event:tobacco-regie-concession',
      rel: 'response-to',
      cites: [
        {
          source: 'iranica-gilbar-qajar-big-merchants',
          loc: {
            section: 'QAJAR DYNASTY viii. “Big Merchants” in the Late Qajar Period',
            para: '21'
          }
        }
      ]
    },
    { ref: 'event:expulsion-of-jamal-al-din-afghani', rel: 'related' },
    {
      ref: 'event:persian-constitutional-revolution',
      rel: 'contributed-to',
      cites: [
        { source: 'iranica-algar-fatwa', loc: { section: 'FATWĀ', para: '12' } },
        {
          source: 'iranica-yarshater-iranian-history-islamic-period-5',
          loc: { section: 'IRAN ii. IRANIAN HISTORY (2) Islamic period, Qajar period' }
        }
      ]
    }
  ],
  sections: [
    {
      kind: 'background',
      quotes: [
        {
          id: 'q1',
          text: 'Tobacco was one of Iran’s main cash crops and was widely consumed by its people.',
          lang: 'en',
          cite: {
            source: 'iranica-gilbar-qajar-big-merchants',
            loc: {
              section: 'QAJAR DYNASTY viii. “Big Merchants” in the Late Qajar Period',
              para: '21'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/qajar-big-merchants'
          }
        },
        {
          id: 'q2',
          text: 'Until then, most of the domestic wholesale tobacco trade, and its export, was under the tojjār’s control and constituted an important source of income and profits for many of these big merchants.',
          lang: 'en',
          cite: {
            source: 'iranica-gilbar-qajar-big-merchants',
            loc: {
              section: 'QAJAR DYNASTY viii. “Big Merchants” in the Late Qajar Period',
              para: '21'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/qajar-big-merchants'
          }
        }
      ]
    },
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q3',
          text: '1891 Mobilization of a popular uprising by tobacco merchants leads to a nationwide tobacco boycott.',
          lang: 'en',
          cite: {
            source: 'iranica-yarshater-chronology-part-2',
            loc: { section: 'Chronology of Iranian History Part 2, 1891' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/chronology-of-iranian-history-part-2/'
          }
        },
        {
          id: 'q4',
          text: 'More celebrated and significant as a demonstration of the effect a fatwā might have was the ruling that in 1309/1891 decreed a boycott of tobacco as long as its marketing was in the hands of a British monopoly.',
          lang: 'en',
          cite: { source: 'iranica-algar-fatwa', loc: { section: 'FATWĀ', para: '12' } },
          provenance: { via: 'web', at: '2026-10-06', url: 'https://www.iranicaonline.org/articles/fatwa' }
        },
        {
          id: 'q5',
          text: '1892 Following bloody demonstrations in front of the royal palace, the Shah is forced to cancel the tobacco concession and Iran pays the sum of L500,000 by way of compensation, adding to its financial crisis; the victory of the tobacco rebellion is viewed by scholars in the field as a prelude to the Constitutional Revolution of 1905-11.',
          lang: 'en',
          cite: {
            source: 'iranica-yarshater-chronology-part-2',
            loc: { section: 'Chronology of Iranian History Part 2, 1892' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/chronology-of-iranian-history-part-2/'
          }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q6',
          text: 'Favors bestowed by Amīn-al-solṭān to keep the anti-concession movement from going even further enriched and strengthened the ʿolamāʾ, notably Mīrzā Ḥasan Āštīānī who had a milder position than Šīrāzī (Keddie, op. cit., pp. 114ff.).',
          lang: 'en',
          cite: {
            source: 'iranica-calmard-atabak-e-azam',
            loc: { section: 'ATĀBAK-E AʿẒAM, AMĪN-AL-SOLṬĀN', para: '7' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/atabak-e-azam'
          }
        },
        {
          id: 'q7',
          text: 'Even after the settlement for compensation, opposition to government policies continued.',
          lang: 'en',
          cite: {
            source: 'iranica-calmard-atabak-e-azam',
            loc: { section: 'ATĀBAK-E AʿẒAM, AMĪN-AL-SOLṬĀN', para: '8' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/atabak-e-azam'
          }
        },
        {
          id: 'q8',
          text: 'More than ever this episode made the British representatives aware of the ulama’s potential power and the need to accommodate them.',
          lang: 'en',
          cite: {
            source: 'iranica-amanat-great-britain-ii',
            loc: {
              section: 'GREAT BRITAIN ii. British influence in Persia in the 19th century',
              para: '35'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/great-britain-ii/'
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
            value: { d: '1891' },
            cites: [
              {
                source: 'iranica-yarshater-chronology-part-2',
                loc: { section: 'Chronology of Iranian History Part 2, 1891' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q9',
        text: '1891 Āqā Najafi, a leading cleric of Isfahan, declares tobacco prohibited (ḥarām) and orders his followers to go through the bazaars and smash all water pipes as a protest against the tobacco concession to Major Talbot.',
        lang: 'en',
        cite: {
          source: 'iranica-yarshater-chronology-part-2',
          loc: { section: 'Chronology of Iranian History Part 2, 1891' }
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
            value: { d: '1891-02' },
            cites: [
              {
                source: 'iranica-gilbar-qajar-big-merchants',
                loc: {
                  section: 'QAJAR DYNASTY viii. “Big Merchants” in the Late Qajar Period',
                  para: '21'
                }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q10',
        text: 'A petition addressed to the shah protesting the concession was prepared by Tehran’s tobacco merchants in February 1891.',
        lang: 'en',
        cite: {
          source: 'iranica-gilbar-qajar-big-merchants',
          loc: {
            section: 'QAJAR DYNASTY viii. “Big Merchants” in the Late Qajar Period',
            para: '21'
          }
        },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://www.iranicaonline.org/articles/qajar-big-merchants'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1891' },
            cites: [
              {
                source: 'iranica-calmard-atabak-e-azam',
                loc: { section: 'ATĀBAK-E AʿẒAM, AMĪN-AL-SOLṬĀN', para: '7' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q11',
        text: 'Protests and revolts spread to all major cities from the spring of 1891.',
        lang: 'en',
        cite: {
          source: 'iranica-calmard-atabak-e-azam',
          loc: { section: 'ATĀBAK-E AʿẒAM, AMĪN-AL-SOLṬĀN', para: '7' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://www.iranicaonline.org/articles/atabak-e-azam'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1891-12' },
            cites: [
              { source: 'iranica-algar-fatwa', loc: { section: 'FATWĀ', para: '12' } },
              {
                source: 'iranica-calmard-atabak-e-azam',
                loc: { section: 'ATĀBAK-E AʿẒAM, AMĪN-AL-SOLṬĀN', para: '7' }
              },
              {
                source: 'iranica-keddie-afgani-jamal-al-din',
                loc: { section: 'AFḠĀNĪ, JAMĀL-AL-DĪN', para: '16' }
              }
            ],
            heldBy: [
              { kind: 'scholar', name: 'Hamid Algar' },
              { kind: 'scholar', name: 'Jean Calmard' },
              { kind: 'scholar', name: 'Nikki R. Keddie' }
            ]
          },
          {
            value: { d: '1890-12-03', notAfter: '1891-01-26' },
            cites: [
              { source: 'iranica-floor-tobacco', loc: { section: 'TOBACCO', para: '3' } }
            ],
            heldBy: [
              { kind: 'scholar', name: 'Willem M. Floor' }
            ]
          }
        ]
      },
      quote: {
        id: 'q12',
        text: 'In early December 1891, a fatwā began circulating in Tehran proclaiming that “from this day forward, the use of tonbākū (tobacco for water pipes) and tūtūn (pipe tobacco), in whatever form it may be, is tantamount to war against the Imam of the Age [i.e., the occulted Twelfth Imam], may God hasten his reappearance!”',
        lang: 'en',
        cite: { source: 'iranica-algar-fatwa', loc: { section: 'FATWĀ', para: '12' } },
        provenance: { via: 'web', at: '2026-10-06', url: 'https://www.iranicaonline.org/articles/fatwa' }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1891-12' },
            cites: [
              {
                source: 'iranica-gilbar-qajar-big-merchants',
                loc: {
                  section: 'QAJAR DYNASTY viii. “Big Merchants” in the Late Qajar Period',
                  para: '21'
                }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q13',
        text: 'The tojjār’s achievement was, however, only partial, as a deep breach between the shah and the tojjār had developed by then, best exemplified by the arrest and deportation from Tehran to Qazvin in December 1891 of Ḥāji Moḥammad-Ḥasan Amin-al-Żarb by the order of the shah (Gilbar, 1976-77, pp. 288-91; Ashraf, 1980, pp. 110-12; Ādamiyat, p. 55; Moaddel, p. 459).',
        lang: 'en',
        cite: {
          source: 'iranica-gilbar-qajar-big-merchants',
          loc: {
            section: 'QAJAR DYNASTY viii. “Big Merchants” in the Late Qajar Period',
            para: '21'
          }
        },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://www.iranicaonline.org/articles/qajar-big-merchants'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1892-01' },
            cites: [
              { source: 'browne-1910-persian-revolution', loc: { page: '54' } }
            ]
          }
        ]
      },
      quote: {
        id: 'q14',
        text: 'Seven persons were killed and about twenty more wounded, but the crowd was dispersed.',
        lang: 'en',
        cite: { source: 'browne-1910-persian-revolution', loc: { page: '54' } },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://archive.org/download/persianrevolutio00browuoft/persianrevolutio00browuoft_djvu.txt'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1892-01-05' },
            cites: [
              { source: 'browne-1910-persian-revolution', loc: { page: '51' } },
              {
                source: 'iranica-gilbar-qajar-big-merchants',
                loc: {
                  section: 'QAJAR DYNASTY viii. “Big Merchants” in the Late Qajar Period',
                  para: '21'
                }
              }
            ],
            heldBy: [
              { kind: 'scholar', name: 'Edward Granville Browne' },
              { kind: 'scholar', name: 'Gad G. Gilbar' }
            ]
          },
          {
            value: { d: '1891-12' },
            cites: [
              {
                source: 'iranica-farmayan-amin-al-dawla',
                loc: { section: 'AMĪN-AL-DAWLA, MĪRZĀ ʿALĪ KHAN', para: '3' }
              }
            ],
            heldBy: [
              { kind: 'scholar', name: 'Hafez Farmayan' }
            ]
          }
        ]
      },
      quote: {
        id: 'q15',
        text: 'The fatwā had a remarkable effect (it was observed even in the shah’s court), and in January 1892 Nāṣer-al-Din Shah finally cancelled the concession.',
        lang: 'en',
        cite: {
          source: 'iranica-gilbar-qajar-big-merchants',
          loc: {
            section: 'QAJAR DYNASTY viii. “Big Merchants” in the Late Qajar Period',
            para: '21'
          }
        },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://www.iranicaonline.org/articles/qajar-big-merchants'
        }
      }
    }
  ],
  hero: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/f/f4/Tobacco_Protest_Fatwa_issued_by_Mirza_Mohammed_Hassan_Husseini_Shirazi_-_1890.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Tobacco_Protest_Fatwa_issued_by_Mirza_Mohammed_Hassan_Husseini_Shirazi_-_1890.jpg',
    credit: {
      institution: 'Institute for Iranian Contemporary Historical Studies',
      creator: 'Mirza Shirazi'
    },
    license: { id: 'public-domain' }
  },
  archive: [
    {
      id: 'browne-persian-revolution-1910',
      mediaKind: 'document',
      title: 'The Persian revolution of 1905-1909',
      date: { d: '1910' },
      url: 'https://archive.org/download/persianrevolutio00browuoft/persianrevolutio00browuoft.pdf',
      page: 'https://archive.org/details/persianrevolutio00browuoft',
      credit: {
        institution: 'Robarts - University of Toronto (Internet Archive)',
        creator: 'Browne, Edward Granville, 1862-1926'
      },
      license: { id: 'public-domain' },
      bytes: 48843454
    }
  ]
})
