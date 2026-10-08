import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'watergate-scandal',
  names: [
    { text: 'Watergate scandal', lang: 'en', role: 'primary' },
    {
      text: 'Watergate',
      lang: 'en',
      role: 'alternative',
      cites: [
        { source: 'fbi-history-watergate', loc: { section: 'Watergate', para: '2' } }
      ]
    }
  ],
  researched: '2026-10-09',
  type: 'crisis',
  start: {
    alts: [
      {
        value: { d: '1972-06-17' },
        cites: [
          {
            source: 'ford-library-the-watergate-files',
            loc: { section: 'The Watergate Files', para: '2' }
          },
          { source: 'fbi-history-watergate', loc: { section: 'Watergate', para: '2' } }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1974-08-09' },
        cites: [
          {
            source: 'ford-library-the-watergate-files',
            loc: { section: 'The Watergate Files', para: '4' }
          },
          { source: 'nixon-library-president-nixon', loc: { section: 'The Life', para: '46' } }
        ]
      }
    ]
  },
  regions: ['north-america'],
  prominence: 2,
  places: [
    {
      ref: 'place:washington-dc',
      cites: [
        { source: 'nixon-library-president-nixon', loc: { section: 'The Life', para: '41' } }
      ]
    }
  ],
  participants: [
    {
      ref: 'person:richard-nixon',
      role: 'perpetrator',
      cites: [
        { source: 'nixon-library-president-nixon', loc: { section: 'The Life', para: '42' } }
      ]
    },
    {
      name: 'Gerald R. Ford',
      role: 'participant',
      cites: [
        {
          source: 'ford-library-the-watergate-files',
          loc: { section: 'The Watergate Files', para: '4' }
        }
      ]
    },
    {
      name: 'John Sirica',
      role: 'participant',
      cites: [
        {
          source: 'ford-library-the-watergate-files',
          loc: { section: 'The Watergate Files', para: '7' }
        }
      ]
    },
    {
      name: 'Sam Ervin',
      role: 'participant',
      cites: [
        {
          source: 'ford-library-the-watergate-files',
          loc: { section: 'The Watergate Files', para: '67' }
        }
      ]
    },
    {
      name: 'Archibald Cox',
      role: 'participant',
      cites: [
        {
          source: 'ford-library-the-watergate-files',
          loc: { section: 'The Watergate Files', para: '82' }
        }
      ]
    },
    {
      name: 'John Mitchell',
      role: 'participant',
      cites: [
        {
          source: 'ford-library-the-watergate-files',
          loc: { section: 'The Watergate Files', para: '15' }
        }
      ]
    },
    {
      name: 'John Dean',
      role: 'participant',
      cites: [
        {
          source: 'ford-library-the-watergate-files',
          loc: { section: 'The Watergate Files', para: '81' }
        }
      ]
    }
  ],
  polities: [
    {
      ref: 'polity:united-states',
      cites: [
        { source: 'nixon-library-president-nixon', loc: { section: 'The Life', para: '41' } }
      ]
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/2/2a/President_Richard_Nixon_Departing_the_White_House_on_the_Presidential_Helicopter_for_the_Last_Time_as_President_-_DPLA_-_009818e28eefe72aceb8d8fedfb633bf.jpg/1280px-President_Richard_Nixon_Departing_the_White_House_on_the_Presidential_Helicopter_for_the_Last_Time_as_President_-_DPLA_-_009818e28eefe72aceb8d8fedfb633bf.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:President_Richard_Nixon_Departing_the_White_House_on_the_Presidential_Helicopter_for_the_Last_Time_as_President_-_DPLA_-_009818e28eefe72aceb8d8fedfb633bf.jpg',
    credit: { institution: 'White House Photo Office, General Services Administration' },
    license: { id: 'public-domain' }
  },
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q12',
          text: 'The Watergate scandal began with the June 1972 discovery of a break-in at the Democratic National Committee offices in the Watergate office complex in Washington, D.C., but media and official investigations soon revealed a broader pattern of abuse of power by the Nixon administration, leading to his resignation.',
          lang: 'en',
          cite: { source: 'nixon-library-president-nixon', loc: { section: 'The Life', para: '41' } },
          provenance: { via: 'web', at: '2026-10-09', url: 'https://www.nixonlibrary.gov/president-nixon' }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q13',
          text: 'Investigations into Watergate also revealed other abuses of power, including numerous warrantless wiretaps on reporters and others, campaign "dirty tricks," and the creation of a "Plumbers" unit within the White House. The Plumbers, formed in response to the leaking of the Pentagon Papers to news organizations by former Pentagon official Daniel Ellsberg, broke into the office of Ellsberg\'s psychiatrist.',
          lang: 'en',
          cite: { source: 'nixon-library-president-nixon', loc: { section: 'The Life', para: '43' } },
          provenance: { via: 'web', at: '2026-10-09', url: 'https://www.nixonlibrary.gov/president-nixon' }
        },
        {
          id: 'q14',
          text: 'It was clear from the beginning that this was no ordinary burglary, and the FBI immediately found itself involved in the most politically sensitive investigation in its history.',
          lang: 'en',
          cite: { source: 'fbi-history-watergate', loc: { section: 'Watergate', para: '7' } },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://www.fbi.gov/history/famous-cases/watergate'
          }
        }
      ]
    },
    {
      kind: 'course',
      quotes: [
        {
          id: 'q15',
          text: 'For the next twenty-six months, an incredible story of political corruption emerged. Federal investigators and grand juries gathered evidence which gradually connected the Watergate break-in to the Oval Office. Throughout it all, reporters played an essential role keeping the story in the public eye. From the initial burglary trial to Senate hearings to President Nixon’s resignation from office, the public watched as a constitutional crisis unfolded.',
          lang: 'en',
          cite: {
            source: 'ford-library-the-watergate-files',
            loc: { section: 'The Watergate Files', para: '3' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://www.fordlibrarymuseum.gov/museum/exhibits/watergate_files/index.html'
          }
        },
        {
          id: 'q16',
          text: 'Cox issued a terse, one-sentence response when he learned of his dismissal. Picking up on a phrase made famous by John Adams, he said, “Whether ours shall continue to be a government of laws and not of men is now before Congress and ultimately the American people.”',
          lang: 'en',
          cite: {
            source: 'ford-library-the-watergate-files',
            loc: { section: 'The Watergate Files', para: '85' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://www.fordlibrarymuseum.gov/museum/exhibits/watergate_files/index.html'
          }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q17',
          text: 'The revelations from the Watergate tapes, combined with actions such as Nixon\'s firing of Watergate special prosecutor Archibald Cox, badly eroded the president\'s standing with the public and Congress. Facing certain impeachment and removal from office, Nixon announced his decision to resign in a national televised address on the evening of August 8, 1974. He resigned effective at noon the next day, August 9, 1974. Vice President Ford then became president of the United States.',
          lang: 'en',
          cite: { source: 'nixon-library-president-nixon', loc: { section: 'The Life', para: '46' } },
          provenance: { via: 'web', at: '2026-10-09', url: 'https://www.nixonlibrary.gov/president-nixon' }
        },
        {
          id: 'q18',
          text: 'Today, “Watergate” is synonymous with political deceit and murky coverups; the suffix “—gate” now applied to political misdeeds both real and perceived.',
          lang: 'en',
          cite: {
            source: 'ford-library-the-watergate-files',
            loc: { section: 'The Watergate Files', para: '4' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://www.fordlibrarymuseum.gov/museum/exhibits/watergate_files/index.html'
          }
        },
        {
          id: 'q19',
          text: 'Although his pardon of Richard Nixon was very controversial and probably was a factor leading to his loss in the 1976 presidential election, Gerald Ford never second-guessed his decision to grant it.',
          lang: 'en',
          cite: {
            source: 'ford-library-the-watergate-files',
            loc: { section: 'The Watergate Files', para: '379' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://www.fordlibrarymuseum.gov/museum/exhibits/watergate_files/index.html'
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
            value: { d: '1972-06-17' },
            cites: [
              {
                source: 'ford-library-the-watergate-files',
                loc: { section: 'The Watergate Files', para: '2' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q1',
        text: 'In the early hours of the morning on June 17, 1972, three Washington, DC, police officers responded to a report of a break-in at the Watergate hotel and office complex. They were surprised to find that five burglars, dressed in suits and wearing surgical gloves, had broken into the national headquarters of the Democratic National Committee. The burglars were promptly arrested.',
        lang: 'en',
        cite: {
          source: 'ford-library-the-watergate-files',
          loc: { section: 'The Watergate Files', para: '2' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-09',
          url: 'https://www.fordlibrarymuseum.gov/museum/exhibits/watergate_files/index.html'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1973-01-08' },
            cites: [
              {
                source: 'ford-library-the-watergate-files',
                loc: { section: 'The Watergate Files', para: '7' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q2',
        text: 'When Judge John Sirica gaveled the trial of the Watergate Seven to order on January 8, 1973, federal investigators had already discovered a covert slush fund used to underwrite nefarious activities against Democrats. The money and the men on trial could be linked to the Committee to Re-elect the President (CRP)',
        lang: 'en',
        cite: {
          source: 'ford-library-the-watergate-files',
          loc: { section: 'The Watergate Files', para: '7' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-09',
          url: 'https://www.fordlibrarymuseum.gov/museum/exhibits/watergate_files/index.html'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1973-02-07' },
            cites: [
              {
                source: 'ford-library-the-watergate-files',
                loc: { section: 'The Watergate Files', para: '8' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q3',
        text: 'Shortly after the trial, the United States Senate formed the Select Committee on Presidential Campaign Activities, chaired by Senator Sam Ervin (D-NC).',
        lang: 'en',
        cite: {
          source: 'ford-library-the-watergate-files',
          loc: { section: 'The Watergate Files', para: '8' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-09',
          url: 'https://www.fordlibrarymuseum.gov/museum/exhibits/watergate_files/index.html'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1973-04-30' },
            cites: [
              {
                source: 'ford-library-the-watergate-files',
                loc: { section: 'The Watergate Files', para: '62' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q4',
        text: 'President Nixon had fired Dean on April 30. That same day Nixon’s chief of staff Bob Haldeman and Domestic Counsel John Ehrlichman had resigned because of their role in Watergate. And Attorney General Richard Kleindienst resigned stating he was incapable of prosecuting close friends.',
        lang: 'en',
        cite: {
          source: 'ford-library-the-watergate-files',
          loc: { section: 'The Watergate Files', para: '62' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-09',
          url: 'https://www.fordlibrarymuseum.gov/museum/exhibits/watergate_files/index.html'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1973-07-16' },
            cites: [
              {
                source: 'ford-library-the-watergate-files',
                loc: { section: 'The Watergate Files', para: '65' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q5',
        text: 'The answer came on July 16, when Alexander Butterfield, a former White House appointments secretary, quietly and unexpectedly informed the Senate committee that a system of taping conversations and telephone calls was in place within the White House.',
        lang: 'en',
        cite: {
          source: 'ford-library-the-watergate-files',
          loc: { section: 'The Watergate Files', para: '65' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-09',
          url: 'https://www.fordlibrarymuseum.gov/museum/exhibits/watergate_files/index.html'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1973-10-20' },
            cites: [
              {
                source: 'ford-library-the-watergate-files',
                loc: { section: 'The Watergate Files', para: '149' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q6',
        text: 'On Saturday, October 20, 1973, Bork was to receive his baptism into the no-holds-barred ring of Washington politics. That evening word was passed that Nixon was angry. Watergate Special Prosecutor Archibald Cox had rejected the president’s order to rescind the subpoena for White House tape recordings. Soon an order arrived from the president. Attorney General Elliot Richardson was to fire Cox. Troubled by what he saw as interference in an ongoing investigation that the president had promised to leave unfettered, Richardson refused the order and resigned. His subordinate, William Ruckelshaus, followed suit and quit rather than fire Cox. Bork, with no one behind him to whom the office could fall, assumed the role of acting Attorney General and obeyed the president’s order to fire Cox.',
        lang: 'en',
        cite: {
          source: 'ford-library-the-watergate-files',
          loc: { section: 'The Watergate Files', para: '149' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-09',
          url: 'https://www.fordlibrarymuseum.gov/museum/exhibits/watergate_files/index.html'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1974-02-06' },
            cites: [
              {
                source: 'ford-library-the-watergate-files',
                loc: { section: 'The Watergate Files', para: '233' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q7',
        text: 'On February 6, it authorized the Judiciary Committee to investigate grounds for the impeachment of President Nixon.',
        lang: 'en',
        cite: {
          source: 'ford-library-the-watergate-files',
          loc: { section: 'The Watergate Files', para: '233' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-09',
          url: 'https://www.fordlibrarymuseum.gov/museum/exhibits/watergate_files/index.html'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1974-07-24' },
            cites: [
              {
                source: 'ford-library-the-watergate-files',
                loc: { section: 'The Watergate Files', para: '370' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q8',
        text: 'On July 24, the Court handed down an 8-0 decision, laying bare the president\'s last line of defense.',
        lang: 'en',
        cite: {
          source: 'ford-library-the-watergate-files',
          loc: { section: 'The Watergate Files', para: '370' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-09',
          url: 'https://www.fordlibrarymuseum.gov/museum/exhibits/watergate_files/index.html'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1974-08-05' },
            cites: [
              {
                source: 'ford-library-the-watergate-files',
                loc: { section: 'The Watergate Files', para: '375' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q9',
        text: 'On Monday, August 5, he released tapes of three conversations between himself and Haldeman recorded six days after the break-in. The text showed the president obstructing justice by ordering the FBI to end its investigation of the break-in.',
        lang: 'en',
        cite: {
          source: 'ford-library-the-watergate-files',
          loc: { section: 'The Watergate Files', para: '375' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-09',
          url: 'https://www.fordlibrarymuseum.gov/museum/exhibits/watergate_files/index.html'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1974-08-09' },
            cites: [
              {
                source: 'ford-library-the-watergate-files',
                loc: { section: 'The Watergate Files', para: '376' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q10',
        text: 'The following day, August 8, Nixon announced in a broadcast to the nation his decision to resign the presidency at noon the next day.',
        lang: 'en',
        cite: {
          source: 'ford-library-the-watergate-files',
          loc: { section: 'The Watergate Files', para: '376' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-09',
          url: 'https://www.fordlibrarymuseum.gov/museum/exhibits/watergate_files/index.html'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1974-09-08' },
            cites: [
              {
                source: 'nixon-library-president-nixon',
                loc: { section: 'The Life', para: '46' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q11',
        text: 'On September 8, 1974, Ford pardoned Nixon for "all offenses against the United States" which Nixon "has committed or may have committed or taken part in" during his presidency.',
        lang: 'en',
        cite: { source: 'nixon-library-president-nixon', loc: { section: 'The Life', para: '46' } },
        provenance: { via: 'web', at: '2026-10-09', url: 'https://www.nixonlibrary.gov/president-nixon' }
      }
    }
  ]
})
