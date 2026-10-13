import { defineEvent } from '../../schema'

export default defineEvent({
  id: '2005-iranian-presidential-election',
  names: [
    { text: '2005 Iranian presidential election', lang: 'en', role: 'primary' },
    { text: 'Ninth Iranian presidential election', lang: 'en', role: 'alternative' }
  ],
  researched: '2026-10-13',
  type: 'election',
  start: {
    alts: [
      {
        value: { d: '2005-06-17' },
        cites: [
          {
            source: 'hrw-2005-06-access-denied-irans-exclusionary-elections-summary',
            loc: { section: 'Access Denied: I. Summary and Recommendations', para: '1' }
          }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '2005-06-24' },
        cites: [
          {
            source: 'iran-data-portal-2005-presidential-election',
            loc: { section: '2005 Presidential Election' }
          }
        ]
      }
    ]
  },
  regions: ['iran'],
  prominence: 2,
  polities: [
    {
      ref: 'polity:islamic-republic-of-iran',
      cites: [
        {
          source: 'hrw-2005-06-access-denied-irans-exclusionary-elections-summary',
          loc: { section: 'Access Denied: I. Summary and Recommendations', para: '1' }
        }
      ]
    }
  ],
  participants: [
    {
      ref: 'person:mahmoud-ahmadinejad',
      role: 'participant',
      cites: [
        {
          source: 'hrw-2005-06-access-denied-irans-exclusionary-elections-summary',
          loc: { section: 'Access Denied: I. Summary and Recommendations', para: '5' }
        }
      ]
    },
    {
      ref: 'person:akbar-hashemi-rafsanjani',
      role: 'participant',
      cites: [
        {
          source: 'hrw-2005-06-access-denied-irans-exclusionary-elections-summary',
          loc: { section: 'Access Denied: I. Summary and Recommendations', para: '5' }
        }
      ]
    },
    {
      name: 'Mehdi Karroubi',
      role: 'participant',
      cites: [
        {
          source: 'hrw-2005-06-access-denied-irans-exclusionary-elections-summary',
          loc: { section: 'Access Denied: I. Summary and Recommendations', para: '5' }
        }
      ]
    },
    {
      name: 'Ali Larijani',
      role: 'participant',
      cites: [
        {
          source: 'hrw-2005-06-access-denied-irans-exclusionary-elections-summary',
          loc: { section: 'Access Denied: I. Summary and Recommendations', para: '5' }
        }
      ]
    },
    {
      name: 'Mohsen Rezai',
      role: 'participant',
      cites: [
        {
          source: 'hrw-2005-06-access-denied-irans-exclusionary-elections-summary',
          loc: { section: 'Access Denied: I. Summary and Recommendations', para: '5' }
        }
      ]
    },
    {
      name: 'Mohammad Bagher Qalibaf',
      role: 'participant',
      cites: [
        {
          source: 'hrw-2005-06-access-denied-irans-exclusionary-elections-summary',
          loc: { section: 'Access Denied: I. Summary and Recommendations', para: '5' }
        }
      ]
    },
    {
      name: 'Mostafa Moin',
      role: 'participant',
      cites: [
        {
          source: 'hrw-2005-06-access-denied-irans-exclusionary-elections-summary',
          loc: { section: 'Access Denied: I. Summary and Recommendations', para: '6' }
        }
      ]
    },
    {
      ref: 'person:ali-khamenei',
      role: 'head-of-state',
      cites: [
        {
          source: 'hrw-2005-06-access-denied-irans-exclusionary-elections-summary',
          loc: { section: 'Access Denied: I. Summary and Recommendations', para: '6' }
        }
      ]
    },
    {
      ref: 'person:mohammad-khatami',
      role: 'head-of-government',
      cites: [
        {
          source: 'hrw-2005-12-ministers-of-murder-irans-new-security-cabinet-introduction',
          loc: { section: 'Ministers of Murder: Introduction', para: '1' }
        }
      ]
    }
  ],
  related: [
    {
      ref: 'period:presidency-of-mahmoud-ahmadinejad',
      rel: 'led-to',
      cites: [
        {
          source: 'iranica-yarshater-chronology-part-4',
          loc: { section: 'Chronology of Iranian History Part 4, 2005' }
        }
      ]
    },
    {
      ref: 'period:presidency-of-mohammad-khatami',
      rel: 'followed-by',
      cites: [
        {
          source: 'iranica-yarshater-chronology-part-4',
          loc: { section: 'Chronology of Iranian History Part 4, 2005' }
        }
      ]
    },
    {
      ref: 'event:iranian-nuclear-program-crisis',
      rel: 'related',
      cites: [
        {
          source: 'acronym-2005-dd80-irans-nuclear-programme-eu-3-snubbed',
          loc: {
            section: 'Iran\'s Nuclear Programme: EU-3 Snubbed as Iran begins Uranium Conversion at Isfahan',
            para: '1'
          }
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
          text: 'Maḥmud Aḥmadinežād, the fundamentalist mayor of Tehran, is elected president of Iran, defeating ʿAli-Akbar Hāšemi Rafsanjāni.',
          lang: 'en',
          cite: {
            source: 'iranica-yarshater-chronology-part-4',
            loc: { section: 'Chronology of Iranian History Part 4, 2005' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/chronology-of-iranian-history-part-4/'
          }
        },
        {
          id: 'q2',
          text: 'On June 17, 2005, Iran holds its ninth presidential election, as well as mid-term elections for the seventh parliament.',
          lang: 'en',
          cite: {
            source: 'hrw-2005-06-access-denied-irans-exclusionary-elections-summary',
            loc: { section: 'Access Denied: I. Summary and Recommendations', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.hrw.org/legacy/backgrounder/mena/iran0605/1.htm'
          }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q3',
          text: 'The Guardian Council has consistently approved only candidates already associated with the ruling elite, known in Iranian political jargon as the “insiders” [khodi].',
          lang: 'en',
          cite: {
            source: 'hrw-2005-06-access-denied-irans-exclusionary-elections-summary',
            loc: { section: 'Access Denied: I. Summary and Recommendations', para: '4' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.hrw.org/legacy/backgrounder/mena/iran0605/1.htm'
          }
        },
        {
          id: 'q4',
          text: 'The exclusionary and discriminatory nature of Iran’s elections was evident during the parliamentary elections in February 2004.',
          lang: 'en',
          cite: {
            source: 'hrw-2005-06-access-denied-irans-exclusionary-elections-summary',
            loc: { section: 'Access Denied: I. Summary and Recommendations', para: '13' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.hrw.org/legacy/backgrounder/mena/iran0605/1.htm'
          }
        }
      ]
    },
    {
      kind: 'course',
      quotes: [
        {
          id: 'q5',
          text: 'The Council, for instance, disqualified two well-known reformists, former minister of higher education Mostafa Moin and Vice President Mohsen Mehralizadeh.',
          lang: 'en',
          cite: {
            source: 'hrw-2005-06-access-denied-irans-exclusionary-elections-summary',
            loc: { section: 'Access Denied: I. Summary and Recommendations', para: '6' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.hrw.org/legacy/backgrounder/mena/iran0605/1.htm'
          }
        },
        {
          id: 'q6',
          text: 'None of the eighty-nine women who registered their candidacy for the upcoming presidential elections were allowed to stand in the election.',
          lang: 'en',
          cite: {
            source: 'hrw-2005-06-access-denied-irans-exclusionary-elections-summary',
            loc: { section: 'Access Denied: I. Summary and Recommendations', para: '10' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.hrw.org/legacy/backgrounder/mena/iran0605/1.htm'
          }
        },
        {
          id: 'q7',
          text: 'All of the candidates on the presidential ballot are former or present government officials.',
          lang: 'en',
          cite: {
            source: 'hrw-2005-06-11-iran-clerical-leaders-foreclose-free-elections',
            loc: { section: 'Iran: Clerical Leaders Foreclose Free Elections', para: '7' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.hrw.org/news/2005/06/11/iran-clerical-leaders-foreclose-free-elections'
          }
        },
        {
          id: 'q8',
          text: 'Mohsen Rezai, whose candidacy was approved by the Guardian Council, dropped out of the race a few days before election day.',
          lang: 'en',
          cite: {
            source: 'iran-data-portal-2005-presidential-election',
            loc: { section: '2005 Presidential Election' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://irandataportal.syr.edu/2005-presidential-election'
          }
        },
        {
          id: 'q9',
          text: 'Initially, reports saw Karroubi in second place after Rafsanjani, which would have put the two into the second round of elections, but the final tally released by the Ministry of Interior placed Ahmadinejad ahead of Karroubi.',
          lang: 'en',
          cite: {
            source: 'iran-data-portal-2005-presidential-election',
            loc: { section: '2005 Presidential Election' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://irandataportal.syr.edu/2005-presidential-election'
          }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q10',
          text: 'In June 2005, Iranians elected Mahmoud Ahmadinejad, who had campaigned on a platform of improving economic conditions, as their new president.',
          lang: 'en',
          cite: {
            source: 'hrw-2005-12-ministers-of-murder-irans-new-security-cabinet-introduction',
            loc: { section: 'Ministers of Murder: Introduction', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.hrw.org/legacy/backgrounder/mena/iran1205/1.htm'
          }
        },
        {
          id: 'q11',
          text: 'Particularly troubling are President Ahmadinejad’s choices for the powerful positions of Minister of Interior, Mustafa Pour-Mohammadi, and Minister of Information, Gholamhussein Mohseni Ezhei.',
          lang: 'en',
          cite: {
            source: 'hrw-2005-12-ministers-of-murder-irans-new-security-cabinet-introduction',
            loc: { section: 'Ministers of Murder: Introduction', para: '3' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.hrw.org/legacy/backgrounder/mena/iran1205/1.htm'
          }
        },
        {
          id: 'q12',
          text: 'Respect for basic human rights in Iran, especially freedom of expression and opinion, deteriorated considerably in 2005.',
          lang: 'en',
          cite: {
            source: 'hrw-2006-world-report-iran',
            loc: { section: 'World Report 2006: Iran', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.hrw.org/world-report/2006/country-chapters/iran'
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
            value: { d: '2005-05-22' },
            cites: [
              {
                source: 'hrw-2005-06-access-denied-irans-exclusionary-elections-summary',
                loc: { section: 'Access Denied: I. Summary and Recommendations', para: '5' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q13',
        text: 'On May 22, the Guardian Council announced that only six of the 1,014 candidates who registered for the upcoming presidential elections were qualified to be placed on the ballot.',
        lang: 'en',
        cite: {
          source: 'hrw-2005-06-access-denied-irans-exclusionary-elections-summary',
          loc: { section: 'Access Denied: I. Summary and Recommendations', para: '5' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-13',
          url: 'https://www.hrw.org/legacy/backgrounder/mena/iran0605/1.htm'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '2005-05-23' },
            cites: [
              {
                source: 'hrw-2005-06-access-denied-irans-exclusionary-elections-summary',
                loc: { section: 'Access Denied: I. Summary and Recommendations', para: '6' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q14',
        text: 'On May 23, on the instructions of Supreme Leader Ayatollah Khamenei, the Guardian Council qualified Moin and Mehralizadeh.',
        lang: 'en',
        cite: {
          source: 'hrw-2005-06-access-denied-irans-exclusionary-elections-summary',
          loc: { section: 'Access Denied: I. Summary and Recommendations', para: '6' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-13',
          url: 'https://www.hrw.org/legacy/backgrounder/mena/iran0605/1.htm'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '2005-06-24' },
            cites: [
              {
                source: 'iran-data-portal-2005-presidential-election',
                loc: { section: '2005 Presidential Election' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q15',
        text: 'Most sources maintain that Ahmadinejad received 17,248,782 or 61.7% of the votes in the second round.',
        lang: 'en',
        cite: {
          source: 'iran-data-portal-2005-presidential-election',
          loc: { section: '2005 Presidential Election' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-13',
          url: 'https://irandataportal.syr.edu/2005-presidential-election'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '2005-08' },
            cites: [
              {
                source: 'hrw-2005-12-ministers-of-murder-irans-new-security-cabinet-introduction',
                loc: { section: 'Ministers of Murder: Introduction', para: '1' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q16',
        text: 'Ahmadinejad assumed his new post in early August 2005 with the backing of those political factions in Iran who most vigorously opposed political and social reforms initiated by his predecessor, Mohammad Khatami.',
        lang: 'en',
        cite: {
          source: 'hrw-2005-12-ministers-of-murder-irans-new-security-cabinet-introduction',
          loc: { section: 'Ministers of Murder: Introduction', para: '1' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-13',
          url: 'https://www.hrw.org/legacy/backgrounder/mena/iran1205/1.htm'
        }
      }
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/3/36/2005_Iranian_presidential_election_second_round_results.png/1280px-2005_Iranian_presidential_election_second_round_results.png',
    page: 'https://commons.wikimedia.org/wiki/File:2005_Iranian_presidential_election_second_round_results.png',
    credit: { creator: 'Jasper Chu' },
    license: { id: 'cc0' }
  }
})
