import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'algiers-accords-and-release-of-the-us-hostages',
  names: [
    { text: 'Algiers Accords and release of the US hostages', lang: 'en', role: 'primary' },
    { text: 'بیانیه‌های الجزایر و آزادی گروگان‌های آمریکایی', lang: 'fa', role: 'native' },
    { text: 'Algiers Declarations', lang: 'en', role: 'alternative' }
  ],
  researched: '2026-10-08',
  type: 'treaty',
  start: {
    alts: [
      {
        value: { d: '1981-01-19' },
        cites: [
          {
            source: 'reagan-1985-message-to-congress-national-emergency-iran',
            loc: {
              section: 'Message to the Congress Reporting on the National Emergency With Respect to Iran',
              para: '2'
            }
          }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1981-01-20' },
        cites: [
          {
            source: 'iranica-milani-hostage-crisis',
            loc: { section: 'HOSTAGE CRISIS', para: '50' }
          },
          {
            source: 'loc-iran-country-study-1987',
            loc: { section: 'THE BANI SADR PRESIDENCY', para: '9' }
          },
          {
            source: 'state-dept-short-history-end-to-hostage-crisis',
            loc: { section: 'An End to the Hostage Crisis', para: '1' }
          }
        ]
      }
    ]
  },
  regions: ['iran', 'north-america'],
  prominence: 2,
  places: [
    {
      ref: 'place:algiers',
      cites: [
        {
          source: 'iranica-milani-hostage-crisis',
          loc: { section: 'HOSTAGE CRISIS', para: '47' }
        }
      ]
    },
    {
      ref: 'place:tehran',
      cites: [
        {
          source: 'iranica-milani-hostage-crisis',
          loc: { section: 'HOSTAGE CRISIS', para: '50' }
        }
      ]
    }
  ],
  polities: [
    {
      ref: 'polity:islamic-republic-of-iran',
      cites: [
        {
          source: 'iranica-milani-hostage-crisis',
          loc: { section: 'HOSTAGE CRISIS', para: '48' }
        }
      ]
    },
    {
      ref: 'polity:united-states',
      cites: [
        {
          source: 'state-dept-short-history-end-to-hostage-crisis',
          loc: { section: 'An End to the Hostage Crisis', para: '1' }
        }
      ]
    }
  ],
  sides: [
    {
      key: 'iran',
      name: 'Iran',
      polity: 'polity:islamic-republic-of-iran',
      cites: [
        {
          source: 'iranica-milani-hostage-crisis',
          loc: { section: 'HOSTAGE CRISIS', para: '48' }
        }
      ]
    },
    {
      key: 'us',
      name: 'United States',
      polity: 'polity:united-states',
      cites: [
        {
          source: 'state-dept-short-history-end-to-hostage-crisis',
          loc: { section: 'An End to the Hostage Crisis', para: '1' }
        }
      ]
    }
  ],
  participants: [
    {
      ref: 'person:ruhollah-khomeini',
      role: 'leader',
      side: 'iran',
      cites: [
        {
          source: 'iranica-milani-hostage-crisis',
          loc: { section: 'HOSTAGE CRISIS', para: '47' }
        }
      ]
    },
    {
      name: 'Behzad Nabavi',
      role: 'negotiator',
      side: 'iran',
      cites: [
        {
          source: 'iranica-milani-hostage-crisis',
          loc: { section: 'HOSTAGE CRISIS', para: '48' }
        }
      ]
    },
    {
      name: 'Sadeq Tabatabai',
      role: 'negotiator',
      side: 'iran',
      cites: [
        {
          source: 'iranica-milani-hostage-crisis',
          loc: { section: 'HOSTAGE CRISIS', para: '47' }
        }
      ]
    },
    {
      name: 'Mohammad-Ali Rajai',
      role: 'head-of-government',
      side: 'iran',
      cites: [
        {
          source: 'loc-iran-country-study-1987',
          loc: { section: 'THE BANI SADR PRESIDENCY', para: '9' }
        }
      ]
    },
    {
      ref: 'person:akbar-hashemi-rafsanjani',
      role: 'participant',
      side: 'iran',
      cites: [
        {
          source: 'iranica-milani-hostage-crisis',
          loc: { section: 'HOSTAGE CRISIS', para: '52' }
        }
      ]
    },
    {
      ref: 'person:abolhassan-banisadr',
      role: 'participant',
      side: 'iran',
      cites: [
        {
          source: 'iranica-milani-hostage-crisis',
          loc: { section: 'HOSTAGE CRISIS', para: '51' }
        }
      ]
    },
    {
      name: 'Warren Christopher',
      role: 'negotiator',
      side: 'us',
      cites: [
        {
          source: 'state-dept-short-history-end-to-hostage-crisis',
          loc: { section: 'An End to the Hostage Crisis', para: '1' }
        }
      ]
    },
    {
      ref: 'person:jimmy-carter',
      role: 'head-of-state',
      side: 'us',
      cites: [
        {
          source: 'state-dept-short-history-end-to-hostage-crisis',
          loc: { section: 'An End to the Hostage Crisis', para: '1' }
        }
      ]
    },
    {
      ref: 'person:ronald-reagan',
      role: 'head-of-state',
      side: 'us',
      cites: [
        {
          source: 'loc-iran-country-study-1987',
          loc: { section: 'THE BANI SADR PRESIDENCY', para: '9' }
        }
      ]
    },
    {
      name: 'Algerian government',
      role: 'negotiator',
      cites: [
        {
          source: 'iranica-milani-hostage-crisis',
          loc: { section: 'HOSTAGE CRISIS', para: '47' }
        }
      ]
    }
  ],
  related: [
    { ref: 'event:iran-hostage-crisis', rel: 'preceded-by' },
    {
      ref: 'event:iran-iraq-war',
      rel: 'related',
      cites: [
        {
          source: 'iranica-milani-hostage-crisis',
          loc: { section: 'HOSTAGE CRISIS', para: '45' }
        }
      ]
    },
    {
      ref: 'event:impeachment-of-abolhassan-banisadr',
      rel: 'related',
      cites: [
        {
          source: 'iranica-milani-hostage-crisis',
          loc: { section: 'HOSTAGE CRISIS', para: '51' }
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
          text: 'On January 20, 1981, the hostages were finally freed—but only after Ronald Reagan had been sworn in as president.',
          lang: 'en',
          cite: {
            source: 'state-dept-short-history-end-to-hostage-crisis',
            loc: { section: 'An End to the Hostage Crisis', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://history.state.gov/departmenthistory/short-history/hostageend'
          }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q2',
          text: 'Although Deputy Secretary of State Warren Christopher had completed negotiations under Algerian auspices to free the American hostages in Tehran, President Carter and Secretary of State Edmund S. Muskie, suffered to their last day in office.',
          lang: 'en',
          cite: {
            source: 'state-dept-short-history-end-to-hostage-crisis',
            loc: { section: 'An End to the Hostage Crisis', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://history.state.gov/departmenthistory/short-history/hostageend'
          }
        },
        {
          id: 'q3',
          text: 'At the same time, the ongoing hostage crisis was beginning to have more negative consequences than positive results, such as Iran’s isolation, war with Iraq, and the continuing economic sanctions. Iran’s willingness to negotiate at this point was the segue to the final phase of the hostage crisis.',
          lang: 'en',
          cite: {
            source: 'iranica-milani-hostage-crisis',
            loc: { section: 'HOSTAGE CRISIS', para: '46' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.iranicaonline.org/articles/hostage-crisis/'
          }
        },
        {
          id: 'q4',
          text: 'Although U.S. private banks and some Iranian officials had held their own secret discussions as early as May 1980, it was only in early September, before the start of the war with Iraq, that the German ambassador to the U.S. informed the Carter Administration that Iran was prepared to settle the crisis.',
          lang: 'en',
          cite: {
            source: 'iranica-milani-hostage-crisis',
            loc: { section: 'HOSTAGE CRISIS', para: '47' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.iranicaonline.org/articles/hostage-crisis/'
          }
        },
        {
          id: 'q5',
          text: 'In September 1980, perhaps believing the hostage crisis could serve no further diplomatic or political end, the Rajai government indicated to Washington through a diplomat of the Federal Republic of Germany (West Germany) that it was ready to negotiate in earnest for the release of the hostages. Talks opened on September 14 in West Germany and continued for the next four months, with the Algerians acting as intermediaries.',
          lang: 'en',
          cite: {
            source: 'loc-iran-country-study-1987',
            loc: { section: 'THE BANI SADR PRESIDENCY', para: '9' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/iran/25.htm' }
        }
      ]
    },
    {
      kind: 'course',
      quotes: [
        {
          id: 'q6',
          text: 'Warren Christopher, former Deputy Secretary of State, secretly met with Ṣādeq Ṭabāṭabāʾi. At Ṭabāṭabāʾi’s request, the German Foreign Minister also attended the meeting. This was the start of the final negotiations for the release of the hostages. Algeria was the main intermediary in these secret negotiations',
          lang: 'en',
          cite: {
            source: 'iranica-milani-hostage-crisis',
            loc: { section: 'HOSTAGE CRISIS', para: '47' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://www.iranicaonline.org/articles/hostage-crisis/'
          }
        },
        {
          id: 'q7',
          text: 'Secretary of State Edmund Muskie agreed in principle with the four conditions. The resulting negotiations produced the Algiers Agreement, which led to the release of the hostages',
          lang: 'en',
          cite: {
            source: 'iranica-milani-hostage-crisis',
            loc: { section: 'HOSTAGE CRISIS', para: '48' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.iranicaonline.org/articles/hostage-crisis/'
          }
        },
        {
          id: 'q8',
          text: 'According to the Algiers Agreement, or what the militant students called a bayāniya or declaration, “the United States pledges that it is and from now will be the policy of the United States not to intervene, directly or indirectly, politically or militarily, in Iran’s internal affairs”',
          lang: 'en',
          cite: {
            source: 'iranica-milani-hostage-crisis',
            loc: { section: 'HOSTAGE CRISIS', para: '49' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.iranicaonline.org/articles/hostage-crisis/'
          }
        },
        {
          id: 'q9',
          text: 'Two days before the inauguration of President-Elect Ronald Reagan, the Majles officially approved the Algiers Agreement.',
          lang: 'en',
          cite: {
            source: 'iranica-milani-hostage-crisis',
            loc: { section: 'HOSTAGE CRISIS', para: '50' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.iranicaonline.org/articles/hostage-crisis/'
          }
        },
        {
          id: 'q10',
          text: 'None of the hostages was killed, but many were emotionally and psychologically harmed during their 444 days of captivity',
          lang: 'en',
          cite: {
            source: 'iranica-milani-hostage-crisis',
            loc: { section: 'HOSTAGE CRISIS', para: '50' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.iranicaonline.org/articles/hostage-crisis/'
          }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q11',
          text: 'The United States in return released US$11 to US$12 billion in Iranian funds that had been frozen by presidential order. Iran, however, agreed to repay US$5.1 billion in syndicated and nonsyndicated loans owed to United States and foreign banks and to place another US$1 billion in an escrow account, pending the settlement of claims filed against Iran by United States firms and citizens.',
          lang: 'en',
          cite: {
            source: 'loc-iran-country-study-1987',
            loc: { section: 'THE BANI SADR PRESIDENCY', para: '9' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/iran/25.htm' }
        },
        {
          id: 'q12',
          text: 'The agreement established an international tribunal for the judgement of commercial claims of U.S. citizens against Iran; this tribunal was backed with $1.4 billion from Iranian assets.',
          lang: 'en',
          cite: {
            source: 'iranica-milani-hostage-crisis',
            loc: { section: 'HOSTAGE CRISIS', para: '49' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.iranicaonline.org/articles/hostage-crisis/'
          }
        },
        {
          id: 'q13',
          text: 'The Algiers Agreement provided President Bani Ṣadr and former Premier Bāzargān with ammunition against Premier Rejāʾi, Nabavi, and the leftist Islamists. They emphasized that Americans made no official apology, the hostages were not tried, the shah’s wealth was not returned, and that Iran had lost access to its assets in the U.S. for over a year. The hostage crisis, they argued, made Iran a pariah state and vulnerable to Iraqi invasion.',
          lang: 'en',
          cite: {
            source: 'iranica-milani-hostage-crisis',
            loc: { section: 'HOSTAGE CRISIS', para: '51' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.iranicaonline.org/articles/hostage-crisis/'
          }
        },
        {
          id: 'q14',
          text: 'The regime tried to sell the agreement as a major victory over the “Great Satan.” Speaker Rafsanjāni declared the hostage crisis to have proven that a Third World nation could challenge the world’s mightiest military power. “We demonstrated that the decision is with us. When we desired, we talked. When we desired, we remained silent; we got everything we wanted”',
          lang: 'en',
          cite: {
            source: 'iranica-milani-hostage-crisis',
            loc: { section: 'HOSTAGE CRISIS', para: '52' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.iranicaonline.org/articles/hostage-crisis/'
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
            value: { d: '1980-09-12' },
            cites: [
              {
                source: 'iranica-milani-hostage-crisis',
                loc: { section: 'HOSTAGE CRISIS', para: '47' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q15',
        text: 'On September 12th, 1980, Ayatollah Khomeini declared four conditions for the resolution of the crisis: (1) the return of the shah’s wealth to Iran; (2) cancellation of all financial claims against Iran; (3) a pledge of military and political non-interference in Iran; and (4) the release of Iranian assets.',
        lang: 'en',
        cite: {
          source: 'iranica-milani-hostage-crisis',
          loc: { section: 'HOSTAGE CRISIS', para: '47' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-08',
          url: 'https://www.iranicaonline.org/articles/hostage-crisis/'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1980-11-02' },
            cites: [
              {
                source: 'iranica-milani-hostage-crisis',
                loc: { section: 'HOSTAGE CRISIS', para: '48' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q16',
        text: 'The Majles approved the four conditions set by Khomeini on November 2, but in greater detail, appointing seven deputies with Behzād Nabavi, a leading radical, as the chief negotiator to manage the secret negotiations.',
        lang: 'en',
        cite: {
          source: 'iranica-milani-hostage-crisis',
          loc: { section: 'HOSTAGE CRISIS', para: '48' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-08',
          url: 'https://www.iranicaonline.org/articles/hostage-crisis/'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1981-01-19' },
            cites: [
              {
                source: 'reagan-1985-message-to-congress-national-emergency-iran',
                loc: {
                  section: 'Message to the Congress Reporting on the National Emergency With Respect to Iran',
                  para: '2'
                }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q17',
        text: 'The Iran-United States Claims Tribunal, established at The Hague pursuant to the Claims Settlement Agreement of January 19, 1981 (the ``Algiers Accords\'\'), continues to make progress in arbitrating the claims before it.',
        lang: 'en',
        cite: {
          source: 'reagan-1985-message-to-congress-national-emergency-iran',
          loc: {
            section: 'Message to the Congress Reporting on the National Emergency With Respect to Iran',
            para: '2'
          }
        },
        provenance: {
          via: 'web',
          at: '2026-10-08',
          url: 'https://www.reaganlibrary.gov/archives/speech/message-congress-reporting-national-emergency-respect-iran'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1981-01-20' },
            cites: [
              {
                source: 'iranica-milani-hostage-crisis',
                loc: { section: 'HOSTAGE CRISIS', para: '50' }
              },
              {
                source: 'loc-iran-country-study-1987',
                loc: { section: 'THE BANI SADR PRESIDENCY', para: '9' }
              },
              {
                source: 'state-dept-short-history-end-to-hostage-crisis',
                loc: { section: 'An End to the Hostage Crisis', para: '1' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q18',
        text: 'On 20 January after the Bank of England confirmed the transfer of funds, the hostages were taken by bus to the Mehrābād Airport in Tehran. Less than one hour after the Reagan’s inauguration, three Algerian aircraft took to the skies, taking all hostages to freedom.',
        lang: 'en',
        cite: {
          source: 'iranica-milani-hostage-crisis',
          loc: { section: 'HOSTAGE CRISIS', para: '50' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-08',
          url: 'https://www.iranicaonline.org/articles/hostage-crisis/'
        }
      }
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/1/10/President_Ronald_Reagan_Speaking_at_a_White_House_Ceremony_and_Reception_for_Freed_American_Hostages_Held_in_Iran_As_President_Ronald_Reagan_Listens_on_The_South_Lawn_-_DPLA_-_6db1abc0bf88809e7e1bb2b76aca973d.jpg/1280px-thumbnail.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:President_Ronald_Reagan_Speaking_at_a_White_House_Ceremony_and_Reception_for_Freed_American_Hostages_Held_in_Iran_As_President_Ronald_Reagan_Listens_on_The_South_Lawn_-_DPLA_-_6db1abc0bf88809e7e1bb2b76aca973d.jpg',
    credit: {
      institution: 'Ronald Reagan Presidential Library (White House Photographic Office, via DPLA)',
      creator: 'White House Photographic Office'
    },
    license: { id: 'public-domain' }
  }
})
