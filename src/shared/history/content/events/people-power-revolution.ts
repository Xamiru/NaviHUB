import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'people-power-revolution',
  names: [
    { text: 'People Power Revolution', lang: 'en', role: 'primary' },
    {
      text: 'EDSA Revolution',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'loc-philippines-country-study-1991',
          loc: { section: 'From Aquino\'s Assassination to People\'s Power', para: '7' }
        }
      ]
    },
    { text: 'Lakas ng Bayan', lang: 'tl', role: 'native' }
  ],
  researched: '2026-10-08',
  type: 'revolution',
  start: {
    alts: [
      {
        value: { d: '1986-02-22' },
        cites: [
          {
            source: 'official-gazette-ph-the-fall-of-the-dictatorship',
            loc: { section: 'The Fall of the Dictatorship', para: '175' }
          },
          {
            source: 'loc-philippines-country-study-1991',
            loc: { section: 'From Aquino\'s Assassination to People\'s Power', para: '26' }
          }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1986-02-25' },
        cites: [
          {
            source: 'official-gazette-ph-the-fall-of-the-dictatorship',
            loc: { section: 'The Fall of the Dictatorship', para: '175' }
          },
          {
            source: 'official-gazette-ph-the-fall-of-the-dictatorship',
            loc: { section: 'The Fall of the Dictatorship', para: '172' }
          },
          {
            source: 'loc-philippines-country-study-1991',
            loc: { section: 'From Aquino\'s Assassination to People\'s Power', para: '7' }
          }
        ]
      }
    ]
  },
  regions: ['southeast-asia'],
  prominence: 2,
  places: [
    {
      ref: 'place:manila',
      cites: [
        {
          source: 'official-gazette-ph-the-fall-of-the-dictatorship',
          loc: { section: 'The Fall of the Dictatorship', para: '175' }
        },
        {
          source: 'loc-philippines-country-study-1991',
          loc: { section: 'From Aquino\'s Assassination to People\'s Power', para: '26' }
        }
      ]
    }
  ],
  partOf: [
    { ref: 'period:cold-war' }
  ],
  sides: [
    {
      key: 'opposition',
      name: 'People Power movement',
      cites: [
        {
          source: 'loc-philippines-country-study-1991',
          loc: { section: 'From Aquino\'s Assassination to People\'s Power', para: '7' }
        }
      ]
    },
    {
      key: 'regime',
      name: 'Marcos regime',
      cites: [
        {
          source: 'loc-philippines-country-study-1991',
          loc: { section: 'From Aquino\'s Assassination to People\'s Power', para: '7' }
        }
      ]
    }
  ],
  participants: [
    {
      name: 'Corazon Aquino',
      role: 'leader',
      side: 'opposition',
      cites: [
        {
          source: 'loc-philippines-country-study-1991',
          loc: { section: 'From Aquino\'s Assassination to People\'s Power', para: '7' }
        }
      ]
    },
    {
      name: 'Ferdinand Marcos',
      role: 'head-of-state',
      side: 'regime',
      cites: [
        {
          source: 'loc-philippines-country-study-1991',
          loc: { section: 'From Aquino\'s Assassination to People\'s Power', para: '7' }
        }
      ]
    },
    {
      name: 'Juan Ponce Enrile',
      role: 'commander',
      side: 'opposition',
      cites: [
        {
          source: 'loc-philippines-country-study-1991',
          loc: { section: 'From Aquino\'s Assassination to People\'s Power', para: '26' }
        }
      ]
    },
    {
      name: 'Fidel Ramos',
      role: 'commander',
      side: 'opposition',
      cites: [
        {
          source: 'loc-philippines-country-study-1991',
          loc: { section: 'From Aquino\'s Assassination to People\'s Power', para: '26' }
        }
      ]
    },
    {
      name: 'Jaime Cardinal Sin',
      role: 'organizer',
      side: 'opposition',
      cites: [
        {
          source: 'loc-philippines-country-study-1991',
          loc: { section: 'From Aquino\'s Assassination to People\'s Power', para: '24' }
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
          text: 'From February 22 to 25, 1986, hundreds of thousands of people amassed at Epifanio de los Santos Avenue (EDSA), Metro Manila’s main thoroughfare, calling for the peaceful ouster of the dictator.',
          lang: 'en',
          cite: {
            source: 'official-gazette-ph-the-fall-of-the-dictatorship',
            loc: { section: 'The Fall of the Dictatorship', para: '175' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://web.archive.org/web/20230115154933/https://www.officialgazette.gov.ph/featured/the-fall-of-the-dictatorship/'
          }
        },
        {
          id: 'q2',
          text: 'The People\'s Power movement, which bore fruit in the ouster of Marcos on February 25, 1986, was broad-based but primarily, although not exclusively, urban-based, indeed the movement was commonly known in Manila as the EDSA Revolution.',
          lang: 'en',
          cite: {
            source: 'loc-philippines-country-study-1991',
            loc: { section: 'From Aquino\'s Assassination to People\'s Power', para: '7' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/philippines/29.htm' }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q3',
          text: 'Aquino landed in the Manila International Airport via China Airlines Flight 811 at 1:05 p.m. on August 21, and was escorted by armed men out of the plane. Minutes later, gunshots were heard. The former senator was shot dead by an assassin’s bullet to the head. When the news of Ninoy’s death spread, approximately seven million came to his funeral procession on August 31, the biggest and longest in Philippine history.',
          lang: 'en',
          cite: {
            source: 'official-gazette-ph-the-fall-of-the-dictatorship',
            loc: { section: 'The Fall of the Dictatorship', para: '91' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://web.archive.org/web/20230115154933/https://www.officialgazette.gov.ph/featured/the-fall-of-the-dictatorship/'
          }
        },
        {
          id: 'q4',
          text: 'Indicative of the importance of United States support for his regime, Marcos announced his decision to hold a "snap" presidential election on an American television talk show, "This Week with David Brinkley," in November 1985.',
          lang: 'en',
          cite: {
            source: 'loc-philippines-country-study-1991',
            loc: { section: 'From Aquino\'s Assassination to People\'s Power', para: '23' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/philippines/29.htm' }
        }
      ]
    },
    {
      kind: 'causes',
      quotes: [
        {
          id: 'q5',
          text: 'The results tabulated by the government\'s Commission on Elections (COMELEC) showed Marcos leading, whereas NAMFREL figures showed a majority for the Aquino-Laurel ticket.',
          lang: 'en',
          cite: {
            source: 'loc-philippines-country-study-1991',
            loc: { section: 'From Aquino\'s Assassination to People\'s Power', para: '25' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/philippines/29.htm' }
        },
        {
          id: 'q6',
          text: 'Massive poll fraud and rampant cheating marred the vote on the day of the elections, February 7, 1986.',
          lang: 'en',
          cite: {
            source: 'official-gazette-ph-the-fall-of-the-dictatorship',
            loc: { section: 'The Fall of the Dictatorship', para: '104' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://web.archive.org/web/20230115154933/https://www.officialgazette.gov.ph/featured/the-fall-of-the-dictatorship/'
          }
        }
      ]
    },
    {
      kind: 'course',
      quotes: [
        {
          id: 'q7',
          text: 'On February 22, Enrile and General Fidel Ramos, commander of the Philippine Constabulary, issued a joint statement demanding Marcos\'s resignation.',
          lang: 'en',
          cite: {
            source: 'loc-philippines-country-study-1991',
            loc: { section: 'From Aquino\'s Assassination to People\'s Power', para: '26' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/philippines/29.htm' }
        },
        {
          id: 'q8',
          text: 'Hundreds of thousands responded. In the tense days that followed, priests, nuns, ordinary citizens, and children linked arms with the rebels and faced down, without violence, the tanks and machine guns of government troops.',
          lang: 'en',
          cite: {
            source: 'loc-philippines-country-study-1991',
            loc: { section: 'From Aquino\'s Assassination to People\'s Power', para: '27' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/philippines/29.htm' }
        },
        {
          id: 'q9',
          text: 'Thus began the four-day EDSA People Power Revolution. The revolution was a peaceful one, with soldiers being coaxed with food, prayers, flowers, and cheers by people from all walks of life who sat, stood, and knelt in prayer in front of the tanks.',
          lang: 'en',
          cite: {
            source: 'official-gazette-ph-the-fall-of-the-dictatorship',
            loc: { section: 'The Fall of the Dictatorship', para: '163' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://web.archive.org/web/20230115154933/https://www.officialgazette.gov.ph/featured/the-fall-of-the-dictatorship/'
          }
        },
        {
          id: 'q10',
          text: 'On February 24, at 5:00 a.m., Marcos was heard over the radio, “We’ll wipe them out. It is obvious they are committing rebellion.”',
          lang: 'en',
          cite: {
            source: 'official-gazette-ph-the-fall-of-the-dictatorship',
            loc: { section: 'The Fall of the Dictatorship', para: '166' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://web.archive.org/web/20230115154933/https://www.officialgazette.gov.ph/featured/the-fall-of-the-dictatorship/'
          }
        }
      ]
    },
    {
      kind: 'aftermath',
      quotes: [
        {
          id: 'q11',
          text: 'Advised by a United States senator, Paul Laxalt, who had close ties to Reagan, to "cut and cut cleanly," Marcos realized that he had lost United States support for any kind of arrangement that could keep him in power. By that evening, the Marcoses had quit the palace that had been their residence for two decades and were on their way to exile in the United States.',
          lang: 'en',
          cite: {
            source: 'loc-philippines-country-study-1991',
            loc: { section: 'From Aquino\'s Assassination to People\'s Power', para: '28' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/philippines/29.htm' }
        },
        {
          id: 'q12',
          text: 'On February 25, 1986, Corazon C. Aquino and Salvador H. Laurel took their oaths in Club Filipino as President and Vice President respectively. Meanwhile, Marcos was inaugurated in the Ceremonial Hall of the Malacañan Palace and delivered his inaugural address in Maharlika Hall (now Kalayaan Hall) on that same day. Rocked by key military and political defections and the overwhelming popular support for Aquino, Marcos was forced to depart with his family a few hours later for exile in Hawaii, effectively ending Marcos’ two-decade long dictatorial rule.',
          lang: 'en',
          cite: {
            source: 'official-gazette-ph-the-fall-of-the-dictatorship',
            loc: { section: 'The Fall of the Dictatorship', para: '175' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://web.archive.org/web/20230115154933/https://www.officialgazette.gov.ph/featured/the-fall-of-the-dictatorship/'
          }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q13',
          text: 'An almost bloodless revolution brought Corazon Aquino into office as the seventh president of the Republic of the Philippines.',
          lang: 'en',
          cite: {
            source: 'loc-philippines-country-study-1991',
            loc: { section: 'From Aquino\'s Assassination to People\'s Power', para: '28' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/philippines/29.htm' }
        }
      ]
    }
  ],
  course: [
    {
      date: {
        alts: [
          {
            value: { d: '1986-02-07' },
            cites: [
              {
                source: 'official-gazette-ph-the-fall-of-the-dictatorship',
                loc: { section: 'The Fall of the Dictatorship', para: '104' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q14',
        text: 'He promised skeptical Americans access for observer teams, setting February 7, 1986, a year before his six-year presidential term ran out, as the date for the election.',
        lang: 'en',
        cite: {
          source: 'loc-philippines-country-study-1991',
          loc: { section: 'From Aquino\'s Assassination to People\'s Power', para: '23' }
        },
        provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/philippines/29.htm' }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1986-02-09' },
            cites: [
              {
                source: 'loc-philippines-country-study-1991',
                loc: { section: 'From Aquino\'s Assassination to People\'s Power', para: '25' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q15',
        text: 'On February 9, computer operators at COMELEC observed discrepancies between their figures and those officially announced and walked out in protest, at some risk to their lives.',
        lang: 'en',
        cite: {
          source: 'loc-philippines-country-study-1991',
          loc: { section: 'From Aquino\'s Assassination to People\'s Power', para: '25' }
        },
        provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/philippines/29.htm' }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1986-02-15' },
            cites: [
              {
                source: 'loc-philippines-country-study-1991',
                loc: { section: 'From Aquino\'s Assassination to People\'s Power', para: '25' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q16',
        text: 'The church condemned the election as fraudulent, but on February 15, the Marcos-dominated National Assembly proclaimed him the official winner.',
        lang: 'en',
        cite: {
          source: 'loc-philippines-country-study-1991',
          loc: { section: 'From Aquino\'s Assassination to People\'s Power', para: '25' }
        },
        provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/philippines/29.htm' }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1986-02-22' },
            cites: [
              {
                source: 'loc-philippines-country-study-1991',
                loc: { section: 'From Aquino\'s Assassination to People\'s Power', para: '26' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q17',
        text: 'They established their rebel headquarters inside Camp Aguinaldo and the adjoining Camp Crame in Metro Manila, which was guarded by several hundred troops.',
        lang: 'en',
        cite: {
          source: 'loc-philippines-country-study-1991',
          loc: { section: 'From Aquino\'s Assassination to People\'s Power', para: '26' }
        },
        provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/philippines/29.htm' }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1986-02-24' },
            cites: [
              {
                source: 'official-gazette-ph-the-fall-of-the-dictatorship',
                loc: { section: 'The Fall of the Dictatorship', para: '166' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q18',
        text: 'Many of the government troops defected, including the crews of seven helicopter gunships, which seemed poised to attack the massive crowd on February 24 but landed in Camp Crame to announce their support for People\'s Power.',
        lang: 'en',
        cite: {
          source: 'loc-philippines-country-study-1991',
          loc: { section: 'From Aquino\'s Assassination to People\'s Power', para: '27' }
        },
        provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/philippines/29.htm' }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1986-02-25' },
            cites: [
              {
                source: 'official-gazette-ph-the-fall-of-the-dictatorship',
                loc: { section: 'The Fall of the Dictatorship', para: '172' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q19',
        text: 'After Marcos lost complete control of the military, his presidency came to an end the following day, on February 25, 1986.',
        lang: 'en',
        cite: {
          source: 'official-gazette-ph-the-fall-of-the-dictatorship',
          loc: { section: 'The Fall of the Dictatorship', para: '172' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-08',
          url: 'https://web.archive.org/web/20230115154933/https://www.officialgazette.gov.ph/featured/the-fall-of-the-dictatorship/'
        }
      }
    }
  ],
  hero: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/b/b9/Corazon_Aquino_inauguration.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Corazon_Aquino_inauguration.jpg',
    credit: { institution: 'Malacañang Palace archives (Republic of the Philippines)' },
    license: { id: 'public-domain' }
  }
})
