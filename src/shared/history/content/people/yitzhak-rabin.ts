import { definePerson } from '../../schema'

export default definePerson({
  id: 'yitzhak-rabin',
  names: [
    { text: 'Yitzhak Rabin', lang: 'en', role: 'primary' },
    { text: 'יצחק רבין', lang: 'he', role: 'native' },
    { text: 'إسحاق رابين', lang: 'ar', role: 'native' }
  ],
  researched: '2026-10-10',
  born: {
    alts: [
      {
        value: { d: '1922-03-01' },
        cites: [
          {
            source: 'rabin-center-years-1922',
            loc: { section: '1922 – Childhood and Family', para: '1' }
          },
          {
            source: 'lc-names-rabin-yitzhak-n80038008',
            loc: { section: 'Rabin, Yitzhak, 1922-1995' }
          }
        ]
      }
    ]
  },
  died: {
    alts: [
      {
        value: { d: '1995-11-04' },
        cites: [
          {
            source: 'rabin-center-years-1995',
            loc: {
              section: '1995 – Assassination of the Prime Minister of Israel, Yitzhak Rabin',
              para: '5'
            }
          },
          {
            source: 'rabin-center-years-1995',
            loc: {
              section: '1995 – Assassination of the Prime Minister of Israel, Yitzhak Rabin',
              para: '7'
            }
          },
          {
            source: 'lc-names-rabin-yitzhak-n80038008',
            loc: { section: 'Rabin, Yitzhak, 1922-1995' }
          }
        ]
      }
    ]
  },
  bornIn: {
    ref: 'place:jerusalem',
    cites: [
      {
        source: 'rabin-center-years-1922',
        loc: { section: '1922 – Childhood and Family', para: '1' }
      }
    ]
  },
  diedIn: {
    ref: 'place:tel-aviv',
    cites: [
      {
        source: 'rabin-center-years-1995',
        loc: {
          section: '1995 – Assassination of the Prime Minister of Israel, Yitzhak Rabin',
          para: '5'
        }
      }
    ]
  },
  regions: ['mena'],
  roles: ['politician', 'military'],
  offices: [
    {
      title: 'Chief of Staff of the Israel Defense Forces',
      polity: 'polity:state-of-israel',
      cites: [
        {
          source: 'rabin-center-years-1964',
          loc: { section: '1964 – Chief of Staff of the Israel Defense Forces', para: '1' }
        },
        {
          source: 'rabin-center-years-1967',
          loc: { section: '1967 – Chief of Staff, The Six-Day War', para: '1' }
        }
      ]
    },
    {
      title: 'Prime Minister of Israel',
      polity: 'polity:state-of-israel',
      start: {
        alts: [
          {
            value: { d: '1974-06-03' },
            cites: [
              {
                source: 'rabin-center-years-1974',
                loc: { section: '1974 – Prime Minister of Israel, first term', para: '2' }
              }
            ]
          }
        ]
      },
      cites: [
        {
          source: 'rabin-center-years-1974',
          loc: { section: '1974 – Prime Minister of Israel, first term', para: '2' }
        }
      ]
    },
    {
      title: 'Prime Minister of Israel',
      polity: 'polity:state-of-israel',
      start: {
        alts: [
          {
            value: { d: '1992' },
            cites: [
              {
                source: 'rabin-center-years-1992',
                loc: { section: '1992 – Rabin, Prime Minister of Israel, Second Term', para: '6' }
              }
            ]
          }
        ]
      },
      end: {
        alts: [
          {
            value: { d: '1995-11-04' },
            cites: [
              {
                source: 'rabin-center-years-1995',
                loc: {
                  section: '1995 – Assassination of the Prime Minister of Israel, Yitzhak Rabin',
                  para: '7'
                }
              }
            ]
          }
        ]
      },
      cites: [
        {
          source: 'rabin-center-years-1992',
          loc: { section: '1992 – Rabin, Prime Minister of Israel, Second Term', para: '6' }
        },
        {
          source: 'rabin-center-years-1995',
          loc: {
            section: '1995 – Assassination of the Prime Minister of Israel, Yitzhak Rabin',
            para: '4'
          }
        }
      ]
    }
  ],
  portrait: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/f/f2/Yitzhak_Rabin_1994_Portrait_%283x4_cropped%29.jpg/1280px-Yitzhak_Rabin_1994_Portrait_%283x4_cropped%29.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Yitzhak_Rabin_1994_Portrait_(3x4_cropped).jpg',
    credit: { institution: 'Government Press Office (Israel)', creator: 'Yaakov Saar' },
    license: { id: 'cc-by-sa', version: '3.0', url: 'https://creativecommons.org/licenses/by-sa/3.0' }
  },
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'Yitzhak Rabin was born on March 1, 1922, in Jerusalem.',
          lang: 'en',
          cite: {
            source: 'rabin-center-years-1922',
            loc: { section: '1922 – Childhood and Family', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'https://www.rabincenter.org.il/en/years/1922/'
          }
        },
        {
          id: 'q2',
          text: 'The Prime Minister of Israel, Yitzhak Rabin, was assassinated.',
          lang: 'en',
          cite: {
            source: 'rabin-center-years-1995',
            loc: {
              section: '1995 – Assassination of the Prime Minister of Israel, Yitzhak Rabin',
              para: '4'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'https://www.rabincenter.org.il/en/years/1995/'
          }
        }
      ]
    },
    {
      kind: 'early-life',
      quotes: [
        {
          id: 'q3',
          text: 'In 1923, the family moved to Tel Aviv, where Rabin spent his childhood.',
          lang: 'en',
          cite: {
            source: 'rabin-center-years-1922',
            loc: { section: '1922 – Childhood and Family', para: '2' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'https://www.rabincenter.org.il/en/years/1922/'
          }
        },
        {
          id: 'q4',
          text: 'Then, in 1937 he reached his coveted target, Kadoorie Agricultural High School at Kfar Tabor, where many of the best youth from the working settlement got their education. At Kadoorie, Rabin became acquainted with Yigal Allon, who recruited him to the Haganah, and the ties of friendship were formed between them.',
          lang: 'en',
          cite: {
            source: 'rabin-center-years-1922',
            loc: { section: '1922 – Childhood and Family', para: '8' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'https://www.rabincenter.org.il/en/years/1922/'
          }
        },
        {
          id: 'q5',
          text: 'In May 1941, he was called to participate in a military operation in Lebanon intended to help the British army.',
          lang: 'en',
          cite: {
            source: 'rabin-center-years-1922',
            loc: { section: '1922 – Childhood and Family', para: '9' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'https://www.rabincenter.org.il/en/years/1922/'
          }
        }
      ]
    },
    {
      kind: 'career',
      quotes: [
        {
          id: 'q6',
          text: 'As the Palmach Operations Officer and Liaison appointed to coordinate with the general staff, Rabin dealt primarily with reinforcing the Palmach troops with weaponry and human resources, as well as securing the route to Jerusalem, which was subject to incessant attacks from the Arab villages along the way.',
          lang: 'en',
          cite: {
            source: 'rabin-center-years-1948',
            loc: { section: '1948 – Independence', para: '3' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'https://www.rabincenter.org.il/en/years/1948/'
          }
        },
        {
          id: 'q7',
          text: 'Rabin’s tenure as IDF Chief of Staff was marked by the rapid military growth of Arab states and their growing arsenal of Soviet weapons.',
          lang: 'en',
          cite: {
            source: 'rabin-center-years-1964',
            loc: { section: '1964 – Chief of Staff of the Israel Defense Forces', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'https://www.rabincenter.org.il/en/years/1964/'
          }
        },
        {
          id: 'q8',
          text: 'In 1967, in the fourth year of Rabin’s term as Chief of Staff, the Six-Day War broke out.',
          lang: 'en',
          cite: {
            source: 'rabin-center-years-1967',
            loc: { section: '1967 – Chief of Staff, The Six-Day War', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'https://www.rabincenter.org.il/en/years/1967/'
          }
        },
        {
          id: 'q9',
          text: 'Rabin assumed the position of Prime Minister on June 3, 1974.',
          lang: 'en',
          cite: {
            source: 'rabin-center-years-1974',
            loc: { section: '1974 – Prime Minister of Israel, first term', para: '2' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'https://www.rabincenter.org.il/en/years/1974/'
          }
        },
        {
          id: 'q10',
          text: 'In the Knesset elections held on May 17, the Labor Party lost its power, and for the first time the Likud led by Menachem Begin, put together a government. The Labor Party moved to the Opposition.',
          lang: 'en',
          cite: {
            source: 'rabin-center-years-1977',
            loc: { section: '1977 – In the Opposition', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'https://www.rabincenter.org.il/en/years/1977/'
          }
        },
        {
          id: 'q11',
          text: 'The turnover that returned the Labor Party to the government returned Rabin to the seat of the prime minister.',
          lang: 'en',
          cite: {
            source: 'rabin-center-years-1992',
            loc: { section: '1992 – Rabin, Prime Minister of Israel, Second Term', para: '6' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'https://www.rabincenter.org.il/en/years/1992/'
          }
        },
        {
          id: 'q12',
          text: 'When he was updated on confidential peace talks in Oslo, he approved their continuation despite his doubts and made them the official channel of communication.',
          lang: 'en',
          cite: {
            source: 'rabin-center-years-1992',
            loc: { section: '1992 – Rabin, Prime Minister of Israel, Second Term', para: '9' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'https://www.rabincenter.org.il/en/years/1992/'
          }
        },
        {
          id: 'q13',
          text: 'On September 13, 1993, in a festive event on the lawn of the White House, in the presence of the President of the United States, Bill Clinton, the Oslo Accords were signed.',
          lang: 'en',
          cite: {
            source: 'rabin-center-years-1992',
            loc: { section: '1992 – Rabin, Prime Minister of Israel, Second Term', para: '10' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'https://www.rabincenter.org.il/en/years/1992/'
          }
        }
      ]
    },
    {
      kind: 'death',
      quotes: [
        {
          id: 'q14',
          text: 'At the conclusion of the warm and supportive rally where masses demonstrated their faith in him and their love for him, Yitzhak Rabin was shot on his way to his car and fatally injured by a Jewish assassin.',
          lang: 'en',
          cite: {
            source: 'rabin-center-years-1995',
            loc: {
              section: '1995 – Assassination of the Prime Minister of Israel, Yitzhak Rabin',
              para: '6'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'https://www.rabincenter.org.il/en/years/1995/'
          }
        },
        {
          id: 'q15',
          text: 'Yitzhak Rabin died at Ichilov Hospital at 11:14 P.M.',
          lang: 'en',
          cite: {
            source: 'rabin-center-years-1995',
            loc: {
              section: '1995 – Assassination of the Prime Minister of Israel, Yitzhak Rabin',
              para: '7'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'https://www.rabincenter.org.il/en/years/1995/'
          }
        }
      ]
    },
    {
      kind: 'in-their-words',
      quotes: [
        {
          id: 'q16',
          text: 'We have come to try and put an end to the hostilities so that our children, our children\'s children, will no longer experience the painful cost of war, violence and terror.',
          lang: 'en',
          cite: {
            source: 'clinton-1993-09-13-remarks-at-the-signing-of-the-israel-palestinian-agreement',
            loc: { section: 'Remarks at the signing of the Israel-Palestinian agreement' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'https://clintonwhitehouse6.archives.gov/1993/09/1993-09-13-remarks-by-the-president-and-others-at-israel-palestinian-sig.html'
          }
        },
        {
          id: 'q17',
          text: '"We should not let the land flowing with milk and honey become a land flowing with blood and tears. Don\'t let it happen."',
          lang: 'en',
          cite: {
            source: 'clinton-1995-11-04-remarks-on-the-death-of-yitzhak-rabin',
            loc: {
              section: 'Remarks by the President on the Death of the Prime Minister of Israel, Yitzhak Rabin',
              para: '5'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'https://clintonwhitehouse6.archives.gov/1995/11/1995-11-04-presidents-remarks-on-death-of-pm-rabin.html'
          }
        }
      ]
    }
  ]
})
