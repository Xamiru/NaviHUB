import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'deportations-from-armenia-and-the-founding-of-new-julfa',
  names: [
    {
      text: 'Deportations from Armenia and the founding of New Julfa',
      lang: 'en',
      role: 'primary'
    },
    {
      text: 'Julfa deportation',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'iranica-ghougassian-julfa-i-safavid-period',
          loc: { section: 'JULFA i. SAFAVID PERIOD', para: '8' }
        }
      ]
    }
  ],
  researched: '2026-10-13',
  type: 'migration',
  start: {
    alts: [
      {
        value: { d: '1604-10-21' },
        cites: [
          {
            source: 'iranica-ghougassian-julfa-i-safavid-period',
            loc: { section: 'JULFA i. SAFAVID PERIOD', para: '9' }
          }
        ],
        heldBy: [
          { kind: 'scholar', name: 'Vazken S. Ghougassian', discipline: 'historian' }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1605' },
        cites: [
          {
            source: 'iranica-ghougassian-julfa-i-safavid-period',
            loc: { section: 'JULFA i. SAFAVID PERIOD', para: '10' }
          }
        ]
      }
    ]
  },
  regions: ['iran', 'russia-central-asia'],
  prominence: 2,
  places: [
    {
      ref: 'place:new-julfa',
      cites: [
        {
          source: 'iranica-ghougassian-julfa-i-safavid-period',
          loc: { section: 'JULFA i. SAFAVID PERIOD', para: '10' }
        }
      ]
    },
    {
      ref: 'place:isfahan',
      cites: [
        {
          source: 'iranica-ghougassian-julfa-i-safavid-period',
          loc: { section: 'JULFA i. SAFAVID PERIOD', para: '10' }
        }
      ]
    },
    {
      ref: 'place:yerevan',
      cites: [
        {
          source: 'iranica-ghougassian-julfa-i-safavid-period',
          loc: { section: 'JULFA i. SAFAVID PERIOD', para: '8' }
        }
      ]
    }
  ],
  polities: [
    {
      ref: 'polity:safavid-iran',
      cites: [
        {
          source: 'iranica-ghougassian-julfa-i-safavid-period',
          loc: { section: 'JULFA i. SAFAVID PERIOD', para: '8' }
        }
      ]
    },
    {
      ref: 'polity:ottoman-empire',
      cites: [
        {
          source: 'iranica-ghougassian-julfa-i-safavid-period',
          loc: { section: 'JULFA i. SAFAVID PERIOD', para: '8' }
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
          source: 'iranica-ghougassian-julfa-i-safavid-period',
          loc: { section: 'JULFA i. SAFAVID PERIOD', para: '8' }
        }
      ]
    },
    {
      name: 'Armenians of Julfa',
      role: 'victim',
      cites: [
        {
          source: 'iranica-ghougassian-julfa-i-safavid-period',
          loc: { section: 'JULFA i. SAFAVID PERIOD', para: '8' }
        }
      ]
    },
    {
      name: 'Aṙakʽel of Tabriz',
      role: 'witness',
      cites: [
        {
          source: 'iranica-ghougassian-julfa-i-safavid-period',
          loc: { section: 'JULFA i. SAFAVID PERIOD', para: '9' }
        }
      ]
    }
  ],
  figures: [
    {
      key: 'displaced',
      value: {
        alts: [
          {
            value: { min: 400000, qualifier: 'about' },
            cites: [
              {
                source: 'iranica-ghougassian-julfa-i-safavid-period',
                loc: { section: 'JULFA i. SAFAVID PERIOD', para: '9' }
              }
            ],
            heldBy: [
              { kind: 'scholar', name: 'Vazken S. Ghougassian', discipline: 'historian' }
            ]
          }
        ]
      }
    }
  ],
  related: [
    {
      ref: 'event:ottoman-safavid-war-1603-1618',
      rel: 'contributed-to',
      cites: [
        {
          source: 'iranica-ghougassian-julfa-i-safavid-period',
          loc: { section: 'JULFA i. SAFAVID PERIOD', para: '8' }
        }
      ]
    },
    {
      ref: 'event:transfer-of-the-capital-to-isfahan',
      rel: 'related',
      cites: [
        {
          source: 'iranica-haneda-matthee-isfahan-safavid-period',
          loc: { section: 'ISFAHAN vii. SAFAVID PERIOD', para: '15' }
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
          text: 'The shah ordered the deportation of the population of the province of Chukhuri Saʿd to Iran and the destruction of crops and pastures.',
          lang: 'en',
          cite: {
            source: 'iranica-ghougassian-julfa-i-safavid-period',
            loc: { section: 'JULFA i. SAFAVID PERIOD', para: '8' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/julfa-i-safavid-period'
          }
        },
        {
          id: 'q2',
          text: 'The sudden deportation of about 400,000 people, who were moving before the retreating Safavid army during the cold and rainy weather on muddy roads, caused general confusion, and the Armenian refugees suffered great hardship.',
          lang: 'en',
          cite: {
            source: 'iranica-ghougassian-julfa-i-safavid-period',
            loc: { section: 'JULFA i. SAFAVID PERIOD', para: '9' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/julfa-i-safavid-period'
          }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q3',
          text: 'Until 1500 little is known about this Armenian village, which in the 16th century became a mercantile center for the Levantine trade of raw silk (Herzig, 1996).',
          lang: 'en',
          cite: {
            source: 'iranica-ghougassian-julfa-i-safavid-period',
            loc: { section: 'JULFA i. SAFAVID PERIOD', para: '5' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/julfa-i-safavid-period'
          }
        },
        {
          id: 'q4',
          text: 'Julfa’s 16th-century prosperity was closely related to Europe’s growing demand for raw silk',
          lang: 'en',
          cite: {
            source: 'iranica-ghougassian-julfa-i-safavid-period',
            loc: { section: 'JULFA i. SAFAVID PERIOD', para: '6' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/julfa-i-safavid-period'
          }
        }
      ]
    },
    {
      kind: 'course',
      quotes: [
        {
          id: 'q6',
          text: 'The shah captured Erevan in June 1604 and advanced towards Kars.',
          lang: 'en',
          cite: {
            source: 'iranica-ghougassian-julfa-i-safavid-period',
            loc: { section: 'JULFA i. SAFAVID PERIOD', para: '8' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/julfa-i-safavid-period'
          }
        },
        {
          id: 'q7',
          text: 'But, faced with a strong Ottoman counter-offensive, the shah decided to retreat, adopting a scorched-earth policy to deny supplies to the advancing Ottoman enemy',
          lang: 'en',
          cite: {
            source: 'iranica-ghougassian-julfa-i-safavid-period',
            loc: { section: 'JULFA i. SAFAVID PERIOD', para: '8' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/julfa-i-safavid-period'
          }
        },
        {
          id: 'q9',
          text: 'The following spring the Armenians were moved again and distributed in large numbers mainly to Gilān, Māzandarān, and the rural areas between Isfahan, Shiraz, and Hamadān.',
          lang: 'en',
          cite: {
            source: 'iranica-ghougassian-julfa-i-safavid-period',
            loc: { section: 'JULFA i. SAFAVID PERIOD', para: '9' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/julfa-i-safavid-period'
          }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q10',
          text: 'Shah ʿAbbās I treated the mercantile community of Julfa in general better than other deportees.',
          lang: 'en',
          cite: {
            source: 'iranica-ghougassian-julfa-i-safavid-period',
            loc: { section: 'JULFA i. SAFAVID PERIOD', para: '10' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/julfa-i-safavid-period'
          }
        },
        {
          id: 'q12',
          text: 'Thanks to their rescued moveable possessions, the Armenians were able to build within a few years large houses, mansions, and churches.',
          lang: 'en',
          cite: {
            source: 'iranica-ghougassian-julfa-i-safavid-period',
            loc: { section: 'JULFA i. SAFAVID PERIOD', para: '10' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/julfa-i-safavid-period'
          }
        },
        {
          id: 'q17',
          text: 'Most notably, the shah resettled craftsmen from newly conquered Tabriz to ʿAbbāsābād and had Armenian merchants from Julfa settle in New Julfa',
          lang: 'en',
          cite: {
            source: 'iranica-haneda-matthee-isfahan-safavid-period',
            loc: { section: 'ISFAHAN vii. SAFAVID PERIOD', para: '15' }
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
            value: { d: '1603' },
            cites: [
              {
                source: 'iranica-ghougassian-julfa-i-safavid-period',
                loc: { section: 'JULFA i. SAFAVID PERIOD', para: '8' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q18',
        text: 'In the fall of 1603, Shah ʿAbbās I (r. 1587-1629) launched his first military campaign against the Ottomans to recapture the lands he had ceded to them in 1589-90.',
        lang: 'en',
        cite: {
          source: 'iranica-ghougassian-julfa-i-safavid-period',
          loc: { section: 'JULFA i. SAFAVID PERIOD', para: '8' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-13',
          url: 'https://www.iranicaonline.org/articles/julfa-i-safavid-period'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1605' },
            cites: [
              {
                source: 'iranica-ghougassian-julfa-i-safavid-period',
                loc: { section: 'JULFA i. SAFAVID PERIOD', para: '10' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q20',
        text: 'In early summer of 1605, the Julfa deportees were given temporary shelter in Isfahan, and they began with the building of New Julfa on ḵāṣṣa land, on the right bank of the Zāyandarud',
        lang: 'en',
        cite: {
          source: 'iranica-ghougassian-julfa-i-safavid-period',
          loc: { section: 'JULFA i. SAFAVID PERIOD', para: '10' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-13',
          url: 'https://www.iranicaonline.org/articles/julfa-i-safavid-period'
        }
      }
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/c/cc/Catedral_Vank%2C_Isfah%C3%A1n%2C_Ir%C3%A1n%2C_2016-09-20%2C_DD_112-114_HDR.jpg/1280px-Catedral_Vank%2C_Isfah%C3%A1n%2C_Ir%C3%A1n%2C_2016-09-20%2C_DD_112-114_HDR.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Catedral_Vank,_Isfah%C3%A1n,_Ir%C3%A1n,_2016-09-20,_DD_112-114_HDR.jpg',
    credit: { creator: 'Diego Delso' },
    license: { id: 'cc-by-sa', version: '4.0', url: 'https://creativecommons.org/licenses/by-sa/4.0' }
  }
})
