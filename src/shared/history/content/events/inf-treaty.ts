import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'inf-treaty',
  names: [
    { text: 'INF Treaty', lang: 'en', role: 'primary' },
    {
      text: 'Intermediate-Range Nuclear Forces Treaty',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'state-dept-milestones-us-soviet-relations-1981-1991',
          loc: { section: 'U.S.-Soviet Relations, 1981–1991', para: '7' }
        }
      ]
    },
    {
      text: 'Договор о ликвидации ракет средней и меньшей дальности',
      lang: 'ru',
      role: 'native'
    }
  ],
  researched: '2026-10-08',
  type: 'treaty',
  start: {
    alts: [
      {
        value: { d: '1987-12-08' },
        cites: [
          {
            source: 'state-dept-avc-intermediate-range-nuclear-forces-treaty',
            loc: { section: 'Intermediate-Range Nuclear Forces Treaty (INF Treaty)', para: '21' }
          },
          {
            source: 'reagan-lib-1987-12-08-remarks-on-signing-the-inf-treaty',
            loc: {
              section: 'Remarks on Signing the Intermediate-Range Nuclear Forces Treaty',
              para: '0'
            }
          },
          {
            source: 'state-dept-milestones-us-soviet-relations-1981-1991',
            loc: { section: 'U.S.-Soviet Relations, 1981–1991', para: '7' }
          }
        ]
      }
    ]
  },
  regions: ['global', 'europe', 'russia-central-asia'],
  prominence: 2,
  places: [
    {
      ref: 'place:washington-dc',
      cites: [
        {
          source: 'state-dept-avc-intermediate-range-nuclear-forces-treaty',
          loc: { section: 'Intermediate-Range Nuclear Forces Treaty (INF Treaty)', para: '21' }
        }
      ]
    },
    {
      ref: 'place:reykjavik',
      cites: [
        {
          source: 'state-dept-avc-intermediate-range-nuclear-forces-treaty',
          loc: { section: 'Intermediate-Range Nuclear Forces Treaty (INF Treaty)', para: '16' }
        }
      ]
    }
  ],
  partOf: [
    { ref: 'period:cold-war' }
  ],
  polities: [
    { ref: 'polity:united-states' },
    { ref: 'polity:soviet-union' }
  ],
  sides: [
    {
      key: 'us',
      name: 'United States',
      polity: 'polity:united-states',
      cites: [
        {
          source: 'state-dept-avc-intermediate-range-nuclear-forces-treaty',
          loc: { section: 'Intermediate-Range Nuclear Forces Treaty (INF Treaty)', para: '21' }
        }
      ]
    },
    {
      key: 'ussr',
      name: 'Soviet Union',
      polity: 'polity:soviet-union',
      cites: [
        {
          source: 'state-dept-avc-intermediate-range-nuclear-forces-treaty',
          loc: { section: 'Intermediate-Range Nuclear Forces Treaty (INF Treaty)', para: '21' }
        }
      ]
    }
  ],
  participants: [
    {
      ref: 'person:ronald-reagan',
      role: 'signatory',
      side: 'us',
      cites: [
        {
          source: 'state-dept-avc-intermediate-range-nuclear-forces-treaty',
          loc: { section: 'Intermediate-Range Nuclear Forces Treaty (INF Treaty)', para: '21' }
        }
      ]
    },
    {
      ref: 'person:mikhail-gorbachev',
      role: 'signatory',
      side: 'ussr',
      cites: [
        {
          source: 'state-dept-avc-intermediate-range-nuclear-forces-treaty',
          loc: { section: 'Intermediate-Range Nuclear Forces Treaty (INF Treaty)', para: '21' }
        }
      ]
    },
    {
      name: 'George Shultz',
      role: 'negotiator',
      side: 'us',
      cites: [
        {
          source: 'state-dept-avc-intermediate-range-nuclear-forces-treaty',
          loc: { section: 'Intermediate-Range Nuclear Forces Treaty (INF Treaty)', para: '11' }
        }
      ]
    },
    {
      name: 'Maynard Glitman',
      role: 'negotiator',
      side: 'us',
      cites: [
        {
          source: 'reagan-lib-1987-12-08-remarks-on-signing-the-inf-treaty',
          loc: {
            section: 'Remarks on Signing the Intermediate-Range Nuclear Forces Treaty',
            para: '10'
          }
        }
      ]
    },
    {
      name: 'Aleksey Obukhov',
      role: 'negotiator',
      side: 'ussr',
      cites: [
        {
          source: 'reagan-lib-1987-12-08-remarks-on-signing-the-inf-treaty',
          loc: {
            section: 'Remarks on Signing the Intermediate-Range Nuclear Forces Treaty',
            para: '10'
          }
        }
      ]
    }
  ],
  related: [
    {
      ref: 'event:perestroika-and-glasnost',
      rel: 'related',
      cites: [
        {
          source: 'loc-russia-country-study-1996',
          loc: { section: 'New Thinking: Foreign Policy under Gorbachev', para: '2' }
        }
      ]
    },
    {
      ref: 'event:revolutions-of-1989',
      rel: 'contributed-to',
      cites: [
        {
          source: 'loc-russia-country-study-1996',
          loc: { section: 'New Thinking: Foreign Policy under Gorbachev', para: '4' }
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
          text: 'The Treaty Between the United States of America and the Union of Soviet Socialist Republics on the Elimination of Their Intermediate-Range and Shorter-Range Missiles, commonly referred to as the INF (Intermediate-Range Nuclear Forces) Treaty, requires destruction of the Parties\' ground-launched ballistic and cruise missiles with ranges of between 500 and 5,500 kilometers, their launchers and associated support structures and support equipment within three years after the Treaty enters into force.',
          lang: 'en',
          cite: {
            source: 'state-dept-avc-intermediate-range-nuclear-forces-treaty',
            loc: { section: 'Intermediate-Range Nuclear Forces Treaty (INF Treaty)', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://web.archive.org/web/20191231062814/https://2009-2017.state.gov/t/avc/trty/102360.htm'
          }
        },
        {
          id: 'q2',
          text: 'In December 1987 they signed the Intermediate-Range Nuclear Forces Treaty, which eliminated an entire class of missiles.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-us-soviet-relations-1981-1991',
            loc: { section: 'U.S.-Soviet Relations, 1981–1991', para: '7' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://history.state.gov/milestones/1981-1988/u.s.-soviet-relations'
          }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q3',
          text: 'In the mid-1970s the Soviet Union achieved rough strategic parity with the United States. Shortly thereafter, the Soviet Union began replacing older intermediate-range SS-4 and SS-5 missiles with a new intermediate-range missile, the SS-20, bringing about what was perceived as a qualitative and quantitative change in the European security situation. The SS-20 was mobile, accurate, and capable of being concealed and rapidly redeployed.',
          lang: 'en',
          cite: {
            source: 'state-dept-avc-intermediate-range-nuclear-forces-treaty',
            loc: { section: 'Intermediate-Range Nuclear Forces Treaty (INF Treaty)', para: '2' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://web.archive.org/web/20191231062814/https://2009-2017.state.gov/t/avc/trty/102360.htm'
          }
        },
        {
          id: 'q4',
          text: 'On November 12, 1979, the NATO ministers unanimously adopted a "dual track" strategy to counter Soviet SS-20 deployments. One track called for arms control negotiations between the United States and the Soviet Union to reduce INF forces to the lowest possible level; the second track called for deployment in Western Europe, beginning in December 1983, of 464 single-warhead U.S. ground-launched cruise (GLCM) missiles and 108 Pershing II ballistic missiles.',
          lang: 'en',
          cite: {
            source: 'state-dept-avc-intermediate-range-nuclear-forces-treaty',
            loc: { section: 'Intermediate-Range Nuclear Forces Treaty (INF Treaty)', para: '4' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://web.archive.org/web/20191231062814/https://2009-2017.state.gov/t/avc/trty/102360.htm'
          }
        },
        {
          id: 'q5',
          text: 'Agreement to begin formal talks was reached on September 23, 1981. On November 18, President Reagan announced a negotiating proposal in which the United States would agree to eliminate its Pershing IIs and GLCMs if the Soviet Union would dismantle all of its SS-20s, SS-4s, and SS-5s. This proposal became known as the "zero-zero offer."',
          lang: 'en',
          cite: {
            source: 'state-dept-avc-intermediate-range-nuclear-forces-treaty',
            loc: { section: 'Intermediate-Range Nuclear Forces Treaty (INF Treaty)', para: '7' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://web.archive.org/web/20191231062814/https://2009-2017.state.gov/t/avc/trty/102360.htm'
          }
        }
      ]
    },
    {
      kind: 'course',
      quotes: [
        {
          id: 'q6',
          text: 'During the first two years of the talks, which ended with a Soviet walkout on November 23, 1983, the United States continued to emphasize its preference for the "zero option" even while introducing the concept of an interim agreement based on equally low numbers of INF systems.',
          lang: 'en',
          cite: {
            source: 'state-dept-avc-intermediate-range-nuclear-forces-treaty',
            loc: { section: 'Intermediate-Range Nuclear Forces Treaty (INF Treaty)', para: '9' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://web.archive.org/web/20191231062814/https://2009-2017.state.gov/t/avc/trty/102360.htm'
          }
        },
        {
          id: 'q7',
          text: 'On January 15, 1986, General Secretary Gorbachev announced a Soviet proposal for a three-stage program to ban nuclear weapons by the year 2000, which included elimination of all U.S. and Soviet INF missiles in Europe.',
          lang: 'en',
          cite: {
            source: 'state-dept-avc-intermediate-range-nuclear-forces-treaty',
            loc: { section: 'Intermediate-Range Nuclear Forces Treaty (INF Treaty)', para: '14' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://web.archive.org/web/20191231062814/https://2009-2017.state.gov/t/avc/trty/102360.htm'
          }
        },
        {
          id: 'q8',
          text: 'A series of high-level discussions took place in August and September 1986 followed by a meeting between President Reagan and General Secretary Gorbachev in Reykjavik, Iceland, in October 1986, where the sides agreed to equal global ceilings of systems capable of carrying 100 INF missile warheads, none of which would be deployed in Europe. The Soviet Union also proposed a freeze on shorter-range missile deployments and agreed in principle to intrusive on-site verification.',
          lang: 'en',
          cite: {
            source: 'state-dept-avc-intermediate-range-nuclear-forces-treaty',
            loc: { section: 'Intermediate-Range Nuclear Forces Treaty (INF Treaty)', para: '16' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://web.archive.org/web/20191231062814/https://2009-2017.state.gov/t/avc/trty/102360.htm'
          }
        },
        {
          id: 'q9',
          text: 'Several months later, on February 28, 1987, the Soviet Union announced that it was prepared to reach a separate INF agreement.',
          lang: 'en',
          cite: {
            source: 'state-dept-avc-intermediate-range-nuclear-forces-treaty',
            loc: { section: 'Intermediate-Range Nuclear Forces Treaty (INF Treaty)', para: '17' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://web.archive.org/web/20191231062814/https://2009-2017.state.gov/t/avc/trty/102360.htm'
          }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q10',
          text: 'Because of concerns raised by the Senate during the ratification hearings, and because of issues that arose during technical consultations between the United States and the Soviet Union during the spring of 1988, this package was augmented by three exchanges of diplomatic notes (one on May 12, 1988 and two on May 21, 1988) and an agreed minute signed May 12, 1988. The Senate resolution of ratification required the President, prior to exchanging instruments of ratification, to obtain Soviet agreement that the four documents "are of the same force and effect as the provisions of the Treaty." This was done through an exchange of notes on May 28, 1988.',
          lang: 'en',
          cite: {
            source: 'state-dept-avc-intermediate-range-nuclear-forces-treaty',
            loc: { section: 'Intermediate-Range Nuclear Forces Treaty (INF Treaty)', para: '22' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://web.archive.org/web/20191231062814/https://2009-2017.state.gov/t/avc/trty/102360.htm'
          }
        },
        {
          id: 'q11',
          text: 'The numbers alone demonstrate the value of this agreement. On the Soviet side, over 1,500 deployed warheads will be removed, and all ground-launched intermediate-range missiles, including the SS - 20\'s, will be destroyed. On our side, our entire complement of Pershing II and ground-launched cruise missiles, with some 400 deployed warheads, will all be destroyed.',
          lang: 'en',
          cite: {
            source: 'reagan-lib-1987-12-08-remarks-on-signing-the-inf-treaty',
            loc: {
              section: 'Remarks on Signing the Intermediate-Range Nuclear Forces Treaty',
              para: '4'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.reaganlibrary.gov/archives/speech/remarks-signing-intermediate-range-nuclear-forces-treaty'
          }
        },
        {
          id: 'q12',
          text: 'Soviet relations with Europe improved markedly during the Gorbachev period, mainly because of the INF Treaty',
          lang: 'en',
          cite: {
            source: 'loc-russia-country-study-1996',
            loc: { section: 'New Thinking: Foreign Policy under Gorbachev', para: '4' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/russia/17.htm' }
        }
      ]
    },
    {
      kind: 'in-their-words',
      quotes: [
        {
          id: 'q13',
          text: 'For the first time in history, the language of ``arms control\'\' was replaced by ``arms reduction\'\' -- in this case, the complete elimination of an entire class of U.S. and Soviet nuclear missiles. Of course, this required a dramatic shift in thinking, and it took conventional wisdom some time to catch up. Reaction, to say the least, was mixed. To some the zero option was impossibly visionary and unrealistic; to others merely a propaganda ploy. Well, with patience, determination, and commitment, we\'ve made this impossible vision a reality.',
          lang: 'en',
          cite: {
            source: 'reagan-lib-1987-12-08-remarks-on-signing-the-inf-treaty',
            loc: {
              section: 'Remarks on Signing the Intermediate-Range Nuclear Forces Treaty',
              para: '2'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.reaganlibrary.gov/archives/speech/remarks-signing-intermediate-range-nuclear-forces-treaty'
          }
        },
        {
          id: 'q14',
          text: 'Mr. President, ladies and gentlemen, comrades, succeeding generations will hand down their verdict on the importance of the event which we are about to witness. But I will venture to say that what we are going to do, the signing of the first-ever agreement eliminating nuclear weapons, has a universal significance for mankind, both from the standpoint of world politics and from the standpoint of humanism.',
          lang: 'en',
          cite: {
            source: 'reagan-lib-1987-12-08-remarks-on-signing-the-inf-treaty',
            loc: {
              section: 'Remarks on Signing the Intermediate-Range Nuclear Forces Treaty',
              para: '14'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.reaganlibrary.gov/archives/speech/remarks-signing-intermediate-range-nuclear-forces-treaty'
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
            value: { d: '1981-11-18' },
            cites: [
              {
                source: 'state-dept-avc-intermediate-range-nuclear-forces-treaty',
                loc: { section: 'Intermediate-Range Nuclear Forces Treaty (INF Treaty)', para: '7' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q15',
        text: 'It was over 6 years ago, November 18, 1981, that I first proposed what would come to be called the zero option.',
        lang: 'en',
        cite: {
          source: 'reagan-lib-1987-12-08-remarks-on-signing-the-inf-treaty',
          loc: {
            section: 'Remarks on Signing the Intermediate-Range Nuclear Forces Treaty',
            para: '1'
          }
        },
        provenance: {
          via: 'web',
          at: '2026-10-08',
          url: 'https://www.reaganlibrary.gov/archives/speech/remarks-signing-intermediate-range-nuclear-forces-treaty'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1985-11' },
            cites: [
              {
                source: 'state-dept-avc-intermediate-range-nuclear-forces-treaty',
                loc: {
                  section: 'Intermediate-Range Nuclear Forces Treaty (INF Treaty)',
                  para: '13'
                }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q16',
        text: 'In November of 1985, President Reagan and General Secretary Gorbachev met in Geneva, where they issued a joint statement calling for an "interim accord on intermediate-range nuclear forces."',
        lang: 'en',
        cite: {
          source: 'state-dept-avc-intermediate-range-nuclear-forces-treaty',
          loc: { section: 'Intermediate-Range Nuclear Forces Treaty (INF Treaty)', para: '13' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-08',
          url: 'https://web.archive.org/web/20191231062814/https://2009-2017.state.gov/t/avc/trty/102360.htm'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1986-10' },
            cites: [
              {
                source: 'state-dept-avc-intermediate-range-nuclear-forces-treaty',
                loc: {
                  section: 'Intermediate-Range Nuclear Forces Treaty (INF Treaty)',
                  para: '16'
                }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q17',
        text: 'At Reykjavik in October 1986, Reagan and Gorbachev discussed the prospect of abolishing all nuclear weapons.',
        lang: 'en',
        cite: {
          source: 'state-dept-milestones-us-soviet-relations-1981-1991',
          loc: { section: 'U.S.-Soviet Relations, 1981–1991', para: '7' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-08',
          url: 'https://history.state.gov/milestones/1981-1988/u.s.-soviet-relations'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1987-07-22' },
            cites: [
              {
                source: 'state-dept-avc-intermediate-range-nuclear-forces-treaty',
                loc: {
                  section: 'Intermediate-Range Nuclear Forces Treaty (INF Treaty)',
                  para: '19'
                }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q18',
        text: 'On July 22, 1987, General Secretary Gorbachev agreed to a "double global zero" Treaty',
        lang: 'en',
        cite: {
          source: 'state-dept-avc-intermediate-range-nuclear-forces-treaty',
          loc: { section: 'Intermediate-Range Nuclear Forces Treaty (INF Treaty)', para: '19' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-08',
          url: 'https://web.archive.org/web/20191231062814/https://2009-2017.state.gov/t/avc/trty/102360.htm'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1987-12-08' },
            cites: [
              {
                source: 'state-dept-avc-intermediate-range-nuclear-forces-treaty',
                loc: {
                  section: 'Intermediate-Range Nuclear Forces Treaty (INF Treaty)',
                  para: '21'
                }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q19',
        text: 'In September, the two sides reached agreement in principle to complete the Treaty before the end of the year. On December 8, 1987, the Treaty was signed by President Reagan and General Secretary Gorbachev at a summit meeting in Washington.',
        lang: 'en',
        cite: {
          source: 'state-dept-avc-intermediate-range-nuclear-forces-treaty',
          loc: { section: 'Intermediate-Range Nuclear Forces Treaty (INF Treaty)', para: '21' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-08',
          url: 'https://web.archive.org/web/20191231062814/https://2009-2017.state.gov/t/avc/trty/102360.htm'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1988-06-01' },
            cites: [
              {
                source: 'state-dept-avc-intermediate-range-nuclear-forces-treaty',
                loc: {
                  section: 'Intermediate-Range Nuclear Forces Treaty (INF Treaty)',
                  para: '22'
                }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q20',
        text: 'The Treaty entered into force upon the exchange of instruments of ratification in Moscow on June 1, 1988.',
        lang: 'en',
        cite: {
          source: 'state-dept-avc-intermediate-range-nuclear-forces-treaty',
          loc: { section: 'Intermediate-Range Nuclear Forces Treaty (INF Treaty)', para: '22' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-08',
          url: 'https://web.archive.org/web/20191231062814/https://2009-2017.state.gov/t/avc/trty/102360.htm'
        }
      }
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/8/8d/Reagan_and_Gorbachev_signing.jpg/1280px-Reagan_and_Gorbachev_signing.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Reagan_and_Gorbachev_signing.jpg',
    credit: {
      institution: 'White House Photographic Office (U.S. National Archives and Records Administration)'
    },
    license: { id: 'public-domain' }
  },
  furtherReading: [
    { source: 'matlock-2004-reagan-and-gorbachev', perspective: 'american' }
  ]
})
