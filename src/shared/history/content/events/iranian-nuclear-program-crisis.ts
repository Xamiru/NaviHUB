import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'iranian-nuclear-program-crisis',
  names: [
    { text: 'Iranian nuclear program crisis', lang: 'en', role: 'primary' },
    { text: 'Iran nuclear crisis', lang: 'en', role: 'alternative' },
    { text: 'Iran nuclear dispute', lang: 'en', role: 'alternative' }
  ],
  researched: '2026-10-13',
  type: 'crisis',
  start: {
    alts: [
      {
        value: { d: '2002-08' },
        cites: [
          {
            source: 'acronym-2005-dd80-irans-nuclear-programme-eu-3-snubbed',
            loc: {
              section: 'Iran\'s Nuclear Programme: EU-3 Snubbed as Iran begins Uranium Conversion at Isfahan',
              para: '10'
            }
          }
        ]
      }
    ]
  },
  regions: ['iran', 'global'],
  prominence: 1,
  polities: [
    {
      ref: 'polity:islamic-republic-of-iran',
      cites: [
        {
          source: 'acronym-2005-dd80-irans-nuclear-programme-eu-3-snubbed',
          loc: {
            section: 'Iran\'s Nuclear Programme: EU-3 Snubbed as Iran begins Uranium Conversion at Isfahan',
            para: '10'
          }
        }
      ]
    },
    {
      ref: 'polity:united-states',
      cites: [
        {
          source: 'acronym-2005-dd80-irans-nuclear-programme-eu-3-snubbed',
          loc: {
            section: 'Iran\'s Nuclear Programme: EU-3 Snubbed as Iran begins Uranium Conversion at Isfahan',
            para: '11'
          }
        }
      ]
    },
    {
      ref: 'polity:united-kingdom',
      cites: [
        {
          source: 'acronym-2003-10-21-e3-foreign-ministers-visit-to-tehran-agreed-statement',
          loc: {
            section: 'Agreed Statement at the end of a visit to the Islamic Republic of Iran, October 21, 2003'
          }
        }
      ]
    },
    {
      ref: 'polity:federal-republic-of-germany',
      cites: [
        {
          source: 'acronym-2003-10-21-e3-foreign-ministers-visit-to-tehran-agreed-statement',
          loc: {
            section: 'Agreed Statement at the end of a visit to the Islamic Republic of Iran, October 21, 2003'
          }
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
          source: 'acronym-2003-10-21-e3-foreign-ministers-visit-to-tehran-agreed-statement',
          loc: {
            section: 'Agreed Statement at the end of a visit to the Islamic Republic of Iran, October 21, 2003'
          }
        }
      ]
    },
    {
      key: 'e3',
      name: 'Britain, France and Germany (E3/EU)',
      cites: [
        {
          source: 'acronym-2004-11-15-agreement-between-the-e3-eu-and-iran-nuclear',
          loc: { section: 'Agreement between the E3/EU and Iran, November 15, 2004' }
        }
      ]
    },
    {
      key: 'us',
      name: 'The United States',
      polity: 'polity:united-states',
      cites: [
        {
          source: 'acronym-2005-dd80-irans-nuclear-programme-eu-3-snubbed',
          loc: {
            section: 'Iran\'s Nuclear Programme: EU-3 Snubbed as Iran begins Uranium Conversion at Isfahan',
            para: '11'
          }
        }
      ]
    }
  ],
  participants: [
    {
      ref: 'person:mahmoud-ahmadinejad',
      role: 'head-of-state',
      side: 'iran',
      cites: [
        {
          source: 'acronym-2005-dd80-irans-nuclear-programme-eu-3-snubbed',
          loc: {
            section: 'Iran\'s Nuclear Programme: EU-3 Snubbed as Iran begins Uranium Conversion at Isfahan',
            para: '1'
          }
        }
      ]
    },
    {
      ref: 'person:hassan-rouhani',
      role: 'negotiator',
      side: 'iran',
      cites: [
        {
          source: 'acronym-2003-11-10-iaea-report-on-iran-gov-2003-75',
          loc: {
            section: 'Implementation of the NPT Safeguards Agreement in the Islamic Republic of Iran (GOV/2003/75)',
            para: '21'
          }
        }
      ]
    },
    {
      name: 'Ali Larijani',
      role: 'negotiator',
      side: 'iran',
      cites: [
        {
          source: 'acronym-2005-dd80-irans-nuclear-programme-eu-3-snubbed',
          loc: {
            section: 'Iran\'s Nuclear Programme: EU-3 Snubbed as Iran begins Uranium Conversion at Isfahan',
            para: '20'
          }
        }
      ]
    },
    {
      ref: 'person:mohammad-khatami',
      role: 'head-of-state',
      side: 'iran',
      cites: [
        {
          source: 'acronym-2003-10-21-e3-foreign-ministers-visit-to-tehran-agreed-statement',
          loc: {
            section: 'Agreed Statement at the end of a visit to the Islamic Republic of Iran, October 21, 2003'
          }
        }
      ]
    },
    {
      name: 'Mohamed ElBaradei',
      role: 'participant',
      cites: [
        {
          source: 'acronym-2006-dd82-narrowing-options-for-iran-and-the-world',
          loc: { section: 'Narrowing options for Iran and the World', para: '25' }
        }
      ]
    }
  ],
  related: [
    {
      ref: 'event:2005-iranian-presidential-election',
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
    },
    {
      ref: 'event:iraq-war',
      rel: 'related',
      cites: [
        {
          source: 'acronym-2005-dd80-irans-nuclear-programme-eu-3-snubbed',
          loc: {
            section: 'Iran\'s Nuclear Programme: EU-3 Snubbed as Iran begins Uranium Conversion at Isfahan',
            para: '11'
          }
        }
      ]
    },
    {
      ref: 'period:presidency-of-mahmoud-ahmadinejad',
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
          text: 'The crisis over Iran\'s nuclear fuel cycle programme formally dates back to August 2002, when the National Council of Resistance of Iran publicised information about two undeclared nuclear facilities, as well as various front companies involved in purchasing nuclear materials and equipment.',
          lang: 'en',
          cite: {
            source: 'acronym-2005-dd80-irans-nuclear-programme-eu-3-snubbed',
            loc: {
              section: 'Iran\'s Nuclear Programme: EU-3 Snubbed as Iran begins Uranium Conversion at Isfahan',
              para: '10'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.acronym.org.uk/old/archive/textonly/dd/dd80/80news01.htm'
          }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q2',
          text: 'Construction of Iran’s first nuclear reactor in Bushehr gets under way with the help of Russian technicians.',
          lang: 'en',
          cite: {
            source: 'iranica-yarshater-chronology-part-4',
            loc: { section: 'Chronology of Iranian History Part 4, 2002' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/chronology-of-iranian-history-part-4/'
          }
        },
        {
          id: 'q3',
          text: 'In February 2003, Iran acknowledged the existence of two centrifuge enrichment plants under construction at Natanz: PFEP and a large commercial-scale Fuel Enrichment Plant (FEP).',
          lang: 'en',
          cite: {
            source: 'acronym-2003-11-10-iaea-report-on-iran-gov-2003-75',
            loc: {
              section: 'Implementation of the NPT Safeguards Agreement in the Islamic Republic of Iran (GOV/2003/75)',
              para: '42'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.acronym.org.uk/old/archive/docs/0311/doc26.htm'
          }
        }
      ]
    },
    {
      kind: 'course',
      quotes: [
        {
          id: 'q4',
          text: 'Based on all information currently available to the Agency, it is clear that Iran has failed in a number of instances over an extended period of time to meet its obligations under its Safeguards Agreement with respect to the reporting of nuclear material and its processing and use, as well as the declaration of facilities where such material has been processed and stored.',
          lang: 'en',
          cite: {
            source: 'acronym-2003-11-10-iaea-report-on-iran-gov-2003-75',
            loc: {
              section: 'Implementation of the NPT Safeguards Agreement in the Islamic Republic of Iran (GOV/2003/75)',
              para: '62'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.acronym.org.uk/old/archive/docs/0311/doc26.htm'
          }
        },
        {
          id: 'q5',
          text: 'The November 2003 IAEA Board of Governors meeting adopted a resolution that welcomed the October agreement and encouraged Iran to implement its commitments fully.',
          lang: 'en',
          cite: {
            source: 'acronym-2005-dd80-irans-nuclear-programme-eu-3-snubbed',
            loc: {
              section: 'Iran\'s Nuclear Programme: EU-3 Snubbed as Iran begins Uranium Conversion at Isfahan',
              para: '11'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.acronym.org.uk/old/archive/textonly/dd/dd80/80news01.htm'
          }
        },
        {
          id: 'q6',
          text: 'Following the election of Mahmoud Ahmadinejad as President on June 24, 2005, Iran has toughened its stance on its right to pursue the full nuclear fuel cycle for peaceful purposes.',
          lang: 'en',
          cite: {
            source: 'acronym-2005-dd80-irans-nuclear-programme-eu-3-snubbed',
            loc: {
              section: 'Iran\'s Nuclear Programme: EU-3 Snubbed as Iran begins Uranium Conversion at Isfahan',
              para: '1'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.acronym.org.uk/old/archive/textonly/dd/dd80/80news01.htm'
          }
        },
        {
          id: 'q7',
          text: 'The Board of Governors of the IAEA, at a special session on August 9-11, expressed serious concern at Iran’s resumption of conversion activities and urged it to return to the status quo.',
          lang: 'en',
          cite: {
            source: 'asil-2005-08-22-kirgis-irans-resumption-of-its-nuclear-program',
            loc: { section: 'Iran\'s Resumption of Its Nuclear Program', para: '2' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.asil.org/insights/volume/9/issue/26/irans-resumption-its-nuclear-program'
          }
        },
        {
          id: 'q8',
          text: 'In February of this year, the IAEA Board of Governors decided to submit a report to the U.N. Security Council on its difficulties with Iran.',
          lang: 'en',
          cite: {
            source: 'asil-2006-05-30-kirgis-iran-and-the-nuclear-nonproliferation-treaty',
            loc: { section: 'Iran and the Nuclear Nonproliferation Treaty', para: '2' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://asil.org/insights/volume/10/issue/13/iran-and-nuclear-nonproliferation-treaty'
          }
        },
        {
          id: 'q9',
          text: 'October-November 2006: Overshadowed by the North Korean nuclear test, UNSC has difficulty agreeing sanctions, while Iran continues to expand its uranium enrichment programme.',
          lang: 'en',
          cite: {
            source: 'acronym-2007-dd84-irans-nuclear-programme-in-a-dangerous-poker-game',
            loc: { section: 'Iran\'s Nuclear Programme in a Dangerous Poker Game', para: '73' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.acronym.org.uk/old/archive/dd/dd84/84news03.htm'
          }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q10',
          text: 'After February 2010, the Russian diplomatic objective of advancing the Iranian uranium transfer to Russia and France as agreed in principle at Geneva, in October 2009, caused a hardening of Iran’s Russian discourse.',
          lang: 'en',
          cite: {
            source: 'iranica-therme-russia-iii-russo-iranian-relations-in-the-post-soviet-era',
            loc: {
              section: 'RUSSIA iii. Russo-Iranian Relations in the Post-Soviet Era (1991-present)',
              para: '22'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/russia-iii-iranian-relations-post-soviet/'
          }
        },
        {
          id: 'q11',
          text: 'The dilemma for the international community is that the imposition of sanctions or the use of force would help Ahmadinejad to win his domestic power struggle and neutralise the rational opposition and moderates.',
          lang: 'en',
          cite: {
            source: 'acronym-2007-dd84-irans-nuclear-programme-in-a-dangerous-poker-game',
            loc: { section: 'Iran\'s Nuclear Programme in a Dangerous Poker Game', para: '7' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.acronym.org.uk/old/archive/dd/dd84/84news03.htm'
          }
        },
        {
          id: 'q12',
          text: 'If Iran withdraws from the NPT either lawfully or unlawfully, the Security Council could determine under Chapter VII of the U.N. Charter that there is a threat to the peace and could decide on measures to maintain or restore peace and security.',
          lang: 'en',
          cite: {
            source: 'asil-2006-05-30-kirgis-iran-and-the-nuclear-nonproliferation-treaty',
            loc: { section: 'Iran and the Nuclear Nonproliferation Treaty', para: '8' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://asil.org/insights/volume/10/issue/13/iran-and-nuclear-nonproliferation-treaty'
          }
        }
      ]
    },
    {
      kind: 'in-their-words',
      quotes: [
        {
          id: 'q13',
          text: '2. Demands, in this context, that Iran shall suspend all enrichment-related and reprocessing activities, including research and development, to be verified by the IAEA,',
          lang: 'en',
          cite: { source: 'unsc-resolution-1696-2006', loc: { section: 'Resolution 1696 (2006)' } },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://en.wikisource.org/wiki/United_Nations_Security_Council_Resolution_1696'
          }
        },
        {
          id: 'q14',
          text: '1. Affirms that Iran shall without further delay take the steps required by the IAEA Board of Governors in its resolution GOV/2006/14, which are essential to build confidence in the exclusively peaceful purpose of its nuclear programme and to resolve outstanding questions;',
          lang: 'en',
          cite: { source: 'unsc-resolution-1737-2006', loc: { section: 'Resolution 1737 (2006)' } },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://en.wikisource.org/wiki/United_Nations_Security_Council_Resolution_1737'
          }
        },
        {
          id: 'q15',
          text: '5. Decides that Iran shall not supply, sell or transfer directly or indirectly from its territory or by its nationals or using its flag vessels or aircraft any arms or related materiel, and that all States shall prohibit the procurement of such items from Iran by their nationals, or using their flag vessels or aircraft, and whether or not originating in the territory of Iran;',
          lang: 'en',
          cite: { source: 'unsc-resolution-1747-2007', loc: { section: 'Resolution 1747 (2007)' } },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://en.wikisource.org/wiki/United_Nations_Security_Council_Resolution_1747'
          }
        },
        {
          id: 'q16',
          text: 'Reaffirms that Iran shall without further delay take the steps required by the IAEA Board of Governors in its resolution GOV/2006/14, which are essential to build confidence in the exclusively peaceful purpose of its nuclear programme and to resolve outstanding questions, and, in this context, affirms its decision that Iran shall without delay take the steps required in paragraph 2 of resolution 1737 (2006), and underlines that the IAEA has sought confirmation that Iran will apply Code 3.1 modified;',
          lang: 'en',
          cite: { source: 'unsc-resolution-1803-2008', loc: { section: 'Resolution 1803 (2008)' } },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://en.wikisource.org/wiki/United_Nations_Security_Council_Resolution_1803'
          }
        },
        {
          id: 'q17',
          text: '(ii) While Iran has a right within the nuclear non-proliferation regime to develop nuclear energy for peaceful purposes, it has decided voluntarily to suspend all uranium enrichment and reprocessing activities as defined by the IAEA.',
          lang: 'en',
          cite: {
            source: 'acronym-2003-10-21-e3-foreign-ministers-visit-to-tehran-agreed-statement',
            loc: {
              section: 'Agreed Statement at the end of a visit to the Islamic Republic of Iran, October 21, 2003'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.acronym.org.uk/old/archive/docs/0310/doc13.htm'
          }
        },
        {
          id: 'q18',
          text: 'To build further confidence, Iran has decided, on a voluntary basis, to continue and extend its suspension to include all enrichment related and reprocessing activities, and specifically: the manufacture and import of gas centrifuges and their components; the assembly, installation, testing or operation of gas centrifuges; work to undertake any plutonium separation, or to construct or operate any plutonium separation installation; and all tests or production at any uranium conversion installation. The IAEA will be notified of this suspension and invited to verify and monitor it. The suspension will be implemented in time for the IAEA to confirm before the November Board that it has been put into effect. The suspension will be sustained while negotiations proceed on a mutually acceptable agreement on long-term arrangement.',
          lang: 'en',
          cite: {
            source: 'acronym-2004-11-15-agreement-between-the-e3-eu-and-iran-nuclear',
            loc: { section: 'Agreement between the E3/EU and Iran, November 15, 2004' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.acronym.org.uk/old/archive/docs/0411/doc16.htm'
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
            value: { d: '2002-08' },
            cites: [
              {
                source: 'acronym-2005-dd80-irans-nuclear-programme-eu-3-snubbed',
                loc: {
                  section: 'Iran\'s Nuclear Programme: EU-3 Snubbed as Iran begins Uranium Conversion at Isfahan',
                  para: '10'
                }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q19',
        text: 'The facilities, which had not previously been declared to the IAEA as required in Iran\'s safeguards agreements under the NPT, comprised a plant for heavy water production near Arak, and an underground gas centrifuge uranium enrichment plant near Natanz, still under construction.',
        lang: 'en',
        cite: {
          source: 'acronym-2005-dd80-irans-nuclear-programme-eu-3-snubbed',
          loc: {
            section: 'Iran\'s Nuclear Programme: EU-3 Snubbed as Iran begins Uranium Conversion at Isfahan',
            para: '10'
          }
        },
        provenance: {
          via: 'web',
          at: '2026-10-13',
          url: 'https://www.acronym.org.uk/old/archive/textonly/dd/dd80/80news01.htm'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '2003-10-21' },
            cites: [
              {
                source: 'acronym-2003-12-dd74-addressing-irans-nuclear-programme',
                loc: {
                  section: 'Addressing Iran\'s Nuclear Programme: the US, IAEA, and European Foreign Ministers',
                  para: '1'
                }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q20',
        text: 'Following serious questions raised in the September 12 IAEA report on Iran\'s uranium conversion and enrichment programmes, laser research and development, and heavy water reactor, there have been several further developments.',
        lang: 'en',
        cite: {
          source: 'acronym-2003-12-dd74-addressing-irans-nuclear-programme',
          loc: {
            section: 'Addressing Iran\'s Nuclear Programme: the US, IAEA, and European Foreign Ministers',
            para: '1'
          }
        },
        provenance: {
          via: 'web',
          at: '2026-10-13',
          url: 'https://www.acronym.org.uk/old/archive/dd/dd74/74news02.htm'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '2003-11-10' },
            cites: [
              {
                source: 'acronym-2003-11-10-iaea-report-on-iran-gov-2003-75',
                loc: {
                  section: 'Implementation of the NPT Safeguards Agreement in the Islamic Republic of Iran (GOV/2003/75)',
                  para: '0'
                }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q21',
        text: 'The recent disclosures by Iran about its nuclear programme clearly show that, in the past, Iran had concealed many aspects of its nuclear activities, with resultant breaches of its obligation to comply with the provisions of the Safeguards Agreement.',
        lang: 'en',
        cite: {
          source: 'acronym-2003-11-10-iaea-report-on-iran-gov-2003-75',
          loc: {
            section: 'Implementation of the NPT Safeguards Agreement in the Islamic Republic of Iran (GOV/2003/75)',
            para: '76'
          }
        },
        provenance: {
          via: 'web',
          at: '2026-10-13',
          url: 'https://www.acronym.org.uk/old/archive/docs/0311/doc26.htm'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '2004-11-15' },
            cites: [
              {
                source: 'acronym-2005-dd80-irans-nuclear-programme-eu-3-snubbed',
                loc: {
                  section: 'Iran\'s Nuclear Programme: EU-3 Snubbed as Iran begins Uranium Conversion at Isfahan',
                  para: '11'
                }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q22',
        text: 'To avoid this, Iran continued negotiations with the EU-3, resulting in the Paris Agreement of November 15, 2004, whereby Iran agreed to suspend its uranium conversion and enrichment plans.',
        lang: 'en',
        cite: {
          source: 'acronym-2005-dd80-irans-nuclear-programme-eu-3-snubbed',
          loc: {
            section: 'Iran\'s Nuclear Programme: EU-3 Snubbed as Iran begins Uranium Conversion at Isfahan',
            para: '11'
          }
        },
        provenance: {
          via: 'web',
          at: '2026-10-13',
          url: 'https://www.acronym.org.uk/old/archive/textonly/dd/dd80/80news01.htm'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '2005-08-09' },
            cites: [
              {
                source: 'acronym-2005-dd80-irans-nuclear-programme-eu-3-snubbed',
                loc: {
                  section: 'Iran\'s Nuclear Programme: EU-3 Snubbed as Iran begins Uranium Conversion at Isfahan',
                  para: '22'
                }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q23',
        text: 'Iran restarts uranium conversion programme at Isfahan, under IAEA safeguards.',
        lang: 'en',
        cite: {
          source: 'acronym-2005-dd80-irans-nuclear-programme-eu-3-snubbed',
          loc: {
            section: 'Iran\'s Nuclear Programme: EU-3 Snubbed as Iran begins Uranium Conversion at Isfahan',
            para: '22'
          }
        },
        provenance: {
          via: 'web',
          at: '2026-10-13',
          url: 'https://www.acronym.org.uk/old/archive/textonly/dd/dd80/80news01.htm'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '2005-09-24' },
            cites: [
              {
                source: 'acronym-2006-dd82-narrowing-options-for-iran-and-the-world',
                loc: { section: 'Narrowing options for Iran and the World', para: '7' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q24',
        text: 'IAEA Board adopts resolution on "Implementation of the NPT Safeguards Agreement in the Islamic Republic of Iran", (GOV/2005/77).',
        lang: 'en',
        cite: {
          source: 'acronym-2006-dd82-narrowing-options-for-iran-and-the-world',
          loc: { section: 'Narrowing options for Iran and the World', para: '7' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-13',
          url: 'https://acronym.org.uk/old/archive/dd/dd82/82iran.htm'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '2006-01-03' },
            cites: [
              {
                source: 'acronym-2006-dd82-narrowing-options-for-iran-and-the-world',
                loc: { section: 'Narrowing options for Iran and the World', para: '11' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q25',
        text: 'Iran informs the IAEA that it will resume its uranium conversion and enrichment activities suspended as part of the November 2004 Paris Agreement with the EU-3.',
        lang: 'en',
        cite: {
          source: 'acronym-2006-dd82-narrowing-options-for-iran-and-the-world',
          loc: { section: 'Narrowing options for Iran and the World', para: '11' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-13',
          url: 'https://acronym.org.uk/old/archive/dd/dd82/82iran.htm'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '2006-03-08' },
            cites: [
              {
                source: 'acronym-2006-dd82-narrowing-options-for-iran-and-the-world',
                loc: { section: 'Narrowing options for Iran and the World', para: '24' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q26',
        text: 'Iran is formally reported to the UN Security Council, in accordance with the IAEA Board of Governors\' resolution of February 4, 2006.',
        lang: 'en',
        cite: {
          source: 'acronym-2006-dd82-narrowing-options-for-iran-and-the-world',
          loc: { section: 'Narrowing options for Iran and the World', para: '24' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-13',
          url: 'https://acronym.org.uk/old/archive/dd/dd82/82iran.htm'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '2006-12-23' },
            cites: [
              {
                source: 'acronym-2007-dd84-irans-nuclear-programme-in-a-dangerous-poker-game',
                loc: { section: 'Iran\'s Nuclear Programme in a Dangerous Poker Game', para: '74' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q27',
        text: 'After tense negotiations in the UNSC, the US and EU-3 agree to dilute the sanctions in order to bring Russia and China on board, and Resolution 1737 is agreed.',
        lang: 'en',
        cite: {
          source: 'acronym-2007-dd84-irans-nuclear-programme-in-a-dangerous-poker-game',
          loc: { section: 'Iran\'s Nuclear Programme in a Dangerous Poker Game', para: '74' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-13',
          url: 'https://www.acronym.org.uk/old/archive/dd/dd84/84news03.htm'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '2010-08-21' },
            cites: [
              {
                source: 'iranica-therme-russia-iii-russo-iranian-relations-in-the-post-soviet-era',
                loc: {
                  section: 'RUSSIA iii. Russo-Iranian Relations in the Post-Soviet Era (1991-present)',
                  para: '24'
                }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q28',
        text: 'Finally, following the official launch on 21 August 2010, Russian fuel was loaded into the core of the Bušehr reactor starting on 26 October 2010.',
        lang: 'en',
        cite: {
          source: 'iranica-therme-russia-iii-russo-iranian-relations-in-the-post-soviet-era',
          loc: {
            section: 'RUSSIA iii. Russo-Iranian Relations in the Post-Soviet Era (1991-present)',
            para: '24'
          }
        },
        provenance: {
          via: 'web',
          at: '2026-10-13',
          url: 'https://www.iranicaonline.org/articles/russia-iii-iranian-relations-post-soviet/'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '2007-03-24' },
            cites: [
              {
                source: 'acronym-2007-dd84-irans-nuclear-programme-in-a-dangerous-poker-game',
                loc: { section: 'Iran\'s Nuclear Programme in a Dangerous Poker Game', para: '2' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q29',
        text: 'Just two weeks after the UN Security Council passed the latest - and toughest - of its resolutions, UNSCR 1747 (March 24, 2007), Ahmadinejad has once again upped the stakes in this deadly game of nuclear poker that Iran is playing with the world.',
        lang: 'en',
        cite: {
          source: 'acronym-2007-dd84-irans-nuclear-programme-in-a-dangerous-poker-game',
          loc: { section: 'Iran\'s Nuclear Programme in a Dangerous Poker Game', para: '2' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-13',
          url: 'https://www.acronym.org.uk/old/archive/dd/dd84/84news03.htm'
        }
      }
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/0/01/Atomanlage_Natanz_%282022%29.jpg/1280px-Atomanlage_Natanz_%282022%29.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Atomanlage_Natanz_(2022).jpg',
    credit: { creator: 'Parsa 2au' },
    license: { id: 'cc-by-sa', version: '4.0', url: 'https://creativecommons.org/licenses/by-sa/4.0' }
  },
  archive: [
    {
      id: 'a1',
      mediaKind: 'video',
      title: 'BETWEEN FECKLFSS AND RECKLESS: U.S. POLICY OPTIONS TO PREVENT A NUCLEAR IRAN JOINT HEARING',
      date: { d: '2008-04-17' },
      url: 'https://archive.org/download/hrs09I_R2172_080417/hrs09I_R2172_080417.mp4',
      page: 'https://archive.org/details/hrs09I_R2172_080417',
      credit: {
        institution: 'Committee on Foreign Affairs, U.S. House of Representatives (Internet Archive)'
      },
      license: { id: 'public-domain' },
      bytes: 988429140,
      durationSec: 9477
    }
  ],
  places: [
    {
      ref: 'place:tehran',
      cites: [
        {
          source: 'iranica-therme-russia-iii-russo-iranian-relations-in-the-post-soviet-era',
          loc: {
            section: 'RUSSIA iii. Russo-Iranian Relations in the Post-Soviet Era (1991-present)',
            para: '6'
          }
        }
      ]
    },
    {
      ref: 'place:natanz',
      cites: [
        {
          source: 'acronym-2003-11-10-iaea-report-on-iran-gov-2003-75',
          loc: {
            section: 'Implementation of the NPT Safeguards Agreement in the Islamic Republic of Iran (GOV/2003/75)',
            para: '173'
          }
        }
      ]
    }
  ]
})
