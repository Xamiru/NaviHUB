import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'anglo-persian-war-1856-1857',
  names: [
    { text: 'Anglo-Persian War', lang: 'en', role: 'primary' },
    { text: 'جنگ ایران و انگلیس', lang: 'fa', role: 'native' }
  ],
  researched: '2026-10-06',
  type: 'war',
  start: {
    alts: [
      {
        value: { d: '1856-11-01' },
        cites: [
          {
            source: 'iranica-calmard-anglo-persian-war',
            loc: { section: 'ANGLO-PERSIAN WAR (1856-57)', para: '5' }
          }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1857-03-04' },
        cites: [
          {
            source: 'iranica-calmard-anglo-persian-war',
            loc: { section: 'ANGLO-PERSIAN WAR (1856-57)', para: '8' }
          },
          {
            source: 'iranica-amanat-herat-vi',
            loc: { section: 'HERAT vi. THE HERAT QUESTION', para: '21' }
          }
        ]
      }
    ]
  },
  regions: ['iran', 'south-asia'],
  prominence: 1,
  places: [
    {
      ref: 'place:herat',
      cites: [
        {
          source: 'iranica-calmard-anglo-persian-war',
          loc: { section: 'ANGLO-PERSIAN WAR (1856-57)', para: '3' }
        }
      ]
    },
    {
      ref: 'place:kharg-island',
      cites: [
        {
          source: 'iranica-calmard-anglo-persian-war',
          loc: { section: 'ANGLO-PERSIAN WAR (1856-57)', para: '5' }
        }
      ]
    },
    {
      ref: 'place:bushehr',
      cites: [
        {
          source: 'iranica-calmard-anglo-persian-war',
          loc: { section: 'ANGLO-PERSIAN WAR (1856-57)', para: '5' }
        }
      ]
    },
    {
      ref: 'place:khorramshahr',
      cites: [
        {
          source: 'iranica-calmard-anglo-persian-war',
          loc: { section: 'ANGLO-PERSIAN WAR (1856-57)', para: '7' }
        }
      ]
    }
  ],
  partOf: [
    { ref: 'period:reign-of-naser-al-din-shah-qajar' },
    { ref: 'period:qajar-dynasty' }
  ],
  sides: [
    {
      key: 'persia',
      name: 'the Persians',
      cites: [
        {
          source: 'iranica-calmard-anglo-persian-war',
          loc: { section: 'ANGLO-PERSIAN WAR (1856-57)', para: '6' }
        }
      ]
    },
    {
      key: 'britain',
      name: 'the British',
      cites: [
        {
          source: 'iranica-calmard-anglo-persian-war',
          loc: { section: 'ANGLO-PERSIAN WAR (1856-57)', para: '5' }
        }
      ]
    }
  ],
  participants: [
    {
      ref: 'person:naser-al-din-shah-qajar',
      role: 'head-of-state',
      side: 'persia',
      cites: [
        {
          source: 'iranica-calmard-anglo-persian-war',
          loc: { section: 'ANGLO-PERSIAN WAR (1856-57)', para: '1' }
        }
      ]
    },
    {
      ref: 'person:mirza-aqa-khan-nuri',
      role: 'head-of-government',
      side: 'persia',
      cites: [
        {
          source: 'iranica-calmard-anglo-persian-war',
          loc: { section: 'ANGLO-PERSIAN WAR (1856-57)', para: '2' }
        }
      ]
    },
    {
      name: 'Ḥosam-al-salṭana Solṭān Morād Mīrzā',
      role: 'commander',
      side: 'persia',
      cites: [
        {
          source: 'iranica-calmard-anglo-persian-war',
          loc: { section: 'ANGLO-PERSIAN WAR (1856-57)', para: '3' }
        }
      ]
    },
    {
      name: 'Charles Augustus Murray',
      role: 'diplomat',
      side: 'britain',
      cites: [
        {
          source: 'iranica-calmard-anglo-persian-war',
          loc: { section: 'ANGLO-PERSIAN WAR (1856-57)', para: '2' }
        }
      ]
    },
    {
      name: 'Sir James Outram',
      role: 'commander',
      side: 'britain',
      cites: [
        {
          source: 'iranica-calmard-anglo-persian-war',
          loc: { section: 'ANGLO-PERSIAN WAR (1856-57)', para: '5' }
        }
      ]
    },
    {
      name: 'Henry Havelock',
      role: 'commander',
      side: 'britain',
      cites: [
        {
          source: 'iranica-calmard-anglo-persian-war',
          loc: { section: 'ANGLO-PERSIAN WAR (1856-57)', para: '7' }
        }
      ]
    },
    {
      ref: 'person:farrokh-khan-ghaffari',
      role: 'negotiator',
      side: 'persia',
      cites: [
        {
          source: 'iranica-calmard-anglo-persian-war',
          loc: { section: 'ANGLO-PERSIAN WAR (1856-57)', para: '4' }
        }
      ]
    }
  ],
  figures: [
    {
      key: 'combatants',
      side: 'persia',
      value: {
        alts: [
          {
            value: { min: 15000 },
            cites: [
              {
                source: 'iranica-amanat-herat-vi',
                loc: { section: 'HERAT vi. THE HERAT QUESTION', para: '20' }
              }
            ]
          }
        ]
      }
    },
    {
      key: 'casualties',
      side: 'persia',
      value: {
        alts: [
          {
            value: { min: 700 },
            cites: [
              {
                source: 'iranica-calmard-anglo-persian-war',
                loc: { section: 'ANGLO-PERSIAN WAR (1856-57)', para: '6' }
              }
            ]
          }
        ]
      }
    },
    {
      key: 'casualties',
      side: 'britain',
      value: {
        alts: [
          {
            value: { min: 16 },
            cites: [
              {
                source: 'iranica-calmard-anglo-persian-war',
                loc: { section: 'ANGLO-PERSIAN WAR (1856-57)', para: '6' }
              }
            ]
          }
        ]
      }
    }
  ],
  related: [
    {
      ref: 'event:treaty-of-paris-1857',
      rel: 'led-to',
      cites: [
        {
          source: 'iranica-calmard-anglo-persian-war',
          loc: { section: 'ANGLO-PERSIAN WAR (1856-57)', para: '8' }
        }
      ]
    },
    { ref: 'event:indian-rebellion-of-1857', rel: 'related' },
    { ref: 'event:crimean-war', rel: 'related' }
  ],
  sections: [
    {
      kind: 'background',
      quotes: [
        {
          id: 'q1',
          text: 'Following their defeat in the Russo-Persian wars of 1219-28/1804-13 and 1242-44/1826-28, the Qajars, tried to compensate for their losses by reasserting Persia’s control over western Afghanistan. Attempts to bring the principality of Herat under their rule in 1249/1833, 1253-55/1837-39, and 1268/1852 were strongly resisted by the British: If Herat were in Persian hands, the Russians—whose influence was paramount at the Persian court—would directly threaten India.',
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
          id: 'q2',
          text: 'Relations between Britain and Iran were further exacerbated by an imbroglio with the British Minister to Iran, Mr. Murray, who left Tehran in high dudgeon.',
          lang: 'en',
          cite: {
            source: 'iranica-kazemzadeh-anglo-iranian-relations-qajar',
            loc: { section: 'ANGLO-IRANIAN RELATIONS ii. The Qajar Period', para: '26' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/anglo-iranian-relations-ii/'
          }
        },
        {
          id: 'q3',
          text: 'International developments in the mid-19th century contributed to the gravity of the situation in Herat.',
          lang: 'en',
          cite: {
            source: 'iranica-amanat-herat-vi',
            loc: { section: 'HERAT vi. THE HERAT QUESTION', para: '19' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/herat-vi'
          }
        },
        {
          id: 'q4',
          text: 'After a series of acrimonious exchanges with the British Legation, in November 1855, diplomatic relations between the two countries finally ruptured.',
          lang: 'en',
          cite: {
            source: 'iranica-amanat-herat-vi',
            loc: { section: 'HERAT vi. THE HERAT QUESTION', para: '19' }
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
      kind: 'overview',
      quotes: [
        {
          id: 'q5',
          text: 'In response Britain began the Anglo-Persian war (q.v.) which resulted in Iran’s quick defeat and the conclusion of the peace treaty of Paris in 1857, by which Iran finally gave up its claim to Afghanistan.',
          lang: 'en',
          cite: {
            source: 'iranica-kazemzadeh-anglo-iranian-relations-qajar',
            loc: { section: 'ANGLO-IRANIAN RELATIONS ii. The Qajar Period', para: '26' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/anglo-iranian-relations-ii/'
          }
        },
        {
          id: 'q6',
          text: 'The Persian victory was short-lived and turned out to be the final Qajar attempt to retrieve Herat.',
          lang: 'en',
          cite: {
            source: 'iranica-amanat-herat-vi',
            loc: { section: 'HERAT vi. THE HERAT QUESTION', para: '21' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/herat-vi'
          }
        },
        {
          id: 'q7',
          text: 'As expected, the breakdown in negotiations at Istanbul was followed by a second British declaration of war and the landing, in December 1856, of a substantial force of British and Indian troops at Bušehr. Soon the British forces moved northwards through the province of Fārs, and in February 1857 they exacted a heavy blow on the Persian regular army in the battle of Ḵušāb.',
          lang: 'en',
          cite: {
            source: 'iranica-amanat-herat-vi',
            loc: { section: 'HERAT vi. THE HERAT QUESTION', para: '21' }
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
          id: 'q8',
          text: 'The success of the British soldiers, more than a half of whom were Indian, was mainly due to technological superiority and new English rifles.',
          lang: 'en',
          cite: {
            source: 'iranica-calmard-anglo-persian-war',
            loc: { section: 'ANGLO-PERSIAN WAR (1856-57)', para: '11' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/anglo-persian-war-1856-57'
          }
        },
        {
          id: 'q9',
          text: 'Connections between the Persian war and the Indian mutiny remain inconclusive (Standish, “The Persian War,” p. 39).',
          lang: 'en',
          cite: {
            source: 'iranica-calmard-anglo-persian-war',
            loc: { section: 'ANGLO-PERSIAN WAR (1856-57)', para: '11' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/anglo-persian-war-1856-57'
          }
        },
        {
          id: 'q10',
          text: 'It has often been said that Britain’s relations with Persia improved after the war.',
          lang: 'en',
          cite: {
            source: 'iranica-calmard-anglo-persian-war',
            loc: { section: 'ANGLO-PERSIAN WAR (1856-57)', para: '12' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/anglo-persian-war-1856-57'
          }
        },
        {
          id: 'q11',
          text: 'Although from the British standpoint this may be partially true, there was a widespread tendency among the Persians to consider the British as the main source of their troubles, and Anglophobia was also felt elsewhere.',
          lang: 'en',
          cite: {
            source: 'iranica-calmard-anglo-persian-war',
            loc: { section: 'ANGLO-PERSIAN WAR (1856-57)', para: '12' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/anglo-persian-war-1856-57'
          }
        },
        {
          id: 'q12',
          text: 'Persia’s humiliating defeat in the war was precipitated not only by British military superiority and the alleged bribing of the military commanders, but also by the Persian fear of engaging an imperial power and the futility of a confrontation in the battlefield.',
          lang: 'en',
          cite: {
            source: 'iranica-amanat-great-britain-ii',
            loc: {
              section: 'GREAT BRITAIN ii. British influence in Persia in the 19th century',
              para: '17'
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
            value: { d: '1856-10' },
            cites: [
              {
                source: 'iranica-calmard-anglo-persian-war',
                loc: { section: 'ANGLO-PERSIAN WAR (1856-57)', para: '3' }
              },
              {
                source: 'iranica-amanat-herat-vi',
                loc: { section: 'HERAT vi. THE HERAT QUESTION', para: '20' }
              },
              {
                source: 'iranica-kazemzadeh-anglo-iranian-relations-qajar',
                loc: { section: 'ANGLO-IRANIAN RELATIONS ii. The Qajar Period', para: '26' }
              }
            ]
          },
          {
            value: { d: '1855' },
            cites: [
              {
                source: 'iranica-amanat-great-britain-ii',
                loc: {
                  section: 'GREAT BRITAIN ii. British influence in Persia in the 19th century',
                  para: '17'
                }
              }
            ],
            heldBy: [
              { kind: 'scholar', name: 'Abbas Amanat' }
            ]
          }
        ]
      },
      quote: {
        id: 'q13',
        text: 'After nearly nine months, the technical assistance of M. Buhler, a French army engineer in the service of the Persian government, who dug a series of subterranean tunnels under the city walls, eventually brought the famine-stricken Herat to its knees. In October 1856, the Persian forces finally captured the city.',
        lang: 'en',
        cite: {
          source: 'iranica-amanat-herat-vi',
          loc: { section: 'HERAT vi. THE HERAT QUESTION', para: '20' }
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
            value: { d: '1856-11-01' },
            cites: [
              {
                source: 'iranica-calmard-anglo-persian-war',
                loc: { section: 'ANGLO-PERSIAN WAR (1856-57)', para: '5' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q14',
        text: 'To avoid public outcry against Palmerston’s government, the British declared war from Calcutta, on 1 Novernber 1856 (Wright, The English, p. 56).',
        lang: 'en',
        cite: {
          source: 'iranica-calmard-anglo-persian-war',
          loc: { section: 'ANGLO-PERSIAN WAR (1856-57)', para: '5' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://www.iranicaonline.org/articles/anglo-persian-war-1856-57'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1856-12-04' },
            cites: [
              {
                source: 'iranica-calmard-anglo-persian-war',
                loc: { section: 'ANGLO-PERSIAN WAR (1856-57)', para: '5' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q15',
        text: 'A naval expedition under the command of Major-General Stalker occupied Ḵārg island on 4 December; on 10 December Bushire surrendered and was placed under British administration (Fasāʾī, pp. 313f.).',
        lang: 'en',
        cite: {
          source: 'iranica-calmard-anglo-persian-war',
          loc: { section: 'ANGLO-PERSIAN WAR (1856-57)', para: '5' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://www.iranicaonline.org/articles/anglo-persian-war-1856-57'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1857-02' },
            cites: [
              {
                source: 'iranica-amanat-herat-vi',
                loc: { section: 'HERAT vi. THE HERAT QUESTION', para: '21' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q16',
        text: 'At dawn, the British cavalry and artillery look the offensive and inflicted a massive defeat on the Persians (who lost 700 men to 16 on the British side; see Outram’s report in The Annual Register, 1857, p. 444; Sir J. Outram, Lieutenant-General Sir James Outram’s Persian Campaign in 1857, London, 1860, pp. 33-35; Wylly, “Our War,” p. 648; different figures given by Fasāʾī, I, p. 317; A. D. Hytier, ed., Les dépêches diplomatiques du Comte de Gobineau en Perse, Paris and Geneva, 1959, p.71, n. 95, et al.).',
        lang: 'en',
        cite: {
          source: 'iranica-calmard-anglo-persian-war',
          loc: { section: 'ANGLO-PERSIAN WAR (1856-57)', para: '6' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://www.iranicaonline.org/articles/anglo-persian-war-1856-57'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1857-03' },
            cites: [
              {
                source: 'iranica-amanat-herat-vi',
                loc: { section: 'HERAT vi. THE HERAT QUESTION', para: '21' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q17',
        text: 'In a purely naval battle fought on 26 March, Outram and Henry Havelock (who had arrived in reinforcement with his division) pounded the shore batteries with mortars.',
        lang: 'en',
        cite: {
          source: 'iranica-calmard-anglo-persian-war',
          loc: { section: 'ANGLO-PERSIAN WAR (1856-57)', para: '7' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://www.iranicaonline.org/articles/anglo-persian-war-1856-57'
        }
      }
    }
  ],
  hero: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/8/81/Sketch_of_the_Attack_on_Bushire._December_10th._1856.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Sketch_of_the_Attack_on_Bushire._December_10th._1856.jpg',
    credit: { institution: 'Qatar Digital Library' },
    license: { id: 'cc0' }
  }
})
