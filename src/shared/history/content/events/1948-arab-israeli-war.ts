import { defineEvent } from '../../schema'

export default defineEvent({
  id: '1948-arab-israeli-war',
  names: [
    { text: '1948 Arab–Israeli War', lang: 'en', role: 'primary' },
    {
      text: 'Arab-Israeli War of 1948',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'state-dept-milestones-arab-israeli-war-of-1948',
          loc: { section: 'The Arab-Israeli War of 1948', para: '1' }
        }
      ]
    },
    {
      text: 'Israel\'s War of Independence',
      lang: 'en',
      role: 'contested',
      usedBy: [
        { kind: 'state', name: 'Israel' }
      ],
      cites: [
        {
          source: 'israel-mfa-history-the-state-of-israel',
          loc: { section: 'The State of Israel is born', para: '2' }
        },
        {
          source: 'loc-israel-country-study-1988',
          loc: { section: 'PROBLEMS OF THE NEW STATE, 1948-67', para: '2' }
        }
      ]
    },
    {
      text: 'Nakba',
      lang: 'en',
      role: 'contested',
      usedBy: [
        { kind: 'public', name: 'Palestinians' }
      ],
      cites: [
        { source: 'palquest-charif-the-nakba', loc: { section: 'The Nakba', para: '13' } },
        {
          source: 'palquest-charif-meanings-of-the-nakba',
          loc: { section: 'Meanings of the Nakba', para: '1' }
        }
      ]
    },
    {
      text: 'النكبة',
      lang: 'ar',
      role: 'contested',
      translit: 'al-Nakba',
      usedBy: [
        { kind: 'public', name: 'Palestinians' }
      ],
      cites: [
        {
          source: 'palquest-charif-meanings-of-the-nakba',
          loc: { section: 'Meanings of the Nakba', para: '1' }
        }
      ]
    }
  ],
  researched: '2026-10-06',
  type: 'war',
  start: {
    alts: [
      {
        value: { d: '1947-11-29' },
        cites: [
          {
            source: 'state-dept-milestones-arab-israeli-war-of-1948',
            loc: { section: 'The Arab-Israeli War of 1948', para: '3' }
          },
          { source: 'palquest-charif-the-nakba', loc: { section: 'The Nakba', para: '3' } }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1949-07-20' },
        cites: [
          {
            source: 'loc-israel-country-study-1988',
            loc: { section: 'Prelude to Statehood', para: '10' }
          }
        ]
      }
    ]
  },
  regions: ['mena'],
  prominence: 2,
  places: [
    {
      ref: 'place:jerusalem',
      cites: [
        {
          source: 'state-dept-milestones-arab-israeli-war-of-1948',
          loc: { section: 'The Arab-Israeli War of 1948', para: '3' }
        }
      ]
    },
    {
      ref: 'place:tel-aviv',
      cites: [
        {
          source: 'state-dept-milestones-arab-israeli-war-of-1948',
          loc: { section: 'The Arab-Israeli War of 1948', para: '5' }
        },
        {
          source: 'avalon-israeli-declaration-of-independence',
          loc: { section: 'Declaration of Israel\'s Independence 1948' }
        }
      ]
    },
    {
      ref: 'place:deir-yassin',
      cites: [
        {
          source: 'loc-israel-country-study-1988',
          loc: { section: 'Prelude to Statehood', para: '6' }
        }
      ]
    }
  ],
  sides: [
    {
      key: 'israel',
      name: 'Jewish forces',
      cites: [
        {
          source: 'state-dept-milestones-arab-israeli-war-of-1948',
          loc: { section: 'The Arab-Israeli War of 1948', para: '4' }
        }
      ]
    },
    {
      key: 'arab',
      name: 'Arab forces',
      cites: [
        {
          source: 'state-dept-milestones-arab-israeli-war-of-1948',
          loc: { section: 'The Arab-Israeli War of 1948', para: '5' }
        }
      ]
    }
  ],
  participants: [
    {
      ref: 'person:david-ben-gurion',
      role: 'leader',
      side: 'israel',
      cites: [
        {
          source: 'state-dept-milestones-creation-of-israel',
          loc: { section: 'Creation of Israel, 1948', para: '1' }
        }
      ]
    },
    {
      name: 'Hajj Amin al Husayni',
      role: 'leader',
      side: 'arab',
      cites: [
        {
          source: 'loc-israel-country-study-1988',
          loc: { section: 'Prelude to Statehood', para: '8' }
        }
      ]
    },
    {
      name: 'Folke Bernadotte',
      role: 'diplomat',
      cites: [
        {
          source: 'loc-israel-country-study-1988',
          loc: { section: 'Prelude to Statehood', para: '10' }
        }
      ]
    },
    {
      name: 'Ralph Bunche',
      role: 'diplomat',
      cites: [
        {
          source: 'loc-israel-country-study-1988',
          loc: { section: 'Prelude to Statehood', para: '10' }
        }
      ]
    },
    {
      ref: 'person:harry-s-truman',
      role: 'head-of-state',
      cites: [
        {
          source: 'state-dept-milestones-creation-of-israel',
          loc: { section: 'Creation of Israel, 1948', para: '1' }
        }
      ]
    }
  ],
  figures: [
    {
      key: 'deaths',
      side: 'israel',
      value: {
        alts: [
          {
            value: { min: 6000, qualifier: 'over' },
            cites: [
              {
                source: 'israel-mfa-history-the-state-of-israel',
                loc: { section: 'The State of Israel is born', para: '2' }
              },
              {
                source: 'loc-israel-country-study-1988',
                loc: { section: 'PROBLEMS OF THE NEW STATE, 1948-67', para: '2' }
              }
            ],
            heldBy: [
              { kind: 'state', name: 'Israel' },
              { kind: 'organization', name: 'Library of Congress, Federal Research Division' }
            ]
          }
        ]
      }
    },
    {
      key: 'deaths',
      value: {
        alts: [
          {
            value: { min: 13000 },
            cites: [
              {
                source: 'palquest-charif-the-nakba',
                loc: { section: 'The Nakba', para: '13' }
              }
            ],
            heldBy: [
              { kind: 'scholar', name: 'Maher Charif' }
            ]
          }
        ]
      }
    },
    {
      key: 'displaced',
      value: {
        alts: [
          {
            value: { min: 750000, qualifier: 'about' },
            cites: [
              { source: 'palquest-charif-the-nakba', loc: { section: 'The Nakba', para: '1' } }
            ],
            heldBy: [
              { kind: 'scholar', name: 'Maher Charif' }
            ]
          }
        ]
      }
    }
  ],
  related: [
    {
      ref: 'event:the-holocaust',
      rel: 'related',
      cites: [
        {
          source: 'loc-israel-country-study-1988',
          loc: { section: 'The Holocaust', para: '2' }
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
          text: 'The Arab-Israeli War of 1948 broke out when five Arab nations invaded territory in the former Palestinian mandate immediately following the announcement of the independence of the state of Israel on May 14, 1948.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-arab-israeli-war-of-1948',
            loc: { section: 'The Arab-Israeli War of 1948', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://history.state.gov/milestones/1945-1952/arab-israeli-war'
          }
        },
        {
          id: 'q2',
          text: 'U.S. President Harry S. Truman recognized the new nation on the same day.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-creation-of-israel',
            loc: { section: 'Creation of Israel, 1948', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://history.state.gov/milestones/1945-1952/creation-israel'
          }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q3',
          text: 'On November 29, 1947, the United Nations General Assembly adopted Resolution 181 (also known as the Partition Resolution) that would divide Great Britain’s former Palestinian mandate into Jewish and Arab states in May 1948.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-arab-israeli-war-of-1948',
            loc: { section: 'The Arab-Israeli War of 1948', para: '3' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://history.state.gov/milestones/1945-1952/arab-israeli-war'
          }
        },
        {
          id: 'q4',
          text: 'The Palestinian Arabs refused to recognize this arrangement, which they regarded as favorable to the Jews and unfair to the Arab population that would remain in Jewish territory under the partition.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-arab-israeli-war-of-1948',
            loc: { section: 'The Arab-Israeli War of 1948', para: '3' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://history.state.gov/milestones/1945-1952/arab-israeli-war'
          }
        }
      ]
    },
    {
      kind: 'course',
      quotes: [
        {
          id: 'q5',
          text: 'The United Nations resolution sparked conflict between Jewish and Arab groups within Palestine.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-arab-israeli-war-of-1948',
            loc: { section: 'The Arab-Israeli War of 1948', para: '4' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://history.state.gov/milestones/1945-1952/arab-israeli-war'
          }
        },
        {
          id: 'q6',
          text: 'In April 1948, the Palestinian Arab community panicked after Begin\'s Irgun killed 250 Arab civilians at the village of Dayr Yasin near Jerusalem.',
          lang: 'en',
          cite: {
            source: 'loc-israel-country-study-1988',
            loc: { section: 'Prelude to Statehood', para: '6' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/israel/20.htm' }
        },
        {
          id: 'q7',
          text: 'It was carried out by Palmach units, who faced intense Palestinian resistance but by 9 April had succeeded in occupying the village of al-Qastal and entering the village of Deir Yasin , where they massacred more than 100 men, women, and children.',
          lang: 'en',
          cite: { source: 'palquest-charif-the-nakba', loc: { section: 'The Nakba', para: '6' } },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.palquest.org/en/highlight/160/nakba'
          }
        },
        {
          id: 'q8',
          text: 'Meanwhile, Arab military forces began their invasion of Israel on May 15.',
          lang: 'en',
          cite: {
            source: 'loc-israel-country-study-1988',
            loc: { section: 'Prelude to Statehood', para: '8' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/israel/20.htm' }
        }
      ]
    },
    {
      kind: 'aftermath',
      quotes: [
        {
          id: 'q9',
          text: 'Israel gained some territory formerly granted to Palestinian Arabs under the United Nations resolution in 1947. Egypt and Jordan retained control over the Gaza Strip and the West Bank respectively. These armistice lines held until 1967.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-arab-israeli-war-of-1948',
            loc: { section: 'The Arab-Israeli War of 1948', para: '6' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://history.state.gov/milestones/1945-1952/arab-israeli-war'
          }
        },
        {
          id: 'q10',
          text: 'At the war\'s end in 1949, the fledgling state was burdened with a number of difficult problems. These included reacting to the absorption of hundreds of thousands of new immigrants and to a festering refugee problem on its borders, maintaining a defense against a hostile and numerically superior Arab world, keeping a war-torn economy afloat, and managing foreign policy alignments.',
          lang: 'en',
          cite: {
            source: 'loc-israel-country-study-1988',
            loc: { section: 'PROBLEMS OF THE NEW STATE, 1948-67', para: '2' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/israel/21.htm' }
        },
        {
          id: 'q11',
          text: 'Every 15 May since 1948, Palestinians, wherever they are gathered in the homeland or the diaspora, commemorate the anniversary of the disaster that befell them as a people. The Nakba – the word means catastrophe in Arabic – refers to the eviction of nearly three-quarters of a million Palestinians from their homes and their transformation into refugees, as well as the destruction of more than four hundred villages and towns in what became the state of Israel, and the erasure of the name Palestine from the map.',
          lang: 'en',
          cite: {
            source: 'palquest-charif-meanings-of-the-nakba',
            loc: { section: 'Meanings of the Nakba', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.palquest.org/en/highlight/6585/meanings-nakba'
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
            value: { d: '1948-05-14' },
            cites: [
              {
                source: 'state-dept-milestones-creation-of-israel',
                loc: { section: 'Creation of Israel, 1948', para: '1' }
              },
              {
                source: 'loc-israel-country-study-1988',
                loc: { section: 'Prelude to Statehood', para: '7' }
              },
              {
                source: 'avalon-israeli-declaration-of-independence',
                loc: { section: 'Declaration of Israel\'s Independence 1948' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q12',
        text: 'ACCORDINGLY WE, MEMBERS OF THE PEOPLE\'S COUNCIL, REPRESENTATIVES OF THE JEWISH COMMUNITY OF ERETZ-ISRAEL AND OF THE ZIONIST MOVEMENT, ARE HERE ASSEMBLED ON THE DAY OF THE TERMINATION OF THE BRITISH MANDATE OVER ERETZ-ISRAEL AND, BY VIRTUE OF OUR NATURAL AND HISTORIC RIGHT AND ON THE STRENGTH OF THE RESOLUTION OF THE UNITED NATIONS GENERAL ASSEMBLY, HEREBY DECLARE THE ESTABLISHMENT OF A JEWISH STATE IN ERETZ-ISRAEL, TO BE KNOWN AS THE STATE OF ISRAEL.',
        lang: 'en',
        cite: {
          source: 'avalon-israeli-declaration-of-independence',
          loc: { section: 'Declaration of Israel\'s Independence 1948' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://avalon.law.yale.edu/20th_century/israel.asp'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1948-09-17' },
            cites: [
              {
                source: 'loc-israel-country-study-1988',
                loc: { section: 'Prelude to Statehood', para: '10' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q13',
        text: 'Early in the conflict, on May 29, 1948, the UN Security Council established the Truce Commission headed by a UN mediator, Swedish diplomat Folke Bernadotte, who was assassinated in Jerusalem on September 17, 1948.',
        lang: 'en',
        cite: {
          source: 'loc-israel-country-study-1988',
          loc: { section: 'Prelude to Statehood', para: '10' }
        },
        provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/israel/20.htm' }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1949-02-24' },
            cites: [
              {
                source: 'loc-israel-country-study-1988',
                loc: { section: 'Prelude to Statehood', para: '10' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q14',
        text: 'Armistice talks were initiated with Egypt in January 1949, and an armistice agreement was concluded with Egypt on February 24, with Lebanon on March 23, with Transjordan on April 3, and with Syria on July 20.',
        lang: 'en',
        cite: {
          source: 'loc-israel-country-study-1988',
          loc: { section: 'Prelude to Statehood', para: '10' }
        },
        provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/israel/20.htm' }
      }
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/a/a7/Israel_Declaration_of_Independence_Kaplan.jpg/1280px-Israel_Declaration_of_Independence_Kaplan.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Israel_Declaration_of_Independence_Kaplan.jpg',
    credit: { institution: 'National Photo Collection of Israel', creator: 'Zoltan Kluger' },
    license: { id: 'public-domain' }
  }
})
