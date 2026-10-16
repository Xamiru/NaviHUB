import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'english-civil-war',
  names: [
    { text: 'English Civil War', lang: 'en', role: 'primary' },
    {
      text: 'Great Rebellion',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'britannica-1911-great-rebellion',
          loc: { section: 'Great Rebellion', para: '1' }
        }
      ]
    }
  ],
  researched: '2026-10-13',
  type: 'war',
  start: {
    alts: [
      {
        value: { d: '1642-08' },
        cites: [
          {
            source: 'britannica-1911-great-rebellion',
            loc: { section: 'Great Rebellion', para: '1' }
          },
          {
            source: 'britannica-1911-charles-i-king-of-england',
            loc: { section: 'Charles I. (King of England)', para: '10' }
          }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1652-05' },
        cites: [
          {
            source: 'britannica-1911-great-rebellion',
            loc: { section: 'Great Rebellion', para: '1' }
          }
        ]
      }
    ]
  },
  regions: ['europe'],
  prominence: 1,
  polities: [
    {
      ref: 'polity:kingdom-of-england',
      cites: [
        {
          source: 'britannica-1911-great-rebellion',
          loc: { section: 'Great Rebellion', para: '1' }
        }
      ]
    }
  ],
  sides: [
    {
      key: 'royalist',
      name: 'Royalists',
      cites: [
        {
          source: 'britannica-1911-great-rebellion',
          loc: { section: 'Great Rebellion', para: '3' }
        }
      ]
    },
    {
      key: 'parliament',
      name: 'Parliament',
      cites: [
        {
          source: 'britannica-1911-great-rebellion',
          loc: { section: 'Great Rebellion', para: '3' }
        }
      ]
    }
  ],
  participants: [
    {
      name: 'Charles I',
      role: 'head-of-state',
      side: 'royalist',
      cites: [
        {
          source: 'britannica-1911-charles-i-king-of-england',
          loc: { section: 'Charles I. (King of England)', para: '10' }
        }
      ]
    },
    {
      ref: 'person:oliver-cromwell',
      role: 'commander',
      side: 'parliament',
      cites: [
        {
          source: 'britannica-1911-cromwell-oliver',
          loc: { section: 'Cromwell, Oliver', para: '11' }
        }
      ]
    },
    {
      name: 'Prince Rupert',
      role: 'commander',
      side: 'royalist',
      cites: [
        {
          source: 'britannica-1911-great-rebellion',
          loc: { section: 'Great Rebellion', para: '8' }
        }
      ]
    }
  ],
  related: [
    {
      ref: 'event:glorious-revolution',
      rel: 'led-to',
      cites: [
        {
          source: 'britannica-1911-william-iii-king-of-england',
          loc: { section: 'William III., King of England', para: '5' }
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
          text: 'On the 22nd of August the king set up his standard at Nottingham, and on the 23rd of October he fought the indecisive battle of Edgehill, occupying Oxford and advancing as far as Brentford.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-charles-i-king-of-england',
            loc: { section: 'Charles I. (King of England)', para: '10' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Charles_I._(King_of_England)'
          }
        },
        {
          id: 'q2',
          text: 'It is usual to classify these wars into the First Civil War of 1642–46, and the Second Civil War of 1648–52.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-great-rebellion',
            loc: { section: 'Great Rebellion', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Great_Rebellion'
          }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q3',
          text: 'Both parties raised men when and where they could, each claiming that the law was on its side—for England was already a law-abiding nation—and acting in virtue of legal instruments.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-great-rebellion',
            loc: { section: 'Great Rebellion', para: '3' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Great_Rebellion'
          }
        },
        {
          id: 'q4',
          text: 'It is impossible rightly to understand the events of this most national of all English wars without some knowledge of the motive forces on both sides.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-great-rebellion',
            loc: { section: 'Great Rebellion', para: '2' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Great_Rebellion'
          }
        },
        {
          id: 'q5',
          text: 'Material force was throughout on the side of the Parliamentary party.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-great-rebellion',
            loc: { section: 'Great Rebellion', para: '3' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Great_Rebellion'
          }
        }
      ]
    },
    {
      kind: 'course',
      quotes: [
        {
          id: 'q6',
          text: 'During most of this time another civil war was raging in Ireland.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-great-rebellion',
            loc: { section: 'Great Rebellion', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Great_Rebellion'
          }
        },
        {
          id: 'q7',
          text: 'Cromwell himself sailed a fortnight later, leaving the reduction of the island, which was completed in 1652, to his generals.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-cromwell-oliver',
            loc: { section: 'Cromwell, Oliver', para: '26' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Cromwell,_Oliver'
          }
        },
        {
          id: 'q8',
          text: 'He entered Scotland in July, and after a campaign in the neighbourhood of Edinburgh which proved unsuccessful in drawing out the Scots from their fortresses, he retreated to Dunbar to await reinforcements from Berwick.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-cromwell-oliver',
            loc: { section: 'Cromwell, Oliver', para: '32' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Cromwell,_Oliver'
          }
        },
        {
          id: 'q9',
          text: 'The Scots under Leslie followed him, occupied Doon Hill commanding the town, and seized the passes between Dunbar and Berwick which Cromwell had omitted to secure.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-cromwell-oliver',
            loc: { section: 'Cromwell, Oliver', para: '32' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Cromwell,_Oliver'
          }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q10',
          text: 'The king and the monarchy being now destroyed in England, Cromwell had next to turn his attention to the suppression of royalism in Ireland and in Scotland.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-cromwell-oliver',
            loc: { section: 'Cromwell, Oliver', para: '23' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Cromwell,_Oliver'
          }
        },
        {
          id: 'q11',
          text: 'The close of the First Civil War left England and Scotland in the hands potentially of any one of the four parties or any combination of two or more that should prove strong enough to dominate the rest.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-great-rebellion',
            loc: { section: 'Great Rebellion', para: '61' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Great_Rebellion'
          }
        },
        {
          id: 'q12',
          text: 'On the 12th of September 1651 Cromwell made his triumphal entry into London at the conclusion of his victorious campaigns; and parliament granted him Hampton Court as a residence with £4000 a year.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-cromwell-oliver',
            loc: { section: 'Cromwell, Oliver', para: '34' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Cromwell,_Oliver'
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
            value: { d: '1642-08' },
            cites: [
              {
                source: 'britannica-1911-great-rebellion',
                loc: { section: 'Great Rebellion', para: '5' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q13',
        text: 'When the king raised his standard at Nottingham on the 22nd of August 1642, war was already in progress on a small scale in many districts, each side endeavouring to secure, or to deny to the enemy, fortified country-houses, territory, and above all arms and money.',
        lang: 'en',
        cite: {
          source: 'britannica-1911-great-rebellion',
          loc: { section: 'Great Rebellion', para: '5' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-13',
          url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Great_Rebellion'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1645-06' },
            cites: [
              {
                source: 'britannica-1911-charles-i-king-of-england',
                loc: { section: 'Charles I. (King of England)', para: '13' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q14',
        text: 'The negotiations carried on at Uxbridge during January and February 1645 failed to secure a settlement, and on the 14th of June the crushing defeat of the king’s forces by the new model army at Naseby practically ended the civil war.',
        lang: 'en',
        cite: {
          source: 'britannica-1911-charles-i-king-of-england',
          loc: { section: 'Charles I. (King of England)', para: '13' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-13',
          url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Charles_I._(King_of_England)'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1646-03' },
            cites: [
              {
                source: 'britannica-1911-great-rebellion',
                loc: { section: 'Great Rebellion', para: '60' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q15',
        text: 'Elsewhere, Hereford was taken on December 17, 1645, and the last battle of the war was fought and lost at Stow-on-the-Wold by Lord Astley on March 21, 1646.',
        lang: 'en',
        cite: {
          source: 'britannica-1911-great-rebellion',
          loc: { section: 'Great Rebellion', para: '60' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-13',
          url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Great_Rebellion'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1648-02' },
            cites: [
              {
                source: 'britannica-1911-great-rebellion',
                loc: { section: 'Great Rebellion', para: '62' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q16',
        text: 'In February 1648 Colonel Poyer, the Parliamentary governor of Pembroke Castle, refused to hand over his command to one of Fairfax’s officers, and he was soon joined by some hundreds of officers and men, who mutinied, ostensibly for arrears of pay, but really with political objects.',
        lang: 'en',
        cite: {
          source: 'britannica-1911-great-rebellion',
          loc: { section: 'Great Rebellion', para: '62' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-13',
          url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Great_Rebellion'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1649-01' },
            cites: [
              {
                source: 'britannica-1911-charles-i-king-of-england',
                loc: { section: 'Charles I. (King of England)', para: '15' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q17',
        text: 'On the 26th, however, the court decided unanimously upon his execution, and on the 27th Charles was brought into court for the last time to hear his sentence.',
        lang: 'en',
        cite: {
          source: 'britannica-1911-charles-i-king-of-england',
          loc: { section: 'Charles I. (King of England)', para: '15' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-13',
          url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Charles_I._(King_of_England)'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1649-01' },
            cites: [
              {
                source: 'britannica-1911-charles-i-king-of-england',
                loc: { section: 'Charles I. (King of England)', para: '16' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q18',
        text: 'He was separated from the people by large ranks of soldiers, and his last speech only reached Juxon and those with him on the scaffold.',
        lang: 'en',
        cite: {
          source: 'britannica-1911-charles-i-king-of-england',
          loc: { section: 'Charles I. (King of England)', para: '16' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-13',
          url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Charles_I._(King_of_England)'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1650-07' },
            cites: [
              {
                source: 'britannica-1911-cromwell-oliver',
                loc: { section: 'Cromwell, Oliver', para: '32' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q19',
        text: 'Cromwell was outmanœuvred and in a perilous situation, completely cut off from England and from his supplies except from the sea.',
        lang: 'en',
        cite: {
          source: 'britannica-1911-cromwell-oliver',
          loc: { section: 'Cromwell, Oliver', para: '32' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-13',
          url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Cromwell,_Oliver'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1651-09' },
            cites: [
              {
                source: 'britannica-1911-cromwell-oliver',
                loc: { section: 'Cromwell, Oliver', para: '32' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q20',
        text: 'Cromwell followed through Yorkshire, and uniting with Lambert and Harrison at Evesham proceeded to attack the royalists at Worcester; where on the 3rd of September after a fierce struggle the great victory, “the crowning mercy” which terminated the Civil War, was obtained over Charles.',
        lang: 'en',
        cite: {
          source: 'britannica-1911-cromwell-oliver',
          loc: { section: 'Cromwell, Oliver', para: '32' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-13',
          url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Cromwell,_Oliver'
        }
      }
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/6/6c/Anthony_van_Dyck_-_Charles_I_%281600-49%29_with_M._de_St_Antoine_-_Google_Art_Project.jpg/1280px-Anthony_van_Dyck_-_Charles_I_%281600-49%29_with_M._de_St_Antoine_-_Google_Art_Project.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Anthony_van_Dyck_-_Charles_I_(1600-49)_with_M._de_St_Antoine_-_Google_Art_Project.jpg',
    credit: { institution: 'Royal Collection', creator: 'Anthony van Dyck' },
    license: { id: 'public-domain' }
  },
  places: [
    {
      ref: 'place:london',
      cites: [
        {
          source: 'britannica-1911-great-rebellion',
          loc: { section: 'Great Rebellion', para: '77' }
        }
      ]
    }
  ]
})
