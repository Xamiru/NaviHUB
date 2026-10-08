import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'montgomery-bus-boycott',
  names: [
    { text: 'Montgomery bus boycott', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-07',
  type: 'protest',
  start: {
    alts: [
      {
        value: { d: '1955-12-05' },
        cites: [
          {
            source: 'eisenhower-library-presidential-years',
            loc: { section: 'Presidential Years' }
          },
          {
            source: 'loc-exhibition-rosa-parks-the-bus-boycott',
            loc: { section: 'The Bus Boycott', para: '2' }
          }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1956-12-20' },
        cites: [
          {
            source: 'loc-exhibition-rosa-parks-the-bus-boycott',
            loc: { section: 'The Bus Boycott', para: '2' }
          }
        ]
      }
    ]
  },
  regions: ['north-america'],
  prominence: 2,
  places: [
    {
      ref: 'place:montgomery',
      cites: [
        {
          source: 'nps-montgomery-bus-boycott',
          loc: { section: 'The Montgomery Bus Boycott', para: '15' }
        },
        {
          source: 'nara-educators-arrest-records-of-rosa-parks',
          loc: { section: 'An Act of Courage, The Arrest Records of Rosa Parks', para: '1' }
        }
      ]
    }
  ],
  participants: [
    {
      name: 'Rosa Parks',
      role: 'participant',
      cites: [
        {
          source: 'nara-educators-arrest-records-of-rosa-parks',
          loc: { section: 'An Act of Courage, The Arrest Records of Rosa Parks', para: '1' }
        }
      ]
    },
    {
      ref: 'person:martin-luther-king-jr',
      role: 'leader',
      cites: [
        {
          source: 'nara-educators-arrest-records-of-rosa-parks',
          loc: { section: 'An Act of Courage, The Arrest Records of Rosa Parks', para: '4' }
        },
        {
          source: 'eisenhower-library-presidential-years',
          loc: { section: 'Presidential Years' }
        }
      ]
    },
    {
      name: 'E.D. Nixon',
      role: 'organizer',
      cites: [
        {
          source: 'nps-montgomery-bus-boycott',
          loc: { section: 'The Montgomery Bus Boycott', para: '5' }
        }
      ]
    },
    {
      name: 'Jo Ann Robinson',
      role: 'organizer',
      cites: [
        {
          source: 'nps-montgomery-bus-boycott',
          loc: { section: 'The Montgomery Bus Boycott', para: '5' }
        }
      ]
    },
    {
      name: 'Fred Gray',
      role: 'participant',
      cites: [
        {
          source: 'nps-montgomery-bus-boycott',
          loc: { section: 'The Montgomery Bus Boycott', para: '8' }
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
          text: 'The Montgomery bus boycott began the modern Civil Rights Movement and established Martin Luther King Jr. as its leader.',
          lang: 'en',
          cite: {
            source: 'nps-montgomery-bus-boycott',
            loc: { section: 'The Montgomery Bus Boycott', para: '15' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://www.nps.gov/articles/montgomery-bus-boycott.htm'
          }
        },
        {
          id: 'q2',
          text: 'For three hundred and eighty-one days, African American citizens of Montgomery walked, carpooled, and took taxis rather than city buses.',
          lang: 'en',
          cite: {
            source: 'loc-exhibition-rosa-parks-the-bus-boycott',
            loc: { section: 'The Bus Boycott', para: '2' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://web.archive.org/web/2024/https://www.loc.gov/exhibitions/rosa-parks-in-her-own-words/about-this-exhibition/the-bus-boycott/'
          }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q3',
          text: 'On December 1, 1955, during a typical evening rush hour in Montgomery, Alabama, a 42-year-old woman took a seat on the bus on her way home from the Montgomery Fair department store where she worked as a seamstress. Before she reached her destination, she quietly set off a social revolution when the bus driver instructed her to move back, and she refused. Rosa Parks, an African American, was arrested that day for violating a city law requiring racial segregation of public buses.',
          lang: 'en',
          cite: {
            source: 'nara-educators-arrest-records-of-rosa-parks',
            loc: { section: 'An Act of Courage, The Arrest Records of Rosa Parks', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://www.archives.gov/education/lessons/rosa-parks'
          }
        },
        {
          id: 'q4',
          text: 'On March 2, 1955, a black teenager named Claudette Colvin dared to defy bus segregation laws and was forcibly removed from another Montgomery bus.',
          lang: 'en',
          cite: {
            source: 'nps-montgomery-bus-boycott',
            loc: { section: 'The Montgomery Bus Boycott', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://www.nps.gov/articles/montgomery-bus-boycott.htm'
          }
        }
      ]
    },
    {
      kind: 'course',
      quotes: [
        {
          id: 'q5',
          text: 'Montgomery\'s black citizens reacted decisively to the incident. By December 2, schoolteacher Jo Ann Robinson had mimeographed and delivered 50,000 protest leaflets around town. E.D. Nixon, a local labor leader, organized a December 4 meeting at Dexter Avenue Baptist Church, where local black leaders formed the Montgomery Improvement Association (MIA)to spearhead a boycott and negotiate with the bus company.',
          lang: 'en',
          cite: {
            source: 'nps-montgomery-bus-boycott',
            loc: { section: 'The Montgomery Bus Boycott', para: '5' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://www.nps.gov/articles/montgomery-bus-boycott.htm'
          }
        },
        {
          id: 'q6',
          text: 'Over 70% of the cities bus patrons were African American and the one-day boycott was 90% effective. The MIA elected as their president a new but charismatic preacher, Martin Luther King Jr. Under his leadership, the boycott continued with astonishing success.',
          lang: 'en',
          cite: {
            source: 'nps-montgomery-bus-boycott',
            loc: { section: 'The Montgomery Bus Boycott', para: '6' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://www.nps.gov/articles/montgomery-bus-boycott.htm'
          }
        },
        {
          id: 'q7',
          text: 'For nearly a year, buses were virtually empty in Montgomery. Boycott supporters walked to work--as many as eight miles a day--or they used a sophisticated system of carpools with volunteer drivers and dispatchers.',
          lang: 'en',
          cite: {
            source: 'nps-montgomery-bus-boycott',
            loc: { section: 'The Montgomery Bus Boycott', para: '11' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://www.nps.gov/articles/montgomery-bus-boycott.htm'
          }
        },
        {
          id: 'q8',
          text: 'Montgomery City Lines lost between 30,000 and 40,000 bus fares each day during the boycott. The bus company that operated the city busing had suffered financially from the seven month long boycott and the city became desperate to end the boycott. Local police began to harass King and other MIA leaders.',
          lang: 'en',
          cite: {
            source: 'nps-montgomery-bus-boycott',
            loc: { section: 'The Montgomery Bus Boycott', para: '12' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://www.nps.gov/articles/montgomery-bus-boycott.htm'
          }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q9',
          text: 'While her appeal was tied up in the state court of appeals, a panel of three judges in the U.S. District Court for the region ruled in another case that racial segregation of public buses was unconstitutional.',
          lang: 'en',
          cite: {
            source: 'nara-educators-arrest-records-of-rosa-parks',
            loc: { section: 'An Act of Courage, The Arrest Records of Rosa Parks', para: '5' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://www.archives.gov/education/lessons/rosa-parks'
          }
        },
        {
          id: 'q10',
          text: 'The company reluctantly desegregated its buses only after November 13, 1956, when the Supreme Court ruled Alabama\'s bus segregation laws unconstitutional.',
          lang: 'en',
          cite: {
            source: 'nps-montgomery-bus-boycott',
            loc: { section: 'The Montgomery Bus Boycott', para: '13' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://www.nps.gov/articles/montgomery-bus-boycott.htm'
          }
        }
      ]
    },
    {
      kind: 'legacy',
      quotes: [
        {
          id: 'q11',
          text: '“During the Montgomery bus boycott, we came together and remained unified for 381 days. It has never been done again. The Montgomery boycott became the model for human rights throughout the world.”',
          lang: 'en',
          cite: {
            source: 'loc-exhibition-rosa-parks-the-bus-boycott',
            loc: { section: 'The Bus Boycott', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://web.archive.org/web/2024/https://www.loc.gov/exhibitions/rosa-parks-in-her-own-words/about-this-exhibition/the-bus-boycott/'
          }
        },
        {
          id: 'q12',
          text: 'King instituted the practice of massive non-violent civil disobedience to injustice, which he learned from studying Gandhi.',
          lang: 'en',
          cite: {
            source: 'nps-montgomery-bus-boycott',
            loc: { section: 'The Montgomery Bus Boycott', para: '15' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://www.nps.gov/articles/montgomery-bus-boycott.htm'
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
            value: { d: '1956-02-01' },
            cites: [
              {
                source: 'loc-exhibition-rosa-parks-the-bus-boycott',
                loc: { section: 'The Bus Boycott', para: '2' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q13',
        text: 'On February 1, 1956, the MIA filed a lawsuit, Browder v. Gayle, in federal district court challenging the constitutionality of bus segregation ordinances.',
        lang: 'en',
        cite: {
          source: 'loc-exhibition-rosa-parks-the-bus-boycott',
          loc: { section: 'The Bus Boycott', para: '2' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-07',
          url: 'https://web.archive.org/web/2024/https://www.loc.gov/exhibitions/rosa-parks-in-her-own-words/about-this-exhibition/the-bus-boycott/'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1956-06-05' },
            cites: [
              {
                source: 'nps-montgomery-bus-boycott',
                loc: { section: 'The Montgomery Bus Boycott', para: '9' }
              }
            ]
          },
          {
            value: { d: '1956-06-04' },
            cites: [
              {
                source: 'nara-educators-arrest-records-of-rosa-parks',
                loc: { section: 'An Act of Courage, The Arrest Records of Rosa Parks', para: '5' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q14',
        text: 'On June 5, 1956, a three-judge U.S. District Court ruled 2-1 that segregation on public buses was unconstitutional.',
        lang: 'en',
        cite: {
          source: 'nps-montgomery-bus-boycott',
          loc: { section: 'The Montgomery Bus Boycott', para: '9' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-07',
          url: 'https://www.nps.gov/articles/montgomery-bus-boycott.htm'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1956-11-13' },
            cites: [
              {
                source: 'nara-educators-arrest-records-of-rosa-parks',
                loc: { section: 'An Act of Courage, The Arrest Records of Rosa Parks', para: '5' }
              },
              {
                source: 'nps-montgomery-bus-boycott',
                loc: { section: 'The Montgomery Bus Boycott', para: '13' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q15',
        text: 'On November 13, 1956, the U.S. Supreme Court upheld the lower court’s ruling that bus segregation violated the due process and equal protection clauses of the Fourteenth Amendment, which led to the successful end of the bus boycott on December 20, 1956.',
        lang: 'en',
        cite: {
          source: 'loc-exhibition-rosa-parks-the-bus-boycott',
          loc: { section: 'The Bus Boycott', para: '2' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-07',
          url: 'https://web.archive.org/web/2024/https://www.loc.gov/exhibitions/rosa-parks-in-her-own-words/about-this-exhibition/the-bus-boycott/'
        }
      }
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/e/ea/Rosa_Parks_being_fingerprinted_by_Deputy_Sheriff_D.H._Lackey_after_being_arrested_on_February_22%2C_1956%2C_during_the_Montgomery_bus_boycott.jpg/1280px-Rosa_Parks_being_fingerprinted_by_Deputy_Sheriff_D.H._Lackey_after_being_arrested_on_February_22%2C_1956%2C_during_the_Montgomery_bus_boycott.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Rosa_Parks_being_fingerprinted_by_Deputy_Sheriff_D.H._Lackey_after_being_arrested_on_February_22,_1956,_during_the_Montgomery_bus_boycott.jpg',
    credit: { institution: 'National Portrait Gallery', creator: 'Gene Herrick' },
    license: { id: 'public-domain' }
  }
})
