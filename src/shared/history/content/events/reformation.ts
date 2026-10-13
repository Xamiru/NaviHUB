import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'reformation',
  names: [
    { text: 'Reformation', lang: 'en', role: 'primary' },
    {
      text: 'Protestant Reformation',
      lang: 'en',
      role: 'alternative',
      cites: [
        { source: 'britannica-1911-reformation', loc: { section: 'Reformation', para: '44' } }
      ]
    }
  ],
  researched: '2026-10-13',
  type: 'religious',
  start: {
    alts: [
      {
        value: { d: '1517-11-01' },
        cites: [
          {
            source: 'britannica-1911-luther-martin',
            loc: { section: 'Luther, Martin', para: '14' }
          }
        ],
        heldBy: [
          {
            kind: 'organization',
            name: 'Encyclopædia Britannica, 11th edition (article on Martin Luther)'
          }
        ]
      },
      {
        value: { d: '1517-10-31' },
        cites: [
          {
            source: 'catholic-encyclopedia-martin-luther',
            loc: { section: 'Martin Luther', para: '32' }
          }
        ],
        heldBy: [
          { kind: 'organization', name: 'The Catholic Encyclopedia (1913)' }
        ]
      }
    ]
  },
  regions: ['europe'],
  prominence: 1,
  places: [
    {
      ref: 'place:wittenberg',
      cites: [
        { source: 'britannica-1911-reformation', loc: { section: 'Reformation', para: '9' } }
      ]
    },
    {
      ref: 'place:worms',
      cites: [
        {
          source: 'britannica-1911-luther-martin',
          loc: { section: 'Luther, Martin', para: '36' }
        }
      ]
    }
  ],
  polities: [
    {
      ref: 'polity:holy-roman-empire',
      cites: [
        {
          source: 'britannica-1911-charles-v-roman-emperor',
          loc: { section: 'Charles V. (Roman Emperor)', para: '16' }
        }
      ]
    }
  ],
  participants: [
    {
      ref: 'person:martin-luther',
      role: 'leader',
      cites: [
        {
          source: 'britannica-1911-luther-martin',
          loc: { section: 'Luther, Martin', para: '14' }
        }
      ]
    },
    {
      ref: 'person:charles-v',
      role: 'head-of-state',
      cites: [
        {
          source: 'britannica-1911-charles-v-roman-emperor',
          loc: { section: 'Charles V. (Roman Emperor)', para: '16' }
        }
      ]
    }
  ],
  related: [
    {
      ref: 'event:council-of-trent',
      rel: 'led-to',
      cites: [
        {
          source: 'catholic-encyclopedia-martin-luther',
          loc: { section: 'Martin Luther', para: '32' }
        }
      ]
    },
    {
      ref: 'event:thirty-years-war',
      rel: 'led-to',
      cites: [
        { source: 'britannica-1911-reformation', loc: { section: 'Reformation', para: '1' } }
      ]
    }
  ],
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'The Reformation, as commonly understood, means the religious and political revolution of the 16th century, of which the immediate result was the partial disruption of the Western Catholic Church and the establishment of various national and territorial churches.',
          lang: 'en',
          cite: { source: 'britannica-1911-reformation', loc: { section: 'Reformation', para: '1' } },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Reformation'
          }
        },
        {
          id: 'q2',
          text: 'These agreed in repudiating certain of the doctrines, rites and practices of the medieval Church, especially the sacrifice of the Mass and the headship of the bishop of Rome, and, whatever their official designations, came generally to be known as “Protestant.”',
          lang: 'en',
          cite: { source: 'britannica-1911-reformation', loc: { section: 'Reformation', para: '1' } },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Reformation'
          }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q3',
          text: 'The first step in clarifying the situation is to come to a full realization that the medieval Church was essentially an international state, and that the character of the Protestant secession from it was largely determined by this fact.',
          lang: 'en',
          cite: { source: 'britannica-1911-reformation', loc: { section: 'Reformation', para: '5' } },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Reformation'
          }
        },
        {
          id: 'q4',
          text: 'Unfortunately this crude solution of the problem proved too much; for conditions were no worse immediately before the revolt than they had been for centuries, and German complaints of papal tyranny go back to Hildegard of Bingen and Walther von der Vogelweide, who antedated Luther by more than three centuries.',
          lang: 'en',
          cite: { source: 'britannica-1911-reformation', loc: { section: 'Reformation', para: '8' } },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Reformation'
          }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q5',
          text: 'France, after a long period of uncertainty and disorder, remained faithful to the bishop of Rome.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-reformation',
            loc: { section: 'Reformation', para: '10' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Reformation'
          }
        },
        {
          id: 'q6',
          text: 'In the Habsburg hereditary dominions the traditional policy and Catholic fervour of the ruling house resulted, after a long struggle, in the restoration of the supremacy of Rome; while in Hungary the national spirit of independence kept Calvinism alive to divide the religious allegiance of the people.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-reformation',
            loc: { section: 'Reformation', para: '10' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Reformation'
          }
        },
        {
          id: 'q7',
          text: 'An independent national Church was formed in 1534, continued, however, for a time to adhere to all the characteristic beliefs of the medieval Catholic Church, excepting alone the headship of the pope.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-reformation',
            loc: { section: 'Reformation', para: '51' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Reformation'
          }
        },
        {
          id: 'q8',
          text: 'Freedom of conscience was thus established for princes alone, and their power became supreme in religious as well as secular matters.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-reformation',
            loc: { section: 'Reformation', para: '50' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Reformation'
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
            value: { d: '1517-10-31' },
            cites: [
              {
                source: 'catholic-encyclopedia-martin-luther',
                loc: { section: 'Martin Luther', para: '32' }
              }
            ],
            heldBy: [
              { kind: 'organization', name: 'The Catholic Encyclopedia (1913)' }
            ]
          },
          {
            value: { d: '1517-11-01' },
            cites: [
              {
                source: 'britannica-1911-luther-martin',
                loc: { section: 'Luther, Martin', para: '14' }
              }
            ],
            heldBy: [
              {
                kind: 'organization',
                name: 'Encyclopædia Britannica, 11th edition (article on Martin Luther)'
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q9',
        text: 'On 31 October, 1517, the vigil of All Saints\', Luther affixed to the castle church door, which served as the "black-board" of the university, on which all notices of disputations and high academic functions were displayed, his Ninety-five Theses.',
        lang: 'en',
        cite: {
          source: 'catholic-encyclopedia-martin-luther',
          loc: { section: 'Martin Luther', para: '32' }
        },
        provenance: { via: 'web', at: '2026-10-13', url: 'https://www.newadvent.org/cathen/09438b.htm' }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1521-01-22' },
            cites: [
              {
                source: 'britannica-1911-luther-martin',
                loc: { section: 'Luther, Martin', para: '36' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q10',
        text: 'Charles was crowned at Aachen, 23rd of October 1520, and opened his first German diet at Worms, 22nd of January 1521.',
        lang: 'en',
        cite: {
          source: 'britannica-1911-luther-martin',
          loc: { section: 'Luther, Martin', para: '36' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-13',
          url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Luther,_Martin'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1529' },
            cites: [
              {
                source: 'britannica-1911-reformation',
                loc: { section: 'Reformation', para: '44' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q11',
        text: 'The diet of Spires (1529) had received a letter from the emperor directing it to look to the enforcement of the edict of Worms against the heretics.',
        lang: 'en',
        cite: { source: 'britannica-1911-reformation', loc: { section: 'Reformation', para: '44' } },
        provenance: {
          via: 'web',
          at: '2026-10-13',
          url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Reformation'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1530' },
            cites: [
              {
                source: 'britannica-1911-charles-v-roman-emperor',
                loc: { section: 'Charles V. (Roman Emperor)', para: '16' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q12',
        text: 'Three separate confessions were presented to the emperor—one from Zwingli, one by the theologians of the four cities of Strassbourg, Constance, Lindau and Memmingen (Confessio Tetrapolitana), and the Augsburg Confession, the future symbol of the Lutheran church.',
        lang: 'en',
        cite: {
          source: 'britannica-1911-luther-martin',
          loc: { section: 'Luther, Martin', para: '45' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-13',
          url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Luther,_Martin'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1555' },
            cites: [
              {
                source: 'britannica-1911-reformation',
                loc: { section: 'Reformation', para: '50' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q13',
        text: 'The principle cujus regio ejus religio was adopted, according to which each secular ruler might choose between the old faith and the Lutheran.',
        lang: 'en',
        cite: { source: 'britannica-1911-reformation', loc: { section: 'Reformation', para: '50' } },
        provenance: {
          via: 'web',
          at: '2026-10-13',
          url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Reformation'
        }
      }
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/2/20/Luther95theses.jpg/1280px-Luther95theses.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Luther95theses.jpg',
    credit: { creator: 'Ferdinand Pauwels' },
    license: { id: 'public-domain' }
  }
})
