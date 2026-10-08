import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'persian-constitutional-revolution',
  names: [
    { text: 'Persian Constitutional Revolution', lang: 'en', role: 'primary' },
    { text: 'انقلاب مشروطه', lang: 'fa', role: 'native' }
  ],
  researched: '2026-10-08',
  type: 'revolution',
  start: {
    alts: [
      {
        value: { d: '1905' },
        cites: [
          {
            source: 'iranica-yarshater-chronology-part-2',
            loc: { section: 'Chronology of Iranian History Part 2, 1892' }
          }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1911' },
        cites: [
          {
            source: 'iranica-yarshater-chronology-part-2',
            loc: { section: 'Chronology of Iranian History Part 2, 1892' }
          }
        ]
      }
    ]
  },
  regions: ['iran'],
  prominence: 1,
  places: [
    { ref: 'place:tehran' },
    { ref: 'place:tabriz' }
  ],
  partOf: [
    { ref: 'period:qajar-dynasty' }
  ],
  polities: [
    { ref: 'polity:qajar-iran' }
  ],
  participants: [
    {
      ref: 'person:mozaffar-al-din-shah',
      role: 'head-of-state',
      cites: [
        {
          source: 'iranica-yarshater-iranian-history-islamic-period-5',
          loc: { section: 'IRAN ii. IRANIAN HISTORY (2) Islamic period, Qajar period' }
        }
      ]
    },
    {
      ref: 'person:mohammad-ali-shah-qajar',
      role: 'head-of-state',
      cites: [
        {
          source: 'iranica-yarshater-iranian-history-islamic-period-5',
          loc: { section: 'IRAN ii. IRANIAN HISTORY (2) Islamic period, Qajar period' }
        }
      ]
    },
    {
      ref: 'person:ahmad-shah-qajar',
      role: 'head-of-state',
      cites: [
        {
          source: 'iranica-sheikh-ol-islami-ahmad-shah',
          loc: { section: 'AḤMAD SHAH QĀJĀR', para: '1' }
        }
      ]
    },
    {
      ref: 'person:abdollah-behbahani',
      role: 'leader',
      cites: [
        {
          source: 'iranica-martin-constitutional-revolution-events',
          loc: {
            section: 'CONSTITUTIONAL REVOLUTION ii. Events, Events leading to adoption of the Constitution',
            para: '2'
          }
        }
      ]
    },
    {
      ref: 'person:mohammad-tabatabai',
      role: 'leader',
      cites: [
        {
          source: 'iranica-martin-constitutional-revolution-events',
          loc: {
            section: 'CONSTITUTIONAL REVOLUTION ii. Events, Events leading to adoption of the Constitution',
            para: '2'
          }
        }
      ]
    },
    {
      ref: 'person:fazlollah-nuri',
      role: 'ideologue',
      cites: [
        { source: 'iranica-martin-nuri', loc: { section: 'NURI, FAŻL-ALLĀH', para: '1' } }
      ]
    },
    {
      ref: 'person:sattar-khan',
      role: 'commander',
      cites: [
        {
          source: 'iranica-pistor-hatam-sattar-khan',
          loc: { section: 'SATTĀR KHAN', para: '4' }
        }
      ]
    },
    {
      ref: 'person:baqer-khan',
      role: 'commander',
      cites: [
        {
          source: 'iranica-amanat-baqer-khan',
          loc: { section: 'BĀQER KHAN SĀLĀR-E MELLI', para: '3' }
        }
      ]
    }
  ],
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q17',
          text: 'Foreign interference in Iran, Qajar misrule, and new ideas on government led in 1905 to protests and eventually to the Constitutional Revolution (1905-07), which, at least on paper, limited royal absolutism, created in Iran a constitutional monarchy, and recognized the people as a source of legitimacy.',
          lang: 'en',
          cite: { source: 'loc-iran-country-study-1987', loc: { section: 'History', para: '6' } },
          provenance: { via: 'web', at: '2026-10-07', url: 'http://countrystudies.us/iran/3.htm' }
        },
        {
          id: 'q1',
          text: 'The shah\'s failure to respond to protests by the religious establishment, the merchants, and other classes led the merchants and clerical leaders in January 1906 to take sanctuary from probable arrest in mosques in Tehran and outside the capital. When the shah reneged on a promise to permit the establishment of a "house of justice," or consultative assembly, 10,000 people, led by the merchants, took sanctuary in June in the compound of the British legation in Tehran. In August the shah was forced to issue a decree promising a constitution.',
          lang: 'en',
          cite: {
            source: 'loc-iran-country-study-1987',
            loc: { section: 'The Constitutional Revolution', para: '2' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/iran/13.htm' }
        },
        {
          id: 'q2',
          text: 'The opposition took on a more reformist character when Behbahānī and Sayyed Moḥammad Ṭabāṭabāʾī, a mojtahed much influenced by the 19th-century reform goals of government according to law and greater administrative efficiency (see i, above), entered into an agreement to collaborate, on the eve of 25 Ramażān 1323/23 November 1905',
          lang: 'en',
          cite: {
            source: 'iranica-martin-constitutional-revolution-events',
            loc: {
              section: 'CONSTITUTIONAL REVOLUTION ii. Events, Events leading to adoption of the Constitution',
              para: '2'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/constitutional-revolution-ii'
          }
        },
        {
          id: 'q3',
          text: 'From most contemporary accounts it is clear that the demand for a national assembly evolved during this bast; although most of the participants were ignorant of the principles of constitutional government, members of the reformist secret societies were particularly active among them',
          lang: 'en',
          cite: {
            source: 'iranica-martin-constitutional-revolution-events',
            loc: {
              section: 'CONSTITUTIONAL REVOLUTION ii. Events, Events leading to adoption of the Constitution',
              para: '6'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/constitutional-revolution-ii'
          }
        }
      ]
    },
    {
      kind: 'legacy',
      quotes: [
        {
          id: 'q4',
          text: 'Nevertheless, the civil rights granted in the Constitution were not all lost. Although the constitutionalists had not established sufficient safeguards for the preservation of democratic rights, the Constitution did furnish a rudimentary framework for the state’s treatment of its citizens.',
          lang: 'en',
          cite: {
            source: 'iranica-amanat-constitutional-revolution-intellectual-background',
            loc: { section: 'CONSTITUTIONAL REVOLUTION i. Intellectual background', para: '53' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/constitutional-revolution-i'
          }
        },
        {
          id: 'q5',
          text: 'The hopes for constitutional rule were not realized, however.',
          lang: 'en',
          cite: {
            source: 'loc-iran-country-study-1987',
            loc: { section: 'The Constitutional Revolution', para: '2' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/iran/13.htm' }
        }
      ]
    }
  ],
  course: [
    {
      date: {
        alts: [
          {
            value: { d: '1905-12-12' },
            cites: [
              {
                source: 'iranica-martin-constitutional-revolution-events',
                loc: {
                  section: 'CONSTITUTIONAL REVOLUTION ii. Events, Events leading to adoption of the Constitution',
                  para: '3'
                }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q6',
        text: 'When ʿAlāʾ-al-Dawla, the governor of Tehran, ordered two merchants bastinadoed on 14 Šawwāl 1323/12 December 1905, as punishment for having raised the price of sugar, he provided the opposition with a pretext for open resistance.',
        lang: 'en',
        cite: {
          source: 'iranica-martin-constitutional-revolution-events',
          loc: {
            section: 'CONSTITUTIONAL REVOLUTION ii. Events, Events leading to adoption of the Constitution',
            para: '3'
          }
        },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://www.iranicaonline.org/articles/constitutional-revolution-ii'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1906-01-10' },
            cites: [
              {
                source: 'iranica-martin-constitutional-revolution-events',
                loc: {
                  section: 'CONSTITUTIONAL REVOLUTION ii. Events, Events leading to adoption of the Constitution',
                  para: '4'
                }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q7',
        text: 'On 14 Ḏu’l-qaʿda 1323/10 January 1906 a rescript was issued granting an ʿadālat-ḵāna to “execute the laws of the Šarīʿa and ensure the security of the subjects” (Tārīḵ-e bīdārī, ed. Saʿīdī Sīrjānī, I, p. 366), and the protesting ʿolamāʾ emerged from bast two days later.',
        lang: 'en',
        cite: {
          source: 'iranica-martin-constitutional-revolution-events',
          loc: {
            section: 'CONSTITUTIONAL REVOLUTION ii. Events, Events leading to adoption of the Constitution',
            para: '4'
          }
        },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://www.iranicaonline.org/articles/constitutional-revolution-ii'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1906-08-05' },
            cites: [
              {
                source: 'iranica-martin-constitutional-revolution-events',
                loc: {
                  section: 'CONSTITUTIONAL REVOLUTION ii. Events, Events leading to adoption of the Constitution',
                  para: '7'
                }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q8',
        text: 'A rescript of 14 Jomādā II/5 August granting a majles of representatives elected from all classes, including the guilds, was rejected by the opposition because they found it too vague.',
        lang: 'en',
        cite: {
          source: 'iranica-martin-constitutional-revolution-events',
          loc: {
            section: 'CONSTITUTIONAL REVOLUTION ii. Events, Events leading to adoption of the Constitution',
            para: '7'
          }
        },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://www.iranicaonline.org/articles/constitutional-revolution-ii'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1906-08-10' },
            cites: [
              {
                source: 'iranica-martin-constitutional-revolution-events',
                loc: {
                  section: 'CONSTITUTIONAL REVOLUTION ii. Events, Events leading to adoption of the Constitution',
                  para: '7'
                }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q9',
        text: 'Finally, following further consultations, including an interview between the grand vizier, Mošīr-al-Dawla, and leading merchants, the rescript of 19 Jomādā II/10 August granted the right to a majles-e šūrā-ye mellī',
        lang: 'en',
        cite: {
          source: 'iranica-martin-constitutional-revolution-events',
          loc: {
            section: 'CONSTITUTIONAL REVOLUTION ii. Events, Events leading to adoption of the Constitution',
            para: '7'
          }
        },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://www.iranicaonline.org/articles/constitutional-revolution-ii'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1906-10-07' },
            cites: [
              {
                source: 'iranica-martin-constitutional-revolution-events',
                loc: {
                  section: 'CONSTITUTIONAL REVOLUTION ii. Events, Adoption of the Constitution and early debates',
                  para: '9'
                }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q10',
        text: 'The Majles opened on 18 Šaʿbān/7 October, with Ṣanīʿ-al-Dawla as its first president.',
        lang: 'en',
        cite: {
          source: 'iranica-martin-constitutional-revolution-events',
          loc: {
            section: 'CONSTITUTIONAL REVOLUTION ii. Events, Adoption of the Constitution and early debates',
            para: '9'
          }
        },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://www.iranicaonline.org/articles/constitutional-revolution-ii'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1906-12-30' },
            cites: [
              {
                source: 'loc-iran-country-study-1987',
                loc: { section: 'The Constitutional Revolution', para: '2' }
              }
            ]
          },
          {
            value: { d: '1907-01-01' },
            cites: [
              {
                source: 'iranica-martin-constitutional-revolution-events',
                loc: {
                  section: 'CONSTITUTIONAL REVOLUTION ii. Events, Adoption of the Constitution and early debates',
                  para: '10'
                }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q11',
        text: 'The shah signed the constitution on December 30, 1906. He died five days later.',
        lang: 'en',
        cite: {
          source: 'loc-iran-country-study-1987',
          loc: { section: 'The Constitutional Revolution', para: '2' }
        },
        provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/iran/13.htm' }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1907-10' },
            cites: [
              {
                source: 'iranica-martin-nuri',
                loc: { section: 'NURI, FAŻL-ALLĀH', para: '13' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q12',
        text: 'With the passing of the Supplementary Fundamental Law in October 1907 tensions built up between the shah and Majles.',
        lang: 'en',
        cite: { source: 'iranica-martin-nuri', loc: { section: 'NURI, FAŻL-ALLĀH', para: '13' } },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://www.iranicaonline.org/articles/nuri-fazl-allah/'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1908-06-23' },
            cites: [
              {
                source: 'iranica-algar-behbahani',
                loc: { section: 'BEHBAHĀNĪ, ʿABD-ALLĀH', para: '8' }
              },
              {
                source: 'iranica-amanat-baqer-khan',
                loc: { section: 'BĀQER KHAN SĀLĀR-E MELLI', para: '3' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q13',
        text: 'After several disputes with the members of the Majlis, in June 1908 he used his Russian-officered Persian Cossacks Brigade to bomb the Majlis building, arrest many of the deputies, and close down the assembly.',
        lang: 'en',
        cite: {
          source: 'loc-iran-country-study-1987',
          loc: { section: 'The Constitutional Revolution', para: '3' }
        },
        provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/iran/13.htm' }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1909-07-16' },
            cites: [
              {
                source: 'iranica-pistor-hatam-sattar-khan',
                loc: { section: 'SATTĀR KHAN', para: '5' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q14',
        text: 'In July 1909, constitutional forces marched from Rasht and Esfahan to Tehran, deposed the shah, and reestablished the constitution.',
        lang: 'en',
        cite: {
          source: 'loc-iran-country-study-1987',
          loc: { section: 'The Constitutional Revolution', para: '3' }
        },
        provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/iran/13.htm' }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1909-11-15' },
            cites: [
              {
                source: 'iranica-yarshater-chronology-part-2',
                loc: { section: 'Chronology of Iranian History Part 2, 1909' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q15',
        text: 'Second Majles comes into session on November 15.',
        lang: 'en',
        cite: {
          source: 'iranica-yarshater-chronology-part-2',
          loc: { section: 'Chronology of Iranian History Part 2, 1909' }
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
            value: { d: '1911-12-20' },
            cites: [
              {
                source: 'loc-iran-country-study-1987',
                loc: { section: 'The Constitutional Revolution', para: '4' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q16',
        text: 'To prevent this, on December 20 Bakhtiari chiefs and their troops surrounded the Majlis building, forced acceptance of the Russian ultimatum, and shut down the assembly, once again suspending the constitution.',
        lang: 'en',
        cite: {
          source: 'loc-iran-country-study-1987',
          loc: { section: 'The Constitutional Revolution', para: '4' }
        },
        provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/iran/13.htm' }
      }
    }
  ],
  hero: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/8/81/Representatives_of_the_First_Iranian_Parliament_WDL11288.png',
    page: 'https://commons.wikimedia.org/wiki/File:Representatives_of_the_First_Iranian_Parliament_WDL11288.png',
    title: 'Representatives of the First Iranian Parliament',
    credit: { institution: 'World Digital Library, Library of Congress' },
    license: { id: 'public-domain' }
  },
  archive: [
    {
      id: 'browne-1910',
      mediaKind: 'document',
      title: 'The Persian revolution of 1905-1909',
      date: { d: '1910' },
      url: 'https://archive.org/download/persianrevolutio00browuoft/persianrevolutio00browuoft.pdf',
      page: 'https://archive.org/details/persianrevolutio00browuoft',
      credit: {
        institution: 'University of Toronto, Robarts Library (Internet Archive)',
        creator: 'Edward Granville Browne'
      },
      license: { id: 'public-domain' },
      bytes: 48843454
    },
    {
      id: 'shuster-1912',
      mediaKind: 'document',
      title: 'The strangling of Persia; story of the European diplomacy and oriental intrigue that resulted in the denationalization of twelve million Mohammedans, a personal narrative',
      date: { d: '1912' },
      url: 'https://archive.org/download/stranglingofper00shusuoft/stranglingofper00shusuoft.pdf',
      page: 'https://archive.org/details/stranglingofper00shusuoft',
      credit: {
        institution: 'University of Toronto, Robarts Library (Internet Archive)',
        creator: 'William Morgan Shuster'
      },
      license: { id: 'public-domain' },
      bytes: 27235838
    }
  ],
  furtherReading: [
    { source: 'malekzadeh-1949-tarikh-e-enqelab-e-mashrutiyat', perspective: 'iranian' },
    { source: 'nazem-al-eslam-1983-tarikh-e-bidari-ye-iranian', perspective: 'iranian' },
    { source: 'adamiyat-1976-ideolozhi-ye-nehzat-e-mashrutiyat', perspective: 'iranian' },
    { source: 'ettehadieh-1982-peydayesh-va-tahavvol-e-ahzab', perspective: 'iranian' },
    { source: 'ivanov-1957-iranskaia-revoliutsiia-1905-1911', perspective: 'russian-soviet' }
  ]
})
