import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'american-revolutionary-war',
  names: [
    { text: 'American Revolutionary War', lang: 'en', role: 'primary' },
    {
      text: 'American War of Independence',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'britannica-1911-american-war-of-independence',
          loc: { section: 'American War of Independence', para: '1' }
        }
      ]
    },
    {
      text: 'War of the American Revolution',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'state-dept-milestones-declaration-of-independence',
          loc: { section: 'The Declaration of Independence, 1776', para: '9' }
        }
      ]
    }
  ],
  researched: '2026-10-13',
  type: 'war',
  start: {
    alts: [
      {
        value: { d: '1775-04-19' },
        cites: [
          {
            source: 'britannica-1911-american-war-of-independence',
            loc: { section: 'American War of Independence', para: '1' }
          }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1783-09-03' },
        cites: [
          {
            source: 'state-dept-milestones-treaty-of-paris-1783',
            loc: { section: 'Treaty of Paris, 1783', para: '3' }
          },
          {
            source: 'britannica-1911-american-war-of-independence',
            loc: { section: 'American War of Independence', para: '18' }
          }
        ]
      }
    ]
  },
  regions: ['north-america', 'europe'],
  prominence: 1,
  places: [
    {
      ref: 'place:boston',
      cites: [
        {
          source: 'britannica-1911-united-states-history',
          loc: { section: 'United States, The: History', para: '69' }
        }
      ]
    },
    {
      ref: 'place:yorktown',
      cites: [
        { source: 'britannica-1911-yorktown', loc: { section: 'Yorktown', para: '2' } }
      ]
    }
  ],
  polities: [
    {
      ref: 'polity:united-states',
      cites: [
        {
          source: 'britannica-1911-american-war-of-independence',
          loc: { section: 'American War of Independence', para: '1' }
        }
      ]
    },
    {
      ref: 'polity:kingdom-of-france',
      cites: [
        {
          source: 'state-dept-milestones-french-alliance',
          loc: {
            section: 'French Alliance, French Assistance, and European Diplomacy during the American Revolution, 1778–1782',
            para: '1'
          }
        }
      ]
    }
  ],
  sides: [
    {
      key: 'america',
      name: 'United States',
      polity: 'polity:united-states',
      cites: [
        {
          source: 'britannica-1911-american-war-of-independence',
          loc: { section: 'American War of Independence', para: '1' }
        }
      ]
    },
    {
      key: 'britain',
      name: 'Great Britain',
      polity: 'polity:kingdom-of-great-britain',
      cites: [
        {
          source: 'britannica-1911-american-war-of-independence',
          loc: { section: 'American War of Independence', para: '1' }
        }
      ]
    },
    {
      key: 'france',
      name: 'France',
      polity: 'polity:kingdom-of-france',
      cites: [
        {
          source: 'state-dept-milestones-french-alliance',
          loc: {
            section: 'French Alliance, French Assistance, and European Diplomacy during the American Revolution, 1778–1782',
            para: '1'
          }
        }
      ]
    }
  ],
  participants: [
    {
      ref: 'person:george-washington',
      role: 'commander',
      side: 'america',
      cites: [
        {
          source: 'britannica-1911-united-states-history',
          loc: { section: 'United States, The: History', para: '87' }
        }
      ]
    },
    {
      name: 'Benjamin Franklin',
      role: 'diplomat',
      side: 'america',
      cites: [
        {
          source: 'state-dept-milestones-french-alliance',
          loc: {
            section: 'French Alliance, French Assistance, and European Diplomacy during the American Revolution, 1778–1782',
            para: '7'
          }
        }
      ]
    },
    {
      name: 'Lord Cornwallis',
      role: 'commander',
      side: 'britain',
      cites: [
        { source: 'britannica-1911-yorktown', loc: { section: 'Yorktown', para: '2' } }
      ]
    },
    {
      ref: 'person:louis-xvi',
      role: 'head-of-state',
      side: 'france',
      cites: [
        {
          source: 'state-dept-milestones-french-alliance',
          loc: {
            section: 'French Alliance, French Assistance, and European Diplomacy during the American Revolution, 1778–1782',
            para: '1'
          }
        }
      ]
    }
  ],
  related: [
    {
      ref: 'event:united-states-declaration-of-independence',
      rel: 'contributed-to',
      cites: [
        {
          source: 'state-dept-milestones-declaration-of-independence',
          loc: { section: 'The Declaration of Independence, 1776', para: '1' }
        }
      ]
    },
    {
      ref: 'event:seven-years-war',
      rel: 'caused-by',
      cites: [
        {
          source: 'state-dept-milestones-french-indian-war',
          loc: { section: 'French and Indian War/Seven Years’ War, 1754–63', para: '1' }
        }
      ]
    },
    {
      ref: 'event:siege-of-yorktown',
      rel: 'related',
      cites: [
        { source: 'britannica-1911-yorktown', loc: { section: 'Yorktown', para: '2' } }
      ]
    },
    {
      ref: 'event:treaty-of-paris-1783',
      rel: 'led-to',
      cites: [
        {
          source: 'state-dept-milestones-treaty-of-paris-1783',
          loc: { section: 'Treaty of Paris, 1783', para: '3' }
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
          text: 'AMERICAN WAR OF INDEPENDENCE (1775–1781). This war, by which the United States definitely separated themselves from the British connexion, began with the affair of Lexington in Massachusetts, on the 19th of April 1775, and was virtually ended by the capitulation of Cornwallis at Yorktown, Virginia, on the 10th of October 1781.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-american-war-of-independence',
            loc: { section: 'American War of Independence', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/American_War_of_Independence'
          }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q2',
          text: 'Determined opposition to the Stamp Act was shown in all the colonies, by or before the time (Nov. 1) when it was to go into effect.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-united-states-history',
            loc: { section: 'United States, The: History', para: '60' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/United_States,_The/History'
          }
        },
        {
          id: 'q3',
          text: 'In 1774, the British Parliament passed a series of laws collectively known as the Intolerable Acts, with the intent to suppress unrest in colonial Boston by closing the port and placing it under martial law.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-continental-congress',
            loc: { section: 'Continental Congress, 1774–1781', para: '3' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://history.state.gov/milestones/1776-1783/continental-congress'
          }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q4',
          text: 'The United States, Spain, and France formally ended the war with Britain with the Treaty of Paris in 1783.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-french-alliance',
            loc: {
              section: 'French Alliance, French Assistance, and European Diplomacy during the American Revolution, 1778–1782',
              para: '9'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://history.state.gov/milestones/1776-1783/french-alliance'
          }
        },
        {
          id: 'q5',
          text: 'The reasons of Great Britain’s misfortunes and failure may be summarized as follows:—Misconception by the home government of the temper and reserve strength of her colonists, a population mainly of good English blood and instincts; disbelief at the outset in the probability of a protracted struggle covering the immense territory in America; consequent failure to despatch sufficient forces to the field; the safe and Fabian generalship of Washington; and finally, the French alliance and European combinations by which at the close of the conflict England was without a friend or ally on the continent.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-american-war-of-independence',
            loc: { section: 'American War of Independence', para: '18' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/American_War_of_Independence'
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
            value: { d: '1774-09-05' },
            cites: [
              {
                source: 'state-dept-milestones-continental-congress',
                loc: { section: 'Continental Congress, 1774–1781', para: '4' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q6',
        text: 'The Congress first met in Philadelphia on September 5, 1774, with delegates from each of the 13 colonies except Georgia.',
        lang: 'en',
        cite: {
          source: 'state-dept-milestones-continental-congress',
          loc: { section: 'Continental Congress, 1774–1781', para: '4' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-13',
          url: 'https://history.state.gov/milestones/1776-1783/continental-congress'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1775-06' },
            cites: [
              {
                source: 'state-dept-milestones-continental-congress',
                loc: { section: 'Continental Congress, 1774–1781', para: '7' }
              },
              {
                source: 'millercenter-chervinsky-washington-life-in-brief',
                loc: { section: 'George Washington: Life in Brief', para: '7' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q7',
        text: 'By the time Congress met again, war was already underway, and thus the delegates to the Second Continental Congress formed the Continental Army and dispatched George Washington to Massachusetts as its commander.',
        lang: 'en',
        cite: {
          source: 'state-dept-milestones-continental-congress',
          loc: { section: 'Continental Congress, 1774–1781', para: '7' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-13',
          url: 'https://history.state.gov/milestones/1776-1783/continental-congress'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1776-07-04' },
            cites: [
              {
                source: 'state-dept-milestones-declaration-of-independence',
                loc: { section: 'The Declaration of Independence, 1776', para: '7' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q8',
        text: 'The committee presented the final draft before Congress on June 28, 1776, and Congress adopted the final text of the Declaration of Independence on July 4.',
        lang: 'en',
        cite: {
          source: 'state-dept-milestones-declaration-of-independence',
          loc: { section: 'The Declaration of Independence, 1776', para: '7' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-13',
          url: 'https://history.state.gov/milestones/1776-1783/declaration'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1776-12-26' },
            cites: [
              {
                source: 'britannica-1911-american-war-of-independence',
                loc: { section: 'American War of Independence', para: '5' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q9',
        text: 'Washington, still retreating with a constantly diminishing force, suddenly turned upon Lieutenant-Colonel Rall’s advanced corps of Hessians at Trenton on the 26th of December and captured nearly 1000 prisoners.',
        lang: 'en',
        cite: {
          source: 'britannica-1911-american-war-of-independence',
          loc: { section: 'American War of Independence', para: '5' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-13',
          url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/American_War_of_Independence'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1777-12' },
            cites: [
              {
                source: 'state-dept-milestones-french-alliance',
                loc: {
                  section: 'French Alliance, French Assistance, and European Diplomacy during the American Revolution, 1778–1782',
                  para: '7'
                }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q10',
        text: 'Vergennes finally decided in favor of an alliance when news of the British surrender at the Battle of Saratoga reached him in December 1777.',
        lang: 'en',
        cite: {
          source: 'state-dept-milestones-french-alliance',
          loc: {
            section: 'French Alliance, French Assistance, and European Diplomacy during the American Revolution, 1778–1782',
            para: '7'
          }
        },
        provenance: {
          via: 'web',
          at: '2026-10-13',
          url: 'https://history.state.gov/milestones/1776-1783/french-alliance'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1778-02-06' },
            cites: [
              {
                source: 'state-dept-milestones-french-alliance',
                loc: {
                  section: 'French Alliance, French Assistance, and European Diplomacy during the American Revolution, 1778–1782',
                  para: '7'
                }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q11',
        text: 'On February 6, 1778, Benjamin Franklin and the other two commissioners, Arthur Lee and Silas Deane, signed a Treaty of Alliance and a Treaty of Amity and Commerce with France.',
        lang: 'en',
        cite: {
          source: 'state-dept-milestones-french-alliance',
          loc: {
            section: 'French Alliance, French Assistance, and European Diplomacy during the American Revolution, 1778–1782',
            para: '7'
          }
        },
        provenance: {
          via: 'web',
          at: '2026-10-13',
          url: 'https://history.state.gov/milestones/1776-1783/french-alliance'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1781-10-19' },
            cites: [
              { source: 'britannica-1911-yorktown', loc: { section: 'Yorktown', para: '2' } }
            ]
          },
          {
            value: { d: '1781-10-10' },
            cites: [
              {
                source: 'britannica-1911-american-war-of-independence',
                loc: { section: 'American War of Independence', para: '1' }
              }
            ],
            heldBy: [
              {
                kind: 'organization',
                name: 'Encyclopædia Britannica, 11th edition (article on the American War of Independence)'
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q12',
        text: 'In grave danger of an assault from the allies, Cornwallis offered to surrender on the 17th; two days later his whole army, consisting of 7073 officers and men, was surrendered, and American Independence was practically assured.',
        lang: 'en',
        cite: { source: 'britannica-1911-yorktown', loc: { section: 'Yorktown', para: '2' } },
        provenance: {
          via: 'web',
          at: '2026-10-13',
          url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Yorktown'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1783-09-03' },
            cites: [
              {
                source: 'state-dept-milestones-treaty-of-paris-1783',
                loc: { section: 'Treaty of Paris, 1783', para: '3' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q13',
        text: 'France signed preliminary articles of peace with Great Britain on January 20, 1783, followed by a formal peace of Paris signed on September 3, 1783.',
        lang: 'en',
        cite: {
          source: 'state-dept-milestones-treaty-of-paris-1783',
          loc: { section: 'Treaty of Paris, 1783', para: '3' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-13',
          url: 'https://history.state.gov/milestones/1776-1783/treaty'
        }
      }
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/e/ec/Emanuel_Leutze_Washington_Crossing_the_Delaware_The_Metropolitan_Museum_of_Art.jpg/1280px-Emanuel_Leutze_Washington_Crossing_the_Delaware_The_Metropolitan_Museum_of_Art.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Emanuel_Leutze_Washington_Crossing_the_Delaware_The_Metropolitan_Museum_of_Art.jpg',
    credit: { institution: 'The Metropolitan Museum of Art', creator: 'Emanuel Leutze' },
    license: { id: 'public-domain' }
  }
})
