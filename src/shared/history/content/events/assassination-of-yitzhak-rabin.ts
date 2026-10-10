import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'assassination-of-yitzhak-rabin',
  names: [
    { text: 'Assassination of Yitzhak Rabin', lang: 'en', role: 'primary' },
    { text: 'רצח יצחק רבין', lang: 'he', role: 'native' },
    { text: 'اغتيال إسحاق رابين', lang: 'ar', role: 'native' }
  ],
  researched: '2026-10-10',
  type: 'assassination',
  start: {
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
            source: 'clinton-1995-11-04-remarks-on-the-death-of-yitzhak-rabin',
            loc: {
              section: 'Remarks by the President on the Death of the Prime Minister of Israel, Yitzhak Rabin',
              para: '1'
            }
          }
        ]
      }
    ]
  },
  regions: ['mena'],
  prominence: 1,
  places: [
    {
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
    {
      ref: 'place:jerusalem',
      cites: [
        {
          source: 'rabin-center-years-1995',
          loc: {
            section: '1995 – Assassination of the Prime Minister of Israel, Yitzhak Rabin',
            para: '9'
          }
        }
      ]
    }
  ],
  polities: [
    {
      ref: 'polity:state-of-israel',
      cites: [
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
  participants: [
    {
      ref: 'person:yitzhak-rabin',
      role: 'victim',
      cites: [
        {
          source: 'rabin-center-years-1995',
          loc: {
            section: '1995 – Assassination of the Prime Minister of Israel, Yitzhak Rabin',
            para: '4'
          }
        }
      ]
    },
    {
      name: 'Yigal Amir',
      role: 'perpetrator',
      cites: [
        {
          source: 'state-dept-milestones-oslo-accords-and-the-arab-israeli-peace-process',
          loc: { section: 'The Oslo Accords and the Arab-Israeli Peace Process', para: '8' }
        }
      ]
    },
    {
      ref: 'person:bill-clinton',
      role: 'head-of-state',
      cites: [
        {
          source: 'clinton-1995-11-04-remarks-on-the-death-of-yitzhak-rabin',
          loc: {
            section: 'Remarks by the President on the Death of the Prime Minister of Israel, Yitzhak Rabin',
            para: '1'
          }
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
            value: { min: 1 },
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
      }
    }
  ],
  related: [
    {
      ref: 'event:oslo-accords',
      rel: 'preceded-by',
      cites: [
        {
          source: 'state-dept-milestones-oslo-accords-and-the-arab-israeli-peace-process',
          loc: { section: 'The Oslo Accords and the Arab-Israeli Peace Process', para: '8' }
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
        },
        {
          id: 'q2',
          text: 'On Saturday night, November 4, 1995, on the Hebrew date of 12 Heshvan 5756, Yitzhak Rabin arrived at Kikar Malchei Yisrael in Tel Aviv to take part in a mass rally under the slogan, “Yes to Peace – No to Violence.”',
          lang: 'en',
          cite: {
            source: 'rabin-center-years-1995',
            loc: {
              section: '1995 – Assassination of the Prime Minister of Israel, Yitzhak Rabin',
              para: '5'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'https://www.rabincenter.org.il/en/years/1995/'
          }
        },
        {
          id: 'q3',
          text: 'In November 1995, Rabin was assassinated by Yigal Amir, an Israeli who opposed the Oslo Accords on religious grounds.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-oslo-accords-and-the-arab-israeli-peace-process',
            loc: { section: 'The Oslo Accords and the Arab-Israeli Peace Process', para: '8' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'https://history.state.gov/milestones/1993-2000/oslo'
          }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q4',
          text: 'The peace process supporters’ camp that accompanied the progress in the talks with hope was shocked by the magnitude of public objection and decided to provide a stage for the wide public support for the steps the government was taking.',
          lang: 'en',
          cite: {
            source: 'rabin-center-years-1995',
            loc: {
              section: '1995 – Assassination of the Prime Minister of Israel, Yitzhak Rabin',
              para: '2'
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
      kind: 'course',
      quotes: [
        {
          id: 'q5',
          text: 'A demonstration organized for November 4, 1995, drew masses of people to the city square, Kikar Malchei Yisrael, in Tel Aviv.',
          lang: 'en',
          cite: {
            source: 'rabin-center-years-1995',
            loc: {
              section: '1995 – Assassination of the Prime Minister of Israel, Yitzhak Rabin',
              para: '3'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'https://www.rabincenter.org.il/en/years/1995/'
          }
        },
        {
          id: 'q6',
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
          id: 'q7',
          text: 'At the end of the rally, while returning to his car, a Jewish assassin shot three bullets in his back.',
          lang: 'en',
          cite: {
            source: 'rabin-center-years-1995',
            loc: {
              section: '1995 – Assassination of the Prime Minister of Israel, Yitzhak Rabin',
              para: '3'
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
      kind: 'consequences',
      quotes: [
        {
          id: 'q8',
          text: 'Immediately following the assassination, many Israeli citizens flowed to Kikar Malchei Yisrael.',
          lang: 'en',
          cite: {
            source: 'rabin-center-years-1995',
            loc: {
              section: '1995 – Assassination of the Prime Minister of Israel, Yitzhak Rabin',
              para: '8'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'https://www.rabincenter.org.il/en/years/1995/'
          }
        },
        {
          id: 'q9',
          text: 'In the week following the assassination, the citizens turned the square, the kikar, into Rabin Square.',
          lang: 'en',
          cite: {
            source: 'rabin-center-years-1995',
            loc: {
              section: '1995 – Assassination of the Prime Minister of Israel, Yitzhak Rabin',
              para: '8'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'https://www.rabincenter.org.il/en/years/1995/'
          }
        },
        {
          id: 'q10',
          text: 'Rabin’s murder was followed by a string of terrorist attacks by Hamas, which undermined support for the Labor Party in Israel’s May 1996 elections.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-oslo-accords-and-the-arab-israeli-peace-process',
            loc: { section: 'The Oslo Accords and the Arab-Israeli Peace Process', para: '8' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'https://history.state.gov/milestones/1993-2000/oslo'
          }
        }
      ]
    },
    {
      kind: 'casualties',
      quotes: [
        {
          id: 'q11',
          text: 'Yitzhak Rabin died at Ichilov Hospital at 11:14 P.M., after all efforts to save him by the doctors were unsuccessful.',
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
    }
  ],
  course: [
    {
      date: {
        alts: [
          {
            value: { d: '1995-11-05' },
            cites: [
              {
                source: 'rabin-center-years-1995',
                loc: {
                  section: '1995 – Assassination of the Prime Minister of Israel, Yitzhak Rabin',
                  para: '9'
                }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q12',
        text: 'Yitzhak Rabin’s casket was placed in front of the entrance to the Knesset on the day after the assassination.',
        lang: 'en',
        cite: {
          source: 'rabin-center-years-1995',
          loc: {
            section: '1995 – Assassination of the Prime Minister of Israel, Yitzhak Rabin',
            para: '9'
          }
        },
        provenance: { via: 'web', at: '2026-10-10', url: 'https://www.rabincenter.org.il/en/years/1995/' }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1995-11-06' },
            cites: [
              {
                source: 'rabin-center-years-1995',
                loc: {
                  section: '1995 – Assassination of the Prime Minister of Israel, Yitzhak Rabin',
                  para: '9'
                }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q13',
        text: 'From Sunday morning until the funeral held on Monday afternoon, tens of thousands of citizens ascended to Jerusalem to pay their respects, walking by the casket, and saying farewell.',
        lang: 'en',
        cite: {
          source: 'rabin-center-years-1995',
          loc: {
            section: '1995 – Assassination of the Prime Minister of Israel, Yitzhak Rabin',
            para: '9'
          }
        },
        provenance: { via: 'web', at: '2026-10-10', url: 'https://www.rabincenter.org.il/en/years/1995/' }
      }
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/d/d4/AvneyMoreshet-67cc8c38-The_Yitzhak_Rabin_Memorial_-_Tel_Aviv-Yafo.jpg/1280px-AvneyMoreshet-67cc8c38-The_Yitzhak_Rabin_Memorial_-_Tel_Aviv-Yafo.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:AvneyMoreshet-67cc8c38-The_Yitzhak_Rabin_Memorial_-_Tel_Aviv-Yafo.jpg',
    credit: { creator: 'Zeev Stein' },
    license: { id: 'cc-by-sa', version: '4.0', url: 'https://creativecommons.org/licenses/by-sa/4.0' }
  },
  archive: [
    {
      id: 'a1',
      mediaKind: 'video',
      title: 'Prime Minister Yitzhak Rabin\'s State Funeral Service',
      date: { d: '1995-11-06' },
      url: 'https://upload.wikimedia.org/wikipedia/commons/e/e3/Prime_Minister_Yitzhak_Rabin%27s_State_Funeral_Service.webm',
      page: 'https://commons.wikimedia.org/wiki/File:Prime_Minister_Yitzhak_Rabin%27s_State_Funeral_Service.webm',
      credit: { institution: 'William J. Clinton Presidential Library' },
      license: { id: 'public-domain' }
    }
  ]
})
