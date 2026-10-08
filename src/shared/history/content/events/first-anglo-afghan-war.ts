import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'first-anglo-afghan-war',
  names: [
    { text: 'First Anglo-Afghan War', lang: 'en', role: 'primary' },
    {
      text: 'Auckland\'s Folly',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'loc-afghanistan-country-study-2001',
          loc: { section: 'The First Anglo-Afghan War', para: '2' }
        }
      ]
    }
  ],
  researched: '2026-10-08',
  type: 'war',
  start: {
    alts: [
      {
        value: { d: '1838' },
        cites: [
          {
            source: 'loc-afghanistan-country-study-2001',
            loc: { section: 'The First Anglo-Afghan War', para: '2' }
          },
          {
            source: 'iranica-adamec-norris-anglo-afghan-wars',
            loc: { section: 'ANGLO-AFGHAN WARS i. First Anglo-Afghan War (1838-42)', para: '5' }
          }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1842' },
        cites: [
          {
            source: 'loc-afghanistan-country-study-2001',
            loc: { section: 'The First Anglo-Afghan War', para: '2' }
          }
        ]
      }
    ]
  },
  regions: ['south-asia', 'europe'],
  prominence: 2,
  places: [
    {
      ref: 'place:kabul',
      cites: [
        {
          source: 'loc-afghanistan-country-study-2001',
          loc: { section: 'The First Anglo-Afghan War', para: '2' }
        }
      ]
    }
  ],
  sides: [
    {
      key: 'british',
      name: 'a British Indian army',
      cites: [
        {
          source: 'iranica-adamec-norris-anglo-afghan-wars',
          loc: { section: 'ANGLO-AFGHAN WARS i. First Anglo-Afghan War (1838-42)', para: '1' }
        }
      ]
    },
    {
      key: 'barakzay',
      name: 'the Bārakzay rulers of Kabul and Qandahār',
      cites: [
        {
          source: 'iranica-adamec-norris-anglo-afghan-wars',
          loc: { section: 'ANGLO-AFGHAN WARS i. First Anglo-Afghan War (1838-42)', para: '1' }
        }
      ]
    },
    {
      key: 'kabul-garrison',
      name: 'the British garrison',
      cites: [
        {
          source: 'loc-afghanistan-country-study-2001',
          loc: { section: 'The First Anglo-Afghan War', para: '3' }
        }
      ]
    }
  ],
  participants: [
    {
      ref: 'person:dost-mohammad-khan',
      role: 'head-of-state',
      side: 'barakzay',
      cites: [
        {
          source: 'iranica-adamec-norris-anglo-afghan-wars',
          loc: { section: 'ANGLO-AFGHAN WARS i. First Anglo-Afghan War (1838-42)', para: '1' }
        }
      ]
    },
    {
      name: 'Mohammad Akbar',
      role: 'commander',
      side: 'barakzay',
      cites: [
        {
          source: 'loc-afghanistan-country-study-2001',
          loc: { section: 'The First Anglo-Afghan War', para: '3' }
        }
      ]
    },
    {
      name: 'Shah Shuja',
      role: 'head-of-state',
      side: 'british',
      cites: [
        {
          source: 'loc-afghanistan-country-study-2001',
          loc: { section: 'The First Anglo-Afghan War', para: '2' }
        }
      ]
    },
    {
      name: 'Lord Auckland',
      role: 'leader',
      side: 'british',
      cites: [
        {
          source: 'iranica-adamec-norris-anglo-afghan-wars',
          loc: { section: 'ANGLO-AFGHAN WARS i. First Anglo-Afghan War (1838-42)', para: '5' }
        }
      ]
    },
    {
      name: 'Alexander Burnes',
      role: 'diplomat',
      side: 'british',
      cites: [
        {
          source: 'iranica-adamec-norris-anglo-afghan-wars',
          loc: { section: 'ANGLO-AFGHAN WARS i. First Anglo-Afghan War (1838-42)', para: '2' }
        }
      ]
    },
    {
      name: 'Ranjit Singh',
      role: 'leader',
      side: 'british',
      cites: [
        {
          source: 'iranica-adamec-norris-anglo-afghan-wars',
          loc: { section: 'ANGLO-AFGHAN WARS i. First Anglo-Afghan War (1838-42)', para: '1' }
        }
      ]
    }
  ],
  figures: [
    {
      key: 'combatants',
      side: 'kabul-garrison',
      value: {
        alts: [
          {
            value: { min: 4500, qualifier: 'about' },
            cites: [
              {
                source: 'loc-afghanistan-country-study-2001',
                loc: { section: 'The First Anglo-Afghan War', para: '3' }
              }
            ]
          },
          {
            value: { min: 3000, qualifier: 'about' },
            cites: [
              {
                source: 'iranica-amanat-herat-vi',
                loc: { section: 'HERAT vi. THE HERAT QUESTION', para: '13' }
              }
            ]
          }
        ]
      }
    }
  ],
  related: [
    {
      ref: 'event:siege-of-herat-1837-1838',
      rel: 'response-to',
      cites: [
        {
          source: 'iranica-adamec-norris-anglo-afghan-wars',
          loc: { section: 'ANGLO-AFGHAN WARS i. First Anglo-Afghan War (1838-42)', para: '2' }
        },
        {
          source: 'iranica-adamec-norris-anglo-afghan-wars',
          loc: { section: 'ANGLO-AFGHAN WARS i. First Anglo-Afghan War (1838-42)', para: '5' }
        }
      ]
    }
  ],
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q2',
          text: 'From the British point of view, the First Anglo-Afghan War (1838-42) (often called "Auckland\'s Folly") was an unmitigated disaster, despite the ease with which Dost Mohammad was deposed and Shuja enthroned.',
          lang: 'en',
          cite: {
            source: 'loc-afghanistan-country-study-2001',
            loc: { section: 'The First Anglo-Afghan War', para: '2' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/afghanistan/13.htm' }
        },
        {
          id: 'q1',
          text: 'This war was fought between a British Indian army in alliance with the still-independent Sikhs under Ranjit Singh, and the Bārakzay rulers of Kabul and Qandahār.',
          lang: 'en',
          cite: {
            source: 'iranica-adamec-norris-anglo-afghan-wars',
            loc: { section: 'ANGLO-AFGHAN WARS i. First Anglo-Afghan War (1838-42)', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/anglo-afghan-wars'
          }
        },
        {
          id: 'q3',
          text: 'The invading army became one of occupation, but complacency after apparent victory, coupled with the need for economy, weakened the occupying force.',
          lang: 'en',
          cite: {
            source: 'iranica-adamec-norris-anglo-afghan-wars',
            loc: { section: 'ANGLO-AFGHAN WARS i. First Anglo-Afghan War (1838-42)', para: '5' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/anglo-afghan-wars'
          }
        }
      ]
    },
    {
      kind: 'casualties',
      quotes: [
        {
          id: 'q4',
          text: 'Dr. W. Brydon is frequently mentioned as the only survivor of the march to Jalalabad--out of a column of more than 16,000 (consisting of about 4,500 military personnel, both British and Indian, along with as many as 12,000 camp followers) who undertook the retreat--a few more survived as prisoners and hostages.',
          lang: 'en',
          cite: {
            source: 'loc-afghanistan-country-study-2001',
            loc: { section: 'The First Anglo-Afghan War', para: '3' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/afghanistan/13.htm' }
        },
        {
          id: 'q5',
          text: 'The British however, were soon obliged to withdraw from Kabul in the face of a popular uprising; and the retreating forces, numbering some 3000 troops, were massacred in Jalā-lābād by the Afghans under Akbar Khan, Dōst-Mo-ḥammad’s son (see ANGLO AFGHAN WARS i.).',
          lang: 'en',
          cite: {
            source: 'iranica-amanat-herat-vi',
            loc: { section: 'HERAT vi. THE HERAT QUESTION', para: '13' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/herat-vi'
          }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q6',
          text: 'The complete destruction of the garrison prompted brutal retaliation by the British against the Afghans and touched off yet another power struggle for dominance of Afghanistan.',
          lang: 'en',
          cite: {
            source: 'loc-afghanistan-country-study-2001',
            loc: { section: 'The First Anglo-Afghan War', para: '4' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/afghanistan/13.htm' }
        },
        {
          id: 'q7',
          text: 'Although the foreign invasion provided the Afghan tribes with a temporary sense of unity they had previously lacked, the loss of life and property was followed by a bitter resentment of foreign influence.',
          lang: 'en',
          cite: {
            source: 'loc-afghanistan-country-study-2001',
            loc: { section: 'The First Anglo-Afghan War', para: '4' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/afghanistan/13.htm' }
        },
        {
          id: 'q8',
          text: 'In reality there was no more anarchy than before, except in the limited sense that Shah Šoǰāʿ’s death deprived Kabul of a nominal ruler, however weak.',
          lang: 'en',
          cite: {
            source: 'iranica-adamec-norris-anglo-afghan-wars',
            loc: { section: 'ANGLO-AFGHAN WARS i. First Anglo-Afghan War (1838-42)', para: '6' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/anglo-afghan-wars'
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
            value: { d: '1838-10' },
            cites: [
              {
                source: 'loc-afghanistan-country-study-2001',
                loc: { section: 'The First Anglo-Afghan War', para: '1' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q9',
        text: 'To justify his plan, Auckland issued the Simla Manifesto in October 1838, setting forth the necessary reasons for British intervention in Afghanistan.',
        lang: 'en',
        cite: {
          source: 'loc-afghanistan-country-study-2001',
          loc: { section: 'The First Anglo-Afghan War', para: '1' }
        },
        provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/afghanistan/13.htm' }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1838-12' },
            cites: [
              {
                source: 'loc-afghanistan-country-study-2001',
                loc: { section: 'The First Anglo-Afghan War', para: '2' }
              }
            ]
          },
          {
            value: { d: '1842-02' },
            cites: [
              {
                source: 'iranica-amanat-herat-vi',
                loc: { section: 'HERAT vi. THE HERAT QUESTION', para: '13' }
              }
            ],
            heldBy: [
              { kind: 'scholar', name: 'Abbas Amanat' }
            ]
          }
        ]
      },
      quote: {
        id: 'q10',
        text: 'An army of British and Indian troops set out from the Punjab in December 1838 and reached Quetta by late March 1839.',
        lang: 'en',
        cite: {
          source: 'loc-afghanistan-country-study-2001',
          loc: { section: 'The First Anglo-Afghan War', para: '2' }
        },
        provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/afghanistan/13.htm' }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1839-08' },
            cites: [
              {
                source: 'loc-afghanistan-country-study-2001',
                loc: { section: 'The First Anglo-Afghan War', para: '2' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q11',
        text: 'In August 1839, after almost thirty years, Shuja was again enthroned in Kabul.',
        lang: 'en',
        cite: {
          source: 'loc-afghanistan-country-study-2001',
          loc: { section: 'The First Anglo-Afghan War', para: '2' }
        },
        provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/afghanistan/13.htm' }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1841-11' },
            cites: [
              {
                source: 'iranica-adamec-norris-anglo-afghan-wars',
                loc: { section: 'ANGLO-AFGHAN WARS i. First Anglo-Afghan War (1838-42)', para: '5' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q12',
        text: 'In November, 1841, there was an uprising in Kabul; Burnes was killed, along with many others.',
        lang: 'en',
        cite: {
          source: 'iranica-adamec-norris-anglo-afghan-wars',
          loc: { section: 'ANGLO-AFGHAN WARS i. First Anglo-Afghan War (1838-42)', para: '5' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://www.iranicaonline.org/articles/anglo-afghan-wars'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1842-01-01' },
            cites: [
              {
                source: 'loc-afghanistan-country-study-2001',
                loc: { section: 'The First Anglo-Afghan War', para: '3' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q13',
        text: 'On January 1, 1842, their presence no longer wanted, an agreement was reached that provided for the safe exodus of the British garrison and its dependents from Afghanistan.',
        lang: 'en',
        cite: {
          source: 'loc-afghanistan-country-study-2001',
          loc: { section: 'The First Anglo-Afghan War', para: '3' }
        },
        provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/afghanistan/13.htm' }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1842-04' },
            cites: [
              {
                source: 'loc-afghanistan-country-study-2001',
                loc: { section: 'The First Anglo-Afghan War', para: '3' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q14',
        text: 'His British protectors gone, Shuja remained in power only a few months before being assassinated in April 1842.',
        lang: 'en',
        cite: {
          source: 'loc-afghanistan-country-study-2001',
          loc: { section: 'The First Anglo-Afghan War', para: '3' }
        },
        provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/afghanistan/13.htm' }
      }
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/6/6d/Remnants_of_an_army2.jpg/1280px-Remnants_of_an_army2.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Remnants_of_an_army2.jpg',
    credit: { institution: 'Tate', creator: 'Elizabeth Thompson' },
    license: { id: 'public-domain' }
  },
  archive: [
    {
      id: 'kaye-1874',
      mediaKind: 'document',
      title: 'History of the war in Afghanistan',
      date: { d: '1874' },
      url: 'https://archive.org/download/historyofwarinaf01kayeuoft/historyofwarinaf01kayeuoft.pdf',
      page: 'https://archive.org/details/historyofwarinaf01kayeuoft',
      credit: {
        institution: 'University of Toronto, Robarts Library (Internet Archive)',
        creator: 'John William Kaye'
      },
      license: { id: 'public-domain' },
      bytes: 35637461
    }
  ],
  furtherReading: [
    { source: 'ghubar-1996-afghanistan-dar-masir-i-tarikh', perspective: 'central-asian' }
  ]
})
