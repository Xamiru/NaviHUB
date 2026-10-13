import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'battle-of-gulnabad',
  names: [
    { text: 'Battle of Gulnabad', lang: 'en', role: 'primary' },
    {
      text: 'Battle of Golnābād',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'iranica-matthee-soltan-hosayn',
          loc: { section: 'SOLṬĀN ḤOSAYN', para: '22' }
        }
      ]
    }
  ],
  researched: '2026-10-13',
  type: 'battle',
  start: {
    alts: [
      {
        value: { d: '1722-03-08' },
        cites: [
          {
            source: 'iranica-haneda-matthee-isfahan-safavid-period',
            loc: { section: 'ISFAHAN vii. SAFAVID PERIOD', para: '38' }
          },
          { source: 'britannica-1911-persia', loc: { section: 'PERSIA', para: '1084' } }
        ],
        heldBy: [
          { kind: 'scholar', name: 'Masashi Haneda and Rudi Matthee', discipline: 'historian' },
          { kind: 'organization', name: 'Encyclopædia Britannica (11th edition, 1911)' }
        ]
      },
      {
        value: { d: '1722-03-09' },
        cites: [
          {
            source: 'iranica-matthee-soltan-hosayn',
            loc: { section: 'SOLṬĀN ḤOSAYN', para: '22' }
          }
        ],
        heldBy: [
          { kind: 'scholar', name: 'Rudi Matthee', discipline: 'historian' }
        ]
      }
    ]
  },
  regions: ['iran'],
  prominence: 3,
  places: [
    {
      ref: 'place:gulnabad',
      cites: [
        {
          source: 'iranica-matthee-soltan-hosayn',
          loc: { section: 'SOLṬĀN ḤOSAYN', para: '22' }
        }
      ]
    }
  ],
  partOf: [
    {
      ref: 'event:siege-of-isfahan-1722',
      cites: [
        {
          source: 'iranica-matthee-soltan-hosayn',
          loc: { section: 'SOLṬĀN ḤOSAYN', para: '23' }
        }
      ]
    }
  ],
  sides: [
    {
      key: 'safavid',
      name: 'Persian army',
      polity: 'polity:safavid-iran',
      cites: [
        {
          source: 'iranica-haneda-matthee-isfahan-safavid-period',
          loc: { section: 'ISFAHAN vii. SAFAVID PERIOD', para: '38' }
        }
      ]
    },
    {
      key: 'afghan',
      name: 'Afghans',
      polity: 'polity:hotaki-dynasty',
      cites: [
        {
          source: 'iranica-haneda-matthee-isfahan-safavid-period',
          loc: { section: 'ISFAHAN vii. SAFAVID PERIOD', para: '38' }
        }
      ]
    }
  ],
  participants: [
    {
      ref: 'person:mahmud-hotaki',
      role: 'commander',
      side: 'afghan',
      cites: [
        {
          source: 'iranica-matthee-soltan-hosayn',
          loc: { section: 'SOLṬĀN ḤOSAYN', para: '22' }
        }
      ]
    },
    {
      ref: 'person:shah-sultan-hosayn',
      role: 'head-of-state',
      side: 'safavid',
      cites: [
        {
          source: 'iranica-matthee-soltan-hosayn',
          loc: { section: 'SOLṬĀN ḤOSAYN', para: '22' }
        }
      ]
    }
  ],
  figures: [
    {
      key: 'deaths',
      side: 'safavid',
      value: {
        alts: [
          {
            value: { min: 15000 },
            cites: [
              { source: 'britannica-1911-persia', loc: { section: 'PERSIA', para: '1084' } }
            ],
            heldBy: [
              { kind: 'organization', name: 'Encyclopædia Britannica (11th edition, 1911)' }
            ]
          },
          {
            value: { min: 4000, max: 5000, qualifier: 'about' },
            cites: [
              {
                source: 'iranica-haneda-matthee-isfahan-safavid-period',
                loc: { section: 'ISFAHAN vii. SAFAVID PERIOD', para: '38' }
              }
            ],
            heldBy: [
              {
                kind: 'scholar',
                name: 'Masashi Haneda and Rudi Matthee',
                discipline: 'historian'
              }
            ]
          }
        ]
      }
    },
    {
      key: 'combatants',
      side: 'safavid',
      value: {
        alts: [
          {
            value: { min: 50000 },
            cites: [
              { source: 'britannica-1911-persia', loc: { section: 'PERSIA', para: '1083' } }
            ],
            heldBy: [
              { kind: 'organization', name: 'Encyclopædia Britannica (11th edition, 1911)' }
            ]
          }
        ]
      }
    }
  ],
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'In early 1722, Maḥmud and his troops arrived at Golnābād, a village some 20 km from Isfahan.',
          lang: 'en',
          cite: {
            source: 'iranica-matthee-soltan-hosayn',
            loc: { section: 'SOLṬĀN ḤOSAYN', para: '22' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/soltan-hosayn'
          }
        },
        {
          id: 'q2',
          text: 'On the 8th of March 1722 the richly dressed hosts of Persia appeared before the little band of Afghans, who were scorched and disfigured by their long marches.',
          lang: 'en',
          cite: { source: 'britannica-1911-persia', loc: { section: 'PERSIA', para: '1084' } },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Persia'
          }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q3',
          text: 'The ill-disciplined Persian army, hastily collected, advanced to attack the rebels.',
          lang: 'en',
          cite: { source: 'britannica-1911-persia', loc: { section: 'PERSIA', para: '1083' } },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Persia'
          }
        },
        {
          id: 'q4',
          text: 'Numerically inferior and mostly equipped with swords, the Afghans should have lost any open confrontation, but the fact that they did not was mostly due to the disarray and discord in the ranks of the Safavid establishment.',
          lang: 'en',
          cite: {
            source: 'iranica-matthee-soltan-hosayn',
            loc: { section: 'SOLṬĀN ḤOSAYN', para: '22' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/soltan-hosayn'
          }
        }
      ]
    },
    {
      kind: 'course',
      quotes: [
        {
          id: 'q5',
          text: 'The wali of Arabia commenced the battle by attacking the left wing of the Afghans with great fury, routing it, and plundering their camp.',
          lang: 'en',
          cite: { source: 'britannica-1911-persia', loc: { section: 'PERSIA', para: '1084' } },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Persia'
          }
        },
        {
          id: 'q6',
          text: 'The wali of Arabia escaped into Isfahan, and Mahmud the Afghan gained a complete victory.',
          lang: 'en',
          cite: { source: 'britannica-1911-persia', loc: { section: 'PERSIA', para: '1084' } },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Persia'
          }
        },
        {
          id: 'q7',
          text: 'The Georgian contingent, the only one to fight, was decimated.',
          lang: 'en',
          cite: {
            source: 'iranica-haneda-matthee-isfahan-safavid-period',
            loc: { section: 'ISFAHAN vii. SAFAVID PERIOD', para: '38' }
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
      kind: 'aftermath',
      quotes: [
        {
          id: 'q8',
          text: 'Maḥmud Ḡilzāi with his Afghan tribal forces then moved to Faraḥābād, which he took without meeting any resistance.',
          lang: 'en',
          cite: {
            source: 'iranica-haneda-matthee-isfahan-safavid-period',
            loc: { section: 'ISFAHAN vii. SAFAVID PERIOD', para: '38' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/isfahan-vii-safavid-period'
          }
        },
        {
          id: 'q9',
          text: 'A panic now seized on the surrounding inhabitants, and thousands of country people fled into the city.',
          lang: 'en',
          cite: { source: 'britannica-1911-persia', loc: { section: 'PERSIA', para: '1084' } },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Persia'
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
            value: { d: '1722-03-08' },
            cites: [
              {
                source: 'iranica-haneda-matthee-isfahan-safavid-period',
                loc: { section: 'ISFAHAN vii. SAFAVID PERIOD', para: '38' }
              },
              { source: 'britannica-1911-persia', loc: { section: 'PERSIA', para: '1084' } }
            ],
            heldBy: [
              {
                kind: 'scholar',
                name: 'Masashi Haneda and Rudi Matthee',
                discipline: 'historian'
              },
              { kind: 'organization', name: 'Encyclopædia Britannica (11th edition, 1911)' }
            ]
          },
          {
            value: { d: '1722-03-09' },
            cites: [
              {
                source: 'iranica-matthee-soltan-hosayn',
                loc: { section: 'SOLṬĀN ḤOSAYN', para: '22' }
              }
            ],
            heldBy: [
              { kind: 'scholar', name: 'Rudi Matthee', discipline: 'historian' }
            ]
          }
        ]
      },
      quote: {
        id: 'q10',
        text: 'The Afghans arrived in Golnābād on 8 March 1722 and defeated the Persian army, which, at about 40,000 men and an additional 30,000 infantry troops, was at least twice as large as that of the Afghans.',
        lang: 'en',
        cite: {
          source: 'iranica-haneda-matthee-isfahan-safavid-period',
          loc: { section: 'ISFAHAN vii. SAFAVID PERIOD', para: '38' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-13',
          url: 'https://www.iranicaonline.org/articles/isfahan-vii-safavid-period'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1722-03-08' },
            cites: [
              { source: 'britannica-1911-persia', loc: { section: 'PERSIA', para: '1084' } }
            ]
          }
        ]
      },
      quote: {
        id: 'q11',
        text: 'The prime minister immediately afterwards attacked the enemy’s right wing, but was routed, and the Afghans, taking advantage of the confusion, captured the Persian guns and turned them on the Persian centre, who fled in confusion without striking a blow.',
        lang: 'en',
        cite: { source: 'britannica-1911-persia', loc: { section: 'PERSIA', para: '1084' } },
        provenance: {
          via: 'web',
          at: '2026-10-13',
          url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Persia'
        }
      }
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/8/84/Battleofgulnabad.png/1280px-Battleofgulnabad.png',
    page: 'https://commons.wikimedia.org/wiki/File:Battleofgulnabad.png',
    credit: { creator: 'Kailanmapper' },
    license: { id: 'cc-by-sa', version: '4.0', url: 'https://creativecommons.org/licenses/by-sa/4.0' }
  }
})
