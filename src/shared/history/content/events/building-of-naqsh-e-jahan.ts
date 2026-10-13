import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'building-of-naqsh-e-jahan',
  names: [
    { text: 'Building of Naqsh-e Jahan Square', lang: 'en', role: 'primary' },
    {
      text: 'Meydān-e Naqš-e Jahān',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'iranica-babaie-isfahan-x1-historical-survey',
          loc: { section: 'Isfahan x. MONUMENTS (1) A Historical Survey', para: '20' }
        }
      ]
    }
  ],
  researched: '2026-10-13',
  type: 'cultural',
  start: {
    alts: [
      {
        value: { d: '1590', notAfter: '1591' },
        cites: [
          {
            source: 'iranica-babaie-isfahan-x1-historical-survey',
            loc: { section: 'Isfahan x. MONUMENTS (1) A Historical Survey', para: '21' }
          }
        ],
        heldBy: [
          { kind: 'scholar', name: 'Sussan Babaie', discipline: 'historian' }
        ]
      }
    ]
  },
  regions: ['iran'],
  prominence: 3,
  places: [
    {
      ref: 'place:isfahan',
      cites: [
        {
          source: 'iranica-babaie-isfahan-x1-historical-survey',
          loc: { section: 'Isfahan x. MONUMENTS (1) A Historical Survey', para: '20' }
        }
      ]
    }
  ],
  polities: [
    {
      ref: 'polity:safavid-iran',
      cites: [
        {
          source: 'iranica-babaie-isfahan-x1-historical-survey',
          loc: { section: 'Isfahan x. MONUMENTS (1) A Historical Survey', para: '20' }
        }
      ]
    }
  ],
  participants: [
    {
      ref: 'person:abbas-i',
      role: 'leader',
      cites: [
        {
          source: 'iranica-babaie-isfahan-x1-historical-survey',
          loc: { section: 'Isfahan x. MONUMENTS (1) A Historical Survey', para: '20' }
        }
      ]
    },
    {
      ref: 'person:sheikh-bahai',
      role: 'participant',
      cites: [
        {
          source: 'iranica-babaie-isfahan-x1-historical-survey',
          loc: { section: 'Isfahan x. MONUMENTS (1) A Historical Survey', para: '25' }
        }
      ]
    }
  ],
  related: [
    {
      ref: 'event:transfer-of-the-capital-to-isfahan',
      rel: 'preceded-by',
      cites: [
        {
          source: 'iranica-babaie-isfahan-x1-historical-survey',
          loc: { section: 'Isfahan x. MONUMENTS (1) A Historical Survey', para: '20' }
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
          text: 'A new royal square, the Meydān-e Naqš-e Jahān, measuring 524 x 158 m, formed the fulcrum of this development.',
          lang: 'en',
          cite: {
            source: 'iranica-haneda-matthee-isfahan-safavid-period',
            loc: { section: 'ISFAHAN vii. SAFAVID PERIOD', para: '13' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/isfahan-vii-safavid-period'
          }
        },
        {
          id: 'q2',
          text: 'The master plan of Shah ʿAbbās took shape outside the medieval walled city to its southwest.',
          lang: 'en',
          cite: {
            source: 'iranica-babaie-isfahan-x1-historical-survey',
            loc: { section: 'Isfahan x. MONUMENTS (1) A Historical Survey', para: '20' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/isfahan-x1-a-historical-survey'
          }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q3',
          text: 'Isfahan’s newly acquired status found expression in the construction of a new governmental and commercial center southwest of the existing one, in a shift in that direction that had begun under the Saljuqs',
          lang: 'en',
          cite: {
            source: 'iranica-haneda-matthee-isfahan-safavid-period',
            loc: { section: 'ISFAHAN vii. SAFAVID PERIOD', para: '13' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/isfahan-vii-safavid-period'
          }
        },
        {
          id: 'q4',
          text: 'In 1509 he ordered the enlargement of the Meydān-e Naqš-e Jahān (Royal Square) to accommodate the playing of polo, qabāq-bāzi, and other games and forms of entertainment.',
          lang: 'en',
          cite: {
            source: 'iranica-haneda-matthee-isfahan-safavid-period',
            loc: { section: 'ISFAHAN vii. SAFAVID PERIOD', para: '5' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/isfahan-vii-safavid-period'
          }
        }
      ]
    },
    {
      kind: 'course',
      quotes: [
        {
          id: 'q5',
          text: 'The first installment focused on the Meydān-e Naqš-e Jahān, when in 1590-91 the square was formalized as an urban space by virtue of leveling its surface area and containing it within a rectangular perimeter “wall” of a one-story row of shops.',
          lang: 'en',
          cite: {
            source: 'iranica-babaie-isfahan-x1-historical-survey',
            loc: { section: 'Isfahan x. MONUMENTS (1) A Historical Survey', para: '21' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/isfahan-x1-a-historical-survey'
          }
        },
        {
          id: 'q6',
          text: 'Anchored on these earlier building works was the 1602 campaign during which the functionality of the Meydān-e Naqš-e Jahān was enhanced with the addition of a second row of shops and a second-story of rooms above, thus shrinking the area of the Meydān but formalizing and adding more shops and a covered walkway in between the rows (Galdieri, 1970).',
          lang: 'en',
          cite: {
            source: 'iranica-babaie-isfahan-x1-historical-survey',
            loc: { section: 'Isfahan x. MONUMENTS (1) A Historical Survey', para: '23' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/isfahan-x1-a-historical-survey'
          }
        },
        {
          id: 'q7',
          text: 'Begun with the other constructions of 1602, the chapel-mosque of Shaikh Loṭf-Allāh stood across from the ʿĀli Qāpu',
          lang: 'en',
          cite: {
            source: 'iranica-babaie-isfahan-x1-historical-survey',
            loc: { section: 'Isfahan x. MONUMENTS (1) A Historical Survey', para: '24' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/isfahan-x1-a-historical-survey'
          }
        },
        {
          id: 'q8',
          text: 'Masjed-e Šāh on the south side of the Meydān-e Naqš-e Jahān formed the climactic conclusion of the major building works under Shah ʿAbbās’s patronage.',
          lang: 'en',
          cite: {
            source: 'iranica-babaie-isfahan-x1-historical-survey',
            loc: { section: 'Isfahan x. MONUMENTS (1) A Historical Survey', para: '25' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/isfahan-x1-a-historical-survey'
          }
        },
        {
          id: 'q9',
          text: 'The Armenian suburb of New Julfa, begun after 1603-04 to house the forcibly resettled merchant families of Julfa, and the ʿAbbāsābād planned neighborhood (begun in 1611) for the displaced merchants of Tabriz are amongst the most notable of the new urban developments in Isfahan',
          lang: 'en',
          cite: {
            source: 'iranica-babaie-isfahan-x1-historical-survey',
            loc: { section: 'Isfahan x. MONUMENTS (1) A Historical Survey', para: '22' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/isfahan-x1-a-historical-survey'
          }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q10',
          text: 'Fiercely opposed theological views had delayed the conclusion of this debate and exposed the Safavids to Sunni, especially Ottoman, accusations of apostasy and illegitimacy.',
          lang: 'en',
          cite: {
            source: 'iranica-babaie-isfahan-x1-historical-survey',
            loc: { section: 'Isfahan x. MONUMENTS (1) A Historical Survey', para: '25' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/isfahan-x1-a-historical-survey'
          }
        },
        {
          id: 'q12',
          text: 'The model for the meydān seems to have been the meydān of the old city, although it has been suggested that the meydān of Kermān, laid out by Ganj-ʿAli Khan in the late 16th century, served as a model as well',
          lang: 'en',
          cite: {
            source: 'iranica-haneda-matthee-isfahan-safavid-period',
            loc: { section: 'ISFAHAN vii. SAFAVID PERIOD', para: '13' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/isfahan-vii-safavid-period'
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
            value: { d: '1590', notAfter: '1591' },
            cites: [
              {
                source: 'iranica-babaie-isfahan-x1-historical-survey',
                loc: { section: 'Isfahan x. MONUMENTS (1) A Historical Survey', para: '21' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q13',
        text: 'A two-story monumental gateway on the western side of the Meydān constituted the ceremonial marking of the threshold between the public urban space and the royal precinct of the Bāḡ-e Naqš-e Jahān, the royal garden retreat of Isfahan in use since at least the Timurid period (15th cent.).',
        lang: 'en',
        cite: {
          source: 'iranica-babaie-isfahan-x1-historical-survey',
          loc: { section: 'Isfahan x. MONUMENTS (1) A Historical Survey', para: '21' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-13',
          url: 'https://www.iranicaonline.org/articles/isfahan-x1-a-historical-survey'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1596' },
            cites: [
              {
                source: 'iranica-babaie-isfahan-x1-historical-survey',
                loc: { section: 'Isfahan x. MONUMENTS (1) A Historical Survey', para: '22' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q14',
        text: 'The next major building campaign began in 1596 with the construction of the Čahārbāḡ promenade on the western flank of the royal precinct of Bāḡ-e Naqš-e Jahān.',
        lang: 'en',
        cite: {
          source: 'iranica-babaie-isfahan-x1-historical-survey',
          loc: { section: 'Isfahan x. MONUMENTS (1) A Historical Survey', para: '22' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-13',
          url: 'https://www.iranicaonline.org/articles/isfahan-x1-a-historical-survey'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1602' },
            cites: [
              {
                source: 'iranica-babaie-isfahan-x1-historical-survey',
                loc: { section: 'Isfahan x. MONUMENTS (1) A Historical Survey', para: '23' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q15',
        text: 'The palace gateway was raised by another two stories at this point to become not only the seat of the judiciary and the special guards, but also the most accessible of the ceremonial palaces of the royal precinct.',
        lang: 'en',
        cite: {
          source: 'iranica-babaie-isfahan-x1-historical-survey',
          loc: { section: 'Isfahan x. MONUMENTS (1) A Historical Survey', para: '23' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-13',
          url: 'https://www.iranicaonline.org/articles/isfahan-x1-a-historical-survey'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1603' },
            cites: [
              {
                source: 'iranica-haneda-matthee-isfahan-safavid-period',
                loc: { section: 'ISFAHAN vii. SAFAVID PERIOD', para: '13' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q16',
        text: 'In the year 1012/1603, the shops, the caravansaries, the bathhouses, and the coffeehouses around the meydān were completed',
        lang: 'en',
        cite: {
          source: 'iranica-haneda-matthee-isfahan-safavid-period',
          loc: { section: 'ISFAHAN vii. SAFAVID PERIOD', para: '13' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-13',
          url: 'https://www.iranicaonline.org/articles/isfahan-vii-safavid-period'
        }
      }
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/7/74/Naqsh-e_Jahan_Square_from_the_gheisariye_Vault.jpg/1280px-Naqsh-e_Jahan_Square_from_the_gheisariye_Vault.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Naqsh-e_Jahan_Square_from_the_gheisariye_Vault.jpg',
    credit: { creator: 'Amir Pashaei' },
    license: { id: 'cc-by-sa', version: '4.0', url: 'https://creativecommons.org/licenses/by-sa/4.0' }
  }
})
