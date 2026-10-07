import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'indo-european-telegraph-line',
  names: [
    { text: 'Indo-European telegraph line through Iran', lang: 'en', role: 'primary' },
    {
      text: 'Anglo-Iranian telegraph engagement',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'iranica-rubin-indo-european-telegraph-department',
          loc: { section: 'INDO-EUROPEAN TELEGRAPH DEPARTMENT', para: '3' }
        }
      ]
    }
  ],
  researched: '2026-10-07',
  type: 'economic',
  start: {
    alts: [
      {
        value: { d: '1862-12-17' },
        cites: [
          {
            source: 'iranica-rubin-indo-european-telegraph-department',
            loc: { section: 'INDO-EUROPEAN TELEGRAPH DEPARTMENT', para: '3' }
          }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1865-03-01' },
        cites: [
          {
            source: 'iranica-rubin-indo-european-telegraph-department',
            loc: { section: 'INDO-EUROPEAN TELEGRAPH DEPARTMENT', para: '3' }
          }
        ]
      }
    ]
  },
  regions: ['iran', 'south-asia', 'europe'],
  prominence: 2,
  places: [
    {
      ref: 'place:tehran',
      cites: [
        {
          source: 'iranica-rubin-indo-european-telegraph-department',
          loc: { section: 'INDO-EUROPEAN TELEGRAPH DEPARTMENT', para: '3' }
        }
      ]
    },
    {
      ref: 'place:bushehr',
      cites: [
        {
          source: 'iranica-rubin-indo-european-telegraph-department',
          loc: { section: 'INDO-EUROPEAN TELEGRAPH DEPARTMENT', para: '3' }
        }
      ]
    }
  ],
  partOf: [
    { ref: 'period:qajar-dynasty' },
    { ref: 'period:reign-of-naser-al-din-shah-qajar' }
  ],
  related: [
    { ref: 'event:first-telegraph-line-in-iran', rel: 'preceded-by' }
  ],
  participants: [
    {
      ref: 'person:naser-al-din-shah-qajar',
      role: 'head-of-state',
      cites: [
        {
          source: 'iranica-rubin-indo-european-telegraph-department',
          loc: { section: 'INDO-EUROPEAN TELEGRAPH DEPARTMENT', para: '3' }
        }
      ]
    },
    {
      name: 'Edward Backhouse Eastwick',
      role: 'diplomat',
      cites: [
        {
          source: 'iranica-rubin-indo-european-telegraph-department',
          loc: { section: 'INDO-EUROPEAN TELEGRAPH DEPARTMENT', para: '3' }
        }
      ]
    },
    {
      ref: 'person:farrokh-khan-ghaffari',
      role: 'negotiator',
      cites: [
        {
          source: 'iranica-rubin-indo-european-telegraph-department',
          loc: { section: 'INDO-EUROPEAN TELEGRAPH DEPARTMENT', para: '3' }
        }
      ]
    },
    {
      name: 'Charles Wood',
      role: 'negotiator',
      cites: [
        {
          source: 'iranica-rubin-indo-european-telegraph-department',
          loc: { section: 'INDO-EUROPEAN TELEGRAPH DEPARTMENT', para: '3' }
        }
      ]
    },
    {
      name: 'Mirzā Jaʿfar Khan',
      role: 'negotiator',
      cites: [
        {
          source: 'iranica-rubin-indo-european-telegraph-department',
          loc: { section: 'INDO-EUROPEAN TELEGRAPH DEPARTMENT', para: '3' }
        }
      ]
    },
    {
      name: 'Patrick Stewart',
      role: 'participant',
      cites: [
        {
          source: 'iranica-rubin-indo-european-telegraph-department',
          loc: { section: 'INDO-EUROPEAN TELEGRAPH DEPARTMENT', para: '3' }
        }
      ]
    },
    {
      name: 'Eʿteżād-al-Salṭana',
      role: 'participant',
      cites: [
        {
          source: 'iranica-rubin-indo-european-telegraph-department',
          loc: { section: 'INDO-EUROPEAN TELEGRAPH DEPARTMENT', para: '3' }
        }
      ]
    },
    {
      name: 'Frederic Goldsmid',
      role: 'participant',
      cites: [
        {
          source: 'iranica-rubin-indo-european-telegraph-department',
          loc: { section: 'INDO-EUROPEAN TELEGRAPH DEPARTMENT', para: '5' }
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
          text: 'INDO-EUROPEAN TELEGRAPH DEPARTMENT (IETD), a branch of the British Government of India, based in London, which managed a series of telegraph lines in Iran.',
          lang: 'en',
          cite: {
            source: 'iranica-rubin-indo-european-telegraph-department',
            loc: { section: 'INDO-EUROPEAN TELEGRAPH DEPARTMENT', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/indo-european-telegraph-department'
          }
        },
        {
          id: 'q2',
          text: 'After the completion of all the telegraph lines within Tehran and between it and Tabriz, other telegraph lines were gradually constructed throughout Persia, with the ‘quantum leap’ in telegraphic expansion starting with the construction and operation of the Indo-European telegraph line completed in 1865.',
          lang: 'en',
          cite: {
            source: 'iranica-shahvar-telegraph-i',
            loc: { section: 'TELEGRAPH i. FIRST TELEGRAPH LINES IN PERSIA', para: '9' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/telegraph-i-first-telegraph-lines-in-persia/'
          }
        }
      ]
    },
    {
      kind: 'causes',
      quotes: [
        {
          id: 'q3',
          text: 'The impetus for the creation of the IETD was the 1857 India Mutiny, in which the British empire almost lost its prize colony before any official in London learned there was a problem.',
          lang: 'en',
          cite: {
            source: 'iranica-rubin-indo-european-telegraph-department',
            loc: { section: 'INDO-EUROPEAN TELEGRAPH DEPARTMENT', para: '2' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/indo-european-telegraph-department'
          }
        },
        {
          id: 'q4',
          text: 'The British decided to lay telegraph lines through Iran after early attempts to lay submarine cables under the Red Sea and Indian Ocean failed (British Parliamentary Papers, pp. 31-32).',
          lang: 'en',
          cite: {
            source: 'iranica-rubin-indo-european-telegraph-department',
            loc: { section: 'INDO-EUROPEAN TELEGRAPH DEPARTMENT', para: '2' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/indo-european-telegraph-department'
          }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q5',
          text: 'It passed through the heart of Persia and connected major and lesser places in Persia not only with each other, but with many other countries as well.',
          lang: 'en',
          cite: {
            source: 'iranica-shahvar-telegraph-i',
            loc: { section: 'TELEGRAPH i. FIRST TELEGRAPH LINES IN PERSIA', para: '9' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/telegraph-i-first-telegraph-lines-in-persia/'
          }
        },
        {
          id: 'q6',
          text: 'With the establishment and growth of the Indo-European Telegraph Department (hereafter IETD) in Persia from the mid-1860s, the British networks for news-gathering and local influence grew in size and efficiency.',
          lang: 'en',
          cite: {
            source: 'iranica-amanat-great-britain-ii',
            loc: {
              section: 'GREAT BRITAIN ii. British influence in Persia in the 19th century',
              para: '22'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/great-britain-ii/'
          }
        },
        {
          id: 'q7',
          text: 'Creating a vital link with colonial India, IETD became the most significant British investment in Persia up to the early 20th century.',
          lang: 'en',
          cite: {
            source: 'iranica-amanat-great-britain-ii',
            loc: {
              section: 'GREAT BRITAIN ii. British influence in Persia in the 19th century',
              para: '22'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/great-britain-ii/'
          }
        },
        {
          id: 'q8',
          text: 'Telegraph stations accordingly diminished the power of provincial governors, who no longer had a monopoly over communications with the central government.',
          lang: 'en',
          cite: {
            source: 'iranica-rubin-indo-european-telegraph-department',
            loc: { section: 'INDO-EUROPEAN TELEGRAPH DEPARTMENT', para: '9' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/indo-european-telegraph-department'
          }
        },
        {
          id: 'q9',
          text: 'At the same time, the introduction of telegraph links with Europe provided faster and more direct contact between the Persian government and the European capitals.',
          lang: 'en',
          cite: {
            source: 'iranica-amanat-great-britain-ii',
            loc: {
              section: 'GREAT BRITAIN ii. British influence in Persia in the 19th century',
              para: '21'
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
            value: { d: '1861' },
            cites: [
              {
                source: 'iranica-rubin-indo-european-telegraph-department',
                loc: { section: 'INDO-EUROPEAN TELEGRAPH DEPARTMENT', para: '3' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q10',
        text: 'Charles Wood, the Secretary of State for India, began negotiations with Iran’s ambassador in London, Mirzā Jaʿfar Khan (later Mošir-al-Dawla), in early 1861 for a telegraph line to stretch from the Ottoman frontier near Khanaqin through Iran to Bandar ʿAbbās (Wood to Mirzā Jaʿfar Khan, 17 May 1861, IO L/PWD/2/196).',
        lang: 'en',
        cite: {
          source: 'iranica-rubin-indo-european-telegraph-department',
          loc: { section: 'INDO-EUROPEAN TELEGRAPH DEPARTMENT', para: '3' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://www.iranicaonline.org/articles/indo-european-telegraph-department'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1862-12-17' },
            cites: [
              {
                source: 'iranica-rubin-indo-european-telegraph-department',
                loc: { section: 'INDO-EUROPEAN TELEGRAPH DEPARTMENT', para: '3' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q11',
        text: 'On 17 December 1862, Edward Backhouse Eastwick, Britain’s chargé d’affaires in Tehran, after close consultations with Amin-al-Dawla, minister in presence and former Iranian ambassador to France, won agreement from Naṣer-al-Din Shah.',
        lang: 'en',
        cite: {
          source: 'iranica-rubin-indo-european-telegraph-department',
          loc: { section: 'INDO-EUROPEAN TELEGRAPH DEPARTMENT', para: '3' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://www.iranicaonline.org/articles/indo-european-telegraph-department'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1863-02-06' },
            cites: [
              {
                source: 'iranica-rubin-indo-european-telegraph-department',
                loc: { section: 'INDO-EUROPEAN TELEGRAPH DEPARTMENT', para: '3' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q12',
        text: 'The resulting Anglo-Iranian telegraph engagement, signed by Queen Victoria on 6 February 1863, called on Iran to build a line stretching from Khanaqin (across the Ottoman frontier from the Iranian town of Qaṣr-e Širin) thru Tehran and onward to Bušehr, supervised by a British engineer, Patrick Stewart.',
        lang: 'en',
        cite: {
          source: 'iranica-rubin-indo-european-telegraph-department',
          loc: { section: 'INDO-EUROPEAN TELEGRAPH DEPARTMENT', para: '3' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://www.iranicaonline.org/articles/indo-european-telegraph-department'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1863-08' },
            cites: [
              {
                source: 'iranica-rubin-indo-european-telegraph-department',
                loc: { section: 'INDO-EUROPEAN TELEGRAPH DEPARTMENT', para: '3' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q13',
        text: 'Hampered by lack of railroads and carriage roads to transport material, construction did not begin until August 1863.',
        lang: 'en',
        cite: {
          source: 'iranica-rubin-indo-european-telegraph-department',
          loc: { section: 'INDO-EUROPEAN TELEGRAPH DEPARTMENT', para: '3' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://www.iranicaonline.org/articles/indo-european-telegraph-department'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1864' },
            cites: [
              {
                source: 'iranica-rubin-indo-european-telegraph-department',
                loc: { section: 'INDO-EUROPEAN TELEGRAPH DEPARTMENT', para: '3' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q14',
        text: 'While the line became operational in 1864, disputes between IETD officials and the minister of science (wazir-e ʿolum) Eʿteżād-al-Salṭana over control kept traffic off the lines through most of the following year.',
        lang: 'en',
        cite: {
          source: 'iranica-rubin-indo-european-telegraph-department',
          loc: { section: 'INDO-EUROPEAN TELEGRAPH DEPARTMENT', para: '3' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://www.iranicaonline.org/articles/indo-european-telegraph-department'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1865-03-01' },
            cites: [
              {
                source: 'iranica-rubin-indo-european-telegraph-department',
                loc: { section: 'INDO-EUROPEAN TELEGRAPH DEPARTMENT', para: '3' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q15',
        text: 'On 1 March 1865, the first uninterrupted messages between India and London traversed Iranian territory, though message traffic did not become regular until November, when the British and Iranian governments exchanged ratification on an Anglo-Iranian Convention of 1865.',
        lang: 'en',
        cite: {
          source: 'iranica-rubin-indo-european-telegraph-department',
          loc: { section: 'INDO-EUROPEAN TELEGRAPH DEPARTMENT', para: '3' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://www.iranicaonline.org/articles/indo-european-telegraph-department'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1868-04-02' },
            cites: [
              {
                source: 'iranica-rubin-indo-european-telegraph-department',
                loc: { section: 'INDO-EUROPEAN TELEGRAPH DEPARTMENT', para: '5' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q16',
        text: 'On 2 April 1868, the British and Iranian governments signed a further Anglo-Iranian Telegraph Convention allowing the IETD to build a telegraph between Gwadar (which was already connected to Karachi in British India) and a point between Jāsk and Bandar ʿAbbās.',
        lang: 'en',
        cite: {
          source: 'iranica-rubin-indo-european-telegraph-department',
          loc: { section: 'INDO-EUROPEAN TELEGRAPH DEPARTMENT', para: '5' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://www.iranicaonline.org/articles/indo-european-telegraph-department'
        }
      }
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/0/0c/The_Indo-European_Telegraph._Mussendom_Station%2C_Elphinstone_Inlet%2C_Persian_Gulf_-_ILN_1865.jpg/1280px-The_Indo-European_Telegraph._Mussendom_Station%2C_Elphinstone_Inlet%2C_Persian_Gulf_-_ILN_1865.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:The_Indo-European_Telegraph._Mussendom_Station,_Elphinstone_Inlet,_Persian_Gulf_-_ILN_1865.jpg',
    credit: { institution: 'The Illustrated London News (8 July 1865)' },
    license: { id: 'public-domain' }
  },
  archive: [
    {
      id: 'goldsmid-telegraph-and-travel-1874',
      mediaKind: 'document',
      title: 'Telegraph and travel, telegraphic communication between England and India',
      date: { d: '1874' },
      url: 'https://archive.org/download/telegraphandtra01goldgoog/telegraphandtra01goldgoog.pdf',
      page: 'https://archive.org/details/telegraphandtra01goldgoog',
      credit: {
        institution: 'Oxford University (Internet Archive)',
        creator: 'Frederic John Goldsmid'
      },
      license: { id: 'public-domain' },
      bytes: 23554722
    }
  ]
})
