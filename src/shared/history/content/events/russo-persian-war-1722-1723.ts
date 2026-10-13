import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'russo-persian-war-1722-1723',
  names: [
    { text: 'Russo-Persian War of 1722–1723', lang: 'en', role: 'primary' },
    {
      text: 'Persian campaign of Peter the Great',
      lang: 'en',
      role: 'alternative',
      cites: [
        { source: 'britannica-1911-peter-i', loc: { section: 'PETER I.', para: '10' } }
      ]
    }
  ],
  researched: '2026-10-13',
  type: 'war',
  start: {
    alts: [
      {
        value: { d: '1722-05', julian: true },
        cites: [
          { source: 'britannica-1911-peter-i', loc: { section: 'PETER I.', para: '10' } }
        ],
        heldBy: [
          { kind: 'organization', name: 'Encyclopædia Britannica (11th edition, 1911)' }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1723-09', julian: true },
        cites: [
          { source: 'britannica-1911-peter-i', loc: { section: 'PETER I.', para: '10' } }
        ],
        heldBy: [
          { kind: 'organization', name: 'Encyclopædia Britannica (11th edition, 1911)' }
        ]
      }
    ]
  },
  regions: ['iran', 'russia-central-asia'],
  prominence: 2,
  places: [
    {
      ref: 'place:baku',
      cites: [
        { source: 'britannica-1911-peter-i', loc: { section: 'PETER I.', para: '10' } }
      ]
    }
  ],
  sides: [
    {
      key: 'russia',
      name: 'Russians',
      polity: 'polity:russian-empire',
      cites: [
        {
          source: 'iranica-andreeva-russia-relations',
          loc: {
            section: 'RUSSIA i. Russo-Iranian Relations up to the Bolshevik Revolution',
            para: '7'
          }
        }
      ]
    },
    {
      key: 'persia',
      name: 'Safavid Persia',
      polity: 'polity:safavid-iran',
      cites: [
        {
          source: 'iranica-andreeva-russia-relations',
          loc: {
            section: 'RUSSIA i. Russo-Iranian Relations up to the Bolshevik Revolution',
            para: '8'
          }
        }
      ]
    }
  ],
  participants: [
    {
      ref: 'person:peter-the-great',
      role: 'leader',
      side: 'russia',
      cites: [
        {
          source: 'iranica-andreeva-russia-relations',
          loc: {
            section: 'RUSSIA i. Russo-Iranian Relations up to the Bolshevik Revolution',
            para: '7'
          }
        }
      ]
    },
    {
      ref: 'person:tahmasp-ii',
      role: 'head-of-state',
      side: 'persia',
      cites: [
        {
          source: 'iranica-andreeva-russia-relations',
          loc: {
            section: 'RUSSIA i. Russo-Iranian Relations up to the Bolshevik Revolution',
            para: '8'
          }
        }
      ]
    }
  ],
  figures: [
    {
      key: 'combatants',
      side: 'russia',
      value: {
        alts: [
          {
            value: { min: 100000, qualifier: 'over' },
            cites: [
              {
                source: 'iranica-andreeva-russia-relations',
                loc: {
                  section: 'RUSSIA i. Russo-Iranian Relations up to the Bolshevik Revolution',
                  para: '7'
                }
              }
            ],
            heldBy: [
              { kind: 'scholar', name: 'Elena Andreeva', discipline: 'historian' }
            ]
          }
        ]
      }
    },
    {
      key: 'casualties',
      side: 'russia',
      value: {
        alts: [
          {
            value: { min: 33000 },
            cites: [
              {
                source: 'iranica-andreeva-russia-relations',
                loc: {
                  section: 'RUSSIA i. Russo-Iranian Relations up to the Bolshevik Revolution',
                  para: '7'
                }
              }
            ],
            heldBy: [
              { kind: 'scholar', name: 'Elena Andreeva', discipline: 'historian' }
            ]
          },
          {
            value: { min: 100000, qualifier: 'about' },
            cites: [
              {
                source: 'iranica-andreeva-russia-relations',
                loc: {
                  section: 'RUSSIA i. Russo-Iranian Relations up to the Bolshevik Revolution',
                  para: '8'
                }
              }
            ],
            heldBy: [
              { kind: 'scholar', name: 'Elena Andreeva', discipline: 'historian' }
            ]
          }
        ]
      }
    }
  ],
  related: [
    {
      ref: 'event:great-northern-war',
      rel: 'related',
      cites: [
        { source: 'britannica-1911-peter-i', loc: { section: 'PETER I.', para: '6' } }
      ]
    },
    {
      ref: 'event:siege-of-isfahan-1722',
      rel: 'response-to',
      cites: [
        {
          source: 'iranica-andreeva-russia-relations',
          loc: {
            section: 'RUSSIA i. Russo-Iranian Relations up to the Bolshevik Revolution',
            para: '7'
          }
        }
      ]
    },
    {
      ref: 'event:ottoman-persian-war-1723-1727',
      rel: 'related',
      cites: [
        { source: 'britannica-1911-persia', loc: { section: 'PERSIA', para: '1092' } }
      ]
    }
  ],
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'The Ottoman threat to a weakened Iran, combined with the Afghan invasion and deep internal decline, convinced Peter the Great to interfere in order to prevent the Ottomans from appearing on the Russian southeastern borders.',
          lang: 'en',
          cite: {
            source: 'iranica-andreeva-russia-relations',
            loc: {
              section: 'RUSSIA i. Russo-Iranian Relations up to the Bolshevik Revolution',
              para: '7'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/russia-i-relations/'
          }
        },
        {
          id: 'q2',
          text: 'Peter the Great initiated aggressive policies towards Iran.',
          lang: 'en',
          cite: {
            source: 'iranica-andreeva-russia-relations',
            loc: {
              section: 'RUSSIA i. Russo-Iranian Relations up to the Bolshevik Revolution',
              para: '5'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/russia-i-relations/'
          }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q3',
          text: 'In 1715-18, a young officer, Artemiĭ Petrovich Volynskiĭ, was sent to Iran to gather information about the troops and fortresses and the political and economic situation there.',
          lang: 'en',
          cite: {
            source: 'iranica-andreeva-russia-relations',
            loc: {
              section: 'RUSSIA i. Russo-Iranian Relations up to the Bolshevik Revolution',
              para: '6'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/russia-i-relations/'
          }
        },
        {
          id: 'q4',
          text: 'An attack by some Caucasian tribes on Shirvan, in which several Russian merchants were killed and others lost property, gave Peter a pretext to attack.',
          lang: 'en',
          cite: {
            source: 'iranica-andreeva-russia-relations',
            loc: {
              section: 'RUSSIA i. Russo-Iranian Relations up to the Bolshevik Revolution',
              para: '7'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/russia-i-relations/'
          }
        },
        {
          id: 'q5',
          text: 'During the last four years of his reign Peter’s policy was predominantly Oriental.',
          lang: 'en',
          cite: { source: 'britannica-1911-peter-i', loc: { section: 'PETER I.', para: '10' } },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Peter_I.'
          }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q6',
          text: 'In addition, approximately 100,000 Russian soldiers died, mostly from disease, during the occupation of the coastal provinces',
          lang: 'en',
          cite: {
            source: 'iranica-andreeva-russia-relations',
            loc: {
              section: 'RUSSIA i. Russo-Iranian Relations up to the Bolshevik Revolution',
              para: '8'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/russia-i-relations/'
          }
        },
        {
          id: 'q7',
          text: 'The Persian campaigns wore out the feeble health of Peter, who had been ailing for some time.',
          lang: 'en',
          cite: { source: 'britannica-1911-peter-i', loc: { section: 'PETER I.', para: '10' } },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Peter_I.'
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
            value: { d: '1722-06', notAfter: '1722-08' },
            cites: [
              {
                source: 'iranica-tucker-ottoman-persian-relations-afsharid-zand',
                loc: {
                  section: 'OTTOMAN-PERSIAN RELATIONS ii. AFSHARID AND ZAND PERIODS',
                  para: '4'
                }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q8',
        text: 'In the summer of 1722, Peter the Great viewed the impending collapse of Safavid power as his chance to expand, so he led his armies down the Caspian coast.',
        lang: 'en',
        cite: {
          source: 'iranica-tucker-ottoman-persian-relations-afsharid-zand',
          loc: { section: 'OTTOMAN-PERSIAN RELATIONS ii. AFSHARID AND ZAND PERIODS', para: '4' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-13',
          url: 'https://www.iranicaonline.org/articles/ottoman-persian-relations-ii'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1723' },
            cites: [
              {
                source: 'iranica-andreeva-russia-relations',
                loc: {
                  section: 'RUSSIA i. Russo-Iranian Relations up to the Bolshevik Revolution',
                  para: '8'
                }
              }
            ],
            heldBy: [
              { kind: 'scholar', name: 'Elena Andreeva', discipline: 'historian' }
            ]
          },
          {
            value: { d: '1722-07' },
            cites: [
              { source: 'britannica-1911-persia', loc: { section: 'PERSIA', para: '1085' } }
            ],
            heldBy: [
              { kind: 'organization', name: 'Encyclopædia Britannica (11th edition, 1911)' }
            ]
          }
        ]
      },
      quote: {
        id: 'q9',
        text: 'Shah Ṭahmāsb refused to ratify the treaty, but Russia maintained garrisons in Darband, Baku, and Gilan.',
        lang: 'en',
        cite: {
          source: 'iranica-andreeva-russia-relations',
          loc: {
            section: 'RUSSIA i. Russo-Iranian Relations up to the Bolshevik Revolution',
            para: '8'
          }
        },
        provenance: {
          via: 'web',
          at: '2026-10-13',
          url: 'https://www.iranicaonline.org/articles/russia-i-relations/'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1723-09', julian: true },
            cites: [
              { source: 'britannica-1911-peter-i', loc: { section: 'PETER I.', para: '10' } }
            ]
          }
        ]
      },
      quote: {
        id: 'q10',
        text: 'The war which lasted from May 1722 to September 1723 was altogether successful, resulting in the acquisition of the towns of Baku and Derbent and the Caspian provinces of Gilan, Mazandaran and Astarabad.',
        lang: 'en',
        cite: { source: 'britannica-1911-peter-i', loc: { section: 'PETER I.', para: '10' } },
        provenance: {
          via: 'web',
          at: '2026-10-13',
          url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Peter_I.'
        }
      }
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/3/3c/The_map_of_Caucasus_1723.jpg/1280px-The_map_of_Caucasus_1723.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:The_map_of_Caucasus_1723.jpg',
    credit: { creator: 'Guillaume Delisle' },
    license: { id: 'cc0' }
  }
})
