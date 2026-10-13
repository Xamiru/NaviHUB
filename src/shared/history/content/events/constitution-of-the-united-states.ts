import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'constitution-of-the-united-states',
  names: [
    { text: 'Constitution of the United States', lang: 'en', role: 'primary' },
    {
      text: 'United States Constitution',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'state-dept-milestones-convention-and-ratification',
          loc: { section: 'Constitutional Convention and Ratification, 1787–1789', para: '1' }
        }
      ]
    }
  ],
  researched: '2026-10-13',
  type: 'law',
  start: {
    alts: [
      {
        value: { d: '1787-05-25' },
        cites: [
          {
            source: 'britannica-1911-united-states-history',
            loc: { section: 'United States, The: History', para: '106' }
          }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1789' },
        cites: [
          {
            source: 'state-dept-milestones-convention-and-ratification',
            loc: { section: 'Constitutional Convention and Ratification, 1787–1789', para: '1' }
          }
        ]
      }
    ]
  },
  regions: ['north-america'],
  prominence: 2,
  places: [
    {
      ref: 'place:philadelphia',
      cites: [
        {
          source: 'state-dept-milestones-convention-and-ratification',
          loc: { section: 'Constitutional Convention and Ratification, 1787–1789', para: '1' }
        }
      ]
    }
  ],
  polities: [
    {
      ref: 'polity:united-states',
      cites: [
        {
          source: 'state-dept-milestones-convention-and-ratification',
          loc: { section: 'Constitutional Convention and Ratification, 1787–1789', para: '1' }
        }
      ]
    }
  ],
  participants: [
    {
      ref: 'person:george-washington',
      role: 'organizer',
      cites: [
        {
          source: 'britannica-1911-united-states-history',
          loc: { section: 'United States, The: History', para: '107' }
        }
      ]
    },
    {
      name: 'James Madison',
      role: 'organizer',
      cites: [
        {
          source: 'britannica-1911-united-states-history',
          loc: { section: 'United States, The: History', para: '106' }
        }
      ]
    },
    {
      name: 'Alexander Hamilton',
      role: 'organizer',
      cites: [
        {
          source: 'britannica-1911-united-states-history',
          loc: { section: 'United States, The: History', para: '117' }
        }
      ]
    }
  ],
  related: [
    {
      ref: 'event:american-revolutionary-war',
      rel: 'response-to',
      cites: [
        {
          source: 'state-dept-milestones-convention-and-ratification',
          loc: { section: 'Constitutional Convention and Ratification, 1787–1789', para: '3' }
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
          text: 'The Constitutional Convention in Philadelphia met between May and September of 1787 to address the problems of the weak central government that existed under the Articles of Confederation.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-convention-and-ratification',
            loc: { section: 'Constitutional Convention and Ratification, 1787–1789', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://history.state.gov/milestones/1784-1800/convention-and-ratification'
          }
        },
        {
          id: 'q2',
          text: 'The United States Constitution that emerged from the convention established a federal government with more specific powers, including those related to conducting relations with foreign governments.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-convention-and-ratification',
            loc: { section: 'Constitutional Convention and Ratification, 1787–1789', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://history.state.gov/milestones/1784-1800/convention-and-ratification'
          }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q3',
          text: 'Under the Articles of Confederation, the federal government faced many challenges in conducting foreign policy, largely due to its inability to pass or enforce laws that individual states found counter to their interests.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-convention-and-ratification',
            loc: { section: 'Constitutional Convention and Ratification, 1787–1789', para: '3' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://history.state.gov/milestones/1784-1800/convention-and-ratification'
          }
        },
        {
          id: 'q4',
          text: 'The Confederation Congress lacked the authority to regulate this trade, and intrastate trade was further hampered by states’ own attempts to impose import duties on goods from elsewhere in the United States.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-convention-and-ratification',
            loc: { section: 'Constitutional Convention and Ratification, 1787–1789', para: '3' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://history.state.gov/milestones/1784-1800/convention-and-ratification'
          }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q5',
          text: 'After the necessary number of state ratifications, the Constitution came into effect in 1789 and has served as the basis of the United States Government ever since.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-convention-and-ratification',
            loc: { section: 'Constitutional Convention and Ratification, 1787–1789', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://history.state.gov/milestones/1784-1800/convention-and-ratification'
          }
        },
        {
          id: 'q6',
          text: 'In attempting to resolve such issues, as well as problems arising from the payment of debts from the Revolutionary War and other domestic issues, the delegates to the Constitutional Convention created a model of government that relied upon a series of checks and balances by dividing federal authority between the Legislative, the Judicial, and the Executive branches of government.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-convention-and-ratification',
            loc: { section: 'Constitutional Convention and Ratification, 1787–1789', para: '5' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://history.state.gov/milestones/1784-1800/convention-and-ratification'
          }
        }
      ]
    },
    {
      kind: 'in-their-words',
      quotes: [
        {
          id: 'q7',
          text: 'We the People of the United States, in Order to form a more perfect Union, establish Justice, insure domestic Tranquility, provide for the common defence, promote the general Welfare, and secure the Blessings of Liberty to ourselves and our Posterity, do ordain and establish this Constitution for the United States of America.',
          lang: 'en',
          cite: {
            source: 'nara-constitution-of-the-united-states-transcript',
            loc: { section: 'The Constitution of the United States: A Transcription', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.archives.gov/founding-docs/constitution-transcript'
          }
        },
        {
          id: 'q8',
          text: 'The Ratification of the Conventions of nine States, shall be sufficient for the Establishment of this Constitution between the States so ratifying the Same.',
          lang: 'en',
          cite: {
            source: 'nara-constitution-of-the-united-states-transcript',
            loc: { section: 'The Constitution of the United States: A Transcription', para: '113' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.archives.gov/founding-docs/constitution-transcript'
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
            value: { d: '1787-05-25' },
            cites: [
              {
                source: 'britannica-1911-united-states-history',
                loc: { section: 'United States, The: History', para: '106' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q9',
        text: 'Confessing its helplessness, Congress approved the call for a second convention; twelve of the states (all but Rhode Island) chose delegates; and the convention met at Philadelphia (May 25, 1787), with an abler body of men than had been seen in Congress since the first two Continental Congresses.',
        lang: 'en',
        cite: {
          source: 'britannica-1911-united-states-history',
          loc: { section: 'United States, The: History', para: '106' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-13',
          url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/United_States,_The/History'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1787-07' },
            cites: [
              {
                source: 'britannica-1911-united-states-history',
                loc: { section: 'United States, The: History', para: '107' }
              },
              {
                source: 'britannica-1911-united-states-history',
                loc: { section: 'United States, The: History', para: '106' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q10',
        text: 'In July the large states began to show a disposition to force their plan through, and the small states began to threaten a concerted withdrawal from the convention.',
        lang: 'en',
        cite: {
          source: 'britannica-1911-united-states-history',
          loc: { section: 'United States, The: History', para: '107' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-13',
          url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/United_States,_The/History'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1787-09-17' },
            cites: [
              {
                source: 'britannica-1911-united-states-history',
                loc: { section: 'United States, The: History', para: '116' }
              },
              {
                source: 'nara-constitution-of-the-united-states-transcript',
                loc: {
                  section: 'The Constitution of the United States: A Transcription',
                  para: '116'
                }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q11',
        text: 'The convention adjourned on the 17th of September 1787, having adopted the Constitution.',
        lang: 'en',
        cite: {
          source: 'britannica-1911-united-states-history',
          loc: { section: 'United States, The: History', para: '116' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-13',
          url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/United_States,_The/History'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1788' },
            cites: [
              {
                source: 'britannica-1911-united-states-history',
                loc: { section: 'United States, The: History', para: '118' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q12',
        text: 'The Anti-Federalists of the Virginia and New York conventions offered conditional ratifications of all sorts; but the Federalists stubbornly refused to consider them, and at last, by very slender majorities, these two states ratified.',
        lang: 'en',
        cite: {
          source: 'britannica-1911-united-states-history',
          loc: { section: 'United States, The: History', para: '118' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-13',
          url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/United_States,_The/History'
        }
      }
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/9/98/Flickr_-_USCapitol_-_Signing_of_the_Constitution.jpg/1280px-Flickr_-_USCapitol_-_Signing_of_the_Constitution.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Flickr_-_USCapitol_-_Signing_of_the_Constitution.jpg',
    credit: { institution: 'United States Capitol', creator: 'Howard Chandler Christy' },
    license: { id: 'public-domain' }
  }
})
