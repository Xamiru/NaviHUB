import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'soviet-afghan-war',
  names: [
    { text: 'Soviet–Afghan War', lang: 'en', role: 'primary' },
    { text: 'Война в Афганистане', lang: 'ru', role: 'native' },
    { text: 'جنگ شوروی در افغانستان', lang: 'fa', role: 'native' }
  ],
  researched: '2026-10-10',
  type: 'war',
  start: {
    alts: [
      {
        value: { d: '1979-12' },
        cites: [
          {
            source: 'state-dept-milestones-soviet-invasion-of-afghanistan',
            loc: {
              section: 'The Soviet Invasion of Afghanistan and the U.S. Response, 1978–1980',
              para: '1'
            }
          }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1989-02' },
        cites: [
          {
            source: 'loc-afghanistan-country-study-2001',
            loc: { section: 'The Geneva Accords, 1987-89', para: '3' }
          }
        ]
      }
    ]
  },
  regions: ['russia-central-asia', 'south-asia'],
  prominence: 2,
  partOf: [
    { ref: 'period:cold-war' }
  ],
  polities: [
    { ref: 'polity:soviet-union' },
    { ref: 'polity:democratic-republic-of-afghanistan' },
    { ref: 'polity:united-states' },
    { ref: 'polity:pakistan' }
  ],
  sides: [
    {
      key: 'soviet-dra',
      name: 'Soviet forces and the Democratic Republic of Afghanistan',
      polity: 'polity:democratic-republic-of-afghanistan',
      cites: [
        {
          source: 'loc-afghanistan-country-study-2001',
          loc: { section: 'Soviet Control and Marxist Government, 1980-89', para: '1' }
        }
      ]
    },
    {
      key: 'mujahidin',
      name: 'Mujahidin',
      cites: [
        {
          source: 'loc-afghanistan-country-study-2001',
          loc: { section: 'The Soviet Decision to Withdraw, 1986-88', para: '1' }
        }
      ]
    }
  ],
  participants: [
    {
      ref: 'person:mikhail-gorbachev',
      role: 'leader',
      side: 'soviet-dra',
      cites: [
        {
          source: 'loc-afghanistan-country-study-2001',
          loc: { section: 'The Soviet Decision to Withdraw, 1986-88', para: '3' }
        }
      ]
    },
    {
      ref: 'person:babrak-karmal',
      role: 'head-of-state',
      side: 'soviet-dra',
      cites: [
        {
          source: 'loc-afghanistan-country-study-2001',
          loc: { section: 'Soviet Control and Marxist Government, 1980-89', para: '1' }
        }
      ]
    },
    {
      name: 'Najibullah',
      role: 'head-of-state',
      side: 'soviet-dra',
      cites: [
        {
          source: 'loc-afghanistan-country-study-2001',
          loc: { section: 'The Soviet Decision to Withdraw, 1986-88', para: '3' }
        }
      ]
    },
    {
      name: 'Diego Cordovez',
      role: 'negotiator',
      cites: [
        {
          source: 'loc-afghanistan-country-study-2001',
          loc: { section: 'The Geneva Accords, 1987-89', para: '2' }
        }
      ]
    }
  ],
  related: [
    {
      ref: 'event:saur-revolution',
      rel: 'preceded-by',
      cites: [
        {
          source: 'loc-afghanistan-country-study-2001',
          loc: { section: 'Usurpation, Invasion and War: 1978-92', para: '2' }
        }
      ]
    },
    {
      ref: 'event:soviet-invasion-of-afghanistan',
      rel: 'related',
      cites: [
        {
          source: 'state-dept-milestones-soviet-invasion-of-afghanistan',
          loc: {
            section: 'The Soviet Invasion of Afghanistan and the U.S. Response, 1978–1980',
            para: '1'
          }
        }
      ]
    },
    {
      ref: 'event:soviet-withdrawal-from-afghanistan',
      rel: 'related',
      cites: [
        {
          source: 'loc-afghanistan-country-study-2001',
          loc: { section: 'The Geneva Accords, 1987-89', para: '3' }
        }
      ]
    },
    {
      ref: 'event:perestroika-and-glasnost',
      rel: 'related',
      cites: [
        {
          source: 'loc-afghanistan-country-study-2001',
          loc: { section: 'The Soviet Decision to Withdraw, 1986-88', para: '3' }
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
          text: 'At the end of December 1979, the Soviet Union sent thousands of troops into Afghanistan and immediately assumed complete military and political control of Kabul and large portions of the country. This event began a brutal, decade-long attempt by Moscow to subdue the Afghan civil war and maintain a friendly and socialist government on its border.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-soviet-invasion-of-afghanistan',
            loc: {
              section: 'The Soviet Invasion of Afghanistan and the U.S. Response, 1978–1980',
              para: '1'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'https://history.state.gov/milestones/1977-1980/soviet-invasion-afghanistan'
          }
        },
        {
          id: 'q2',
          text: 'It was a watershed event of the Cold War, marking the only time the Soviet Union invaded a country outside the Eastern Bloc—a strategic decision met by nearly worldwide condemnation.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-soviet-invasion-of-afghanistan',
            loc: {
              section: 'The Soviet Invasion of Afghanistan and the U.S. Response, 1978–1980',
              para: '1'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'https://history.state.gov/milestones/1977-1980/soviet-invasion-afghanistan'
          }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q3',
          text: 'In the summer of 1973, Mohammed Daoud, the former Afghan Prime Minister, launched a successful coup against King Zahir.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-soviet-invasion-of-afghanistan',
            loc: {
              section: 'The Soviet Invasion of Afghanistan and the U.S. Response, 1978–1980',
              para: '3'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'https://history.state.gov/milestones/1977-1980/soviet-invasion-afghanistan'
          }
        },
        {
          id: 'q4',
          text: 'With Muhammad Daud\'s death, the government of Afghanistan was run by a divided, dilettante Marxist clique that launched a train of events eventually leading to the disintegration of the state.',
          lang: 'en',
          cite: {
            source: 'loc-afghanistan-country-study-2001',
            loc: { section: 'Usurpation, Invasion and War: 1978-92', para: '2' }
          },
          provenance: { via: 'web', at: '2026-10-10', url: 'http://countrystudies.us/afghanistan/89.htm' }
        },
        {
          id: 'q5',
          text: 'The Khalq leadership proved incapable of filling this vacuum.',
          lang: 'en',
          cite: {
            source: 'loc-afghanistan-country-study-2001',
            loc: { section: 'Usurpation, Invasion and War: 1978-92', para: '9' }
          },
          provenance: { via: 'web', at: '2026-10-10', url: 'http://countrystudies.us/afghanistan/89.htm' }
        }
      ]
    },
    {
      kind: 'course',
      quotes: [
        {
          id: 'q6',
          text: 'When Babrak Karmal was installed as head of state by invading Soviet forces at the beginning of 1980, his government faced crippling disabilities.',
          lang: 'en',
          cite: {
            source: 'loc-afghanistan-country-study-2001',
            loc: { section: 'Soviet Control and Marxist Government, 1980-89', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-10', url: 'http://countrystudies.us/afghanistan/90.htm' }
        },
        {
          id: 'q7',
          text: 'These changes in the war came at the peak of the fighting.',
          lang: 'en',
          cite: {
            source: 'loc-afghanistan-country-study-2001',
            loc: { section: 'The Soviet Decision to Withdraw, 1986-88', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-10', url: 'http://countrystudies.us/afghanistan/96.htm' }
        },
        {
          id: 'q8',
          text: 'At the same time a sharp increase in military support for the mujahidin from the United States and Saudi Arabia allowed it to regain the guerilla war initiative.',
          lang: 'en',
          cite: {
            source: 'loc-afghanistan-country-study-2001',
            loc: { section: 'The Soviet Decision to Withdraw, 1986-88', para: '2' }
          },
          provenance: { via: 'web', at: '2026-10-10', url: 'http://countrystudies.us/afghanistan/96.htm' }
        },
        {
          id: 'q9',
          text: 'These shifts in momentum reinforced the inclination of the new Gorbachev government to view further escalation of the war as a misuse of Soviet political and military capital.',
          lang: 'en',
          cite: {
            source: 'loc-afghanistan-country-study-2001',
            loc: { section: 'The Soviet Decision to Withdraw, 1986-88', para: '3' }
          },
          provenance: { via: 'web', at: '2026-10-10', url: 'http://countrystudies.us/afghanistan/96.htm' }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q10',
          text: 'The Soviets left Afghanistan deep in winter with intimations of panic among Kabul officials.',
          lang: 'en',
          cite: {
            source: 'loc-afghanistan-country-study-2001',
            loc: { section: 'Stalemate: The Civil War, 1989-92', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-10', url: 'http://countrystudies.us/afghanistan/100.htm' }
        },
        {
          id: 'q11',
          text: 'Immediately after the Soviet departure, Najibullah pulled down the façade of shared government.',
          lang: 'en',
          cite: {
            source: 'loc-afghanistan-country-study-2001',
            loc: { section: 'Stalemate: The Civil War, 1989-92', para: '6' }
          },
          provenance: { via: 'web', at: '2026-10-10', url: 'http://countrystudies.us/afghanistan/100.htm' }
        },
        {
          id: 'q12',
          text: 'The Geneva process failed to prevent the further carnage which a political solution among Afghans might have prevented or lessened.',
          lang: 'en',
          cite: {
            source: 'loc-afghanistan-country-study-2001',
            loc: { section: 'The Failure to Bring Peace', para: '2' }
          },
          provenance: { via: 'web', at: '2026-10-10', url: 'http://countrystudies.us/afghanistan/98.htm' }
        }
      ]
    },
    {
      kind: 'legacy',
      quotes: [
        {
          id: 'q13',
          text: 'The accords thus facilitated a withdrawal by an erstwhile superpower, in a manner which justified an invasion.',
          lang: 'en',
          cite: {
            source: 'loc-afghanistan-country-study-2001',
            loc: { section: 'The Geneva Accords, 1987-89', para: '5' }
          },
          provenance: { via: 'web', at: '2026-10-10', url: 'http://countrystudies.us/afghanistan/97.htm' }
        }
      ]
    }
  ],
  course: [
    {
      date: {
        alts: [
          {
            value: { d: '1979-12-24' },
            cites: [
              {
                source: 'state-dept-milestones-soviet-invasion-of-afghanistan',
                loc: {
                  section: 'The Soviet Invasion of Afghanistan and the U.S. Response, 1978–1980',
                  para: '6'
                }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q14',
        text: 'Finally, on Christmas Eve, the invasion began.',
        lang: 'en',
        cite: {
          source: 'state-dept-milestones-soviet-invasion-of-afghanistan',
          loc: {
            section: 'The Soviet Invasion of Afghanistan and the U.S. Response, 1978–1980',
            para: '6'
          }
        },
        provenance: {
          via: 'web',
          at: '2026-10-10',
          url: 'https://history.state.gov/milestones/1977-1980/soviet-invasion-afghanistan'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1986-08' },
            cites: [
              {
                source: 'loc-afghanistan-country-study-2001',
                loc: { section: 'The Soviet Decision to Withdraw, 1986-88', para: '2' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q16',
        text: 'By late August 1986, the first Stinger ground-to-air missiles were used successfully.',
        lang: 'en',
        cite: {
          source: 'loc-afghanistan-country-study-2001',
          loc: { section: 'The Soviet Decision to Withdraw, 1986-88', para: '2' }
        },
        provenance: { via: 'web', at: '2026-10-10', url: 'http://countrystudies.us/afghanistan/96.htm' }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1988-05' },
            cites: [
              {
                source: 'loc-afghanistan-country-study-2001',
                loc: { section: 'The Geneva Accords, 1987-89', para: '3' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q17',
        text: 'But at its core was an agreement reached in May 1988 that authorized the withdrawal of "foreign troops" according to a timetable that would remove all Soviet forces by February 15, 1989.',
        lang: 'en',
        cite: {
          source: 'loc-afghanistan-country-study-2001',
          loc: { section: 'The Geneva Accords, 1987-89', para: '3' }
        },
        provenance: { via: 'web', at: '2026-10-10', url: 'http://countrystudies.us/afghanistan/97.htm' }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1989-05' },
            cites: [
              {
                source: 'loc-afghanistan-country-study-2001',
                loc: { section: 'Stalemate: The Civil War, 1989-92', para: '2' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q15',
        text: 'By May 1989 it was clear that the Kabul forces in Jalalabad had held.',
        lang: 'en',
        cite: {
          source: 'loc-afghanistan-country-study-2001',
          loc: { section: 'Stalemate: The Civil War, 1989-92', para: '2' }
        },
        provenance: { via: 'web', at: '2026-10-10', url: 'http://countrystudies.us/afghanistan/100.htm' }
      }
    }
  ],
  hero: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/4/41/RIAN_archive_642790_Soviet_troop_withdrawal_from_Afghanistan.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:RIAN_archive_642790_Soviet_troop_withdrawal_from_Afghanistan.jpg',
    credit: { institution: 'RIA Novosti archive', creator: 'V. Kiselev' },
    license: { id: 'cc-by-sa', version: '3.0', url: 'https://creativecommons.org/licenses/by-sa/3.0' }
  }
})
