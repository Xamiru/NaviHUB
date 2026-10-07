import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'first-world-war',
  names: [
    { text: 'First World War', lang: 'en', role: 'primary' },
    {
      text: 'World War I',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'state-dept-milestones-us-entry-into-world-war-i',
          loc: { section: 'U.S. Entry into World War I, 1917', para: '0' }
        }
      ]
    },
    {
      text: 'the Great War',
      lang: 'en',
      role: 'alternative',
      cites: [
        { source: 'eo1418-atabaki-persia-iran', loc: { section: 'Persia/Iran' } }
      ]
    },
    { text: 'Erster Weltkrieg', lang: 'de', role: 'alternative' }
  ],
  researched: '2026-10-07',
  type: 'war',
  start: {
    alts: [
      {
        value: { d: '1914-07-28' },
        cites: [
          {
            source: 'eo1418-mombauer-july-crisis-1914',
            loc: { section: 'The Ultimatum and Mediation Attempts', para: '10' }
          },
          { source: 'lemo-chronik-1914', loc: { section: 'Chronik 1914', para: '87' } }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1918-11-11' },
        cites: [
          {
            source: 'loc-germany-country-study-1995',
            loc: { section: 'World War I', para: '6' }
          },
          { source: 'lemo-chronik-1918', loc: { section: 'Chronik 1918', para: '197' } }
        ]
      }
    ]
  },
  regions: ['global', 'europe', 'mena', 'russia-central-asia'],
  prominence: 1,
  places: [
    {
      ref: 'place:sarajevo',
      cites: [
        { source: 'eo1418-foster-sarajevo-incident', loc: { section: 'Sarajevo Incident' } }
      ]
    },
    {
      ref: 'place:compiegne',
      cites: [
        { source: 'lemo-chronik-1918', loc: { section: 'Chronik 1918', para: '186' } }
      ]
    }
  ],
  sides: [
    {
      key: 'entente',
      name: 'Entente Powers (Russia, France and Great Britain)',
      cites: [
        {
          source: 'eo1418-mombauer-july-crisis-1914',
          loc: { section: 'The Hoyos-Mission', para: '4' }
        }
      ]
    },
    {
      key: 'central',
      name: 'Central Powers',
      cites: [
        {
          source: 'eo1418-atabaki-persia-iran',
          loc: { section: 'Iranian Politics and Society in Wartime', para: '2' }
        }
      ]
    }
  ],
  participants: [
    {
      ref: 'person:franz-ferdinand',
      role: 'victim',
      cites: [
        { source: 'eo1418-foster-sarajevo-incident', loc: { section: 'Sarajevo Incident' } }
      ]
    },
    {
      ref: 'person:woodrow-wilson',
      role: 'head-of-state',
      cites: [
        {
          source: 'state-dept-milestones-us-entry-into-world-war-i',
          loc: { section: 'U.S. Entry into World War I, 1917', para: '1' }
        }
      ]
    },
    {
      ref: 'person:wilhelm-ii',
      role: 'head-of-state',
      side: 'central',
      cites: [
        {
          source: 'state-dept-milestones-us-entry-into-world-war-i',
          loc: { section: 'U.S. Entry into World War I, 1917', para: '4' }
        }
      ]
    },
    {
      ref: 'person:nicholas-ii',
      role: 'head-of-state',
      side: 'entente',
      cites: [
        {
          source: 'eo1418-foster-sarajevo-incident',
          loc: { section: 'Background', para: '1' }
        }
      ]
    },
    {
      ref: 'person:enver-pasha',
      role: 'commander',
      side: 'central',
      cites: [
        { source: 'loc-turkey-country-study-1995', loc: { section: 'World War I', para: '1' } }
      ]
    },
    {
      name: 'Theobald von Bethmann Hollweg',
      role: 'head-of-government',
      side: 'central',
      cites: [
        {
          source: 'eo1418-mombauer-july-crisis-1914',
          loc: { section: 'The Hoyos-Mission', para: '4' }
        }
      ]
    },
    {
      name: 'Gavrilo Princip',
      role: 'perpetrator',
      cites: [
        {
          source: 'eo1418-foster-sarajevo-incident',
          loc: { section: 'Background', para: '4' }
        }
      ]
    }
  ],
  figures: [
    {
      key: 'military-deaths',
      value: {
        alts: [
          {
            value: { min: 10057600 },
            cites: [
              {
                source: 'eo1418-prost-war-losses',
                loc: { section: 'Table 1: Number of Dead' }
              }
            ],
            heldBy: [
              { kind: 'scholar', name: 'Antoine Prost' }
            ]
          },
          {
            value: { min: 9164000 },
            cites: [
              {
                source: 'eo1418-prost-war-losses',
                loc: { section: 'Table 1: Number of Dead' }
              }
            ],
            heldBy: [
              { kind: 'scholar', name: 'Boris Urlanis' }
            ]
          },
          {
            value: { min: 9450000 },
            cites: [
              {
                source: 'eo1418-prost-war-losses',
                loc: { section: 'Table 1: Number of Dead' }
              }
            ],
            heldBy: [
              { kind: 'scholar', name: 'Jay Winter' }
            ]
          },
          {
            value: { min: 9206000 },
            cites: [
              {
                source: 'eo1418-prost-war-losses',
                loc: { section: 'Table 1: Number of Dead' }
              }
            ],
            heldBy: [
              { kind: 'scholar', name: 'Rüdiger Overmans' }
            ]
          }
        ]
      }
    }
  ],
  related: [
    { ref: 'event:balkan-wars', rel: 'preceded-by' },
    { ref: 'event:iran-in-the-first-world-war', rel: 'related' },
    { ref: 'event:gallipoli-campaign', rel: 'related' },
    { ref: 'event:battle-of-verdun', rel: 'related' },
    { ref: 'event:battle-of-the-somme', rel: 'related' },
    { ref: 'event:armenian-genocide', rel: 'related' },
    { ref: 'event:russian-revolution-of-1917', rel: 'related' },
    { ref: 'event:paris-peace-conference', rel: 'followed-by' }
  ],
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q2',
          text: 'The First World War ended the somewhat ironically labelled “long peace” of the 19th century. The war represented the culmination of the industrialization of warfare, after intensifying capitalist competition and new technological developments.',
          lang: 'en',
          cite: { source: 'eo1418-atabaki-persia-iran', loc: { section: 'Introduction', para: '1' } },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://encyclopedia.1914-1918-online.net/article/persiairan/'
          }
        },
        {
          id: 'q1',
          text: 'The international crisis that began with the assassination of Archduke Franz Ferdinand in Sarajevo on 28 June 1914 and culminated in the British declaration of war on Germany on 4 August is referred to as the July Crisis.',
          lang: 'en',
          cite: { source: 'eo1418-mombauer-july-crisis-1914', loc: { section: 'July Crisis 1914' } },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://encyclopedia.1914-1918-online.net/article/july-crisis-1914/'
          }
        }
      ]
    },
    {
      kind: 'causes',
      quotes: [
        {
          id: 'q3',
          text: 'All Great Power governments shared the fear that at some point in the near future a major European war was inevitable.',
          lang: 'en',
          cite: {
            source: 'eo1418-mombauer-july-crisis-1914',
            loc: { section: 'Introduction', para: '2' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://encyclopedia.1914-1918-online.net/article/july-crisis-1914/'
          }
        },
        {
          id: 'q4',
          text: 'Germany\'s leadership had hoped for a limited war between Austria-Hungary and Serbia. But because Russian forces had been mobilized in support of Serbia, the German leadership made the decision to support its ally.',
          lang: 'en',
          cite: {
            source: 'loc-germany-country-study-1995',
            loc: { section: 'World War I', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/germany/34.htm' }
        }
      ]
    },
    {
      kind: 'course',
      quotes: [
        {
          id: 'q5',
          text: 'Despite initial successes, Germany\'s strategy failed, and its troops became tied down in trench warfare in France. For the next four years, there would be little progress in the west, where advances were usually measured in meters rather than in kilometers.',
          lang: 'en',
          cite: {
            source: 'loc-germany-country-study-1995',
            loc: { section: 'World War I', para: '2' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/germany/34.htm' }
        }
      ]
    },
    {
      kind: 'casualties',
      quotes: [
        {
          id: 'q6',
          text: 'It shows that the Allied armies’ losses were higher than those of the Central Powers by more than 1 million men due to the high numbers of war dead in Romanian and Serbian forces, both of whom fought in very difficult conditions.',
          lang: 'en',
          cite: {
            source: 'eo1418-prost-war-losses',
            loc: { section: 'Definitions and Evaluation of Soldiers Killed', para: '4' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://encyclopedia.1914-1918-online.net/article/war-losses/'
          }
        },
        {
          id: 'q7',
          text: 'To conclude: these statistical insights suggest an asymmetric double contrast. On the front line, the Allies paid the highest price, both in terms of those killed in action and those wounded. But on the home front, the Central Powers and Russia paid a much higher toll. War was not only a military matter; it was an ordeal for whole societies.',
          lang: 'en',
          cite: { source: 'eo1418-prost-war-losses', loc: { section: 'Civilian Losses', para: '6' } },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://encyclopedia.1914-1918-online.net/article/war-losses/'
          }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q8',
          text: 'On November 9, the kaiser was forced to abdicate, and the SPD proclaimed a republic.',
          lang: 'en',
          cite: {
            source: 'loc-germany-country-study-1995',
            loc: { section: 'World War I', para: '6' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/germany/34.htm' }
        },
        {
          id: 'q9',
          text: 'Germany\'s loses included about 1.6 million dead and more than 4 million wounded.',
          lang: 'en',
          cite: {
            source: 'loc-germany-country-study-1995',
            loc: { section: 'World War I', para: '6' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/germany/34.htm' }
        }
      ]
    }
  ],
  course: [
    {
      date: {
        alts: [
          {
            value: { d: '1914-06-28' },
            cites: [
              {
                source: 'eo1418-foster-sarajevo-incident',
                loc: { section: 'Sarajevo Incident' }
              },
              { source: 'lemo-chronik-1914', loc: { section: 'Chronik 1914', para: '67' } }
            ]
          }
        ]
      },
      quote: {
        id: 'q10',
        text: 'The Sarajevo incident refers to the events surrounding the assassination of Archduke Franz Ferdinand, heir to the Austro-Hungarian throne, and his wife Archduchess Sophie during a state visit to Sarajevo on 28 June 1914. It is traditionally regarded as the immediate catalyst for the First World War.',
        lang: 'en',
        cite: { source: 'eo1418-foster-sarajevo-incident', loc: { section: 'Sarajevo Incident' } },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://encyclopedia.1914-1918-online.net/article/sarajevo-incident/'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1914-07-28' },
            cites: [
              {
                source: 'eo1418-mombauer-july-crisis-1914',
                loc: { section: 'The Ultimatum and Mediation Attempts', para: '10' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q11',
        text: 'Austria declared war on Serbia on 28 July, starting the “local war” that Vienna’s decision-makers had wanted for some time, and they were unwilling to stop their war against Serbia in order to make further negotiations possible. With their declaration of war and immediate bombardment of the Serbian capital they set in motion a domino effect of mobilisation orders and declarations of war by Europe’s major powers which resulted in a war that far exceeded what they had planned or wanted.',
        lang: 'en',
        cite: {
          source: 'eo1418-mombauer-july-crisis-1914',
          loc: { section: 'The Ultimatum and Mediation Attempts', para: '10' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://encyclopedia.1914-1918-online.net/article/july-crisis-1914/'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1914-08-01' },
            cites: [
              { source: 'lemo-chronik-1914', loc: { section: 'Chronik 1914', para: '99' } }
            ]
          }
        ]
      },
      quote: {
        id: 'q12',
        text: 'Deutsche Generalmobilmachung und Kriegserklärung an Russland.',
        lang: 'de',
        cite: { source: 'lemo-chronik-1914', loc: { section: 'Chronik 1914', para: '100' } },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://www.dhm.de/lemo/jahreschronik/1914.html'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1914-08-03' },
            cites: [
              { source: 'lemo-chronik-1914', loc: { section: 'Chronik 1914', para: '103' } }
            ]
          }
        ]
      },
      quote: {
        id: 'q13',
        text: 'Deutsche Kriegserklärung an Frankreich. Einmarsch deutscher Truppen in Belgien.',
        lang: 'de',
        cite: { source: 'lemo-chronik-1914', loc: { section: 'Chronik 1914', para: '104' } },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://www.dhm.de/lemo/jahreschronik/1914.html'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1914-11-05' },
            cites: [
              {
                source: 'loc-turkey-country-study-1995',
                loc: { section: 'World War I', para: '2' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q14',
        text: 'In October they put to sea with German officers and crews and shelled Odessa and other Russian ports while flying the Ottoman flag. Russia declared war on the Ottoman Empire on November 5, followed the next day by Britain and France.',
        lang: 'en',
        cite: { source: 'loc-turkey-country-study-1995', loc: { section: 'World War I', para: '2' } },
        provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/turkey/12.htm' }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1917-04-06' },
            cites: [
              {
                source: 'state-dept-milestones-us-entry-into-world-war-i',
                loc: { section: 'U.S. Entry into World War I, 1917', para: '1' }
              },
              { source: 'lemo-chronik-1917', loc: { section: 'Chronik 1917', para: '74' } }
            ]
          }
        ]
      },
      quote: {
        id: 'q15',
        text: 'On April 2, 1917, President Woodrow Wilson went before a joint session of Congress to request a declaration of war against Germany. Wilson cited Germany’s violation of its pledge to suspend unrestricted submarine warfare in the North Atlantic and the Mediterranean, as well as its attempts to entice Mexico into an alliance against the United States, as his reasons for declaring war. On April 4, 1917, the U.S. Senate voted in support of the measure to declare war on Germany. The House concurred two days later.',
        lang: 'en',
        cite: {
          source: 'state-dept-milestones-us-entry-into-world-war-i',
          loc: { section: 'U.S. Entry into World War I, 1917', para: '1' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://history.state.gov/milestones/1914-1920/wwi'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1918-03-03' },
            cites: [
              { source: 'lemo-chronik-1918', loc: { section: 'Chronik 1918', para: '31' } }
            ]
          }
        ]
      },
      quote: {
        id: 'q16',
        text: 'Unterzeichnung des Friedens von Brest-Litowsk: Russland verliert über 25 Prozent seiner Bevölkerung und 27 Prozent seines wirtschaftlich nutzbaren Bodens. Es muss die Unabhängigkeit von Finnland, Estland, Livland, Kurland, Litauen, Polen, Georgien, der Ukraine und von Teilen Armeniens anerkennen.',
        lang: 'de',
        cite: { source: 'lemo-chronik-1918', loc: { section: 'Chronik 1918', para: '32' } },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://www.dhm.de/lemo/jahreschronik/1918.html'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1918-11-11' },
            cites: [
              {
                source: 'loc-germany-country-study-1995',
                loc: { section: 'World War I', para: '6' }
              },
              { source: 'lemo-chronik-1918', loc: { section: 'Chronik 1918', para: '197' } }
            ]
          }
        ]
      },
      quote: {
        id: 'q17',
        text: 'On November 11, the government signed the armistice that ended the war.',
        lang: 'en',
        cite: {
          source: 'loc-germany-country-study-1995',
          loc: { section: 'World War I', para: '6' }
        },
        provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/germany/34.htm' }
      }
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/f/fa/Cheshire_Regiment_trench_Somme_1916.jpg/1280px-Cheshire_Regiment_trench_Somme_1916.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Cheshire_Regiment_trench_Somme_1916.jpg',
    credit: { institution: 'Imperial War Museums', creator: 'John Warwick Brooke' },
    license: { id: 'public-domain' }
  },
  archive: [
    {
      id: 'america-goes-over-part-1',
      mediaKind: 'video',
      title: 'America Goes Over (Part I)',
      date: { d: '1918' },
      url: 'https://archive.org/download/AmericaG1918/AmericaG1918.mp4',
      page: 'https://archive.org/details/AmericaG1918',
      credit: {
        institution: 'Prelinger Archives (Internet Archive)',
        creator: 'U.S. Army, Signal Corps'
      },
      license: { id: 'public-domain' },
      bytes: 83058266,
      durationSec: 800
    },
    {
      id: 'america-goes-over-part-4',
      mediaKind: 'video',
      title: 'America Goes Over (Part IV)',
      date: { d: '1918' },
      url: 'https://archive.org/download/AmericaG1918_4/AmericaG1918_4.mp4',
      page: 'https://archive.org/details/AmericaG1918_4',
      credit: {
        institution: 'Prelinger Archives (Internet Archive)',
        creator: 'U.S. Army, Signal Corps'
      },
      license: { id: 'public-domain' },
      bytes: 111078132,
      durationSec: 1068
    }
  ]
})
