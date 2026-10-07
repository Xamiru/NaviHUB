import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'herat-crisis-of-1851-1853',
  names: [
    { text: 'Herat crisis of 1851–1853', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-07',
  type: 'crisis',
  start: {
    alts: [
      {
        value: { d: '1851' },
        cites: [
          {
            source: 'iranica-amanat-herat-vi',
            loc: { section: 'HERAT vi. THE HERAT QUESTION', para: '15' }
          }
        ],
        heldBy: [
          { kind: 'scholar', name: 'Abbas Amanat' }
        ]
      },
      {
        value: { d: '1852' },
        cites: [
          {
            source: 'iranica-calmard-anglo-persian-war',
            loc: { section: 'ANGLO-PERSIAN WAR (1856-57)', para: '1' }
          }
        ],
        heldBy: [
          { kind: 'scholar', name: 'Jean Calmard' }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1853-01-25' },
        cites: [
          {
            source: 'iranica-calmard-anglo-persian-war',
            loc: { section: 'ANGLO-PERSIAN WAR (1856-57)', para: '1' }
          }
        ]
      }
    ]
  },
  regions: ['iran', 'south-asia'],
  prominence: 3,
  places: [
    {
      ref: 'place:herat',
      cites: [
        {
          source: 'iranica-amanat-herat-vi',
          loc: { section: 'HERAT vi. THE HERAT QUESTION', para: '15' }
        }
      ]
    }
  ],
  partOf: [
    { ref: 'period:reign-of-naser-al-din-shah-qajar' },
    { ref: 'period:qajar-dynasty' }
  ],
  participants: [
    {
      ref: 'person:mirza-aqa-khan-nuri',
      role: 'negotiator',
      cites: [
        {
          source: 'iranica-amanat-herat-vi',
          loc: { section: 'HERAT vi. THE HERAT QUESTION', para: '17' }
        }
      ]
    },
    {
      ref: 'person:naser-al-din-shah-qajar',
      role: 'head-of-state',
      cites: [
        {
          source: 'iranica-calmard-anglo-persian-war',
          loc: { section: 'ANGLO-PERSIAN WAR (1856-57)', para: '1' }
        }
      ]
    },
    {
      name: 'Justin Sheil',
      role: 'diplomat',
      cites: [
        {
          source: 'iranica-amanat-herat-vi',
          loc: { section: 'HERAT vi. THE HERAT QUESTION', para: '16' }
        }
      ]
    },
    {
      name: 'Sayd Moḥammad Khan',
      role: 'leader',
      cites: [
        {
          source: 'iranica-amanat-herat-vi',
          loc: { section: 'HERAT vi. THE HERAT QUESTION', para: '15' }
        }
      ]
    },
    {
      name: 'Kohandel Khan',
      role: 'leader',
      cites: [
        {
          source: 'iranica-amanat-herat-vi',
          loc: { section: 'HERAT vi. THE HERAT QUESTION', para: '15' }
        }
      ]
    }
  ],
  related: [
    {
      ref: 'event:anglo-persian-war-1856-1857',
      rel: 'led-to',
      cites: [
        {
          source: 'iranica-amanat-herat-vi',
          loc: { section: 'HERAT vi. THE HERAT QUESTION', para: '16' }
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
          text: 'When in 1851 the ruler of Herat, seeking protection against domestic enemies, turned to Iran for help, the British intervened and forced upon the young Shah a treaty (1853) that forbade the dispatch of Iranian troops to Herat.',
          lang: 'en',
          cite: {
            source: 'iranica-kazemzadeh-anglo-iranian-relations-qajar',
            loc: { section: 'ANGLO-IRANIAN RELATIONS ii. The Qajar Period', para: '23' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/anglo-iranian-relations-ii/'
          }
        },
        {
          id: 'q2',
          text: 'In spite of warnings from the British minister in Tehran, Colonel Sheil, the Persians moved into Herat the next spring, but faced with British threats to break diplomatic relations and reoccupy Ḵārg island, the shah withdrew his troops (G. H. Hunt, Outram and Havelock’s Persian Campaign, London, 1858, pp. 149f.; P. P. Bushev, Gerat i anglo-iranskaya voĭna, Moscow, 1959, pp. 43f.), agreeing not to send them to Herat again unless it was threatened from the east and not to interfere in Herat’s internal affairs (engagement of 15 Rabīʿ II 1269/25 January 1853: see parts regarding ḵoṭba and coinage in C. U. Aitchison, A Collection of Treaties, Engagements, and Other Sanads Relating to India and Neighbouring Countries, Delhi, 1933, XIII, no. XVII, pp. 77f.; see also Hunt, Outram, pp. 155f.; Bushev, Gerat, pp. 44f.).',
          lang: 'en',
          cite: {
            source: 'iranica-calmard-anglo-persian-war',
            loc: { section: 'ANGLO-PERSIAN WAR (1856-57)', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/anglo-persian-war-1856-57'
          }
        },
        {
          id: 'q3',
          text: 'The Qajar success in Herat through backing Sayd Moḥammad Khan enraged Colonel Justin Sheil, the British minister plenipotentiary in Tehran, who demanded an immediate Persian withdrawal. His initiative opened a new chapter in the Anglo-Persian scramble over Herat that eventually led to the 1856 confrontation.',
          lang: 'en',
          cite: {
            source: 'iranica-amanat-herat-vi',
            loc: { section: 'HERAT vi. THE HERAT QUESTION', para: '16' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/herat-vi'
          }
        },
        {
          id: 'q4',
          text: 'The Sheil-Nuri agreement obliged Iran “not to send troops on any account to the territory of Herat, excepting when troops from without attack the place.”',
          lang: 'en',
          cite: {
            source: 'iranica-amanat-herat-vi',
            loc: { section: 'HERAT vi. THE HERAT QUESTION', para: '17' }
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
          id: 'q5',
          text: 'Thus another opportunity to annex this long-coveted region was lost.',
          lang: 'en',
          cite: {
            source: 'iranica-kazemzadeh-anglo-iranian-relations-qajar',
            loc: { section: 'ANGLO-IRANIAN RELATIONS ii. The Qajar Period', para: '23' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/anglo-iranian-relations-ii/'
          }
        },
        {
          id: 'q6',
          text: 'Nuri was forced to comply with the British wishes.',
          lang: 'en',
          cite: {
            source: 'iranica-amanat-great-britain-ii',
            loc: {
              section: 'GREAT BRITAIN ii. British influence in Persia in the 19th century',
              para: '15'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/great-britain-ii/'
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
            value: { d: '1851' },
            cites: [
              {
                source: 'iranica-amanat-herat-vi',
                loc: { section: 'HERAT vi. THE HERAT QUESTION', para: '15' }
              }
            ],
            heldBy: [
              { kind: 'scholar', name: 'Abbas Amanat' }
            ]
          },
          {
            value: { d: '1852' },
            cites: [
              {
                source: 'iranica-calmard-anglo-persian-war',
                loc: { section: 'ANGLO-PERSIAN WAR (1856-57)', para: '1' }
              }
            ],
            heldBy: [
              { kind: 'scholar', name: 'Jean Calmard' }
            ]
          }
        ]
      },
      quote: {
        id: 'q7',
        text: 'The Persian expeditionary force of one thousand strong that was dispatched to Herat after the fall of Amir Kabir by the new prime minister, Mirzā Āqā Khan Nuri, entered the citadel of Herat in late 1851 and disbanded the pro-Bārakzay forces there under Kohandel Khan and Dōst-Moḥammad Khan (Ādamiyat, pp. 605-44).',
        lang: 'en',
        cite: {
          source: 'iranica-amanat-herat-vi',
          loc: { section: 'HERAT vi. THE HERAT QUESTION', para: '15' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://www.iranicaonline.org/articles/herat-vi'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1852-01' },
            cites: [
              {
                source: 'iranica-amanat-herat-vi',
                loc: { section: 'HERAT vi. THE HERAT QUESTION', para: '17' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q8',
        text: 'Under intense British pressure, the Persian expeditionary force withdrew from Herat in January 1852, but only after Kohandel’s forces had retreated from the vicinity of the city.',
        lang: 'en',
        cite: {
          source: 'iranica-amanat-herat-vi',
          loc: { section: 'HERAT vi. THE HERAT QUESTION', para: '17' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://www.iranicaonline.org/articles/herat-vi'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1853-01-25' },
            cites: [
              {
                source: 'iranica-calmard-anglo-persian-war',
                loc: { section: 'ANGLO-PERSIAN WAR (1856-57)', para: '1' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q9',
        text: 'Despite the Persian withdrawal, Nuri resisted Sheil’s wishes to declare Herat outside of Persia’s sphere of control; but, after long and acrimonious negotiations, in January 1853 he was compelled to give a unilateral undertaking to the British government.',
        lang: 'en',
        cite: {
          source: 'iranica-amanat-herat-vi',
          loc: { section: 'HERAT vi. THE HERAT QUESTION', para: '17' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://www.iranicaonline.org/articles/herat-vi'
        }
      }
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/b/bd/Herat_from_the_Citadel.png/1280px-Herat_from_the_Citadel.png',
    page: 'https://commons.wikimedia.org/wiki/File:Herat_from_the_Citadel.png',
    credit: { institution: 'Illustrated London News (13 June 1863), Internet Archive' },
    license: { id: 'public-domain' }
  }
})
