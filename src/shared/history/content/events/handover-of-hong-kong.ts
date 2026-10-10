import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'handover-of-hong-kong',
  names: [
    { text: 'Handover of Hong Kong', lang: 'en', role: 'primary' },
    { text: '香港回歸', lang: 'zh', role: 'native', translit: 'Xiānggǎng huíguī' },
    {
      text: 'Hong Kong\'s reversion to Chinese sovereignty',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'state-dept-archive-hong-kongs-reversion-to-chinese-sovereignty-1997',
          loc: { section: 'Hong Kong\'s Reversion to Chinese Sovereignty, 1997', para: '1' }
        }
      ]
    }
  ],
  researched: '2026-10-10',
  type: 'other',
  start: {
    alts: [
      {
        value: { d: '1997-07-01' },
        cites: [
          {
            source: 'state-dept-archive-hong-kongs-reversion-to-chinese-sovereignty-1997',
            loc: { section: 'Hong Kong\'s Reversion to Chinese Sovereignty, 1997', para: '2' }
          },
          {
            source: 'hrw-1998-world-report-hong-kong',
            loc: { section: 'Human Rights Watch World Report 1998: Hong Kong', para: '1' }
          }
        ]
      }
    ]
  },
  regions: ['east-asia'],
  prominence: 2,
  places: [
    {
      ref: 'place:hong-kong',
      cites: [
        {
          source: 'state-dept-archive-hong-kongs-reversion-to-chinese-sovereignty-1997',
          loc: { section: 'Hong Kong\'s Reversion to Chinese Sovereignty, 1997', para: '2' }
        }
      ]
    }
  ],
  polities: [
    { ref: 'polity:united-kingdom' },
    { ref: 'polity:peoples-republic-of-china' }
  ],
  sides: [
    {
      key: 'uk',
      name: 'United Kingdom',
      polity: 'polity:united-kingdom',
      cites: [
        {
          source: 'hrw-1998-world-report-hong-kong',
          loc: { section: 'Human Rights Watch World Report 1998: Hong Kong', para: '26' }
        }
      ]
    },
    {
      key: 'prc',
      name: 'People\'s Republic of China',
      polity: 'polity:peoples-republic-of-china',
      cites: [
        {
          source: 'hrw-1998-world-report-hong-kong',
          loc: { section: 'Human Rights Watch World Report 1998: Hong Kong', para: '3' }
        }
      ]
    }
  ],
  participants: [
    {
      name: 'Tung Chee-hwa',
      role: 'head-of-government',
      side: 'prc',
      cites: [
        {
          source: 'hrw-1998-world-report-hong-kong',
          loc: { section: 'Human Rights Watch World Report 1998: Hong Kong', para: '1' }
        }
      ]
    },
    {
      name: 'Andrew Li',
      role: 'leader',
      cites: [
        {
          source: 'hrw-1998-world-report-hong-kong',
          loc: { section: 'Human Rights Watch World Report 1998: Hong Kong', para: '11' }
        }
      ]
    },
    {
      name: 'Tony Blair',
      role: 'head-of-government',
      side: 'uk',
      cites: [
        {
          source: 'hrw-1998-world-report-hong-kong',
          loc: { section: 'Human Rights Watch World Report 1998: Hong Kong', para: '26' }
        }
      ]
    },
    {
      name: 'Madeleine Albright',
      role: 'diplomat',
      cites: [
        {
          source: 'hrw-1998-world-report-hong-kong',
          loc: { section: 'Human Rights Watch World Report 1998: Hong Kong', para: '26' }
        }
      ]
    }
  ],
  related: [
    {
      ref: 'event:first-opium-war',
      rel: 'preceded-by',
      cites: [
        {
          source: 'state-dept-1998-04-01-us-hong-kong-policy-act-report',
          loc: { section: 'United States-Hong Kong Policy Act Report', para: '1' }
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
          text: 'Hong Kong, which had been a dependent territory of the United Kingdom, reverted to Chinese sovereignty on July 1, 1997.',
          lang: 'en',
          cite: {
            source: 'state-dept-archive-hong-kongs-reversion-to-chinese-sovereignty-1997',
            loc: { section: 'Hong Kong\'s Reversion to Chinese Sovereignty, 1997', para: '2' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'https://web.archive.org/web/2021/https://1997-2001.state.gov/www/regions/eap/hong_kong_reversion_1997.html'
          }
        },
        {
          id: 'q2',
          text: 'The transfer of sovereignty over Hong Kong from Britain to China on July 1 and the installation of the new Special Administrative Region (S.A.R.) government were arguably the most important events in the territory\'s history, but the political changes produced no dramatic crackdowns, no arrests, and no bans on demonstrations by late October.',
          lang: 'en',
          cite: {
            source: 'hrw-1998-world-report-hong-kong',
            loc: { section: 'Human Rights Watch World Report 1998: Hong Kong', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'https://www.hrw.org/legacy/worldreport/Asia-05.htm'
          }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q3',
          text: 'After 156 years of British colonial rule, Hong Kong became a Special Administrative Region of the People\'s Republic of China on July 1, 1997.',
          lang: 'en',
          cite: {
            source: 'state-dept-1998-04-01-us-hong-kong-policy-act-report',
            loc: { section: 'United States-Hong Kong Policy Act Report', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'https://web.archive.org/web/2021/https://1997-2001.state.gov/regions/eap/980401_us-hk_pol_act_rpt.html'
          }
        },
        {
          id: 'q4',
          text: 'Hong Kong\'s status after its reversion to Chinese sovereignty is defined in two documents: the 1984 Sino- British Joint Declaration and the 1990 Basic Law promulgated by the People\'s Republic of China.',
          lang: 'en',
          cite: {
            source: 'state-dept-1998-04-01-us-hong-kong-policy-act-report',
            loc: { section: 'United States-Hong Kong Policy Act Report', para: '4' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'https://web.archive.org/web/2021/https://1997-2001.state.gov/regions/eap/980401_us-hk_pol_act_rpt.html'
          }
        },
        {
          id: 'q5',
          text: 'In December 1996, the Preparatory Committee, a body handpicked by China to handle transition matters, authorized the appointment of a provisional legislature that was to remain in place for one year.',
          lang: 'en',
          cite: {
            source: 'hrw-1998-world-report-hong-kong',
            loc: { section: 'Human Rights Watch World Report 1998: Hong Kong', para: '3' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'https://www.hrw.org/legacy/worldreport/Asia-05.htm'
          }
        }
      ]
    },
    {
      kind: 'course',
      quotes: [
        {
          id: 'q6',
          text: 'Most countries sent high-level officials to observe the ceremonies surrounding the July handover, but both U.S. Secretary of State Madeleine Albright and British Prime Minister Tony Blair refused to attend the swearing-in ceremony of the provisional legislature, in protest of the dissolution of the elected Legco.',
          lang: 'en',
          cite: {
            source: 'hrw-1998-world-report-hong-kong',
            loc: { section: 'Human Rights Watch World Report 1998: Hong Kong', para: '26' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'https://www.hrw.org/legacy/worldreport/Asia-05.htm'
          }
        },
        {
          id: 'q7',
          text: 'The appointed body replaced the elected Legislative Council (Legco) on July 1, but it in fact began meeting in China long before then.',
          lang: 'en',
          cite: {
            source: 'hrw-1998-world-report-hong-kong',
            loc: { section: 'Human Rights Watch World Report 1998: Hong Kong', para: '3' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'https://www.hrw.org/legacy/worldreport/Asia-05.htm'
          }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q8',
          text: 'Journalists pointed to many instances of self-censorship on the part of their editors, but the S.A.R. government itself did not censor the print or broadcast media.',
          lang: 'en',
          cite: {
            source: 'hrw-1998-world-report-hong-kong',
            loc: { section: 'Human Rights Watch World Report 1998: Hong Kong', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'https://www.hrw.org/legacy/worldreport/Asia-05.htm'
          }
        },
        {
          id: 'q9',
          text: 'But in mid-July, in the case of Ma Wai Kwan, the Hong Kong Court of Appeals made a landmark decision on the legality of the provisional legislature that seemed to give license to China\'s legislature to violate Hong Kong\'s Basic Law at will.',
          lang: 'en',
          cite: {
            source: 'hrw-1998-world-report-hong-kong',
            loc: { section: 'Human Rights Watch World Report 1998: Hong Kong', para: '12' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'https://www.hrw.org/legacy/worldreport/Asia-05.htm'
          }
        },
        {
          id: 'q10',
          text: 'Finally, under the terms of new voting laws presented to the public on August 15, two-thirds of the legislature\'s sixty seats are to be filled by "functional constituencies," many with a heavy business and corporate focus.',
          lang: 'en',
          cite: {
            source: 'hrw-1998-world-report-hong-kong',
            loc: { section: 'Human Rights Watch World Report 1998: Hong Kong', para: '13' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'https://www.hrw.org/legacy/worldreport/Asia-05.htm'
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
            value: { d: '1984-12-19' },
            cites: [
              {
                source: 'state-dept-1998-04-01-us-hong-kong-policy-act-report',
                loc: { section: 'United States-Hong Kong Policy Act Report', para: '4' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q11',
        text: 'The Joint Declaration was signed by the United Kingdom (U.K.) and the People\'s Republic of China on December 19, 1984.',
        lang: 'en',
        cite: {
          source: 'state-dept-1998-04-01-us-hong-kong-policy-act-report',
          loc: { section: 'United States-Hong Kong Policy Act Report', para: '4' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-10',
          url: 'https://web.archive.org/web/2021/https://1997-2001.state.gov/regions/eap/980401_us-hk_pol_act_rpt.html'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1990-04-04' },
            cites: [
              {
                source: 'state-dept-1998-04-01-us-hong-kong-policy-act-report',
                loc: { section: 'United States-Hong Kong Policy Act Report', para: '5' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q12',
        text: 'The Basic Law of the Hong Kong Special Administrative Region was adopted on April 4, 1990 by the Seventh National People\'s Congress of the PRC.',
        lang: 'en',
        cite: {
          source: 'state-dept-1998-04-01-us-hong-kong-policy-act-report',
          loc: { section: 'United States-Hong Kong Policy Act Report', para: '5' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-10',
          url: 'https://web.archive.org/web/2021/https://1997-2001.state.gov/regions/eap/980401_us-hk_pol_act_rpt.html'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1997-02' },
            cites: [
              {
                source: 'hrw-1998-world-report-hong-kong',
                loc: { section: 'Human Rights Watch World Report 1998: Hong Kong', para: '4' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q13',
        text: 'In early 1997, the Preparatory Committee submitted proposals to China\'s National People\'s Congress (NPC) to repeal or amend twenty-four Hong Kong laws, on the grounds that they had been passed after the 1984 Sino-British Joint Declaration had been signed and were therefore in violation of the Basic Law, the document that has become the S.A.R. constitution.',
        lang: 'en',
        cite: {
          source: 'hrw-1998-world-report-hong-kong',
          loc: { section: 'Human Rights Watch World Report 1998: Hong Kong', para: '4' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-10',
          url: 'https://www.hrw.org/legacy/worldreport/Asia-05.htm'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1997-06-04' },
            cites: [
              {
                source: 'hrw-1998-world-report-hong-kong',
                loc: { section: 'Human Rights Watch World Report 1998: Hong Kong', para: '9' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q14',
        text: 'In the final days of the elected legislature, the British administration pushed a heavily opposed Official Secrets Ordinance through the Legislative Council on June 4, 1997, a day when most members of the pro-democracy parties were absent commemorating the anniversary of the Tiananmen crackdown.',
        lang: 'en',
        cite: {
          source: 'hrw-1998-world-report-hong-kong',
          loc: { section: 'Human Rights Watch World Report 1998: Hong Kong', para: '9' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-10',
          url: 'https://www.hrw.org/legacy/worldreport/Asia-05.htm'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1997-07-16' },
            cites: [
              {
                source: 'hrw-1998-world-report-hong-kong',
                loc: { section: 'Human Rights Watch World Report 1998: Hong Kong', para: '10' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q15',
        text: 'On July 16, the provisional legislature suspended four labor laws passed by the elected legislature in the days leading up to the handover.',
        lang: 'en',
        cite: {
          source: 'hrw-1998-world-report-hong-kong',
          loc: { section: 'Human Rights Watch World Report 1998: Hong Kong', para: '10' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-10',
          url: 'https://www.hrw.org/legacy/worldreport/Asia-05.htm'
        }
      }
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/e/e2/Golden_Bauhinia_Square._Hong_Kong._%2816034131277%29.jpg/1280px-Golden_Bauhinia_Square._Hong_Kong._%2816034131277%29.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Golden_Bauhinia_Square._Hong_Kong._(16034131277).jpg',
    credit: { creator: 'Bernard Spragg' },
    license: { id: 'cc0' }
  }
})
