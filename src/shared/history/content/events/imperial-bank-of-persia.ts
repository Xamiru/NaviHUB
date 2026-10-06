import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'imperial-bank-of-persia',
  names: [
    { text: 'Imperial Bank of Persia', lang: 'en', role: 'primary' },
    {
      text: 'Bank-e šāhī',
      lang: 'fa',
      role: 'alternative',
      cites: [
        {
          source: 'iranica-ettehadiyeh-concessions-qajar',
          loc: { section: 'CONCESSIONS ii. In the Qajar period', para: '6' }
        }
      ]
    },
    { text: 'بانک شاهی', lang: 'fa', role: 'native' }
  ],
  researched: '2026-10-06',
  type: 'founding',
  start: {
    alts: [
      {
        value: { d: '1889-01-30' },
        cites: [
          {
            source: 'iranica-shahnavaz-karun-river-opening',
            loc: { section: 'KARUN RIVER iii. The Opening of the Karun', para: '36' }
          }
        ]
      },
      {
        value: { d: '1888' },
        cites: [
          {
            source: 'loc-iran-country-study-1987',
            loc: { section: 'THE QAJARS, 1795-1925', para: '5' }
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
        {
          source: 'iranica-yarshater-iranian-history-islamic-period-5',
          loc: { section: 'IRAN ii. IRANIAN HISTORY (2) Islamic period, Qajar period' }
        }
      ]
    }
  ],
  partOf: [
    { ref: 'period:qajar-dynasty' },
    { ref: 'period:reign-of-naser-al-din-shah-qajar' }
  ],
  related: [
    { ref: 'event:opening-of-the-karun-river', rel: 'related' },
    { ref: 'event:reuter-concession', rel: 'preceded-by' }
  ],
  participants: [
    {
      ref: 'person:naser-al-din-shah-qajar',
      role: 'head-of-state',
      cites: [
        {
          source: 'iranica-shahnavaz-karun-river-opening',
          loc: { section: 'KARUN RIVER iii. The Opening of the Karun', para: '36' }
        }
      ]
    },
    {
      ref: 'person:amin-al-soltan',
      role: 'negotiator',
      cites: [
        {
          source: 'iranica-amanat-great-britain-ii',
          loc: {
            section: 'GREAT BRITAIN ii. British influence in Persia in the 19th century',
            para: '33'
          }
        }
      ]
    },
    {
      ref: 'person:julius-de-reuter',
      role: 'participant',
      cites: [
        {
          source: 'iranica-basseer-banking-history',
          loc: { section: 'BANKING i. History of Banking in Iran', para: '5' }
        }
      ]
    },
    {
      name: 'Sir Henry Drummond Wolff',
      role: 'diplomat',
      cites: [
        {
          source: 'iranica-amanat-great-britain-ii',
          loc: {
            section: 'GREAT BRITAIN ii. British influence in Persia in the 19th century',
            para: '33'
          }
        }
      ]
    },
    {
      name: 'Joseph Rabino',
      role: 'participant',
      cites: [
        {
          source: 'iranica-amanat-great-britain-ii',
          loc: {
            section: 'GREAT BRITAIN ii. British influence in Persia in the 19th century',
            para: '33'
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
          text: 'The establishment of the Imperial Bank of Persia in January 1889, however, has to be seen as Britain’s crowning achievement and its most effective economic tool in penetrating the Persian markets.',
          lang: 'en',
          cite: {
            source: 'iranica-amanat-great-britain-ii',
            loc: {
              section: 'GREAT BRITAIN ii. British influence in Persia in the 19th century',
              para: '33'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/great-britain-ii/'
          }
        },
        {
          id: 'q2',
          text: '1889 Establishment of the Imperial Bank of Persia; it becomes a focal point of British interests with the right to issue currency and exploit the mineral deposits (excluding gold or silver) of Persia.',
          lang: 'en',
          cite: {
            source: 'iranica-yarshater-chronology-part-2',
            loc: { section: 'Chronology of Iranian History Part 2' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/chronology-of-iranian-history-part-2/'
          }
        },
        {
          id: 'q3',
          text: 'In 1888 the shah, heeding this advice, opened the Karun River in Khuzestan to foreign shipping and gave Reuter permission to open the country\'s first bank.',
          lang: 'en',
          cite: {
            source: 'loc-iran-country-study-1987',
            loc: { section: 'THE QAJARS, 1795-1925', para: '5' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/iran/12.htm' }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q4',
          text: 'The first modern bank to start operations in Iran was the British-owned New Oriental Bank which in 1888 opened branches and established agencies in Tehran, Mašhad, Tabrīz, Rašt, Isfahan, Shiraz, and Būšehr (Curzon, I, p. 474).',
          lang: 'en',
          cite: {
            source: 'iranica-basseer-banking-history',
            loc: { section: 'BANKING i. History of Banking in Iran', para: '2' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/banking-in-iran/banking-i-history-of-banking-in-iran'
          }
        },
        {
          id: 'q5',
          text: 'Among the merchant-bankers of his time, Amīn-al-Żarb was a leading businessman who operated a trading company throughout the key cities in Iran and abroad. He attempted to establish a modern bank in Iran, but as in many other instances, this indigenous effort was frustrated by the ruling Qajar shahs',
          lang: 'en',
          cite: {
            source: 'iranica-basseer-banking-history',
            loc: { section: 'BANKING i. History of Banking in Iran', para: '3' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/banking-in-iran/banking-i-history-of-banking-in-iran'
          }
        },
        {
          id: 'q6',
          text: 'By supporting the renewed claims of George Reuter, Julius Reuter’s son, Wolff hoped to salvage new concessions out of the overgenerous terms of an annulled concession.',
          lang: 'en',
          cite: {
            source: 'iranica-amanat-great-britain-ii',
            loc: {
              section: 'GREAT BRITAIN ii. British influence in Persia in the 19th century',
              para: '31'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/great-britain-ii/'
          }
        }
      ]
    },
    {
      kind: 'course',
      quotes: [
        {
          id: 'q7',
          text: 'The principal points of Reuter’s new concession were: (1) the grant of an Imperial Bank Concession for 60 years which would (2) have the exclusive right to issue banknotes [Art. 3], (3) provide the service of the treasury, (4) have a monopoly of all mines, except gold and silver, not already conceded and worked (ibid.).',
          lang: 'en',
          cite: {
            source: 'iranica-shahnavaz-karun-river-opening',
            loc: { section: 'KARUN RIVER iii. The Opening of the Karun', para: '36' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/karun-river/karun_3'
          }
        },
        {
          id: 'q8',
          text: 'Article 1 of the all-embracing Reuter concession (see Kazemzadeh, pp. 100-47) called for the establishment of a state bank.',
          lang: 'en',
          cite: {
            source: 'iranica-basseer-banking-history',
            loc: { section: 'BANKING i. History of Banking in Iran', para: '7' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/banking-in-iran/banking-i-history-of-banking-in-iran'
          }
        },
        {
          id: 'q9',
          text: 'The bank was legally formed in London, under a British royal charter of incorporation.',
          lang: 'en',
          cite: {
            source: 'iranica-basseer-banking-history',
            loc: { section: 'BANKING i. History of Banking in Iran', para: '8' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/banking-in-iran/banking-i-history-of-banking-in-iran'
          }
        },
        {
          id: 'q10',
          text: 'In order to balance this concession, Yakov Polyakov was granted the right to establish a loan company (Banque des Prêts, Bānk-e esteqrāżī) in Persia in 1307/1890; this enterprise was purchased by the Russian government in 1311/1894 and became a formidable rival to the Imperial Bank',
          lang: 'en',
          cite: {
            source: 'iranica-ettehadiyeh-concessions-qajar',
            loc: { section: 'CONCESSIONS ii. In the Qajar period', para: '6' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/concessions/concessions-ii-in-the-qajar-period'
          }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q11',
          text: 'By the end of the Qajar era the Imperial Bank, which operated with little competition from its Russian counterpart, held a near total sway over Persian finances, both public and private.',
          lang: 'en',
          cite: {
            source: 'iranica-amanat-great-britain-ii',
            loc: {
              section: 'GREAT BRITAIN ii. British influence in Persia in the 19th century',
              para: '33'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/great-britain-ii/'
          }
        },
        {
          id: 'q12',
          text: 'Under Joseph Rabino, its energetic director and Reuter’s representative in Tehran, the Bank grew from eight branches in Persia in 1890 to seventeen in 1920.',
          lang: 'en',
          cite: {
            source: 'iranica-amanat-great-britain-ii',
            loc: {
              section: 'GREAT BRITAIN ii. British influence in Persia in the 19th century',
              para: '33'
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
            value: { d: '1888' },
            cites: [
              {
                source: 'iranica-basseer-banking-history',
                loc: { section: 'BANKING i. History of Banking in Iran', para: '4' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q13',
        text: 'However, the first bank actually to open branches in Iran was the New Oriental Bank Corporation in 1888.',
        lang: 'en',
        cite: {
          source: 'iranica-basseer-banking-history',
          loc: { section: 'BANKING i. History of Banking in Iran', para: '4' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://www.iranicaonline.org/articles/banking-in-iran/banking-i-history-of-banking-in-iran'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1889-01-30' },
            cites: [
              {
                source: 'iranica-shahnavaz-karun-river-opening',
                loc: { section: 'KARUN RIVER iii. The Opening of the Karun', para: '36' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q14',
        text: 'On 30 January 1889, after much maneuvering and negotiations, just a few days before Dolgorouki’s return to Tehran, the bank concession was finally signed by the shah',
        lang: 'en',
        cite: {
          source: 'iranica-shahnavaz-karun-river-opening',
          loc: { section: 'KARUN RIVER iii. The Opening of the Karun', para: '36' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://www.iranicaonline.org/articles/karun-river/karun_3'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1889-09' },
            cites: [
              {
                source: 'iranica-calmard-atabak-e-azam',
                loc: { section: 'ATĀBAK-E AʿẒAM, AMĪN-AL-SOLṬĀN', para: '5' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q15',
        text: 'the launching, in September, 1889, of the British-owned Imperial Bank of Persia (which took over in 1890 the New Oriental Banking Corporation opened up in 1888); this last concern was part of a concession which granted Reuter exclusive banking and mining rights for sixty years',
        lang: 'en',
        cite: {
          source: 'iranica-calmard-atabak-e-azam',
          loc: { section: 'ATĀBAK-E AʿẒAM, AMĪN-AL-SOLṬĀN', para: '5' }
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
            value: { d: '1889' },
            cites: [
              {
                source: 'iranica-basseer-banking-history',
                loc: { section: 'BANKING i. History of Banking in Iran', para: '5' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q16',
        text: 'However, in 1889, as a result of the grant of an exclusive bank concession by Nāṣer-al-Dīn Shah to Julius de Reuter (q.v.), the New Oriental Bank closed its operations and sold its assets for 20,000 pounds sterling to the resulting Imperial Bank of Persia',
        lang: 'en',
        cite: {
          source: 'iranica-basseer-banking-history',
          loc: { section: 'BANKING i. History of Banking in Iran', para: '5' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://www.iranicaonline.org/articles/banking-in-iran/banking-i-history-of-banking-in-iran'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1890' },
            cites: [
              {
                source: 'iranica-basseer-banking-history',
                loc: { section: 'BANKING i. History of Banking in Iran', para: '9' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q17',
        text: 'Furthermore, in 1890 the Imperial Bank introduced the first bank notes in Persia.',
        lang: 'en',
        cite: {
          source: 'iranica-basseer-banking-history',
          loc: { section: 'BANKING i. History of Banking in Iran', para: '9' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://www.iranicaonline.org/articles/banking-in-iran/banking-i-history-of-banking-in-iran'
        }
      }
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/1/1f/IRA-1b-Imperial_Bank_of_Persia-One_Toman_%281906%29.jpg/1280px-IRA-1b-Imperial_Bank_of_Persia-One_Toman_%281906%29.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:IRA-1b-Imperial_Bank_of_Persia-One_Toman_(1906).jpg',
    credit: { creator: 'Bradbury Wilkinson and Company' },
    license: { id: 'public-domain' }
  }
})
