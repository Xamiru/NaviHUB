import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'iran-air-flight-655',
  names: [
    { text: 'Iran Air Flight 655', lang: 'en', role: 'primary' },
    { text: 'پرواز ۶۵۵ ایران‌ایر', lang: 'fa', role: 'native' },
    {
      text: 'Downing of the Iran Air Airbus',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'iranica-gieling-iraq-vii-iran-iraq-war',
          loc: { section: 'IRAQ vii. IRAN-IRAQ WAR', para: '43' }
        }
      ]
    },
    { text: 'سرنگونی ایرباس', lang: 'fa', role: 'alternative' }
  ],
  researched: '2026-10-09',
  type: 'disaster',
  start: {
    alts: [
      {
        value: { d: '1988-07-03' },
        cites: [
          {
            source: 'iranica-gieling-iraq-vii-iran-iraq-war',
            loc: { section: 'IRAQ vii. IRAN-IRAQ WAR', para: '43' }
          },
          {
            source: 'reagan-library-1988-07-03-statement-destruction-of-iranian-jetliner',
            loc: {
              section: 'Statement on the Destruction of an Iranian Jetliner by the United States Navy Over the Persian Gulf',
              para: '1'
            }
          }
        ]
      }
    ]
  },
  regions: ['iran', 'mena'],
  prominence: 2,
  places: [
    {
      ref: 'place:strait-of-hormuz',
      cites: [
        {
          source: 'iranica-gieling-iraq-vii-iran-iraq-war',
          loc: { section: 'IRAQ vii. IRAN-IRAQ WAR', para: '43' }
        }
      ]
    },
    {
      ref: 'place:bandar-abbas',
      cites: [
        {
          source: 'iranica-gieling-iraq-vii-iran-iraq-war',
          loc: { section: 'IRAQ vii. IRAN-IRAQ WAR', para: '43' }
        }
      ]
    },
    {
      ref: 'place:persian-gulf',
      cites: [
        {
          source: 'iranica-gieling-iraq-vii-iran-iraq-war',
          loc: { section: 'IRAQ vii. IRAN-IRAQ WAR', para: '43' }
        }
      ]
    }
  ],
  partOf: [
    {
      ref: 'event:iran-iraq-war',
      cites: [
        {
          source: 'iranica-gieling-iraq-vii-iran-iraq-war',
          loc: { section: 'IRAQ vii. IRAN-IRAQ WAR', para: '43' }
        }
      ]
    }
  ],
  polities: [
    {
      ref: 'polity:united-states',
      cites: [
        {
          source: 'iranica-gieling-iraq-vii-iran-iraq-war',
          loc: { section: 'IRAQ vii. IRAN-IRAQ WAR', para: '43' }
        }
      ]
    },
    {
      ref: 'polity:islamic-republic-of-iran',
      cites: [
        {
          source: 'iranica-gieling-iraq-vii-iran-iraq-war',
          loc: { section: 'IRAQ vii. IRAN-IRAQ WAR', para: '43' }
        }
      ]
    }
  ],
  sides: [
    {
      key: 'us',
      name: 'United States Navy',
      polity: 'polity:united-states',
      cites: [
        {
          source: 'iranica-gieling-iraq-vii-iran-iraq-war',
          loc: { section: 'IRAQ vii. IRAN-IRAQ WAR', para: '43' }
        }
      ]
    },
    {
      key: 'iran',
      name: 'Iran Air',
      polity: 'polity:islamic-republic-of-iran',
      cites: [
        {
          source: 'iranica-gieling-iraq-vii-iran-iraq-war',
          loc: { section: 'IRAQ vii. IRAN-IRAQ WAR', para: '43' }
        }
      ]
    }
  ],
  participants: [
    {
      ref: 'person:ronald-reagan',
      role: 'head-of-state',
      side: 'us',
      cites: [
        {
          source: 'reagan-library-1988-07-03-statement-destruction-of-iranian-jetliner',
          loc: {
            section: 'Statement on the Destruction of an Iranian Jetliner by the United States Navy Over the Persian Gulf',
            para: '2'
          }
        }
      ]
    },
    {
      name: 'Will C. Rogers III',
      role: 'commander',
      side: 'us',
      cites: [
        {
          source: 'iranica-gieling-iraq-vii-iran-iraq-war',
          loc: { section: 'IRAQ vii. IRAN-IRAQ WAR', para: '43' }
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
            value: { min: 290 },
            cites: [
              {
                source: 'iranica-gieling-iraq-vii-iran-iraq-war',
                loc: { section: 'IRAQ vii. IRAN-IRAQ WAR', para: '43' }
              }
            ],
            heldBy: [
              { kind: 'scholar', name: 'Saskia M. Gieling' },
              { kind: 'organization', name: 'Khamenei.ir' }
            ]
          }
        ]
      }
    }
  ],
  related: [
    {
      ref: 'event:iran-iraq-war',
      rel: 'related',
      cites: [
        {
          source: 'iranica-gieling-iraq-vii-iran-iraq-war',
          loc: { section: 'IRAQ vii. IRAN-IRAQ WAR', para: '45' }
        }
      ]
    },
    {
      ref: 'event:iran-contra-affair',
      rel: 'related',
      cites: [
        {
          source: 'iranica-gieling-iraq-vii-iran-iraq-war',
          loc: { section: 'IRAQ vii. IRAN-IRAQ WAR', para: '20' }
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
          text: 'An Iran Air commercial plane carrying 290 passengers and crew is shot down by US Navy warship USS Vincennes, which had allegedly mistaken the airliner for a hostile military jet.',
          lang: 'en',
          cite: {
            source: 'iranica-yarshater-chronology-part-4',
            loc: { section: 'Chronology of Iranian History Part 4, 1988' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.iranicaonline.org/articles/chronology-of-iranian-history-part-4/'
          }
        },
        {
          id: 'q2',
          text: 'The civilian airbus was on a regular flight from Bandar Abbas to Dubai, carrying 290 passengers.',
          lang: 'en',
          cite: {
            source: 'iranica-gieling-iraq-vii-iran-iraq-war',
            loc: { section: 'IRAQ vii. IRAN-IRAQ WAR', para: '43' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.iranicaonline.org/articles/iraq-vii-iran-iraq-war'
          }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q3',
          text: 'In the Persian Gulf the war continued with increased Iraqi attacks on Iranian targets and escalating confrontation between Iran and the United States.',
          lang: 'en',
          cite: {
            source: 'iranica-gieling-iraq-vii-iran-iraq-war',
            loc: { section: 'IRAQ vii. IRAN-IRAQ WAR', para: '43' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.iranicaonline.org/articles/iraq-vii-iran-iraq-war'
          }
        },
        {
          id: 'q4',
          text: 'Tensions increased as the United States Navy engaged in direct military action in the Persian Gulf. On 21 September, the U.S. Navy attacked an Iranian landing-vessel, killing three people. The U.S. Navy alleged that Iranians were laying mines and had mines aboard.',
          lang: 'en',
          cite: {
            source: 'iranica-gieling-iraq-vii-iran-iraq-war',
            loc: { section: 'IRAQ vii. IRAN-IRAQ WAR', para: '40' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.iranicaonline.org/articles/iraq-vii-iran-iraq-war'
          }
        },
        {
          id: 'q5',
          text: 'Fear of Iranian suicide bombers made the Americans very nervous.',
          lang: 'en',
          cite: {
            source: 'iranica-gieling-iraq-vii-iran-iraq-war',
            loc: { section: 'IRAQ vii. IRAN-IRAQ WAR', para: '43' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://www.iranicaonline.org/articles/iraq-vii-iran-iraq-war'
          }
        }
      ]
    },
    {
      kind: 'course',
      quotes: [
        {
          id: 'q6',
          text: 'After the Iraqi attack on the USS Stark, to which the U.S. had not reacted quickly enough, Americans did not want to take any chances. This was presumably the reason for the USS Vincennes’ downing of the Iran Air Airbus over the Strait of Hormuz on 3 July 1988 by a missile.',
          lang: 'en',
          cite: {
            source: 'iranica-gieling-iraq-vii-iran-iraq-war',
            loc: { section: 'IRAQ vii. IRAN-IRAQ WAR', para: '43' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://www.iranicaonline.org/articles/iraq-vii-iran-iraq-war'
          }
        }
      ]
    },
    {
      kind: 'aftermath',
      quotes: [
        {
          id: 'q7',
          text: 'Initially, there was harsh rhetoric on the Iranian side, but no retaliatory actions followed: instead Iran called upon the United Nations to condemn the United States for the incident',
          lang: 'en',
          cite: {
            source: 'iranica-gieling-iraq-vii-iran-iraq-war',
            loc: { section: 'IRAQ vii. IRAN-IRAQ WAR', para: '43' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.iranicaonline.org/articles/iraq-vii-iran-iraq-war'
          }
        },
        {
          id: 'q8',
          text: 'The U.S. later paid compensation, though still challenging Iran’s account of the incident and refusing to issue an apology',
          lang: 'en',
          cite: {
            source: 'iranica-gieling-iraq-vii-iran-iraq-war',
            loc: { section: 'IRAQ vii. IRAN-IRAQ WAR', para: '43' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.iranicaonline.org/articles/iraq-vii-iran-iraq-war'
          }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q9',
          text: 'The downing of the Iran Air Airbus was not the main reason for Iran’s acceptance of Resolution 598, but it certainly was a contributing factor.',
          lang: 'en',
          cite: {
            source: 'iranica-gieling-iraq-vii-iran-iraq-war',
            loc: { section: 'IRAQ vii. IRAN-IRAQ WAR', para: '45' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.iranicaonline.org/articles/iraq-vii-iran-iraq-war'
          }
        },
        {
          id: 'q10',
          text: 'Under the terms of the settlement, no money will be paid to the Government of Iran.',
          lang: 'en',
          cite: {
            source: 'clinton-white-house-1996-11-14-letter-national-emergency-iran',
            loc: {
              section: 'Letter to Congressional Leaders on the national emergency with respect to Iran',
              para: '22'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://clintonwhitehouse6.archives.gov/1996/11/1996-11-14-president-letter-on-national-emergency-wrt-iran.html'
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
            value: { d: '1988-07-03' },
            cites: [
              {
                source: 'reagan-library-1988-07-03-statement-destruction-of-iranian-jetliner',
                loc: {
                  section: 'Statement on the Destruction of an Iranian Jetliner by the United States Navy Over the Persian Gulf',
                  para: '2'
                }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q11',
        text: 'I am saddened to report that it appears that in a proper defensive action by the U.S.S. Vincennes this morning in the Persian Gulf an Iranian airliner was shot down over the Strait of Hormuz.',
        lang: 'en',
        cite: {
          source: 'reagan-library-1988-07-03-statement-destruction-of-iranian-jetliner',
          loc: {
            section: 'Statement on the Destruction of an Iranian Jetliner by the United States Navy Over the Persian Gulf',
            para: '2'
          }
        },
        provenance: {
          via: 'web',
          at: '2026-10-08',
          url: 'https://www.reaganlibrary.gov/archives/speech/statement-destruction-iranian-jetliner-united-states-navy-over-persian-gulf'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1988-08-19' },
            cites: [
              {
                source: 'reagan-library-1988-08-19-fitzwater-statement-iran-air-investigation',
                loc: {
                  section: 'Statement by Assistant to the President for Press Relations Fitzwater on the Investigation of the Accidental Attack on an Iranian Airliner',
                  para: '1'
                }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q12',
        text: 'The President has been briefed on the results of the investigation into the circumstances surrounding the downing of Iran Air flight 655 and concurs in the actions taken by Secretary [of Defense] Carlucci.',
        lang: 'en',
        cite: {
          source: 'reagan-library-1988-08-19-fitzwater-statement-iran-air-investigation',
          loc: {
            section: 'Statement by Assistant to the President for Press Relations Fitzwater on the Investigation of the Accidental Attack on an Iranian Airliner',
            para: '2'
          }
        },
        provenance: {
          via: 'web',
          at: '2026-10-08',
          url: 'https://www.reaganlibrary.gov/archives/speech/statement-assistant-president-press-relations-fitzwater-investigation-accidental'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1996-02-22' },
            cites: [
              {
                source: 'clinton-white-house-1996-11-14-letter-national-emergency-iran',
                loc: {
                  section: 'Letter to Congressional Leaders on the national emergency with respect to Iran',
                  para: '22'
                }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q13',
        text: 'Under the procedures established by the settlement reached February 22, 1996, on which I reported previously, the United States has begun to pay ex gratia amounts to the survivors of Iranian victims of the July 3, 1988, shootdown of Iran Air 655.',
        lang: 'en',
        cite: {
          source: 'clinton-white-house-1996-11-14-letter-national-emergency-iran',
          loc: {
            section: 'Letter to Congressional Leaders on the national emergency with respect to Iran',
            para: '22'
          }
        },
        provenance: {
          via: 'web',
          at: '2026-10-08',
          url: 'https://clintonwhitehouse6.archives.gov/1996/11/1996-11-14-president-letter-on-national-emergency-wrt-iran.html'
        }
      }
    }
  ],
  hero: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/0/0d/USS_Vincennes_%28CG-49%29_underway_at_sea%2C_in_1988.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:USS_Vincennes_(CG-49)_underway_at_sea,_in_1988.jpg',
    credit: { institution: 'U.S. Navy' },
    license: { id: 'public-domain' }
  }
})
