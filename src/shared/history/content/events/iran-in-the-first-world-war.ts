import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'iran-in-the-first-world-war',
  names: [
    { text: 'Iran in the First World War', lang: 'en', role: 'primary' },
    { text: 'ایران در جنگ جهانی اول', lang: 'fa', role: 'native' }
  ],
  researched: '2026-10-08',
  type: 'occupation',
  start: {
    alts: [
      {
        value: { d: '1914-11-01' },
        cites: [
          {
            source: 'iranica-bast-germany-diplomatic-relations',
            loc: { section: 'GERMANY i. German-Persian diplomatic relations', para: '23' }
          },
          {
            source: 'iranica-ettehadiyeh-constitutional-revolution-aftermath',
            loc: { section: 'CONSTITUTIONAL REVOLUTION iv. The aftermath', para: '19' }
          },
          {
            source: 'iranica-dailami-jangali-movement',
            loc: { section: 'JANGALI MOVEMENT', para: '3' }
          },
          {
            source: 'eo1418-atabaki-persia-iran',
            loc: { section: 'Iranian Politics and Society in Wartime', para: '4' }
          }
        ],
        heldBy: [
          { kind: 'scholar', name: 'Oliver Bast' },
          { kind: 'scholar', name: 'Mansoureh Ettehadiyeh Nezam-Mafi' },
          { kind: 'scholar', name: 'Pezhmann Dailami' },
          { kind: 'scholar', name: 'Touraj Atabaki' }
        ]
      },
      {
        value: { d: '1911' },
        cites: [
          {
            source: 'eo1418-atabaki-persia-iran',
            loc: { section: 'Iranian Politics and Society in Wartime', para: '1' }
          }
        ],
        heldBy: [
          { kind: 'scholar', name: 'Touraj Atabaki' }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1918-11' },
        cites: [
          {
            source: 'iranica-bonakdarian-great-britain-iii',
            loc: { section: 'GREAT BRITAIN iii. British influence in Persia, 1900-21', para: '54' }
          }
        ],
        heldBy: [
          { kind: 'scholar', name: 'Mansour Bonakdarian' }
        ]
      },
      {
        value: { d: '1921' },
        cites: [
          {
            source: 'eo1418-atabaki-persia-iran',
            loc: { section: 'Iranian Politics and Society in Wartime', para: '1' }
          }
        ],
        heldBy: [
          { kind: 'scholar', name: 'Touraj Atabaki' }
        ]
      }
    ]
  },
  regions: ['iran', 'mena', 'russia-central-asia'],
  prominence: 1,
  places: [
    {
      ref: 'place:tehran',
      cites: [
        {
          source: 'iranica-ettehadiyeh-constitutional-revolution-aftermath',
          loc: { section: 'CONSTITUTIONAL REVOLUTION iv. The aftermath', para: '22' }
        }
      ]
    },
    {
      ref: 'place:qom',
      cites: [
        { source: 'iranica-cronin-gendarmerie', loc: { section: 'GENDARMERIE', para: '11' } }
      ]
    },
    {
      ref: 'place:bushehr',
      cites: [
        {
          source: 'eo1418-atabaki-persia-iran',
          loc: { section: 'The Battle for Control over the Oil Supply', para: '14' }
        }
      ]
    },
    {
      ref: 'place:kermanshah',
      cites: [
        {
          source: 'eo1418-atabaki-persia-iran',
          loc: { section: 'Iranian Politics and Society in Wartime', para: '6' }
        }
      ]
    },
    {
      ref: 'place:hamadan',
      cites: [
        {
          source: 'eo1418-atabaki-persia-iran',
          loc: { section: 'Iranian Politics and Society in Wartime', para: '11' }
        }
      ]
    },
    {
      ref: 'place:gilan',
      cites: [
        {
          source: 'eo1418-atabaki-persia-iran',
          loc: { section: 'Iranian Politics and Society in Wartime', para: '8' }
        }
      ]
    },
    {
      ref: 'place:mashhad',
      cites: [
        {
          source: 'iranica-motavalli-haghighi-khorasan-qajar-pahlavi',
          loc: { section: 'KHORASAN xi. History in the Qajar and Pahlavi Periods', para: '25' }
        }
      ]
    }
  ],
  partOf: [
    { ref: 'period:reign-of-ahmad-shah-qajar' },
    { ref: 'period:qajar-dynasty' }
  ],
  polities: [
    { ref: 'polity:qajar-iran' },
    { ref: 'polity:ottoman-empire' },
    { ref: 'polity:russian-empire' }
  ],
  participants: [
    {
      ref: 'person:ahmad-shah-qajar',
      role: 'head-of-state',
      cites: [
        {
          source: 'iranica-sheikh-ol-islami-ahmad-shah',
          loc: { section: 'AḤMAD SHAH QĀJĀR', para: '7' }
        }
      ]
    },
    {
      ref: 'person:wilhelm-wassmuss',
      role: 'participant',
      cites: [
        {
          source: 'eo1418-atabaki-persia-iran',
          loc: { section: 'The Battle for Control over the Oil Supply', para: '7' }
        },
        {
          source: 'iranica-bonakdarian-great-britain-iii',
          loc: { section: 'GREAT BRITAIN iii. British influence in Persia, 1900-21', para: '49' }
        }
      ]
    },
    {
      name: 'Nikolai Baratov',
      role: 'commander',
      cites: [
        {
          source: 'iranica-andreeva-russia-relations',
          loc: {
            section: 'RUSSIA i. Russo-Iranian Relations up to the Bolshevik Revolution',
            para: '50'
          }
        }
      ]
    },
    {
      name: 'Percy Molesworth Sykes',
      role: 'commander',
      cites: [
        {
          source: 'iranica-safiri-south-persia-rifles',
          loc: { section: 'SOUTH PERSIA RIFLES', para: '2' }
        }
      ]
    },
    {
      name: 'Lionel Dunsterville',
      role: 'commander',
      cites: [
        {
          source: 'iranica-dailami-jangali-movement',
          loc: { section: 'JANGALI MOVEMENT', para: '48' }
        }
      ]
    },
    {
      ref: 'person:enver-pasha',
      role: 'leader',
      cites: [
        {
          source: 'eo1418-atabaki-persia-iran',
          loc: { section: 'Ottomans’ Jihad, and its Practice in Iran', para: '1' }
        }
      ]
    },
    {
      name: 'Reżāqolī Khan Neẓām-al-Salṭana',
      role: 'leader',
      cites: [
        {
          source: 'iranica-ettehadiyeh-constitutional-revolution-aftermath',
          loc: { section: 'CONSTITUTIONAL REVOLUTION iv. The aftermath', para: '23' }
        },
        { source: 'iranica-cronin-gendarmerie', loc: { section: 'GENDARMERIE', para: '12' } },
        { source: 'loc-iran-country-study-1987', loc: { section: 'World War I', para: '1' } }
      ]
    },
    {
      name: 'Dowlat Movaqat Melli (the Provisional National Government)',
      role: 'participant',
      cites: [
        {
          source: 'eo1418-atabaki-persia-iran',
          loc: { section: 'Iranian Politics and Society in Wartime', para: '6' }
        }
      ]
    },
    {
      name: 'Government Gendarmerie',
      role: 'combatant',
      cites: [
        { source: 'iranica-cronin-gendarmerie', loc: { section: 'GENDARMERIE', para: '10' } }
      ]
    }
  ],
  related: [
    { ref: 'event:first-world-war', rel: 'related' },
    {
      ref: 'event:jangali-movement',
      rel: 'contributed-to',
      cites: [
        {
          source: 'iranica-dailami-jangali-movement',
          loc: { section: 'JANGALI MOVEMENT', para: '26' }
        }
      ]
    },
    { ref: 'event:iranian-famine-of-1917-1918', rel: 'related' },
    { ref: 'event:anglo-persian-agreement-of-1919', rel: 'followed-by' },
    { ref: 'event:anglo-persian-oil-company-formation', rel: 'related' }
  ],
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'Iran hoped to avoid entanglement in World War I by declaring its neutrality, but ended up as a battleground for Russian, Turkish, and British troops. When German agents tried to arouse the southern tribes against the British, Britain created an armed force, the South Persia Rifles, to protect its interests.',
          lang: 'en',
          cite: { source: 'loc-iran-country-study-1987', loc: { section: 'World War I', para: '1' } },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/iran/14.htm' }
        },
        {
          id: 'q2',
          text: 'During World War I, Iran became a battleground for German, Ottoman, Russian, and British troops in spite of the fact that it had declared its neutrality when the war started.',
          lang: 'en',
          cite: {
            source: 'iranica-andreeva-russia-relations',
            loc: {
              section: 'RUSSIA i. Russo-Iranian Relations up to the Bolshevik Revolution',
              para: '50'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/russia-i-relations/'
          }
        },
        {
          id: 'q3',
          text: 'Its vast oil deposits and its geographic location at the gates of the Indian subcontinent turned Iran into one of the major theaters of war in west Asia.',
          lang: 'en',
          cite: { source: 'eo1418-atabaki-persia-iran', loc: { section: 'Introduction', para: '2' } },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://encyclopedia.1914-1918-online.net/article/persiairan/'
          }
        },
        {
          id: 'q4',
          text: 'Then a group of Iranian notables led by Nezam os Saltaneh Mafi, hoping to escape Anglo-Russian dominance and sympathetic to the German war effort, left Tehran, first for Qom and then for Kermanshah (renamed Bakhtaran after the fall of Mohammad Reza Shah in 1979), where they established a provisional government. The provisional government lasted for the duration of the war but failed to capture much support.',
          lang: 'en',
          cite: { source: 'loc-iran-country-study-1987', loc: { section: 'World War I', para: '1' } },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/iran/14.htm' }
        },
        {
          id: 'q5',
          text: 'However, this provisional government, which obtained the official recognition of the Central Powers as the sole legitimate government of Iran, could not survive ever-escalating pressure from Britain and Russia.',
          lang: 'en',
          cite: {
            source: 'eo1418-atabaki-persia-iran',
            loc: { section: 'Iranian Politics and Society in Wartime', para: '6' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://encyclopedia.1914-1918-online.net/article/persiairan/'
          }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q6',
          text: 'With Ottoman entry into the war on the German side in November 1914 and the Turkish invasion of northwestern Persia, where the Russian forces were stationed, Persia declared its neutrality. Yet, the belligerent powers disregarded Persian neutrality.',
          lang: 'en',
          cite: {
            source: 'iranica-bonakdarian-great-britain-iii',
            loc: { section: 'GREAT BRITAIN iii. British influence in Persia, 1900-21', para: '48' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/great-britain-iii'
          }
        },
        {
          id: 'q7',
          text: 'One might well ask what sense there could be in Iran’s announc­ement of its neutr­ality when Russian troops were already occupying a sizeable part of Iranian northern territory.',
          lang: 'en',
          cite: {
            source: 'eo1418-atabaki-persia-iran',
            loc: { section: 'Iranian Politics and Society in Wartime', para: '4' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://encyclopedia.1914-1918-online.net/article/persiairan/'
          }
        },
        {
          id: 'q8',
          text: 'In 1914, the British Admiralty had become the largest shareholder in the British-owned Anglo-Persian Oil Company, and Persian oil was considered essential for the operation of its fleet of dreadnoughts, as well as to the British military campaign in general.',
          lang: 'en',
          cite: {
            source: 'iranica-bonakdarian-great-britain-iii',
            loc: { section: 'GREAT BRITAIN iii. British influence in Persia, 1900-21', para: '48' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/great-britain-iii'
          }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q9',
          text: 'The deputies remaining in Tehran no longer constituted the quorum necessary to conduct official business; after some negotiation with the mohājerīn, with each side inviting the other to join it, the Majles was dissolved, in November 1915, after sitting for only eleven months.',
          lang: 'en',
          cite: {
            source: 'iranica-ettehadiyeh-constitutional-revolution-aftermath',
            loc: { section: 'CONSTITUTIONAL REVOLUTION iv. The aftermath', para: '24' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/constitutional-revolution-iv/'
          }
        },
        {
          id: 'q10',
          text: 'Yet the departure of foreign troops from Iran – first the Russians, then the Ottomans – did not strengthen the Iranian government. The population was impoverished, the economy was ruined and almost bankrupt, and the treasury coffers were empty.',
          lang: 'en',
          cite: {
            source: 'eo1418-atabaki-persia-iran',
            loc: { section: 'Iranian Politics and Society in Wartime', para: '8' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://encyclopedia.1914-1918-online.net/article/persiairan/'
          }
        },
        {
          id: 'q11',
          text: 'Had World War I not taken place, it is possible that constitutionalism might have developed to a limited degree in Persia, despite foreign interference and domination, for the Majles was quite effective in enacting domestic reforms. As it was closed prematurely and violently, however, all efforts at building a workable democracy failed, with fatal consequences for the future of constitutionalism in Persia.',
          lang: 'en',
          cite: {
            source: 'iranica-ettehadiyeh-constitutional-revolution-aftermath',
            loc: { section: 'CONSTITUTIONAL REVOLUTION iv. The aftermath', para: '30' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/constitutional-revolution-iv/'
          }
        }
      ]
    },
    {
      kind: 'memory',
      quotes: [
        {
          id: 'q12',
          text: 'Nevertheless, in Iranian 20th century historiography, the War is remembered not for major military confrontations, but for economic and political hardships embodied in devastating famine and diseases.',
          lang: 'en',
          cite: { source: 'eo1418-atabaki-persia-iran', loc: { section: 'Conclusion', para: '1' } },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://encyclopedia.1914-1918-online.net/article/persiairan/'
          }
        },
        {
          id: 'q13',
          text: 'In the historical memory of the Iranians, as those who had lived in the Ottoman Empire, or in other parts of West Asia, the First World War is remembered as a period of carnage – not primarily because of combat deaths, of which there were certainly many, but much more because of famines and epidemics that claimed far more victims.',
          lang: 'en',
          cite: {
            source: 'eo1418-atabaki-persia-iran',
            loc: { section: 'Iranian Politics and Society in Wartime', para: '12' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://encyclopedia.1914-1918-online.net/article/persiairan/'
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
            value: { d: '1914-11-01' },
            cites: [
              {
                source: 'iranica-bast-germany-diplomatic-relations',
                loc: { section: 'GERMANY i. German-Persian diplomatic relations', para: '23' }
              },
              {
                source: 'iranica-ettehadiyeh-constitutional-revolution-aftermath',
                loc: { section: 'CONSTITUTIONAL REVOLUTION iv. The aftermath', para: '19' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q14',
        text: 'On 12 Ḏu’l-ḥejja 1332/1 November 1914, after the Ottoman empire had entered World War I on the side of Germany, Persia declared a policy of neutrality (Neẓām Māfī, p. 20). The Russians refused to evacuate Persian territory, however, and the Turks then invaded northern and western Persia, thus involving the country in the war, despite its declared neutrality (Sepehr, pp. 89-100).',
        lang: 'en',
        cite: {
          source: 'iranica-ettehadiyeh-constitutional-revolution-aftermath',
          loc: { section: 'CONSTITUTIONAL REVOLUTION iv. The aftermath', para: '19' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://www.iranicaonline.org/articles/constitutional-revolution-iv/'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1914-12-05' },
            cites: [
              {
                source: 'iranica-dailami-jangali-movement',
                loc: { section: 'JANGALI MOVEMENT', para: '4' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q15',
        text: 'On 5 December 1914, the Third Parliament was finally inaugurated and started its work in early January 1915.',
        lang: 'en',
        cite: {
          source: 'iranica-dailami-jangali-movement',
          loc: { section: 'JANGALI MOVEMENT', para: '4' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://www.iranicaonline.org/articles/jangali-movement'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1915-01' },
            cites: [
              {
                source: 'eo1418-atabaki-persia-iran',
                loc: { section: 'The Battle for Control over the Oil Supply', para: '7' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q16',
        text: 'In January 1915, the Germans launched a major infiltration campaign in southern Iran. They dispatched a number of agents to the region, whose mission was to instigate popular rebellion against the Allied forces, and to sabotage and destroy British installations and interests.',
        lang: 'en',
        cite: {
          source: 'eo1418-atabaki-persia-iran',
          loc: { section: 'The Battle for Control over the Oil Supply', para: '7' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://encyclopedia.1914-1918-online.net/article/persiairan/'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1915-02' },
            cites: [
              {
                source: 'eo1418-atabaki-persia-iran',
                loc: { section: 'The Battle for Control over the Oil Supply', para: '9' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q17',
        text: 'The tribes attacked pipelines and some oil installations north of Ahvaz. They set fire to the oil spilled from the broken pipelines, cut telephone lines between Abadan and the oilfields, and looted the oil company’s stores.',
        lang: 'en',
        cite: {
          source: 'eo1418-atabaki-persia-iran',
          loc: { section: 'The Battle for Control over the Oil Supply', para: '9' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://encyclopedia.1914-1918-online.net/article/persiairan/'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1915-03' },
            cites: [
              {
                source: 'iranica-andreeva-russia-relations',
                loc: {
                  section: 'RUSSIA i. Russo-Iranian Relations up to the Bolshevik Revolution',
                  para: '50'
                }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q18',
        text: 'In March 1915, Russia agreed to British control over the central area of Iran, which had been defined as “neutral” by the convention of 1907. In return, the British agreed to the Russian annexation of Constantinople (Kazemzadeh, 1968, p. 678).',
        lang: 'en',
        cite: {
          source: 'iranica-andreeva-russia-relations',
          loc: {
            section: 'RUSSIA i. Russo-Iranian Relations up to the Bolshevik Revolution',
            para: '50'
          }
        },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://www.iranicaonline.org/articles/russia-i-relations/'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1915-07' },
            cites: [
              {
                source: 'iranica-bonakdarian-great-britain-iii',
                loc: {
                  section: 'GREAT BRITAIN iii. British influence in Persia, 1900-21',
                  para: '49'
                }
              }
            ],
            heldBy: [
              { kind: 'scholar', name: 'Mansour Bonakdarian' }
            ]
          },
          {
            value: { d: '1915-08' },
            cites: [
              {
                source: 'eo1418-atabaki-persia-iran',
                loc: { section: 'The Battle for Control over the Oil Supply', para: '16' }
              }
            ],
            heldBy: [
              { kind: 'scholar', name: 'Touraj Atabaki' }
            ]
          }
        ]
      },
      quote: {
        id: 'q19',
        text: 'The first military incident in Anglo-Persian relations during the war was the attack launched against British forces in the southern Persian port city of Bušehr by Tangestāni tribes in July 1915, with Wassmuss’s encouragement.',
        lang: 'en',
        cite: {
          source: 'iranica-bonakdarian-great-britain-iii',
          loc: { section: 'GREAT BRITAIN iii. British influence in Persia, 1900-21', para: '49' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://www.iranicaonline.org/articles/great-britain-iii'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1915-08' },
            cites: [
              {
                source: 'eo1418-atabaki-persia-iran',
                loc: { section: 'The Battle for Control over the Oil Supply', para: '14' }
              },
              {
                source: 'iranica-ettehadiyeh-constitutional-revolution-aftermath',
                loc: { section: 'CONSTITUTIONAL REVOLUTION iv. The aftermath', para: '20' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q20',
        text: 'After scrutinizing the subversive activities of their enemies, the British sent troops to Bushehr in August 1915.',
        lang: 'en',
        cite: {
          source: 'eo1418-atabaki-persia-iran',
          loc: { section: 'The Battle for Control over the Oil Supply', para: '14' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://encyclopedia.1914-1918-online.net/article/persiairan/'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1915-10' },
            cites: [
              {
                source: 'iranica-andreeva-russia-relations',
                loc: {
                  section: 'RUSSIA i. Russo-Iranian Relations up to the Bolshevik Revolution',
                  para: '50'
                }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q21',
        text: 'In October 1915, a Cossack corps led by General Baratov landed in Anzali and advanced towards Tehran and Qazvin, while the British landed in Bushehr (see BŪŠEHR).',
        lang: 'en',
        cite: {
          source: 'iranica-andreeva-russia-relations',
          loc: {
            section: 'RUSSIA i. Russo-Iranian Relations up to the Bolshevik Revolution',
            para: '50'
          }
        },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://www.iranicaonline.org/articles/russia-i-relations/'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1915-11' },
            cites: [
              {
                source: 'iranica-cronin-gendarmerie',
                loc: { section: 'GENDARMERIE', para: '10' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q24',
        text: 'In Qom the nationalists set up a body known as the Komīta-ye defāʿ-e mellī (Committee of National Defense), a kind of provisional government, the core of its armed support consisting of the gendarmes and some nationalist volunteers.',
        lang: 'en',
        cite: { source: 'iranica-cronin-gendarmerie', loc: { section: 'GENDARMERIE', para: '11' } },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://www.iranicaonline.org/articles/gendarmerie'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1915-11' },
            cites: [
              {
                source: 'iranica-ettehadiyeh-constitutional-revolution-aftermath',
                loc: { section: 'CONSTITUTIONAL REVOLUTION iv. The aftermath', para: '24' }
              }
            ],
            heldBy: [
              { kind: 'scholar', name: 'Mansoureh Ettehadiyeh Nezam-Mafi' }
            ]
          },
          {
            value: { d: '1915-12-14' },
            cites: [
              {
                source: 'iranica-yarshater-chronology-part-2',
                loc: { section: 'Chronology of Iranian History Part 2, 1915' }
              }
            ],
            heldBy: [
              { kind: 'scholar', name: 'Ehsan Yarshater' }
            ]
          }
        ]
      },
      quote: {
        id: 'q25',
        text: '1915 Dissolution of the third Majles on December 14 after more than half of the Majles deputies join the National Resistance Committee in Kermanshah.',
        lang: 'en',
        cite: {
          source: 'iranica-yarshater-chronology-part-2',
          loc: { section: 'Chronology of Iranian History Part 2, 1915' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://www.iranicaonline.org/articles/chronology-of-iranian-history-part-2/'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1915-11-11', notAfter: '1915-11-12' },
            cites: [
              {
                source: 'iranica-cronin-gendarmerie',
                loc: { section: 'GENDARMERIE', para: '10' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q22',
        text: 'On the night of 11-12 November, the Mohājarat (emigration) began and large numbers of Majles deputies, government officials, nationalists and their armed supporters, together with officers and men of the Gendarmerie, and members of the German, Austrian, and Ottoman legations left Tehran.',
        lang: 'en',
        cite: { source: 'iranica-cronin-gendarmerie', loc: { section: 'GENDARMERIE', para: '10' } },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://www.iranicaonline.org/articles/gendarmerie'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1915-11-15' },
            cites: [
              {
                source: 'iranica-bast-germany-diplomatic-relations',
                loc: { section: 'GERMANY i. German-Persian diplomatic relations', para: '25' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q23',
        text: 'On 15 November 1915 the representatives of the Central Powers followed. They assumed that the shah and his government would join them and transfer the capital to Isfahan. Aḥmad Shah had indeed issued orders to that effect. The representatives of the Allies were nevertheless able to persuade the monarch to stay (Gehrke, I, pp. 200-207; Bast, 1997, pp. 96-101).',
        lang: 'en',
        cite: {
          source: 'iranica-bast-germany-diplomatic-relations',
          loc: { section: 'GERMANY i. German-Persian diplomatic relations', para: '25' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://www.iranicaonline.org/articles/germany-i'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1916' },
            cites: [
              {
                source: 'iranica-bast-germany-diplomatic-relations',
                loc: { section: 'GERMANY i. German-Persian diplomatic relations', para: '26' }
              },
              {
                source: 'iranica-yarshater-chronology-part-2',
                loc: { section: 'Chronology of Iranian History Part 2, 1916' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q29',
        text: '1916 Ottoman forces occupy Kermanshah and Hamadan and threaten to advance on the capital.',
        lang: 'en',
        cite: {
          source: 'iranica-yarshater-chronology-part-2',
          loc: { section: 'Chronology of Iranian History Part 2, 1916' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://www.iranicaonline.org/articles/chronology-of-iranian-history-part-2/'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1916-02' },
            cites: [
              {
                source: 'iranica-ettehadiyeh-constitutional-revolution-aftermath',
                loc: { section: 'CONSTITUTIONAL REVOLUTION iv. The aftermath', para: '23' }
              }
            ],
            heldBy: [
              { kind: 'scholar', name: 'Mansoureh Ettehadiyeh Nezam-Mafi' }
            ]
          },
          {
            value: { d: '1916-07' },
            cites: [
              {
                source: 'iranica-bast-germany-diplomatic-relations',
                loc: { section: 'GERMANY i. German-Persian diplomatic relations', para: '26' }
              }
            ],
            heldBy: [
              { kind: 'scholar', name: 'Oliver Bast' }
            ]
          },
          {
            value: { d: '1915' },
            cites: [
              {
                source: 'iranica-yarshater-chronology-part-2',
                loc: { section: 'Chronology of Iranian History Part 2, 1915' }
              }
            ],
            heldBy: [
              { kind: 'scholar', name: 'Ehsan Yarshater' }
            ]
          }
        ]
      },
      quote: {
        id: 'q26',
        text: 'In Kermānšāh they formed a provisional government and a council of representatives (Hayʾat-e nemāyandagān) composed of members from all the Majles parties (Lustig, pp. 240-45). Reżāqolī Khan Neẓām-al-Salṭana, a nationalist statesman reputed to be unsympathetic to the Allies, was elected to head the provisional cabinet (Bahār, II, pp. 17-23).',
        lang: 'en',
        cite: {
          source: 'iranica-ettehadiyeh-constitutional-revolution-aftermath',
          loc: { section: 'CONSTITUTIONAL REVOLUTION iv. The aftermath', para: '23' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://www.iranicaonline.org/articles/constitutional-revolution-iv/'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1916-03-16' },
            cites: [
              {
                source: 'iranica-safiri-south-persia-rifles',
                loc: { section: 'SOUTH PERSIA RIFLES', para: '2' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q28',
        text: 'The force began as a mission to southern Persia, headed by Brigadier-General Percy Molesworth Sykes, who arrived in Bandar ʿAbbās on 16 March 1916.',
        lang: 'en',
        cite: {
          source: 'iranica-safiri-south-persia-rifles',
          loc: { section: 'SOUTH PERSIA RIFLES', para: '2' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://www.iranicaonline.org/articles/south-persia-rifles'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1916-05-10' },
            cites: [
              {
                source: 'iranica-ettehadiyeh-constitutional-revolution-aftermath',
                loc: { section: 'CONSTITUTIONAL REVOLUTION iv. The aftermath', para: '23' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q27',
        text: 'A renewed Russian offensive forced the mohājerīn to retreat once again, to Qaṣr-e Šīrīn, on 17 Rajab 1334/10 May 1916.',
        lang: 'en',
        cite: {
          source: 'iranica-ettehadiyeh-constitutional-revolution-aftermath',
          loc: { section: 'CONSTITUTIONAL REVOLUTION iv. The aftermath', para: '23' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://www.iranicaonline.org/articles/constitutional-revolution-iv/'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1916-08' },
            cites: [
              {
                source: 'iranica-ettehadiyeh-constitutional-revolution-aftermath',
                loc: { section: 'CONSTITUTIONAL REVOLUTION iv. The aftermath', para: '26' }
              },
              {
                source: 'iranica-safiri-south-persia-rifles',
                loc: { section: 'SOUTH PERSIA RIFLES', para: '6' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q30',
        text: 'He in turn was replaced by the pro-Russian Sepah-sālār, who in August 1916 finally reached an agreement with the Allies, accepting a mixed commission to supervise a subsidy of 200,000 pounds sterling to be paid to the government and consenting to an increase in the strength of the Cossack Brigade, as well as to the formation of a British force to police the south; the latter force came to be known as the South Persia Rifles (Polīs-e janūb). The agreement meant in effect the virtual partition of the country.',
        lang: 'en',
        cite: {
          source: 'iranica-ettehadiyeh-constitutional-revolution-aftermath',
          loc: { section: 'CONSTITUTIONAL REVOLUTION iv. The aftermath', para: '26' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://www.iranicaonline.org/articles/constitutional-revolution-iv/'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1917' },
            cites: [
              {
                source: 'iranica-bast-germany-diplomatic-relations',
                loc: { section: 'GERMANY i. German-Persian diplomatic relations', para: '26' }
              },
              {
                source: 'iranica-cronin-gendarmerie',
                loc: { section: 'GENDARMERIE', para: '12' }
              },
              {
                source: 'iranica-dailami-jangali-movement',
                loc: { section: 'JANGALI MOVEMENT', para: '6' }
              }
            ],
            heldBy: [
              { kind: 'scholar', name: 'Oliver Bast' },
              { kind: 'scholar', name: 'Stephanie Cronin' },
              { kind: 'scholar', name: 'Pezhmann Dailami' }
            ]
          },
          {
            value: { d: '1916' },
            cites: [
              {
                source: 'eo1418-atabaki-persia-iran',
                loc: { section: 'Iranian Politics and Society in Wartime', para: '6' }
              }
            ],
            heldBy: [
              { kind: 'scholar', name: 'Touraj Atabaki' }
            ]
          }
        ]
      },
      quote: {
        id: 'q31',
        text: 'By early 1917 the national government, having taken sanctuary deep in Iraq, was clearly a spent force and many of the Persian gendarme officers went into exile, some, such as Moḥammad-Taqī Khan Pesyān and Ḥabīb-Allāh Khan Šaybānī, to Germany but the majority to Istanbul where they joined the Ottoman army.',
        lang: 'en',
        cite: { source: 'iranica-cronin-gendarmerie', loc: { section: 'GENDARMERIE', para: '12' } },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://www.iranicaonline.org/articles/gendarmerie'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1917' },
            cites: [
              {
                source: 'iranica-andreeva-russia-relations',
                loc: {
                  section: 'RUSSIA i. Russo-Iranian Relations up to the Bolshevik Revolution',
                  para: '50'
                }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q32',
        text: 'By the beginning of 1917, Iran was almost entirely occupied by the Russians and the British (Kulagina, pp. 193-94).',
        lang: 'en',
        cite: {
          source: 'iranica-andreeva-russia-relations',
          loc: {
            section: 'RUSSIA i. Russo-Iranian Relations up to the Bolshevik Revolution',
            para: '50'
          }
        },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://www.iranicaonline.org/articles/russia-i-relations/'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1918-01', notAfter: '1918-03' },
            cites: [
              {
                source: 'iranica-andreeva-russia-relations',
                loc: {
                  section: 'RUSSIA i. Russo-Iranian Relations up to the Bolshevik Revolution',
                  para: '51'
                }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q33',
        text: 'In December 1917, between January and March of 1918, most Russian troops were evacuated, while some troops under Baratov stayed in Iran and entered British military service (Kulagina, p. 194).',
        lang: 'en',
        cite: {
          source: 'iranica-andreeva-russia-relations',
          loc: {
            section: 'RUSSIA i. Russo-Iranian Relations up to the Bolshevik Revolution',
            para: '51'
          }
        },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://www.iranicaonline.org/articles/russia-i-relations/'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1918-05' },
            cites: [
              {
                source: 'iranica-safiri-south-persia-rifles',
                loc: { section: 'SOUTH PERSIA RIFLES', para: '18' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q34',
        text: 'In May 1918, the Qašqāʾi, leading most of the tribes of Fārs, declared war on the British and the SPR.',
        lang: 'en',
        cite: {
          source: 'iranica-safiri-south-persia-rifles',
          loc: { section: 'SOUTH PERSIA RIFLES', para: '18' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://www.iranicaonline.org/articles/south-persia-rifles'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1918-10-30' },
            cites: [
              {
                source: 'eo1418-atabaki-persia-iran',
                loc: { section: 'Iranian Politics and Society in Wartime', para: '8' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q35',
        text: 'On 30 October 1918, the Armistice of Mudros was concluded with the Ottoman Empire, and in Istanbul the cabinet of the Committee of Union and Progress resigned. Ahmed Izzet Pasha (1864-1937) formed his new cabinet, and called on all Ottoman troops to return home.',
        lang: 'en',
        cite: {
          source: 'eo1418-atabaki-persia-iran',
          loc: { section: 'Iranian Politics and Society in Wartime', para: '8' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://encyclopedia.1914-1918-online.net/article/persiairan/'
        }
      }
    }
  ],
  hero: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/1/1b/Parade_of_the_South_Persia_Rifles%2C_1918.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Parade_of_the_South_Persia_Rifles,_1918.jpg',
    credit: { institution: 'National Army Museum' },
    license: { id: 'public-domain' }
  },
  archive: [
    {
      id: 'dunsterville-adventures-of-dunsterforce-1920',
      mediaKind: 'document',
      title: 'The adventures of Dunsterforce',
      date: { d: '1920' },
      url: 'https://archive.org/download/adventuresofduns00dunsrich/adventuresofduns00dunsrich.pdf',
      page: 'https://archive.org/details/adventuresofduns00dunsrich',
      credit: {
        institution: 'University of California Libraries (Internet Archive)',
        creator: 'Dunsterville, L. C. (Lionel Charles), 1865-1946'
      },
      license: { id: 'public-domain' },
      bytes: 27628488
    }
  ],
  furtherReading: [
    { source: 'sepehr-1957-iran-dar-jang-e-bozorg', perspective: 'iranian' },
    {
      source: 'harp-tarihi-baskanligi-1970-birinci-dunya-harbinde-turk-harbi',
      perspective: 'turkish'
    }
  ]
})
