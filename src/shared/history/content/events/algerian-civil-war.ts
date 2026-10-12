import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'algerian-civil-war',
  names: [
    { text: 'Algerian Civil War', lang: 'en', role: 'primary' },
    { text: 'الحرب الأهلية الجزائرية', lang: 'ar', role: 'native' },
    { text: 'guerre civile algérienne', lang: 'fr', role: 'alternative' },
    { text: 'Algerian conflict', lang: 'en', role: 'alternative' }
  ],
  researched: '2026-10-13',
  type: 'war',
  start: {
    alts: [
      {
        value: { d: '1992-01-11' },
        cites: [
          {
            source: 'loc-algeria-country-study-1994',
            loc: { section: 'Return to Authoritarianism, January 11, 1992', para: '1' }
          }
        ]
      }
    ]
  },
  regions: ['mena'],
  prominence: 2,
  places: [
    {
      ref: 'place:algiers',
      cites: [
        {
          source: 'loc-algeria-country-study-1994',
          loc: { section: 'Return to Authoritarianism, January 11, 1992', para: '1' }
        }
      ]
    }
  ],
  sides: [
    {
      key: 'state',
      name: 'The Algerian government and security forces',
      cites: [
        {
          source: 'hrw-1998-world-report-algeria',
          loc: { section: 'World Report 1998: Algeria', para: '2' }
        }
      ]
    },
    {
      key: 'armed-groups',
      name: 'Armed Islamist groups',
      cites: [
        {
          source: 'hrw-1998-world-report-algeria',
          loc: { section: 'World Report 1998: Algeria', para: '2' }
        }
      ]
    }
  ],
  participants: [
    {
      name: 'Chadli Bendjedid',
      role: 'head-of-state',
      side: 'state',
      cites: [
        {
          source: 'loc-algeria-country-study-1994',
          loc: { section: 'Return to Authoritarianism, January 11, 1992', para: '1' }
        }
      ]
    },
    {
      name: 'Khaled Nezzar',
      role: 'commander',
      side: 'state',
      cites: [
        {
          source: 'loc-algeria-country-study-1994',
          loc: { section: 'Return to Authoritarianism, January 11, 1992', para: '1' }
        }
      ]
    },
    {
      name: 'Mohamed Boudiaf',
      role: 'head-of-state',
      side: 'state',
      cites: [
        {
          source: 'loc-algeria-country-study-1994',
          loc: { section: 'Return to Authoritarianism, January 11, 1992', para: '8' }
        }
      ]
    },
    {
      name: 'Abdelaziz Bouteflika',
      role: 'head-of-state',
      side: 'state',
      cites: [
        {
          source: 'hrw-2000-world-report-algeria',
          loc: { section: 'World Report 2000: Algeria', para: '1' }
        }
      ]
    },
    {
      name: 'Armed Islamic Group (GIA)',
      role: 'combatant',
      side: 'armed-groups',
      cites: [
        {
          source: 'hrw-1998-world-report-algeria',
          loc: { section: 'World Report 1998: Algeria', para: '4' }
        }
      ]
    },
    {
      name: 'Islamic Salvation Army (AIS)',
      role: 'combatant',
      side: 'armed-groups',
      cites: [
        {
          source: 'hrw-2000-world-report-algeria',
          loc: { section: 'World Report 2000: Algeria', para: '2' }
        }
      ]
    },
    {
      name: 'Islamic Salvation Front',
      role: 'participant',
      cites: [
        {
          source: 'loc-algeria-country-study-1994',
          loc: { section: 'Democratization, October 1988-January 11, 1992', para: '11' }
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
            value: { min: 100000, max: 200000 },
            cites: [
              {
                source: 'hrw-2005-03-03-human-rights-in-algeria',
                loc: { section: 'Human Rights in Algeria', para: '8' }
              }
            ],
            heldBy: [
              { kind: 'organization', name: 'Human Rights Watch' }
            ]
          },
          {
            value: { min: 150000 },
            cites: [
              {
                source: 'hrw-2005-03-03-human-rights-in-algeria',
                loc: { section: 'Human Rights in Algeria', para: '8' }
              }
            ],
            heldBy: [
              { kind: 'state', name: 'Algerian government (President Abdelaziz Bouteflika)' }
            ]
          }
        ]
      }
    }
  ],
  related: [
    {
      ref: 'event:algerian-war',
      rel: 'related',
      cites: [
        {
          source: 'loc-algeria-country-study-1994',
          loc: { section: 'Return to Authoritarianism, January 11, 1992', para: '6' }
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
          text: 'In January 1992, an army-backed coup in Algeria halted national elections that would have given the Islamist Salvation Front a commanding majority in parliament.',
          lang: 'en',
          cite: {
            source: 'hrw-2005-03-03-human-rights-in-algeria',
            loc: { section: 'Human Rights in Algeria', para: '7' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.hrw.org/news/2005/03/03/human-rights-algeria'
          }
        },
        {
          id: 'q2',
          text: 'The main adversaries were armed Islamist groups on the one hand and, on the other, the security forces and armed civilian groups allied with them.',
          lang: 'en',
          cite: {
            source: 'hrw-1998-world-report-algeria',
            loc: { section: 'World Report 1998: Algeria', para: '2' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.hrw.org/legacy/worldreport/Mideast-01.htm'
          }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q3',
          text: 'Nearly fifty political parties participated in the first round of the elections on December 26, 1991.',
          lang: 'en',
          cite: {
            source: 'loc-algeria-country-study-1994',
            loc: { section: 'Democratization, October 1988-January 11, 1992', para: '11' }
          },
          provenance: { via: 'web', at: '2026-10-13', url: 'http://countrystudies.us/algeria/114.htm' }
        },
        {
          id: 'q4',
          text: 'The military, however, quickly affirmed its unwillingness to see power transferred to a political party it regarded as a threat to the security and stability of the state.',
          lang: 'en',
          cite: {
            source: 'loc-algeria-country-study-1994',
            loc: { section: 'Democratization, October 1988-January 11, 1992', para: '12' }
          },
          provenance: { via: 'web', at: '2026-10-13', url: 'http://countrystudies.us/algeria/114.htm' }
        },
        {
          id: 'q5',
          text: 'The coup, led by the minister of defense Major General Khaled Nezzar, soon returned Algeria to an extremely tense state.',
          lang: 'en',
          cite: {
            source: 'loc-algeria-country-study-1994',
            loc: { section: 'Return to Authoritarianism, January 11, 1992', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-13', url: 'http://countrystudies.us/algeria/115.htm' }
        }
      ]
    },
    {
      kind: 'course',
      quotes: [
        {
          id: 'q6',
          text: 'Twenty months after the coup, the country was still being torn apart by constant fighting between Islamists and the military.',
          lang: 'en',
          cite: {
            source: 'loc-algeria-country-study-1994',
            loc: { section: 'Return to Authoritarianism, January 11, 1992', para: '9' }
          },
          provenance: { via: 'web', at: '2026-10-13', url: 'http://countrystudies.us/algeria/115.htm' }
        },
        {
          id: 'q7',
          text: 'The months following Boudiaf\'s assassination and Ghozali\'s resignation were marked by intensified efforts to suppress "terrorism."',
          lang: 'en',
          cite: {
            source: 'loc-algeria-country-study-1994',
            loc: { section: 'Return to Authoritarianism, January 11, 1992', para: '10' }
          },
          provenance: { via: 'web', at: '2026-10-13', url: 'http://countrystudies.us/algeria/115.htm' }
        },
        {
          id: 'q8',
          text: 'The year was marked by the first legislative and local elections since the last round of voting was cancelled in 1992.',
          lang: 'en',
          cite: {
            source: 'hrw-1998-world-report-algeria',
            loc: { section: 'World Report 1998: Algeria', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.hrw.org/legacy/worldreport/Mideast-01.htm'
          }
        },
        {
          id: 'q9',
          text: 'Many of the massacres occurred in districts that had voted overwhelmingly for the FIS in the 1990 and 1992 elections.',
          lang: 'en',
          cite: {
            source: 'hrw-1998-world-report-algeria',
            loc: { section: 'World Report 1998: Algeria', para: '5' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.hrw.org/legacy/worldreport/Mideast-01.htm'
          }
        },
        {
          id: 'q10',
          text: 'Dramatic political developments, coupled with a decline in violent incidents, fueled optimism among Algerians that the country had turned the corner on the worst years of civil strife.',
          lang: 'en',
          cite: {
            source: 'hrw-2000-world-report-algeria',
            loc: { section: 'World Report 2000: Algeria', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-13', url: 'https://www.hrw.org/legacy/wr2k/Mena-01.htm' }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q11',
          text: 'More than 1,500 people were killed in a tenth successive year of endemic political violence involving the security forces and armed groups claiming to be Islamist.',
          lang: 'en',
          cite: {
            source: 'hrw-2002-world-report-algeria',
            loc: { section: 'World Report 2002: Algeria', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-13', url: 'https://www.hrw.org/legacy/wr2k2/mena1.html' }
        },
        {
          id: 'q12',
          text: 'In the name of combating the insurgency, security forces arrested and tortured thousands of suspects.',
          lang: 'en',
          cite: {
            source: 'hrw-2005-03-03-human-rights-in-algeria',
            loc: { section: 'Human Rights in Algeria', para: '10' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.hrw.org/news/2005/03/03/human-rights-algeria'
          }
        },
        {
          id: 'q13',
          text: 'Over the last five years, there has been a significant decline in political violence.',
          lang: 'en',
          cite: {
            source: 'hrw-2005-03-03-human-rights-in-algeria',
            loc: { section: 'Human Rights in Algeria', para: '11' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.hrw.org/news/2005/03/03/human-rights-algeria'
          }
        },
        {
          id: 'q14',
          text: 'Over 100,000 Algerians died during the political strife of the 1990s.',
          lang: 'en',
          cite: {
            source: 'hrw-2010-world-report-algeria',
            loc: { section: 'World Report 2010: Algeria' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.hrw.org/world-report/2010/country-chapters/algeria'
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
            value: { d: '1991-12-26' },
            cites: [
              {
                source: 'loc-algeria-country-study-1994',
                loc: { section: 'Democratization, October 1988-January 11, 1992', para: '11' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q15',
        text: 'The result was another clear victory for the FIS and an equally clear humiliation for the FLN, which once again performed poorly.',
        lang: 'en',
        cite: {
          source: 'loc-algeria-country-study-1994',
          loc: { section: 'Democratization, October 1988-January 11, 1992', para: '11' }
        },
        provenance: { via: 'web', at: '2026-10-13', url: 'http://countrystudies.us/algeria/114.htm' }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1992-01-11' },
            cites: [
              {
                source: 'loc-algeria-country-study-1994',
                loc: { section: 'Return to Authoritarianism, January 11, 1992', para: '1' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q16',
        text: 'The coup initially went virtually unchallenged because even the FIS leadership discouraged its followers from provoking clashes with the military.',
        lang: 'en',
        cite: {
          source: 'loc-algeria-country-study-1994',
          loc: { section: 'Return to Authoritarianism, January 11, 1992', para: '3' }
        },
        provenance: { via: 'web', at: '2026-10-13', url: 'http://countrystudies.us/algeria/115.htm' }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1992-03' },
            cites: [
              {
                source: 'loc-algeria-country-study-1994',
                loc: { section: 'Return to Authoritarianism, January 11, 1992', para: '4' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q17',
        text: 'Within a month, near civil war occurred as Islamists struck back against the military crackdown.',
        lang: 'en',
        cite: {
          source: 'loc-algeria-country-study-1994',
          loc: { section: 'Return to Authoritarianism, January 11, 1992', para: '4' }
        },
        provenance: { via: 'web', at: '2026-10-13', url: 'http://countrystudies.us/algeria/115.htm' }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1992-06-29' },
            cites: [
              {
                source: 'loc-algeria-country-study-1994',
                loc: { section: 'Return to Authoritarianism, January 11, 1992', para: '8' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q18',
        text: 'On June 29, 1992, head of state Mohamed Boudiaf was assassinated during a public speech at the opening of a cultural center in Annaba.',
        lang: 'en',
        cite: {
          source: 'loc-algeria-country-study-1994',
          loc: { section: 'Return to Authoritarianism, January 11, 1992', para: '8' }
        },
        provenance: { via: 'web', at: '2026-10-13', url: 'http://countrystudies.us/algeria/115.htm' }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1997-09-26' },
            cites: [
              {
                source: 'hrw-1998-world-report-algeria',
                loc: { section: 'World Report 1998: Algeria', para: '4' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q19',
        text: 'The shadowy Armed Islamic Group (known by the acronym GIA) was blamed for much of the carnage and claimed responsibility for some of the killings.',
        lang: 'en',
        cite: {
          source: 'hrw-1998-world-report-algeria',
          loc: { section: 'World Report 1998: Algeria', para: '4' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-13',
          url: 'https://www.hrw.org/legacy/worldreport/Mideast-01.htm'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1999' },
            cites: [
              {
                source: 'hrw-2002-world-report-algeria',
                loc: { section: 'World Report 2002: Algeria', para: '5' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q20',
        text: 'The 1999 "Civil Harmony" law offering amnesty or leniency to surrendering militants, known as repentis, failed to end the political violence.',
        lang: 'en',
        cite: {
          source: 'hrw-2002-world-report-algeria',
          loc: { section: 'World Report 2002: Algeria', para: '5' }
        },
        provenance: { via: 'web', at: '2026-10-13', url: 'https://www.hrw.org/legacy/wr2k2/mena1.html' }
      }
    }
  ],
  hero: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/1/17/%D9%85%D8%AD%D9%85%D8%AF_%D8%A8%D9%88%D8%B6%D9%8A%D8%A7%D9%81_%D9%8A%D8%B5%D9%84_%D8%A5%D9%84%D9%89_%D8%A7%D9%84%D8%AC%D8%B2%D8%A7%D8%A6%D8%B1.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:%D9%85%D8%AD%D9%85%D8%AF_%D8%A8%D9%88%D8%B6%D9%8A%D8%A7%D9%81_%D9%8A%D8%B5%D9%84_%D8%A5%D9%84%D9%89_%D8%A7%D9%84%D8%AC%D8%B2%D8%A7%D8%A6%D8%B1.jpg',
    credit: { creator: 'Chitour2' },
    license: { id: 'cc0' }
  }
})
