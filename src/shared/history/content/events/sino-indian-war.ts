import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'sino-indian-war',
  names: [
    { text: 'Sino-Indian War', lang: 'en', role: 'primary' },
    { text: '中印边境战争', lang: 'zh', role: 'alternative' },
    { text: 'भारत-चीन युद्ध', lang: 'hi', role: 'alternative' }
  ],
  researched: '2026-10-08',
  type: 'war',
  start: {
    alts: [
      {
        value: { d: '1962-10-20' },
        cites: [
          {
            source: 'loc-china-country-study-1987',
            loc: { section: 'The Great Leap Forward, 1958-60', para: '6' }
          },
          {
            source: 'frus-1961-1963-v19-south-asia',
            loc: {
              section: 'Document 190. Memorandum From the President’s Deputy Special Assistant for National Security Affairs (Kaysen) to President Kennedy'
            }
          }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1962' },
        cites: [
          {
            source: 'loc-india-country-study-1995',
            loc: { section: 'Jawaharlal Nehru', para: '3' }
          }
        ]
      }
    ]
  },
  regions: ['south-asia', 'east-asia'],
  prominence: 2,
  places: [
    {
      ref: 'place:aksai-chin',
      cites: [
        {
          source: 'loc-china-country-study-1987',
          loc: { section: 'The Great Leap Forward, 1958-60', para: '6' }
        }
      ]
    }
  ],
  partOf: [
    { ref: 'period:cold-war' }
  ],
  sides: [
    {
      key: 'china',
      name: 'Chinese Communist forces',
      polity: 'polity:peoples-republic-of-china',
      cites: [
        {
          source: 'frus-1961-1963-v19-south-asia',
          loc: {
            section: 'Document 190. Memorandum From the President’s Deputy Special Assistant for National Security Affairs (Kaysen) to President Kennedy'
          }
        }
      ]
    },
    {
      key: 'india',
      name: 'Indian forces',
      polity: 'polity:india',
      cites: [
        {
          source: 'frus-1961-1963-v19-south-asia',
          loc: {
            section: 'Document 190. Memorandum From the President’s Deputy Special Assistant for National Security Affairs (Kaysen) to President Kennedy'
          }
        }
      ]
    }
  ],
  participants: [
    {
      ref: 'person:jawaharlal-nehru',
      role: 'head-of-government',
      side: 'india',
      cites: [
        {
          source: 'frus-1961-1963-v19-south-asia',
          loc: {
            section: 'Document 214. Telegram From the Embassy in India to the Department of State'
          }
        }
      ]
    },
    {
      name: 'Zhou Enlai',
      role: 'head-of-government',
      side: 'china',
      cites: [
        {
          source: 'frus-1961-1963-v19-south-asia',
          loc: {
            section: 'Document 214. Telegram From the Embassy in India to the Department of State'
          }
        }
      ]
    }
  ],
  figures: [
    {
      key: 'casualties',
      side: 'india',
      value: {
        alts: [
          {
            value: { min: 5000, qualifier: 'about' },
            cites: [
              {
                source: 'frus-1961-1963-v19-south-asia',
                loc: {
                  section: 'Document 190. Memorandum From the President’s Deputy Special Assistant for National Security Affairs (Kaysen) to President Kennedy'
                }
              }
            ]
          }
        ]
      }
    }
  ],
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'There were several border incidents in 1959, and a brief Sino-Indian border war erupted in October 1962 as China laid claim to Aksai Chin, nearly 103,600 square kilometers of territory that India regarded as its own.',
          lang: 'en',
          cite: {
            source: 'loc-china-country-study-1987',
            loc: { section: 'The Great Leap Forward, 1958-60', para: '6' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/china/26.htm' }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q2',
          text: 'Despite attempts at improving relations with China, based on his much-publicized five principles (Panch Shila--see Glossary)--territorial integrity and sovereignty, nonaggression, noninterference, equality and cooperation, and peaceful coexistence--war with China erupted in 1962.',
          lang: 'en',
          cite: {
            source: 'loc-india-country-study-1995',
            loc: { section: 'Jawaharlal Nehru', para: '3' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/india/23.htm' }
        },
        {
          id: 'q3',
          text: 'The present phase of the Sino-Indian border conflict began early last spring when India decided to put out advanced patrols and outposts in the Ladakh area in an effort to forestall further Chinese advances there and eventually to push back some of the Chinese outposts. In July the Chinese demanded that the Indians withdraw their forward patrols and threatened, if they did not do so, to invade NEFA. Instead of withdrawing, the Indians intensified their forward patrolling activities in the months that followed.',
          lang: 'en',
          cite: {
            source: 'frus-1961-1963-v19-south-asia',
            loc: {
              section: 'Document 190. Memorandum From the President’s Deputy Special Assistant for National Security Affairs (Kaysen) to President Kennedy'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://history.state.gov/historicaldocuments/frus1961-63v19/d190'
          }
        }
      ]
    },
    {
      kind: 'course',
      quotes: [
        {
          id: 'q4',
          text: 'There is now evidence that in August and early September the Chinese concentrated their troops at points along the NEFA border. They launched an attack on October 20. Within a week the Chinese Communist forces advanced at several places within NEFA, reaching at one point near the Bhutan border a position approximately 15 miles south of the McMahon Line. Simultaneously, the Chinese attacked in Ladakh and eliminated the forward posts established by the Indians last spring and summer.4 Total Indian casualties are in the neighborhood of 5,000.',
          lang: 'en',
          cite: {
            source: 'frus-1961-1963-v19-south-asia',
            loc: {
              section: 'Document 190. Memorandum From the President’s Deputy Special Assistant for National Security Affairs (Kaysen) to President Kennedy'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://history.state.gov/historicaldocuments/frus1961-63v19/d190'
          }
        },
        {
          id: 'q5',
          text: 'Chinese gains have been a result of a combination of advantages over the Indians, most notably a better supply situation, more modern equipment and larger numbers of men.',
          lang: 'en',
          cite: {
            source: 'frus-1961-1963-v19-south-asia',
            loc: {
              section: 'Document 190. Memorandum From the President’s Deputy Special Assistant for National Security Affairs (Kaysen) to President Kennedy'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://history.state.gov/historicaldocuments/frus1961-63v19/d190'
          }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q6',
          text: 'The war was a rude awakening for Nehru, as India proved ill-equipped and unprepared to defend its northern borders. At the conclusion of the conflict, the Chinese forces were partially withdrawn and an unofficial demilitarized zone was established, but India\'s prestige and self-esteem had suffered.',
          lang: 'en',
          cite: {
            source: 'loc-india-country-study-1995',
            loc: { section: 'Jawaharlal Nehru', para: '3' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/india/23.htm' }
        },
        {
          id: 'q7',
          text: 'These developments strike at the heart of India’s policy of nonalignment and have far-reaching internal consequences. India has turned to the West for assistance in meeting its military requirements.',
          lang: 'en',
          cite: {
            source: 'frus-1961-1963-v19-south-asia',
            loc: {
              section: 'Document 190. Memorandum From the President’s Deputy Special Assistant for National Security Affairs (Kaysen) to President Kennedy'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://history.state.gov/historicaldocuments/frus1961-63v19/d190'
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
            value: { d: '1962-10-20' },
            cites: [
              {
                source: 'loc-china-country-study-1987',
                loc: { section: 'The Great Leap Forward, 1958-60', para: '6' }
              },
              {
                source: 'frus-1961-1963-v19-south-asia',
                loc: {
                  section: 'Document 214. Telegram From the Embassy in India to the Department of State'
                }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q8',
        text: 'Thus October 20 attack followed by October 24 offer, November 15 attack followed by November 21 cease fire.',
        lang: 'en',
        cite: {
          source: 'frus-1961-1963-v19-south-asia',
          loc: {
            section: 'Document 214. Telegram From the Embassy in India to the Department of State'
          }
        },
        provenance: {
          via: 'web',
          at: '2026-10-08',
          url: 'https://history.state.gov/historicaldocuments/frus1961-63v19/d214'
        }
      }
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/e/ed/Chinese_claim_lines_and_1962_ceasefire_line_in_Ladakh.jpg/1280px-Chinese_claim_lines_and_1962_ceasefire_line_in_Ladakh.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Chinese_claim_lines_and_1962_ceasefire_line_in_Ladakh.jpg',
    credit: {
      institution: 'Australian National University Open Research',
      creator: 'US Army Headquarters, Survey Company'
    },
    license: { id: 'public-domain' }
  },
  furtherReading: [
    { source: 'renmin-1962-guanyu-zhongyin-bianjie-wenti', perspective: 'chinese' },
    { source: 'mullik-1971-my-years-with-nehru', perspective: 'south-asian' },
    { source: 'raghavan-2010-war-and-peace-in-modern-india', perspective: 'south-asian' }
  ]
})
